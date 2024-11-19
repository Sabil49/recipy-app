'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
const useUnique = useMemo(() => (keyofvalue) => {
    const recipy = useSelector(state => state.items);
    const filterRecipy = [...recipy]
    const keyValue=keyofvalue;
    //console.log(filterRecipy)
    //console.log(keyValue)
    const uniqueData=filterRecipy && filterRecipy.reduce(function(stateObj,currentObj){
        
        if(stateObj.indexOf(currentObj[keyValue]) === -1){
            stateObj.push(currentObj[keyValue])
        }        
        return stateObj;
    },[])
    return uniqueData;
    },[])


export default useUnique;