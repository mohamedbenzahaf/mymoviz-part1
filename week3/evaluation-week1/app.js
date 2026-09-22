function objectsToStrings(data) {
    let result = []
   for (let i = 0; i < data.length; i++) {
        if (data[i].firstName !== '') {
            result.push(data[i].firstName)
        }
    }

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