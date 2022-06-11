import { Box } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import AudioControls from "./AudioControls";
import { ApplicationState } from "../lib/store";
import { useMobileLayout } from "../lib/hooks";

const DesktopBottomPlayer = ({ activeSong, songs }) => {
  if (!activeSong) {
    return null;
  }

  return (
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
  );
};

const MobileBottomPlayer = ({ activeSong, songs }) => {
  if (!activeSong) {
    return null;
  }
  return (
    <Box>
      <Flex direction={"column"} padding="10px 0px 0px 0px" align="center">
        <Box color="white">
          <Text fontSize="sm">{`${activeSong.name} - ${activeSong.artist.name}`}</Text>
        </Box>
      </Flex>
      <Box padding="5px 20px 20px 20px" color="white" width="100%">
        <AudioControls songs={songs} activeSong={activeSong} />
      </Box>
    </Box>
  );
};

const BottomPlayer = () => {
  const songs = useStoreState<ApplicationState>((state) => state.activeSongs);
  const activeSong = useStoreState<ApplicationState>(
    (state) => state.activeSong
  );
  const [mobileLayout] = useMobileLayout();

  if (!activeSong) {
    return null;
  }

  return (
    <Box height="100%" width="100%" bg="gray.900">
      {mobileLayout ? (
        <MobileBottomPlayer songs={songs} activeSong={activeSong} />
      ) : (
        <DesktopBottomPlayer songs={songs} activeSong={activeSong} />
      )}
    </Box>
  );
};

export default BottomPlayer;
