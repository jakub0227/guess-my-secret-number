import React, {FC, useState} from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, lighten, Typography, useMediaQuery, useTheme,
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {DifficultyDialog} from './DifficultyDialog/DifficultyDialog'
import {css} from '@emotion/react'
import {useSnackbar} from 'notistack'

interface EndQuizDialogProps {
	
}

export const EndGameDialog: FC<EndQuizDialogProps> = (props) => {
	const theme = useTheme()
	const styles = {
		dialogRoot: css`
          display: flex;
          flex-direction: column;
          align-items: center;
		`,
		content: css`
          flex-direction: column;
          padding: ${theme.spacing(5)}px;
		`,
		buttonWrap: css`
          ${theme.customMixins.flexCentered};
		`,
		buttons: css`
          min-width: 50%;
          max-width: 80%;
          border-radius: 25px;
          background: linear-gradient(to right, ${lighten(theme.palette.primary.main, 0.1)}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%)
		`,
	}
	const {enqueueSnackbar} = useSnackbar()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const [open, setOpen] = useState(true)
	const [difficultyOpen, setDifficultyOpen] = useState(false)
	const handleDifficultyOpen = () => {
		setOpen(false)
		setDifficultyOpen(true)
	}
	
	return (
		<Dialog
			css={styles.dialogRoot}
			open={open}
			fullScreen={fullScreen}
			keepMounted
		>
			<DialogTitle>
				Dear user !
			</DialogTitle>
			<DialogContent css={styles.content}>
				<DialogContentText color='textPrimary'
				                   variant='h6'
				>
					Thank you for playing our game! From here you can check the High Scores or Change Difficulty by
					increasing or decreasing attempts number. Check details below this text:</DialogContentText>
				<DialogContentText color='textSecondary'
				>
					<Typography component='p'>Easy Mode: 15 attempts</Typography>
					<Typography component='p'>Medium Mode: 10 attempts</Typography>
					<Typography component='p'>Hard Mode: 5 attempts</Typography>
				</DialogContentText>
			</DialogContent>
			<DialogActions css={styles.buttonWrap}>
				<Button variant='contained'
				        css={styles.buttons}
				        color='primary'
				        component={Link}
				        to='/records'
				>
					High Scores
				</Button>
				<Button variant='contained'
				        css={styles.buttons}
				        onClick={handleDifficultyOpen}>
					Difficulty Modes
				</Button>
			</DialogActions>
			{difficultyOpen && <DifficultyDialog open={difficultyOpen} onClose={
				() => {
					setDifficultyOpen(false)
					setOpen(true)
					enqueueSnackbar('New difficulty saved', {variant: 'info'})
				}
			}/>}
		</Dialog>
	)
}