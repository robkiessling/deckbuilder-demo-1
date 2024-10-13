import {DragTypes} from "../constants.js";

export const enemyTemplates = {
  goblin: {
    name: 'Goblin',
    description: 'A vicious goblin',
    health: {
      current: 50,
      max: 50
    }
  },
  hamster: {
    name: 'Hamster',
    description: 'A docile hamster with fangs',
    health: {
      current: 10,
      max: 10
    }
  }
}

export const cardTemplates = {
  attack: {
    name: 'Attack',
    description: 'Deal 6 damage',
    damage: 6,
    effect: 'singleTarget',
    dragType: DragTypes.ENEMY
  },
  block: {
    name: 'Block',
    description: 'Gain 5 block',
    block: 5,
    effect: 'noTarget',
    dragType: DragTypes.NO_TARGET
  }
}

export const effects = {
  noTarget: (draft, card, player) => {
    if (card.block) {
      player.health.current += card.block;
    }
  },
  singleTarget: (draft, card, player, target) => {
    if (card.damage) {
      target.health.current -= card.damage;
    }
  }
}