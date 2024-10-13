
import './Hand.scss'
import {useGameState} from "../../contexts/GameContext.js";
import Card from "./card/Card.jsx";

export default function Hand() {
  const hand = useGameState().hand;

  return (
    <div className={'hand'}>
      {
        hand.map(cardId => {
          return <Card key={cardId} cardId={cardId} />
        })
      }
    </div>
  )
}