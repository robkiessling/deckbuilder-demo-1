
import './Enemies.scss';
import {useGameState} from "../../../game/GameContext.js";
import Enemy from "./enemy/Enemy.jsx";

export default function Enemies() {

  return (
    <div className={'enemies-side'}>
      {
        useGameState().enemyIds.map(enemyId => {
          return <Enemy key={enemyId} enemyId={enemyId} />
        })
      }
    </div>
  )

}