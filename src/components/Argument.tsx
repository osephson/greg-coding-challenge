import * as React from "react";
import * as Chakra from "@chakra-ui/react";

import { ArgumentContext } from "./ArgumentContext";

interface ConstantProps {
  handleChange: (value: boolean) => void;
}

function Constant({ handleChange }: ConstantProps) {
  const { args } = React.useContext(ArgumentContext);
  const argSelect = React.useRef<HTMLSelectElement>(null);

  const handleChangeArgument = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange(e.target.value === "TRUE");
    },
    [handleChange]
  );

  React.useEffect(() => {
    if (argSelect.current) handleChange(argSelect.current.value === "TRUE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args]);

  return (
    <Chakra.HStack>
      <Chakra.Select ref={argSelect} onChange={(e) => handleChangeArgument(e)}>
        {Object.keys(args).map((key, index) => {
          let value: boolean = true;
          if (args) value = args[key];
          return (
            <option key={index} value={value === true ? "TRUE" : "FALSE"}>
              {key}
            </option>
          );
        })}
      </Chakra.Select>
    </Chakra.HStack>
  );
}

export default Constant;
