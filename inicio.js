let strawberryCount = 0;

while (strawberryCount <25){
    document.write("There are "+strawberryCount+" strawberries.<br>");
    strawberryCount++;
}

let myColors = ["red", "green", "blue", "yellow"];

myColors.forEach(function(color){
    document.write(color+"<br>");
}
);
let pets = [name="Apolo", type="dog", age=5, name="Luna", type="cat", age=2, name="Kiara", type="dog", age=3];

pets.push(name="Perro", type="cat", age=2);

pets.forEach(function(pet){
    document.write(pet+"<br>");
}
);

