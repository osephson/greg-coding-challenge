import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcon from "@chakra-ui/icons";

import { ArgumentContext } from "../components/ArgumentContext";

import Constant from "./Constant";
import Operation from "./Operation";

import { OperationType } from "../types/OperationType";
import Argument from "./Argument";

interface OperationBuilderProps {
  onValueChange: (value: boolean | null) => void;
}

const evaluateOperation = (
  operationType: OperationType | null,
  args: (boolean | null)[]
) => {
  if (args.length === 0) return null;
  if (operationType === null) return null;
  if (
    operationType === OperationType.CONSTANT ||
    operationType === OperationType.ARGUMENT
  ) {
    return args[0] ?? null;
  }
  return args.reduce((result, arg) => {
    if (result === null) return arg;

    if (arg === null) return result;

    if (operationType === OperationType.AND) {
      return result && arg;
    }
    if (operationType === OperationType.OR) {
      return result || arg;
    }
    return null;
  });
};

function OperationBuilder({ onValueChange }: OperationBuilderProps) {
  const argContext = React.useContext(ArgumentContext);
  const [operationType, setOperationType] =
    React.useState<OperationType | null>(null);
  const [args, setArgs] = React.useState<(boolean | null)[]>([]);

  const handleOperationTypeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === "") {
        setOperationType(null);
        onValueChange(evaluateOperation(operationType, []));
        return;
      }

      const newOperationType = e.target.value as OperationType;
      setOperationType(newOperationType);

      const newArgs =
        newOperationType === OperationType.CONSTANT
          ? [true]
          : newOperationType === OperationType.ARGUMENT
          ? [argContext.args[Object.keys(argContext.args)[0]]]
          : newOperationType === OperationType.AND ||
            newOperationType === OperationType.OR
          ? [null, null]
          : [];

      setArgs(newArgs);

      onValueChange(evaluateOperation(newOperationType, newArgs));
    },
    [argContext.args, onValueChange, operationType]
  );

  const handleArgValueChange = React.useCallback(
    (value, index) => {
      const newArgs = [
        ...args.slice(0, index),
        value,
        ...args.slice(index + 1),
      ];

      setArgs(newArgs);
      onValueChange(evaluateOperation(operationType, newArgs));
    },
    [args, operationType, onValueChange]
  );

  const handleOperationChange = React.useCallback(
    (value: OperationType) => {
      const newOperationType = value;
      setOperationType(newOperationType);
      onValueChange(evaluateOperation(newOperationType, args));
    },
    [args, onValueChange]
  );

  return (
    <Chakra.VStack align="flex-start">
      <Chakra.HStack align="flex-start">
        {operationType === null && (
          <Chakra.Select onChange={handleOperationTypeChange}>
            <option value="">select</option>
            <option value={OperationType.CONSTANT}>constant</option>
            <option value={OperationType.ARGUMENT}>argument</option>
            <option value={OperationType.AND}>and</option>
            <option value={OperationType.OR}>or</option>
          </Chakra.Select>
        )}
        {(operationType === OperationType.AND ||
          operationType === OperationType.OR) && (
          <Chakra.VStack align="flex-start">
            <Operation
              value={operationType}
              handleOperationChange={(value) => handleOperationChange(value)}
            />
            <Chakra.VStack align="flex-start" pl={4}>
              {args.map((arg, index) => (
                <div key={index}>
                  <OperationBuilder
                    onValueChange={(value) =>
                      handleArgValueChange(value, index)
                    }
                  />
                </div>
              ))}
            </Chakra.VStack>
            <Chakra.Button
              w="100%  "
              colorScheme="teal"
              onClick={() => setArgs([...args, null])}
            >
              +Add Operation
            </Chakra.Button>
          </Chakra.VStack>
        )}
        {operationType === OperationType.CONSTANT && (
          <Constant handleChange={(value) => handleArgValueChange(value, 0)} />
        )}
        {operationType === OperationType.ARGUMENT && (
          <Argument handleChange={(value) => handleArgValueChange(value, 0)} />
        )}
        <Chakra.IconButton
          aria-label="close"
          icon={<ChakraIcon.CloseIcon />}
          onClick={() => {
            setOperationType(null);
            onValueChange(evaluateOperation(null, args));
          }}
        />
      </Chakra.HStack>
    </Chakra.VStack>
  );
}

export default OperationBuilder;
