// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import themeConfig from 'src/configs/themeConfig'

interface Props {
  hidden: boolean
  navWidth: number
  settings: Settings
  navVisible: boolean
  children: ReactNode
  setCustomNavWidth: (customNavWidth: number) => void
  setNavVisible: (value: boolean) => void
  saveSettings: (values: Settings) => void
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})

const Drawer = (props: Props) => {
  // ** Props
  const { hidden, children, navWidth, navVisible, setNavVisible, setCustomNavWidth } = props

  // ** Hook
  const theme = useTheme()

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }

  // Drawer Props for Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null
  }
  if(!navVisible){
    setCustomNavWidth(100)
  } else {
    setCustomNavWidth(260)
  }
  return (
    <SwipeableDrawer
      className='layout-vertical-nav'
      variant={hidden ? 'temporary' : 'permanent'}
      {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
      PaperProps={{ sx: { width: navWidth } }}
      sx={{
        ...(navVisible?{width: navWidth,}: {width: navWidth,}),
        '& .MuiDrawer-paper': {
          borderRight: 0,
          backgroundColor: theme.palette.background.default
        }
      }}
    >
      {children}
    </SwipeableDrawer>
  )
}

export default Drawer
