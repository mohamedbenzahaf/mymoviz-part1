
const drugs = require('./data');

function drugExists(name) {
	return drugs.some(drug => drug.name === name);
}

function isValidDrug(drug) {
	return Boolean(drug.name && drug.description && drug.type && drug.groups);
}

function isValidDrugName(name) {
	return name.length <= 530870888;
}

function getAllGroups() {
	return [...new Set(drugs.flatMap(drug => drug.groups))].sort();
}

module.exports = { drugExists, isValidDrug, isValidDrugName, getAllGroups };

