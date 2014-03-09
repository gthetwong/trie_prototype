Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, index){
  var index = index || 0;
  var word = word;
  var char = word[index];

  if (this.characters[char]){
    this.characters[char].learn(word, index+1);
  } else {
    if (index === word.length){
      this.isWord = true;
    } else {
      this.characters[char] = new Trie();
      this.characters[char].learn(word,index+1);
    }
  }

};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
words = words || [];
currentWord= currentWord || "";

if (this.isWord){
  words.push(currentWord);
}

for (var char in this.characters) {
  var newWord = currentWord + char;
  if (this.characters[char].characters){
    this.characters[char].getWords(words, newWord);
      }
    }
  return words;
};




Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.
  var word = word;
  var index = index || 0;
  var node = word[index];
  if (this.characters[node]){
     return this.characters[node].find (word, index+1);
  } else if(index === word.length){
    // console.log(this);
    // console.log(this.characters);
   return this; 
  } else {
    return false;
  }
  // Be sure to consider what happens if the word is not in this Trie.
};

Trie.prototype.autoComplete = function(prefix){
  // var prefix = prefix.toLowerCase();
  var node = this.find(prefix);
  if (!node) {return [];}
  var result = node.getWords([], prefix);
  console.log(result);
  return node.getWords([], prefix); 
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
};


root = new Trie();
root.learn("big");
root.learn("bad");
root.learn("bigger");
root.learn("beg");
root.learn("beginner");
root.learn("begins");
root.learn("bald");
root.learn("balding");