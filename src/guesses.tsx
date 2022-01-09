import { FunctionComponent } from "react";
import GuessRow from "./guessRow";
import { RowStatus } from "./utilsAndConstants";


interface GuessesProps {
    activeRow: number;
    allowedGuesses: number;
    correctWord: string;
    currentOnGoingGuess: string;
    userGuesses: string[];
}

const Guesses: FunctionComponent<GuessesProps> = (props: GuessesProps) => {

    const {correctWord, allowedGuesses, activeRow, currentOnGoingGuess, userGuesses} = props;
    
    const getRowStatus = (row: number): RowStatus => {
        if (row < userGuesses.length) {
            return RowStatus.COMPLETED
        }
        if (row === activeRow) {
            return RowStatus.ONGOING
        }
        return RowStatus.NOT_STARTED
    }

    const getRowContent = (row: number): string => {
        if (row < userGuesses.length) {
            return userGuesses[row]
        }
        if (row === activeRow) {
            return currentOnGoingGuess
        }
        return ""
    }

    return (
        <div>
           {
               [...Array(allowedGuesses)].map((_, row: number) => {
                   return (
                       <div key={row} style={{margin: 10}}>
                           <GuessRow rowContent={getRowContent(row)} correctWord={correctWord} rowStatus={getRowStatus(row)}/>
                       </div>
                   )
               })
           }
           
        </div>
    )

}

export default Guesses