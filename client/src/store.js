import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './reducers/tokenReducer';

const store = configureStore({
    reducer: {
        token: tokenReducer
    }
});

console.log(store.getState());

export default store;
