import { Button } from '@/components/ui/button';
import { Account } from './UserCategoryView';

export function UserDetailModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: Account | null;
}) {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">Chi tiết tài khoản</h2>
          {/* <Button variant="ghost" onClick={onClose}>
            Đóng
          </Button> */}
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <strong>Tên:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Vai trò:</strong> {user.role}
          </div>
          <div>
            <strong>Ngày tạo:</strong> {user.createdAt}
          </div>

          <hr className="my-2" />

          <div>
            <strong>Tổng dung lượng đã mua (GB):</strong>{' '}
            {user.purchasedAmount ?? '—'}
          </div>
          <div>
            <strong>Đã sử dụng (GB):</strong> {user.usedAmount ?? '—'}
          </div>
          <div>
            <strong>Còn lại (GB):</strong> {user.balanceAmount ?? '—'}
          </div>
          <div>
            <strong>Proxies còn lại:</strong> {user.proxiesRemaining ?? '—'}
          </div>
          <div>
            <strong>Số IP:</strong> {user.ipCount ?? '—'}
          </div>

          {user.notes && (
            <>
              <hr className="my-2" />
              <div>
                <strong>Ghi chú:</strong> {user.notes}
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
}
