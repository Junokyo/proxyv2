import TestCommandPanel from './test-command-panel';
import WhitelistFormPanel from './whitelist-left-form';

export default function WhitelistView() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch ">
      <div className="h-full">
        <WhitelistFormPanel />
      </div>

      <div className="h-full">
        <TestCommandPanel />
      </div>
    </div>
  );
}
