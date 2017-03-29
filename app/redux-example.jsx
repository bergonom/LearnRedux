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
var axios = require('axios');
console.log('starting redux todo example');


// Name reducer and action generators
// -----------------------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

// Hobbies reducer and action generators
// -----------------------------------
var nextHobbyId = 1;
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

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
}

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}


// Movies reducer and action generators
// -----------------------------------
var nextMovieId = 1;
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

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
}

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}


// Map reducer and action generators
// -----------------------------------
var mapReducer = (state = {isFecthing: false, url: undefined}, action) => {
  switch(action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFecthing: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFecthing: false,
        url: action.url
      };
    default:
      return state;
  }
}

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(response) {
    var loc = response.data.loc;
    var baseURL = 'http://maps.google.com?q=';
    store.dispatch(completeLocationFetch(baseURL + loc));

  });
}

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
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
  if(state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading ...'
  } else if(state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
  }
})

var currentState = store.getState();
console.log('currentState', currentState);

fetchLocation();

store.dispatch(changeName('Joel'));

store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));

store.dispatch(addMovie('Barf Lord','RomHor'));
store.dispatch(removeMovie(1));

store.dispatch(changeName('Bob'));
// unsubscribe();
