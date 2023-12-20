import { configureStore } from '@reduxjs/toolkit';
import onlineUserReducer from './reducers/onlineUserReducer';

const store = configureStore({
  reducer: {
    onlineUsers: onlineUserReducer
  }
});

export default store;
