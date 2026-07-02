import MainLayout from "../layouts/MainLayout";

import Hero from "../components/sections/Hero";
import AccessIncludes from "../components/sections/AccessIncludes";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Location from "../components/sections/Location";
import HowItWorks from "../components/sections/HowItWorks";

export default function LandingPage() {
  return (
    <MainLayout>
      <Hero />
      <AccessIncludes />
      <WhyChooseUs />
      <Location />
      <HowItWorks />
    </MainLayout>
  );
}