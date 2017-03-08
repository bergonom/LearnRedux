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
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1,
  nextMovieId = 1;


var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var hobbiesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => {
            return hobby.id !== action.id
      });
    default:
      return state;
  }
};

var moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => {
            return movie.id !== action.id
      });
    default:
      return state;
  }
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

// 'redux.compose' allows for the redux chrome extension to work
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var currentState = store.getState();
console.log('currentState', currentState);

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log('name is', state.name);
  document.getElementById('app').innerHTML = state.name;
  console.log('new state is', state);
})

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Joel'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Barf Lord',
  genre: 'RomHor'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});

// unsubscribe();

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Bob'
});
