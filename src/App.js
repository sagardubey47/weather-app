import React, {useState, useEffect} from "react"

import './App.css';

function App() {
  
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [whatError, setWhatError] = useState("");
  
  function handleChange(event) {
    let newValue = event.target.value;
    if(newValue) {
       setValue(event.target.value);
    }
    
  }

  function handleClick(event) {
      event.preventDefault();
      if(value) {
          setError(false); 
          getData(value);
      } else {
        setWhatError("please enter valid city name");
        setError(true);
      }
      setValue("");
  }

  async function getData(cityName) {
     await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=712aa025b9aa4b5d5877eb7bfd92bec8`
    )
    .then((response)=>{
      if(response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        setError(true);
        setWhatError("404 data not found ...  please ensure that city name is correct!");
        throw new Error(response.status);
       }
      })  
    .then((result)=>{
      setData(result);
      setIsLoading(false);
      setError(false);
      console.log(result);
    })
    .catch((error)=>{
      console.log("error is", error);
    })
  }

  function showData() {

    if(isError) {
      return <h3>{whatError}</h3>
    }

    if(isLoading) {
      return <h2>Make a choice in the Input Box Above</h2>;
    }
   
    return(
   <div>
      <h2>{data.city.name}</h2>
      <h3>Temperature {data.list[0].main.temp}</h3>
   </div>)
  }

  return (
    <div className="App">
      <form>
        <label>enter city name:</label>
        <input type="text" value={value} onChange={ handleChange} /> 
        <button type="submit" onClick={handleClick}>enter</button>
      </form>
       {showData()}
    </div>
  );
}

export default App;
