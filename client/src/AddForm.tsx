import { useState } from "react";

function AddForm({ onSubmit }: any) {
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', phone: '' }); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center  w-full mt-4">
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
        type="tel" 
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add New
      </button>
    </form>
  );
}

export default AddForm;
