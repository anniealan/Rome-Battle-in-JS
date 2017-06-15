(function(){
  const Person = class {
    constructor(name, age){
    	this.name = name
      this.age = age
      this.getOlder()
    }
    getOlder(){
      setInterval(()=>{
        ++this.age
      }, 1000)
    }

  }
  let personA = new Person("A", 18)
  let personB = new Person("B", 21)
  let personC = new Person("C", 22)
  let personD = new Person("D", 30)
  let arr = [personA, personB, personC, personD]

  const checkAge = (arr)=>{
    setInterval(()=>{
        console.log(arr)
        for(index in arr){
          if(arr[index].age >= 40){
              arr.splice(index, 1);
          }
        }
    }, 1000)
  }

  const addRandomPerson = (arr) => {
    setInterval(()=>{
        let randomName = Math.random().toString(30).substr(2, 4)
        let randomAge = Math.floor(Math.random() * 50) + 1
        let randomPerson = new Person(randomName, randomAge)
        arr.push(randomPerson)
    }, 2000)
  }

  checkAge(arr)
  addRandomPerson(arr)

})()
