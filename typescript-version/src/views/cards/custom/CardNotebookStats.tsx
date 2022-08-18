// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import Twitter from 'mdi-material-ui/Twitter'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import Button from '@mui/material/Button';

interface Props {
    order: number
    title: string
    author: string
}
const CardNotebookStats: React.FC<Props> = (props) => {
    const { order, title, author } = props
    return (
        <Card sx={{ border: 0, boxShadow: 0, backgroundColor: 'common.white', marginBottom:3.5 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}> */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
                        <Typography variant='h4'>
                            { order ? order : 0}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, flexDirection: 'column' }}>
                        <Typography variant='h6'>
                            {title ? title : "no title found for this module"}
                        </Typography>
                        <Typography variant='inherit'>
                            by {author ? author : "Unknown"}
                        </Typography>

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
                        <AccessTimeFilledRoundedIcon sx={{ marginRight: 1.25 }} />
                        <Typography variant='body2'>
                            30 min
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
                        <LockRoundedIcon sx={{ marginRight: 1.25 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button size='medium' color='secondary' variant='outlined'>
                            View course
                        </Button>
                    </Box>
                    {/* </Box> */}

                </Box>
            </CardContent>
        </Card>
    )
}

export default CardNotebookStats
