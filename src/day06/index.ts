import run from "aocrunner"

type Race = {
  time: number,
  distance: number
}

const parseInput = (rawInput: string): Race[] => {

  const times: number[] = []
  const distances: number[] = []

  rawInput.split("\n").forEach(
    (line, index) => {
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        if (+line[charIndex] || line[charIndex] === "0") {
          let number = line[charIndex]
          while(+line[charIndex + 1] || line[charIndex + 1] === "0") {
            number += line[charIndex + 1]
            charIndex++
          }
          !index ? times.push(+number) : distances.push(+number)
        }
      }
    }
  )

  return times.map((time, index): Race => {
    return {
      time: time,
      distance: distances[index]
    }
  })
}

const parseInputPart2 = (rawInput: string): Race => {

  let race: number[] = rawInput.split("\n").map(
    (line, index): number => {
      let number = ""
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        if (+line[charIndex] || line[charIndex] === "0") {
          number += line[charIndex]
        }
      }
      return +number
    }
  )

  return {
    time: race[0],
    distance: race[1]
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.map(
    (race): number => {
      let winners = 0
      for (let i = 0; i < race.time; i++) {
        if (i * (race.time - i) > race.distance) {
          winners = race.time - 2 * i + 1 
          break
        }
      }
      return winners
    }
  ).reduce((product, current): number => product * current)
}

const part2 = (rawInput: string) => {
  const input: Race = parseInputPart2(rawInput)

  let winners = 0

  for (let i = 0; i < input.time; i++) {
    if (i * (input.time - i) > input.distance) {
      winners = input.time - 2 * i + 1 
      break
    }
  }

  return winners
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
