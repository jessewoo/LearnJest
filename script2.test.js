const fetch = require('node-fetch');
const swapi = require('./script2');

it('calls swapi to get people - use done callback', (done) => {
  expect.assertions(1)

  // The tests are completing after getPeople are called. getPeople get returned before we received the data
  // Don't pass a test if you get a promise state. NEED TO WAIT TILL THIS IS DONE
  swapi.getPeople(fetch).then(data => {
    expect(data.count).toEqual(82)
    done();
  })
})

// If you omit return statement, test will complete before the promise actually gets resolved or rejected. 
// WHEN RUNNING ASYNCHRONOUS tests, always USE EXPECT ASSERTIONS
it('calls swapi to get people - using return the promise', () => {
  expect.assertions(1)
  return swapi.getPeople(fetch).then(data => {
    expect(data.count).toEqual(82)
  })
})

it('calls swapi to get people with a promise', () => {
  expect.assertions(2)
  return swapi.getPeoplePromise(fetch).then(data => {
    // console.log(data);
    expect(data.count).toEqual(82)
    expect(data.results.length).toBeGreaterThan(5)
  })
})

// Just testing logic
it('getPeople returns count and results', () => {
  // let you 'spy' on mock calls
  const mockFetch = jest.fn()
    .mockReturnValue(Promise.resolve({
      json: () => Promise.resolve({
        count: 82,
        results: [0, 1, 2, 3, 4, 5]
      })
    }))

  expect.assertions(4)
  return swapi.getPeoplePromise(mockFetch).then(data => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith('https://swapi.dev/api/people');
    expect(data.count).toEqual(82)
    expect(data.results.length).toBeGreaterThan(5)

  })

})



