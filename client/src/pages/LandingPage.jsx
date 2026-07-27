import { useEffect } from "react";
import visitorService from "../services/visitorService";

import MainLayout from "../layouts/MainLayout";

import Hero from "../components/sections/Hero";
import AvailabilitySection from "../components/sections/AvailabilitySection";
import AccessIncludes from "../components/sections/AccessIncludes";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Location from "../components/sections/Location";
import HowItWorks from "../components/sections/HowItWorks";


export default function LandingPage() {

  useEffect(() => {
    visitorService.trackVisitor("/");
  }, []);

  return (
    <MainLayout>
      <Hero />
       <AvailabilitySection />
      <AccessIncludes />
     <WhyChooseUs />
      <Location />
      <HowItWorks />
    </MainLayout>
  );
}