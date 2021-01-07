import React, {FC} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {StylesProvider, Typography} from '@material-ui/core'
import {Layout} from './hoc/Layout/Layout'
import {Theme} from './hoc/Theme/Theme'
import {routeList} from './hoc/Layout/Navigation/NavigationItems/routeList'

export const App: FC = () => {
	
	return (
		<BrowserRouter>
			<StylesProvider injectFirst>
				<Theme>
					<Layout>
						<Switch>
							<Route>
								{routeList.map(route => (
									<Route exact path={route.routeName} component={route}/>
								))}
							</Route>
							<Route exact>
								<Typography variant='h1'>
									404 Page Not Found
								</Typography>
							</Route>
						</Switch>
					</Layout>
				</Theme>
			</StylesProvider>
		</BrowserRouter>
	)
}
