export interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
}

export interface ImageBox {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

export type ImageBoxArray = Array<ImageBox>;

export interface ApiData {
  id: string;
  region_info: {
    bounding_box: {
      top_row: number;
      left_col: number;
      bottom_row: number;
      right_col: number;
    };
  };
  data: {
    concepts: {
      id: string;
      name: string;
      value: number;
      app_id: string;
    }[];
  };
  value: number;
}

export type ApiDataArray = Array<ApiData>;
