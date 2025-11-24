export default function Alert(props: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  type?: "error" | "success";
}) {
  return (
    <div className="dark:border-gray-800 flex space-x-2">
      <div className="shrink-0"> {props.icon}</div>{" "}
      <div>
        <h5>{props.title}</h5>
        <div className="text-sm">{props.children}</div>
      </div>
    </div>
  );
}
