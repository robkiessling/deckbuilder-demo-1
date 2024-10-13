// import {useReducer} from "react";
import { useImmerReducer } from "use-immer";

import { GameContext, GameDispatchContext } from './GameContext.js'
import {current} from "immer";

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
  enemiesById: {
    1: {
      id: 1,
      type: 'goblin',
      health: {
        current: 50,
        max: 50
      }
    },
    2: {
      id: 2,
      type: 'hamster',
      health: {
        current: 10,
        max: 10
      }
    }
  },
  enemies: [1, 2],
  cardsById: {
    1: { id: 1, name: 'Attack', description: 'hi', damage: 10 },
    2: { id: 2, name: 'Attack', description: 'hi', damage: 10 },
    3: { id: 3, name: 'Block', description: 'bye', block: 5 },
  },
  hand: [1, 2, 3],
  deck: [],
  discard: [],
  equipment: []
}

function gameReducer(draft, action) {
  switch (action.type) {
    case 'useCardOnEnemy': {
      const card = draft.cardsById[action.cardId];
      if (card.damage) {
        draft.enemiesById[action.enemyId].health.current -= card.damage;
      }
      return;
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
