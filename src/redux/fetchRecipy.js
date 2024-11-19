import { fetchRecipyData,fetchRecipyBegin, fetchRecipySuccess, fetchRecipyFailure } from './actions';

export function fetchRecipy() {
  return dispatch => {
    dispatch(fetchRecipyBegin());
    return fetch("https://dummyjson.com/recipes")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const jsonData=json.recipes.map(v => ({show: true,favorite: false, ...v}))
        //localStorage.setItem('Favorites', JSON.stringify(jsonData))
        dispatch(fetchRecipyData(jsonData));
        dispatch(fetchRecipySuccess(jsonData));
        return jsonData;
      })
      .catch(error => dispatch(fetchRecipyFailure(error)));
  };
}

// Helper function for error handling
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}