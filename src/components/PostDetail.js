import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as commentActions from '../actions/comment';
import * as postActions from '../actions/post';
import CommentForm from './forms/create/comment';
import EditCommentForm from './forms/update/comment';
import sortBy from 'sort-by'
import FontAwesome from 'react-fontawesome'

class PostDetail extends Component {

  state = {
    sortBy: 'voteScore'
  }

  updateSortBy = (e) => {
    this.setState({sortBy: e.target.value});
  }

  updateCommentVoteScore(id, option){
    const comment = {
      id:  id,
      option: option
    }
    this.props.updateCommentVoteScore(comment);
  }


    submitComment(input){
      this.props.createComment(input);
    }
    updateComment(input){
      this.props.updateComment(input);
    }
    deleteComment(id) {
      console.log(id)
      this.props.deleteComment(id);
    }

    componentDidMount(){
      const postId = this.props.match.params.id
      this.props.fetchComments(postId);
      this.props.fetchPostById(postId);
    }

    render() {

      let showingComments = this.props.comments.sort(sortBy(this.state.sortBy))

        return (
          <div className="container">
            <div className="col-md-8">
              <h1>{ this.props.post.title }</h1>
              <div className="item-content-block tags">
                <FontAwesome
                  className='fa-user'
                  name='author'
                  style={{ paddingRight: '5px'}} />
                <span style={{ paddingRight: '10px'}}>{ this.props.post.author }</span>
                <FontAwesome
                  className='fa-tag'
                  name='tag'
                  style={{ paddingRight: '5px'}} />
                <span style={{ paddingRight: '10px'}}>{this.props.post.category}</span>
                <FontAwesome
                  className='fa-star'
                  name='vote'
                  style={{ paddingRight: '5px'}} />
                <span style={{ paddingRight: '10px'}}>{this.props.post.voteScore}</span>
              </div>
              <p className="container" style={{ margin: '10px', padding: '5px', fontSize: '1.3em'}}>
                { this.props.post.body }
              </p>
              <div className="row">
                <div className="col-md-3">
                  <h3>{showingComments.length} Comments</h3>
                </div>
                <div className="col-md-offset-3 col-md-6 text-right">
                  <div className="row">
                    <CommentForm parentId={this.props.match.params.id} submitComment={this.submitComment.bind(this)} />
                  </div>
                  <div className="row">
                    <div className="pull-right text-left">
                      <label>Sort by</label>
                      <select className="form-control" onChange={this.updateSortBy} value={this.state.sortBy}>
                        <option value="voteScore">vote score</option>
                        <option value="timestamp">timestamp</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comments-list">
                {showingComments.map((b, i) => {
                  return(
                        <div className="media" key={i}>
                             <p className="pull-right text-right">
                                <span onClick={() => this.updateCommentVoteScore(b.id, 'upVote')}>
                                  <FontAwesome
                                      className='fa-thumbs-up'
                                      name='thumbs-up'
                                      style={{ cursor: 'pointer', paddingRight: '10px'}} />
                                  </span>
                                <span onClick={() => this.updateCommentVoteScore(b.id, 'downVote')}>
                                  <FontAwesome
                                      className='fa-thumbs-down'
                                      name='thumbs-down'
                                      style={{ cursor: 'pointer', paddingRight: '10px'}} />
                                </span>

                             <small style={{fontSize: '24px'}}>Score: {b.voteScore}</small><br/>
                             <span onClick={() => this.deleteComment(b.id)}>
                                  <FontAwesome
                                      className='fa-trash'
                                      name='delete'
                                      style={{ cursor: 'pointer' }} />
                                </span>
                             </p>
                              
                              <div className="media-body">
                                <FontAwesome
                                  className='fa-user'
                                  name='author'
                                  style={{ paddingRight: '5px'}} />
                                  <span style={{ paddingRight: '10px'}}>{ b.author }</span>
                                <h4 className="media-heading user_name">{b.body}</h4>
                                <div className="row">
                                  <div className="col-md-12">
                                  <EditCommentForm comment={b} updateComment={this.updateComment.bind(this)} />
                                  </div>
                                </div>
                              </div>
                          </div>
                  )
                })}
               </div>
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      comments: state.comments,
      post: state.post,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchComments: id => dispatch(commentActions.fetchComments(id)),
      fetchPostById: id => dispatch(postActions.fetchPostById(id)),
      createComment: comment => dispatch(commentActions.createComment(comment)),
      updateComment: comment => dispatch(commentActions.updateComment(comment)),
      deleteComment: id => dispatch(commentActions.deleteComment(id)),
      updateCommentVoteScore: comment => dispatch(commentActions.updateCommentVoteScore(comment)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
