import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  let [userIng, setUserIng] = useState([]);

  // useEffect(() => {
  //   async function loaddata() {
  //     const res = await fetch('https://rc-hooks.firebaseio.com/ingredients.json');
  //     const data = await res.json();
  //     const loadedData = [];
  //     for (let d in data) {
  //       loadedData.push({ id: d, title: data[d].title, amount: data[d].amount })
  //     }
  //     setUserIng(loadedData);
  //   }
  //   loaddata();
  // }, []);

  const addIngredients = async (ingredients) => {
    const res = await fetch('https://rc-hooks.firebaseio.com/ingredients.json',
      {
        method: 'POST', body: JSON.stringify(ingredients), headers: { 'Content-Type': 'application/json' }
      });
    const data = await res.json();
    setUserIng(prevIng => [...prevIng].concat({ id: data.name, ...ingredients }));
  }

  const removeIngredients = (id) => {
    setUserIng(prevIng => prevIng.filter(ing => ing.id !== id));
  }

  const onLoadIngredients = useCallback((ingre) => {
    setUserIng(ingre);
    console.log('Ingre' + JSON.stringify(ingre));
  }, []);


  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredients} />

      <section>
        <Search onLoadIngredients={onLoadIngredients} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIng} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
