import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Root from './root.jsx';
import ErrorPage from './components/ErrorComponent/ErrorPage.jsx';
import GitHub from './components/GitHub/GitHub.jsx';
import SnakeGame from './components/SnakeGame/SnakeGame.jsx';
import LoanVisualizer from './components/LoanVisualizer/LoanVisualizer.jsx';
import  MemeCreator  from './components/MemeCreator/MemeCreator.jsx';
import EditMeme from './components/MemeCreator/EditMeme.jsx';
import MyTodo from './components/Todo/MyToDo.jsx'
import Board from './components/TicTacToe/Board.jsx';
import {Provider} from 'react-redux'
import {store} from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter > 
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="tictactoe" element={<Board size="3" />} />
          <Route path="github" element={<GitHub />} />
          <Route path="snakegame" element={<SnakeGame />} />
          <Route path="loanvisualizer" element={<LoanVisualizer />} />
          <Route path="memecreator" element={<MemeCreator />}>
            <Route path="edit" element={<EditMeme />} />
          </Route>
          <Route path="todo" element={<MyTodo />} />
          <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for unknown paths */}
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
