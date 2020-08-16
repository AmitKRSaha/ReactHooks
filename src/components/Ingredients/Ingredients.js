import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  let [userIng, setUserIng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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
    setLoading(true);
    const res = await fetch('https://rc-hooks.firebaseio.com/ingredients.json',
      {
        method: 'POST', body: JSON.stringify(ingredients), headers: { 'Content-Type': 'application/json' }
      });
    const data = await res.json();
    setUserIng(prevIng => [...prevIng].concat({ id: data.name, ...ingredients }));
    setLoading(false);
  }

  const removeIngredients = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://rc-hooks.firebaseio.com/ingredients/${id}.json`,
        {
          method: 'DELETE'
        });
      const data = await res.json();
      setUserIng(prevIng => prevIng.filter(ing => ing.id !== id));
      setLoading(false);
    } catch (err) {
      setError('Something is wrong');
    }
  }

  const onLoadIngredients = useCallback((ingre) => {
    setUserIng(ingre);
    // console.log('Ingre' + JSON.stringify(ingre));
  }, []);

  const clearError = () => {
    setError(null);
    setLoading(false);
  }


  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredients} loading={loading} />
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <section>
        <Search onLoadIngredients={onLoadIngredients} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIng} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
