export class RandomHelper {
    getRandomArrayElements(arr: any[], count: number) {
        const shuffled = arr.slice(0);
        let i = arr.length;
        let min = i - count;
        let temp;
        let index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
}
