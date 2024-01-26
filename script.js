//Time limit
let TIME_LIMIT = 60; 
let quotes_array = [
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

let timer_text = document.querySelector(".curr_time"); 
let accuracy_text = document.querySelector(".curr_accuracy"); 
let error_text = document.querySelector(".curr_errors"); 
let cpm_text = document.querySelector(".curr_cpm"); 
let wpm_text = document.querySelector(".curr_wpm"); 
let quote_text = document.querySelector(".quote"); 
let input_area = document.querySelector(".input_area"); 
let restart_btn = document.querySelector(".restart_btn"); 
let cpm_group = document.querySelector(".cpm"); 
let wpm_group = document.querySelector(".wpm"); 
let error_group = document.querySelector(".errors"); 
let accuracy_group = document.querySelector(".accuracy"); 
  
let timeLeft = TIME_LIMIT; 
let timeElapsed = 0; 
let total_errors = 0; 
let errors = 0; 
let accuracy = 0; 
let characterTyped = 0; 
let current_quote = ""; 
let quoteNo = 0; 
let timer = null; 

function updateQuote() { 
    quote_text.textContent = null; 
    current_quote = quotes_array[quoteNo]; 
    
    // separate each character and make an element 
    // out of each of them to individually style them 
    current_quote.split('').forEach(char => { 
        const charSpan = document.createElement('span') 
        charSpan.innerText = char 
        quote_text.appendChild(charSpan) 
    }) 
    
    // roll over to the first quote 
    if (quoteNo < quotes_array.length - 1) 
        quoteNo++; 
    else
        quoteNo = 0; 
    } 
function processCurrentText() { 

// get current input text and split it 
curr_input = input_area.value; 
curr_input_array = curr_input.split(''); 

// increment total characters typed 
characterTyped++; 

errors = 0; 

quoteSpanArray = quote_text.querySelectorAll('span'); 
quoteSpanArray.forEach((char, index) => { 
	let typedChar = curr_input_array[index] 

	// character not currently typed 
	if (typedChar == null) { 
	char.classList.remove('correct_char'); 
	char.classList.remove('incorrect_char'); 

	// correct character 
	} else if (typedChar === char.innerText) { 
	char.classList.add('correct_char'); 
	char.classList.remove('incorrect_char'); 

	// incorrect character 
	} else { 
	char.classList.add('incorrect_char'); 
	char.classList.remove('correct_char'); 

	// increment number of errors 
	errors++; 
	} 
}); 

// display the number of errors 
error_text.textContent = total_errors + errors; 

// update accuracy text 
let correctCharacters = (characterTyped - (total_errors + errors)); 
let accuracyVal = ((correctCharacters / characterTyped) * 100); 
accuracy_text.textContent = Math.round(accuracyVal); 

// if current text is completely typed 
// irrespective of errors 
if (curr_input.length == current_quote.length) { 
	updateQuote(); 

	// update total errors 
	total_errors += errors; 

	// clear the input area 
	input_area.value = ""; 
} 
} 

function startGame() { 

    resetValues(); 
    updateQuote(); 
    
    // clear old and start a new timer 
    clearInterval(timer); 
    timer = setInterval(updateTimer, 1000); 
} 
    
function resetValues() { 
    timeLeft = TIME_LIMIT; 
    timeElapsed = 0; 
    errors = 0; 
    total_errors = 0; 
    accuracy = 0; 
    characterTyped = 0; 
    quoteNo = 0; 
    input_area.disabled = false; 
    
    input_area.value = ""; 
    quote_text.textContent = 'Click on the area below to start the game.'; 
    accuracy_text.textContent = 100; 
    timer_text.textContent = timeLeft + 's'; 
    error_text.textContent = 0; 
    restart_btn.style.display = "none"; 
    cpm_group.style.display = "none"; 
    wpm_group.style.display = "none"; 
} 
function updateTimer() { 
    if (timeLeft > 0) { 
        // decrease the current time left 
        timeLeft--; 
    
        // increase the time elapsed 
        timeElapsed++; 
    
        // update the timer text 
        timer_text.textContent = timeLeft + "s"; 
    } 
    else { 
        // finish the game 
        finishGame(); 
    } 
} 

function finishGame() { 
    // stop the timer 
    clearInterval(timer); 
    
    // disable the input area 
    input_area.disabled = true; 
    
    // show finishing text 
    quote_text.textContent = "Click on restart to start a new game."; 
    
    // display restart button 
    restart_btn.style.display = "block"; 
    
    // calculate cpm and wpm 
    cpm = Math.round(((characterTyped / timeElapsed) * 60)); 
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60)); 
    
    // update cpm and wpm text 
    cpm_text.textContent = cpm; 
    wpm_text.textContent = wpm; 
    
    // display the cpm and wpm 
    cpm_group.style.display = "block"; 
    wpm_group.style.display = "block"; 
} 
    
    
    