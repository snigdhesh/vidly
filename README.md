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


skip() method for pagination in mongo database
count() to get total could of matching criteria from mongo database

## Entity relations

**Approach1:** Using references (Normalization)  

`Benefit:` Single place to define author, and we refer it everywhere  
`Limitation:` We need to query for author and also course  
```
let author = { id: 1, name: 'John' }
let course = { author: 1 } //It works, but mongo db doesn't throw an error, if we give wrong Id. 
```
**Approach2:** Using embedded documents (Denormalization)  

`Benefit:` Good performance, cause we can do only one query to get course and author.  
`Limitation:` We are not reffering author, rather we are creating author directly. We also need to modify in
//many places.

```
let course = {
    author: { name: 'John' }
}
```

**Approach3:** Hybrid approach  
`Note:` This approach is mixture of above two approaches

```
let author = {
    name: 'John'
    //50 other props
}

let course = {
    author: { id: 'reference to author object', name: 'John'}
}
```

**Note:** Pick right approach, there is nothing right or wrong here.