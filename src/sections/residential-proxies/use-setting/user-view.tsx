import GenerateResultsPanelRight from './generate-results-panel-right';
import UserLeft from './user-left';

export default function UserView() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch ">
      <div className="h-full">
        <UserLeft />
      </div>

      <div className="h-full">
        <GenerateResultsPanelRight />
      </div>
    </div>
  );
}
