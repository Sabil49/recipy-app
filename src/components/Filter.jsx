'use client';

import useFilter from '@/Hooks/useFilter';
import { useState,useEffect,useMemo,useCallback }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipyBegin, fetchRecipySuccess, fetchRecipyFailure } from '../redux/actions'
import { fetchRecipy } from '../redux/fetchRecipy';
  
export default function Filter(){
    const [filter,setFilter] = useState("");
    const [unique,setUnique] = useState("cuisine");
    const dispatch = useDispatch();
    const data = useFilter(filter);
    useEffect(() => {
        if (data.length > 0) {
            dispatch(fetchRecipySuccess(data));
            setFilter('')
                }
    }, [ data ]);
   
   const useUnique = useMemo(() => (keyofvalue) => {
    const recipy = useSelector(state => state.items);
    const filterRecipy = [...recipy]
    const keyValue=keyofvalue;
    const uniqueData=filterRecipy && filterRecipy.reduce(function(stateObj,currentObj){
        if(currentObj!=undefined && stateObj!=undefined){
            if(stateObj.indexOf(currentObj[keyValue]) === -1){
                stateObj.push(currentObj[keyValue])
            }        
            return stateObj;
        }        
    },[])
    return uniqueData;
    },[unique])
    const filterRecipyData=useUnique(unique)
    const FilterHandler = (e) => {
        if (e.target.value !== "") {
            setFilter(e.target.value);
        } else {
            dispatch(fetchRecipy());
        }
    };
    
    return (
        <select className="ml-2 border rounded pt-1 pb-1 pl-2 pr-2" onChange={(e) => FilterHandler(e)}>
            <option value="">Select</option>
            {filterRecipyData &&
                filterRecipyData.map((filterData, index) => {
                    return filter === filterData ? (
                        <option key={index} value={filterData} selected>
                            {filterData}
                        </option>
                    ) : (
                        <option key={index} value={filterData}>
                            {filterData}
                        </option>
                    );
                })}
        </select>
    )}