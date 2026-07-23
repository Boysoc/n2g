interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}

interface Props extends DatetimesProps {
  size?: "sm" | "base";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className,
}: Props) {
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime,
  );
  const date = myDatetime.toISOString().substring(0, 10);
  const [year, month, day] = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const label = `${monthNames[Number(month) - 1]} ${day}, ${year}`;

  return (
    <div className={`date-box ${className ?? ""}`}>
      <time
        className={size === "sm" ? "text-sm" : "text-base"}
        dateTime={myDatetime.toISOString()}
      >
        {label}
      </time>
    </div>
  );
}
