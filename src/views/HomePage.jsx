// Imported Context
// Imported Components
import CardHeader from "../components/CardHeader";
import DashboardLinks from "../features/dashboard/DashboardLinks";
import Exercises from "../features/dashboard/Exercises";
import Progress from "../features/dashboard/Progress";
import UserLessonTracker from "../features/dashboard/UserLessonTracker";
import UserWordList from "../features/dashboard/UserWordList";
import CardProgress from "../features/homePage/CardProgress";
import SectionWordsRandom from "../features/homePage/SectionWordsRandom";

const HomePage = () => {
  return (
    <div className="flex flex-wrap gap-3 dashboard justify-center flex-1">
      <div className="flex flex-col gap-3">
        <Progress />
        <UserLessonTracker />
      </div>
      <div>
        <Exercises />
      </div>
      <div className="flex flex-col gap-3">
        <UserWordList />
        <DashboardLinks />
      </div>
      {/* <CardProgress /> */}
      {/* <SectionWordsRandom /> */}
    </div>
  );
};

export default HomePage;
