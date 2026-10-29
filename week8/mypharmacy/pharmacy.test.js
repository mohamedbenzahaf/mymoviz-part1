const { getDrugDescriptionByName, getDrugTypeByName, getDrugNamesByGroup } = require('./app');

it('Get drug description by name - Morphin', () => {
	const drugDescription = getDrugDescriptionByName('Morphin');

	expect(drugDescription).toBe('Morphine is an opioid agonist used for the relief of moderate to severe acute and chronic pain.');
});

it('Get drug type by name - Trastuzumab', () => {
	const drugType = getDrugTypeByName('Trastuzumab');

	expect(drugType).toBe('Biotech');
});

it('Get drug names by group - Investigational', () => {
	const drugs = getDrugNamesByGroup('Investigational');

	expect(drugs).toEqual(['Morphin', 'Trastuzumab']);
});
