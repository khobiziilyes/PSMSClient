import React from 'react';
import { AccountCircle, AccessAlarm, AttachFile } from '@material-ui/icons';
import ListItem from './ListItem';
import { formatTimestamp } from '@src/Consts';

function IDListItem({ ID }){
	return (
		<ListItem primary="ID" secondary={ID}>
			<AttachFile />
		</ListItem>
	);
}

function UserListItem({ userName }){
	return (
		<ListItem primary="User" secondary={userName}>
			<AccountCircle />
		</ListItem>
	);
}

function TimeListItem({ time }){
	return (
		<ListItem primary="Time" secondary={formatTimestamp(time)}>
			<AccessAlarm />
		</ListItem>
	);
}

export {
	IDListItem,
	UserListItem,
	TimeListItem
}