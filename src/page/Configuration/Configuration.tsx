import React from "react";
import s from "./Configuration.module.scss";

import { Player } from "../../components/Player/Player";
import List from "../../components/List/List";


export const Configuration = () => {
  return (
    <section>
      <Player />
      <List />
    </section>
  );
};

