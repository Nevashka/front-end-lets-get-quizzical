
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import searchReducer from '../reducers/settingsReducer'

const TestProviders = ({ initState }) => {
    initState ||= { category: '', difficulty: '', questions: [], loading: false, qidx:0, score: 0 };
    let testReducer = () => searchReducer(initState, { type: '@@INIT' })
    const testStore = createStore(testReducer, applyMiddleware(thunk))

    return ({ children }) => (
        <Provider store={testStore}>
            { children }
        </Provider>
    )
}

const renderWithReduxProvider = (ui, options={}) => {
    let TestWrapper = TestProviders(options)
    render(ui, { wrapper: TestWrapper, ...options })
}
global.renderWithReduxProvider = renderWithReduxProvider
global.React = React;
global.render = render;
global.userEvent = userEvent;
