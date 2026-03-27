import Layout from "./components/Layout"
import About from "./pages/About"
import PokemonDetails from "./pages/PokemonDetails"
import PokemonCards from "./pages/pokemonCards"
import { Route, Routes } from "react-router-dom"

function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<PokemonCards/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="pokemon/:id" element={<PokemonDetails/>}/>
      </Route>
    </Routes>
  )
}

export default App
