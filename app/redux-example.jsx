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

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return state;
  }
  return state;
};
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Joel'
}

store.dispatch(action);

console.log("name should be Joel", store.getState());
