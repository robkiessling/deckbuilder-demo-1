
import './Battlefield.scss';
import Player from "./player/Player.jsx";
import Enemies from "./enemies/Enemies.jsx";

export default function Battlefield() {
  return (
    <div className={'battlefield'}>
      <Player/>
      <Enemies/>
    </div>
  )
}