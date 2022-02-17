import React,{ useState,useEffect,useRef}  from 'react';
import axios from 'axios';
function RuleSection() {
 
  const ref = useRef(null);
  const cref = useRef(null);
  
  const [value, setValue] = useState({
    rules:''
  })

const handelChange=(e)=>{
  const {name,value} =e.target;
setValue(prevInput=>{
  return {
    ...prevInput,
    [name]:value
  }
})

}

const handelSubmit=()=>{

  const Rule ={
    rules:value.rules
  }
  
  axios.post('https://abhayas-sde-test.herokuapp.com/addrule',Rule);
  ref.current.click()
  cref.current.click()
  setValue({rules:''})
}




  const [rule, setRule] = useState([{
  rules:'',
  _id:''
}]);

// fetch
useEffect(() => {
  fetch('/rules').then(res=>{
    if(res.ok){
      return res.json()
    }
  }).then(jsonRes=>setRule(jsonRes))
})

const deleteSelect = (id)=>{

      
      axios.delete(`https://abhayas-sde-test.herokuapp.com/removerules/${id}`)  
      .then(res => {  
        // console.log(res);  
        // console.log(res.data);  
    
        const posts =value.filter(item => {return item._id !== id}); 
        setValue(posts)
      }
  )
    
  
  }

  const toggleClock=()=> {
    // get the clock
    
  
    // also get the clock button, so we can change what it says
    var clockButton = document.getElementById('clockButton');
  
  if(clockButton.style.display == 'block'){
    clockButton.style.display = 'none'
  }
  else{
    clockButton.style.display = 'bolck';
    setValue([])
  }
    
  
  }

const selects=()=>{  
  var ele=document.getElementsByName('chk'); 
 toggleClock();
  for(var i=0; i<ele.length; i++){  
      if(ele[i].type==='checkbox'){  
          ele[i].checked=true;  
      
            }
  }  

}



  const deSelect=()=>{  
    var ele=document.getElementsByName('chk');  
    for(var i=0; i<ele.length; i++){  
        if(ele[i].type=='checkbox')  
            ele[i].checked=false;  
          
    }  
}             



  return (
    <>
    <div className="divstyle">
    <div className="scrollContainer border border-dark" style={{
    // overflowY: "scroll",
    marginTop: "10px",
    padding: "0px",
    marginRight: "-95px"}}>

      <div className="title" style={{margin:"0px",padding:"0px",display:"flex",flexDirection: "row",
    justifyContent: "space-between"}}>
        <p style={{fontWeight:"500",marginTop: "10px",
    marginBottom: "0px"}}>Rules</p>
    <div>
<script></script>
        <i className="fas fa-check" onClick={selects} onDoubleClick={deSelect}  style={{margin:"inherit",cursor:"pointer"}} ></i>
        <button type="button" className="btn btn-primary-outline addingbtn my-2" data-bs-toggle="modal" data-bs-target="#rulesModal">
        <i className="fas fa-plus " style={{margin:"inherit"}}></i>
      </button>
      <i className="fas fa-trash "  onClick="toggleClock()" id="clockButton" style={{margin:"inherit",display:"none"}}></i>
    </div>
      </div>
      <div className="list-group border border-dark " style={{ overflowY: "scroll",maxHeight: "260px",margin:"0px 5px 5px 5px"}}>
        {rule.map(Srules=>(<div>
        
              <label className="list-group-item">
          <input className="form-check-input me-1" ref={ref}  name="chk" id= "listVal" type="checkbox" 
                />
          {Srules.rules} <i className="fas fa-trash ml-2" id="trash" onClick={() => {
                deleteSelect(Srules._id)
              }} style={{cursor:" pointer",display: "flex",justifyContent: "right",lineHeight: "0",color: "red"}}></i>
        </label></div>))}
      
      </div>
      </div>

        {/* ---------------------------modal----------------------------------------- */}


        <div className="modal fade" id="rulesModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Rule</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form>
            
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                      <textarea class="form-control" value={value.rules} name="rules" onChange={handelChange}></textarea>
                    </div>


                  </form>

                </div>
                <div className="modal-footer">
                  <button type="button" ref={cref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={handelSubmit} className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </div>

</div>
  </>);
}

export default RuleSection;
