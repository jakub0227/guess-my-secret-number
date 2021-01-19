import React, {FC} from 'react'
import {Box, Button, Card, Fade, Grid, Icon, Input, lighten, Slider, Typography} from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'
import {css} from '@emotion/react'
import {Link, useHistory} from 'react-router-dom'

type GameControlPanelProps = {
	attempts: number;
	blurEffect: () => void
	checkGuess: (e: React.ChangeEvent<{}>) => void;
	guessNumber: number;
	inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	sliderChange: (event: any, newValue: number | number[]) => void;
	value: number;
	maxAttempts: number
}

export const GameControlPanel: FC<GameControlPanelProps> = (props) => {
	const theme = useTheme()
	const styles = {
		root: css`
          display: flex;
          flex-direction: column;
          ${theme.customMixins.flexCentered};
          padding: ${theme.spacing(5)}px;
          border-radius: 30px;
          background: linear-gradient(135deg, ${lighten(theme.palette.primary.main, 0.1)}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%);
          height: 450px;
          width: 450px;
          max-height: 80vh;
          max-width: 80vh;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          transition: 0.3s;
          z-index: 100;


          :hover {
            box-shadow: 0 16px 70px -12.125px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(4.0px);
            -webkit-backdrop-filter: blur(4.0px);
          }
		`,
		cardTitle: css`
          margin-top: ${theme.spacing(3)}px;
          padding: ${theme.spacing(3)}px;
		`,
		gameControl: css`
          flex-grow: 1;
          margin-top: ${theme.spacing(3)}px;
          justify-content: space-around;
		`,
		buttonWrap: css`
          display: flex;
          position: relative;
          padding: ${theme.spacing(1)}px;
		`,
		emoji: css`
          margin: ${theme.spacing(2)}px;
          color: ${theme.palette.secondary.light}
		`,
		
		slider: css`
		
		`,
		input: css`
          color: ${theme.palette.primary.dark}
		`,
		guessButton: css`
          margin: ${theme.spacing(3)}px;
          min-width: 150px;
          border-radius: 30px;
          color: ${theme.palette.secondary.contrastText};
          background: linear-gradient(-135deg, ${theme.palette.secondary.dark}, ${lighten(theme.palette.secondary.light, 0.5)} 80%)
		`,
		settingButton: css`
          margin: ${theme.spacing(3)}px;
          min-width: 150px;
          border-radius: 30px;
          color: ${theme.palette.secondary.contrastText};
          background: linear-gradient(-135deg, ${theme.palette.primary.dark}, ${lighten(theme.palette.primary.light, 0.5)} 80%)
		
		`,
	}
	
	return (
		<Fade in timeout={1000}>
			<Card elevation={6} css={styles.root}>
				<Typography css={styles.cardTitle} variant='h5'>
					Try to find my number... {props.guessNumber}
				</Typography>
				<Grid css={styles.gameControl} container spacing={3} alignItems='center'>
					<Grid item>
						<Icon css={styles.emoji}>emoji_emotions</Icon>
					</Grid>
					<Grid item xs>
						<Slider
							valueLabelDisplay={'auto'}
							css={styles.slider}
							value={props.value}
							onChange={props.sliderChange}
						/>
					</Grid>
					<Grid item>
						<Input
							inputMode='numeric'
							css={styles.input}
							value={props.value}
							margin='dense'
							onChange={props.inputChange}
							onBlur={props.blurEffect}
							inputProps={{
								step: 1,
								min: 0,
								max: 100,
								type: 'number',
							}}
						/>
					</Grid>
				</Grid>
				<Box css={styles.buttonWrap}>
					<Button
						css={styles.guessButton}
						onClick={props.checkGuess}
						size='medium'
						variant='contained'>
						Guess
					</Button>
					{props.attempts === 1 ? (
						<Button
							size='medium'
							variant='contained'
							component={Link}
							to='/settings'
							css={styles.settingButton}>
							Settings
						</Button>
					) : null}
				</Box>
				<Typography variant='h6'>
					Attempt {props.attempts - 1} / {props.maxAttempts}
				</Typography>
			</Card>
		</Fade>
	
	)
}