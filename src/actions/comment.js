import * as TYPES from '../types';
import axios from 'axios';

export const createCommentSuccess = (comment) => {
  return {
    type: TYPES.CREATE_COMMENT_SUCCESS,
    comment
  }
};

export const updateCommentSuccess = (comment) => {
  return {
    type: TYPES.UPDATE_COMMENT_SUCCESS,
    comment
  }
};

export const fetchCommentsSuccess = (comments) => {
  return {
    type: TYPES.FETCH_COMMENTS_SUCCESS,
    comments
  }
};

export const deleteCommentSuccess = (comment) => {
  return {
    type: TYPES.DELETE_COMMENT_SUCCESS,
    comment
  }
};

export const updateCommentVoteScoreSuccess = (comment) => {
  return {
    type: TYPES.UPDATE_COMMENT_SCORE_VOTE_SUCCESS,
    comment
  }
};

export const fetchComments = (id) => {
  return (dispatch) => {
    return axios.get(`${TYPES.API_URL}/posts/${id}/comments`, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(fetchCommentsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


// COMMENT /posts
//   USAGE:
//     Add a new post
//   PARAMS:
//     id - UUID should be fine, but any unique id will work
//     timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//     title - String
//     body - String
//     author - String
//     category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
export const createComment = (comment) => {
  return (dispatch) => {
    return axios.post(`${TYPES.API_URL}/comments`, comment,{
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(createCommentSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

// PUT /comments/:id
//   USAGE:
//     Edit the details of an existing comment
//   PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String
export const updateComment = (comment) => {
  return (dispatch) => {
    return axios.put(`${TYPES.API_URL}/comments/${comment.id}`, comment,{
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(updateCommentSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    return axios.delete(`${TYPES.API_URL}/comments/${id}`,{
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(deleteCommentSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updateCommentVoteScore = (comment) => {
  return (dispatch) => {
    return axios.post(`${TYPES.API_URL}/comments/${comment.id}`, comment, {
       headers: {
         'Authorization': 'whatever-you-want', 
       }})
      .then(response => {
        dispatch(updateCommentVoteScoreSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
