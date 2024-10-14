
import './Info.scss';

export default function Info() {
  return (
    <div className={'demo-info'}>
      <ul>
        <li>Gain 1 max energy per turn (like hearthstone). Draw 1 card per turn.</li>
        <li>
          <b>Ability</b> cards are one-time use. Drag to an enemy or drag upwards if non-targetted.
        </li>
        <li>
          <b>Equipment</b> cards are dragged to equipment slots. Equipped cards can be used once per turn (including the turn they are equipped).
          <ul>
          <li>To use an equipment, drag it like you would a card (or click if non-targetted).</li>
          </ul>
        </li>
        <li>
          Enemy attacks grow stronger each turn. Beware!
        </li>
      </ul>
    </div>
  )
}