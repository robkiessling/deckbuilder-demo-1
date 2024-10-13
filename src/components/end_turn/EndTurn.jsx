
import './EndTurn.scss'
import {useGameDispatch, useGameState} from "../../game/GameContext.js";

export default function EndTurn() {
  const state = useGameState();
  const dispatch = useGameDispatch();

  function endTurn() {
    dispatch({
      type: 'endPlayerTurn'
    })
  }

  return (
    <div className={'end-turn'}>
      <button onClick={endTurn} disabled={!state.isPlayerTurn}>End Turn</button>
    </div>
  )
}