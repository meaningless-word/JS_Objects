/*
Написать, функцию, которая принимает в качестве аргумента объект 
и выводит в консоль все ключи и значения только собственных свойств.
Данная функция не должна возвращать значение.
*/

function getOwnProps(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            console.log(`свойство: ${prop}, значение: ${obj[prop]}`);
        }
    }
}

const student = {
    course: "FPW",
    group: 130
}

const person = Object.create(student); 
person.firstName = 'Иван';
person.lastName = 'Иванов';
person.middleName = 'Иванович';

getOwnProps(person);