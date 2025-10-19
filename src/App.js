import React, { useState } from 'react';
import './App.css';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [userInputX, setUserInputX] = useState('');
  const [userInputY, setUserInputY] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [sum, setSum] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    if (userInputX === '' || isNaN(userInputX)) {
      setError('Please enter a valid real number.');
      return;
    }

    if (userInputY === '' || isNaN(userInputY)) {
      setError('Please enter a valid real number.');
      return;
    }

    setError(null);
    setSum(null);
    setProduct(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/sum_and_product?x=${userInputX}&y=${userInputY}`);
  

      const data = await response.json();

      if (data.type === 'success'){
        setSum(data.sum);
        setProduct(data.product);
      } 
      else setError('Failed to fetch Fibonacci result.');

      setX(userInputX);
      setY(userInputY);

    } catch (err) {
      setError('Server error occurred.');
    }
  };

  return (
    <div>
      <h2>Calculate Sum and Product</h2>
      <input
        type="number"
        value={userInputX}
        placeholder="Enter a number"
        onChange={e => setUserInputX(e.target.value)}
      />
      <br />
      <input
        type="number"
        value={userInputY}
        placeholder="Enter a number"
        onChange={e => setUserInputY(e.target.value)}
      />
      <br />

      <button onClick={calculate} >
        Calculate
      </button>

      <div className="calcResult">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {sum !== null && <p>X + Y = <strong>{sum}</strong></p>}
        {product !== null && <p>X * Y = <strong>{product}</strong></p>}
      </div>
    </div>
  );
}
