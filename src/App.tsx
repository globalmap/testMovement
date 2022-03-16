import React from 'react';
import s from "./App.module.scss";
import Menu from './components/Menu/Menu';
import Player from './components/Player/Player';

function App() {
  return (
    <div className={s.container}>
      <Player />
      <Menu />
    </div>
  );
}

export default App;
