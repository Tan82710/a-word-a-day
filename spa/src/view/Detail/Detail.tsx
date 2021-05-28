import React from "react";
import { props } from "ramda";
import { useParams } from "react-router-dom";

import { example } from "./../Application/List";


// interface MatchParams {
//   id: string;
// }

export interface Props { }

export const Detail: React.FunctionComponent<Props> = () => {
  const id = useParams();
  console.log(id);
  console.log(example);
  return (
      <div>Detail Page du produit</div>
  )
};
