
import './Card.scss';
import { useDrag } from 'react-dnd'
import {useGameState} from "../../../game/GameContext.js";

export default function Card({cardId}) {
  const card = useGameState().cardsById[cardId];

  const [{isDragging}, drag] = useDrag(() => ({
    type: card.dragType,
    item: () => ({
      cardId: card.id
    }),
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} className={`card ${isDragging ? 'is-dragging' : ''}`}>
      <span className={'name'}>{card.name}</span>
      <span className={'description'}>{card.description}</span>
    </div>
  )
}