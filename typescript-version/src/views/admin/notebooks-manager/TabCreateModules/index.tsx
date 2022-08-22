// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert, { AlertColor } from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { Module } from '../ModulesTable'
import { title } from 'process'

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))

interface Props {
    moduleData: Module
    clearData: (module: Module) => void
    page: string
    setPage: (page: string) => void
}

export interface AlertData {
    severity: AlertColor
    message: string
}

const TabCreateModules: React.FC<Props> = (props) => {
    const { moduleData, clearData, page, setPage } = props
    // ** State
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [formTitle, setFormTitle] = useState<string>(moduleData?.title)
    const [alertData, setAlertData] = useState<AlertData>()
    const create = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/modules/', {
                // body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ title: formTitle })
            })
            const module = await response.json();
            console.log("======================== response =================================")
            console.log("responseModule :>>", module.items)
            setAlertData({ severity: "success", message: "Modulo cadastrado com sucesso!" })
            setOpenAlert(true)
        } catch (err) {
            console.log("======================== moduleError =================================")
            console.log(err)
            setAlertData({ severity: "error", message: "Erro ao cadastrar módulo" })
            setOpenAlert(true)
        }
    }

    const update = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/modules/?id=${moduleData.id}`, {
                // body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ id: moduleData.id, title: formTitle })
            })
            const module = await response.json();
            console.log("======================== response =================================")
            console.log("responseModule :>>", module.items)
            setAlertData({ severity: "success", message: "Modulo atualizado com sucesso!" })
            setOpenAlert(true)
        } catch (err) {
            console.log("======================== moduleError =================================")
            console.log(err)
            setAlertData({ severity: "error", message: "Erro ao atualizar módulo" })
            setOpenAlert(true)


        }
    }

    const onSubmit = () => {
        if (formTitle.length == 0) {
            setAlertData({ severity: "warning", message: "Preencha o campo titulo." })
            setOpenAlert(true)
            return
        }
        if (page === "create") {
            create()
        }
        if (page === "edit") {
            update()
        }

    }

    return (
        <CardContent>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={11} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <Typography >Cadastro de Módulo</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <IconButton size='small' color='inherit' aria-label='close' onClick={() => { clearData(undefined); setPage("list") }}>
                            <Close fontSize='inherit' />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField value={formTitle} onChange={e => setFormTitle(e.target.value)} fullWidth label='Titulo' placeholder='Título do módulo' defaultValue={moduleData?.title} />
                    </Grid>


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

                    <Grid item xs={12}>
                        <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => onSubmit()}>
                            Salvar
                        </Button>
                        <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormTitle("")}>
                            Limpar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    )
}

export default TabCreateModules
