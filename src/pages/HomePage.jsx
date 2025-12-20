import HeroImage from "../assets/hero-image.jpg"
import Logo from "../assets/Logo.svg"
import CountryRanking from "./CountryRanking"

const Home = () => {
  return (
    <>
      <section>
        <div className="relative w-full">
          <img src={HeroImage} className="w-full h-auto object-cover" alt="Hero Background"/>
          <img src={Logo} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" alt="Website Logo"/>
        </div>
       <CountryRanking className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
      </section>
    </>
  )
}
export default Home;