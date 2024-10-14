import {produce} from "immer";
import {shuffleArray} from "../helpers.js";
import {cardTemplates, enemyTemplates} from "./Database.js";

let id = 1;

export function createEnemy(state, template) {
  const enemy = produce(enemyTemplates[template], draft => {
    draft.id = id++;
    draft.template = template;
    draft.performedAction = false;
    draft.floatingText = []
  });

  state.enemiesById[enemy.id] = enemy;
  state.enemyIds.push(enemy.id);
}
export function createCardInHand(state, template) {
  const card = produce(cardTemplates[template], draft => {
    draft.id = id++;
    draft.template = template;
  })

  state.cardsById[card.id] = card;
  state.handIds.push(card.id);
}
export function createCardInDeck(state, template) {
  const card = produce(cardTemplates[template], draft => {
    draft.id = id++;
    draft.template = template;
  })

  state.cardsById[card.id] = card;
  state.deckIds.push(card.id);
}
export function shuffleDeck(state) {
  shuffleArray(state.deckIds);
}
export function drawCard(state) {
  if (state.deckIds.length) {
    state.handIds.push(state.deckIds.shift());
  }
}
export function discardCard(state, cardId) {
  if (state.handIds.indexOf(cardId) !== -1) {
    state.handIds = state.handIds.filter(handId => cardId !== handId)
    state.discardIds.push(cardId);
  }
}
export function equipCardFromHand(state, slotIndex, cardId) {
  if (state.handIds.indexOf(cardId) !== -1) {
    state.handIds = state.handIds.filter(handId => cardId !== handId)
    state.equipmentIds[slotIndex] = cardId;
  }
}
export function activateEquipment(state, cardId) {
  const card = state.cardsById[cardId];
  if (card.charges.current > 0) {
    card.charges.current -= 1
    card.usedThisTurn = true

    if (card.charges.current === 0) {
      // todo delete equipment?
    }
  }
}


export function dealDamage(target, amount) {
  if (target.block.current < amount) {
    amount -= target.block.current;
    target.block.current = 0;
    target.floatingText.push({ type: 'damage', text: `-${amount}` })
  }
  else {
    target.block.current -= amount;
    amount = 0;
    target.floatingText.push({ type: 'blocked-all', text: `Blocked` })
  }
  target.health.current -= amount;

  if (target.health.current <= 0) {
    target.health.current = 0;
    target.isDead = true;
  }

}
