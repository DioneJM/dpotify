import NextLink from "next/link";
import { LinkOverlay, ListIcon } from "@chakra-ui/layout";

const MenuItemLink = ({ item }) => {
  return (
    <NextLink href={item.route} passHref>
      <LinkOverlay>
        <ListIcon as={item.icon} color="white" marginRight="20px" />
        {item.name}
      </LinkOverlay>
    </NextLink>
  );
};

export default MenuItemLink;
