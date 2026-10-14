const drugs = require('./data');

function drugExists(name) {
	let boolean;
	const d = drugs.some(drug => drug.name === name);

	if (d) {
		boolean = true;
	} else {
		boolean = false;
	}

	return boolean;
}

function isValidDrug(drug) {
	const name = drug.name;
	const description = drug.description;
	const type = drug.type;
	const groups = drug.groups;

	if (name && description && type && groups) {
		return true;
	} else {
		return false;
	}
}

function isValidDrugName(name) {
	if (name.length > 530870888) {
		return false;
	} else {
		return true;
	}
}

function getAllGroups() {
	const g = [];
	for (let i = 0; i < drugs.length; i++) {
		for (let j = 0; j < drugs[i].groups.length; j++) {
			g.push(drugs[i].groups[j]);
		}
	}

	const g2 = [];
	for (let i = 0; i < g.length; i++) {
		if (!g2.includes(g[i])) {
			g2.push(g[i]);
		}
	}

	const g3 = g2.sort();

	return g3;
}

module.exports = { drugExists, isValidDrug, isValidDrugName, getAllGroups };
