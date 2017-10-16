import React  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Header extends React.Component{
	render() {
  return (
    <div className="container">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
            	<li><Link to="/">Home</Link></li>
      				{this.props.categories.map((b, i) => {
      				  return(
      				    <li key={i}>
      				      <Link to={`/${b.name}/posts`}>{b.name}</Link>
      				    </li>
      				  )
      				})}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );		
	}

};

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
};

export default connect(mapStateToProps)(Header);
