import React from 'react';
// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { ModuleManager } from 'src/views/admin/notebooks-manager/ModuleManager';

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        minWidth: 100
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: 67
    }
}))

const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))

const NotebooksManager: React.FC = () => {

    // ** State
    const [value, setValue] = useState<string>('modules')

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <Card>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    aria-label='account-settings tabs'
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                    <Tab
                        value='modules'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountOutline />
                                <TabName>Módulos</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='notebooks'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>Notebooks</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='users-data'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <InformationOutline />
                                <TabName>Dados de Usuários</TabName>
                            </Box>
                        }
                    />
                </TabList>

                <TabPanel sx={{ p: 0 }} value='modules'>
                    {/* <TabModules /> */}
                    <ModuleManager />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='notebooks'>
                    <TabSecurity />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='users-data'>
                    <TabInfo />
                </TabPanel>
            </TabContext>
        </Card>
    )
}
export default NotebooksManager;