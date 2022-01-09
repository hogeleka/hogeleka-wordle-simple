import { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GameState } from "./utilsAndConstants"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface GameSummaryScreen {
    gameState: GameState;
    correctWord: string;
    usedGuesses: number;
    showModal: boolean;
    allowedGuesses: number;
    handleClose: () => void;
}

const SummaryModal: FunctionComponent<GameSummaryScreen> = (props: GameSummaryScreen) => {

  const { gameState, correctWord, usedGuesses, showModal, handleClose, allowedGuesses } = props;

  const endText = gameState === GameState.WIN ? 'Congrats! you win :)' :
                  gameState === GameState.LOSE ? 'Uh-oh! Game over :(' : ''

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>
            <Typography style={{textAlign: "center"}} id="transition-modal-title" variant="h6" component="h2">
              {endText}
            </Typography>
            <Typography style={{textAlign: "center"}} id="transition-modal-description" sx={{ mt: 2 }}>
            {`You used ${usedGuesses} out of ${allowedGuesses} attempts`}
            </Typography>
            <Typography style={{textAlign: "center"}}>{`The correct answer is ${correctWord}`}</Typography>
            <div style={{textAlign: "center"}}><Button  onClick={()=>{handleClose()}}>Close</Button></div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SummaryModal;