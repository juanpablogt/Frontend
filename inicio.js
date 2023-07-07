
let pets = [
    {name: 'rex', type: 'dog', age: 10},
    {name: 'miau', type: 'cat', age: 2},
    {name: 'gulp', type: 'fish', age: 1},

]

pets.push({name: 'bolinha', type: 'dog', age: 5})

function nameOnly(x){
    return x.name
}

function onlyDog(x){
    return x.type == 'dog'
}

function onlybaby(x){
    return x.age < 5
}

let dogs = pets.filter(onlyDog)
let baby = pets.filter(onlybaby)

document.write(dogs.map(nameOnly)+ '<br>')
document.write(baby.map(nameOnly)+ '<br>')
