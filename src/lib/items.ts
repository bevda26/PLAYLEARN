
// src/lib/items.ts

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic';

export interface Item {
  id: string; // e.g., 'health_potion'
  name: string;
  description: string;
  icon: string; // Emoji or path to an icon component
  rarity: ItemRarity;
  type: 'consumable' | 'key_item' | 'material' | 'collectible';
}

// Master list of all possible items in the game
export const ALL_ITEMS: Item[] = [
  {
    id: 'health_potion',
    name: 'Health Potion',
    description: 'A simple potion that restores a bit of health.',
    icon: '🧪',
    rarity: 'common',
    type: 'consumable',
  },
  {
    id: 'scroll_of_wisdom',
    name: 'Scroll of Wisdom',
    description: 'A magical scroll containing a fragment of ancient knowledge.',
    icon: '📜',
    rarity: 'uncommon',
    type: 'collectible',
  },
  {
    id: 'dragon_scale',
    name: 'Dragon Scale',
    description: 'A shimmering scale from a powerful dragon.',
    icon: '🐲',
    rarity: 'rare',
    type: 'material',
  },
   {
    id: 'golden_key',
    name: 'Golden Key',
    description: 'Unlocks a mysterious chest or door.',
    icon: '🔑',
    rarity: 'epic',
    type: 'key_item',
  },
];

// A map for quick lookups
const itemMap = new Map(ALL_ITEMS.map(item => [item.id, item]));

/**
 * Retrieves an item's details by its ID.
 * @param id The ID of the item to retrieve.
 * @returns The Item object or undefined if not found.
 */
export function getItemById(id: string): Item | undefined {
  return itemMap.get(id);
}
