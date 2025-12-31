import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";

const App = () => {
  return (
    <section className="min-h-screen bg-black relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:cca2" element={<CountryDetails />} />
      </Routes>
    </section>
  );
};

export default App;
