import * as TYPES from '../types';
import axios from 'axios';

export const createPostSuccess = (post) => {
  return {
    type: TYPES.CREATE_POST_SUCCESS,
    post
  }
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: TYPES.FETCH_POSTS_SUCCESS,
    posts
  }
};

export const fetchPostByIdSuccess = (post) => {
  return {
    type: TYPES.FETCH_POST_BY_ID_SUCCESS,
    post
  }
};

export const deletePostSuccess = (post) => {
  return {
    type: TYPES.DELETE_POST_SUCCESS,
    post
  }
};

export const updatePostSuccess = (post) => {
  return {
    type: TYPES.UPDATE_POST_SUCCESS,
    post
  }
};

export const updatePostVoteScoreSuccess = (post) => {
  return {
    type: TYPES.UPDATE_POST_SCORE_VOTE_SUCCESS,
    post
  }
};

export const fetchPosts = () => {
  return (dispatch) => {
    return axios.get(`${TYPES.API_URL}/posts`, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(fetchPostsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPostById = (id) => {
  return (dispatch) => {
    return axios.get(`${TYPES.API_URL}/posts/${id}`, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(fetchPostByIdSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createPost = (post) => {
  return (dispatch) => {
    return axios.post(`${TYPES.API_URL}/posts`, post,{
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(createPostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updatePost = (post) => {
  return (dispatch) => {
    return axios.put(`${TYPES.API_URL}/posts/${post.id}`, post, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(updatePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    return axios.delete(`${TYPES.API_URL}/posts/${id}`,{
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updatePostVoteScore = (post) => {
  return (dispatch) => {
    return axios.post(`${TYPES.API_URL}/posts/${post.id}`, post, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(updatePostVoteScoreSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};