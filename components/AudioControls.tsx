import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { useStore, useStoreActions } from "easy-peasy";
import ReactHowler from "react-howler";
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { FC, useCallback, useEffect, useState, useRef } from "react";
import { Song } from "@prisma/client";
import { ApplicationState } from "../lib/store";

interface AudioControlsProps {
  songs: Song[];
  activeSong: Song;
}

const AudioControls: FC<AudioControlsProps> = ({
  songs = [],
  activeSong = {},
}) => {
  const [playing, setPlaying] = useState(true);
  const [songIndex, setSongIndex] = useState(
    songs.findIndex((song) => song.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(activeSong.duration ?? 100);
  const togglePlay = useCallback(() => setPlaying((state) => !state), []);
  const onRepeat = useCallback(() => setRepeat((state) => !state), []);
  const onShuffle = useCallback(() => setShuffle((state) => !state), []);
  const onNextSong = useCallback(
    () => setSongIndex((index) => Math.min(index + 1, songs.length)),
    []
  );
  const onPreviousSong = useCallback(
    () => setSongIndex((index) => Math.max(index - 1, 0)),
    []
  );
  const setActiveSong = useStoreActions<ApplicationState>(
    (store) => store.changeActiveSong
  );

  useEffect(() => {
    setActiveSong(songs[songIndex]);
  }, [songIndex]);

  const soundRef = useRef<ReactHowler>(null);
  const playButton = playing ? (
    <IconButton
      icon={<MdOutlinePauseCircleFilled />}
      fontSize="40px"
      aria-label="pause"
      outline="none"
      variant="link"
      color="white"
      onClick={togglePlay}
    />
  ) : (
    <IconButton
      icon={<MdOutlinePlayCircleFilled />}
      fontSize="40px"
      aria-label="play"
      outline="none"
      variant="link"
      color="white"
      onClick={togglePlay}
    />
  );

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} ref={soundRef} />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            icon={<MdShuffle />}
            fontSize="24px"
            aria-label="shuffle"
            outline="none"
            variant="link"
            color={shuffle ? "white" : "inherit"}
            onClick={onShuffle}
          />
          <IconButton
            icon={<MdSkipPrevious />}
            fontSize="24px"
            aria-label="previous"
            outline="none"
            variant="link"
            onClick={onPreviousSong}
          />
          {playButton}
          <IconButton
            icon={<MdSkipNext />}
            fontSize="24px"
            aria-label="next"
            outline="none"
            variant="link"
            onClick={onNextSong}
          />
          <IconButton
            icon={<MdOutlineRepeat />}
            fontSize="24px"
            aria-label="repeat"
            outline="none"
            variant="link"
            color={repeat ? "white" : "inherit"}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{seek}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration}
              value={[seek]}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{duration}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AudioControls;
