import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";
import BottomPlayer from "./BottomPlayer";

export const sidebarWidth = "250px";
export const bottomPlayerHeight = "100px";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box
        position="absolute"
        top="0"
        left="0"
        width={sidebarWidth}
        height="100vh"
      >
        <Sidebar />
      </Box>
      <Box
        maxHeight={"200px"}
        marginLeft={sidebarWidth}
        marginBottom={bottomPlayerHeight}
      >
        {children}
      </Box>
      <Box
        position="absolute"
        left="0"
        bottom="0"
        width="100vw"
        height={bottomPlayerHeight}
        overflow="hidden"
      >
        <BottomPlayer />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
