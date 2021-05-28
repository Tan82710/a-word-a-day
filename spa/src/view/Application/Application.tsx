import React from "react";
// import { List } from "./List";
import { Header } from "./Header";
import { Filter } from "./Filter";

export interface Props { }

export const Application: React.FunctionComponent<Props> = () => {
  //TODO on récupère les cartes dans un tableau selon le filtre sélectionné
  return (
    <div>
      <div>This is your app!</div>
      <Header />
      <Filter />
      {/* <List /> On assigne le tableau à list */}
    </div>
  )
};


