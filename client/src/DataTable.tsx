/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import UpdateForm from './UpdateForm';
import AddForm from './AddForm';

function DataTable({ data, onAdd, onUpdate, onDelete }: any) {
  const [filteredData, setFilteredData] = useState<{id: number, name: string, phone: string}[]>(data);
  const [item, setItem] = useState<{id: number, name: string, phone: string}>();
  const [isUpdate, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    setFilteredData(data);  
  }, [data]);

  const handleAdd = (newData: any) => {
    onAdd(newData);
  };

  const handleUpdate = (updatedData: any) => {
    // onUpdate(id, updatedData);
    setUpdate(true);
    setItem(updatedData)
  };

  const onUpdateSubmit = (e: any) => {
    onUpdate(e) 
    setUpdate(false);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <div className="flex flex-col">  
     {!isUpdate &&  <>
      {onAdd && <div className='py-5'>
        <AddForm onSubmit={handleAdd}/></div>}
      <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider bg-gray-300">
              Name
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider bg-gray-300">
              Mobile Number
            </th>
            <th className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider bg-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">  
          {filteredData && filteredData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-left">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-left">{item.phone}</td>
              <td className="px-6 py-4 text-right">
                <button
                  className="px-2 py-1 mr-2 text-sm font-medium text-green-500 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  className="px-2 py-1 text-sm font-medium text-red-500 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
     </>} 
      {
        isUpdate && <UpdateForm initialData={item} onSubmit={onUpdateSubmit}/>
      }
     
    </div>
  );
}

export default DataTable;
