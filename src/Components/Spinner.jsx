import React,{Component} from 'react'
import loader from '../assets/loader.gif'
const Spinner = () => {
  return (
    <>
    <div className="text-center">
      <img src={loader} alt='loading' style={{height:'50px'}}></img>
      </div>
    </>
  )
}

export default Spinner
