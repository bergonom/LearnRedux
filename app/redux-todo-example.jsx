var redux = require('redux');
console.log('starting redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};

// 'redux.compose' allows for the redux chrome extension to work
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
store.subscribe(() => {
  var state = store.getState();
  console.log('name is', state.name);
})

var currentState = store.getState();
console.log('currentState', currentState);

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log('searchText is', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
})

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'work'
};

store.dispatch(action);

action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Joel'
};

store.dispatch(action);

action = {
  type: 'CHANGE_SEARCH_TEXT',
  name: 'Joel'
};
