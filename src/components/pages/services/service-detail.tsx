import { Reveal } from "@/components/ui/reveal";
import { services } from "./service-content";

export function ServiceDetail({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <section
      id={service.id}
      className={`section service-detail-section border-t border-carbon/10 ${index % 2 === 0 ? "bg-white" : "bg-snow"}`}
      aria-labelledby={`${service.id}-heading`}
    >
      <div className="site-container grid items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal direction={index % 2 === 0 ? "left" : "right"} className={index % 2 === 1 ? "lg:col-start-2 lg:row-start-1" : undefined}>
          <p className="eyebrow">
            0{index + 1} / {service.eyebrow}
          </p>
          <h2 id={`${service.id}-heading`} className="section-heading mt-5">
            {service.title}
          </h2>
          <p className="body-copy mt-7">{service.description}</p>
          <h3 className="mt-8 text-2xl">Our Role</h3>
          <p className="body-copy mt-3">{service.approach}</p>
        </Reveal>
        <Reveal
          direction={index % 2 === 0 ? "right" : "left"}
          delay={100}
          className={`content-panel bg-[#f1f2ef] ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
        >
          <h3 className="text-2xl sm:text-3xl">Areas of Support</h3>
          <dl className="mt-6 divide-y divide-carbon/10">
            {service.capabilities.map((capability) => (
              <div key={capability.title} className="py-4 first:pt-0 last:pb-0">
                <dt className="text-sm font-semibold leading-6 text-navy">
                  {capability.title}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-carbon/75">
                  {capability.description}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 border-t border-carbon/15 pt-6 text-sm leading-6 text-navy">
            {service.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
