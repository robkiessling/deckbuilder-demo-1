
import './Card.scss';
import { useDrag } from 'react-dnd'
import {DragTypes} from "../../../constants.js";
import {useGameState} from "../../../contexts/GameContext.js";

export default function Card({cardId}) {
  const card = useGameState().cardsById[cardId];

  const [{isDragging}, drag] = useDrag(() => ({
    type: DragTypes.CARD,
    item: () => ({
      cardId: card.id
    }),
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} className={`card ${isDragging ? 'is-dragging' : ''}`}>
      <span>{card.name}</span>
      <span>{card.description}</span>
    </div>
  )
}