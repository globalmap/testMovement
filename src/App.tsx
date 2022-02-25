import React from 'react';
import 'antd/dist/antd.min.css'
import s from './App.module.scss'
import List from './components/List/List';
import { Player } from './components/Player/Player';
import { useAppSelector } from './utils/hooks';
import { getPlayerState } from './redux/selectors';
import DeleteModel from './components/DeleteModel/DeleteModel';

function App() {
  const playerLoaded = useAppSelector(getPlayerState)

  return (
    <div className={s.container}>
      <Player />
      {playerLoaded && <List />}
      <DeleteModel />
    </div>
  );
}

export default App;
