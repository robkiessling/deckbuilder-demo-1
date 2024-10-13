
import {useGameDispatch, useGameState} from "../../../game/GameContext.js";
import './Player.scss'
import FloatingText from "../../ui/floating_text/FloatingText.jsx";
import EquipmentArea from "../../equipment_area/EquipmentArea.jsx";

export default function Player() {
  const player = useGameState().player;
  const dispatch = useGameDispatch();

  function clearFloatingText() {
    dispatch({
      type: 'clearPlayerFloatingText',
    })
  }

  return (
    <div className={'player-side'}>
      <div className={'player'}>
        <FloatingText floatingText={player.floatingText} clearText={clearFloatingText} />
        <span className={'name'}>Player</span>
        <span>HP: {player.health.current} / {player.health.max}</span>
        <span>Block: {player.block.current}</span>
      </div>
      <EquipmentArea />
    </div>
  )
}