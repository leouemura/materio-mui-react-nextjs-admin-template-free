import React from 'react';
import Grid from '@mui/material/Grid'
import CardContinueCourse from 'src/views/cards/custom/CardContinueCourse';
import CardStatistics from 'src/views/cards/custom/CardStatistics';
import CardNotebookStats from 'src/views/cards/custom/CardNotebookStats';
import CardNeedHelp from 'src/views/cards/custom/CardNeedHelp';
import { Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={12} md={7}>
          <CardContinueCourse />
        </Grid>
        <Grid item xs={12} md={5}>
          <CardStatistics />
        </Grid>
      </Grid>
      <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <Typography variant='h4' sx={{margin:10}}>Notebooks</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={12}>
        <Grid item xs={12} md={7}>
          <CardNotebookStats />
        </Grid>
        <Grid item xs={12} md={5}>
          <CardNeedHelp />
        </Grid>
      </Grid>
    </>

  )
}

export default Home;