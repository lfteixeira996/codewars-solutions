// I'm sure, you know Google's "Did you mean ...?", when you entered a search
// term and mistyped a word. In this kata we want to implement something
// similar.

// You'll get an entered term (lowercase string) and an array of known words
// (also lowercase strings). Your task is to find out, which word from the
// dictionary is most similar to the entered one. The similarity is described by
// the minimum number of letters you have to add, remove or replace in order to
// get from the entered word to one of the dictionary. The lower the number of
// required changes, the higher the similarity between each two words.

// Same words are obviously the most similar ones. A word that needs one letter
// to be changed is more similar to another word that needs 2 (or more) letters
// to be changed. E.g. the mistyped term berr is more similar to beer (1 letter
// to be replaced) than to barrel (3 letters to be changed in total).

// Extend the dictionary in a way, that it is able to return you the most
// similar word from the list of known words.

// Code Examples:

// fruits = new Dictionary(['cherry', 'pineapple', 'melon', 'strawberry',
// 'raspberry']); fruits.findMostSimilar('strawbery'); // must return
// "strawberry" fruits.findMostSimilar('berry'); // must return "cherry"

// things = new Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars']);
// things.findMostSimilar('coddwars'); // must return "codewars"

// languages = new Dictionary(['javascript', 'java', 'ruby', 'php', 'python',
// 'coffeescript']); languages.findMostSimilar('heaven'); // must return "java"
// languages.findMostSimilar('javascript'); // must return "javascript" (same
// words are obviously the most similar ones) I know, many of you would disagree
// that java is more similar to heaven than all the other ones, but in this kata
// it is ;)

// Additional notes:

// there is always exactly one possible solution

function levenshteinDistance(s, t) {
  if (s === t) {
    return 0;
  }
  if (s.length === 0) {
    return t.length;
  }
  if (t.length === 0) {
    return s.length;
  }

  var v0 = new Array(t.length + 1);
  var v1 = new Array(t.length + 1);

  for (var i = 0; i < v0.length; i++) {
    v0[i] = i;
  }

  for (var i = 0; i < s.length; i++) {
    v1[0] = i + 1;

    for (var j = 0; j < t.length; j++) {
      var cost = s[i] === t[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }

    for (var j = 0; j < v0.length; j++) v0[j] = v1[j];
  }

  return v1[t.length];
}

function Dictionary(words) {
  this.words = words;
}

Dictionary.prototype.findMostSimilar = function(term) {
  var mostSilimar = {
    similarity: Number.POSITIVE_INFINITY,
    word: ""
  };

  this.words.forEach(function(word) {
    var currentSimilarity = levenshteinDistance(term, word);
    if (currentSimilarity < mostSilimar.similarity) {
      mostSilimar.similarity = currentSimilarity;
      mostSilimar.word = word;
    }
  });

  return mostSilimar.word;
};
