import * as TYPES from '../types';
import axios from 'axios';

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: TYPES.FETCH_CATEGORIES_SUCCESS,
    categories
  }
};

export const fetchCategories = () => {
  return (dispatch) => {
    return axios.get(`${TYPES.API_URL}/categories`, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(fetchCategoriesSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const fetchCategoryPostsSuccess = (posts) => {
  return {
    type: TYPES.FETCH_CATEGORY_POSTS_SUCCESS,
    posts
  }
};

export const fetchCategoryPosts = (category_name) => {
  return (dispatch) => {
    return axios.get(`${TYPES.API_URL}/${category_name}/posts`, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(fetchCategoryPostsSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};