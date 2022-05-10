import * as React from "react";
import * as Chakra from "@chakra-ui/react";

import OperationBuilder from "./OperationBuilder";

function OperationBoard() {
  const [value, setValue] = React.useState<boolean | null>(null);

  return (
    <Chakra.VStack align="flex-start" overflowY="auto">
      <div>Result: {String(value)}</div>
      <OperationBuilder onValueChange={setValue} />
    </Chakra.VStack>
  );
}

export default OperationBoard;
