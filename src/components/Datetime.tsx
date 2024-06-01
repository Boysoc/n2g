import { LOCALE } from "@config";

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}

interface Props extends DatimesProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className,
}: Props) {
  return (
    <div className={`date-box ${className}`}>
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
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
  );

  // YYYY-MM-DD format
  const date = myDatetime.toISOString().substring(0, 10);
  const [year, month, day] = date.split("-");  // Split date into [YYYY, MM, DD]
  // Mapping month numbers to abbreviations
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = parseInt(month) - 1; // Convert month from string to index (0-based)
  const monthAbbreviation = monthNames[monthIndex]; // Get the abbreviation for the month

  return (
    <>
      <div className="year">{year}</div>
      <div className="month-day">{monthAbbreviation} {day}</div>
    </>
  );
};