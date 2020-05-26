import React from 'react';
import './sass/App.scss';
import { GlobalProvider } from './context/GlobalState';
import Main from './components/Main'
import SolList from './components/SolList';
import dotenv from 'dotenv';

dotenv.config();

function App() {
  return (
    <GlobalProvider>
      <Main />
      <SolList />
    </GlobalProvider>
  );
}

export default App;
