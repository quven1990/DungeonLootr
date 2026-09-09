import { formatDisplayDate } from './format-date';

export function PageStatus({
  updatedAt,
  verifiedForUpdate1,
}: {
  updatedAt: string;
  verifiedForUpdate1?: boolean;
}) {
  return (
    <p className="page-updated">
      Updated {formatDisplayDate(updatedAt)}
      {verifiedForUpdate1
        ? ' · Verified for UPDATE 1'
        : ' · Some UPDATE 1 details are still being verified'}
    </p>
  );
}
