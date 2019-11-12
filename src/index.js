import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { useLocalStore } from 'mobx-react';
import { App } from './App';
import { createStore } from './store';

export const StoreContext = createContext(null);

export const StoreProvider = ({ createStore, children }) => (
  <StoreContext.Provider value={useLocalStore(createStore)}>
    {children}
  </StoreContext.Provider>
);

ReactDOM.render(
  <StoreProvider createStore={createStore}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
