
import './Enemies.scss';
import {useGameState} from "../../../contexts/GameContext.js";
import Enemy from "./enemy/Enemy.jsx";

export default function Enemies() {
  const enemies = useGameState().enemies;

  return (
    <div className={'enemies-side'}>
      {
        enemies.map(enemyId => {
          return <Enemy key={enemyId} enemyId={enemyId} />
        })
      }
    </div>
  )

}