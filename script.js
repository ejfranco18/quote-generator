const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let errorCount = 0

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if(!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Get Quote from API
async function getQuote() {
  showLoadingSpinner()
  const proxyUrl = 'https://cors-anywhere-2021.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If author is blank set unknown
    if (data.quoteAuthor) {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.quoteAuthor
    }
    // Reduce font size for lonk quotes
    if (data.quoteText.length > 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText

    removeLoadingSpinner()
  } catch (error) {
    if (errorCount < 5) {
      errorCount++
      getQuote();
    } else {
      console.log(error)
    }
  }
}

function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

//OnLoad
getQuote();