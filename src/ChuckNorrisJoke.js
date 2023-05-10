import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChuckNorrisJoke = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [positiveVotes, setPositiveVotes] = useState(0);
  const [negativeVotes, setNegativeVotes] = useState(0);

  const handlePositiveVote = () => {
    setPositiveVotes(positiveVotes + 1);
  }

  const handleNegativeVote = () => {
    setNegativeVotes(negativeVotes + 1);
  }

  const getNewJoke = () => {
    setLoading(true);
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(response => {
        setJoke(response.data.value);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getNewJoke();
  }, []);

  return (
    <div>
      <h1>Chuck Norris Joke</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{joke}</p>
          <button onClick={handlePositiveVote}>Positive Vote ({positiveVotes})</button>
          <button onClick={handleNegativeVote}>Negative Vote ({negativeVotes})</button>
          <br />
          <p>Number of Positive Votes: {positiveVotes}</p>
          <p>Number of Negative Votes: {negativeVotes}</p>
          <br />
          <button onClick={getNewJoke}>New Joke</button>
        </div>
      )}
    </div>
  );
}

export default ChuckNorrisJoke;

