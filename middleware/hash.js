//This file is to reference only. This is not used anywhere in the project.
const bcrypt = require('bcrypt')


//To hash a password, we need salt
//Salt is a random string that is added to the password before hashing
//The salt is stored with the hashed password

//password = '1234', If you hash this password - say you got '8s8f0s8f'
//You can't reverse engineer '8s8f0s8f' to get '1234'
//But hackers can use a dictionary attack to find the password. So we need salt.


//Generate a salt: genSalt(Number of rounds we run algorithm to generate salt). If the nubmer is higher, it will take longer to generate the salt, and gives more complex salt.
const run = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed)
}

run();