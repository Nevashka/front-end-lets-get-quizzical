import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { settingsReducer } from './reducers';

const store = createStore(settingsReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
