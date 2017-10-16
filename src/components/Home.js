import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as postActions from '../actions/post';
import * as commentActions from '../actions/comment';
import PostForm from './forms/create/post';
import EditPostForm from './forms/update/post';
import NumberOfComments from './common/numberOfComments';
import sortBy from 'sort-by'
import FontAwesome from 'react-fontawesome'

class Home extends React.Component{

	state = {
	  sortBy: 'voteScore',
    numberOfComments: {}
	}

  updateSortBy = (e) => {
    this.setState({sortBy: e.target.value});
  }

	submitPost(input){
		this.props.createPost(input);
	}
	updatePost(input){
		this.props.updatePost(input);
	}
	deletePost(id) {
		this.props.deletePost(id);
	}

  updatePostVoteScore(id, option){
    const post = {
      id:  id,
      option: option
    }
    this.props.updatePostVoteScore(post);
  }

  getNumberOfComments(id){
    // this.props.fetchComments(id);
    // console.log("comments", this.props.comments);
    // return this.props.comments.length
    return 10;
  }

  componentWillReceiveProps(nextProps) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxx:", this.props.comments)
    if(0 < nextProps.comments.length) {
      // console.log("nextProps.postId:" + nextProps.comments[0].parentId +", this.props.postId:" + this.props.postId)
      // console.log("yyyyyyyyyyyyyyyyyyyyyyy:",nextProps.comments[0].parentId)
      console.log("nextProps.comments", nextProps.comments.length)
      // const x = {
      //   ...this.state.x,
      //   [nextProps.comments[0].parentId]: nextProps.comments.length
      // }
      this.setState({
        numberOfComments: {
        ...this.state.numberOfComments,
        [nextProps.comments[0].parentId]: nextProps.comments.length
      }
      })
    }
  }

  render(){
  	let current_category = this.props.match.params.category;
    let showingPosts = this.props.posts.sort(sortBy(this.state.sortBy))
    if(current_category) {
    	showingPosts = showingPosts.filter((e) => e.category === current_category)
    }

    return(
      <div className="container">
        <div className="row">
            <div className="col-md-8">
              <div className="page-header">
                <div className="row">
                  <h1 className="col-md-2">Posts:{current_category}</h1>
                  <div className="col-md-10 text-right">
                    <div className="row">
                      <div className="col-md-8 pull-right" style={{marginBottom: '20px'}}>
                        <PostForm submitPost={this.submitPost.bind(this)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 pull-right">
                        <label>Sort by</label>
                        <select className="form-control" onChange={this.updateSortBy} value={this.state.sortBy}>
                          <option value="voteScore">vote score</option>
                          <option value="timestamp">timestamp</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="comments-list">
                {showingPosts.map((b, i) => {
                  return(
                        <div className="media" key={i}>
                             <p className="pull-right text-right">
                                <NumberOfComments post={b} numberOfComments={this.state.numberOfComments} />
                                <span onClick={() => this.updatePostVoteScore(b.id, 'upVote')}>
                                  <FontAwesome
                                      className='fa-thumbs-up'
                                      name='thumbs-up'
                                      style={{ cursor: 'pointer', paddingRight: '10px'}} />
                                  </span>
                                <span onClick={() => this.updatePostVoteScore(b.id, 'downVote')}>
                                  <FontAwesome
                                      className='fa-thumbs-down'
                                      name='thumbs-down'
                                      style={{ cursor: 'pointer', paddingRight: '10px'}} />
                                </span>

                             <small style={{fontSize: '14px'}}>Score: {b.voteScore}</small><br/>
                             <span onClick={() => this.deletePost(b.id)}>
                                  <FontAwesome
                                      className='fa-trash'
                                      name='delete'
                                      size='2x'
                                      style={{ cursor: 'pointer' }} />
                                </span>
                             </p>
                              
                              <div className="media-body">
                                <h4 className="media-heading user_name">
                                  <Link to={`/posts/${b.id}`}>{b.title}</Link>
                                  </h4>
                                <div className="row">
                                  <div className="col-md-12">
                                  <EditPostForm post={b} updatePost={this.updatePost.bind(this)}/>
                                  </div>
                                </div>
                              </div>
                          </div>
                  )
                })}
               </div>
            </div>
        </div>
  </div>
  )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    comments: state.comments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: post => dispatch(postActions.createPost(post)),
    deletePost: id => dispatch(postActions.deletePost(id)),
    updatePost: post => dispatch(postActions.updatePost(post)),
    updatePostVoteScore: post => dispatch(postActions.updatePostVoteScore(post)),
    fetchComments: id => dispatch(commentActions.fetchComments(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
