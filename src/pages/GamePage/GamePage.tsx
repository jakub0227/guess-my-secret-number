import React, {useState} from 'react'
import {Route} from '../../types/Route'
import {Box, Button, Card, Grid, Icon, Input, lighten, Slider, Typography} from '@material-ui/core'
import {useSnackbar} from 'notistack'
import useTheme from '@material-ui/core/styles/useTheme'
import {css} from '@emotion/react'

const guessTheNumber: number = Math.floor(Math.random() * 100)
console.log(guessTheNumber)

export const GamePage: Route = () => {
	//STYLING
	const theme = useTheme()
	const styles = {
		root: css`
          display: flex;
          flex-direction: column;
          padding: ${theme.spacing(5)}px;
          border-radius: 30px;
          background: linear-gradient(135deg, ${theme.palette.primary.main}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%);
          height: 450px;
          width: 450px;
          max-height: 80vh;
          max-width: 80vh;
		`,
		gameControl: css`
          flex-grow: 1;
          margin-top: ${theme.spacing(1)}px
		`,
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
	
	const EASY_MODE = 15
	// const MEDIUM = 10
	// const HARD = 5
	
	const endGame = EASY_MODE
	
	const handleGameFunction = () => {
		if (value === guessTheNumber) {
			enqueueSnackbar('What a successful guess!', {
				variant: 'success',
			})
			setGameOver(true)
		}
		if (value > guessTheNumber) {
			enqueueSnackbar('Too high, guess again!', {
				variant: 'error',
			})
			setAttempts(attempts + 1)
		}
		if (value < guessTheNumber) {
			enqueueSnackbar('Too Low, guess again!', {
				variant: 'error',
			})
			setGameOver(false)
			setAttempts(attempts + 1)
		}
	}
	
	const handleClick = (e: React.ChangeEvent<{}>) => {
		handleGameFunction()
		e.preventDefault()
	}
	
	return (
		<div>
			{!gameOver ? (
				<Card elevation={7} css={styles.root}>
					<Typography variant='h5'>
						Try to guess the number...
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
			) : (
				<Box>
					<Typography variant='h6'>
						Congratulations!
					</Typography>
					<Typography variant='h6'>
						You did it in {attempts} attempts.
					</Typography>
				</Box>
			)}
		</div>
	
	)
}

GamePage.routeName = '/game'
GamePage.displayName = 'Game'
GamePage.icon = 'games'