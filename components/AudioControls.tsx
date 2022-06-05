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

const AudioControls = () => {
  const playButton = true ? (
    <IconButton
      icon={<MdOutlinePlayCircleFilled />}
      fontSize="40px"
      aria-label="play"
      outline="none"
      variant="link"
      color="white"
    />
  ) : (
    <IconButton
      icon={<MdOutlinePauseCircleFilled />}
      fontSize="40px"
      aria-label="pause"
      outline="none"
      variant="link"
      color="white"
    />
  );

  return (
    <Box>
      <Box>{/*<ReactHowler/>*/}</Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            icon={<MdShuffle />}
            fontSize="24px"
            aria-label="shuffle"
            outline="none"
            variant="link"
          />
          <IconButton
            icon={<MdSkipPrevious />}
            fontSize="24px"
            aria-label="previous"
            outline="none"
            variant="link"
          />
          {playButton}
          <IconButton
            icon={<MdSkipNext />}
            fontSize="24px"
            aria-label="next"
            outline="none"
            variant="link"
          />
          <IconButton
            icon={<MdOutlineRepeat />}
            fontSize="24px"
            aria-label="next"
            outline="none"
            variant="link"
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">Runtime</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={100}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">Total time</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AudioControls;
