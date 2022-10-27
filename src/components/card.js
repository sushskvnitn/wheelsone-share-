import React from 'react'
import StarIcon from '@mui/icons-material/Star';
const Card = (props) => {
  return (
    <div className="m-4">
    
      <div className="card" style={{"width": "18rem","height":"38rem"}}>
      <div  style={{backgroundColor:"#f8f8f8"}}  >
             <img className="card-img-top" src={props.imgsrc} alt="Card cap" style={{"width": "16rem",height:"20rem"}}/>
      </div>
   <div className="card-body text-center ">
     <h4 className="title"><b>{props.title} </b></h4>
     <p className='fw-lighter'>{props.category}</p>
     <p className="rating fw-light"><b>
     {new Array(Math.floor( props.rate)).fill(null).map(() => (
          <StarIcon/>
        ))}
        </b>  {props.count}</p> 
       
     <div> <span className="fs-3">{props.price}</span> <span className='fw-lighter' >&#x24;</span> <small ><b>{props.size}</b> </small></div> 
     <p className="card-text-10">
      {props.description}
     </p>
  </div>
</div>
    </div>
  )
}

export default Card