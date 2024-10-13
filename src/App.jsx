import './App.css'
import {GameProvider} from "./game/GameProvider.jsx";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Battlefield from "./components/battlefield/Battlefield.jsx";
import Hand from "./components/hand/Hand.jsx";
import Energy from "./components/energy/Energy.jsx";
import EndTurn from "./components/end_turn/EndTurn.jsx";

function App() {
  return (
    <GameProvider>
      <DndProvider backend={HTML5Backend}>
        <Battlefield />
        <Hand />
        <Energy />
        <EndTurn />
      </DndProvider>
    </GameProvider>
  )
}

export default App
