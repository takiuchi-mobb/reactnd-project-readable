import React, {Component} from 'react';
import uuidv1 from 'uuid/v1'
import {connect} from 'react-redux';

class PostForm extends Component  {

    state = {
      isOpen: false
    }

    changeOpenState = (isOpen) => {
      this.setState({ isOpen: isOpen })      
    }

    render() {
      let titleInput, bodyInput, authorInput, categoryInput = null;
      const { isOpen } = this.state
      if(!isOpen) {
        return (
          <span  onClick={(event) => this.changeOpenState(true)} style={{ cursor: 'pointer' }}>
            Create
          </span>
        )
      }
      
      return (
        <form onSubmit={e => {
              e.preventDefault();
              var input = {
                id: uuidv1(),
                timestamp: Date.now(),
                title: titleInput.value,
                body: bodyInput.value,
                author: authorInput.value,
                category: categoryInput.value
              };
              this.props.submitPost(input);
              e.target.reset();
            }}>
          <span  onClick={(event) => this.changeOpenState(false)} style={{ cursor: 'pointer' }}>
            Close
          </span>
          <div className="form-group text-left">
            <label className="row">Title: </label>
            <div className="row">
              <input
                type="text"
                name="title"
                ref={node => titleInput = node}
                className="form-control" />
            </div>
          </div>
          <br/>
          <div className="form-group text-left">
            <label className="row">Author: </label>
            <div className="row">
              <input
                type="text"
                name="author"
                ref={node => authorInput = node}
                className="form-control" />
            </div>
          </div>
          <br/>
          <div className="form-group text-left">
            <label className="row">Category: </label>
            <div className="row">
            <select className="form-control"  name="category" ref={node => categoryInput = node}>
              {this.props.categories.map((category, i) => {
                return (<option key={i} value={category.name}>{category.name}</option>)
              })}
            </select>
            </div>
          </div>
          <br/>
          <div className="form-group text-left">
            <label className="row">Body: </label>
            <div className="row">
              <textarea
                name="body"
                ref={node => bodyInput = node}
                className="form-control" />
            </div>
          </div>
          <br/>
          <div className="form-group text-left">
            <div className="col-sm-2">
              <input type="submit" className="btn btn-default"/>
            </div>
          </div>
        </form>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      categories: state.categories,
    };
};

export default connect(mapStateToProps)(PostForm);