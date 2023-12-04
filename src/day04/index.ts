import run from "aocrunner"

type Card = {
  answers: number[]
  numbers: number[]
}

const parseInput = (rawInput: string): Card[] => rawInput.split("\n").map(
    (line) => {
      let card: Card = {answers: [], numbers: []}
      line.split(":")[1].split("|").forEach(
        (numberArr: string, index: number) => {
          if (index === 0) {
            card.answers = numberArr.split(" ").filter(i => i !== "").map(num => +num)
          } else {
            card.numbers = numberArr.split(" ").filter(i => i !== "").map(num => +num)
          }
        } 
      )
      return card
    }
  )

const part1 = (rawInput: string) => {
  const input: Card[] = parseInput(rawInput)
  
  return input.map(
    (card: Card): number => {
      let points: number = 0
      card.numbers.forEach(
        (num: number) => {
          if (card.answers.includes(num)) points === 0 ? points = 1 : points *= 2
        }
      )
      return points
    }
  ).reduce((sum: number, currentNum: number) => sum += currentNum, 0)
}

const part2 = (rawInput: string) => {
  const input: Card[] = parseInput(rawInput)

  let cardCount = input.map(() => 1)

  input.forEach(
    (card: Card, index: number) => {
      //calculate number of wins
      let wins: number = 0
      card.numbers.forEach(
        (num: number) => {
          if (card.answers.includes(num)) wins += 1
        }
      )

      //add card copies to following cards
      for (let i = 1; i <= wins; i++) {
        cardCount[index + i] += cardCount[index]
      }
    }
  )

  return cardCount.reduce((sum, num) => sum += num, 0)
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
