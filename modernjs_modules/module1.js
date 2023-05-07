
const users = [];

const addMember = (name, lastname) => {
    users.push({ name, lastname })
    console.log(`${name} ${lastname} is added to members list`);
}

export { addMember, users as members };