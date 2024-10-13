import {DragTypes} from "../constants.js";

export const enemyTemplates = {
  goblin: {
    name: 'Goblin',
    description: 'A vicious goblin',
    health: {
      current: 50,
      max: 50
    },
    attack: 10
  },
  hamster: {
    name: 'Hamster',
    description: 'A docile hamster with fangs',
    health: {
      current: 10,
      max: 10
    },
    attack: 1
  }
}

export const cardTemplates = {
  attack: {
    name: 'Attack',
    description: 'Deal 6 damage',
    energy: 1,
    damage: 6,
    effect: 'singleTarget',
    dragType: DragTypes.ENEMY
  },
  block: {
    name: 'Block',
    description: 'Gain 5 block',
    energy: 1,
    block: 5,
    effect: 'noTarget',
    dragType: DragTypes.NO_TARGET
  }
}

export const enemyEffects = {
  attack: (draft, player, enemy) => {
    let remainingDamage = enemy.attack;
    if (player.block.current < remainingDamage) {
      remainingDamage -= player.block.current;
      player.block.current = 0;
      player.floatingText.push({ type: 'damage', text: `-${remainingDamage}` })
    }
    else {
      player.block.current -= remainingDamage;
      remainingDamage = 0;
      player.floatingText.push({ type: 'blocked-all', text: `Blocked` })
    }
    player.health.current -= remainingDamage;
  }
}

export const cardEffects = {
  noTarget: (draft, card, player) => {
    player.energy.current -= card.energy;
    if (card.block) {
      player.block.current += card.block;
      player.floatingText.push({ type: 'gain-block', text: `+${card.block} Block` })
    }
  },
  singleTarget: (draft, card, player, target) => {
    player.energy.current -= card.energy;
    if (card.damage) {
      target.health.current -= card.damage;
      target.floatingText.push({ type: 'damage', text: `-${card.damage}` })
    }
  }
}