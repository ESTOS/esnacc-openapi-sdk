let counter = 0;
export const eventOperationId = 99999;
export function getInvokeId() {
    if (counter == 99998)
        counter = 0;
    counter++;
    return counter;
}
export function getTime(date: Date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}.${date
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}`;
}

export function fetchJson(url: string) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json());
}