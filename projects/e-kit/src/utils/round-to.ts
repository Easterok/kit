export function roundTo(value: number, to: number): number {
    const tens = Math.pow(10, to);

    return Math.round(value * tens) / tens;
}
