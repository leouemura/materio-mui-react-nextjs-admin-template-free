import React from 'react';

import { createStyles, makeStyles, Paper, Theme, Tooltip, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Security from '@mui/icons-material/Security';
import { CustomTable, TableHeaderToolbar } from 'src/components/CustomTable';
import Alert, { AlertColor } from '@mui/material/Alert'
import { AlertData } from '../TabFormModules';
import AlertTitle from '@mui/material/AlertTitle'

import Add from 'mdi-material-ui/PlusCircle'
import Close from 'mdi-material-ui/Close'



interface ServersTableProps extends React.HTMLProps<HTMLDivElement> {
    // servers: any[];
    title?: string;
    loading?: boolean;
    onModuleUpdate: (module: Module) => void;
    // onModulesDelete: (modules: Module[]) => void;
    setPage: (page: string) => void
}

export type Module = {
    id: number
    title: string
}

export const ModulesTable: React.FC<ServersTableProps> = (props) => {
    const {
        // servers,
        title = 'Servidores de Dados Cadastrados',
        loading = false,
        onModuleUpdate,
        // onModulesDelete,
        setPage,
        ...divProps
    } = props;

    let [selected, setSelected] = React.useState<Module[]>([]);
    const [moduleData, setModuleData] = React.useState<Module[]>([])
    const [openAlert, setOpenAlert] = React.useState<boolean>(false)
    const [alertData, setAlertData] = React.useState<AlertData>()


    const getModule = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/modules/', {
                // body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            const module = await response.json();
            console.log("======================== response =================================")
            console.log("responseModule :>>", module.items)
            setModuleData(module.items)
        } catch (err) {
            console.log("======================== moduleError =================================")
            console.log(err)
        }
    }

    const deleteModule = async (item: Module) => {
        try {
            const response = await fetch(`http://localhost:3000/api/modules/?id=${item.id}`, {
                // body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            })
            const module = await response.json();
            console.log("======================== response =================================")
            console.log("responseModule :>>", module.items)
            setAlertData({ severity: "success", message: "Modulo removido com sucesso!" })
            setOpenAlert(true)
        } catch (err) {
            console.log("======================== moduleError =================================")
            console.log(err)
            setAlertData({ severity: "error", message: "Erro ao remover módulo!" })
            setOpenAlert(true)
        }
    }

    // // In case the rows number change, ensure the selecion is disabled.
    // React.useEffect(() => {
    //     setSelected([]);
    // }, [modules]);

    const onEditClick = () => {
        if (selected.length === 1) {
            onModuleUpdate(selected[0]);
            setPage("edit")

        }
    };

    const onDeleteClick = () => {
        if (selected) {
            if (selected.length > 0) {
                // onModulesDelete(selected);
                selected.map((item) => deleteModule(item))
                setSelected([]);
            }
        }
    };

    const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (selected.length > 0) {
            setSelected([]);
        } else {
            setSelected(moduleData);
        }
    };

    const onRowClick = (event: React.MouseEvent<unknown>, selectedServer: Module, key: React.Key) => {
        let newSelected: Module[] = [];
        if (selected.some(sel => sel.id == selectedServer.id)) {
            newSelected = selected.filter((sel) => sel.id !== selectedServer.id);
        } else {
            newSelected = newSelected.concat(selected, selectedServer);
        }
        setSelected(newSelected);
    };


    React.useEffect(() => {
        getModule()
    }, [openAlert])

    return (
        <div {...divProps}>
            {openAlert ? (
                <Grid item xs={12} sx={{ mb: 3 }}>
                    <Alert
                        severity={alertData.severity}
                        sx={{ '& a': { fontWeight: 400 } }}
                        action={
                            <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                                <Close fontSize='inherit' />
                            </IconButton>
                        }
                    >
                        <AlertTitle>{alertData.message}</AlertTitle>
                    </Alert>
                </Grid>
            ) : null}
            <Paper >
                <Grid container>
                    <Grid item xs={selected.length === 0 ? 11 : 12} >
                        <TableHeaderToolbar numSelected={selected.length} title={"Módulos Cadastrados"}>
                            <Grid container>

                                {selected.length === 1 && (
                                    <Tooltip title={'Editar'}>
                                        <IconButton onClick={onEditClick}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {selected.length > 0 && (
                                    <Tooltip title={'Deletar'}>
                                        <IconButton onClick={onDeleteClick}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Grid>
                        </TableHeaderToolbar>
                    </Grid>
                    {selected.length === 0 && (
                        <Grid item xs={1} sx={{ marginTop: 4 }}>
                            <IconButton size='small' color='inherit' aria-label='close' onClick={() => { setPage("create") }}>
                                <Add fontSize='medium' />
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
                <CustomTable<Module>
                    title={'Módulos Cadastrados'}
                    width={'100%'}
                    height={'100%'}
                    loading={null}
                    columns={['id', 'title']}
                    columnsMap={{ id: 'ID', name: 'Titulo' }}
                    enableCheck={true}
                    rows={moduleData}
                    selected={selected}
                    onSelectAllClick={onSelectAllClick}
                    onRowClick={onRowClick}
                />
            </Paper>
        </div>
    );
};
