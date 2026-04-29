import { motion } from "framer-motion";

const rows = [3, 2, 2, 3, 2];

const ResultSkeleton = () => {
  return (
    <div className="space-y-8">
      {rows.map((lines, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="max-w-[652px]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#ecedef] dark:bg-[#3c4043] shimmer" />
            <div className="h-3 w-40 rounded bg-[#ecedef] dark:bg-[#3c4043] shimmer" />
          </div>
          <div className="h-5 w-3/4 rounded bg-[#ecedef] dark:bg-[#3c4043] shimmer mb-2" />
          {Array.from({ length: lines }).map((_, j) => (
            <div
              key={j}
              className="h-3 rounded bg-[#ecedef] dark:bg-[#3c4043] shimmer mt-2"
              style={{ width: `${70 + ((j * 11) % 25)}%` }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default ResultSkeleton;