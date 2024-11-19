"use client";
import { useEffect } from 'react';
import useSort from '@/Hooks/useSort';
import { useSelector, useDispatch } from 'react-redux';
import { ratingStateUpdate, fetchRecipySuccess } from '../redux/actions'

export default function RatingSort() {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.ratingValue)
    const data = useSort(sort && sort.data);
    useEffect(() => {
        if (data.length > 0) { 
            sort.data && dispatch(fetchRecipySuccess(data))           
            sort.data && dispatch(ratingStateUpdate(""))
        }
    }, [data]);

    const selectHandler = (e) => {
        if (e.target.value !== "") {                        
            dispatch(ratingStateUpdate(e.target.value))
        } else {
            //dispatch(fetchRecipySuccess(data))
            dispatch(ratingStateUpdate(""))
        }
    };

    return (
        <select className="cursor-pointer ml-2 border rounded pt-1 pb-1 pl-2 pr-2" onChange={(e) => selectHandler(e)}>
            <option value="">Select</option>
            <option value="rating">Rating</option>
            <option value="cookTimeMinutes">Cooking Time</option>
        </select>
    );
}
