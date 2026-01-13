# TriviaStreak 🎯

A fun and engaging trivia game that challenges you to answer as many questions correctly in a row as possible!

## Features

- 🎮 **Streak-based scoring**: Answer questions correctly to build your streak
- 🏆 **High score tracking**: Your best streak is saved and displayed
- 📚 **Various categories**: Questions from multiple categories and difficulty levels
- 🎨 **Beautiful UI**: Modern, responsive design that works on all devices
- 💾 **Persistent scores**: Your best streak is saved in browser localStorage
- 🌐 **Real trivia questions**: Powered by the Open Trivia Database API

## How to Play

1. Open `index.html` in your web browser
2. Click "Start Game" to begin
3. Read each question carefully and select your answer
4. Keep answering correctly to build your streak
5. One wrong answer ends your streak and the game
6. Try to beat your best streak!

## Scoring System

- Each correct answer increases your current streak by 1
- Your best streak (high score) is automatically saved
- Wrong answers reset your current streak to 0
- The goal is to achieve the longest streak possible

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling with animations and gradients
- **JavaScript (ES6+)**: Game logic and API integration
- **Open Trivia Database API**: Source of trivia questions

## Installation

No installation required! Simply:
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Start playing!

## Live Demo

To run locally:
```bash
# Clone the repository
git clone https://github.com/ayersdecker/Trivia.git
cd Trivia

# Open in browser (or use a local server)
open index.html
```

For the best experience, use a local web server:
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

## API Information

This project uses the [Open Trivia Database](https://opentdb.com/) API to fetch trivia questions. No API key is required.

## Browser Compatibility

Works on all modern browsers including:
- Chrome/Edge
- Firefox
- Safari
- Opera

## License

MIT License - see LICENSE file for details

## Contributing

Feel free to open issues or submit pull requests to improve the game!