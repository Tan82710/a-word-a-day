import React, { useState } from "react";
import { Header } from "./Header";
import { Filter } from "./Filter";

export interface Props {}

export const Application: React.FunctionComponent<Props> = () => {
  //TODO on récupère les cartes dans un tableau selon le filtre sélectionné
  return (
    <div>
      <Header />
      {/* <Filter /> */}
    </div>
  )
};


