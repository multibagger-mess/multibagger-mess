import SectionTitle from "../ui/SectionTitle";
import AccessCard from "./AccessCard";

import { ACCESS_ITEMS } from "../../constants/accessContent";

import Button from "../ui/Button";
import { ROUTES } from "../../constants/routes";

export default function AccessIncludes() {
  return (
    <section
      id="access"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          badge="Information Access"
          title="Everything You Need, Available After Request Access"
          subtitle="To protect resident privacy while ensuring interested students receive complete information, detailed hostel information is shared after requesting access."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {ACCESS_ITEMS.map((item) => (
            <AccessCard
              key={item.title}
              {...item}
            />
          ))}

        </div>

        <div className="text-center mt-16">

          <Button
            to={ROUTES.REQUEST_ACCESS}
          >
            Request Access
          </Button>

        </div>

      </div>
    </section>
  );
}