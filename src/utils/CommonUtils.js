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
        return "date";
    }
}

export const clamp = (value, start1, stop1, start2, stop2) => (
    (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
);

const makeItTwo = digit => {
    return digit > 9 ? digit : `0${digit}`;
}