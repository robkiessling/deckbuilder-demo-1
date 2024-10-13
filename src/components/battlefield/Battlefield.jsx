
import './Battlefield.scss';
import Player from "./player/Player.jsx";
import Enemies from "./enemies/Enemies.jsx";
import {useDrop} from "react-dnd";
import {DragTypes} from "../../constants.js";
import {useGameDispatch, useGameState} from "../../game/GameContext.js";
import {useEffect} from "react";

export default function Battlefield() {
  const state = useGameState();
  const dispatch = useGameDispatch();

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


  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.NO_TARGET,
    drop: (item) => {
      dispatch({
        type: 'useCardNoTarget',
        cardId: item.cardId
      })
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [])


  return (
    <div className={`battlefield ${isOver ? 'card-hover' : ''}`} ref={drop}>
      <span className={'current-turn'}>{state.isPlayerTurn ? 'Player Turn' : 'Enemy Turn'}</span>
      <Player/>
      <Enemies/>
    </div>
  )
}