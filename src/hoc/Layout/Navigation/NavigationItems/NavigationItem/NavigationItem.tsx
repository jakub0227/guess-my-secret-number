import React, {FC} from 'react'
import Button from '@material-ui/core/Button/Button'
import {Link} from 'react-router-dom'
import {Icon} from '@material-ui/core'

export interface NavigationItemProps {
	link: string;
	name: string;
	icon: string;
}

export const NavigationItem: FC<NavigationItemProps> = (props) => {
	return (
		<Button startIcon={<Icon>{props.icon}</Icon>} component={Link} to={props.link} variant='text' color='inherit'>
			{props.name}
		</Button>
	)
}