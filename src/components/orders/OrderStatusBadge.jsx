import { getStatusInfo } from "../../utils/orderStatus";

export default function OrderStatusBadge({ status }) {
  const info = getStatusInfo(status);
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${info.chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${info.dot}`} />
      {info.label}
    </span>
  );
}
