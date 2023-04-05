import {levelDownStage, Stage} from './stages/Stage'
import {plus} from './time/Period'
import Heap from 'heap-js'

type CardType = {
    name: String;
    frontType: String;
    backType: String;
}

type Card = {
    id: String;
    cardType: CardType;
    front: String;
    back: String;
}

type CardWithStage = {
    card: Card;
    stage: Stage;
    stageStarted: Date;
}

type CardWithIncorrectCount = CardWithStage & {
    incorrectCount: number;
}

type UnshownDeck = {
    heap: Heap<CardWithStage>;
}

function showAt(card: CardWithStage): Date {
    return plus(card.stageStarted, card.stage.duration);
}

function readyToShow(at: Date, card: CardWithStage): boolean {
    return at > showAt(card);
}

export function newUnshownDeck(at: Date, cards: Array<CardWithStage>) {
    const heap = new Heap((a: CardWithStage, b: CardWithStage) =>
         showAt(a).getTime() - showAt(b).getTime());
    heap.init([]);

    cards.forEach((card) => {
        heap.push(card);
    });

    return {
        heap: heap,
    }
}

export function getCardsToShow(at: Date, deck: UnshownDeck): Array<CardWithStage> {
    const cards: Array<CardWithStage> = [];
    const newCardToShow = (card?: CardWithStage) => card && readyToShow(at, card);
    while (newCardToShow(deck.heap.peek())) {
        cards.push(deck.heap.pop()!);
    }
    return cards;
}

export function shuffle<T>(array: Array<T>) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

export function levelUp(at: Date, card: CardWithStage): CardWithStage | null {
    return card.stage.nextStage ? {
        ...card,
        stage: card.stage.nextStage,
        stageStarted: at,
    } : null;
}

export function levelDown(at: Date, card: CardWithIncorrectCount): CardWithStage {
    return {
        ...card,
        stage: levelDownStage(card.stage, card.incorrectCount),
        stageStarted: at,
    }
}