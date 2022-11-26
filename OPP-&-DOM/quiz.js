
const jsonArr = [
    {
        "question": "What temperature does water boil at?",
        "optionA": "50 degrees Celcius",
        "optionB": "25 degrees Celcius",
        "optionC": "100 degrees Celcius",
        "optionD": "150 degrees Celcius",
        "answer": "100 degrees Celcius"
    },

    {
        "question": "Who wrote Julius Caesar, Macbeth and Hamlet?",
        "optionA": "Wole Soyinka",
        "optionB": "William Shakespeare",
        "optionC": "Ngozi Chimamanda Adichie",
        "optionD": "Dan Brown",
        "answer": "William Shakespeare"
    },

    {
        "question": "What did the crocodile swallow in Peter Pan?",
        "optionA": "A Book",
        "optionB": "A Computer",
        "optionC": "A pair of shoes",
        "optionD": "Alarm Clock",
        "answer": "Alarm Clock"
    },

    {
        "question": "Which is the only mammal that can’t jump?",
        "optionA": "Dog",
        "optionB": "Elephant",
        "optionC": "Goat",
        "optionD": "Lion",
        "answer": "Elephant"
    },

    {
        "question": "Who lived at 221B, Baker Street, London?",
        "optionA": "Tony Stark",
        "optionB": "Morgan Freeman",
        "optionC": "Sherlock Holmes",
        "optionD": "Samuel L. Jackson",
        "answer": "Sherlock Holmes"
    },

    {
        "question": "What colour is a panda?",
        "optionA": "Green and Yellow",
        "optionB": "Blue and Red",
        "optionC": "Green and White",
        "optionD": "Black and White",
        "answer": "Black and White"
    },

    {
        "question": "Where is the smallest bone in the human body?",
        "optionA": "The Chest",
        "optionB": "The Ear",
        "optionC": "The Legs",
        "optionD": "The Hands",
        "answer": "The Ear"
    },

    {
        "question": "What does the roman numeral C represent?",
        "optionA": "100",
        "optionB": "10",
        "optionC": "10,000",
        "optionD": "1,000,000",
        "answer": "100"
    },

    {
        "question": "What takes place in Hong Kong's Happy Valley?",
        "optionA": "Chicken Wrestling",
        "optionB": "Horse racing",
        "optionC": "Street Racing",
        "optionD": "Arm Wrestling",
        "answer": "Horse racing"
    },

    {
        "question": "Who painted the Mona Lisa?",
        "optionA": "Alexander Graham Bell",
        "optionB": "Sir Isaac Newton",
        "optionC": "Leonardo Da Vinci",
        "optionD": "Albert Einstein",
        "answer": "Leonardo Da Vinci"
    },

    {
        "question": "What’s the most important book in the Moslem religion?",
        "optionA": "The Koran",
        "optionB": "The Dictionary",
        "optionC": "The Bible",
        "optionD": "The Chemistry text Book",
        "answer": "The Koran"
    },

    {
        "question": "What’s the capital of Ethiopia?",
        "optionA": "Cape Town",
        "optionB": "San Francisco",
        "optionC": "Abuja",
        "optionD": "Syndey",
        "answer": "Addis Ababa"
    },

    {
        "question": "How many squares are there on a chess board?",
        "optionA": "128",
        "optionB": "64",
        "optionC": "32",
        "optionD": "256",
        "answer": "64"
    },

    {
        "question": "Who invented the electric light bulb?",
        "optionA": "Tom Cruise",
        "optionB": "Barack Obama",
        "optionC": "Wole Soyinka",
        "optionD": "Thomas Edison",
        "answer": "Thomas Edison"
    },

    {
        "question": "What are the first three words of the bible?",
        "optionA": "be with everyone",
        "optionB": "Again Jesus asked",
        "optionC": "In the beginning",
        "optionD": "At that time",
        "answer": "In the beginning"
    }
];
let data = jsonArr.map(el => {
    let ques = {
        question: el.question,
        answers: [el.optionA, el.optionB, el.optionC, el.optionD]
    }
    return ques;
});
/*------
Create Elements
*/
var questCont = document.getElementById('ques-cont');
var questLable = document.createElement('h2');
var form = document.createElement('form');
form.style = 'display: contents';
document.getElementById('ques-cont').appendChild(questLable);
document.getElementById('ques-cont').appendChild(form);

/*------
Init 1st Question
*/
createQues(parseInt(document.getElementById('ques-cont').dataset.value));

/*------
Function to create 1 question card
*/
function createQues (i)
{
    questLable.innerText = `Question ${i+1}: ${data[i].question}`;
    data[i].answers.forEach((el, index) => {
        createAns(el, index);
    });
}

/*------
Function to create Answers Form
*/
function createAns(ans, ind)
{
    var hold = document.createElement('p');
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = `ans-${ind}`;
    checkbox.name = `ans-${ind}`;
    //Onclick function to allow only 1 option chosed
    checkbox.onclick = function() {
        var checkboxes = document.getElementsByTagName('input');
    	for(var i = 0; i < checkboxes.length; i++)
    	{
    		//uncheck all
    		if(checkboxes[i].checked == true)
    		{
    			checkboxes[i].checked = false;
    		}
    	}
    	//set checked of clicked object again
    	if(checkbox.checked == true)
    	{
    		checkbox.checked = false;
    	}
    	else
    	{
    		checkbox.checked = true;
    	}	
    };
    var label = document.createElement('label');
    label.htmlFor=`ans-${ind}`;
    label.innerText = ans;
    hold.appendChild(checkbox);
    hold.appendChild(label);
    form.appendChild(hold);
}

/*------
Function for Next Questions
*/
async function nextIn() {
    let promise = new Promise((resolve) => {
        while (form.firstChild) {
            form.removeChild(form.lastChild);
        };
        setTimeout(() => resolve(++questCont.dataset.value));
    });
    let i = await promise; 
    createQues(i);
};
/*------
Function for Previous Questions
*/
async function prevIn() {
    let promise = new Promise((resolve) => {
        while (form.firstChild) {
            form.removeChild(form.lastChild);
        };
        resolve(--questCont.dataset.value);
    });
    let i = await promise; 
    createQues(i);
};
//Check if index is out of range
function next()
{
    if (questCont.dataset.value < (data.length - 1)) nextIn()
    else alert('No more questions, please return to previous ones')
};
function prev()
{
    if (questCont.dataset.value > 0) prevIn()
    else alert('No more questions, please move to next ones')
};
