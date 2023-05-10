let AllWords = [];
let current_word = 0;
let current_word_length = 0;
let current_letter = 0;
let margin_box = 159.5;
let AllWordsEnglish = [];

async function getWords() {
  return await fetch("file")
    .then((response) => response.text())
    .then((data) => {
      //console.log(data); // the contents of the file will be logged to the console
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

      console.log(words);

      const words_1 = [];
      for (let i = 0; i < words.length; i += 2) {
        words_1.push([words[i], words[i + 1]]);
      }
      return words_1;
    });
}

async function core() {
  //AllWords = await getWords();
  const page_id = document
    .querySelector('meta[name="page_id"]')
    .getAttribute("content");
  const token = document
    .querySelector('meta[name="token"]')
    .getAttribute("content");
  AllWords = (
    await fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_id: page_id,
        token: token,
      }),
    }).then((res) => res.json())
  ).data;
  if (AllWords) {
    console.log(AllWords);
    shuffle_(AllWords);

    // get first element of each array inside AllWords
    AllWordsEnglish = AllWords.map((word) => word[0]);
    //console.log(AllWords);
    //console.log(AllWordsEnglish);
    RenderDataToUi();
    document.addEventListener("keypress", (e) => HandelTyping(e));
  } else {
    console.log("error in auth");
    document.getElementById(
      "big-box-container"
    ).innerHTML = `<h1>Error in Auth</h1>`;
  }
}

function RenderDataToUi() {
  let cotainer_words_box = document.getElementById("big-box-container");
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
  cotainer_words_box.innerHTML = cotainer_words_box_html;
}
core();

function HandelTyping(e) {
  let keypressed = e.key;
  current_word_length = AllWordsEnglish[current_word].length;
  //console.log(current_word_length);
  //console.log(keypressed);
  if (e.keyCode === 32) {
    e.preventDefault();
  }
  // check if the key pressed is the same as the current letter
  if (keypressed === AllWordsEnglish[current_word][current_letter]) {
    //console.log("correct");
    //let current_element = document.querySelector(`.big-box .word-box:nth-of-type(${current_word}) .english-title span.letter:nth-of-type(${current_letter})`)
    let current_element = document.querySelector(
      ".big-box .word-box.selected .english-title span.letter.selected"
    );
    current_element.classList.add("done");
    current_element.classList.remove("selected");
    if (current_letter == current_word_length - 1) {
      //console.log("next word");
      let previousword = document.querySelector(
        `.big-box .word-box:nth-of-type(${current_word + 1})`
      );
      previousword.classList.remove("selected");
      current_word++;
      current_letter = 0;
      let nextelement = document.querySelector(
        `.big-box .word-box:nth-of-type(${
          current_word + 1
        }) .english-title span.letter:nth-of-type(${current_letter + 1})`
      );
      if (nextelement) {
        nextelement.classList.add("selected");
        let nextword = document.querySelector(
          `.big-box .word-box:nth-of-type(${current_word + 1})`
        );
        nextword.classList.add("selected");
        if (
          nextword.offsetTop - document.querySelector(".big-box").scrollTop >
          168
        ) {
          box_up_step();
        }
      }
      increament_bar();
    } else {
      current_letter++;
      let nextelement = document.querySelector(
        `.big-box .word-box:nth-of-type(${
          current_word + 1
        }) .english-title span.letter:nth-of-type(${current_letter + 1})`
      );
      nextelement.classList.add("selected");
    }
  } else {
    console.log("wrong");
    let current_element = document.querySelector(
      `.big-box .word-box:nth-of-type(${
        current_word + 1
      }) .english-title span.letter:nth-of-type(${current_letter + 1})`
    );

    current_element.innerHTML = keypressed;
    let value = AllWordsEnglish[current_word][current_letter];
    current_element.classList.add("wrong");
    setTimeout(() => {
      current_element.classList.remove("wrong");
      current_element.innerHTML = value;
    }, 100);
  }
}

function box_up_step() {
  let element = document.querySelector(".big-box");
  element.scrollTop += margin_box;
}

function increament_bar() {
  let bar = document.querySelector(".progress-bar-fill");
  let value = (current_word / AllWordsEnglish.length) * 100;
  bar.style.width = `${value}%`;
  document.querySelector(".progress-value").innerHTML = `${parseInt(value)}%`;
}

function shuffle_(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function trimString(str) {
  console.log(str, typeof str);
  const trimmedStr = str.trim();
  if (trimmedStr.length === 0) {
    return null; // or return an empty string, throw an error, or do something else
  }
  return trimmedStr;
}
