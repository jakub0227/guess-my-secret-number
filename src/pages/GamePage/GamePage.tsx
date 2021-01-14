import React, {useEffect, useState} from 'react'
import {Route} from '../../types/Route'
import {useSnackbar} from 'notistack'
import {badClick, endGame, gameOverWentBad, playSound} from '../../assets/Sounds/UiSound'
import {useDispatch} from 'react-redux'
import {addRecord} from '../../redux/actions/actions'
import {v4} from 'uuid'
import {EndGameCard} from './EndGameCard/EndGameCard'
import {GameControlPanel} from './GameControlPanel/GameControlPanel'

export const GamePage: Route = () => {
	
	//LOGIC
	const dispatch = useDispatch()
	const [value, setValue] = useState<number>(0)
	const [attempts, setAttempts] = useState<number>(1)
	const [gameOver, setGameOver] = useState(false)
	const {enqueueSnackbar} = useSnackbar()
	const [guessTheNumber, setGuessTheNumber] = useState<number>(5)
	const id = v4()
	const date = new Date().toString()
	
	useEffect(() => {
		
		setGuessTheNumber(Math.floor(Math.random() * 100))
		
	}, [gameOver])
	
	const handleSliderChange = (event: any, newValue: number | number[]) => {
		if (!Array.isArray(newValue)) setValue(newValue)
	}
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setValue(+event.target.value)
		}
	}
	const handleBlur = () => {
		if (value < 0) {
			setValue(0)
		} else if (value > 100) {
			setValue(100)
		}
	}
// EASY_MODE = max 15 attempts
// MEDIUM = max 10 attempts - now the limit is for MEDIUM
// HARD = max 5 attempts
	
	const handleGameFunction = () => {
		if (value === guessTheNumber && attempts === 1) {
			enqueueSnackbar('Like a Boss! Great!', {
				variant: 'success',
			})
			setAttempts(attempts + 1)
			setGameOver(true)
			dispatch(addRecord(id, date, attempts, guessTheNumber))
			playSound(endGame)
		} else if (value === guessTheNumber && attempts > 1) {
			enqueueSnackbar('What a successful guess!', {
				variant: 'success',
			})
			setAttempts(attempts + 1)
			setGameOver(true)
			dispatch(addRecord(id, date, attempts, guessTheNumber))
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
		if (value !== guessTheNumber && attempts >= 10) {
			enqueueSnackbar('You have lost the game!', {
				variant: 'error',
			})
			setGameOver(true)
			playSound(gameOverWentBad)
		}
	}
	
	const handleClick = (e: React.ChangeEvent<{}>) => {
		e.preventDefault()
		handleGameFunction()
	}
	
	const handleResetGame = () => {
		setGameOver(false)
	}
	
	return (
		<div>
			{!gameOver ? (
				<GameControlPanel attempts={attempts}
				                  value={value}
				                  blurEffect={handleBlur}
				                  checkGuess={handleClick}
				                  guessNumber={guessTheNumber}
				                  inputChange={handleInputChange}
				                  sliderChange={handleSliderChange}/>
			) : (
				<EndGameCard attempts={attempts} resetAction={handleResetGame}/>
			)}
		</div>
	)
}

GamePage.routeName = '/game'
GamePage.displayName = 'Game'
GamePage.icon = 'games'