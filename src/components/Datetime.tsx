import { LOCALE } from "@config";

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
  return (
    <div className={`date-box ${className ?? ''}`}>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
        />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime, modDatetime }: DatetimesProps) => {
  const myDatetime =
    new Date(
      modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
    );
  // 补零函数
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = myDatetime.getFullYear();
  const month = myDatetime.getMonth(); // getMonth() 返回0-11
  const day = pad(myDatetime.getDate());

  const hour = pad(myDatetime.getHours());
  const minute = pad(myDatetime.getMinutes());

  // 月份英文缩写
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return (
    <>
      {monthNames[month]} {day}, {year} {hour}:{minute}
    </>
  );
};