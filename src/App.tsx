import React, {FC, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Icon, StylesProvider} from '@material-ui/core'
import {Layout} from './hoc/Layout/Layout'
import {routeList} from './hoc/Layout/Navigation/NavigationItems/routeList'
import {SnackbarProvider} from 'notistack'
import {Theme} from './hoc/Theme/Theme'
import {initRecords} from './redux/record/recordActions'
import {useDispatch, useSelector} from 'react-redux'
import {recordsSelector} from './redux/record/recordSelectors'
import {userConfigSelector} from './redux/userConfig/userConfigSelectors'
import {setDifficulty} from './redux/userConfig/userConfigActions'

export const App: FC = () => {
	
	const dispatch = useDispatch()
	const records = useSelector(recordsSelector)
	const {difficulty} = useSelector(userConfigSelector)
	
	useEffect(() => {
		localStorage.records = JSON.stringify(records)
	}, [records])
	
	useEffect(() => {
		localStorage.difficulty = JSON.stringify(difficulty)
	}, [difficulty])
	
	useEffect(() => {
		if (localStorage.records) {
			dispatch(initRecords(JSON.parse(localStorage.records)))
		}
		if (localStorage.difficulty) {
			dispatch((setDifficulty(JSON.parse(localStorage.difficulty))))
		}
		
	}, [])
	
	return (
		<BrowserRouter>
			<StylesProvider injectFirst>
				<SnackbarProvider autoHideDuration={2500}
				                  maxSnack={3}
				                  anchorOrigin={{
					                  vertical: 'bottom',
					                  horizontal: 'left',
				                  }}
				                  iconVariant={{
					                  success: <Icon>sentiment_very_satisfied</Icon>,
					                  error: <Icon>sentiment_very_dissatisfied</Icon>,
					                  warning: <Icon>sentiment_dissatisfied</Icon>,
					                  info: <Icon>info</Icon>,
				                  }}
				>
					<Theme>
						<Layout>
							<Switch>
								<Route>
									{routeList.map(route => (
										<Route exact path={route.routeName} component={route}/>
									))}
								</Route>
							</Switch>
						</Layout>
					</Theme>
				</SnackbarProvider>
			</StylesProvider>
		</BrowserRouter>
	)
}
