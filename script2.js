const fetch = require('node-fetch');

// Dependency injection, using promise
const getPeoplePromise = fetch => {
  return fetch('https://swapi.dev/api/people')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      return {
        count: data.count,
        results: data.results
      }
    })
}

// Using async / await
const getPeople = async (fetch) => {
  const getRequest = await fetch('https://swapi.dev/api/people');
  const data = await getRequest.json();
  // console.log(data);
  return {
    count: data.count,
    results: data.results
  }
}

module.exports = {
  getPeople, getPeoplePromise
}