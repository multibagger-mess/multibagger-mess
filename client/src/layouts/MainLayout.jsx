import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}