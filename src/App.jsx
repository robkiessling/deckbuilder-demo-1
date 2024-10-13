import './App.css'
import {GameProvider} from "./contexts/GameProvider.jsx";
import Battlefield from "./components/battlefield/Battlefield.jsx";
import Hand from "./components/hand/Hand.jsx";

function App() {
  return (
    <GameProvider>
      <Battlefield />
      <Hand />
    </GameProvider>
  )
}

export default App
