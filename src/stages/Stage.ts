import {ofHours, ofDays, ofWeeks, ofMonths, Period} from '../time/Period'

export type StageGroup = 'Apprentice' | 'Guru' | 'Master' | 'Enlightened';

export type Stage = {
    previousStage?: Stage;
    duration: Period;
    group: StageGroup;
    nextStage?: Stage;
}

type StageConfig = {duration: Period;}
type StageGroupConfig = {stageGroup: StageGroup, stages: StageConfig[]}

export function levelDownStage(stage: Stage, incorrectCount: number): Stage {
    const incorrectAdjustment = Math.ceil(incorrectCount / 2)
    let stagesToDecrement = incorrectAdjustment * (stage.group === 'Apprentice' ? 1 : 2);
    while (stagesToDecrement > 0) {
        if (!stage.previousStage) return stage;
        stage = stage.previousStage;
        stagesToDecrement--
    }
    return stage;
}

function buildFromConfigs(configs: StageGroupConfig[]): Stage {
    var currentGroup = configs.shift()!;
    var firstStage: Stage = {group: currentGroup.stageGroup, duration: currentGroup.stages.shift()!.duration};
    var currentStage = firstStage;
    while (configs.length || currentGroup.stages.length) {
        if (currentGroup.stages.length) {
            var nextStage = {group: currentGroup.stageGroup, duration: currentGroup.stages.shift()!.duration, previousStage: currentStage};
            currentStage.nextStage = nextStage;
            currentStage = nextStage;
        } else {
            currentGroup = configs.shift()!;
        }
    }
    return firstStage;
}

export function indexedByGroup(stage: Stage): {[key: string]: Array<Stage>} {
    const index: {[key: string]: Array<Stage>} = {};
    let nextStage: Stage | undefined = stage;
    while (nextStage) {
        if (!index[nextStage.group]) {
            index[nextStage.group] = [];
        }
        index[nextStage.group].push(nextStage);
        nextStage = nextStage.nextStage;
    }
    return index;
}

export function build(): Stage {
    return buildFromConfigs([
        {
            stageGroup: 'Apprentice',
            stages: [
                {duration: ofHours(4)},
                {duration: ofHours(8)},
                {duration: ofDays(1)},
                {duration: ofDays(2)},
            ]
        },
        {
            stageGroup: 'Guru',
            stages: [
                {duration: ofWeeks(1)},
                {duration: ofWeeks(2)},
            ]
        },
        {
            stageGroup: 'Master',
            stages: [
                {duration: ofMonths(1)},
            ]
        },
        {
            stageGroup: 'Enlightened',
            stages: [
                {duration: ofMonths(4)},
            ]
        }
    ]);
}