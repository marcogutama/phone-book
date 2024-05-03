/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { baseUrl as url } from "./config/config";

const baseUrl = `${url}/api`;

function App() {
  // const [isLoading, setLoading] = useState(false); 
  const [state, setSate] = useState<{id: number; phone: string; name: string;}[]>();

  useEffect(() => {
    fetchData();
  },[])
  
  const fetchData = () => {
    axios.get(`${baseUrl}/mobile-numbers`)
    .then(function (response) {
      // handle success
      console.log(response);
      setSate(response.data);
    })
    .catch(function (error) {
      // handle error 
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  const addNewItem = (item: any) => {
    console.log(item);
    axios.post(`${baseUrl}/mobile-numbers`, item)
    .then(function (response) {     
      // handle success
      console.log(response);
      fetchData();
    })
    .catch(function (error) {      
      // handle error 
      console.log(error);
    })
    .finally(function () {
      // setLoading(false);
      // always executed
    });
  } 

  const updateItem = (data: any) => {
    console.log(data);
    axios.put(`${baseUrl}/mobile-numbers/${data.id}`, data)
    .then(function (response) {     
      // handle success
      console.log(response);
      fetchData();
    })
    .catch(function (error) {      
      // handle error 
      console.log(error);
    })
    .finally(function () {
      // setLoading(false);
      // always executed
    });
  }

  const deleteItem = (id: number) => {
    // setLoading(true);
    axios.delete(`${baseUrl}/mobile-numbers/${id}`)
    .then(function (response) {     
      // handle success
      console.log(response);
      setSate(state?.filter(x => x.id !== id))
    })
    .catch(function (error) {      
      // handle error 
      console.log(error);
    })
    .finally(function () {
      // setLoading(false);
      // always executed
    });
    
  }

  return (
    <div className="p-20">
      <DataTable data={state} onAdd={addNewItem} onUpdate={updateItem} onDelete={deleteItem}/>
    </div> 
  )
}

export default App
