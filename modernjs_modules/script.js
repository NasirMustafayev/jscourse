// import { addMember, users as members } from "./module1.js"

// addMember("Nasir", "Mustafayev");
// console.log(members);

import * as User from "./module1.js"
import cloneDeep from "lodash-es";

User.addMember("Nasir", "Mustafayev");
console.log(User.members);
console.log(User);
