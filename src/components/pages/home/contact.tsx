export function Contact() {
  return (
    <section id="contact" className="section bg-white" aria-labelledby="contact-heading">
      <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2 id="contact-heading" className="section-heading mt-4">
            Let&apos;s discuss what needs to move forward.
          </h2>
          <p className="body-copy mt-6">
            Share a little about your priorities and we&apos;ll make sure the right
            conversation starts in the right place.
          </p>
        </div>

        <form className="grid gap-5" action="#contact" autoComplete="on">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-bold text-carbon">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="mt-2 min-h-12 w-full border border-carbon/20 bg-snow px-4 text-carbon"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold text-carbon">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 min-h-12 w-full border border-carbon/20 bg-snow px-4 text-carbon"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="text-sm font-bold text-carbon">
                Phone <span className="font-normal text-carbon/60">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="mt-2 min-h-12 w-full border border-carbon/20 bg-snow px-4 text-carbon"
              />
            </div>
            <div>
              <label htmlFor="client-type" className="text-sm font-bold text-carbon">
                Client type
              </label>
              <select
                id="client-type"
                name="client-type"
                required
                defaultValue=""
                autoComplete="off"
                className="mt-2 min-h-12 w-full border border-carbon/20 bg-snow px-4 text-carbon"
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="service" className="text-sm font-bold text-carbon">
              Service
            </label>
            <select
              id="service"
              name="service"
              required
              defaultValue=""
              autoComplete="off"
              className="mt-2 min-h-12 w-full border border-carbon/20 bg-snow px-4 text-carbon"
            >
              <option value="" disabled>
                Select a service
              </option>
              <option value="technology-ai">Technology and AI Adoption</option>
              <option value="construction-support">Construction Support</option>
              <option value="project-management">Project Management</option>
              <option value="business-solutions">Business Solutions</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-bold text-carbon">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              autoComplete="off"
              className="mt-2 w-full border border-carbon/20 bg-snow px-4 py-3 text-carbon"
            />
          </div>

          {/* TODO: Connect this UI to a server action or API before enabling submission. */}
          <button type="button" className="btn btn-primary w-fit" data-button>
            Send enquiry
          </button>
        </form>
      </div>
    </section>
  );
}
