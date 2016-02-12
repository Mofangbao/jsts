import NumberUtil from '../util/NumberUtil';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Double from '../../../../java/lang/Double';
import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Comparator from '../../../../java/util/Comparator';
import Serializable from '../../../../java/io/Serializable';
import Assert from '../util/Assert';
export default class Coordinate {
	constructor(...args) {
		if (args.length === 0) {
			this.x = 0;
			this.y = 0;
			this.z = Coordinate.NULL_ORDINATE;
		} else if (args.length === 1) {
			let [c] = args;
			this.x = c.x;
			this.y = c.y;
			this.z = c.z;
		} else if (args.length === 2) {
			let [x, y] = args;
			this.x = x;
			this.y = y;
			this.z = Coordinate.NULL_ORDINATE;
		} else if (args.length === 3) {
			let [x, y, z] = args;
			this.x = x;
			this.y = y;
			this.z = z;
		}
	}
	get interfaces_() {
		return [Comparable, Cloneable, Serializable];
	}
	static get DimensionalComparator() {
		return DimensionalComparator;
	}
	static hashCode(...args) {
		if (args.length === 1) {
			let [x] = args;
			var f = Double.doubleToLongBits(x);
			return Math.trunc(f ^ f >>> 32);
		} else return super.hashCode(...args);
	}
	setOrdinate(ordinateIndex, value) {
		switch (ordinateIndex) {
			case Coordinate.X:
				this.x = value;
				break;
			case Coordinate.Y:
				this.y = value;
				break;
			case Coordinate.Z:
				this.z = value;
				break;
			default:
				throw new IllegalArgumentException("Invalid ordinate index: " + ordinateIndex);
		}
	}
	equals2D(...args) {
		switch (args.length) {
			case 1:
				{
					let [other] = args;
					if (this.x !== other.x) {
						return false;
					}
					if (this.y !== other.y) {
						return false;
					}
					return true;
					break;
				}
			case 2:
				{
					let [c, tolerance] = args;
					if (!NumberUtil.equalsWithTolerance(this.x, c.x, tolerance)) {
						return false;
					}
					if (!NumberUtil.equalsWithTolerance(this.y, c.y, tolerance)) {
						return false;
					}
					return true;
					break;
				}
		}
	}
	getOrdinate(ordinateIndex) {
		switch (ordinateIndex) {
			case Coordinate.X:
				return this.x;
			case Coordinate.Y:
				return this.y;
			case Coordinate.Z:
				return this.z;
		}
		throw new IllegalArgumentException("Invalid ordinate index: " + ordinateIndex);
	}
	equals3D(other) {
		return this.x === other.x && this.y === other.y && (this.z === other.z || Double.isNaN(this.z) && Double.isNaN(other.z));
	}
	equals(other) {
		if (!(other instanceof Coordinate)) {
			return false;
		}
		return this.equals2D(other);
	}
	equalInZ(c, tolerance) {
		return NumberUtil.equalsWithTolerance(this.z, c.z, tolerance);
	}
	compareTo(o) {
		var other = o;
		if (this.x < other.x) return -1;
		if (this.x > other.x) return 1;
		if (this.y < other.y) return -1;
		if (this.y > other.y) return 1;
		return 0;
	}
	clone() {
		try {
			var coord = super.clone();
			return coord;
		} catch (e) {
			if (e instanceof CloneNotSupportedException) {
				Assert.shouldNeverReachHere("this shouldn't happen because this class is Cloneable");
				return null;
			} else throw e;
		} finally {}
	}
	copy() {
		return new Coordinate(this);
	}
	toString() {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	distance3D(c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		var dz = this.z - c.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
	distance(c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	hashCode() {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this.x);
		result = 37 * result + Coordinate.hashCode(this.y);
		return result;
	}
	setCoordinate(other) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
	}
	getClass() {
		return Coordinate;
	}
}
class DimensionalComparator {
	constructor(...args) {
		this.dimensionsToTest = 2;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, 2);
					})(...args);
				case 1:
					return ((...args) => {
						let [dimensionsToTest] = args;
						if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException("only 2 or 3 dimensions may be specified");
						this.dimensionsToTest = dimensionsToTest;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Comparator];
	}
	static compare(a, b) {
		if (a < b) return -1;
		if (a > b) return 1;
		if (Double.isNaN(a)) {
			if (Double.isNaN(b)) return 0;
			return -1;
		}
		if (Double.isNaN(b)) return 1;
		return 0;
	}
	compare(o1, o2) {
		var c1 = o1;
		var c2 = o2;
		var compX = DimensionalComparator.compare(c1.x, c2.x);
		if (compX !== 0) return compX;
		var compY = DimensionalComparator.compare(c1.y, c2.y);
		if (compY !== 0) return compY;
		if (this.dimensionsToTest <= 2) return 0;
		var compZ = DimensionalComparator.compare(c1.z, c2.z);
		return compZ;
	}
	getClass() {
		return DimensionalComparator;
	}
}
Coordinate.serialVersionUID = 6683108902428366910;
Coordinate.NULL_ORDINATE = Double.NaN;
Coordinate.X = 0;
Coordinate.Y = 1;
Coordinate.Z = 2;