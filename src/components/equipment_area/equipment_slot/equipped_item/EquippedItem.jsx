
import './EquippedItem.scss';
import {useDrag} from "react-dnd";
import {useGameState} from "../../../../game/GameContext.js";

export default function EquippedItem({ cardId }) {
  const state = useGameState();
  const card = state.cardsById[cardId];
  const canUse = card.charges.current > 0 && !card.usedThisTurn && state.isPlayerTurn;

  const [{isDragging}, drag] = useDrag(() => ({
    type: card.equippedDragType,
    item: () => ({
      cardId: card.id,
      equipment: true
    }),
    canDrag: () => {
      return canUse
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [canUse])

  return (
    <div ref={drag} className={`equipped-item ${canUse ? 'can-use' : 'cannot-use'}`}>
      <span className={'name'}>{card.name}</span>
      <span className={'description'}>{card.description}</span>
      <span className={'charges'}>{card.charges.current} / {card.charges.max}</span>
    </div>
  )
}