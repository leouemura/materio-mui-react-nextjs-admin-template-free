import React from 'react';
import Grid from '@mui/material/Grid'
import CardContinueCourse from 'src/views/cards/custom/CardContinueCourse';
import CardStatistics from 'src/views/cards/custom/CardStatistics';
import CardNotebookStats from 'src/views/cards/custom/CardNotebookStats';
import CardNeedHelp from 'src/views/cards/custom/CardNeedHelp';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react'

const Home: React.FC = () => {
  const { data: session } = useSession()
  const [lastModuleInProgressID, setLastModuleInProgressID] = React.useState(undefined)
  const [moduleData, setModuleData] = React.useState(undefined)
  const [notebooksData, setNotebooksData] = React.useState([])
  const [completed, setCompleted] = React.useState([])
  const [inProgress, setInProgress] = React.useState([])

  const getLastModuleInProgressID = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/user_modules_inprogress/?' + new URLSearchParams({id: 'cl6yjjwl90176lq8jv3hd63u7'}), {
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      const module = await response.json();
      console.log("======================== response =================================")
      console.log("responseProgress :>>", module.items)
      setLastModuleInProgressID(module.items)
    }catch(err) {
      console.log("======================== moduleError =================================")
      console.log(err)
    }
  }
  const getModule = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/modules/?' + new URLSearchParams({id: 'cl6yjgdcr0159lq8jq60ae7bx'}), {
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
    }catch(err) {
      console.log("======================== moduleError =================================")
      console.log(err)
    }
  }

  const getNotebooks = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/notebooks/?' + new URLSearchParams({moduleId: 'cl6yjgdcr0159lq8jq60ae7bx'}), {
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      const module = await response.json();
      console.log("======================== response =================================")
      console.log("responseNotebook :>>", module.items)
      setNotebooksData(module.items)
    }catch(err) {
      console.log("======================== moduleError =================================")
      console.log(err)
    }
  }

  const getCompleted = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/user_modules_completed/?' + new URLSearchParams({userId: 'cl592pq8l00068j8jn5k3aabn'}), {
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      const module = await response.json();
      console.log("======================== response =================================")
      console.log("responseCompleted :>>", module.items)
      setCompleted(module.items)
    }catch(err) {
      console.log("======================== moduleError =================================")
      console.log(err)
    }
  }
  
  const getInProgress = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/user_modules_inprogress/?' + new URLSearchParams({userId: 'cl592pq8l00068j8jn5k3aabn'}), {
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      const module = await response.json();
      console.log("======================== response =================================")
      console.log("responseInProgress :>>", module.items)
      setInProgress(module.items)
    }catch(err) {
      console.log("======================== moduleError =================================")
      console.log(err)
    }
  }

  React.useEffect(()=>{
    getLastModuleInProgressID()
  },[])

  React.useEffect(()=>{
    if (lastModuleInProgressID === undefined) {
      return
    }
    getModule()
  },[lastModuleInProgressID])

  React.useEffect(() => {
    if (moduleData === undefined) {
      return
    }
    getNotebooks()
    getCompleted()
    getInProgress()
  },[moduleData])
  
  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={12} md={7}>
          <CardContinueCourse title={moduleData ? moduleData.title : "Nenhum curso visto"}/>
        </Grid>
        <Grid item xs={12} md={5}>
          <CardStatistics completed={completed.length} inProgress={inProgress.length}/>
        </Grid>
      </Grid>
      <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <Typography variant='h4' sx={{margin:10}}>Notebooks</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={12}>
        <Grid item xs={12} md={7}>
          {notebooksData.map((notebook, index) => {
            return(
              <CardNotebookStats title={notebook.title} author={notebook.author} key={index} order={index}/>
            )
          })}
        </Grid>
        <Grid item xs={12} md={5}>
          <CardNeedHelp />
        </Grid>
      </Grid>
    </>

  )
}

export default Home;