import React, {useState} from 'react'
import {Route} from '../../types/Route'
import {Button, Card, Fade, Grid, Icon, Input, lighten, Slider, Typography} from '@material-ui/core'
import {useSnackbar} from 'notistack'
import useTheme from '@material-ui/core/styles/useTheme'
import {css} from '@emotion/react'
import {Link} from 'react-router-dom'

// @ts-ignore
import errorSound from '../../assets/Sounds/errorSound.wav'
// @ts-ignore
import celebration from '../../assets/Sounds/celebration.wav'
// @ts-ignore
import notificationBeep from '../../assets/Sounds/notificationBeep.wav'
// @ts-ignore
import gameOverBad from '../../assets/Sounds/gameOverBad.wav'

let guessTheNumber: number = Math.floor(Math.random() * 100)
console.log(guessTheNumber)

export const GamePage: Route = () => {
	//STYLING
	const theme = useTheme()
	const styles = {
		root: css`
          display: flex;
          flex-direction: column;
          ${theme.customMixins.flexCentered};
          padding: ${theme.spacing(5)}px;
          border-radius: 30px;
          background: linear-gradient(135deg, ${theme.palette.primary.main}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%);
          height: 450px;
          width: 450px;
          max-height: 80vh;
          max-width: 80vh;
          box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
          z-index: 100;

          :hover {
            box-shadow: 0 16px 70px -12.125px rgba(0, 0, 0, 0.3)
          }
		
		`,
		gameControl: css`
          flex-grow: 1;
          margin-top: ${theme.spacing(1)}px
		`,
		guessButton: css`
          margin: ${theme.spacing(3)}px;
          min-width: 150px;
          border-radius: 30px;
          color: ${theme.palette.secondary.contrastText};
          background: linear-gradient(-135deg, ${theme.palette.secondary.dark}, ${lighten(theme.palette.secondary.light, 0.5)} 80%)
		`,
	}
	
	const badClick = new Audio(errorSound)
	const endGame = new Audio(celebration)
	const gameOverWentBad = new Audio(gameOverBad)
	const playSound = (audioFile: any) => {
		audioFile.play()
	}
	
	//LOGIC
	const [value, setValue] = useState<number | string | Array<number | string>>(0)
	const [attempts, setAttempts] = useState<number>(0)
	const [gameOver, setGameOver] = useState(false)
	const {enqueueSnackbar} = useSnackbar()
	
	const handleSliderChange = (event: any, newValue: number | number[]) => {
		setValue(newValue)
	}
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value === '' ? '' : Number(event.target.value))
	}
	const handleBlur = () => {
		if (value < 0) {
			setValue(0)
		} else if (value > 100) {
			setValue(100)
		}
	}

// EASY_MODE = max 15 attempts
// MEDIUM = max 10 attempts
// HARD = max 5 attempts
	
	const handleGameFunction = () => {
		if (value === guessTheNumber && attempts === 0) {
			enqueueSnackbar('Like a Boss! Great!', {
				variant: 'success',
			})
			setAttempts(attempts + 1)
			setGameOver(true)
			playSound(endGame)
		} else if (value === guessTheNumber && attempts >= 1) {
			enqueueSnackbar('What a successful guess!', {
				variant: 'success',
			})
			setAttempts(attempts + 1)
			setGameOver(true)
			playSound(endGame)
		}
		if (value > guessTheNumber) {
			enqueueSnackbar('Too high, guess again!', {
				variant: 'warning',
			})
			setAttempts(attempts + 1)
			playSound(badClick)
		}
		if (value < guessTheNumber) {
			enqueueSnackbar('Too Low, guess again!', {
				variant: 'warning',
				
			})
			setAttempts(attempts + 1)
			playSound(badClick)
		}
		if (value !== guessTheNumber && attempts >= 9) {
			enqueueSnackbar('You have lost the game!', {
				variant: 'error',
			})
			setGameOver(true)
			playSound(gameOverWentBad)
		}
	}
	
	const handleClick = (e: React.ChangeEvent<{}>) => {
		handleGameFunction()
		e.preventDefault()
	}
	
	const handleResetGame = () => {
		setGameOver(false)
	}
	
	return (
		<div>
			{!gameOver ? (
				<Fade in timeout={1000}>
					<Card elevation={5} css={styles.root}>
						<Typography variant='h5'>
							Try to find my number...
						</Typography>
						<Grid css={styles.gameControl} container spacing={2} alignItems='center'>
							<Grid item>
								<Icon>emoji_emotions</Icon>
							</Grid>
							<Grid item xs>
								<Slider
									value={typeof value === 'number' ? value : 0}
									onChange={handleSliderChange}
								/>
							</Grid>
							<Grid item>
								<Input
									value={value}
									margin='dense'
									onChange={handleInputChange}
									onBlur={handleBlur}
									inputProps={{
										step: 1,
										min: 0,
										max: 100,
										type: 'number',
									}}
								/>
							</Grid>
						</Grid>
						<Button
							css={styles.guessButton}
							onClick={handleClick}
							color='primary'
							size='medium'
							variant='contained'>
							Guess
						</Button>
						<Typography variant='h6'>
							Try nr: {attempts}
						</Typography>
					</Card>
				</Fade>
			) : (
				<Fade in timeout={1000}>
					<Card elevation={5} css={styles.root}>
						<Typography variant='h6'>
							Game Over!
						</Typography>
						<Grid css={styles.gameControl} container spacing={2} alignItems='center'>
							<Grid item xs>
								<Typography variant='h6'>
									Attempts: {attempts} / 10
								</Typography>
							</Grid>
							<Grid item xs>
								<Button variant='outlined'
								        component={Link}
								        to='/'
								        onClick={handleResetGame}>
									Try Again?
								</Button>
							</Grid>
						</Grid>
					</Card>
				</Fade>
			)}
		</div>
	)
}

GamePage.routeName = '/game'
GamePage.displayName = 'Game'
GamePage.icon = 'games'