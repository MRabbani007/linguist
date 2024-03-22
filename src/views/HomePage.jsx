// Imported Context
// Imported Components
import CardHeader from "../components/CardHeader";
import CardProgress from "../features/homePage/CardProgress";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3">
      <CardHeader />
      <CardProgress />
    </div>
  );
};

export default HomePage;
