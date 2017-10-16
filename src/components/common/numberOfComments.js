import React  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as commentActions from '../../actions/comment';

class NumberOfComments extends React.Component{

  componentDidMount(){
    this.props.fetchComments(this.props.post.id);
  }

  getnumberOfComments() {
    const {numberOfComments, post} = this.props;
    return  (numberOfComments[post.id]) ? numberOfComments[post.id] : 0;
  }

	render() {
    return (
      <span style={{ paddingRight: '10px'}} >{this.getnumberOfComments()} comments</span>
    );
	}

};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: id => dispatch(commentActions.fetchComments(id)),
  }
};

export default connect(null, mapDispatchToProps)(NumberOfComments);
