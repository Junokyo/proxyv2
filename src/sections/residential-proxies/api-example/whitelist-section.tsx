import UserPassShellPanel from './user-pass-shell-panel';
import WhitelistFormPanel from './whitelist-form-panel';

export default function WhitelistSection() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch ">
      <div className="h-full">
        <WhitelistFormPanel />
      </div>

      <div className="h-full">
        <UserPassShellPanel />
      </div>
    </div>
  );
}
