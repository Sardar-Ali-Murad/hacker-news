import React from 'react'
import Card from './Card'

const Home = () => {

    let [search,setSearch]=React.useState("React")
    let [page,setPage]=React.useState(1)
     let [totalPages,setTotalPages]=React.useState(null)
    let [data,setData]=React.useState([])

    let start=async ()=>{
        let initial=await fetch(`https://hn.algolia.com/api/v1/search?&query=${search}&page=${page}`)
        let final=await initial.json()
        setData(final.hits)
        setTotalPages(final?.nbPages-1)
     }

     function del(id){
        setData((pre)=>pre.filter((all)=>all?.objectID!==id))
     }


    React.useEffect(()=>{
      start()
    },[page])

    function handleSubmit(e){
        e.preventDefault()
        start()
        setPage(1)
    }

    function pre(){
        let no=page-1
        if(no===0){
            setPage(totalPages)
        }
        else{
            setPage(no)
        }
    }

    function next(){
        let num=page+1
        if(num>totalPages){
            setPage(1)
        }
        else{
            setPage(num)
        }
    }

    console.log(data)

  return (
    <div className='div-center-80 main-div-margins' style={{overflowX:"hidden"}}>
      <h1 style={{margin:"0px"}}>Hacker News Search</h1>
      <form onSubmit={handleSubmit}>
         <input className='form form-input' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </form>
      <div className='btns div-center-80' style={{marginTop:"40px",display:"flex",gap:"20px"}}>
        <button className='btn' onClick={pre}>Pre</button>
        <p>{page} of {totalPages}</p>
        <button className='btn' onClick={next}>Next</button>
      </div>

      <div className='grid-22 main-div-margins'>
         {
           data.map((all)=>{
            return <Card props={all} del={del}/>
           })
         }
      </div>
    </div>
  )
}

export default Home
