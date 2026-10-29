// Insert your code here
const drugs = require('./data');

function getDrugDescriptionByName(name) {
    const drug = drugs.find(drug => drug.name === name);
    return drug.description;
}
function getDrugTypeByName(name) {
    const drug = drugs.find(drug => drug.name === name);
    return drug.type;
}
function getDrugNamesByGroup(group) {
    return drugs
        .filter(drug => drug.groups.includes(group))
        .map(drug => drug.name)
        .sort();
}
module.exports = {
    getDrugDescriptionByName,
    getDrugTypeByName,
    getDrugNamesByGroup
};
