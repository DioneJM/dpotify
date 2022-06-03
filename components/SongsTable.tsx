import {
  Box,
  IconButton,
  Table,
  Th,
  Thead,
  Tr,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Song } from "@prisma/client";

const SongsTable = ({ songs }) => {
  const getNumberOfDaysString = (createdAtDate: Date) => {
    const daysSinceAdded: number =
      new Date().getDate() - createdAtDate.getDate();
    const daysSinceAddedAbsolute = Math.abs(daysSinceAdded);

    return `${daysSinceAddedAbsolute} days go`;
  };

  const secondsToMinutes = (amountInSeconds: number): string => {
    const minutes = Math.floor(amountInSeconds / 60);
    const seconds: number = amountInSeconds - minutes * 60;
    const pad = "00";
    return `${minutes}: ${(seconds.toString() + pad).substring(0, pad.length)}`;
  };
  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          icon={<BsFillPlayFill />}
          fontSize="30px"
          colorScheme="green"
          isRound
          aria-label="play button"
        />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>{<AiOutlineClockCircle />}</Th>
          </Tr>
        </Thead>
        {songs.map((song: Song, index) => {
          return (
            <Tr>
              <Th>{index + 1}</Th>
              <Th>
                <Box flexDirection="row">
                  <Image
                    boxSize="40px"
                    src={`https://picsum.photos/400?random=${song.id}`}
                  />
                  <Text fontSize="md">{song.name}</Text>
                  <Text fontSize="xs" fontWeight="300">
                    {song.artist.name}
                  </Text>
                </Box>
              </Th>
              <Th fontSize="md">{getNumberOfDaysString(song.createdAt)}</Th>
              <Th>{secondsToMinutes(song.duration)}</Th>
            </Tr>
          );
        })}
      </Table>
    </Box>
  );
};

export default SongsTable;
