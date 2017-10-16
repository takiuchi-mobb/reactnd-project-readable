import React, {Component} from 'react';
import uuidv1 from 'uuid/v1'

class CommentForm  extends Component  {

    state = {
      isOpen: false
    }

    changeOpenState = (isOpen) => {
      this.setState({ isOpen: isOpen })      
    }

    updateTitle = (title) => {
      this.setState({ title: title.trim() })
    }
    updateBody = (body) => {
      this.setState({ body: body.trim() })
    }

    render() {
      let bodyInput, authorInput = null;
      const { isOpen } = this.state
      if(!isOpen) {
        return (
          <div 
            style={{fontSize: '20px', marginBottom: '15px', cursor: 'pointer'}} 
            onClick={(event) => this.changeOpenState(true)}>Create
          </div>
        )
      }

      return (
        <form onSubmit={e => {
              e.preventDefault();
              var input = {
                id: uuidv1(),
                timestamp: Date.now(),
                body: bodyInput.value,
                author: authorInput.value,
                parentId: this.props.parentId
              };
              this.props.submitComment(input);
              e.target.reset();
            }}>
          <span  onClick={(event) => this.changeOpenState(false)} style={{ cursor: 'pointer' }}>Close</span>
          <div className="form-group text-left">
            <label className="row control-label">Author: </label>
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
            <label className="row control-label">Body: </label>
            <div className="row">
              <textarea
                name="body"
                ref={node => bodyInput = node}
                className="form-control" />
            </div>
          </div>
          <br/>
          <div className="form-group">
            <div className="row">
              <input type="submit" className="btn btn-default"/>
            </div>
          </div>
        </form>
      )
    }
}

export default CommentForm;
