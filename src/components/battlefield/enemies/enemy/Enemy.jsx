
import { useDrop } from 'react-dnd'
import './Enemy.scss';
import {DragTypes} from "../../../../constants.js";
import {useGameDispatch, useGameState} from "../../../../game/GameContext.js";
import {useEffect, useState} from "react";
import FloatingText from "../../../ui/floating_text/FloatingText.jsx";

export default function Enemy({enemyId}) {
  const enemy = useGameState().enemiesById[enemyId];
  const dispatch = useGameDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.ENEMY,
    drop: (item) => {
      dispatch({
        type: 'useCardOnEnemy',
        enemyId: enemyId,
        cardId: item.cardId
      })
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [enemyId])

  const [attackAnimation, setAttackAnimation] = useState(false);
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

  function clearFloatingText() {
    dispatch({
      type: 'clearEnemyFloatingText',
      enemyId: enemyId
    })
  }

  return (
    <div className={`enemy-frame`}>
      <div className={`enemy ${isOver ? 'card-hover' : ''} ${attackAnimation ? 'attack-animation' : ''}`} ref={drop}>
        <FloatingText floatingText={enemy.floatingText} clearText={clearFloatingText} />
        <span className={'name'}>{enemy.name}</span>
        <span>HP: {enemy.health.current} / {enemy.health.max}</span>
        <span>ATK: {enemy.attack}</span>
      </div>
    </div>
  )
}