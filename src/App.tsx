import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  useEffect(() => {
    if (sortType === SortType.None) {
      return;
    }

    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.Alphabet) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }, [sortType, isReversed]);

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  const handleReverse = () => {
    if (sortType === SortType.None) {
      const reversed = [...goods].reverse();
      const isNowReversed = reversed.join(',') !== goodsFromServer.join(',');

      setGoods(reversed);
      setIsReversed(isNowReversed);
    } else {
      setIsReversed(prev => !prev);
    }
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isChanged = () => {
    return goods.join(',') !== goodsFromServer.join(',');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabet ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged() && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
