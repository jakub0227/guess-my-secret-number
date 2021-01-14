import React, {FC, FormEventHandler, useState} from 'react'
import {
	Button,
	ButtonGroup, Dialog,
	DialogContent,
	DialogTitle,
	FormControl, FormControlLabel,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core'

interface DifficultyDialogProps {
	open: boolean
	onClose: () => void
}

export const DifficultyDialog: FC<DifficultyDialogProps> = props => {
	
	const DIFFICULTIES: {
		value: number
		label: string
	}[] = ['Easy', 'Medium', 'Hard'].map((value, index) => ({label: value, value: index}))
	
	const [value, setValue] = useState<number>(0)
	const [helperText, setHelperText] = useState('')
	const [error, setError] = useState(false)
	
	const handleSubmit: FormEventHandler = event => {
		event.preventDefault()
		
		if (value === 0) {
			localStorage.setItem('difficulty', 'easy')
			setHelperText('Its Easy now!')
			setError(false)
		} else if (value === 1) {
			localStorage.setItem('difficulty', 'medium')
			setHelperText('Now its Medium!')
			setError(false)
		} else if (value === 2) {
			localStorage.setItem('difficulty', 'hard')
			setHelperText('Hard mode!')
			setError(false)
		} else {
			setHelperText('You must select desired difficulty !')
			setError(true)
		}
	}
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(+event.target.value)
	}
	
	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
		>
			<DialogTitle>
				Difficulty settings:
			</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<FormControl color='primary' error={error}>
						<FormLabel color='primary'>Select Quiz Difficulty:</FormLabel>
						<RadioGroup name='quiz' value={value} onChange={handleRadioChange}>
							{DIFFICULTIES.map(difficulty => (
								<FormControlLabel control={<Radio/>} {...difficulty}/>
							))}
						</RadioGroup>
						<FormHelperText>{helperText}</FormHelperText>
						<ButtonGroup fullWidth>
							<Button type='submit' variant='outlined' size='small'>
								Save
							</Button>
							<Button variant='outlined' onClick={props.onClose}
							        size='small'>
								Exit
							</Button>
						</ButtonGroup>
					</FormControl>
				</form>
			</DialogContent>
		</Dialog>
	
	)
}