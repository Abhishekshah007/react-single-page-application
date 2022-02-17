import React, { useState, useRef, useEffect } from 'react';
import { RuleSection } from './exportfiles';
import axios from 'axios';
function NotesSection() {
  const [isShown, setIsShown] = useState(false);
  const [input, setInput] = useState({
    title: '',
    desc: ''
  });

  const ref = useRef(null)
  // database

  let handelChange = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
   
  }

  let handelSubmit = (event) => {

    const Note = {
      title: input.title,
      desc: input.desc
    }

    axios.post('http://localhost:3000/note', Note);
    
    setInput({ title: '', desc: '' })
    ref.current.click()                             
  }


  // fetch all data

  const [notes, setNotes] = useState([{_id:'', title: '', desc: '', date: '' }]);

  useEffect(() => {
    fetch('/savednote').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setNotes(jsonRes))
    
  })

  // update note

  const [upnote, setupNote] = useState({ id:"",utitle: "", udesc: "" });


  const updateNoteValue = (newval) => {
    
    setupNote({ id: newval._id ,utitle: newval.title, udesc: newval.desc,})
  }
  const updateNote= async (id,title,desc)=>{

    const response = await fetch(`http://localhost/edit/${id}`,{
      method:'PUT',
      headers:{
        'content-type':'application/json',
        
      },
      body: JSON.stringify({title,desc})
    
    });
    const json = await response.json();
    console.log(json);

let newUpdateValue = JSON.parse(JSON.stringify(notes));
for (let index = 0; index < newUpdateValue; index++) {
  const element = newUpdateValue[index];
  if(element._id===id){
    newUpdateValue[index].title=title;
    newUpdateValue[index].desc=desc;

    break;
  }
}
setNotes( newUpdateValue)
  }

  const updateCurrentNote = () => {
    
    ref.current.click();
    updateNote(upnote.id,upnote.utitle,upnote.udesc)

    

  }
  const onupdatechange = (e) => {
    setupNote({ ...upnote, [e.target.name]: e.target.value })
  }


  // delete
  const deleteNote=(id)=>{  
    console.log(id)
    axios.delete(`http://localhost:3000/remove/${id}`)  
      .then(res => {  
        // console.log(res);  
        // console.log(res.data);  
    
        const posts =input.filter(item => {return item._id !== id});  
      //  console.log(posts); 
      setNotes(posts)
      })  
     
  }  
  return (
    <>
      <div className="col-md-3 section3">

        <div className="scrollContainer border border-dark" style={{
          // overflowY: "scroll",
          marginTop: "10px",
          padding: "0px",
          marginRight: "-95px"
        }}>

          <div className="title" style={{
            margin: "0", padding: "0px", display: "flex", flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <p style={{
              fontWeight: "500", marginTop: "13px",
              marginBottom: "0px"
            }}>Notes</p>
            <button type="button" className="btn btn-primary-outline addingbtn my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className="fas fa-plus"></i>
            </button>
          </div>

          {/* list  */}

          <div className="list-group" style={{ overflowY: "scroll", maxHeight: "310px" }}>


            {notes.map(note => (<div onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)} className=" border border-dark" style={{ margin: "0px 5px 5px 5px" }}>
              {isShown && (<div>
                {/* <button type="button" className="btn btn-primary-outline addingbtn my-2" data-bs-toggle="modal" data-bs-target="#update">
                <i onClick={console.log(note._id)}  class="fas fa-pen-fancy mx-3"></i>
            </button> */}

           
               <button className=" btn addingbtn">
                <i class="fas fa-trash"  onClick={() => {
                deleteNote(note._id)
              }} style={{ cursor: "pointer" }}></i>
              </button>
              </div>)} <div className="d-flex w-95 justify-content-between border border-dark" style={{ margin: "5px" }}>
                <h5 className="mb-1">{note.title}</h5>
                <small>{new Date(note.date).toLocaleDateString()}</small>
              </div>

              <p className="mb-1 mx-2" style={{color:"darkmagenta"}}>{note.desc}
              </p>
            </div>))}



          </div>


          {/* ---------------------------modal----------------------------------------- */}


          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                      <input type="text" name="title" value={input.title} onChange={handelChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                      <textarea class="form-control" value={input.desc} name="desc" onChange={handelChange}></textarea>
                    </div>


                  </form>

                </div>
                <div className="modal-footer">
                  <button type="button" ref={ref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={handelSubmit} className="btn btn-primary">Add Note</button>
                </div>
              </div>
            </div>
          </div>











          {/* edit modal */}




          <div className="modal fade" id="update" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label"> Update Title</label>
                      <input type="text"    id="utitle"
                      name="utitle"  className="form-control"  onChange={onupdatechange}   value={upnote.title}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Update Description</label>
                      <textarea class="form-control"  id="udesc"
                      name="udesc"
                      placeholder="doing homework"
                      onChange={onupdatechange}
                      value={upnote.udesc} ></textarea>
                    </div>


                  </form>

                </div>
                <div className="modal-footer">
                  <button type="button" ref={ref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" disabled={upnote.utitle.length<5 || upnote.udesc.length<5} className="btn btn-primary" onClick={updateCurrentNote}>Update Note</button>
                </div>
              </div>
            </div>
          </div>


        </div>


        {/* delete note */}

        <RuleSection />
      </div>
    </>
  );
}

export default NotesSection;
