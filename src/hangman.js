class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }

    get puzzle() {
        let puzzle = ''
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        return puzzle
    }

    checkStatus() {  
        
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
    
        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }

    makeGuess(char) {
        // prevent rest of makeGuess from running if user already won/lost game
        if (this.status !== 'playing') {
            return
        }

        char = char.toLowerCase()
        const isUnique = !this.guessedLetters.includes(char)
        const isBadGuess = !this.word.includes(char)
        
        if (isUnique) {
            this.guessedLetters.push(char)
        }
        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }
        this.checkStatus()
    }

    get statusMessage() {
        if (this.status === 'playing') {
            const plural = this.remainingGuesses === 1 ? '' : 'es'
            return `You have ${this.remainingGuesses} remaining guess${plural}.`
        } else if (this.status === 'failed') {
            return `Nice try! The word was ${this.word.join('')}.`
        } else if (this.status === 'finished') {
            return `Great work! You guessed the word.`
        }
    }

}

export { Hangman as default }