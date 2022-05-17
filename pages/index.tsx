import type { NextPage } from "next";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";

const Home: NextPage = ({ artists }) => {
  return (
    <GradientLayout
      color="green"
      title="hi title"
      subtitle="the best album in the game"
      description="some album I made"
      imageSrc="https://geekhack.org/index.php?action=dlattach;attach=89492;type=avatar"
      roundImage
    >
      <div>Content</div>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
