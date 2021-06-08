import React, { useState } from "react";
import { Child } from "./child";

export interface Props {}

export const Test: React.FunctionComponent<Props> = () => {
  const [parentName, setParentName] = useState<string>("Mr John Obi");
  const updateName = (name: string): void => {
    setParentName(name);
    console.log(parentName)
  };

  return (
    <div>
      <Child name={parentName} updateName={updateName} />
    </div>
  );
};
