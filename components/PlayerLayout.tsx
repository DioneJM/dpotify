import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";
import BottomPlayer from "./BottomPlayer";

export interface PlayerLayoutProps {}

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="250px"
        backgroundColor={"red"}
        height={"100vh"}
      >
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      <Box
        position="absolute"
        left="0"
        bottom="0"
        width="100vw"
        height="100px"
        backgroundColor="blue"
      >
        <BottomPlayer />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
