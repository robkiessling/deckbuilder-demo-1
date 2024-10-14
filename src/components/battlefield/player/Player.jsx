
import {useGameDispatch, useGameState} from "../../../game/GameContext.js";
import './Player.scss'
import FloatingText from "../../ui/floating_text/FloatingText.jsx";
import EquipmentArea from "../../equipment_area/EquipmentArea.jsx";
import HealthBar from "../../ui/health_bar/HealthBar.jsx";

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
      <div className={`player ${player.isDead ? 'is-dead' : ''}`}>
        <FloatingText floatingText={player.floatingText} clearText={clearFloatingText} />
        <span className={'name'}>Player</span>
        <span>HP: {player.health.current} / {player.health.max}</span>
        <span>Block: {player.block.current}</span>
        <HealthBar target={player} />
      </div>
      <EquipmentArea />
    </div>
  )
}