
import { useDrop } from 'react-dnd'
import './Enemy.scss';
import {DragTypes} from "../../../../constants.js";
import {useGameDispatch, useGameState} from "../../../../contexts/GameContext.js";

export default function Enemy({enemyId}) {
  const enemy = useGameState().enemiesById[enemyId];

  const dispatch = useGameDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.CARD,
    drop: (item) => {
      dispatch({
        type: 'useCardOnEnemy',
        enemyId: enemy.id,
        cardId: item.cardId
      })
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [enemy.id])

  return (
    <div className={`enemy ${isOver ? 'card-hover' : ''}`} ref={drop}>
      <span>{enemy.type}</span><br/>
      <span>HP: {enemy.health.current} / {enemy.health.max}</span>
    </div>
  )
}