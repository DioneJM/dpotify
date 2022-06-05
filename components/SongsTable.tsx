import { Box, IconButton, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Song } from "@prisma/client";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ApplicationState } from "../lib/store";
import { secondsToMinutes } from "../lib/timeFormatter";

const getNumberOfDaysString = (createdAtDate: Date) => {
  const daysSinceAdded: number =
    (new Date().getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24);
  const daysSinceAddedAbsolute = Math.round(daysSinceAdded);

  return `${daysSinceAddedAbsolute} days ago`;
};

const SongsTable = ({ songs = [] }) => {
  const playSongs = useStoreActions<ApplicationState>(
    (store) => store.changeActiveSongs
  );
  const setActiveSong = useStoreActions<ApplicationState>(
    (store) => store.changeActiveSong
  );
  const activeSong = useStoreState<ApplicationState>(
    (state) => state.activeSong
  );
  const handlePlay = (activeSong?: Song) => {
    setActiveSong(activeSong ?? songs[0]);
    playSongs(songs);
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
          onClick={() => handlePlay()}
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
                  transition: "all .2s",
                  "&:hover": {
                    bg: "rgba(255, 255, 255, 0.1",
                  },
                }}
                cursor="pointer"
                key={song.id}
                bg={
                  activeSong?.id === song.id
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent"
                }
                onClick={() => handlePlay(song)}
              >
                <Th fontWeight="400">{index + 1}</Th>
                <Th fontWeight="400">{song.name}</Th>
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
