const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What worries you masters you.',
    "Talk doesn't cook rice.",
    'Patience is bitter, but its fruit is sweet.',
    'What you fear is that which requires action to overcome.',
    'The best way out is always through.',
    'Our greatest glory is not in never falling, but in rising every time we fall.',
    'The noblest pleasure is the joy of understanding.',
    'Wisdom is the supreme part of happiness.',
    'Skill to do comes of doing.',
    'The years teach much which the days never know.',
    'What one man can invent another can discover.',
    "It's easier to see the mistakes on someone else's paper.",
    'Trust yourself. You know more than you think you do.',
    'The best way to predict the future is to invent it.',
    'Study the past if you would define the future.',
    'The only real mistake is the one from which we learn nothing.',
    'The only source of knowledge is experience.',
    'In order to make an apple pie from scratch, you must first create the universe.',
    'I have no special talent. I am only passionately curious.',
    'The important thing is not to stop questioning. Curiosity has its own reason for existing.',
    'Nothing clears up a case so much as stating it to another person.',
    'Genius is one percent inspiration and ninety-nine percent perspiration.',
    'Difficulties increase the nearer we get to the goal.',
    'Self-complacency is fatal to progress.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// array for storing the words of the current challenge
let words = [];
// stores the index of the word the player is currently typing
let wordIndex = 0;
// default value for startTime (will be set on start)
let startTime = Date.now();

// grab UI items
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message')
const typedValueElement = document.getElementById('typed-value');
const highscoreElement = document.getElementById('highscore');

document.getElementById('start').addEventListener('click', function () {
	// get a quote
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	// Put the quote into an array of words
	words = quote.split(' ');
	// reset the word index for tracking
	wordIndex = 0;

	// UI updates
	// Create an array of span elements so we can set a class
	const spanWords = words.map(function(word) { return `<span>${word} </span>`});
	// Convert into string and set as innerHTML on quote display
	quoteElement.innerHTML = spanWords.join('');
	// Highlight the first word
	quoteElement.childNodes[0].className = 'highlight';
	// Clear any prior messages
	messageElement.innerText = '';

	// Setup the textbox
	// Clear the textbox
	typedValueElement.value = '';
	// set focus
	typedValueElement.focus();
	// set the event handler

	// Start the timer
	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
	// Get the current word
	const currentWord = words[wordIndex];
	// get the current value
	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {
		// end of quote
		// Display success
		const elapsedTime = new Date().getTime() - startTime;
		const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
		messageElement.innerText = message;

		// Check if the current score is higher than the highscore
		const highscore = localStorage.getItem('highscore');
		if (!highscore || elapsedTime < highscore) {
			// Update the highscore
			localStorage.setItem('highscore', elapsedTime);
			// Display a message about the new highscore
			const highscoreMessage = `New Highscore: ${elapsedTime / 1000} seconds!`;
			highscoreElement.innerText = highscoreMessage;
		}
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		// end of word
		// clear the typedValueElement for the new word
		typedValueElement.value = '';
		// move to the next word
		wordIndex++;
		// reset the class name for all elements in quote
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		// highlight the new word
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		// currently correct
		// highlight the next word
		typedValueElement.className = '';
	} else {
		// error state
		typedValueElement.className = 'error';
	}
	
});
