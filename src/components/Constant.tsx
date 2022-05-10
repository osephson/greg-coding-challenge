import * as React from "react";
import * as Chakra from "@chakra-ui/react";

interface ConstantProps {
  handleChange: (value: boolean) => void;
}

function Constant({ handleChange }: ConstantProps) {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange(e.target.value === "TRUE");
    },
    [handleChange]
  );

  return (
    <Chakra.HStack>
      <Chakra.Select onChange={(e) => onChange(e)}>
        <option value="TRUE">true</option>
        <option value="FALSE">false</option>
      </Chakra.Select>
    </Chakra.HStack>
  );
}

export default Constant;
