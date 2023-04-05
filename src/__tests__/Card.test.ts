import { describe, test, expect } from '@jest/globals'
import { plus, ofDays, ofHours, ofWeeks } from '../time/Period'
import { build, indexedByGroup } from '../stages/Stage';
import { getCardsToShow, newUnshownDeck, shuffle } from '../Card'

describe('unshown deck', () => {
    test('getting cards to show', () => {
        const currentTime = new Date('March 15, 2023 03:00:00 GMT');
        const firstStage = build();
        const stages = indexedByGroup(firstStage);

        const cardType = {
            name: "italian",
            frontType: "",
            backType: "",
        };

        const cardsToBeShown = [
            {
                card: {
                    id: "1",
                    cardType,
                    front: "la domanda",
                    back: "question",
                },
                stage: stages['Apprentice'][1],
                stageStarted: plus(currentTime, ofHours(-9)),
            },
            {
                card: {
                    id: "2",
                    cardType,
                    front: "azzurro",
                    back: "blue",
                },
                stage: stages['Master'][0],
                stageStarted: plus(currentTime, ofWeeks(-5)),
            },
        ];
        const cardsToNotBeShown = [
            {
                card: {
                    id: "3",
                    cardType,
                    front: "la risposta",
                    back: "answer",
                },
                stage: stages['Apprentice'][1],
                stageStarted: plus(currentTime, ofHours(-7)),
            },
            {
                card: {
                    id: "4",
                    cardType,
                    front: "il panino",
                    back: "sandwich",
                },
                stage: stages['Guru'][1],
                stageStarted: plus(currentTime, ofDays(4)),
            },
        ];

        const allCards = [...cardsToBeShown, ...cardsToNotBeShown];
        shuffle(allCards);

        const deck = newUnshownDeck(currentTime, allCards);
        const cardsToShow = getCardsToShow(currentTime, deck);
        expect(new Set(cardsToShow)).toEqual(new Set(cardsToBeShown));
    })
})