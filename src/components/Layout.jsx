import React from 'react'
import NavBar from './NavBar'
import MainFooter from './MainFooter'

const Layout = ({children}) => {
  return (
    <div>
        <NavBar />
        {children}
        <MainFooter/>
    </div>
  )
}

export default Layout