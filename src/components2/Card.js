import React from 'react'

const Card = ({props,del}) => {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    
  return (
    <div>
      <h4>{props.title}</h4>
      <div>
         <p>{props?.points} by the {props?.author} || {props?.num_comments}  comments</p>
      </div>

      <div style={{display:"flex",gap:"30px",marginTop:'30px'}}>
         <a className='dark' style={{color:"blue",cursor:"pointer"}} onClick={() => openInNewTab(props?.url)}>Read More</a>
         <a className='dark' style={{color:"red",cursor:"pointer"}} onClick={()=>del(props?.objectID)}>Remove</a>
      </div>
    </div>
  )
}

export default Card
