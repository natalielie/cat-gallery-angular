export interface ICatImage {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface IBreed {
  id: string;
  name: string;
}

export interface CatImageData {
  pending: boolean;
  error: string | null;
  images: ICatImage[];
  imageFilters: ImageFilter;
}

export interface ImageFilter {
  breeds: string[];
  quantity: number;
  hasBreed: boolean;
}
