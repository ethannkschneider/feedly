function getPotentialDomains(lines) {
  const regexp = new RegExp("https?://(www.|ww2.)?([a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+)/");
  const domains = [];
  lines.forEach( (line) => {

  });
}


// IEEEE

process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function (chunk) {
    input += chunk;
});
let inputArr;
let numStudents;
let numTopics;
let currentKnownTopics = 0;
let maxKnownTopics = 0;
let numTopicsHash = {};

process.stdin.on("end", function () {
    // now we can read/parse input
    inputArr = input.split("\n");
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

    console.log(maxKnownTopics + "\n" + numTopicsHash[maxKnownTopics]);
});
