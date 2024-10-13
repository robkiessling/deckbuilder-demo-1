import { useImmerReducer } from "use-immer";
import { produce } from "immer";

import {GameContext, GameDispatchContext} from './GameContext.js'
import {current} from "immer";
import {cardTemplates, effects, enemyTemplates} from "./Database.js";

let id = 1;

const initialState = {
  player: {
    health: {
      current: 33,
      max: 50
    },
    energy: {
      current: 3,
      regen: 3,
    }
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
createCardInHand(initialState, 'attack');
createCardInHand(initialState, 'attack');
createCardInHand(initialState, 'block');

function createEnemy(state, template) {
  const enemy = produce(enemyTemplates[template], draft => {
    draft.id = id++;
    draft.template = template;
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
    case 'useCardNoTarget': {
      const card = draft.cardsById[action.cardId];
      const effect = effects[card.effect];
      effect(draft, card, draft.player)
      break;
    }
    case 'useCardOnEnemy': {
      const card = draft.cardsById[action.cardId];
      const effect = effects[card.effect]
      effect(draft, card, draft.player, draft.enemiesById[action.enemyId])
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
