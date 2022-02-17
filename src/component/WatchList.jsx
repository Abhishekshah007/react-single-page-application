import React,{useState,useEffect} from 'react';
import axios from 'axios';
function WatchList() {
  const [isShown, setIsShown] = useState(false);

  const [watch, setWatch] = useState([{watchValues:''}]);

  useEffect(() => {
    fetch('/watchlist').then(res=>{
      if(res.ok){
        return res.json()
      }
    }).then(jsonRes=>setWatch(jsonRes))
  })
  
   const deleteNote=(id)=>{  
    console.log(id)
    axios.delete(`https://abhayas-sde-test.herokuapp.com/removewatchlistvalue/${id}`)  
      .then(res => {  
        // console.log(res);  
        // console.log(res.data);  
    
        const posts =watch.filter(item => {return item._id !== id});  
      //  console.log(posts); 
      setWatch(posts)
      })  
     
  }  
  return (
    <>
    <div className="col-md-3">

    <div className="scrollContainer border border-dark" style={{
    // overflowY: "scroll",
    marginTop: "10px",
    padding: "0px",
    width: "327px",
    marginRight: "-95px"}}>

      
      {/* list  */}

      <div  className="list-group" style={{ overflowY: "scroll",maxHeight: "310px"}}>
      {watch.map(watchs => (<div><div  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} className=" border border-dark" style={{margin:"5px"}}>
          {isShown && (<div>
            <button className=" btn addingbtn">
                <i class="fas fa-trash"  onClick={() => {
                deleteNote(watchs._id)
              }} style={{ cursor: "pointer" }}></i>
              </button></div>)}
          
          <p className="mb-1">{watchs.watchValues}
    
          </p>
        </div></div>
        ))}
        
      

      </div>
  

    </div>
    </div>
    </>
    );
}

export default WatchList;
