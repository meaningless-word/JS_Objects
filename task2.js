/*
Написать функцию, которая принимает в качестве аргументов строку и объект, 
а затем проверяет есть ли у переданного объекта свойство с данным именем. 
Функция должна возвращать true или false.
*/

function isPropertyInObject(prop, obj) {
    return prop in obj;
}

const student = {
    course: "FPW",
    group: 130
}

const person = Object.create(student); 
person.firstName = 'Иван';
person.lastName = 'Иванов';
person.middleName = 'Иванович';

console.log(isPropertyInObject('group', student));
console.log(isPropertyInObject('grp', student));