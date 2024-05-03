/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

function UpdateForm({ initialData, onSubmit }: any) {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      <label className="mb-2 text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />
      <label className="mt-4 mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
      <input
        type="tel" // Use tel for mobile number input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Update
      </button>
    </form>
  );
}

export default UpdateForm;
