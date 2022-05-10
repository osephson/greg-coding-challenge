import * as React from "react";

import { ArgsType } from "../types/ArgsType";

interface ArgumentState {
  args: ArgsType;
  setArgs: React.Dispatch<React.SetStateAction<ArgsType>>;
}

export const ArgumentContext = React.createContext<ArgumentState>({
  args: {},
  setArgs: () => null,
});

const ArgumentProvider: React.FC = (props) => {
  const [args, setArgs] = React.useState<ArgsType>({ X: true });
  return (
    <ArgumentContext.Provider value={{ args, setArgs }}>
      {props.children}
    </ArgumentContext.Provider>
  );
};

export default ArgumentProvider;
