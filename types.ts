
export interface Trait {
  id: number;
  description: string;
}

export interface Creature {
  id: number;
  name: string;
  description: string;
}

export interface Pose {
  id: number;
  description: string;
}

export interface Costume {
  id: number;
  name: string;
}

// FIX: Added missing `Saying` type definition.
export interface Saying {
  id: number;
  text: string;
}

// FIX: Added missing type definitions for various components and services.
// These types were being imported but were not defined, causing compilation errors.
export interface DrawingStyle {
  id: number;
  name: string;
}

export interface ArtisticInfluence {
  id: number;
  name: string;
  knownFor: string;
}

export interface Artist {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface EdgyArtStyle {
  id: number;
  name: string;
}

export interface FilterFX {
  id: number;
  description: string;
}
