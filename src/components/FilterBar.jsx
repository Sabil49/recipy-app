import RemoveFilter from "./RemoveFilter";
import { multiAllSelectData, multiFilterData, multiLabelOpenData, multiSelectData } from "@/redux/actions";
import { useSelector,useDispatch } from "react-redux";

export default function FilterBar() {
    const selectData = useSelector(state => state.multiSelectDataValue)
    const filterData = useSelector(state => state.multiFilterDataValue)
    const dispatch = useDispatch();
    const handleRemove = (removeName) => {
        dispatch(
            multiFilterData(
                filterData.filter((dataObj) => {
                    return dataObj !== removeName;
                })
            )
        );
        dispatch(multiSelectData({ ...selectData, [removeName]: false }));
    };
    return (
        <>
    {
        filterData.length > 0 && <div className="border-b-2 pb-2">
            {
                filterData.map((filterValue, index) => {
                    return <RemoveFilter filterPropsValue={filterValue} onClickHandler={handleRemove} key={index} id={index}></RemoveFilter>;
                })}
        </div>
}
</>
    );
}
