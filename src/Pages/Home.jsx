import React, { useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import Add from '../Components/Add'
import Contacts from '../Components/Contacts'

function Home() {

    const [response,setResponse]=useState("")

  return (
    <>
    <div className='container-fluid'>
        <Row>
            <Col sm={12} md={3}>
                <Add res={setResponse}/>
            </Col>
        </Row>

        <Row>

            <Col sm={12} md={12}>
                <Contacts response={response}/>
            </Col>

        </Row>
    </div>

    </>
  )
}

export default Home