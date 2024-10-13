
import './Card.scss';
import { useDrag } from 'react-dnd'
import {useGameState} from "../../../game/GameContext.js";
import {CardTypes} from "../../../constants.js";

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

  let cardType;
  switch(card.cardType) {
    case CardTypes.EQUIPMENT:
      cardType = '(Equipment)';
      break;
    case CardTypes.ABILITY:
      cardType = '(Ability)';
      break;
  }

  return (
    <div ref={drag} className={`card ${isDragging ? 'is-dragging' : ''} ${enoughEnergy ? 'sufficient' : 'insufficient'}`}>
      <span className={`energy`}>{card.energy}</span>
      <span className={'name'}>{card.name}</span>
      <span className={'type'}>{cardType}</span>
      <span className={'description'}>{card.description}</span>
    </div>
  )
}