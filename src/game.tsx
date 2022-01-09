import { Button } from "@mui/material";
import { FunctionComponent, useState, useEffect } from "react";
import { AVAILABLE_WORDS } from "./dictionary";
import Guesses from "./guesses";
import KeyboardWrapper from './KeyboardWrapper';
import { ALLOWED_KEYS, BACKSPACE_KEY, ENTER_KEY, GameState, PERMITTED_CHARS } from "./utilsAndConstants";
import SummaryModal from "./gameSummary";

interface GameScreenProps {
}


const onlyEnglishChars = (word: string): boolean => {
    const invalidChars = word.split('').filter(c => !PERMITTED_CHARS.includes(c))
    return invalidChars.length === 0;
}


const getWord = (numLettersInWord: number): string => {
    let charCount: number = 5
    if (numLettersInWord > 3 && numLettersInWord < 8) {
        charCount = numLettersInWord
    }
    const nLetterWords = AVAILABLE_WORDS.filter(word => word.length === numLettersInWord && onlyEnglishChars(word))
    
    return nLetterWords[Math.floor(Math.random() * nLetterWords.length)];
}

const GameScreen: FunctionComponent<GameScreenProps> = (props: GameScreenProps) => {

    const totalGuesses = 6;
    const numberOfLetters = 5;
    const [correctWord, setCorrectWord] = useState<string>(getWord(numberOfLetters))
    const [guesses, setGuesses] = useState<string[]>([]);
    const [invalidLetters, setInvalidLetters] = useState<Set<string>>(new Set())
    const [currentActiveRow, setCurrentActiveRow] = useState<number>(0)
    const [currentInput, setCurrentInput] = useState<string>("");
    const [gameState, setGameState] = useState<GameState>(GameState.ONGOING);
    const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

    useEffect(() => {
        if (guesses.length > 0) {
            if (guesses[guesses.length-1] === correctWord) {
                setGameState(GameState.WIN)
            } else if (guesses.length === totalGuesses) {
                setGameState(GameState.LOSE)
            }
        }
    }, [guesses])

    useEffect(() => {
        setShowSummaryModal(gameState !== GameState.ONGOING)
    }, [gameState, guesses])

    const handleCloseModal = (): void => {
        setShowSummaryModal(false);
    }

    
    const handleKeyPress = (button: string): void => {
        if (ALLOWED_KEYS.has(button) && gameState === GameState.ONGOING) {
            if (button === BACKSPACE_KEY) {
                if (currentInput.length > 0) {
                    setCurrentInput(currentInput.slice(0,-1))
                }
            } else if (button === ENTER_KEY) {
                if (currentInput.length === correctWord.length) {
                    setGuesses(guesses.concat([currentInput]))
                    const currentInvalidLetters = invalidLetters;
                    currentInput.split('').forEach(c => {if (!correctWord.includes(c)) currentInvalidLetters.add(c)})
                    setInvalidLetters(currentInvalidLetters);
                    setCurrentInput("")
                    setCurrentActiveRow(currentActiveRow+1);
                }
            } else {
                if (currentInput.length < correctWord.length && !invalidLetters.has(button)) {
                    setCurrentInput(currentInput + button)
                }
            }
        }
    }

   const resetGame = (): void => {
    setGuesses([])
    setCurrentActiveRow(0)
    setCurrentInput("")
    setGameState(GameState.ONGOING)
    setCorrectWord(getWord(numberOfLetters))
    setShowSummaryModal(false);
    setInvalidLetters(new Set())
   }

   const getStringFromSet = (inputSet: Set<string>): string => {
       return `{${Array.from(inputSet).join(', ')}}`
   }

    return (
        <div style={{textAlign: 'center'}}>
            {/* <h3>{`currect word: ${correctWord}`}</h3>
            <h3>{`you have ${totalGuesses - guesses.length} remaining guesses`}</h3>
            <h3>{`current game status: ${gameState}`}</h3> */}
            <h3>WORDLE</h3>
            <p>{`invalid letters: ${getStringFromSet(invalidLetters)}`}</p>
            <Guesses userGuesses={guesses} activeRow={currentActiveRow} currentOnGoingGuess={currentInput} correctWord={correctWord} allowedGuesses={totalGuesses}/>
            <KeyboardWrapper onKeyPress={handleKeyPress}/>
            <Button onClick={resetGame}>Reset Game!</Button>
            <SummaryModal 
                gameState={gameState}
                correctWord={correctWord}
                usedGuesses={guesses.length}
                showModal={showSummaryModal}
                allowedGuesses={totalGuesses}
                handleClose={handleCloseModal}
            />
            <p>Although this variation is developed by Chukwubueze Hosea Ogeleka, it is inspired by the brilliant work of Josh Wardle</p>
            <p>You can play <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank"> Josh Wardle's original here</a></p>
            <p>Read more about <a href="https://www.nytimes.com/2022/01/03/technology/wordle-word-game-creator.html" target="_blank">Josh Wardle's WORDLE story here</a></p>
            {/* <h3>{`correct word: ${correctWord}`}</h3> */}
        </div>
    )

}

export default GameScreen