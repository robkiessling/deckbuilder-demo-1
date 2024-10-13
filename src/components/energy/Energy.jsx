
import './Energy.scss';
import {useGameState} from "../../game/GameContext.js";

export default function Energy() {

  const player = useGameState().player;

  return (
    <div className={'energy-orb'}>
      {player.energy.current} / {player.energy.max}
    </div>
  )
}