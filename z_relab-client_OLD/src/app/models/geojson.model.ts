export class Geometry {
    type: string;
    coordinates: any;
}
export class GeoJson {
        public type: string;
        public geometry: Geometry;
        public properties?: any
}
export class GeoFeatureCollection
{
    public type: string;
    public features : GeoJson[];
}
