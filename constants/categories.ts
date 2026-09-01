import { TRAITS } from './traits';
import type { Trait } from '../types';

export interface TraitCategory {
  name: string;
  range: { start: number; end: number };
  rerollable: boolean;
  traits: Trait[];
}

// A full definition of all categories based on the new `traits.ts` file
const CATEGORY_DEFINITIONS: Omit<TraitCategory, 'traits'>[] = [
  { name: 'Material & Texture', range: { start: 31, end: 60 }, rerollable: true },
  { name: 'Face Paint & Markings', range: { start: 61, end: 90 }, rerollable: true },
  { name: 'Head & Features', range: { start: 91, end: 120 }, rerollable: true },
  { name: 'Eyes (CRITICAL)', range: { start: 121, end: 140 }, rerollable: true },
  { name: 'Clothing & Attire', range: { start: 141, end: 170 }, rerollable: true },
  { name: 'Props & Weapons', range: { start: 171, end: 200 }, rerollable: true },
  { name: 'Atmosphere & Effects', range: { start: 201, end: 220 }, rerollable: true },
  { name: 'Elemental & Organic', range: { start: 221, end: 320 }, rerollable: true },
  { name: 'Material & Texture II', range: { start: 321, end: 370 }, rerollable: true },
  { name: 'Streetwear Attire', range: { start: 371, end: 380 }, rerollable: true },
];

// Process the definitions to include the actual trait objects for easy rendering
export const ALL_TRAIT_CATEGORIES: TraitCategory[] = CATEGORY_DEFINITIONS.map(def => ({
    ...def,
    traits: TRAITS.filter(trait => trait.id >= def.range.start && trait.id <= def.range.end),
}));

// A filtered list for the specific "Reroll" buttons in the UI
export const REROLL_CATEGORIES = ALL_TRAIT_CATEGORIES.filter(cat => cat.rerollable);