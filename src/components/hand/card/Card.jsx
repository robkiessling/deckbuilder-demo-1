
import './Card.scss';
import { useDrag } from 'react-dnd'
import {useGameState} from "../../../game/GameContext.js";
import {CardTypes} from "../../../constants.js";

export default function Card({cardId}) {
  const state = useGameState();
  const card = state.cardsById[cardId];
  const enoughEnergy = state.player.energy.current >= card.energy;
  const canUse = state.isPlayerTurn && !state.player.isDead && enoughEnergy;

  const [{isDragging}, drag] = useDrag(() => ({
    type: card.dragType,
    item: () => ({
      cardId: card.id
    }),
    canDrag: () => {
      return canUse
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [canUse])

  let cardType;
  switch(card.cardType) {
    case CardTypes.EQUIPMENT:
      cardType = '(Equipment)';
      break;
    case CardTypes.ABILITY:
      cardType = '(Ability)';
      break;
  }

  const cardClass = `card ${isDragging ? 'is-dragging' : ''} ${canUse ? 'can-use' : 'cannot-use'} ` +
    `${enoughEnergy ? 'sufficient' : 'insufficient'} ${card.cardType}`

  return (
    <div ref={drag} className={cardClass}>
      <span className={`energy`}>{card.energy}</span>
      <span className={'name'}>{card.name}</span>
      <span className={'type'}>{cardType}</span>
      <span className={'description'}>{card.description}</span>
      {card.charges && <span className={'charges'}>{card.charges.max} Charges</span>}
    </div>
  )
}