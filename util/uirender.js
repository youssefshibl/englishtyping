function getWords(data) {
  const regex = /^\|.*$/gm;
  const lines = data.match(regex);
  let space = /\S/;

  const words = lines
    .map((line) => {
      const regex = /\s[^\|-]+\s/gm;
      let words = line.match(regex);
      return words;
    })
    .flat()
    .filter((word) => word != null)
    .filter((word) => space.test(word))
    .map((word) => word.trim() + " ");

  //console.log(words);

  const words_1 = [];
  for (let i = 0; i < words.length; i += 2) {
    words_1.push([words[i], words[i + 1]]);
  }
  return words_1;
}

function RenderDataToUi(AllWords) {
  let cotainer_words_box_html = "";
  let word;
  for (let i = 0; i < AllWords.length; i++) {
    word = AllWords[i];
    cotainer_words_box_html += `<div class="word-box ${
      i == 0 ? "selected" : ""
    }">
                                      <div class="arabic-title">
                                      <h4>${word[1]}</h4>
                                      </div>
                                      <div class="english-title">
                                      ${RenderEnglish(word[0], i)}
                                      </div>
                                  </div>`;
  }
  function RenderEnglish(englishword, j) {
    let englishword_html = "";
    for (let i = 0; i < englishword.length; i++) {
      englishword_html += `<span class="letter ${
        i == 0 && j == 0 ? "selected" : ""
      }">${englishword[i]}</span>`;
    }
    return englishword_html;
  }
  return cotainer_words_box_html;
}

module.exports = {
  getWords,
  RenderDataToUi,
};

