import { test, describe, expect } from '@jest/globals'
import {Period, plus} from '../time/Period'

describe('adding time', () => {
    test('adding hours', () => {
        const period: Period = {
            hours: 1,
        }
        const start = new Date('March 29, 2023 08:16:00 GMT');
        const newDate = plus(start, period);
        expect(newDate).toEqual(new Date('March 29, 2023 09:16:00 GMT'));
    })

    test('subtracting hours', () => {
        const period: Period = {
            hours: -8,
        }
        const start = new Date('March 29, 2023 08:16:00 GMT');
        const newDate = plus(start, period);
        expect(newDate).toEqual(new Date('March 29, 2023 00:16:00 GMT'));
    })

    test('adding hours at end of day', () => {
        const period: Period = {
            hours: 3,
        }
        const start = new Date('March 29, 2023 22:50:00 GMT');
        const newDate = plus(start, period);
        expect(newDate).toEqual(new Date('March 30, 2023 01:50:00 GMT'));
    })

    test('adding days', () => {
        const period: Period = {
            days: 2,
        }
        const start = new Date('March 29, 2023 22:50:00 GMT');
        const newDate = plus(start, period);
        expect(newDate).toEqual(new Date('March 31, 2023 22:50:00 GMT'));
    })

    test('adding weeks', () => {
        const period: Period = {
            weeks: 2,
        }
        const start = new Date('March 29, 2023 22:50:00 GMT');
        const newDate = plus(start, period);
        expect(newDate).toEqual(new Date('April 12, 2023 22:50:00 GMT'));
    })

    test('adding months', () => {
        const period: Period = {
            months: 2,
        }
        const start = new Date('December 29, 2023 22:50:00 GMT');
        const newDate = plus(start, period);
        expect(newDate).toEqual(new Date('Febuary 29, 2024 22:50:00 GMT'));
    })
})