import { useSelector, useDispatch } from 'react-redux';
import { multiSelectData,searchTextValue,fetchRecipySuccess,favoriteDataUpdate,multiFilterData } from '../redux/actions'
import { fetchRecipy } from '@/redux/fetchRecipy';
import Favorite from '@/assets/Favorite';
import FavoriteFilled from '@/assets/FavoriteFilled';
import { uniqueNameData } from './MuliselectFilter';

export default function Favorites(){  
    const dispatch = useDispatch();
    const recipy = useSelector(state => state.items);
    const favorites = useSelector(state => state.favoriteDataValue);
    const localStorageData=null;
    const favoritesData=typeof(favorites)==='object' ? favorites.data : favorites;
    const data=recipy ? recipy.filter((favoritesDataObj) => {        
        if(favoritesDataObj.favorite){
            return favoritesDataObj
        }
    }) : recipy;
    
    

   /*  console.log('Favorites data')
    console.log(data) */
    const FavoriteHandler = (e) => {
        if(favoritesData){
            // to false
            dispatch(favoriteDataUpdate(false)); 
            dispatch(multiFilterData([]))
            dispatch(searchTextValue(''))
            dispatch(multiSelectData(uniqueNameData))  
            dispatch(fetchRecipy());  
        }
        else{
            dispatch(favoriteDataUpdate(true));  
            dispatch(fetchRecipySuccess(data)) 
        }
    }
    return(
        <div className="cursor-pointer" onClick={FavoriteHandler}>{favoritesData ? <FavoriteFilled /> : <Favorite />}</div>
    )
}