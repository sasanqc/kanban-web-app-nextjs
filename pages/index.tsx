import Button from "@/components/UI/Button";
import Checkbox from "@/components/UI/Checkbox";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import Tasks from "@/layout/Tasks";
export default function Home() {
  return (
    <main className="text-black dark:text-white bg-white dark:bg-black2 w-screen h-screen flex">
      <div className="flex flex-col overflow-hidden flex-1">
        <Header />
        <div className="flex-1 flex overflow-auto w-full">
          <Sidebar />
          <Tasks />
        </div>
      </div>
    </main>
  );
}
