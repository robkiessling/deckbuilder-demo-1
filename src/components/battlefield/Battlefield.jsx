
import './Battlefield.scss';
import Player from "./player/Player.jsx";
import Enemies from "./enemies/Enemies.jsx";
import {useDrop} from "react-dnd";
import {DragTypes} from "../../constants.js";
import {useGameDispatch, useGameState} from "../../game/GameContext.js";
import {useEffect, useState} from "react";

export default function Battlefield() {
  const state = useGameState();
  const dispatch = useGameDispatch();
  const [flashCurrentTurn, setFlashCurrentTurn] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!state.isPlayerTurn) {
        if (state.enemyIds.every(enemyId => {
          return state.enemiesById[enemyId].performedAction
        })) {
          dispatch({
            type: 'startPlayerTurn'
          })
        }
        else {
          dispatch({
            type: 'nextEnemyAction'
          })
        }
      }
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearInterval(intervalId);
  }, [state.isPlayerTurn, state.enemiesById, dispatch]);

  useEffect(() => {
    setFlashCurrentTurn(true);

    const timeoutId = setTimeout(() => {
      setFlashCurrentTurn(false);
    }, 500)

    return () => {
      setFlashCurrentTurn(false);
      clearTimeout(timeoutId);
    };
  }, [state.isPlayerTurn])


  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DragTypes.NO_TARGET,
    drop: (item) => {
      dispatch({
        type: 'useCardNoTarget',
        cardId: item.cardId
      })
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [])

  const dropClasses = `drop-target ${isOver ? 'is-over' : ''} ${canDrop ? 'can-drop' : ''}`

  return (
    <div className={`battlefield ${dropClasses}`} ref={drop}>
      <div className={'current-turn-container'}>
        <span className={`current-turn ${flashCurrentTurn ? 'flash' : ''}`}>
          {state.isPlayerTurn ? 'Player Turn' : 'Enemy Turn'}
        </span>
      </div>
      <Player/>
      <Enemies/>
    </div>
  )
}