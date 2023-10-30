export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: string[];
  favourite: object;
}

export interface CatImage {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Breed {
  id: string;
  name: string;
}
