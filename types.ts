
export interface Trait {
  trait_type: string;
  value: string;
}

export interface NftMetadata {
  name: string;
  description: string;
  traits: Trait[];
  lore: string;
}
