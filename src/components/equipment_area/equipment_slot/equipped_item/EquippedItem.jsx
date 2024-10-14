
import './EquippedItem.scss';
import {useDrag} from "react-dnd";
import {useGameDispatch, useGameState} from "../../../../game/GameContext.js";
import {DragTypes} from "../../../../constants.js";

export default function EquippedItem({ cardId }) {
  const state = useGameState();
  const dispatch = useGameDispatch();

  const card = state.cardsById[cardId];
  const canUse = card.charges.current > 0 && !card.usedThisTurn && card.equippedDragType !== DragTypes.PASSIVE &&
    state.isPlayerTurn && !state.player.isDead;
  const requiresNoTarget = card.equippedDragType === DragTypes.NO_TARGET;
  const canDrag = canUse && !requiresNoTarget;

  const [{isDragging}, drag] = useDrag(() => ({
    type: card.equippedDragType,
    item: () => ({
      cardId: card.id,
      equipment: true
    }),
    canDrag: () => {
      return canDrag
      // return canUse
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [cardId, canDrag])
  // }), [cardId, canUse])

  function onClick() {
    if (requiresNoTarget && canUse) {
      dispatch({
        type: 'useEquipmentNoTarget',
        cardId: card.id
      })
    }
  }

  return (
    <div ref={drag} className={`equipped-item ${canUse ? 'can-use' : 'cannot-use'}
          ${requiresNoTarget ? 'requires-no-target' : 'requires-target'}`}
         onClick={onClick}>
      <span className={'name'}>{card.name}</span>
      <span className={'description'}>{card.description}</span>
      <span className={'charges'}>{card.charges.current} / {card.charges.max}</span>
    </div>
    // <div ref={drag} className={`equipped-item ${canUse ? 'can-use' : 'cannot-use'} requires-target`}>
    //   <span className={'name'}>{card.name}</span>
    //   <span className={'description'}>{card.description}</span>
    //   <span className={'charges'}>{card.charges.current} / {card.charges.max}</span>
    // </div>
  )
}