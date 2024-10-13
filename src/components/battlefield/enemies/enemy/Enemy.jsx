
import { useDrop } from 'react-dnd'
import './Enemy.scss';
import {DragTypes} from "../../../../constants.js";
import {useGameDispatch, useGameState} from "../../../../game/GameContext.js";
import {useEffect, useRef, useState} from "react";

export default function Enemy({enemyId}) {
  const enemy = useGameState().enemiesById[enemyId];
  const dispatch = useGameDispatch();
  const enemyDiv = useRef(null);
  const [attackAnimation, setAttackAnimation] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.ENEMY,
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

  useEffect(() => {
    // If enemy has performed its action, show a brief animation
    if (enemy.performedAction) {
      setAttackAnimation(true);
      const timeoutId = setTimeout(() => {
        setAttackAnimation(false);
      }, 250)
      return () => {
        setAttackAnimation(false);
        clearTimeout(timeoutId);
      };
    }
  }, [enemy.performedAction]);

  return (
    <div className={`enemy-frame ${isOver ? 'card-hover' : ''}`} ref={drop}>
      <div className={`enemy ${attackAnimation ? 'attack-animation' : ''}`} ref={enemyDiv}>
        <span className={'name'}>{enemy.name}</span>
        <span>HP: {enemy.health.current} / {enemy.health.max}</span>
        <span>ATK: {enemy.attack}</span>
      </div>
    </div>
  )
}