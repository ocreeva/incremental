export default function arrayEquals<T>(a: T[] | null | undefined, b: T[] | null | undefined): boolean {
    if (a === b) return true;
    if ((a == null) || (a == undefined)) return false;
    if ((b == null) || (b == undefined)) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}
