import Collections from '../../../../java/util/Collections';
import DirectedEdge from './DirectedEdge';
import ArrayList from '../../../../java/util/ArrayList';
import Edge from './Edge';
export default class DirectedEdgeStar {
	constructor(...args) {
		this.outEdges = new ArrayList();
		this.sorted = false;
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	getNextEdge(dirEdge) {
		var i = this.getIndex(dirEdge);
		return this.outEdges.get(this.getIndex(i + 1));
	}
	getCoordinate() {
		var it = this.iterator();
		if (!it.hasNext()) return null;
		var e = it.next();
		return e.getCoordinate();
	}
	iterator() {
		this.sortEdges();
		return this.outEdges.iterator();
	}
	sortEdges() {
		if (!this.sorted) {
			Collections.sort(this.outEdges);
			this.sorted = true;
		}
	}
	remove(de) {
		this.outEdges.remove(de);
	}
	getEdges() {
		this.sortEdges();
		return this.outEdges;
	}
	getNextCWEdge(dirEdge) {
		var i = this.getIndex(dirEdge);
		return this.outEdges.get(this.getIndex(i - 1));
	}
	getIndex(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Edge) {
					let [edge] = args;
					this.sortEdges();
					for (var i = 0; i < this.outEdges.size(); i++) {
						var de = this.outEdges.get(i);
						if (de.getEdge() === edge) return i;
					}
					return -1;
				} else if (args[0] instanceof DirectedEdge) {
					let [dirEdge] = args;
					this.sortEdges();
					for (var i = 0; i < this.outEdges.size(); i++) {
						var de = this.outEdges.get(i);
						if (de === dirEdge) return i;
					}
					return -1;
				} else if (Number.isInteger(args[0])) {
					let [i] = args;
					var modi = i % this.outEdges.size();
					if (modi < 0) modi += this.outEdges.size();
					return modi;
				}
				break;
		}
	}
	add(de) {
		this.outEdges.add(de);
		this.sorted = false;
	}
	getDegree() {
		return this.outEdges.size();
	}
	getClass() {
		return DirectedEdgeStar;
	}
}
