import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CountUpStatsProps {
  value: string;
  label: string;
}

export function CountUpStats({ value, label }: CountUpStatsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const endValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold bg-gradient-to-br from-red-600 to-red-800 bg-clip-text text-transparent">
        {inView ? <CountUp end={endValue} duration={2.5} suffix={suffix} /> : `0${suffix}`}
      </div>
      <p className="text-gray-700 dark:text-gray-400 mt-2">{label}</p>
    </div>
  );
}
