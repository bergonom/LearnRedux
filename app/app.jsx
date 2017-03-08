var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Load Foundation
// @TODO: What do style! and css! do?
// Partial answer: They are loaders
$(document).foundation();

require('style!css!sass!applicationStyles')

ReactDOM.render(
  <p>Boilerplate 3 Project</p>,

  document.getElementById('app')
);

// require('./redux-example.jsx');
require('./redux-todo-example.jsx');
