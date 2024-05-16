# vidly
Node.js application

| Command                           | Description                                                                               |
| -----------------                 | ---------------------------------------------------------------------                     |
| **npm init --yes**                | Creates package.json with default values                                                  |
| **npm i express**                 | A framework for node.js applications                                                      |
| **npm i nodemon**                 | This is a package that enables auto recompiling, everytime you make a code change         |
| **npm i config**                  | For managing config in different envs, like dev, test, prod                               |
| **npm i joi**                     | For request body validations                                                              |
| **npm i underscore**              | Popular package for utilities                                                             |
| **npm i mongoose**                | A library to work with mongodb database - It offers a simple API to perform DB operations |
| **npm i lodash**                  | Powerful util tool. It's an optimized version of 'underscore' package                     |
| **npm i bcrypt**                  | To encrypt password to save to database                                                   |
| **npm i jsonwebtoken**            | To generate json web tokens                                                               |
| **npm i express-async-errors**    | To handle excpetions globaly                                                              |
| **npm i winston**                 | Popular logging library                                                                   |
| **npm i winston-mongodb**         | Logging library to add logs to mongodb                                                    |
| **npm i jest --save-dev**         | Testing framework                                                                         |
| **npm i supertest --save-dev**    | A library to send http requests via code - for integration testing                        |
| **npm i moment**                  | A library to work with dates and times                                                    |


## Nuggets
- `skip()` method for pagination in mongo database.
- `count()` to get total count of matching criteria from mongo database.

## Entity relations

<details>
    <summary> Approach1 : Using references (Normalization)   </summary>

`Benefit:` Single place to define author, and we refer it everywhere  
`Limitation:` We need to query for author and also course  

    let author = { id: 1, name: 'John' }
    let course = { author: 1 } //It works, but mongo db doesn't throw an error, if we give wrong Id. 
</details>




<details>
    <summary>Approach2: Using embedded documents (Denormalization)</summary>

`Benefit:` Good performance, cause we can do only one query to get course and author.  
`Limitation:` We are not reffering author, rather we are creating author directly. We also need to modify in
//many places.

    let course = {
        author: { name: 'John' }
    }
</details>



<details>
    <summary>Approach3: Hybrid approach</summary>

`Note:` This approach is mixture of above two approaches

    let author = {
        name: 'John'
        //50 other props
    }

    let course = {
        author: { id: 'reference to author object', name: 'John'}
    }
</details>

**Note:** Pick right approach, there is nothing right or wrong here.


## Testing

We use `jest --watchAll --verbose --coverage --runInBand` command

**package.json**

    {
        "scripts":{
            "test": "jest --watchAll --verbose --coverage --runInBand"
        }
    }

where
  - `--watchAll` can auto run test cases, everytime we make a change
  - `--verbose` can output extra info in the console, if something goes wrong we can use this info to troubleshoot.
  - `--coverage` will give code coverage report in command line (or) html file can be found under   
    `root > coverage > Icov-report > index.html`
  - `--runInBand` will allow `Jest` to execute test cases one by one.

## Issues & Solutions: Fixing concurrent test execution issue
**Issue1:** Jest & supertest testing packages run test cases concurrently (in parallel) by default.  
**Reason:** Jest does this to improve performance.  
**Problem:** Say, if we create an object in `test-case-1` and use it in `test-case-2` - This fails cause `test-case-2` might execute first.  
**Solution:** Mention `Jest` to execute test cases in sequence with command `--runInBand`, under **package.json > scripts > test**
    
    {
        "scripts":{
            "test": "jest --watchAll --verbose --coverage --runInBand" //runInBand will allow Jest to execute test cases one by one.
        }
    }

**Note:** 
- Fixing anyone issue from these two will fix the other. But try to write independent test-cases, so jest can run them in parallel for faster executions and better peformance.
- Use `netstat -aon | findstr 3000` to see processing running on port 3000. If you see `0` as PID. Stop the app and wait for a while, to clean all these running processes on port 3000. Then you can re-run your app again.

**Issue2:** During parallel execution, `Jest` & `supertest` testing packages assign random ports for every test case, while running test cases.  
**Problem:** If we explicitly mention any port like `3000`, two different test-cases execute at same time, trying to start server on port `3000`, which will result in error.  
**Solution:** Assign explicit PORT only if environment is not `test` like show below
    
    const port = process.env.NODE_ENV != 'test' && process.env.PORT || 3000

    app.listen(port,()=>console.log(`listening on port ${port}...`))

**Solution by Mosh** : You need to `await` when you do server.close(). That's all you need to do, you don't have to add any command/port logic. If this works in your project, please follow this. If not try above solutions.

    afterEach(async() => {
        await Genre.deleteMany({});
        await server.close();
    })
