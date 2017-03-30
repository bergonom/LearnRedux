var redux = require('redux');
var thunk = require('redux-thunk').default;
var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('./../reducers/index');

export var configure = () => {
  var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
  });

  // 'redux.compose' allows for the redux chrome extension to work
  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
