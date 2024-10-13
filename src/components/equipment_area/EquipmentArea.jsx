
import './EquipmentArea.scss';
import {useGameState} from "../../game/GameContext.js";
import {createArray} from "../../helpers.js";
import EquipmentSlot from "./equipment_slot/EquipmentSlot.jsx";

const SLOTS_PER_ROW = 2;

export default function EquipmentArea() {

  const state = useGameState();

  const remainingSlots = state.maxEquipmentSlots;
  const numRows = Math.ceil(remainingSlots / SLOTS_PER_ROW)

  let slotIndex = 0;
  const slots = createArray(numRows, () => {
    return createArray(Math.min(remainingSlots, SLOTS_PER_ROW), () => {
      const equipmentSlot = <EquipmentSlot key={slotIndex} slotIndex={slotIndex} />;
      slotIndex += 1;
      return equipmentSlot;
    });
  });

  return (
    <div className={'equipment-area'}>
      { slots }
    </div>
  )
}