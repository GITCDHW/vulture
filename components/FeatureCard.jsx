export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-neutral-900 p-6 md:p-8 rounded-xl shadow-lg border border-neutral-800 hover:border-amber-600 transition-all duration-300 transform hover:scale-105 text-center md:text-left">
      <div className="text-amber-500 mb-4 text-5xl flex justify-center md:justify-start">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-neutral-50 mb-3">
        {title}
      </h3>
      <p className="text-neutral-400 leading-relaxed text-base">
        {description}
      </p>
    </div>
  );
}