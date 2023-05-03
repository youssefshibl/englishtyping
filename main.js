let AllWords = [];

async function getWords() {
  return await fetch("./data/words.md")
    .then((response) => response.text())
    .then((data) => {
      //console.log(data); // the contents of the file will be logged to the console
      const regex = /^\|.*$/gm;
      const lines = data.match(regex);
      const words = lines
        .map((line) => {
          const regex = /\s[^\|-]+\s/gm;
          let words = line.match(regex);
          return words;
        })
        .filter((word) => word !== null)
        .flat()
        .map((word) => word.trim());

      const words_1 = [];
      for (let i = 0; i < words.length; i += 2) {
        words_1.push([words[i], words[i + 1]]);
      }
      return words_1;
    });
}

async function core() {
  AllWords = await getWords();
  console.log(AllWords);
}

core();
