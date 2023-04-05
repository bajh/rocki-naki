export type Period = {
    hours?: number
    days?: number;
    weeks?: number;
    months?: number;
}

export const ofHours = (hours: number): Period => ({hours: hours});

export const ofDays = (days: number): Period => ({days: days});

export const ofWeeks = (weeks: number): Period => ({weeks: weeks});

export const ofMonths = (months: number): Period => ({months: months});

const secondsToMillis = (seconds: number): number => {
    return seconds * 1000;
}

const minutesToMillis = (minutes: number): number => {
    return secondsToMillis(60) * minutes;
}

const hoursToMillis = (hours: number): number => {
    return minutesToMillis(60) * hours;
}

export const plus = (date: Date, period: Period): Date => {
    const newDate = new Date(date.getTime());

    if (period.hours) {
        newDate.setTime(newDate.getTime() + hoursToMillis(period.hours));
    }

    if (period.days) {
        newDate.setDate(newDate.getDate() + period.days);
    }

    if (period.weeks) {
        newDate.setDate(newDate.getDate() + period.weeks * 7);
    }

    if (period.months) {
        newDate.setMonth(newDate.getMonth() + period.months);
    }
    

    return newDate;
}