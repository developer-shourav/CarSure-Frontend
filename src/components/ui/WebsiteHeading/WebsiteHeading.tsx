type WebsiteHeadingProps = {
  title: string;
  className?: string;
};

export function WebsiteHeading({ title, className = "" }: WebsiteHeadingProps) {
  return (
    <h2
      className={`text-2xl  md:text-3xl xl:text-4xl font-bold text-center text-foreground 
                 mt-6 mb-9  md:mt-8 md:mb-11 xl:mt-9 lg:mb-12  xl:mb-14 ${className}`}
    >
      {title}
    </h2>
  );
}
