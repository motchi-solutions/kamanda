import { MetricCounters } from "./metric-counters";

export function Metrics() {
  return (
    <section
      className="section border-y border-carbon/10 bg-[#f0f0ed]"
      aria-labelledby="metrics-heading"
    >
      <div className="site-container">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">In Numbers</p>
            <h2 id="metrics-heading" className="section-heading mt-4">
              Project Experience and Delivery
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-carbon/65">
            Years of experience, construction hours, completed projects, and
            businesses supported through technology partners.
          </p>
        </div>
        <MetricCounters />
      </div>
    </section>
  );
}
