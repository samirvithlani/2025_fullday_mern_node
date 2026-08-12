// console.log("Hello")
// var x = 100
// console.log("value of x = ",x)

console.log("app.js")
const user = require("./users")
const employees = require("./employees")
console.log("user = ",user)
console.log(user.userName)
console.log(user.userAge)

console.log("employees =",employees)
var greet = employees.setUser(12,"raj")
console.log(greet)