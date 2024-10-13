import {CardTypes, DragTypes, EffectTypes, Mods} from "../constants.js";

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
  blaster: {
    name: 'Blaster',
    cardType: CardTypes.EQUIPMENT,
    dragType: DragTypes.EQUIPMENT,
    equippedDragType: DragTypes.ENEMY, // drag type once it is equipped
    description: 'Deal 6 damage',
    // mods: [Mods.RANGED],
    effect: EffectTypes.SINGLE_TARGET,
    damage: 6,
    energy: 1,
    charges: {
      current: 3,
      max: 3,
    },
    usedThisTurn: false
  },

  attack: {
    name: 'Quick Shot',
    cardType: CardTypes.ABILITY,
    dragType: DragTypes.ENEMY,
    effect: EffectTypes.SINGLE_TARGET,
    description: 'Deal 6 damage',
    energy: 1,
    damage: 6,
  },
  block: {
    name: 'Block',
    cardType: CardTypes.ABILITY,
    dragType: DragTypes.NO_TARGET,
    effect: EffectTypes.NO_TARGET,
    description: 'Gain 5 block',
    energy: 1,
    block: 5,
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
  [EffectTypes.NO_TARGET]: (draft, card, player) => {
    if (card.block) {
      player.block.current += card.block;
      player.floatingText.push({ type: 'gain-block', text: `+${card.block} Block` })
    }
  },
  [EffectTypes.SINGLE_TARGET]: (draft, card, player, target) => {
    if (card.damage) {
      target.health.current -= card.damage;
      target.floatingText.push({ type: 'damage', text: `-${card.damage}` })
    }
  }
}