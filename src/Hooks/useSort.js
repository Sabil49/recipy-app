'use client';
import { useSelector, useDispatch } from 'react-redux';

const useSort = (keyofvalue) => {
    const recipy = useSelector(state => state.items);
    const newRecipy = [...recipy]
    //console.log('keyofvalue')
    //console.log(keyofvalue)
    //console.log('newRecipy')
    //console.log(newRecipy)
    const keyValue=keyofvalue;
    let newRecipyData;
    if(keyValue==="rating"){
        newRecipyData=newRecipy && newRecipy.sort((a, b) => b[keyValue] - a[keyValue]);
    }
    else{
        newRecipyData=newRecipy && newRecipy.sort((a, b) => a[keyValue] - b[keyValue]);
    }
    //console.log('newRecipyData')
    //console.log(newRecipyData)
    return newRecipyData;
    }


export default useSort;