'use client';
import { useSelector, useDispatch } from 'react-redux';

const useFilter = (keyofvalue) => {
    const recipy = useSelector(state => state.items);
    const newRecipy = [...recipy]
    const keyValue=keyofvalue;
    const newRecipyData=newRecipy && newRecipy.filter(recipyData =>  recipyData!=undefined && recipyData.cuisine === keyValue);
    return newRecipyData;
    }


export default useFilter;