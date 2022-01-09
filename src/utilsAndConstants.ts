
export enum RowStatus {
    NOT_STARTED,
    ONGOING,
    COMPLETED
}

export enum BlockColor {
    UNKNOWN, INVALID_CHAR, CORRECT_CHAR_WRONG_POSITION, CORRECT_CHAR
}

export enum GameState {
    WIN = 'WIN',
    LOSE = 'LOSE',
    ONGOING = 'ONGOING'
}

export const PERMITTED_CHARS = 'qwertyuiopasdfghjklzxcvbnm'.split("")
export const ENTER_KEY = '{enter}'
export const BACKSPACE_KEY = '{bksp}'

export const ALLOWED_KEYS = new Set(PERMITTED_CHARS.concat(ENTER_KEY).concat(BACKSPACE_KEY))

export const USE_UPPER_CASE = true;
export const TOTAL_GUESSES = 6;
export const NUM_LETTERS = 5;

export const KEYBOARD_LAYOUT_LOWERCASE = {
    'default': [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{enter} z x c v b n m {bksp}'
    ]
}

export const KEYBOARD_LAYOUT_UPPERCASE = {
    'default': [
        'Q W E R T Y U I O P',
        'A S D F G H J K L',
        '{enter} Z X C V B N M {bksp}'
      ]
}
