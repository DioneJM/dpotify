import { Box } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import AudioControls from "./AudioControls";
import { ApplicationState } from "../lib/store";

const BottomPlayer = () => {
  const songs = useStoreState<ApplicationState>((state) => state.activeSongs);
  const activeSong = useStoreState<ApplicationState>(
    (state) => state.activeSong
  );
  return (
    <Box height="100%" width="100%" bg="gray.900">
      {activeSong ? (
        <Flex align="center" justifyContent="space-between">
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="lg">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
          <Box padding="20px" color="white" width="40%">
            <AudioControls songs={songs} activeSong={activeSong} />
          </Box>
          <Box padding="20px" color="white" width="30%" textAlign="end">
            volume
          </Box>
        </Flex>
      ) : null}
    </Box>
  );
};

export default BottomPlayer;
