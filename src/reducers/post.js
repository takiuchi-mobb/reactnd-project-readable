import * as TYPES from '../types';

export const posts = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_POSTS_SUCCESS:
          return action.posts;

    case TYPES.CREATE_POST_SUCCESS:
          return state.concat(action.post)

    case TYPES.UPDATE_POST_SUCCESS:
    case TYPES.UPDATE_POST_SCORE_VOTE_SUCCESS:
          return state.map((e) => (e.id !== action.post.id) ? e : action.post )

    case TYPES.DELETE_POST_SUCCESS:
          return state.filter(e => e.id !== action.post.id)

    default:
          return state;
  }
};

export const post = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_POST_BY_ID_SUCCESS:
      return action.post;
    case TYPES.DELETE_POST_SUCCESS:
      return action.post;
    default:
      return state;
  }
};