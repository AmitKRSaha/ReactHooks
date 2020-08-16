import React, { useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator';
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [titleState, setTitleState] = useState('')
  const [amountState, setAmountState] = useState('')


  const submitHandler = event => {
    event.preventDefault();
    // ...
    // console.log(titleState);
    // console.log(amountState);
    if (titleState.trim() === null || titleState.trim() === '' || amountState.trim() === null || amountState.trim() === '') {
      alert('Please add correct values');
    }
    props.addIngredients({ title: titleState, amount: amountState });

  };


  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title"
              value={titleState}
              onChange={(e) => setTitleState(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
              value={amountState}
              onChange={(e) => setAmountState(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
