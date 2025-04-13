type WebsiteHeadingProps = {
  title: string;
  className?: string;
};

export function WebsiteHeading({ title, className = "" }: WebsiteHeadingProps) {
  return (
    <h2
      className={`text-3xl  md:text-4xl lg:text-[42px] font-bold text-center text-foreground 
                 mt-7 mb-9   md:mt-10 md:mb-12 lg:mb-20  ${className}`}>
      {title}
    </h2>
  );
}
