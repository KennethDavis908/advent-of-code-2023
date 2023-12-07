import run from "aocrunner"

const HandType = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1
}

type Hand = {
  cards: string,
  bid: number,
  handType: number
}

const findHandType = (cards: string): number => {
  //map the cards into an object
  const cardMap = new Map<string, number>()
  for (let i = 0; i < cards.length; i++) {
    cardMap.set(cards[i], (cardMap.get(cards[i]) || 0) + 1)
  }

  switch(cardMap.size) {
    case 1: 
      return HandType.FiveOfAKind
    case 2:
      //Either Four of a Kind or a Full House
      return [1,4].includes(cardMap.values().next().value)?
      HandType.FourOfAKind :
      HandType.FullHouse
    case 3:
      //Either Three of a Kind or Two Pair
      for (let value of cardMap.values()) {
        if (value === 3) {
          return HandType.ThreeOfAKind
        } else if (value === 2) {
          return HandType.TwoPair
        }
      }
    case 4:
      return HandType.OnePair 
    case 5:
      return HandType.HighCard
    default:
      return 0
  }
}

const parseInput = (rawInput: string): Hand[] => rawInput.split("\n").map(
  line => {
    const [cards, bid] = line.split(" ")
    return {
      cards: cards,
      bid: +bid,
      handType: findHandType(cards)
    }
  }
)

const convertCardValue = (card: string): number => {
  switch(card) {
    case "A": return 14
    case "K": return 13
    case "Q": return 12
    case "J": return 11
    case "T": return 10
    default: return +card
  }
}

const compareHands = (handA: Hand, handB: Hand): number => {
  if (handA.handType !== handB.handType) return handA.handType - handB.handType
  for (let i = 0; i < handA.cards.length; i++) {
    if (handA.cards[i] !== handB.cards[i]) return convertCardValue(handA.cards[i]) - convertCardValue(handB.cards[i])
  }
  return 0
}

const part1 = (rawInput: string) => {
  const input: Hand[] = parseInput(rawInput)

  return input.sort(compareHands).map(
    (hand: Hand, index: number): number => hand.bid * (index + 1)
  ).reduce(
    (sum: number, currentHand: number): number => sum + currentHand
  )
}

const findHandTypePart2 = (cards: string): number => {
  //map the cards into an object
  const cardMap = new Map<string, number>()
  for (let i = 0; i < cards.length; i++) {
    cardMap.set(cards[i], (cardMap.get(cards[i]) || 0) + 1)
  }

  if (cardMap.has("J")) {
    const jokers = cardMap.get("J") || 0
    cardMap.delete("J")
    let max = {key: "", value: 0}
    for (const [key, value] of cardMap.entries()) {
      if (value > max.value) max = {key, value}
    }
    
    cardMap.set(max.key, max.value + jokers)
  }

  switch(cardMap.size) {
    case 1: 
      return HandType.FiveOfAKind
    case 2:
      //Either Four of a Kind or a Full House
      return [1,4].includes(cardMap.values().next().value)?
      HandType.FourOfAKind :
      HandType.FullHouse
    case 3:
      //Either Three of a Kind or Two Pair
      for (let value of cardMap.values()) {
        if (value === 3) {
          return HandType.ThreeOfAKind
        } else if (value === 2) {
          return HandType.TwoPair
        }
      }
    case 4:
      return HandType.OnePair 
    case 5:
      return HandType.HighCard
    default:
      return 0
  }
}

const parseInputPart2 = (rawInput: string): Hand[] => rawInput.split("\n").map(
  line => {
    const [cards, bid] = line.split(" ")
    return {
      cards: cards,
      bid: +bid,
      handType: findHandTypePart2(cards)
    }
  }
)

const convertCardValuePart2 = (card: string): number => {
  switch(card) {
    case "A": return 14
    case "K": return 13
    case "Q": return 12
    case "J": return 1
    case "T": return 10
    default: return +card
  }
}

const compareHandsPart2 = (handA: Hand, handB: Hand): number => {
  if (handA.handType !== handB.handType) return handA.handType - handB.handType
  for (let i = 0; i < handA.cards.length; i++) {
    if (handA.cards[i] !== handB.cards[i]) return convertCardValuePart2(handA.cards[i]) - convertCardValuePart2(handB.cards[i])
  }
  return 0
}

const part2 = (rawInput: string) => {
  const input = parseInputPart2(rawInput)

  return input.sort(compareHandsPart2).map(
    (hand: Hand, index: number): number => hand.bid * (index + 1)
  ).reduce(
    (sum: number, currentHand: number): number => sum + currentHand
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
