import * as TYPES from '../types';

export const categories = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_CATEGORIES_SUCCESS:
          return action.categories.categories;
    default:
          return state;
  }
};

export const category = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_CATEGORY_POSTS_SUCCESS:
      return action.posts;
    default:
      return state;
  }
};