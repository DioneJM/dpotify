import { FC } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

export interface GradientLayoutProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  description: string;
  color: string;
  roundImage: boolean;
  children: any;
}

const GradientLayout: FC<GradientLayoutProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  roundImage,
  color,
  children,
}) => {
  return (
    <Box
      height="100vh"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            borderRadius={roundImage ? "100%" : "3px"}
            src={imageSrc}
          />
        </Box>
        <Box padding="20px" lineHeight="40px">
          <Text fontSize="xs" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="xs">{description}</Text>
        </Box>
      </Flex>
      {children}
    </Box>
  );
};

export default GradientLayout;
