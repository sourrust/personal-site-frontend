import each   from 'lodash/each';
import random from 'lodash/random';

import ItemWeight from '../types/ItemWeight';

function getRandomItem(items: ItemWeight[]) {
    let result = '';
    let offset = 0;

    const seedNumber = random(1, 100);

    each(items, (item) => {
        const value = item.weight + offset;

        if (seedNumber <= value) {
            result = item.name;

            return false;
        }

        offset += item.weight;

        return true;
    });

    return {
        value: result,
        seed: seedNumber,
    };
}

export default getRandomItem;
