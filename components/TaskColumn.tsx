const TaskColumn = () => {
  return (
    <div className="w-[280px] shrink-0 h-full">
      <div className="flex mb-6">
        <div className="w-4 h-4 bg-primary2 rounded-full inline-block mr-3"></div>
        <h4 className="text-gray3">todo (4)</h4>
      </div>
      <ul className="space-y-5 pb-6 ">
        <li>
          <section className="py-6 px-4 bg-white dark:bg-black2 rounded-lg shadow-task">
            <h3 className="mb-2">
              Build UI for onboarding flow.Build UI for onboarding flow .Build
              UI for onboarding flow
            </h3>
            <p className="text-sm text-gray3  font-bold ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel,
              voluptatum libero dolorum repudiandae nisi ducimus facilis. Illum,
              provident tempore.
            </p>
          </section>
        </li>
        <li>
          <section className="py-6 px-4 bg-white dark:bg-black2 rounded-lg shadow-task">
            <h3 className="mb-2">Build UI for onboarding flow</h3>
            <p className="text-sm text-gray3  font-bold ">0 of 3 substasks</p>
          </section>
        </li>
        <li>
          <section className="py-6 px-4 bg-white dark:bg-black2 rounded-lg shadow-task">
            <h3 className="mb-2">
              Build UI for onboarding flow.Build UI for onboarding flow .Build
              UI for onboarding flow
            </h3>
            <p className="text-sm text-gray3  font-bold ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel,
              voluptatum libero dolorum repudiandae nisi ducimus facilis. Illum,
              provident tempore.
            </p>
          </section>
        </li>
        <li>
          <section className="py-6 px-4 bg-white dark:bg-black2 rounded-lg shadow-task">
            <h3 className="mb-2">
              Build UI for onboarding flow.Build UI for onboarding flow .Build
              UI for onboarding flow
            </h3>
            <p className="text-sm text-gray3  font-bold ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel,
              voluptatum libero dolorum repudiandae nisi ducimus facilis. Illum,
              provident tempore.
            </p>
          </section>
        </li>
        <li>
          <section className="py-6 px-4 bg-white  dark:bg-black2 rounded-lg shadow-task">
            <h3 className="mb-2">Build UI for onboarding flow</h3>
            <p className="text-sm text-gray3  font-bold ">0 of 3 substasks</p>
          </section>
        </li>
      </ul>
    </div>
  );
};

export default TaskColumn;
