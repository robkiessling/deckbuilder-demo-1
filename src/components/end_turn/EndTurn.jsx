
import './EndTurn.scss'
import {useGameDispatch} from "../../game/GameContext.js";

export default function EndTurn() {
  const dispatch = useGameDispatch();

  function endTurn() {
    dispatch({
      type: 'endPlayerTurn'
    })
  }

  return (
    <div className={'end-turn'}>
      <button onClick={endTurn}>End Turn</button>
    </div>
  )
}