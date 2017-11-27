let inputArr;
let numStudents;
let numTopics;
let currentKnownTopics = 0;
let maxKnownTopics = 0;
let numTopicsHash = {};

inputArr = [
  "4 5",
  "10101",
  "11100",
  "11010",
  "00101"
];
numStudents = inputArr[0].split(" ")[0];
numTopics = inputArr[0].split(" ")[1];

for (let i = 1; i <= numStudents - 1; i++) {
  for (let j = i + 1; j <= numStudents; j++) {
    currentKnownTopics = 0;
    for (let k = 0; k < numTopics; k++) {
      if (inputArr[i][k] === "1" || inputArr[j][k] === "1") {
        currentKnownTopics++;
      }
    }
    maxKnownTopics = (currentKnownTopics > maxKnownTopics ? currentKnownTopics : maxKnownTopics);
    if (typeof numTopicsHash[currentKnownTopics] === 'undefined') {
      numTopicsHash[currentKnownTopics] = 1;
    } else {
      numTopicsHash[currentKnownTopics]++;
    }
  }
}
console.log("numtopicshash: " + JSON.stringify(numTopicsHash));
console.log("" + maxKnownTopics + "\n" + numTopicsHash[maxKnownTopics]);
