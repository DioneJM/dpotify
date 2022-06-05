import { Box, IconButton, Table, Th, Thead, Tr, Tbody } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Song } from "@prisma/client";

const SongsTable = ({ songs = [] }) => {
  const getNumberOfDaysString = (createdAtDate: Date) => {
    const daysSinceAdded: number =
      createdAtDate.getDate() - new Date().getDate();
    const daysSinceAddedAbsolute = Math.abs(daysSinceAdded);

    return `${daysSinceAddedAbsolute} days ago`;
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
        <Tbody>
          {songs.map((song: Song, index) => {
            return (
              <Tr
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255, 255, 255, 0.1",
                  },
                }}
                cursor="cursor"
                key={song.id}
              >
                <Th fontWeight="400">{index + 1}</Th>
                <Th fontWeight="400">{song.artist.name}</Th>
                <Th fontSize="xs" fontWeight="300">
                  {`${song.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })} (${getNumberOfDaysString(song.createdAt)})`}
                </Th>
                <Th fontWeight="300">{secondsToMinutes(song.duration)}</Th>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongsTable;
