function objectsToStrings(data) {
    let result = []
    // Insert your code here


    return result
}




// Don't edit the code below this line
const contactList = [
    { firstName: 'Jane', lastName: 'Doe' },
    { firstName: '', lastName: 'Doe' },
    { firstName: 'Mike', lastName: 'Awesome' },
    { firstName: '', lastName: 'Doe' },
    { firstName: 'John', lastName: '' }
]

console.log(objectsToStrings(contactList))

// Expected : ['Jane', 'Mike', 'John']

module.exports = { objectsToStrings }