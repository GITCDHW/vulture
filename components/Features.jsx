import FeatureCard from './FeatureCard';

export default function Features() {
  const features = [
    {
      icon: '🧠',
      title: 'LLM-Powered Tough Questions',
      description: 'Our advanced AI acts as your devil\'s advocate, asking 5 critical questions designed to probe the deepest corners of your startup idea.',
    },
    {
      icon: '📈',
      title: 'Comprehensive Risk Report',
      description: 'Receive a detailed PDF report outlining the biggest risks in key areas: market size, competitive moat, and technical feasibility.',
    },
    {
      icon: '🛡️',
      title: 'Early Vulnerability Detection',
      description: 'Identify potential pitfalls and weaknesses in your business model early, saving you invaluable time and resources in the long run.',
    },
    {
      icon: '🔍',
      title: 'Unbiased Perspective',
      description: 'Get an objective, data-driven analysis of your idea, free from the biases of friends, family, or personal enthusiasm.',
    },
  ];

  return (
    <section>
      <h2 className="text-3xl md:text-5xl font-bold text-center text-amber-500 mb-12">
        How Vulture Protects Your Vision
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}