import { useSelector, useDispatch } from "react-redux";
import { favoriteDataUpdate,multiFilterData,multiSelectData,fetchRecipySuccess, searchTextValue } from "../redux/actions";
import { fetchRecipy } from "@/redux/fetchRecipy";
import { uniqueNameData } from "./MuliselectFilter";

function Searchbar() {
    const dispatch = useDispatch();

    const recipy = useSelector((state) => state.items);
    const filterData = useSelector((state) => state.multiFilterDataValue);
    const searchText = useSelector((state) => state.searchValue);
    function inputSearch(data) {
        const searchText = data.searchText.data;
        if (searchText === "") {
            /* const recipyData =
                recipy &&
                recipy.map((obj) => {
                    if (filterData.includes(obj.cuisine) || (searchText.data && obj.cuisine.toLowerCase().includes(searchText.data.toLowerCase()))) {
                        return { ...obj, show: true };
                    } else {
                        return { ...obj, show: false };
                    }
                }); */

                dispatch(favoriteDataUpdate(false)); 
                dispatch(multiFilterData([]))
                dispatch(multiSelectData(uniqueNameData))     
            dispatch(fetchRecipy());
        } else {
            const recipyData =
                recipy &&
                recipy.map((obj) => {
                    const subStr = obj.show && obj.tags.some((str) => str.toLowerCase().includes(searchText.toLowerCase()));
                    if (obj.show && (obj.name.toLowerCase().includes(searchText.toLowerCase()) || obj.cuisine.toLowerCase().includes(searchText.toLowerCase()) || subStr)) {
                        return { ...obj, show: true };
                    } else {
                        return { ...obj, show: false };
                    }
                });
            return dispatch(fetchRecipySuccess(recipyData));
        }
    }

    function inputDebouncing(func, delay) {
        let timer;
        return function () {
            const context = this;
            const args = arguments;
            clearInterval(timer);
            timer = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }
    let searchHandle = inputDebouncing(inputSearch, 1000);

    return (
        <>
            <input
                type="text"
                onKeyUp={() => searchHandle({ searchText })}
                value={searchText && searchText.data}
                onChange={(e) => dispatch(searchTextValue(e.target.value))}
                placeholder="Search..."
                className="w-full outline-none bg-transparent text-[#333] text-sm"
            />
        </>
    );
}

export default Searchbar;
