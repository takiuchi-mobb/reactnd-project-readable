import * as TYPES from '../types';

export const comments = (state =[], action) => {
  switch (action.type) {
    case TYPES.FETCH_COMMENTS_SUCCESS:
        return action.comments

    case TYPES.CREATE_COMMENT_SUCCESS:
        return state.concat(action.comment)

    case TYPES.DELETE_COMMENT_SUCCESS:
      return state.filter(e => e.id !== action.comment.id)

    case TYPES.UPDATE_COMMENT_SUCCESS:
    case TYPES.UPDATE_COMMENT_SCORE_VOTE_SUCCESS:
      return state.map((e) => (e.id !== action.comment.id) ? e : action.comment )

    default:
          return state
  }
}