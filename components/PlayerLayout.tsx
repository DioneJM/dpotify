import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";
import BottomPlayer from "./BottomPlayer";
import { useMobileLayout } from "../lib/hooks";

export const defaultSidebarWidth = "250px";
export const bottomPlayerHeight = "100px";

const PlayerLayout = ({ children }) => {
  const [mobileLayout] = useMobileLayout();
  const sidebarWidth = mobileLayout ? 0 : defaultSidebarWidth;
  return (
    <Box width="100vw" height="100vh">
      {!mobileLayout && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width={defaultSidebarWidth}
          height="100vh"
        >
          <Sidebar />
        </Box>
      )}
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
