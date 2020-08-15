import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props;

  const [searchState, setSearchState] = useState('');

  useEffect(() => {
    async function loaddata() {
      const query = searchState.length === 0 ? '' : `?orderBy="title"&equalTo="${searchState}"`;
      const res = await fetch('https://rc-hooks.firebaseio.com/ingredients.json' + query);
      const data = await res.json();
      console.log(data);
      const loadedData = [];
      for (let d in data) {
        loadedData.push({ id: d, title: data[d].title, amount: data[d].amount })
        // setUserIng(prevIng => [...prevIng].concat({ id: d, title: data[d].title, amount: data[d].amount }));
      }
      // return data;
      onLoadIngredients(loadedData);
    }
    loaddata();
  }, [searchState, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={searchState}
            onChange={(evt) => setSearchState(evt.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
