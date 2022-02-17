import React,{useState,useEffect,useRef} from 'react';

function Tables() {
const [number, setNumber] = useState(0);
useEffect(() => {
  const interval =  setInterval(()=>{
setNumber(Math.floor((Math.random() * 120) + 20));
  },2000);

  return () => {
    clearInterval(interval);
  };
}, []);

const getvalue = useRef();
useEffect(() => {
  const tdElement = getvalue.current.value;
  console.log(tdElement); 
}, []);

let  a= 3*(number+8);
let b= 3*(number+13)
  return <>
  <div className='my-1' style={{border:"1px solid black"}}>
    <p  className="align-text-bottom" style={{
    marginTop: "13px",
    marginBottom: "0px"}
}>Fruits</p>
  <table class="table" style={{margin:"0px",padding:"0px",lineHeight:"normal"}}>
  <thead class="table-dark">
    <tr>
  <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">1</th>
      <td>Apple</td>
      <td id="a">500</td>
      <td id="val1">{number+1}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Banana</td>
      <td>50</td>
      <td id="val2">{number+2}</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Mango</td>
      <td>20</td>
      <td ref={getvalue}>{number+5}</td>
    </tr>
  </tbody>
</table>
<p className="float-end " style={{marginRight:"3px"}}>Total: {a}</p>


{/* ----------------- */}

<p className="align-text-bottom" style={{
    marginTop: "13px",
    marginBottom: "0px"}
}>Vegetables</p>
  <table class="table" style={{margin:"0px",padding:"0px",lineHeight:"normal"}}>
  <thead class="table-dark">
  <tr>
  <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">1</th>
      <td>Potatos</td>
      <td>300</td>
      <td>{number+7}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Tomatoes</td>
      <td>50</td>
      <td>{number+8}</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Onions</td>
      <td>40</td>
      <td>{number+0}</td>
    </tr>
  </tbody>
</table>
<p className="float-end" style={{marginRight:"3px"}}>Total:{b}</p>
<br></br>
    </div>;
  </> 
}

export default Tables;
