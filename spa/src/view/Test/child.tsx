import React, { useState } from "react";

export interface Props {
  name : string 
  updateName : (arg: string) => void
}

export const Child: React.FunctionComponent<Props> = ({name, updateName}) => {
  return (
    <div>
    {/* <h1> {firstChildName} </h1> */}
    <button onClick={() => updateName('Micheal')}>first child</button>
    </div>
  )
};


