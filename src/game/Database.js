import {CardTypes, DragTypes, EffectTypes, Mods} from "../constants.js";
import {produce} from "immer";
import {shuffleArray} from "../helpers.js";
import {dealDamage, drawCard} from "./GameMechanics.jsx";

export const enemyTemplates = {
  goblin: {
    name: 'Goblin',
    description: 'A vicious goblin',
    health: {
      current: 50,
      max: 50
    },
    block: {
      current: 0
    },
    attack: 5
  },
  hamster: {
    name: 'Hamster',
    description: 'A docile hamster with fangs',
    health: {
      current: 10,
      max: 10
    },
    block: {
      current: 0
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
    description: 'Deal 7 damage.',
    effect: EffectTypes.SINGLE_TARGET,
    damage: 7,
    energy: 2,
    charges: {
      current: 3,
      max: 3,
    },
    usedThisTurn: false
  },
  rifle: {
    name: 'Rifle',
    cardType: CardTypes.EQUIPMENT,
    dragType: DragTypes.EQUIPMENT,
    equippedDragType: DragTypes.ENEMY,
    description: 'Deal 11 damage.',
    effect: EffectTypes.SINGLE_TARGET,
    damage: 11,
    energy: 2,
    charges: {
      current: 2,
      max: 2
    },
    usedThisTurn: false
  },
  plasmaSword: {
    name: 'Plasma Sword',
    cardType: CardTypes.EQUIPMENT,
    dragType: DragTypes.EQUIPMENT,
    equippedDragType: DragTypes.NO_TARGET,
    description: 'Deal 15 melee damage. Draw 1 card.',
    effect: EffectTypes.MELEE_TARGET,
    damage: 15,
    draw: 1,
    energy: 3,
    charges: {
      current: 3,
      max: 3,
    },
    usedThisTurn: false
  },
  shieldGenerator: {
    name: 'Shield Generator',
    cardType: CardTypes.EQUIPMENT,
    dragType: DragTypes.EQUIPMENT,
    equippedDragType: DragTypes.NO_TARGET,
    description: 'Gain 8 block.',
    effect: EffectTypes.NO_TARGET,
    block: 8,
    energy: 2,
    charges: {
      current: 3,
      max: 3,
    },
    usedThisTurn: false
  },
  rocketLauncher: {
    name: 'Rocket Launcher',
    cardType: CardTypes.EQUIPMENT,
    dragType: DragTypes.EQUIPMENT,
    equippedDragType: DragTypes.NO_TARGET,
    description: 'Deal 20 damage to all enemies.',
    effect: EffectTypes.ALL_ENEMIES,
    damage: 20,
    energy: 5,
    charges: {
      current: 2,
      max: 2,
    },
    usedThisTurn: false
  },

  utilityPack: {
    name: 'Utility Pack',
    cardType: CardTypes.EQUIPMENT,
    dragType: DragTypes.EQUIPMENT,
    equippedDragType: DragTypes.NO_TARGET,
    description: 'Draw 1 card.',
    effect: EffectTypes.NO_TARGET,
    draw: 1,
    energy: 1,
    charges: {
      current: 3,
      max: 3
    },
    usedThisTurn: false
  },
  // shockAbsorbers: {
  //   name: 'Shock Absorbers',
  //   cardType: CardTypes.EQUIPMENT,
  //   dragType: DragTypes.EQUIPMENT,
  //   equippedDragType: DragTypes.PASSIVE,
  //   description: 'Passive: Block the next damage received.',
  //   effect: EffectTypes.BLOCK_NEXT_DAMAGE,
  //   energy: 3,
  //   charges: {
  //     current: 3,
  //     max: 3,
  //   },
  //   usedThisTurn: false
  // },

  quickShot: {
    name: 'Quick Shot',
    cardType: CardTypes.ABILITY,
    dragType: DragTypes.ENEMY,
    effect: EffectTypes.SINGLE_TARGET,
    description: 'Deal 6 damage.',
    energy: 0,
    damage: 6,
  },
  aimedShot: {
    name: 'Aimed Shot',
    cardType: CardTypes.ABILITY,
    dragType: DragTypes.ENEMY,
    effect: EffectTypes.SINGLE_TARGET,
    description: 'Deal 12 damage.',
    energy: 1,
    damage: 12,
  },
  grenades: {
    name: 'Grenades',
    cardType: CardTypes.ABILITY,
    dragType: DragTypes.NO_TARGET,
    effect: EffectTypes.ALL_ENEMIES,
    description: 'Deal 9 damage to all enemies.',
    energy: 2,
    damage: 9,
  },
  rocketPunch: {
    name: 'Rocket Punch',
    cardType: CardTypes.ABILITY,
    dragType: DragTypes.NO_TARGET,
    effect: EffectTypes.MELEE_TARGET,
    description: 'Deal 22 melee damage.',
    energy: 2,
    damage: 22,
  },
  emergencyShield: {
    name: 'Emergency Shield',
    cardType: CardTypes.ABILITY,
    dragType: DragTypes.NO_TARGET,
    effect: EffectTypes.NO_TARGET,
    description: 'Gain 20 block.',
    energy: 1,
    block: 20,
  }
}

export const enemyEffects = {
  attack: (draft, player, enemy) => {
    dealDamage(player, enemy.attack);
  }
}

export const cardEffects = {
  [EffectTypes.NO_TARGET]: (draft, card, player) => {
    if (card.block) {
      player.block.current += card.block;
      player.floatingText.push({ type: 'gain-block', text: `+${card.block} Block` })
    }
    if (card.draw) {
      drawCard(draft);
    }
  },
  [EffectTypes.SINGLE_TARGET]: (draft, card, player, target) => {
    if (card.damage) {
      dealDamage(target, card.damage);
    }
    if (card.draw) {
      drawCard(draft);
    }
  },
  [EffectTypes.ALL_ENEMIES]: (draft, card, player) => {
    if (card.damage) {
      draft.enemyIds.forEach(enemyId => {
        const enemy = draft.enemiesById[enemyId];
        if (!enemy.isDead) {
          dealDamage(enemy, card.damage);
        }
      })
    }
    if (card.draw) {
      drawCard(draft);
    }
  },
  [EffectTypes.MELEE_TARGET]: (draft, card, player) => {
    if (card.damage) {
      for (let i = 0; i < draft.enemyIds.length; i++) {
        const enemy = draft.enemiesById[draft.enemyIds[i]];
        if (!enemy.isDead) {
          dealDamage(enemy, card.damage);
          break;
        }
      }
    }
    if (card.draw) {
      drawCard(draft);
    }
  },
  // [EffectTypes.BLOCK_NEXT_DAMAGE]: (draft, card, player, target) => {
  //
  // }
}
