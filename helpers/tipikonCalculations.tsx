import moment, { Moment } from "moment";

const EASTER_BY_YEARS = [
    { year: 2022, day: "4-24" },
    { year: 2023, day: "4-16" },
    { year: 2024, day: "5-5" },
    { year: 2025, day: "4-20" },
    { year: 2026, day: "4-12" },
    { year: 2027, day: "5-2" },
    { year: 2028, day: "4-16" },
    { year: 2029, day: "4-8" },
    { year: 2030, day: "4-28" },
    { year: 2031, day: "4-13" },
    { year: 2032, day: "5-2" },
    { year: 2033, day: "4-24" },
    { year: 2034, day: "4-9" },
    { year: 2035, day: "4-29" },
    { year: 2036, day: "4-20" },
    { year: 2037, day: "4-5" },
    { year: 2038, day: "4-25" },
    { year: 2039, day: "4-17" },
    { year: 2040, day: "5-6" },
    { year: 2041, day: "4-21" },
    { year: 2042, day: "4-13" },
    { year: 2043, day: "5-3" },
    { year: 2044, day: "4-24" },
    { year: 2045, day: "4-9" },
    { year: 2046, day: "4-29" },
    { year: 2047, day: "4-21" },
    { year: 2048, day: "4-5" },
    { year: 2049, day: "4-25" },
    { year: 2050, day: "4-17" },
]

export const getNextEaster = (date: Moment) => {
    let easter = undefined;

    for (let i = 0; i < EASTER_BY_YEARS.length - 1; i++) {
        const currentEaster = moment(`${EASTER_BY_YEARS[i].day}-${EASTER_BY_YEARS[i].year}`, 'MM-DD-YYYY');
        const nextEaster = moment(`${EASTER_BY_YEARS[i + 1].day}-${EASTER_BY_YEARS[i + 1].year}`, 'MM-DD-YYYY');
        if (currentEaster.isBefore(date) && nextEaster.isAfter(date)) {
            easter = nextEaster;
        }
    }

    return easter;
}

export const getPreviousEaster = (date: Moment) => {
    let easter = undefined;

    for (let i = 0; i < EASTER_BY_YEARS.length - 1; i++) {
        const currentEaster = moment(`${EASTER_BY_YEARS[i].day}-${EASTER_BY_YEARS[i].year}`, 'MM-DD-YYYY');
        const nextEaster = moment(`${EASTER_BY_YEARS[i + 1].day}-${EASTER_BY_YEARS[i + 1].year}`, 'MM-DD-YYYY');
        if (currentEaster.isBefore(date) && nextEaster.isAfter(date)) {
            easter = currentEaster;
        }
    }

    return easter;
}

export const getDaysFromEaster = (date: Moment) => {
    const easter = getPreviousEaster(date);
    return date?.diff(easter, 'days');
}

export const getDaysToNextEaster = (date: Moment) => {
    const easter = getNextEaster(date);
    return date?.diff(easter, 'days');
}

export const getWeeksFromEaster = (date: Moment) => {
    const easter = getPreviousEaster(date);
    return date?.diff(easter, 'weeks');
}

export const getWeeksToNextEaster = (date: Moment) => {
    const easter = getNextEaster(date);
    return date?.diff(easter, 'weeks');
}

export const getWeekInfo = (date: Moment) => {
    return {
        weekNumberFromPentecost: Math.floor(((getDaysFromEaster(date) - 1) / 7) - 6),
        glas: Math.floor((getDaysFromEaster(date) / 7 - 1) % 8 + 1),
        test3: getWeeksFromEaster(date),
        test4: getWeeksToNextEaster(date),
    }
}