import {times, range, random} from 'lodash/fp';

const compute = (dices, special = false) => {
    return range(1, 7).map(i => {
        return dices.reduce((prev, dice) => {
            return prev + (special
                ? dice === i ? 1 : 0
                : dice === i || dice === 1 ? 1 : 0
            );
        }, 0);
    });
};

export default (player, special = false, dice = 5) => {
    const dices = times(() => random(1, 6), player * dice);

    return compute(dices, special);
};

