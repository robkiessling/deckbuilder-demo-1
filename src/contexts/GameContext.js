import { createContext, useContext } from 'react';

export const GameContext = createContext(null);
export const GameDispatchContext = createContext(null);

export function useGameState() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}
