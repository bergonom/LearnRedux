/*
Pure Function:
* Given the same input, will always return the same output.
* Produces no side effects.
* Doesn't rely on asynchronous calls or promises
  (#3 is given on another site as: Relies on no external mutable state.)

https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.a7rua3yba

A dead giveaway that a function is impure is if it makes
sense to call it without using its return value. For pure
functions, that’s a noop.
*/


var redux = require('redux');
console.log('starting redux todo example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

var currentState = store.getState();
console.log('currentState', currentState);

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  if(state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading ...'
  } else if(state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
  }
})

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Joel'));

store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.addHobby('Walking'));
store.dispatch(actions.removeHobby(2));

store.dispatch(actions.addMovie('Barf Lord','RomHor'));
store.dispatch(actions.removeMovie(1));

store.dispatch(actions.changeName('Bob'));
// unsubscribe();
