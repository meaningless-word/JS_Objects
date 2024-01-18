class Device {
    constructor(name, manufacturer, model, power) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
        this.power = power;
        this.voltage = 220;
        this.isSwitchedOn = false;
    }

    switchOn() {
        this.isSwitchedOn = true;
    }

    switchOff() {
        this.isSwitchedOn = false;
    }

    powerСonsumption() {
        return this.isSwitchedOn ? this.power : 0;
    }

    showState() {
        if (this.powerСonsumption() == 0) {
            console.log(`${this.name} выключен`);
          } else {
            console.log(`${this.name} включен и потребляет ${this.powerСonsumption()} Вт`);
          }
    }
}

class RechargeableDevice extends Device {
    constructor(name, manufacturer, model, power, batteryCapacity) {
        super(name, manufacturer, model, power);
        this.batteryCapacity = batteryCapacity; //ёмкость батареи
        this.isCharging = false;
        this.batteryLevel = Math.random() * 100;
    }

    plug() {
        this.isSwitchedOn = false;
        this.isCharging = true;
    }

    unplug() {
        this.isCharging = false;
        this.batteryLevel += Math.floor(Math.random() * (100 - this.batteryLevel)); //предположим, что при отсоединении устройства батарея немного подзарядилась
    }

    powerСonsumption() {
        return this.isCharging ? this.power : 0; //потребление тлько во время зарядки
    }

    switchOn() {
        this.unplug();
        this.isSwitchedOn = this.batteryLevel > 20; //не включится, если батарея заряжена менее, чем на 20%
        this.isCharging = !this.isSwitchedOn;       
    }

    switchOff() {
        //заряд батареи уменьшается во время выключения на случайную величину, эмулируя сеанс работы прибора 
        this.batteryLevel -= Math.random() * this.batteryLevel; 
        //автоматически встаёт на зарядку
        this.plug();       
    }

    showState() {
        if (this.isCharging) {
            console.log(`${this.name} заряжается, блок питания потребляет ${this.powerСonsumption()} Вт, уровень заряда ${Math.floor(this.batteryLevel)}%`);
        } else {
            if (this.isSwitchedOn) {
                console.log(`${this.name} работает, уровень заряда снижается`);
            } else {
                console.log(`${this.name} в режиме ожидания, уровень заряда ${Math.floor(this.batteryLevel)}%`);
            }
        }       
    }
}

// функция симуляции присутствия дома потребителя - включены случайно выбранные приборы
function meHere() {
    let j = Math.floor(Math.random() * array.length);
    for (let i = 0; i <= j;  i++) {
        array[Math.floor(Math.random()*array.length)].switchOn();
    }
    console.log('я дома!');
}
  
// функция симуляции отсутствия потребителя - все приборы выключаем
function meAway() {
    array.forEach(item => item.switchOff());
    if (Math.random() > 0.5) fridge.switchOn(); //но может самопроизвольно включиться холодильник
    if (Math.random() >= 0.5) roboVC.unplug(); //либо робосос зарядился и отключился от питания
    console.log('я ушёл!');
    }

// функция подсчета потребления энергии
function powerСonsumption(arr) {
    return arr.reduce((sumPower, item) => sumPower + item.powerСonsumption(), 0);
}

// вывод включенных устройств
function powerReport() {
    const consumers = array.filter(item => item.isSwitchedOn)
        .concat(array.filter(item => item.isCharging));
    consumers.forEach(item => item.showState());
    console.log(`суммарное потребление ${powerСonsumption(consumers)} Вт`);
}

// опишем все устройства
const fridge = new Device("холодильник", "Haier", "CEF535AWG", 360);
const microvawe = new Device("микроволновая печь", "Gorenje", "MO17E1BH", 1100);
const tv = new Device("телевизор", "LG", "55UR91006LA", 165);
const roboVC = new RechargeableDevice("робосос", "Dreame", "F9 Pro", 65, 3500);
const vacuumCleaner = new Device("пылесос", "Samsung", "VCC4520S36", 1600);

const array = [fridge, microvawe, tv, roboVC, vacuumCleaner];
  
meHere();
powerReport();

meAway();
powerReport();