
import './HealthBar.scss';

export default function HealthBar({target}) {

  const width = `${target.health.current / target.health.max * 100}%`

  return (
    <div className={'health-bar-container'}>
      <div className={'health-bar-fill'} style={{width: width}}></div>
    </div>
  )
}