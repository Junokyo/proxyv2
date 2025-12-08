import UserPassGeneratorForm from './user-pass-form';
import UserPassShellPanel from './user-pass-shell-panel';

export default function UserPassSection() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch ">
      <div className="h-full">
        <UserPassGeneratorForm />
      </div>

      <div className="h-full">
        <UserPassShellPanel />
      </div>
    </div>
  );
}
