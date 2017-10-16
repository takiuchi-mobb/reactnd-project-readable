import { combineReducers } from 'redux';
import {categories, category } from './category'
import {posts, post} from './post'
import {comments } from './comment'

export default combineReducers({
  categories,
  category_posts: category,
  posts,
  post,
  comments
});
