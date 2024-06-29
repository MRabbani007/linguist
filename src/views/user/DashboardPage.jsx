import DashboardLinks from "../../features/dashboard/DashboardLinks";
import Exercises from "../../features/dashboard/Exercises";
import Progress from "../../features/dashboard/Progress";
import UserLessonTracker from "../../features/dashboard/UserLessonTracker";
import UserWordList from "../../features/dashboard/UserWordList";

export default function DashboardPage() {
  return (
    <main>
      {/* <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Dashboard</h1>
      </header> */}
      <div>
        <UserLessonTracker />
        <Exercises />
        <UserWordList />
        {/* <DashboardLinks /> */}
      </div>
    </main>
  );
}
