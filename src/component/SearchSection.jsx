import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import { WatchList } from './exportfiles'
function SearchSection() {
  
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
  
    useEffect(() => {
      const pokemon = [];
      const promises = new Array(20)
        .fill()
        .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
      Promise.all(promises).then(pokemonArr => {
        return pokemonArr.map(value =>
          value
            .json()
            .then(({ name, sprites: { front_default: sprite } }) =>
              pokemon.push({ name, sprite })
            )
        );
      });
      setOptions(pokemon);
    }, []);
  
    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });
  
    const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
    const txtInput = useRef(null)
    let handelSubmit =(value)=>{
  
      const addwatchlist ={
        watchValues:txtInput.current.value
      }
      
      axios.post('https://mern-spa-app.herokuapp.com/addwatchlist',addwatchlist);
      
    
        }

    const updatePokeDex = poke => {
    
      setSearch(poke);
      setDisplay(false);
    };
  
    return (
      
      <div className="col-md-3 section1" style={{ marginLeft: "15px", marginTop: "15px" }}>
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={search}
          ref={txtInput}
          onChange={event => setSearch(event.target.value)}
          aria-label="Search"
          className="searchbox"
          
          
        />
           <button type="button" className="btn btn-primary" style={{marginTop: "12px",
    padding: "10px"
}} onClick={handelSubmit}>
            <i className="fas fa-save searchbtn"  />
          </button>
        {display && (
          <div className="my-3" style={{ border: "1px solid black",width:"91%",maxHeight:"250px" ,overflowY: "scroll"}}>
            {options
              .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updatePokeDex(value.name)}
                    className="option"
                    key={i}
                    tabIndex="0"
                    
         
                  >
                    <span>{value.name}</span>
                   
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <WatchList/>
      </div>
    );
  };
  
  
   


export default SearchSection;
