import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map((line: string) => line.split(""))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let sum: number = 0;
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[i].length; j++) {
      if(+input[i][j]) {
        let valid = false
        let number = ""

        //check previous column for special characters
        if(input[i-1] && input[i-1][j-1] && !+input[i-1][j-1] && input[i-1][j-1] !== "." && input[i-1][j] !== "0") valid = true
        if(input[i][j-1] && !+input[i][j-1] && input[i][j-1] !== "." && input[i][j] !== "0") valid = true
        if(input[i+1] && input[i+1][j-1] && !+input[i+1][j-1] && input[i+1][j-1] !== "." && input[i+1][j] !== "0") valid = true

        //check all columns with numbers and calculate the number itself
        while(+input[i][j] || input[i][j] === "0") {
          number += input[i][j]

          if(input[i-1] && input[i-1][j] && !+input[i-1][j] && input[i-1][j] !== "." && input[i-1][j] !== "0") valid = true
          if(input[i+1] && input[i+1][j] && !+input[i+1][j] && input[i+1][j] !== "." && input[i+1][j] !== "0") valid = true

          j++
        }
        
        //check final comumn for special characters
        if(input[i-1] && input[i-1][j] && !+input[i-1][j] && input[i-1][j] !== "." && input[i-1][j] !== "0") valid = true
        if(input[i][j] && !+input[i][j] && input[i][j] !== "." && input[i][j] !== "0") valid = true
        if(input[i+1] && input[i+1][j] && !+input[i+1][j] && input[i+1][j] !== "." && input[i+1][j] !== "0") valid = true

        //add number to sum if it's an engine part
        if(valid) sum += +number
      }
    }
  }
  return sum
}

//given an index of any digit in a number in the matrix return the number
let calculateNumber = (input: string[][], i: number, j: number): number => {
  while(+input[i][j-1] || input[i][j-1] === "0") j--
  let number: string = ""
  while(+input[i][j] || input[i][j] === "0") {
    number += input[i][j]
    j++
  }
  return +number
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let sum = 0

  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input.length; j++) {
      if (input[i][j] === "*") {
        //check if two numbers are adjacent and calculate the product
        let adjacentNumbers = 0
        let product = 1
        //check row above
        if (input[i-1]) {
          if (+input[i-1][j-1] || input[i-1][j-1] === "0") {
            adjacentNumbers += 1
            product *= calculateNumber(input, i-1, j-1)
          } else if (+input[i-1][j] || input[i-1][j] === "0") {
            adjacentNumbers += 1
            product *= calculateNumber(input, i-1, j)
          } 
          if ((+input[i-1][j+1] || input[i-1][j+1] === "0") && !(+input[i-1][j] || input[i-1][j] === "0")) {
            adjacentNumbers += 1
            product *= calculateNumber(input, i-1, j+1)
          }
        }
        //check current row
        if (+input[i][j-1] || input[i][j-1] === "0") {
          adjacentNumbers += 1
          product *= calculateNumber(input, i, j-1)
        } 
        if (+input[i][j+1] || input[i][j+1] === "0") {
          adjacentNumbers += 1
          product *= calculateNumber(input, i, j+1)
        }
        //check row below
        if (input[i+1]) {
          if (+input[i+1][j-1] || input[i+1][j-1] === "0") {
            adjacentNumbers += 1
            product *= calculateNumber(input, i+1, j-1)
          } else if (+input[i+1][j] || input[i+1][j] === "0") {
            adjacentNumbers += 1
            product *= calculateNumber(input, i+1, j)
          } 
          if ((+input[i+1][j+1] || input[i+1][j+1] === "0") && !(+input[i+1][j] || input[i+1][j] === "0")) {
            adjacentNumbers += 1
            product *= calculateNumber(input, i+1, j+1)
          }
        }
        //final check and add to sum if valid
        if(adjacentNumbers === 2) sum += product
      }
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
