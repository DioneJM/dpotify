import { Box, Flex } from "@chakra-ui/layout";
import { FC, useState } from "react";
import { AuthMode } from "../lib/mutations";

export interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex justify="center" align="center" height="100px">
        hello
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px">
        form
      </Flex>
    </Box>
  );
};

export default AuthForm;
