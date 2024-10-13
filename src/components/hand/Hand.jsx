
import './Hand.scss'
import {useGameState} from "../../game/GameContext.js";
import Card from "./card/Card.jsx";

export default function Hand() {

  return (
    <div className={'hand'}>
      {
        useGameState().handIds.map(cardId => {
          return <Card key={cardId} cardId={cardId} />
        })
      }
    </div>
  )
}