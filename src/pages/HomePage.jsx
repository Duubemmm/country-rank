import HeroImage from "../assets/hero-image.jpg";
import mobileHeroImage from "../assets/hero-image-sm.jpg";
import Logo from "../assets/Logo.svg";
import CountryRanking from "../pages/countryranking";

const Home = () => {
  return (
    <section className="w-screen h-screen">
      <div className="relative h-1/2 w-full">
        {/* Desktop Image */}
        <img
          src={HeroImage}
          className="hidden sm:block w-full h-full object-cover"
        />
        {/* Mobile Image */}
        <img
          src={mobileHeroImage}
          className="block sm:hidden w-full h-full object-cover"
        />
        {/* Centered Logo */}
        <img
          src={Logo}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Bottom Half */}
      <div className="h-1/2 w-full bg-[#1B1D1F]"></div>
    <CountryRanking className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-h-[80vh]" />
    </section>
  );
};

export default Home;
