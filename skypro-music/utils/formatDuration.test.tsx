import formatDuration from "./formatDurations";

describe('formatTime',() => {
    it('Добавление нуля, если секунд < 10'), () => {
        expect(formatDuration(61)).toBe('1:01')
    }
})