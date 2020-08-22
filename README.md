## Running the App

* Set up Neo4j on your workstation.
* Run the test-data.cypher script in your Neo4j DB.
* Install the dependencies with `npm install`
* Copy the `.env.example` to `.env`. Edit if necessary.
* Set the following varaibles to fetch real data from Instagram:
  * `INSTAGRAM_USERNAME`: your instagram username.
  * `INSTAGRAM_PASSWORD`: your instagram password.
  * `POPULATE_REAL_DATA`: 'TRUE' or 'FALSE' to trigger the data fetching and population.
  * Currently the population service fetches 120 photos associated with three static hashtags, 40 each.
    ```javascript
    // in src/services/population/population.service.ts

    const QUERIES: SearchSpec[] = [
      { hashtag: 'sweden', limit: 40 },
      { hashtag: 'deutschland', limit: 40 },
      { hashtag: 'food', limit: 40 }
    ];
    ```

* Start the app with `npm start`.

## Running tests
* First create a test DB named `neo4j-test` or modify that name in the `./env.test` file.
* Run the `test/test-data.cypher` script to load the mock data in your test DB.
* You can then run tests once with `npm test` or start the tests in watch mode with `npm run test:watch`.
