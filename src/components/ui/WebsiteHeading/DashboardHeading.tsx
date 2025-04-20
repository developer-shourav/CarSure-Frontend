type DashboardHeadingProps = {
  title: string;
  className?: string;
};

export function DashboardHeading({
  title,
  className = "",
}: DashboardHeadingProps) {
  return (
    <h2 className={`mt-5 mb-8 md:mb-10 text-[22px] md:text-[28px] font-bold ${className}`}>
      {title}
    </h2>
  );
}
