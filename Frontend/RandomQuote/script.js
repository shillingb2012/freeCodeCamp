const projectName = 'random-quotes';
let quotes;
let currentQuote = "";
let currentAuthor = "";

// Colors to use for color transitions between quotes
var colors = [
  "#f54b42",
  "#f5bf42",
  "#638c0f",
  "#1a5e41",
  "#61a8d4",
  "#0d136b",
  "#733ede",
  "#1c054a",
  "#c4279d",
  "#540b12"
];

// Need to first GET the quote data json file
// jQuery.get() to obtain the quotes data
function getQuotes() {
  return $.ajax({
    url: "https://raw.githubusercontent.com/shillingb2012/devResources/main/enterpreneur-quotes.json",
    success: function (jsonQuotes) {
        quotes = JSON.parse(jsonQuotes);
        console.log(quotes);
    }
  });
}

// GET a random quote from the parsed JSON file to display
// quotesData format array of objects [{text: quoteText, from: fromText},{text: quoteText, from: fromText}, ..., {text: quoteText, from: fromText}]
function getRandomQuote() {
  return quotes[
    Math.floor(Math.random() * quotes.length)
  ];
}

// Main function for formatting the quote object and animation
function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.text;
  currentAuthor = randomQuote.from;

  $('#quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.text);
  });

  $('#quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.from);
  });
  
  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
    },
    1000
  );
  
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  ); 
}


// Call getQuotes and display the initial quote upon load and on subsequnt clicks
$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
