const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),

  displayResults(type) {
    if (typeof type == "string") {
      console.log(`Poll results are ${this.answers.join(",")}`);
    } else {
      console.log(this.answers);
    }
  },

  registerNewAnswer() {
    const answer = Number(
      prompt(`${this.question}\n${this.options.join("\n")}`)
    );

    answer <= 3 && typeof answer === "number" && this.answers[answer]++;
    this.displayResults();
    this.displayResults("string");
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));
