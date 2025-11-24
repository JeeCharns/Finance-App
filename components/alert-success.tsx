import Alert from "@/components/alert";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

export default function AlertSuccess({ children }: { children: ReactNode }) {
  return (
    <Alert
      icon={<Check className="text-green-700 dark:text-green-300 w-6 h-6" />}
      title="Success"
      type="success"
    >
      <span className="text-green-700 dark:text-green-300">{children}</span>
    </Alert>
  );
}
