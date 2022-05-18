import prisma from "../lib/prisma";
import GradientLayout from "../components/GradientLayout";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import { FC } from "react";
import { useMe } from "../lib/hooks";

interface ServerSideProps {
  artists: Artist[];
}

const Home: FC<ServerSideProps> = ({ artists }) => {
  const { user, isLoading } = useMe();
  const color = "purple";
  const fullName = isLoading ? "..." : `Hi ${user.firstName} ${user.lastName}`;
  return (
    <GradientLayout
      color={color}
      title={fullName}
      subtitle={`${user?.playlistCount ?? "..."} public playlists`}
      description="some album I made"
      imageSrc="https://geekhack.org/index.php?action=dlattach;attach=89492;type=avatar"
      roundImage
    >
      <Box color={"white"} paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex justify={"center"}>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%" height={"20%"}>
              <Box
                bg={`${color}.900`}
                borderRadius="4px"
                padding="15px"
                width="100%"
              >
                <Image src="https://placedog.net/300/300" borderRadius="100%" />
                <Box marginTop="10px">
                  <Text>{artist.name}</Text>
                  <Text>{"Artist"}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async (): Promise<{
  props: ServerSideProps;
}> => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
