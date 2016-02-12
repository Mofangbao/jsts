import CoordinateFilter from '../geom/CoordinateFilter';
export default class CoordinateArrayFilter {
	constructor(...args) {
		this.pts = null;
		this.n = 0;
		switch (args.length) {
			case 1:
				{
					let [size] = args;
					this.pts = new Array(size);
					break;
				}
		}
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	filter(coord) {
		this.pts[this.n++] = coord;
	}
	getCoordinates() {
		return this.pts;
	}
	getClass() {
		return CoordinateArrayFilter;
	}
}
