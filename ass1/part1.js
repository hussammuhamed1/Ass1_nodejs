// q1
/*
let x = "123"
x=Number(x)
x+=7
console.log(x)
*/

//q2
/*
let num = 0
if (!num){
    console.log("Invalid");
}

*/

//q3
/*
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue;
    }
    console.log(i);
}
*/

//q4
/*
let arr = [1, 2, 3, 4, 5]
let newArr = arr.filter(function(element) {
    return element % 2 == 0; 
});
console.log(newArr);
*/

//q5
/*
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let mergedArr = [   ...arr1, ...arr2]
console.log(mergedArr)
*/

//q6
/*
let number = 2
switch (number) {
    case 1:
        console.log("Sunday");
        
        break;
    case 2:
        console.log("Monday");  
        break;
    case 3:
        console.log("Tuesday");
        break;
    case 4:
        console.log("Wednesday");
        break;
    case 5:
        console.log("Thursday");
        break;
    case 6:
        console.log("Friday");
        break;
    case 7:
        console.log("Saturday");
        break;               
    default:
        console.log("invalid input");
        break;
}
        */

//q7
/*
let arr = ["a", "ab", "abc", "abcd"]

let newArr = arr.map(function(element) {
    return element.length;
});

console.log(newArr);
*/

//q8
/*
let number = 15

if (number % 3 === 0 && number % 5 === 0) {
    console.log("Divisible by both");
}
    */

//q9
/*
let num = 5

let square = (n) => n * n

console.log(square(num))
*/

//q10
/*
let person= {

    name: "John",
    age: 25,
    
}
function print (obj){
    console.log(`Name: ${obj.name}, Age: ${obj.age}`);
}
print (person)
*/

//q11
/*
function sum (x,y,z,m,n){
    return x+y+z+m+n
}
console.log(sum(1,2,3,4,5))
*/

//q12
/*
const waitForSuccess = () =>
  new Promise(res => setTimeout(() => res("Success"), 3000));
waitForSuccess().then(message => console.log(message));
*/

//q13
/*
let arr = [1,3,7,2,4]
let max = arr[0]
for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i]
    }
}
console.log(max)
*/

//q14
/*
let person = {
  name: "John",
  age: 25,
};

function getKeys(obj) {
  return Object.keys(obj);
}

console.log(getKeys(person));
*/
//q15
/*
let str = "The quick brown fox"
str = str.split(" ")

console.log(str)
*/
