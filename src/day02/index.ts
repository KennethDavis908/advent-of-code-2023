import run from "aocrunner"

const parseInput = (rawInput: string) => {
  let temp = rawInput.split('\n')
  return temp.map(
    (value: string, index: number) => {
      let split = value.split(" ")
      let red = 0
      let blue = 0
      let green = 0
      for (let i = 2; i < split.length; i += 2) {
        switch(split[i+1]) {
          case "red,":
          case "red;":
          case "red":
            if(red < +split[i]) red = +split[i]
            break
          case "blue,":
          case "blue;":
          case "blue":
            if(blue < +split[i]) blue = +split[i]
            break
          case "green,":
          case "green;":
          case "green":
            if(green < +split[i]) green = +split[i]
            break
        }
      }
      return [red, blue, green]
    }
  )
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let res = 0
  input.forEach(
    (value: number[], index: number) => {
      if (value[0] <= 12 && value[1] <= 14 && value[2] <= 13) res += index + 1
    }
  )
  return res
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.map(
    (value: number[]) => value[0] * value[1] * value[2]
  ).reduce(
    (previousValue: number, currentValue: number) => previousValue + currentValue
  )
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
