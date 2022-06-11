import {
  Box,
  Center,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Song } from "@prisma/client";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ApplicationState } from "../lib/store";
import { secondsToMinutes } from "../lib/timeFormatter";
import { useMobileLayout } from "../lib/hooks";

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
  const [mobileLayout] = useMobileLayout();

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
      <Table variant="unstyled" size={mobileLayout ? "sm" : "md"}>
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
              {mobileLayout ? (
                <Center>
                  <AiOutlineClockCircle />
                </Center>
              ) : (
                <AiOutlineClockCircle />
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song: Song, index) => {
            const dateAdded: string = mobileLayout
              ? getNumberOfDaysString(song.createdAt)
              : `${song.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })} (${getNumberOfDaysString(song.createdAt)})`;
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
                <Td fontSize="sm">{index + 1}</Td>
                <Td fontSize="sm">{song.name}</Td>
                <Td fontSize="sm" fontWeight="300">
                  {dateAdded}
                </Td>
                <Td fontWeight="300">{secondsToMinutes(song.duration)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongsTable;
