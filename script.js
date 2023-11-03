function TextChanger(list, selector) {
    var loveSentences = list,
            currentSentenceIndex = 0,
            topPosition,
        bottomPosition,
        lettersCount,
        text,
        cache = [],
        oldParagraph = document.querySelector(selector),
        getNextLoveSentence = function() {
          var nextSentence = loveSentences[currentSentenceIndex];
          currentSentenceIndex += 1;
          if (currentSentenceIndex === loveSentences.length) {
            currentSentenceIndex = 0;
          }
          return nextSentence;
        },
        getWords = function(words, from, to) {
            var newWords = [];
            from -= 1;
            to -= 1;
            for(; from <= to; from++) {
            newWords.push(words[from]);
            }
            return newWords.join(' ').split('');
        },
        createLetter = function(val, index) {
            if (val !== " ") {
              var letter = document.createElement('span'); 
              if (topPosition) {
                letter.style.top = topPosition;
              } else {
                letter.style.bottom = bottomPosition;
              }
              letter.style.left = (20 + (Math.ceil(60 / (lettersCount - 1)) * (index))) + "%";
              letter.textContent = val;
              return letter;
            }
        },
        addLetters = function(val, index) {
          var letter = createLetter(val, index);
          if (letter !== undefined) {
            text.appendChild(letter);
          }
        };
    
    this.addSentence = function(sentence) {
      if (loveSentences.indexOf(sentence) > -1) {
        alert('Sorry, this sentence is already included.');
      } else {
      loveSentences.push(sentence);
      }
    };  
    
    this.removeSentence = function(sentence) {
      var index = loveSentences.indexOf(sentence);
      loveSentences.splice(index, 1);
      cache.splice(index, 1);
      if (index < currentSentenceIndex) {
        currentSentenceIndex -= 1;
      }
    };  
    
      this.displaySentence = function() {
          var currentLoveWord = getNextLoveSentence(),
          words = currentLoveWord.split(' '),
          letters = currentLoveWord.split(''),
          wordsCount = words.length,
          newParagraph = document.createElement('p');
      
      if (cache[currentSentenceIndex - 1]) {
        oldParagraph.parentNode.replaceChild(cache[currentSentenceIndex - 1], oldParagraph);
        oldParagraph = cache[currentSentenceIndex - 1];
        return false;
      }
          
      text = document.createDocumentFragment();
          lettersCount = letters.length;
  
          if (wordsCount === 1 && lettersCount > 1) {
            topPosition = "15%";
            letters.forEach(addLetters);
          } else if (wordsCount === 2 && lettersCount <= 10) {
            topPosition = "15%";
            letters.forEach(addLetters);
          } else if (wordsCount === 2 && lettersCount > 10) {
            topPosition = "15%";
            bottomPosition = "15%";
            lettersCount = getWords(words, 1, 1).length;
            getWords(words, 1, 1).forEach(addLetters);
            topPosition = undefined;
            lettersCount = getWords(words, 2, 2).length;
            getWords(words, 2, 2).forEach(addLetters);
          } else if (wordsCount >= 3 && lettersCount <= 10) {
            topPosition = "15%";
            letters.forEach(addLetters);
          } else if (wordsCount >= 3 && lettersCount > 10) { 
            topPosition = "15%";
            bottomPosition = "15%";
            lettersCount = getWords(words, 1, Math.ceil(wordsCount / 2)).length; 
            getWords(words, 1, Math.ceil(wordsCount / 2)).forEach(addLetters);
            topPosition = undefined;
            lettersCount = getWords(words, Math.ceil((wordsCount / 2) + 1), wordsCount).length;
            getWords(words, Math.ceil((wordsCount / 2) + 1), wordsCount).forEach(addLetters);
          } else if (lettersCount === 1) {
            var letter = document.createElement('span');
            letter.textContent = currentLoveWord[0];
            letter.style.top = "15%";
            letter.style.left = "49%";
            text.appendChild(letter);
          }
      
      newParagraph.className = "text";
      newParagraph.appendChild(text);
      oldParagraph.parentNode.replaceChild(newParagraph, oldParagraph);
      oldParagraph = newParagraph;
      cache.push(newParagraph);
      }; 
  }
  
  var changer = new TextChanger(["Iu Xuân Mai nhìu", 
                  "Iu Xuân Mai nhìu",
                  ],
                  ".text");
  changer.displaySentence();
  window.setInterval(changer.displaySentence, 3000);