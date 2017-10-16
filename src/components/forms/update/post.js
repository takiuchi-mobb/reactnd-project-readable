import React, { Component }  from 'react';
import FontAwesome from 'react-fontawesome';

class EditPostForm extends Component  {

    state = {
      id: this.props.post.id,
      title: this.props.post.title,
      body: this.props.post.body,
      isOpen: false
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        id: nextProps.post.id,
        title: nextProps.post.title,
        body: nextProps.post.body
      })

      if(nextProps.post.id !== this.state.id) {
        this.setState({
          isOpen: false
        })
      }
    }
    changeOpenState = (isOpen) => {
      this.setState({ isOpen: isOpen })      
    }

    updateTitle = (title) => {
      this.setState({ title: title })
    }
    updateBody = (body) => {
      this.setState({ body: body })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var input = {
          id: this.state.id,
          timestamp: Date.now(),
          title: this.state.title,
          body: this.state.body
        };
        this.props.updatePost(input);
        e.target.reset();
    }

    render() {
      const { title, body, isOpen } = this.state

      if(!isOpen) {
        return (
          <span  onClick={(event) => this.changeOpenState(true)}>
            <FontAwesome
              className='fa-plus-square'
              name='open'
              size='2x'
              style={{ cursor: 'pointer' }} />
          </span>
        )
      }

      return (
        <form onSubmit={this.handleSubmit}
              className="form-horizontal">
          <span  onClick={(event) => this.changeOpenState(false)}>
            <FontAwesome
              className='fa-minus-square'
              name='close'
              size='2x'
              style={{ cursor: 'pointer' }} />
          </span>
          <div className="form-group">
            <label className="col-sm-2 control-label">Title: </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(event) => this.updateTitle(event.target.value)}
                className="form-control" />
            </div>
          </div>
          <br/>

          <div className="form-group">
            <label className="col-sm-2 control-label">Body: </label>
            <div className="col-sm-10">
              <textarea
                name="body"
                value={body}
                onChange={(event) => this.updateBody(event.target.value)}
                className="form-control" />
            </div>
          </div>
          <br/>

          <div className="input-group">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" className="btn btn-default"/>
            </div>
          </div>
        </form>
      );

    }
};

export default EditPostForm;
