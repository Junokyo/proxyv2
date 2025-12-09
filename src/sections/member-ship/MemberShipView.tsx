import GiftInfo from './GiftInfo';
import MembershipHeader from './MemberShipHeader';
import OrderHistory from './OrderHistory';

export default function MemberShipView() {
  return (
    <div className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Membership Center
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your membership and view order history
          </p>
        </header>

        <div className="space-y-6">
          <MembershipHeader currentAmount={0} nextLevelAmount={1000} />
          <OrderHistory />
          <GiftInfo currentMembership="Vo" />
        </div>
      </div>
    </div>
  );
}
