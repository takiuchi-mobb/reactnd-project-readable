import React  from 'react';
import { Route } from 'react-router';
import Header from './components/common/header'
import Home from './components/Home'
import PostDetail from './components/PostDetail'

const App = (props) => {
  return (
    <div>
	  	<Header />
	 	<Route exact path='/' component={Home}/>
	 	<Route exact path='/categories' component={Home} />
		<Route path="/:category/posts" component={Home} />
		<Route path="/posts/:id" component={PostDetail} />
    </div>
  );
};

export default App
