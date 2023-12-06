import run from "aocrunner"

type conversionMap = {
  destination: number,
  source: number,
  range: number
}

type Input = {
  seeds: number[],
  conversionMaps: conversionMap[][]
}

const parseInput = (rawInput: string): Input => {

  const input: Input = {seeds: [], conversionMaps: []}
  const lines = rawInput.split("\n")

  const seedsStrings = lines.shift()?.split(" ")
  seedsStrings?.shift()
  input.seeds = seedsStrings?.map( seed => +seed ) || []

  let conversionMapPointer = 0
  for (let i = 2; i < lines.length; i++) {
    if (!lines[i]) {
      i += 2
      conversionMapPointer++
    }
    
    let map = lines[i].split(" ").map(conversion => +conversion)
    input.conversionMaps[conversionMapPointer]?
    input.conversionMaps[conversionMapPointer].push(
      {
        destination: map[0],
        source: map[1],
        range: map[2]
      }
    )
    :
    input.conversionMaps[conversionMapPointer] = [
      {
        destination: map[0],
        source: map[1],
        range: map[2]
      }
    ]
  }

  return input
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let res: number = Infinity

  input.seeds.forEach(
    seed => {
      let currentId = seed
      input.conversionMaps.forEach(
        conversionMap => {
          let foundId = false
          conversionMap.forEach(
            conversion => {
              if (!foundId && conversion.source <= currentId && currentId < conversion.source + conversion.range) {
                foundId = true
                currentId = conversion.destination + currentId - conversion.source
              }
            }
          )
        }
      )
      if (currentId < res) res = currentId
    }
  )

  return res
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let res: number = Infinity

  let seeds: number[] = [] 
  let ranges: number[] = []
  input.seeds.forEach((seed, index) => {
    if(index % 2 === 0) seeds.push(seed)
    else ranges.push(seed)
  })

  for (let i = 0; i < seeds.length; i++) {
    for (let j = 0; j < ranges[i]; j++) {
      let currentId = seeds[i] + j
      input.conversionMaps.forEach(
        conversionMap => {
          for (let conversion of conversionMap) {
            if (conversion.source <= currentId && currentId < conversion.source + conversion.range) {
              currentId = conversion.destination + currentId - conversion.source
              break
            }
          }
        }
      )
      if (currentId < res) res = currentId
    }
  }

  return res
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
