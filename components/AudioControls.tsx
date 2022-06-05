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
import { useStoreActions } from "easy-peasy";
import ReactHowler from "react-howler";
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Song } from "@prisma/client";
import { ApplicationState } from "../lib/store";
import { secondsToMinutes } from "../lib/timeFormatter";
import { shuffleSongs } from "../lib/shuffle";

interface AudioControlsProps {
  songs: Song[];
  activeSong: Song;
}

const AudioControls: FC<AudioControlsProps> = ({
  songs = [],
  activeSong = {},
}) => {
  const [shuffle, setShuffle] = useState(false);
  const [playlist, setPlaylist] = useState(
    shuffle ? shuffleSongs(songs) : songs
  );
  const [playlistSongIndex, setPlaylistSongIndex] = useState(
    playlist.findIndex((song) => song.id === activeSong.id)
  );

  useEffect(() => {
    if (shuffle) {
      setPlaylist((currentPlaylist) => [...shuffleSongs(currentPlaylist)]);
    } else {
      setPlaylist(songs);
    }
  }, [shuffle, songs]);

  useEffect(() => {
    setPlaylistSongIndex(
      playlist.findIndex((song) => song.id === activeSong.id)
    );
  }, [playlist, setPlaylistSongIndex]);
  const soundRef = useRef<ReactHowler>(null);
  const [playing, setPlaying] = useState(true);
  const [seek, setSeek] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const repeatRef = useRef(repeat);
  const [duration, setDuration] = useState(0);
  const togglePlay = useCallback(() => setPlaying((state) => !state), []);
  const onRepeat = useCallback(() => setRepeat((state) => !state), []);
  const onShuffle = useCallback(() => setShuffle((state) => !state), []);
  const onNextSong = useCallback(
    () =>
      setPlaylistSongIndex((index) =>
        index + 1 > playlist.length - 1 ? 0 : index + 1
      ),
    [playlist.length]
  );
  const onPreviousSong = useCallback(
    () => setPlaylistSongIndex((index) => Math.max(index - 1, 0)),
    []
  );
  const onSeeking = useCallback(() => setIsSeeking((state) => !state), []);
  const setActiveSong = useStoreActions<ApplicationState>(
    (store) => store.changeActiveSong
  );

  useEffect(() => {
    setActiveSong(playlist[playlistSongIndex]);
  }, [playlistSongIndex]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef?.current?.seek(0);
    } else {
      onNextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef?.current?.duration();
    setDuration(songDuration);
  };
  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
  };

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const updateSeek = () => {
        setSeek(soundRef?.current?.seek() ?? 0);
        timerId = requestAnimationFrame(updateSeek);
      };
      timerId = requestAnimationFrame(updateSeek);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

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
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onEnd={onEnd}
          onLoad={onLoad}
        />
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
            <Text fontSize="xs">{secondsToMinutes(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={parseFloat(duration?.toFixed(2)) ?? 0}
              value={[seek]}
              onChange={onSeek}
              onChangeStart={onSeeking}
              onChangeEnd={() => {
                onSeeking();
                soundRef.current.seek(seek);
              }}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{secondsToMinutes(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AudioControls;
