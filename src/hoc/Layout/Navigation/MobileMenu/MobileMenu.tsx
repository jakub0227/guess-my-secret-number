import React, {FC} from 'react'
import {Drawer, Icon, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {routeList} from '../NavigationItems/routeList'
import {Link} from 'react-router-dom'

interface MobileMenuProps {
	open: boolean
	onClose: () => void
}

export const MobileMenu: FC<MobileMenuProps> = props => {
	return (
		<Drawer anchor='left' open={props.open} onClose={props.onClose}>
			<List>
				{routeList.map(({routeName, displayName, icon}) => (
					<ListItem onClick={props.onClose} component={Link} to={routeName}>
						<ListItemIcon>
							<Icon>{icon}</Icon>
						</ListItemIcon>
						<ListItemText primary={displayName}/>
					</ListItem>
				))}
			</List>
		</Drawer>
	)
}