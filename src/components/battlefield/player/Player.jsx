
import {useGameState} from "../../../contexts/GameContext.js";
import './Player.scss'

export default function Player() {
  const player = useGameState().player;

  return (
    <div className={'player-side'}>
      <div className={'player'}>
        <span>Player</span><br/>
        <span>HP: {player.health.current} / {player.health.max}</span>
      </div>
    </div>
  )
}