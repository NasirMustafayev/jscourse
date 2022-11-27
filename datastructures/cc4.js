//Adding textarea and button to Page
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

//Setting element variables
const textareaEl = document.querySelector("textarea");
const btnElement = document.querySelector("button");
btnElement.textContent = "Convert";

//Camelcase generator function
function camelCase(data) {
  //Splitting textarea value based on New Line
  //When we split string this give us an array
  const variables = data.split("\n");

  //Looping and Getting key and value of splitted value
  for (const [key, value] of variables.entries()) {
    //toLowerCase, trim and then splitting string again based on underscore and divide string to two part
    const [first, second] = value.toLowerCase().trim().split("_");

    //Replacing first letter of second string with upperCase and Combining with other string also
    const camelCase = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    //Displaying final result with checkmark emoji
    console.log(`${camelCase.padEnd(20)}${"✅".repeat(key + 1)}`);
  }
}

//Event listener
btnElement.addEventListener("click", () => {
  camelCase(textareaEl.value);
});
