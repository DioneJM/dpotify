import { Box } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import AudioControls from "./AudioControls";

const BottomPlayer = () => {
  return (
    <Box height="100%" width="100%" bg="gray.900">
      <Flex align="center" justifyContent="space-between">
        <Box padding="20px" color="white">
          <Text fontSize="lg">Song title</Text>
          <Text fontSize="sm">Artist name</Text>
        </Box>
        <Box padding="20px" color="white" width="40%">
          <AudioControls />
        </Box>
        <Box padding="20px" color="white">
          volume
        </Box>
      </Flex>
    </Box>
  );
};

export default BottomPlayer;
