// TriviaStreak - Game Logic

class TriviaGame {
    constructor() {
        this.currentStreak = 0;
        this.bestStreak = this.loadBestStreak();
        this.currentQuestion = null;
        this.isAnswering = false;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateScoreDisplay();
    }

    initializeElements() {
        // Screens
        this.startScreen = document.getElementById('start-screen');
        this.questionScreen = document.getElementById('question-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.loadingScreen = document.getElementById('loading-screen');

        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');

        // Question elements
        this.categoryEl = document.getElementById('category');
        this.difficultyEl = document.getElementById('difficulty');
        this.questionEl = document.getElementById('question');
        this.answersEl = document.getElementById('answers');
        this.feedbackEl = document.getElementById('feedback');

        // Score elements
        this.currentStreakEl = document.getElementById('current-streak');
        this.bestStreakEl = document.getElementById('best-streak');
        this.finalStreakEl = document.getElementById('final-streak');
        this.bestStreakDisplayEl = document.getElementById('best-streak-display');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.startGame());
    }

    showScreen(screen) {
        [this.startScreen, this.questionScreen, this.gameOverScreen, this.loadingScreen].forEach(s => {
            s.classList.add('hidden');
        });
        screen.classList.remove('hidden');
    }

    async startGame() {
        this.currentStreak = 0;
        this.updateScoreDisplay();
        await this.loadQuestion();
    }

    async loadQuestion() {
        this.showScreen(this.loadingScreen);
        this.isAnswering = false;

        try {
            const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = await response.json();

            if (data.response_code === 0 && data.results.length > 0) {
                this.currentQuestion = data.results[0];
                this.displayQuestion();
            } else {
                throw new Error('Failed to load question');
            }
        } catch (error) {
            console.error('Error fetching question:', error);
            alert('Failed to load question. Please check your internet connection and try again.');
            this.showScreen(this.startScreen);
        }
    }

    displayQuestion() {
        // Decode HTML entities
        const question = this.decodeHTML(this.currentQuestion.question);
        const category = this.decodeHTML(this.currentQuestion.category);
        const difficulty = this.currentQuestion.difficulty;

        // Set question details
        this.questionEl.textContent = question;
        this.categoryEl.textContent = category;
        this.difficultyEl.textContent = difficulty.toUpperCase();
        this.difficultyEl.className = `difficulty ${difficulty}`;

        // Prepare answers
        const answers = [
            this.currentQuestion.correct_answer,
            ...this.currentQuestion.incorrect_answers
        ];
        
        // Shuffle answers
        this.shuffleArray(answers);

        // Display answers
        this.answersEl.innerHTML = '';
        this.feedbackEl.classList.add('hidden');

        answers.forEach(answer => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = this.decodeHTML(answer);
            btn.addEventListener('click', () => this.checkAnswer(answer, btn));
            this.answersEl.appendChild(btn);
        });

        this.showScreen(this.questionScreen);
    }

    checkAnswer(selectedAnswer, button) {
        if (this.isAnswering) return;
        this.isAnswering = true;

        // Disable all answer buttons
        const allButtons = this.answersEl.querySelectorAll('.answer-btn');
        allButtons.forEach(btn => btn.disabled = true);

        const isCorrect = selectedAnswer === this.currentQuestion.correct_answer;

        if (isCorrect) {
            button.classList.add('correct');
            this.feedbackEl.textContent = '✓ Correct!';
            this.feedbackEl.className = 'feedback correct';
            this.feedbackEl.classList.remove('hidden');

            this.currentStreak++;
            this.updateScoreDisplay();

            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
                this.saveBestStreak();
                this.updateScoreDisplay();
            }

            // Load next question after delay
            setTimeout(() => {
                this.loadQuestion();
            }, 1500);
        } else {
            button.classList.add('incorrect');
            
            // Highlight the correct answer
            allButtons.forEach(btn => {
                if (this.decodeHTML(this.currentQuestion.correct_answer) === btn.textContent) {
                    btn.classList.add('correct');
                }
            });

            this.feedbackEl.textContent = '✗ Wrong answer!';
            this.feedbackEl.className = 'feedback incorrect';
            this.feedbackEl.classList.remove('hidden');

            // Show game over screen after delay
            setTimeout(() => {
                this.showGameOver();
            }, 2000);
        }
    }

    showGameOver() {
        this.finalStreakEl.textContent = this.currentStreak;
        this.bestStreakDisplayEl.textContent = this.bestStreak;
        this.showScreen(this.gameOverScreen);
    }

    updateScoreDisplay() {
        this.currentStreakEl.textContent = this.currentStreak;
        this.bestStreakEl.textContent = this.bestStreak;
    }

    loadBestStreak() {
        const saved = localStorage.getItem('triviaStreakBest');
        return saved ? parseInt(saved, 10) : 0;
    }

    saveBestStreak() {
        localStorage.setItem('triviaStreakBest', this.bestStreak.toString());
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TriviaGame();
});
