var faker = require('faker');

class Gladiator {
  constructor(health, power, speed, name) {
    this.health = health
    this.power = power
    this.speed = speed
    this.name = name
    this.initialHealth = health
    this.initialSpeed = speed
  }
}

const start = () => {

  const arr = []
  const count = 5

  const createNewGladiator = () => {
    let health = Math.floor(Math.random() * 21) + 80
    let power = ((Math.random() * 3) + 2).toFixed(1)
    let speed = ((Math.random() * 4) + 1).toFixed(3)
    let name = faker.name.findName();
    arr.push(new Gladiator(health, power, speed, name))
  }

  for (let item of Array(count)) {
    createNewGladiator()
  }

  const attack = (attacker_id) => {
    let defender_id
    do {
      defender_id = Math.floor(Math.random() * count);
    } while (typeof arr[defender_id] === 'undefined' || defender_id == attacker_id);

    console.log(`${arr[attacker_id]['name']} x ${arr[attacker_id]['health'].toFixed(1)}\
    hits ${arr[defender_id]['name']} x  ${arr[defender_id]['health'].toFixed(1)} with power ${arr[attacker_id]['power']}`)
    // decrease opponents health
    arr[defender_id]["health"] -= arr[attacker_id]['power']
    // decrease attack speed
    arr[defender_id].speed = arr[defender_id].initialSpeed * (arr[defender_id].health / arr[defender_id].initialHealth)
    if (arr[defender_id]["health"] <= 0) {
      getCaesarDecision(defender_id)
    } else if (arr[defender_id].health >= 15 && arr[defender_id].health <= 30) {
      arr[defender_id].speed *= 3
    }
  }
  setTimeoutFunction = (i) => {
    if (typeof arr[i] !== "undefined") {
      attack(i)
      if (typeof arr[i] !== "undefined") {
        setTimeout(setTimeoutFunction.bind(null, i), arr[i].speed * 1000);
      }
    }
  }

  for (let i in arr) {
    setTimeoutFunction(i)
  }

  const getCaesarDecision = (defender_id) => {
    if (Math.random() >= 0.5) {
      leaveArena(defender_id)
      checkGameOver()
    } else {
      recover(defender_id)
    }
  }
  const recover = (defender_id) => {
    console.log(`Caesar showed to ${arr[defender_id]['name']}`)
    arr[defender_id]['health'] += 50
  }
  const leaveArena = (defender_id) => {
    console.log(`${arr[defender_id]['name']} is dying`)
    arr.splice(defender_id, 1);
  }
  const checkGameOver = () => {
    if (arr.length === 1) {
      console.log(`${arr[0]['name']} won the battle with health ${arr[0]['health'].toFixed(1)}`)
      process.exit()
    }
  }
}

start()
