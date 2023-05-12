// import { addMember, users as members } from "./module1.js"

// addMember("Nasir", "Mustafayev");
// console.log(members);

import deepClone from "lodash-es";
import * as User from "./module1.js"


User.addMember("Nasir", "Mustafayev");
console.log(User.members);
console.log(User);
console.log(deepClone);

if (module.hot) {
    module.hot.accept();
}