"use strict"

const User = (() => {
    const users = [];
    const privateVar = "That will be not exported from this Module Pattern"

    const addMember = (name, lastname) => {
        users.push({ name, lastname })
        console.log(`${name} ${lastname} is added to members list`);
    }

    return {
        users,
        addMember
    }
})();
console.log(User.users);

User.addMember("Coni", "Memmedovich");
User.addMember("Gabbar", "Jabbalbari");
User.addMember("Kamazullahi", "Mamazukki");

console.log(User.privateVar);
console.log(User);




