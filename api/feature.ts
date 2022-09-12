export interface IFeatureCollection {
  type: string;
  features: Feature[];
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Properties {
  BASENAME: string;
}

interface Geometry {
  type: string;
  coordinates: number[][][];
}
