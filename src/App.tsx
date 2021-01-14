import React, {FC, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Icon, StylesProvider, Typography} from '@material-ui/core'
import {Layout} from './hoc/Layout/Layout'
import {routeList} from './hoc/Layout/Navigation/NavigationItems/routeList'
import {SnackbarProvider} from 'notistack'
import {Theme} from './hoc/Theme/Theme'
import {initRecords} from './redux/actions/actions'
import {useDispatch, useSelector} from 'react-redux'
import {State} from './redux/reducers/reducer'

export const App: FC = () => {
	
	const dispatch = useDispatch()
	const records: State = useSelector((state: State) => state)
	
	useEffect(() => {
		localStorage.records = JSON.stringify(records)
	}, [records])
	
	useEffect(() => {
		if (localStorage.records) {
			dispatch(initRecords(JSON.parse(localStorage.records)))
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
								<Route>
									<Typography variant='h1'>
										404 Page Not Found
									</Typography>
								</Route>
							</Switch>
						</Layout>
					</Theme>
				</SnackbarProvider>
			</StylesProvider>
		</BrowserRouter>
	)
}
