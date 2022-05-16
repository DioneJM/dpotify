import type { NextPage } from "next";
import GradientLayout from "../components/GradientLayout";

const Home: NextPage = () => {
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

export default Home;
