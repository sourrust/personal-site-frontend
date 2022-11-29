import React  from 'react';
import sumBy  from 'lodash/sumBy';

import { FaRandom as RandomIcon } from 'react-icons/fa';

import ItemWeight    from '../../types/ItemWeight';
import getRandomItem from '../../utility/getRandomItem';

interface Props {
    items: ItemWeight[];
}

function useRandomize(items: ItemWeight[]): [string, React.MouseEventHandler] {
    const [value, setValue] = React.useState('');

    function handleClick() {
        const item = getRandomItem(items);

        setValue(`${item.value} (seed: ${item.seed})`);
    }

    return [value, handleClick];
}

function Randomizer({ items }: Props) {
    const [value, handleClick] = useRandomize(items);

    const weightTotal = sumBy(items, 'weight');
    const isDisabled  = weightTotal !== 100;

    return (
        <div className="column field has-addons">
            <div className="control is-expanded">
                <input className="input" type="text" placeholder="Random Result" value={ value } disabled />
            </div>
            <div className="control">
                <button className="button is-dark" type="button" onClick={ handleClick } disabled={ isDisabled }>
                    <RandomIcon />
                </button>
            </div>
        </div>
    );
}

export default Randomizer;
