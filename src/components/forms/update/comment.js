import React, { Component }  from 'react';
import FontAwesome from 'react-fontawesome';

class EditCommentForm extends Component  {

    state = {
      id: this.props.comment.id,
      body: this.props.comment.body,
      isOpen: false
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        id: nextProps.comment.id,
        body: nextProps.comment.body
      })

      if(nextProps.comment.id !== this.state.id) {
        this.setState({
          isOpen: false
        })
      }
    }

    changeOpenState = (isOpen) => {
      this.setState({ isOpen: isOpen })      
    }

    updateBody = (body) => {
      this.setState({ body: body.trim() })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var input = {
          id: this.state.id,
          timestamp: Date.now(),
          body: this.state.body
        };
        this.props.updateComment(input);
        e.target.reset();
    }

    render() {
      const { body, isOpen } = this.state

      if(!isOpen) {
        return (
          <span  onClick={(event) => this.changeOpenState(true)}>
              <FontAwesome
                className='fa-plus-square'
                name='open'
                style={{ cursor: 'pointer' }} />
            </span>
        )
      }

      return (
        <form onSubmit={this.handleSubmit}>
          <span  onClick={(event) => this.changeOpenState(false)}>
              <FontAwesome
                className='fa-minus-square'
                name='close'
                style={{ cursor: 'pointer' }} />
          </span>
          <div className="form-group">
            <label className="col-sm-12 control-label">Body: </label>
            <div className="col-sm-12">
              <textarea
                name="body"
                value={body}
                onChange={(event) => this.updateBody(event.target.value)}
                className="form-control" />
            </div>
          </div>
          <br/>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" className="btn btn-default"/>
            </div>
          </div>
        </form>
      );
    }
};

export default EditCommentForm;
