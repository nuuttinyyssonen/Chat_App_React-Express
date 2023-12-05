import { configureStore } from '@reduxjs/toolkit';
import onlineUserReducer from './reducers/onlineUserReducer';

const store = configureStore({
  reducer: {
    onlineUsers: onlineUserReducer
  }
});

console.log(store.getState());

export default store;
