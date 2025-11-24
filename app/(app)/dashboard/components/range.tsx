"use client";
import DateRangeSelect from "@/components/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

type RangeProps = {
  defaultView?: string;
};

export default function Range({ defaultView }: RangeProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") ?? defaultView ?? "last30days";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // keep existing params and just update range
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return <DateRangeSelect value={range} onChange={handleChange} />;
}
