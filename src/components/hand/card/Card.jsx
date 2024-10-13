
import './Card.scss';
import { useDrag } from 'react-dnd'
import {useGameState} from "../../../game/GameContext.js";

export default function Card({cardId}) {
  const state = useGameState();
  const card = state.cardsById[cardId];
  const enoughEnergy = state.player.energy.current >= card.energy;

  const [{isDragging}, drag] = useDrag(() => ({
    type: card.dragType,
    item: () => ({
      cardId: card.id
    }),
    canDrag: () => {
      return enoughEnergy
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [enoughEnergy])


  return (
    <div ref={drag} className={`card ${isDragging ? 'is-dragging' : ''} ${enoughEnergy ? 'sufficient' : 'insufficient'}`}>
      <span className={`energy`}>{card.energy}</span>
      <span className={'name'}>{card.name}</span>
      <span className={'description'}>{card.description}</span>
    </div>
  )
}