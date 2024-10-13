
import './Enemy.scss';

export default function Enemy({enemy}) {
  return (
    <div className={'enemy'}>
      <span>{enemy.type}</span><br/>
      <span>HP: {enemy.health.current} / {enemy.health.max}</span>
    </div>
  )
}