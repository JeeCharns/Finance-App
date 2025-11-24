import Select from "@/components/select";
import type { SelectHTMLAttributes } from "react";

type DateRangeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function DateRangeSelect(props: DateRangeSelectProps) {
  return (
    <Select {...props}>
      <option value="last24hours">Last 24 hours</option>
      <option value="last7days">Last 7 days</option>
      <option value="last30days">Last 30 days</option>
      <option value="last12months">Last 12 months</option>
    </Select>
  );
}
