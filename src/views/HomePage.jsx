// Imported Context
// Imported Components
import CardHeader from "../components/CardHeader";
import CardProgress from "../features/homePage/CardProgress";
import SectionWordsRandom from "../features/homePage/SectionWordsRandom";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* <CardProgress /> */}
      <SectionWordsRandom />
    </div>
  );
};

export default HomePage;
