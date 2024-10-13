import './App.css'
import {GameProvider} from "./contexts/GameProvider.jsx";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Battlefield from "./components/battlefield/Battlefield.jsx";
import Hand from "./components/hand/Hand.jsx";

function App() {
  return (
    <GameProvider>
      <DndProvider backend={HTML5Backend}>
        <Battlefield />
        <Hand />
      </DndProvider>
    </GameProvider>
  )
}

export default App
