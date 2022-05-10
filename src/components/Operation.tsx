import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import { OperationType } from "../types/OperationType";

interface OperationProps {
  value: OperationType;
  handleOperationChange: (value: OperationType) => void;
}

function Operation({
  value,
  handleOperationChange: handleChangeOperation,
}: OperationProps) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChangeOperation(e.target.value as OperationType);
    },
    [handleChangeOperation]
  );

  return (
    <Chakra.HStack>
      <Chakra.Select defaultValue={value} onChange={handleChange}>
        <option value="AND">and</option>
        <option value="OR">or</option>
      </Chakra.Select>
    </Chakra.HStack>
  );
}

export default Operation;
