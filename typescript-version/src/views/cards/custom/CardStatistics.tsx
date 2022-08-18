// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Grid } from '@mui/material'

const CardStatistics = () => {
    return (
        <Card>
            <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                <Typography variant='h6' sx={{ marginBottom: 5 }}>
                    Statistics Card
                </Typography>
                <Typography sx={{ marginBottom: 10 }}>Nivel 10</Typography>
                <Grid container spacing={12}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            boxShadow: 3,
                            margin: 2,
                            padding: 2,
                            border: "1px",
                            backgroundColor: 'action.hover',
                        }}>
                            <Grid container spacing={12}>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant='h6' sx={{ marginBottom: 3, marginTop: 3 }}>12</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Courses Completed</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            boxShadow: 3,
                            margin: 2,
                            padding: 2,
                            border: "1px",
                            backgroundColor: 'action.hover',
                        }}>
                            <Grid container spacing={12}>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant='h6' sx={{ marginBottom: 3, marginTop: 3 }}>3</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Courses in  progress</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardStatistics