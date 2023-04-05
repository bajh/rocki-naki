import { test, describe, expect } from '@jest/globals'
import {Stage, build, levelDownStage} from '../../stages/Stage'

describe('stage building', () => {
    test('builds the stage configuration correctly', () => {
        let stage: Stage = build();

        // Walk up the stages
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.hours).toBe(4)
        
        stage = stage.nextStage!;
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.hours).toBe(8)

        stage = stage.nextStage!;
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.days).toBe(1)

        stage = stage.nextStage!;
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.days).toBe(2)

        stage = stage.nextStage!;
        expect(stage.group).toBe('Guru')
        expect(stage.duration.weeks).toBe(1)

        stage = stage.nextStage!;
        expect(stage.group).toBe('Guru')
        expect(stage.duration.weeks).toBe(2)

        stage = stage.nextStage!;
        expect(stage.group).toBe('Master')
        expect(stage.duration.months).toBe(1)

        stage = stage.nextStage!;
        expect(stage.group).toBe('Enlightened')
        expect(stage.duration.months).toBe(4)
        expect(stage.nextStage).toBe(undefined);

        // Walk back down

        stage = stage.previousStage!;
        expect(stage.group).toBe('Master')
        expect(stage.duration.months).toBe(1)

        stage = stage.previousStage!;
        expect(stage.group).toBe('Guru')
        expect(stage.duration.weeks).toBe(2)

        stage = stage.previousStage!;
        expect(stage.group).toBe('Guru')
        expect(stage.duration.weeks).toBe(1)

        stage = stage.previousStage!;
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.days).toBe(2)

        stage = stage.previousStage!;
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.days).toBe(1)

        stage = stage.previousStage!;
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.hours).toBe(8)

        stage = stage.previousStage!;
        expect(stage.group).toBe('Apprentice')
        expect(stage.duration.hours).toBe(4)
        expect(stage.previousStage).toBe(undefined);
    })
})

describe('leveling down', () => {
    const apprentice1: Stage = build();
    const apprentice2 = apprentice1.nextStage!;
    const apprentice3 = apprentice2.nextStage!;
    const apprentice4 = apprentice3.nextStage!;
    const guru1 = apprentice4.nextStage!;
    const guru2 = guru1.nextStage!;

    test('does not decrement when at stage 0', () => {
        expect(levelDownStage(apprentice1, 1)).toBe(apprentice1);
    })

    test('decrements one stage', () => {
        expect(levelDownStage(apprentice4, 1)).toBe(apprentice3);
    })

    test('decrements multiple stages', () => {
        expect(levelDownStage(guru2, 3)).toBe(apprentice2);
    })

})