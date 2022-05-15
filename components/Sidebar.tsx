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
  const { playlists } = usePlaylist();
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
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
        <Box height="66%" overflow="auto" paddingY="20px" paddingX="20px">
          <List spacing={2}>
            {playlists.map((list) => (
              <ListItem key={list.id}>
                <LinkBox>
                  <NextLink href="/">
                    <LinkOverlay>{list.name}</LinkOverlay>
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
