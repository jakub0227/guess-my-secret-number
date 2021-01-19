import React, {FormEventHandler, useState} from 'react'
import {
	Button,
	Dialog, DialogActions,
	DialogContent,
	DialogTitle,
	FormControl, FormControlLabel,
	FormHelperText,
	FormLabel, lighten,
	Radio,
	RadioGroup, useTheme,
} from '@material-ui/core'

import {css} from '@emotion/react'
import {difficulties, Difficulty} from '../../../../../redux/userConfig/userConfigReducer'
import {useDispatch} from 'react-redux'
import {setDifficulty} from '../../../../../redux/userConfig/userConfigActions'
import {Route} from '../../../../../types/Route'
import {useSnackbar} from 'notistack'
import {useHistory} from 'react-router-dom'

export const DifficultyDialog: Route = () => {
	const theme = useTheme()
	const styles = {
		dialogRoot: css`
          display: flex;
          flex-direction: column;
          align-items: center;
		`,
		content: css`
          ${theme.customMixins.flexCentered};
          padding: ${theme.spacing(10)}px;
		`,
		selectTxt: css`
          color: ${theme.palette.secondary.main};
          margin-bottom: ${theme.spacing(4)}px;
		`,
		helpText: css`
          color: ${theme.palette.secondary.main};
		`,
		buttonWrap: css`
          margin-top: ${theme.spacing(3)}px;
          ${theme.customMixins.flexCentered};
		`,
		buttons: css`
          padding: ${theme.spacing(1)}px;
          min-width: 50%;
          max-width: 80%;
          border-radius: 25px;
          background: linear-gradient(to right, ${lighten(theme.palette.primary.main, 0.1)}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%)
		`,
	}
	const DIFFICULTIES: {
		value: Difficulty
		label: string
	}[] = difficulties.map((value) => ({label: value, value: value}))
	
	const [value, setValue] = useState<Difficulty>()
	const [helperText, setHelperText] = useState('')
	const [error, setError] = useState(false)
	const [difficultyOpen, setDifficultyOpen] = useState(true)
	const {enqueueSnackbar} = useSnackbar()
	const dispatch = useDispatch()
	const history = useHistory()
	
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value as Difficulty)
		setHelperText(' ')
		setError(false)
	}
	const handleSubmit: FormEventHandler = event => {
		event.preventDefault()
		switch (value) {
			case 'easy':
				setHelperText('Its Easy now! 15 attempts')
				setError(false)
				dispatch(setDifficulty('easy'))
				break
			case 'medium':
				setHelperText('Now its Medium! 10 attempts')
				setError(false)
				dispatch(setDifficulty('medium'))
				break
			case 'hard':
				setHelperText('Hard mode! 5 attempts')
				setError(false)
				dispatch(setDifficulty('hard'))
				break
			default:
				setHelperText('You must select desired difficulty !')
				setError(true)
		}
	}
	
	const handleClose = () => {
		if ((helperText !== 'You must select desired difficulty !' && !error) && (value !== undefined && !error)) {
			setDifficultyOpen(false)
			setError(false)
			enqueueSnackbar('New difficulty mode saved.', {variant: 'info'})
			history.push('/game')
		} else {
			setDifficultyOpen(true)
			enqueueSnackbar('You must select and save to proceed !', {variant: 'error'})
		}
	}
	
	return (
		<Dialog css={styles.dialogRoot}
		        open={difficultyOpen}
		>
			<DialogTitle>
				Difficulty settings:
			</DialogTitle>
			<DialogContent color='primary' css={styles.content}>
				<form onSubmit={handleSubmit}>
					<FormControl color='primary' error={error}>
						<FormLabel css={styles.selectTxt}>Select Quiz Difficulty:</FormLabel>
						<RadioGroup name='game control' value={value} onChange={handleRadioChange}>
							{DIFFICULTIES.map(difficulty => (
								<FormControlLabel control={<Radio/>} {...difficulty}/>
							))}
						</RadioGroup>
						<FormHelperText css={styles.helpText}>{helperText}</FormHelperText>
						<DialogActions css={styles.buttonWrap}>
							<Button css={styles.buttons} type='submit' variant='contained' size='small'>
								Save
							</Button>
							<Button css={styles.buttons}
							        variant='contained'
							        size='small'
							        onClick={handleClose}>
								Exit
							</Button>
						</DialogActions>
					</FormControl>
				</form>
			</DialogContent>
		</Dialog>
	)
}

DifficultyDialog.routeName = '/settings'
DifficultyDialog.icon = 'settings'
DifficultyDialog.displayName = 'Settings'