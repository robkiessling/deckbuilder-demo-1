
import './EquipmentSlot.scss';
import {useGameDispatch, useGameState} from "../../../game/GameContext.js";
import {useDrop} from "react-dnd";
import {DragTypes} from "../../../constants.js";
import EquippedItem from "./equipped_item/EquippedItem.jsx";

export default function EquipmentSlot({slotIndex}) {
  const dispatch = useGameDispatch();
  const state = useGameState();

  const equipmentId = state.equipmentIds[slotIndex];

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DragTypes.EQUIPMENT,
    drop: (item) => {
      dispatch({
        type: 'equipCard',
        slotIndex: slotIndex,
        cardId: item.cardId
      })
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    }),
  }), [])

  return (
    <div className={`equipment-slot drop-target ${isOver && canDrop ? 'is-over' : ''} ${canDrop ? 'can-drop' : ''}`} ref={drop}>
      { equipmentId && <EquippedItem cardId={equipmentId} /> }
    </div>
  )
}