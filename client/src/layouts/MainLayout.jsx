import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";

import visitorService from "../services/visitorService";

export default function MainLayout({ children }) {

    const location = useLocation();

    useEffect(() => {
        visitorService.trackVisitor(location.pathname);
    }, [location.pathname]);
    return (
      <>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </>
    );
}