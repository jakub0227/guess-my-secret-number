import React, {FC, FormEventHandler, useState} from 'react'
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

interface DifficultyDialogProps {
	open: boolean
	onClose: () => void
}

export const DifficultyDialog: FC<DifficultyDialogProps> = props => {
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
		value: string
		label: string
	}[] = ['Easy', 'Medium', 'Hard'].map((value) => ({label: value, value: value}))
	
	const [value, setValue] = useState('')
	const [helperText, setHelperText] = useState('')
	const [error, setError] = useState(false)
	
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value)
		setHelperText(' ')
		setError(false)
	}
	const handleSubmit: FormEventHandler = event => {
		event.preventDefault()
		if (value === 'Easy') {
			localStorage.setItem('Difficulty', 'easy')
			setHelperText('Its Easy now! 15 attempts')
			setError(false)
		} else if (value === 'Medium') {
			localStorage.setItem('Difficulty', 'medium')
			setHelperText('Now its Medium! 10 attempts')
			setError(false)
		} else if (value === 'Hard') {
			localStorage.setItem('Difficulty', 'hard')
			setHelperText('Hard mode! 5 attempts')
			setError(false)
		} else {
			setHelperText('You must select desired difficulty !')
			setError(true)
		}
	}
	
	return (
		<Dialog css={styles.dialogRoot}
		        open={props.open}
		        onClose={props.onClose}
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
							<Button css={styles.buttons} variant='contained' onClick={props.onClose}
							        size='small'>
								Exit
							</Button>
						</DialogActions>
					</FormControl>
				</form>
			</DialogContent>
		</Dialog>
	
	)
}