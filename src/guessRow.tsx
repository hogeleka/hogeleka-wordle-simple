import { FunctionComponent, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { BlockColor, RowStatus } from "./utilsAndConstants";


interface GuessRow {
    correctWord: string;
    rowContent: string;
    rowStatus: RowStatus;
}

const getBlockColorClass = (blockColor: BlockColor): string => {
    switch(blockColor) {
        case BlockColor.INVALID_CHAR:
            return 'grey'
        case BlockColor.CORRECT_CHAR:
            return 'green'
        case BlockColor.CORRECT_CHAR_WRONG_POSITION:
            return 'yellow'
        default:
            return 'white'
    }
}

const GuessRow: FunctionComponent<GuessRow> = (props: GuessRow) => {

    const {rowStatus, correctWord, rowContent} = props;
    const ongoingRowColors = new Array(correctWord.length)
    ongoingRowColors.fill(BlockColor.UNKNOWN);

    const [rowColors, setRowColors] = useState<BlockColor[]>(ongoingRowColors)
    const correctChars = correctWord.split('');

    const getChar = (index: number): string => {
        return index < rowContent.length ? rowContent[index] : ""
    }

    useEffect(() => {
        if (rowStatus === RowStatus.COMPLETED) {
            setRowColors(getCompletedRowColors(rowContent, correctWord))
        } else {
            setRowColors(ongoingRowColors);
        }
    }, [rowStatus])


    const getCompletedRowColors = (rowContent: string, correctWord: string): BlockColor[] => {
        
        const colors: BlockColor[] = []
        const [correctWordSplit, rowContentSplit] = [correctWord.split(""), rowContent.split("")]
        const availableCharCounts: Map<string, number> = new Map();
        correctWordSplit.forEach((char: string) => {
            colors.push(BlockColor.UNKNOWN);
            const currCharCount = availableCharCounts.get(char) ?? 0
            availableCharCounts.set(char, currCharCount + 1)
        })
        const validChars: Set<string> = new Set(correctWordSplit)

        // fill in the correct and incorrect ones first
        rowContentSplit.forEach((inputChar: string, currentIndex: number) => {
            if (inputChar === correctWord.charAt(currentIndex)) {
                colors[currentIndex] = BlockColor.CORRECT_CHAR
                const currCountForChar = availableCharCounts.get(inputChar) ?? 0
                availableCharCounts.set(inputChar, currCountForChar-1)
            } else if (!validChars.has(inputChar)) {
                colors[currentIndex] = BlockColor.INVALID_CHAR
            }
        })

        //fill in the 'wright character wrong spot'
        // The way this runs, we will pick the first available spot for yellow
        // for example, if you have the row content as peplp, and the correct word is apple:
        // then the first p spot gets 'yellow' and last p spot will get 'grey' (invalid)
        rowContentSplit.forEach((char: string, currentPosition: number) => {
            if (colors[currentPosition] === BlockColor.UNKNOWN) { 
                const availableCount = availableCharCounts.get(char) ?? 0
                if (availableCount > 0) {
                    colors[currentPosition] = BlockColor.CORRECT_CHAR_WRONG_POSITION
                    availableCharCounts.set(char, availableCount-1)
                }
            }
        })

        // other unknown spots should be invalid
        rowContentSplit.forEach((_, position: number) => {
            if (colors[position] === BlockColor.UNKNOWN) {
                colors[position] = BlockColor.INVALID_CHAR
            }
        })

        return colors
    }


    return (
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            {
                correctChars.map((_, index: number) => {
                    return (
                        <Button
                            key={index}
                            size="large" 
                            style={
                                {
                                    width: 30,
                                    height: 30,
                                    minWidth: 30,
                                    minHeight: 30,
                                    maxWidth: 30,
                                    maxHeight: 30,
                                    fontWeight:  'bold',
                                    color: 'black',
                                    textTransform: 'lowercase',
                                    backgroundColor: getBlockColorClass(rowColors[index])
                                }
                            }
                        >
                            {getChar(index)}
                        </Button>
                    )
                })
            }
        </ButtonGroup>
    )

}

export default GuessRow;