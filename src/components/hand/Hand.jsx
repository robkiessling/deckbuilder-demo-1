
import './Hand.scss'
import {useGameState} from "../../game/GameContext.js";
import Card from "./card/Card.jsx";

export default function Hand() {
  const state = useGameState()

  return (
    <>
      <div className={'deck'}>
        Deck: {state.deckIds.length} cards
      </div>
      <div className={'hand'}>
        {
          state.handIds.map(cardId => {
            return <Card key={cardId} cardId={cardId}/>
          })
        }
      </div>
      <div className={'graveyard'}>
        Graveyard: {state.discardIds.length} cards
      </div>
    </>
  )
}