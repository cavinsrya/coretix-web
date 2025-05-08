interface PaymentSummaryItemProps {
  label: string
  amount: number
  isDiscount?: boolean
}

export function PaymentSummaryItem({ label, amount, isDiscount = false }: PaymentSummaryItemProps) {
  return (
    <div className="flex justify-between">
      <span className={isDiscount ? "text-red-500" : ""}>{label}</span>
      <span className={isDiscount ? "text-red-500" : ""}>
        {isDiscount ? "-" : ""}Rp {amount.toLocaleString()}
      </span>
    </div>
  )
}
