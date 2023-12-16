import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n').map(
  line => line.split(' ').map(
    num => +num
  )
)

const nextInPattern = (arr: number[]): number => {
  if (arr.every(num => num === arr[0])) return arr[0]
  let differenceArr = []
  for (let i = 1; i < arr.length; i++) {
    differenceArr.push(arr[i] - arr[i - 1])
  }

  return arr[arr.length - 1] + nextInPattern(differenceArr)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.map(
    line => nextInPattern(line)
  ).reduce(
    (sum: number, num: number) => sum + num
  )
}

const previousInPattern = (arr: number[]): number => {
  if (arr.every(num => num === arr[0])) return arr[0]
  let differenceArr = []
  for (let i = 1; i < arr.length; i++) {
    differenceArr.push(arr[i] - arr[i - 1])
  }

  return arr[0] - previousInPattern(differenceArr)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.map(
    line => previousInPattern(line)
  ).reduce(
    (sum: number, num: number) => sum + num
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
