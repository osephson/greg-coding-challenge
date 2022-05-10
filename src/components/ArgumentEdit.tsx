import * as React from "react";
import * as Chakra from "@chakra-ui/react";

import { ArgumentContext } from "./ArgumentContext";

function ArgumentEdit() {
  const { args, setArgs } = React.useContext(ArgumentContext);

  const handleChangeKeyName = React.useCallback(
    (key: string, newKey: string) => {
      if (args && newKey !== "") {
        args[newKey] = args[key];
        console.log(args);
        delete args[key];
        console.log(args);
        setArgs({ ...args });
      }
    },
    [args, setArgs]
  );

  const handleChangeArgumentValue = React.useCallback(
    (key: string, value: boolean) => {
      if (args) {
        args[key] = value;
        setArgs({ ...args });
      }
    },
    [args, setArgs]
  );

  return (
    <Chakra.VStack>
      {Object.keys(args || {}).map((key, index) => (
        <Chakra.HStack key={index}>
          <Chakra.FormControl>
            <Chakra.InputGroup>
              <Chakra.Input
                value={key}
                onChange={(e) => handleChangeKeyName(key, e.target.value)}
              ></Chakra.Input>
              <Chakra.Select
                value={args[key] === true ? "TRUE" : "FALSE"}
                onChange={(e) =>
                  handleChangeArgumentValue(key, e.target.value === "TRUE")
                }
              >
                <option value="TRUE">true</option>
                <option value="FALSE">false</option>
              </Chakra.Select>
            </Chakra.InputGroup>
          </Chakra.FormControl>
        </Chakra.HStack>
      ))}
    </Chakra.VStack>
  );
}

export default ArgumentEdit;
