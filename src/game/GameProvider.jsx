import { useImmerReducer } from "use-immer";
import { produce } from "immer";

import {GameContext, GameDispatchContext} from './GameContext.js'
import {current} from "immer";
import {cardEffects, enemyEffects} from "./Database.js";
import {
  activateEquipment,
  createCardInDeck,
  createCardInHand,
  createEnemy, discardCard,
  drawCard,
  equipCardFromHand,
  shuffleDeck
} from "./GameMechanics.jsx";


const MAX_STARTING_ENERGY = 5;
const ENEMY_GAIN_ATK_PER_TURN = 2;

const initialState = {
  isPlayerTurn: true,

  player: {
    health: {
      current: 80,
      max: 80
    },
    block: {
      current: 0,
      max: 999
    },
    energy: {
      current: 1,
      max: 1,
    },
    floatingText: []
  },

  enemiesById: {},
  cardsById: {},

  enemyIds: [],
  handIds: [],
  deckIds: [],
  discardIds: [],
  equipmentIds: [],
  maxEquipmentSlots: 4
}

createEnemy(initialState, 'goblin');
createEnemy(initialState, 'goblin');
createEnemy(initialState, 'hamster');
createEnemy(initialState, 'hamster');

createCardInDeck(initialState, 'quickShot');
createCardInDeck(initialState, 'quickShot');
createCardInDeck(initialState, 'aimedShot');
createCardInDeck(initialState, 'aimedShot');
createCardInDeck(initialState, 'rocketPunch');
createCardInDeck(initialState, 'rocketPunch');
createCardInDeck(initialState, 'emergencyShield');
createCardInDeck(initialState, 'grenades');
createCardInDeck(initialState, 'grenades');

createCardInDeck(initialState, 'blaster');
createCardInDeck(initialState, 'blaster');
createCardInDeck(initialState, 'rifle');
createCardInDeck(initialState, 'plasmaSword');
createCardInDeck(initialState, 'rocketLauncher');
createCardInDeck(initialState, 'shieldGenerator');
createCardInDeck(initialState, 'shieldGenerator');
createCardInDeck(initialState, 'utilityPack');

shuffleDeck(initialState);
drawCard(initialState);
drawCard(initialState);
drawCard(initialState);
drawCard(initialState);
// drawCard(initialState);


function gameReducer(draft, action) {
  switch (action.type) {
    case 'createEnemy': {
      createEnemy(draft, action.template);
      break;
    }
    case 'createCardInDeck': {
      createCardInDeck(draft, action.template);
      break;
    }
    case 'shuffleDeck': {
      shuffleDeck(draft);
      break;
    }
    case 'equipCard': {
      const card = draft.cardsById[action.cardId];
      draft.player.energy.current -= card.energy;
      equipCardFromHand(draft, action.slotIndex, action.cardId);
      break;
    }
    case 'startPlayerTurn': {
      // todo making every enemy gain +1 atk
      draft.enemyIds.forEach(enemyId => {
        draft.enemiesById[enemyId].attack = draft.enemiesById[enemyId].attack + ENEMY_GAIN_ATK_PER_TURN;
      })

      draft.isPlayerTurn = true;
      draft.player.energy.max = Math.min(draft.player.energy.max + 1, MAX_STARTING_ENERGY); // increase energy every turn
      draft.player.energy.current = draft.player.energy.max;
      draft.player.block.current = 0;
      for (const card of Object.values(draft.cardsById)) {
        card.usedThisTurn = false;
      }
      drawCard(draft);
      break;
    }
    case 'endPlayerTurn': {
      draft.isPlayerTurn = false;
      draft.enemyIds.forEach(enemyId => {
        draft.enemiesById[enemyId].performedAction = false;
      })
      break;
    }
    case 'nextEnemyAction': {
      for (let i = 0; i < draft.enemyIds.length; i++) {
        const enemy = draft.enemiesById[draft.enemyIds[i]];
        if (!enemy.isDead && !enemy.performedAction) {
          enemyEffects.attack(draft, draft.player, enemy);
          enemy.performedAction = true;
          break;
        }
      }
      break;
    }
    case 'useCardNoTarget': {
      const card = draft.cardsById[action.cardId];
      draft.player.energy.current -= card.energy;
      const effect = cardEffects[card.effect];
      effect(draft, card, draft.player)
      discardCard(draft, action.cardId);
      break;
    }
    case 'useCardOnEnemy': {
      const card = draft.cardsById[action.cardId];
      draft.player.energy.current -= card.energy;
      const effect = cardEffects[card.effect]
      effect(draft, card, draft.player, draft.enemiesById[action.enemyId])
      discardCard(draft, action.cardId);
      break;
    }
    case 'useEquipmentNoTarget': {
      const card = draft.cardsById[action.cardId];
      const effect = cardEffects[card.effect];
      effect(draft, card, draft.player)
      activateEquipment(draft, action.cardId);
      break;
    }
    case 'useEquipmentOnEnemy': {
      const card = draft.cardsById[action.cardId];
      const effect = cardEffects[card.effect]
      effect(draft, card, draft.player, draft.enemiesById[action.enemyId])
      activateEquipment(draft, action.cardId);
      break;
    }
    case 'clearPlayerFloatingText': {
      draft.player.floatingText = []
      break;
    }
    case 'clearEnemyFloatingText': {
      draft.enemiesById[action.enemyId].floatingText = []
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useImmerReducer(
    gameReducer,
    initialState
  );

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}
