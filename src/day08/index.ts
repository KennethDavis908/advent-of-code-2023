import run from "aocrunner"

type Fork = {
  left: string,
  right: string
}

type Directions = {
  path: string,
  map: Map<string, Fork>
  starting: string[]
}

const generateNodes = (nodeLines: string[]): [Map<string, Fork>, string[]] => {
  //convert strings to map
  const map = new Map()
  const starting: string[] = []
  nodeLines.forEach(
    (node: string): void => {
      const split = node.split(" ")
      map.set(split[0], {left: split[2].slice(1, 4), right: split[3].slice(0, 3)})
      if (split[0][2] === "A") starting.push(split[0])
    }
  )

  return [map, starting]
}

const parseInput = (rawInput: string): Directions => {
  const lines = rawInput.split("\n")
  const nodes = generateNodes(lines.slice(2))
  return {
    path: lines[0],
    map: nodes[0],
    starting: nodes[1]
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let currentPosition: string = "AAA"
  let steps = 0
  let i = 0

  while (currentPosition !== "ZZZ") {
    switch(input.path[i]) {
      case "L": 
        currentPosition = input.map.get(currentPosition)?.left as string
        break
      case "R":
        currentPosition = input.map.get(currentPosition)?.right as string
        break
    }

    steps++
    i++
    if (i === input.path.length) i = 0
  }

  return steps
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let currentPositions: string[] = input.starting
  let steps = 0
  let i = 0

  while (currentPositions.filter((position) => position[2] !== "Z").length) {
    console.log(currentPositions)
    currentPositions = currentPositions.map(
      (position) => {
        switch(input.path[i]) {
          case "L": 
            return input.map.get(position)?.left as string
          case "R":
            return input.map.get(position)?.right as string
        }
        return ""
      }
    )

    steps++
    i++
    if (i === input.path.length) i = 0
  }

  return steps
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
