import React from 'react'
import {Route} from '../../types/Route'
import {Box, Button, Container, lighten, Typography, Zoom} from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'
import {css} from '@emotion/react'
import {Link} from 'react-router-dom'
import {playSound, startGameSound} from '../../assets/Sounds/UiSound'

export const HomePage: Route = () => {
	const theme = useTheme()
	const styles = {
		root: css`
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
		`,
		startButton: css`
          margin: ${theme.spacing(10)}px;
          min-width: 150px;
          border-radius: 30px;
          background: linear-gradient(135deg, ${theme.palette.primary.main}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%)
		`,
	}
	
	return (
		<Container css={styles.root}>
			<Box>
				<Zoom in timeout={1000}>
					<Typography variant='h4'>
						Welcome to
					</Typography>
				</Zoom>
				<Zoom in timeout={1000}>
					<Typography variant='h3'>
						My Secret Number
					</Typography>
				</Zoom>
				<Zoom in timeout={1000}>
					<Typography variant='h4'>
						Game
					</Typography>
				</Zoom>
				<Zoom in timeout={1000}>
					<Button css={styles.startButton}
					        color='inherit'
					        variant='contained'
					        component={Link}
					        to='/game'
					        onClick={() => playSound(startGameSound)}>
						Start
					</Button>
				</Zoom>
			</Box>
		</Container>
	)
}

HomePage.routeName = '/'
HomePage.displayName = 'Home'
HomePage.icon = 'home'
