class Game {
  constructor() {
    this.game = document.querySelector(".x-o");
    this.buttons = [];
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const button = document.createElement("button");
        button.classList.add("button");
        button.dataset.x = x;
        button.dataset.y = y;
        this.buttons.push(button);
        this.game.append(button);
      }
    }

    this.queue = true;

    this.db = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.game.addEventListener("click", ({ target }) => {
      if (target.tagName == "BUTTON" && target.textContent.length < 1) {
        this.addValue(target);
      }
    });
  }

  addValue = (target) => {
    const value = this.queue ? "X" : "O";
    target.textContent = value;
    this.queue = !this.queue;
    const { x, y } = target.dataset;
    this.db[y][x] = value;
    if (this.checkDB()) {
      console.log("1");
      this.reset();
    }
  };

  checkDB = () => {
    for (let y = 0; y < this.db.length; y++) {
      const current = this.db[y];
      let findX = true;
      let findY = true;
      for (let x = 0; x < current.length - 1; x++) {
        if (!current[x].length) {
          findX = false;
        }

        if (!this.db[x][y].length) {
          findY = false;
        }

        if (findY && this.db[x][y] !== this.db[x + 1][y]) {
          findY = false;
        }

        if (findX && current[x] !== current[x + 1]) {
          findX = false;
        }
      }
      if (findX) return true;
      if (findY) return true;
    }

    if (
      this.db[0][0] == this.db[1][1] &&
      this.db[1][1] == this.db[2][2] &&
      this.db[0][0].length
    ) {
      return true;
    }

    if (
      this.db[0][2] == this.db[1][1] &&
      this.db[1][1] == this.db[2][0] &&
      this.db[0][2].length
    ) {
      return true;
    }
  };

  reset = () => {
    this.buttons.forEach((button) => (button.textContent = ""));
    this.db = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };
}

new Game();
