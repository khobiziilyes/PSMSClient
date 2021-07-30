import React from 'react';
import {
	Typography,
	List
} from '@material-ui/core';

import { UserListItem, TimeListItem } from './CommonListItem';

export function UserTimeList({ title, userName, time }) {
	return (
		<>
			<Typography variant="h6">{title}</Typography>
			
			<List>
				<UserListItem userName={userName} />
				<TimeListItem time={time} />
			</List>
		</>
	);
}