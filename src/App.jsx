import Home from "./pages/HomePage.jsx"
import CountryRanking from "./pages/CountryRanking.jsx";


const App = () => {
return (
  <section className="h-screen bg-black relative">
  <Home />
  <CountryRanking className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
  </section>
)
}
export default App;