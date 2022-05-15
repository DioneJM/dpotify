import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { FC, useState } from "react";
import { auth, AuthMode } from "../lib/mutations";
import NextImage from "next/image";
import { useRouter } from "next/router";

export interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await auth(mode, {
      email,
      password,
    });
    setIsLoading(false);
    if (response.email === email) {
      await router.push("/");
    }
  };
  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src={"/logo.svg"} height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              isLoading={isLoading}
              bg="green.500"
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
