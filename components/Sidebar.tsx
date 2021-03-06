import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import MenuItemLink from "./MenuItemLink";
import { usePlaylist } from "../lib/hooks";
import { bottomPlayerHeight } from "./PlayerLayout";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favourites",
    route: "/favourites",
  },
];

const Sidebar = () => {
  const { playlists = [] } = usePlaylist();
  return (
    <Box width="100%" height="100vh" bg="black" paddingX="5px" color="gray">
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menuItem) => {
              return (
                <ListItem paddingX="20px" key={menuItem.name}>
                  <LinkBox>
                    <MenuItemLink item={menuItem} />
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider marginY="20px" color="gray.800" />
        <Box marginBottom="20px">
          <List spacing={2}>
            {musicMenu.map((item) => {
              return (
                <ListItem paddingX="20px" fontSize="16px" key={item.name}>
                  <LinkBox>
                    <MenuItemLink item={item} />
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider marginY="20px" color="gray.800" />
        <Box
          height="66%"
          overflow="auto"
          paddingX="20px"
          paddingTop="20px"
          paddingBottom={bottomPlayerHeight}
        >
          <List spacing={2}>
            {playlists?.map((list) => (
              <ListItem key={list.id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: list.id },
                    }}
                  >
                    <LinkOverlay cursor="pointer">{list.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
