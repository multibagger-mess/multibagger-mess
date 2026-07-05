import AccessCard from "../components/details/AccessCard";
import AboutSection from "../components/details/AboutSection";
import NearbySection from "../components/details/NearbySection";
import PricingSection from "../components/details/PricingSection";
import FacilitiesSection from "../components/details/FacilitiesSection";
import StudentLifeSection from "../components/details/StudentLifeSection";
import DetailsLayout from "../components/details/layout/DetailsLayout";
export default function DetailsPage() {

    return (

        <DetailsLayout className="bg-slate-50 min-h-screen">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <AccessCard />

                <AboutSection />

                <NearbySection />

                <PricingSection />

                <FacilitiesSection />

                <StudentLifeSection />

            </div>

        </DetailsLayout>

    );

}