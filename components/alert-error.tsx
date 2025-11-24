import Alert from "@/components/alert";
import { Ban } from "lucide-react";
import type { ReactNode } from "react";

export default function AlertError({ children }: { children: ReactNode }) {
  return (
    <Alert
      icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />}
      title="Error"
      type="error"
    >
      <span className="text-red-700 dark:text-red-300">{children}</span>
    </Alert>
  );
}
