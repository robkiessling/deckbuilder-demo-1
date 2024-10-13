
import './Battlefield.scss';
import Player from "./player/Player.jsx";
import Enemies from "./enemies/Enemies.jsx";
import {useDrop} from "react-dnd";
import {DragTypes} from "../../constants.js";
import {useGameDispatch} from "../../game/GameContext.js";

export default function Battlefield() {
  const dispatch = useGameDispatch();

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
      <Player/>
      <Enemies/>
    </div>
  )
}