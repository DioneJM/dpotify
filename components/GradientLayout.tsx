import { FC } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { bottomPlayerHeight } from "./PlayerLayout";
import { useMobileLayout } from "../lib/hooks";

export interface GradientLayoutProps {
  title: string;
  color?: string;
  subtitle?: string;
  imageSrc?: string;
  description?: string;
  roundImage?: boolean;
  children?: any;
}

const GradientLayout: FC<GradientLayoutProps> = ({
  title,
  color = "green",
  subtitle = undefined,
  description = undefined,
  imageSrc = undefined,
  roundImage = undefined,
  children = undefined,
}) => {
  const [mobileLayout] = useMobileLayout();
  return (
    <Box
      height="100vh"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
      paddingBottom={bottomPlayerHeight}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize={mobileLayout ? "80px" : "160px"}
            boxShadow="2xl"
            borderRadius={roundImage ? "100%" : "3px"}
            src={imageSrc}
          />
        </Box>
        <Box padding="20px" lineHeight={mobileLayout ? "25px" : "40px"}>
          <Text fontSize="xs" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize={mobileLayout ? "3xl" : "6xl"} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="xs">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px" overflowY="auto">
        {children}
      </Box>
    </Box>
  );
};

export default GradientLayout;
