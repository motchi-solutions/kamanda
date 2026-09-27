const metrics = [
  { value: "30+", label: "Project Management Years of Experience" },
  { value: "250,000+", label: "Hours on Construction Projects" },
  { value: "20+", label: "Projects Delivered Successfully" },
  { value: "AI", label: "Technology and AI Adoption" },
];

export function Metrics() {
  return (
    <section className="bg-navy text-snow" aria-labelledby="metrics-heading">
      <div className="site-container py-16 sm:py-20">
        <h2 id="metrics-heading" className="sr-only">
          Kamanda by the numbers
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-l-2 border-gold pl-5">
              <p className="font-display text-5xl leading-none text-snow sm:text-6xl">
                {metric.value}
              </p>
              <p className="mt-4 max-w-44 text-sm leading-6 text-snow/75">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
