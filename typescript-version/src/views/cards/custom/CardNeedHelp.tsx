// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Grid } from '@mui/material'
import BrainImage from "../../../../public/images/cards/custom/group48.png"
import Image from "next/image"
const CardNeedHelp = () => {
    return (
        <Card>
            <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                        <Typography variant='h5' sx={{ marginBottom: 5 }}>
                            Precisa de ajuda?
                        </Typography>
                <Grid container spacing={12}>
                    <Grid item xs={12} md={8}>
                        <Typography sx={{ marginBottom: 10 }}>Lorem ipsum dolor sit amet</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
                            Enviar mensagem <ArrowForwardIcon />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Image src={BrainImage} alt="help"/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardNeedHelp