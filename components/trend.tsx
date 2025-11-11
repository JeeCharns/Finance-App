import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useFormatCurrency } from "@/hooks/use-format-currency";

type TrendProps = {
  type: "up" | "down" | "neutral" | string;
  amount: number;
  prevAmount: number;
};

export default function Trend({ type, amount, prevAmount }: TrendProps) {
  const colourClasses: Record<string, string> = {
    Income: "text-green-700 dark:text-green-300",
    Expense: "text-red-700 dark:text-red-300",
    Investment: "text-indigo-700 dark:text-indigo-300",
    Saving: "text-yellow-700 dark:text-yellow-300",
  };

  const calcPercentageChange = (amount: number, prevAmount: number) => {
    if (prevAmount === 0) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  const percentageChange = useMemo(
    () => Math.round(calcPercentageChange(amount, prevAmount)),
    [amount, prevAmount]
  );

  const formattedAmount = useFormatCurrency(amount);

  return (
    <div>
      <div className={`font-semibold ${colourClasses[type]}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {formattedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {percentageChange < 0 && (
          <ArrowDownLeft className="w-4 h-4 text-red-700 dar:text-red-300" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="w-4 h-4 text-green-700 dark:text-green-300" />
        )}
        <div>{` ${percentageChange}%`}</div>
      </div>
    </div>
  );
}
