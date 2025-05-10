interface PaymentSummaryItemProps {
  label: string;
  amount: number;
  usePoints?: boolean;
}

export function PaymentSummaryItem({
  label,
  amount,
  usePoints = false,
}: PaymentSummaryItemProps) {
  return (
    <div className="flex justify-between">
      <span className={usePoints ? "text-red-500" : ""}>{label}</span>
      <span className={usePoints ? "text-red-500" : ""}>
        {usePoints ? "-" : ""}Rp {amount.toLocaleString()}
      </span>
    </div>
  );
}
