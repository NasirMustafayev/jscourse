const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  displayResults(type = "array") {
    if (typeof type == "string") {
      const [...points] = this.answers;
      console.log(`Poll results are ${points.toString()}`);
    } else {
      console.log(this.answers);
    }
  },
  registerNewAnswer() {
    const answer = Number(
      prompt(`${this.question}
    ${this.options}`)
    );

    answer <= 3
      ? this.answers[answer]++
      : console.log("Select a option from list");
    this.displayResults("string");
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));
