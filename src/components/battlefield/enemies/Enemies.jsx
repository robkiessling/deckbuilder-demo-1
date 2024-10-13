
import './Enemies.scss';
import {useGameState} from "../../../contexts/GameContext.js";
import Enemy from "./enemy/Enemy.jsx";

export default function Enemies() {
  const enemies = useGameState().enemies;

  return (
    <div className={'enemies-side'}>
      {
        enemies.map(enemy => {
          return <Enemy key={enemy.id} enemy={enemy} />
        })
      }
    </div>
  )

}