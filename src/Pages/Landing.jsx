import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center container-fluid' style={{height:'100vh'}}>
        <div className='w-75 border shadow p-5'>
            
            <h1 style={{color: "DodgerBlue"}} >Welcome to the Contact App</h1><br />
            <p>Stay connected with a Contact Application—your go-to tool for effortlessly managing <br/>and organizing all your important connections</p><br />
            <Link to={'/home'} className='btn btn-outline-success'>Go To Contacts</Link>

        </div>

      </div>
      
    </>
  )
}

export default Landing