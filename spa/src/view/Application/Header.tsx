import React from "react";

export interface Props { }

export const Header: React.FunctionComponent<Props> = () => {
  return (
<div className="tabs is-centered">
  <ul>
    <li className="is-active"><a>List</a></li>
    <li><a>Quizz</a></li>
  </ul>

</div>
  )
};
