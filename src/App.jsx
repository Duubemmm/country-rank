import { Routes, Route}  from "react-router-dom"
import HomePage from "./pages/HomePage"
import CountryDetails from "./pages/CountryDetails"
const App = () => {
return(
  <div>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/country/:cca2" element={<CountryDetails/>}/>
    </Routes>
  </div>
)
}

export default App;