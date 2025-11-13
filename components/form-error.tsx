type FormErrorProps = {
  error?: { message?: string } | null;
};

export default function FormError({ error }: FormErrorProps) {
  if (!error?.message) return null;
  return <p className="mt-1 text-red-500">{error.message}</p>;
}
