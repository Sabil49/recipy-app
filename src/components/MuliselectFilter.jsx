"use client"
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Arrowdown from "@/assets/Arrowdown";
import { multiAllSelectData,multiFilterData,multiLabelOpenData,multiSelectData } from "@/redux/actions";
import { fetchRecipySuccess } from "@/redux/actions";
import RemoveFilter from "./RemoveFilter";
export const uniqueNameData = {
    Italian: false,
    Asian: false,
    American: false,
    Mexican: false,
    Mediterranean: false,
    Pakistani: false,
    Japanese: false,
    Moroccan: false,
    Korean: false,
    Greek: false,
    Thai: false,
    Indian: false,
    Turkish: false,
    Smoothie: false,
    Russian: false,
    Lebanese: false,
    Brazilian: false,
};
export default function MuliselectFilter(){
    
  const uniqueNameDataTrue = {
        Italian: true,
        Asian: true,
        American: true,
        Mexican: true,
        Mediterranean: true,
        Pakistani: true,
        Japanese: true,
        Moroccan: true,
        Korean: true,
        Greek: true,
        Thai: true,
        Indian: true,
        Turkish: true,
        Smoothie: true,
        Russian: true,
        Lebanese: true,
        Brazilian: true,
    };
    
    const dispatch=useDispatch();
    const selectData = useSelector(state => state.multiSelectDataValue)
    const filterData = useSelector(state => state.multiFilterDataValue)
    const allSelectData = useSelector(state => state.multiAllSelectDataValue)
    const labelOpen=useSelector(state => state.multiLabelOpenDataValue)

    const recipy = useSelector(state => state.recipyData);    
    const recipyItems = useSelector(state => state.items);
    const searchTextMulti = useSelector(state => state.searchValue)
    
    useEffect(() => {
        if (filterData.length === Object.keys(uniqueNameData).length) {
            dispatch(multiAllSelectData(true));
        } else {
            dispatch(multiAllSelectData(false));
        }
        function haveCommonItems(arr1, arr2) {
            return arr1.some(item => arr2.includes(item));
          } 
        const recipyData =
            recipyItems &&
            recipyItems.map((obj) => {
                const array1 = obj.tags;
                const array2 = filterData;
                const subStr = haveCommonItems(array1, array2);
                if (filterData.includes(obj.cuisine) || searchTextMulti.data && obj.cuisine.toLowerCase().includes(searchTextMulti.data.toLowerCase()) || subStr) {
                        return { ...obj, show: true };
                    } else {
                        return { ...obj, show: false };
                    }
                               
            });
        dispatch(fetchRecipySuccess(recipyData));
    }, [filterData]);
  
    const handleChecked = (e) => {
        const name=e.target.name;
        const value=JSON.parse(e.target.value);        
        if(value===false) {
            dispatch(multiFilterData([...filterData, name]))
        }
        else{
            dispatch(multiFilterData(filterData.filter(dataObj => {
                return dataObj !== name
            })))
    }
    dispatch(multiSelectData({...selectData , [name]: !value}))   

    } 

    const handleAllChecked = (e) => {
        if (allSelectData.data == false) {
            dispatch(multiSelectData(uniqueNameDataTrue))
            dispatch(multiFilterData(Object.keys(uniqueNameData).map((key) => key)))
        } else {
            dispatch(multiSelectData(uniqueNameData))
            dispatch(multiFilterData([]))
        }
        dispatch(multiAllSelectData(!allSelectData.data))
    };
    const finallabelOpen=typeof(labelOpen)==='object' ? labelOpen.data : labelOpen;
    function handleOpen(){
        dispatch(multiLabelOpenData(typeof(labelOpen)==='object' ? !labelOpen.data : !labelOpen))
    }
    
    return(
        <div className="ml-2 absolute top-0 left-10"> 
            <ul className="z-50 relative w-36 bg-white cursor-pointer">
            <li onClick={handleOpen} className={finallabelOpen ? "border pl-1 pr-1 rounded cursor-default border-black border-2" : "border pl-1 pr-1 rounded cursor-default" }><div className="flex cursor-pointer justify-center">Select... <Arrowdown /></div></li>
            {finallabelOpen && <li className="ml-2"><input type="checkbox" id='all_select' className="cursor-pointer mr-1" name='All select'checked={allSelectData.data} value={allSelectData.data} onChange={(e) => handleAllChecked(e)} /><label className="cursor-pointer" htmlFor="all_select">All Select</label></li>}
            {
               finallabelOpen &&  Object.keys(selectData).map((key,index) => 
                    <li className="ml-2" key={index}><input id={key} type="checkbox" className="mr-1 cursor-pointer" name={key} checked={selectData[key]} value={selectData[key]} onChange={(e) => handleChecked(e)} /><label className="cursor-pointer" htmlFor={key}>{key}</label></li>
                )
            }
            </ul>
            
        </div>
    )

}