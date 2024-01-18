function getPrototypelessObject() {
    return Object.create(null);
}

const PrototypelessObject = getPrototypelessObject();
console.log(PrototypelessObject);
console.log(PrototypelessObject.__proto__);

// для сравнения
const Obj = {};
console.log(Obj);
console.log(Obj.__proto__);