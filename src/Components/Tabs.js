import React from 'react';
import { Tabs as MuiTabs, Tab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { injectProps } from '@src/Consts';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: 300
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '50%'
    },
    typo: {
        padding: theme.spacing(3, 2),
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    tabContent: {
    	padding: 20,
    	width: '100%'
    }
}));

export default function Tabs({ currentTab: _currentTab, setCurrentTab: _setCurrentTab, tabsList = [], additionalProps = {}, minus = -1, ...props }) {
    const classes = useStyles();
    const currentTabState = React.useState(0);

    const currentTab = _currentTab || currentTabState[0];
    const setCurrentTab = _setCurrentTab || currentTabState[1];

    const handleChange = (event, newValue) => setCurrentTab(newValue);

    // eslint-disable-next-line
    React.useEffect(() => setCurrentTab(tabsList.length + minus), [tabsList]);

    return (tabsList.length > 0) ? (
        <div className={classes.root}>
            <MuiTabs orientation="vertical" variant="fullWidth" value={currentTab} onChange={handleChange} className={classes.tabs} {...props}>
                {
                	tabsList.map((tabItem, i) => <Tab icon={tabItem.Icon} label={tabItem.Title} key={'vertical-tab-' + i} />)
                }
            </MuiTabs>

            {
            	tabsList.map((tabItem, i) =>
	                <div role="tabpanel" hidden={currentTab !== i} className={classes.tabContent} key={'vertical-tabpanel-' + i}>
	                    {
	                        injectProps(tabItem.Content, { index: i, setCurrentTab, ...additionalProps })
	                    }
	                </div>
	            )
            }
        </div>
    ) : (
    	<div className={classes.typo}>
        	<Typography variant="h1" color="secondary" align="center">Add items first</Typography>
    	</div>
    );
}