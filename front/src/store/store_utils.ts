
export function convertListToStore<T>(list :T[], key_id: string): {[key: string]: T} {
    let buffer = {} as {[key: string]: T};
    if (list.length === 0) {
        return buffer;
    }

    list.forEach((x: T) => {
        // @ts-ignore
        buffer[x[key_id]] = x;
    });

    return buffer;
}