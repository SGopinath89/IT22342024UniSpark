function checkAnswersBio() {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    
    const answers = {
        q1: 'c',
        q2: 'b',
        q3: 'a',
        q4: 'c'
        
    };
    
    let correctAnswers = 0;
    
    for (let question in answers) {
        const userAnswer = form.elements[question].value;
        if (userAnswer === answers[question]) {
            correctAnswers++;
        }
    }
    
    const totalQuestions = Object.keys(answers).length;
	let marks = correctAnswers*25;
    resultDiv.textContent = `You got ${correctAnswers} out of ${totalQuestions} correct.
your marks is ${marks}`;
	
}

function checkAnswersIT() {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    
    const answers = {
        q1: 'c',
        q2: 'a',
        q3: 'c',
        q4: 'b'
        
    };
    
    let correctAnswers = 0;
    
    for (let question in answers) {
        const userAnswer = form.elements[question].value;
        if (userAnswer === answers[question]) {
            correctAnswers++;
        }
    }
    
    const totalQuestions = Object.keys(answers).length;
	let marks = correctAnswers*25;
    resultDiv.textContent = `You got ${correctAnswers} out of ${totalQuestions} correct.
your marks is ${marks}`;
	
}

function checkAnswersAmc() {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    
    const answers = {
        q1: 'b',
        q2: 'b',
        q3: 'b',
        q4: 'a'
        
    };
    
    let correctAnswers = 0;
    
    for (let question in answers) {
        const userAnswer = form.elements[question].value;
        if (userAnswer === answers[question]) {
            correctAnswers++;
        }
    }
    
    const totalQuestions = Object.keys(answers).length;
	let marks = correctAnswers*25;
    resultDiv.textContent = `You got ${correctAnswers} out of ${totalQuestions} correct.
your marks is ${marks}`;
	
}
