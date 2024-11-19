"use client";
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipy } from '../redux/fetchRecipy';
import { fetchRecipySuccess } from '../redux/actions'
import Card from './Card';
import FilterBar from './FilterBar';
import InfiniteScroll from "react-infinite-scroll-component";


function Cards(){
  
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const loading = useSelector(state => state.loading);
  const recipy = useSelector(state => state.items);
  const favorites = useSelector(state => state.favoriteDataValue);
  const favoritesData=typeof(favorites)==='object' ? favorites.data : favorites;
  const localStorageData=null;
  const forMap = localStorageData ? localStorageData : recipy;
  
  const [lazyItems,setLazyItems] = useState();
  const [hasMore,setHasMore] = useState(true);

  const data=forMap && forMap.filter((favoritesDataObj) => {        
    if(favoritesDataObj.favorite)
        return favoritesDataObj
    })
    /* console.log('recipy')
    console.log(recipy)
    console.log('localStorageData')
    console.log(localStorageData)
    console.log('forMap')
    console.log(forMap)
    console.log('data')
    console.log(data) */
  useEffect(() => {
    // may be const data used here
    const lazyItemsArr = favoritesData ? recipy && recipy.filter((item) => item.show === true).slice(0,8) : forMap && forMap.filter((item) => item.show === true).slice(0,8);
    //console.log(lazyItemsArr)
    setLazyItems(lazyItemsArr)
    setHasMore(true)
  },[recipy])
 
  
  useEffect(() => {    
    dispatch(fetchRecipy());
  }, [dispatch]);
  
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  /* console.log('HasMore')
  console.log(hasMore) */
  // check this
  const handleClick = (event) => {
    const id=event.target.id;
    if (id!==undefined) {      
      const newRecipy = forMap.map((favoriteObj) => {
        if (favoriteObj.id ==  id) {
          return {...favoriteObj, favorite: !favoriteObj.favorite};
        }
        return favoriteObj;
      })
      localStorage.setItem('Favorites', JSON.stringify(newRecipy))
      
      const dataUpdate = favoritesData && data.map((dataObj) => {
        if (dataObj.id ==  id) {
          return {...dataObj, show: !dataObj.show};
        }
        return dataObj;
      })
      //console.log(favoritesData)
      //console.log('favorites.data => '+favoritesData)
      favoritesData ? dispatch(fetchRecipySuccess(dataUpdate)) : dispatch(fetchRecipySuccess(newRecipy));
    }
  };
  const forMap_filter = favoritesData ? recipy && recipy.filter((item) => item.show === true) : forMap && forMap.filter((item) => item.show === true);
  /* console.log('forMap_filter')
  console.log(forMap_filter) */
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    if (lazyItems.length >= forMap_filter.length) {
        setHasMore(false)
        return;
    }
    setTimeout(() => {
      setLazyItems([...lazyItems, ...forMap_filter.slice(lazyItems.length, lazyItems.length+4)]);
    }, 1500);
  };
  //console.log(lazyItems);
  return (
    <>
    <FilterBar />
    <div onClick={handleClick} className="min-h-52 font-sans container mx-auto m-auto justify-center flex-wrap flex">
    <InfiniteScroll
                dataLength={lazyItems ? lazyItems.length : null}
                next={fetchMoreData}
                hasMore={hasMore}
                className='container w-full mx-auto m-auto justify-center flex-wrap flex'
            >
        {          
          lazyItems && lazyItems.length > 0 ? lazyItems.map((recipe) => {
                let findObj=localStorageData && localStorageData.find(obj => obj.id === recipe.id);
                return recipe.show && <Card key={recipe.id} favoriteindiv={
                  localStorageData ?  findObj.favorite.toString() : recipe.favorite.toString()} id={recipe.id} recipes={recipe}></Card>;
            })
            :
            <div className="mt-4">No Items found</div>
            }
         </InfiniteScroll>
    </div>
    </>
)};

export default Cards;
