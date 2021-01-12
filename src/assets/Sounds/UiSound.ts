// @ts-ignore
import notificationBeep from "../../assets/Sounds/notificationBeep.wav";
// @ts-ignore
import errorSound from "../../assets/Sounds/errorSound.wav";
// @ts-ignore
import celebration from "../../assets/Sounds/celebration.wav";
// @ts-ignore
import gameOverBad from "../../assets/Sounds/gameOverBad.wav";

export const badClick = new Audio(errorSound);
export const endGame = new Audio(celebration);
export const gameOverWentBad = new Audio(gameOverBad);
export const startGameSound = new Audio(notificationBeep);

export const playSound = (audioFile: any) => {
  audioFile.play();
};
