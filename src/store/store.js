import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../reducer/todo/todo'


export const store =  configureStore({
    reducer : todoReducer
});

