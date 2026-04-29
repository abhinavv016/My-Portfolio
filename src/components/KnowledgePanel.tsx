import { motion } from "framer-motion";

interface Fact {
  label: string;
  value: React.ReactNode; 
}

interface KnowledgePanelProps {
  title: string;
  subtitle?: string;
  description?: string;
  facts?: Fact[];
  link?: string;
  accent?: string;
  initials?: string;
}

const KnowledgePanel = ({
  title,
  subtitle,
  description,
  facts = [],
  accent = "#4285F4",
  initials,
}: KnowledgePanelProps) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="w-full max-w-sm bg-white dark:bg-[#1f1f20] border border-[#dadce0] dark:border-[#3c4043] rounded-xl overflow-hidden"
    >
      <div
        className="h-28 flex items-center justify-center text-white text-3xl font-semibold"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
        }}
      >
        {initials}
      </div>
      <div className="p-5">
        <h3 className="text-[22px] leading-7 font-medium text-[#202124] dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <div className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">
            {subtitle}
          </div>
        )}
        {description && (
          <p className="text-[14px] leading-[22px] text-[#3c4043] dark:text-[#e8eaed] mt-3">
            {description}
          </p>
        )}

        {facts.length > 0 && (
          <dl className="mt-4 divide-y divide-[#ecedef] dark:divide-[#3c4043]">
            {facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-3 py-2 text-[14px]">
                <dt className="text-[#5f6368] dark:text-[#9aa0a6]">{f.label}</dt>
                <dd className="text-[#202124] dark:text-[#e8eaed] font-medium text-right">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        )}


      </div>
    </motion.aside>
  );
};

export default KnowledgePanel;