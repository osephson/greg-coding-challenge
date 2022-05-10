import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import { ArgumentContext } from "./components/ArgumentContext";

import OperationBoard from "./components/OperationBoard";
import ArgumentEdit from "./components/ArgumentEdit";

export const App = () => {
  const { args, setArgs } = React.useContext(ArgumentContext);
  const handleAddArgument = React.useCallback(() => {
    args["newarg"] = true;
    setArgs({ ...args });
  }, [args, setArgs]);

  return (
    <Chakra.ChakraProvider theme={Chakra.theme}>
      <Chakra.Box textAlign="center" fontSize="xl">
        <Chakra.Grid p={1}>
          <ColorModeSwitcher justifySelf="flex-end" />

          <Chakra.Container maxW="5xl">
            <Chakra.Stack
              textAlign="center"
              align="center"
              spacing={{ base: 8, md: 10 }}
              pt={{ base: 20, md: 28 }}
              pb={{ base: 5, md: 7 }}
            >
              <Chakra.Heading
                fontWeight={600}
                fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
                lineHeight="110%"
              >
                Coding Challenge{" "}
                <Chakra.Text as="span" color="orange.400">
                  For Greg and Skippet
                </Chakra.Text>
              </Chakra.Heading>
              <Chakra.Text color="gray.500" maxW="3xl">
                A system for defining logical operations
              </Chakra.Text>
              <Chakra.Stack spacing={6} direction="row">
                <Chakra.Button
                  rounded="full"
                  px={6}
                  colorScheme="orange"
                  bg="orange.400"
                  _hover={{ bg: "orange.500" }}
                  onClick={handleAddArgument}
                >
                  Add Argument
                </Chakra.Button>
              </Chakra.Stack>
            </Chakra.Stack>

            <ArgumentEdit />

            <Chakra.Stack maxH="50vh">
              <OperationBoard />
            </Chakra.Stack>
          </Chakra.Container>
        </Chakra.Grid>
      </Chakra.Box>
    </Chakra.ChakraProvider>
  );
};
