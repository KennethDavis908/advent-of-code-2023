import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(
  line => line.split("")
)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  //find the starting point
  let i = 0;
  let j = 0;
  outerloop: for ( ; i < input.length; i++) {
    for (j = 0; j < input[i].length; j += 1) {
      if (input[i][j] === 'S') break outerloop
    }
  }

  //find first step for the pipe
  let direction
  if (['|', '7', 'F'].includes(input[i-1][j] || '')) {i--; direction = 'North'}
  else if(['-', 'J', '7'].includes(input[i][j+1])) {j++; direction = 'East'}
  else {i++; direction = 'South'}

  let steps = 1

  //follow the full pipe to find steps
  while(input[i][j] !== 'S') {
    switch (direction) {
      case 'North': {
        switch(input[i][j]) {
          case '|': {
            i--
            break
          }
          case '7': {
            j--
            direction = 'West'
            break
          }
          case 'F': {
            j++
            direction = 'East'
            break
          }
        }
        break
      }
      case 'East': {
        switch(input[i][j]) {
          case '-': {
            j++
            break
          }
          case 'J': {
            i--
            direction = 'North'
            break
          }
          case '7': {
            i++
            direction = 'South'
            break
          }
        }
        break
      }
      case 'South': {
        switch(input[i][j]) {
          case '|': {
            i++
            break
          }
          case 'J': {
            j--
            direction = 'West'
            break
          }
          case 'L': {
            j++
            direction = 'East'
            break
          }
        }
        break
      }
      case 'West': {
        switch(input[i][j]) {
          case '-': {
            j--
            break
          }
          case 'L': {
            i--
            direction = 'North'
            break
          }
          case 'F': {
            i++
            direction = 'South'
            break
          }
        }
        break
      }
    }
    steps++
  }

  return steps/2
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
