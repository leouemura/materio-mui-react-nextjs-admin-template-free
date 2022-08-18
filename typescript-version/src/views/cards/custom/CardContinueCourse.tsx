// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// Styled Box component
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardContinueCourse = () => {
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7.25, 7.75, 9.25)} !important` }}>
            <Typography variant='subtitle1' sx={{ marginBottom: 3.5 }}>
              Bora continuar o módulo
            </Typography>
            <Typography variant='h6'>
              {`Python Básico ?`}
            </Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Button variant='contained'>Retomar de onde parei</Button>

            {/* <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Full Access</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>15 Members</Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <StarOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>Access all Features</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>Lifetime Free Update</Typography>
                </Box>
              </Grid>
            </Grid> */}
          </CardContent>
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
          sx={{ paddingTop: ['0 !important', '1.5rem !important'], paddingLeft: ['1.5rem !important', '0 !important'] }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              padding: theme => `${theme.spacing(18, 5, 16)} !important`
            }}
          >
            {/* <Box>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Typography variant='h6'>$</Typography>
                <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                  899
                </Typography>
                <Typography variant='h6'>USD</Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 13.75, display: 'flex', flexDirection: 'column' }}>
                <span>5 Tips For Offshore</span>
                <span>Software Development</span>
              </Typography>
              <Button variant='contained'>Contact Now</Button>
            </Box> */}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardContinueCourse
