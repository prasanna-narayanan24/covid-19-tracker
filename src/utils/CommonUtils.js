export const parseDate = (datestring, includeTime = true) => {
    try {
        const date = new Date(datestring)

        const month = date.toLocaleString('default', { month: "short" });
        const dateOfMonth = makeItTwo(date.getDate());
        const hour = makeItTwo(date.getHours())
        const minutes = makeItTwo(date.getMinutes());

        const dateOutput = `${dateOfMonth} ${month}`
        const timeOutput = `${hour}:${minutes}`

        return dateOutput + (includeTime ? ", " + timeOutput : "");
    } catch {
        return "";
    }
}

export const asDateObject = (datestring) => {
    try {
        const date = new Date(datestring)
        return date;
    } catch {
        return "";
    }
}

export const shortNumber = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else if(num > 1000) {
        return Math.round(num / 100) / 10 + "K";
    } else {
        return num;
    }
};

export const clamp = (value, start1, stop1, start2, stop2) => (
    (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
);

const makeItTwo = digit => {
    return digit > 9 ? digit : `0${digit}`;
}