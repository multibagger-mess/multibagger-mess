import SectionTitle from "../ui/SectionTitle";
import WhyChooseCard from "./WhyChooseCard";

import { WHY_CHOOSE_US } from "../../constants/WhyChooseUsContent";

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="py-28 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          badge="Why Choose The Multi-Bagger Mess"
          title="Everything You Need for Comfortable Student Living"
          subtitle="Designed for students who value comfort, cleanliness, safety and a peaceful environment close to their college."
        />

        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">

          {WHY_CHOOSE_US.map((item) => (
            <WhyChooseCard
              key={item.title}
              {...item}
            />
          ))}

        </div>

      </div>
    </section>
  );
}