import { useImmerReducer } from "use-immer";
import { produce } from "immer";

import {GameContext, GameDispatchContext} from './GameContext.js'
import {current} from "immer";
import {cardTemplates, cardEffects, enemyTemplates, enemyEffects} from "./Database.js";
import {shuffleArray} from "../helpers.js";

let id = 1;

const initialState = {
  isPlayerTurn: true,

  player: {
    health: {
      current: 33,
      max: 50
    },
    block: {
      current: 0,
      max: 999
    },
    energy: {
      current: 3,
      max: 3,
    },
    floatingText: []
  },

  enemiesById: {},
  cardsById: {},

  enemyIds: [],
  handIds: [],
  deckIds: [],
  discardIds: [],
  equipmentIds: []
}

createEnemy(initialState, 'goblin');
createEnemy(initialState, 'hamster');
createCardInDeck(initialState, 'attack');
createCardInDeck(initialState, 'attack');
createCardInDeck(initialState, 'block');
createCardInDeck(initialState, 'attack');
createCardInDeck(initialState, 'attack');
createCardInDeck(initialState, 'block');
createCardInDeck(initialState, 'attack');
createCardInDeck(initialState, 'attack');
createCardInDeck(initialState, 'block');
shuffleDeck(initialState);
drawCard(initialState);
drawCard(initialState);
drawCard(initialState);

function createEnemy(state, template) {
  const enemy = produce(enemyTemplates[template], draft => {
    draft.id = id++;
    draft.template = template;
    draft.performedAction = false;
    draft.floatingText = []
  });

  state.enemiesById[enemy.id] = enemy;
  state.enemyIds.push(enemy.id);
}
function createCardInHand(state, template) {
  const card = produce(cardTemplates[template], draft => {
    draft.id = id++;
    draft.template = template;
  })

  state.cardsById[card.id] = card;
  state.handIds.push(card.id);
}
function createCardInDeck(state, template) {
  const card = produce(cardTemplates[template], draft => {
    draft.id = id++;
    draft.template = template;
  })

  state.cardsById[card.id] = card;
  state.deckIds.push(card.id);
}
function shuffleDeck(state) {
  shuffleArray(state.deckIds);
}
function drawCard(state) {
  if (state.deckIds.length) {
    state.handIds.push(state.deckIds.shift());
  }
}
function discardCard(state, discardId) {
  if (state.handIds.indexOf(discardId) !== -1) {
    state.handIds = state.handIds.filter(cardId => discardId !== cardId)
    state.discardIds.push(discardId);
  }
}

function gameReducer(draft, action) {
  switch (action.type) {
    case 'createEnemy': {
      createEnemy(draft, action.template);
      break;
    }
    case 'createCardInHand': {
      createCardInHand(draft, action.template);
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
    case 'drawCard': {

      break;
    }
    case 'startPlayerTurn': {
      draft.isPlayerTurn = true;
      draft.player.energy.current = draft.player.energy.max;
      draft.player.block.current = 0;
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
        if (!enemy.performedAction) {
          enemyEffects.attack(draft, draft.player, enemy);
          enemy.performedAction = true;
          break;
        }
      }
      break;
    }
    case 'useCardNoTarget': {
      const card = draft.cardsById[action.cardId];
      const effect = cardEffects[card.effect];
      effect(draft, card, draft.player)
      discardCard(draft, action.cardId);
      break;
    }
    case 'useCardOnEnemy': {
      const card = draft.cardsById[action.cardId];
      const effect = cardEffects[card.effect]
      effect(draft, card, draft.player, draft.enemiesById[action.enemyId])
      discardCard(draft, action.cardId);
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
