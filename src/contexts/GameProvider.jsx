import {useReducer} from "react";

import { GameContext, GameDispatchContext } from './GameContext.js'

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
  enemies: [
    {
      id: 1,
      type: 'goblin',
      health: {
        current: 50,
        max: 50
      }
    },
    {
      id: 2,
      type: 'hamster',
      health: {
        current: 10,
        max: 10
      }
    }
  ],
  hand: [
    { id: 1, name: 'Attack', description: 'hi' },
    { id: 2, name: 'Attack', description: 'hi' },
    { id: 3, name: 'Block', description: 'bye' },
  ],
  deck: [],
  discard: [],
  equipment: []
}

function gameReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(
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
