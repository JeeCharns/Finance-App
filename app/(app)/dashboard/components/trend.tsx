import BaseTrend from "@/components/trend";
import { createClient } from "@/lib/supabase/server";

export default async function Trend({
  type,
  range,
}: {
  type: string;
  range: string;
}) {
  const supabase = await createClient();
  type CalculateTotalArgs = {
    type_argument: string;
    range_arg: string;
  };

  const { data, error } = await supabase.rpc<string, CalculateTotalArgs>(
    "calculate_total",
    { range_arg: range, type_argument: type }
  );

  if (error) throw new Error("Could not fetch the trend data");

  const amounts = data[0];

  return (
    <BaseTrend
      type={type}
      amount={amounts.current_amount}
      prevAmount={amounts.previous_amount}
    />
  );
}
