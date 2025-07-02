type DashboardHeadingProps = {
  title: string;
  className?: string;
};

export function DashboardHeading({
  title,
  className = "",
}: DashboardHeadingProps) {
  return (
    <h2 className={`my-5 lg:-mt-2 text-[22px] md:text-[28px] font-bold ${className}`}>
      {title}
    </h2>
  );
}
