export enum CATEGORY_TYPES {
  ALL,
  VUE,
  REACT,
  NODE
}

export interface ILessonsParams {
  category: CATEGORY_TYPES;
  offset: number;
  limit: number;
}

export interface ILesson {
  title: string;
  video?: string;
  poster: string;
  price: number;
  category?: string;
}

export interface ILessons {
  hasMore: boolean;
  loading: boolean;
  offset: number;
  limit: number;
  list: ILesson[];
}

export interface ISlider {
  url: string;
}

export interface IHomeState {
  currentCategory: CATEGORY_TYPES;
  sliders: Array<ISlider>; //ISlider[],
  lessons: ILessons;
}
