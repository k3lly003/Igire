"use client";

import React, { useState } from 'react';

export default function PurchaseForm() {
  const [formData, setFormData] = useState({
    item_name: '',
    item_description: '',
    item_category: '',
    quantity: '',
    unit_price: '',
    total_price: '',
    product_status: '',  
    status: 'pending',  // Default to 'pending'
    date_requested: '',
  });

  const [loading, setLoading] = useState(false);  
  const [message, setMessage] = useState(null);   

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  
    setMessage(null);  
  
    // Ensure the form's status is automatically set to "pending"
    const updatedFormData = {
      ...formData,
      status: 'pending',  
    };
  
    try {
      const response = await fetch('https://iro-website-bn.onrender.com/api/Inventory/requests/createReq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage({ type: 'success', text: 'Form submitted successfully' });
  
        // Reset the form data after successful submission
        setFormData({
          item_name: '',
          item_description: '',
          item_category: '',
          quantity: '',
          unit_price: '',
          total_price: '',
          product_status: '',
          status: 'pending',  // Default to 'pending'
          date_requested: '',
        });
      } else {
        setMessage({ type: 'error', text: `Error submitting the form: ${result.message}` });
      }
  
      console.log('Form Data Submitted:', updatedFormData);
      console.log('API Response:', result);
    } catch (error) {
      setMessage({ type: 'error', text: `Error submitting form: ${error.message}` });
      console.error('Error submitting form:', error);
    }
  
    setLoading(false);  
  };
  

  return (
    <section className='p-2'>
      <form onSubmit={handleSubmit} className=" mx-auto max-w-2xl bg-gray-100 p-6 rounded-lg shadow-md">
        <p className='text-xl mb-6 flex justify-center items-center'>New product request form</p>
        
        {message && (
          <div
            className={`mb-4 p-2 text-center ${
              message.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
            } rounded-md`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-md mb-1">Name</label>
            <input
              type="text"
              name="item_name"
              placeholder="Name"
              value={formData.item_name}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 border rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Category</label>
            <select
              name="item_category"
              value={formData.item_category}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md"
            >
              <option value="">Category</option>
              <option value="welfare">Walfare</option>
              <option value="furniture">Furniture</option>
              <option value="electronic">Electronic</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 border rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Unit Price</label>
            <input
              type="number"
              name="unit_price"
              placeholder="Price"
              value={formData.unit_price}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 border rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Total Price</label>
            <input
              type="number"
              name="total_price"
              placeholder="Price"
              value={formData.total_price}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 border rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Product Status</label>
            <select
              name="product_status"
              value={formData.product_status}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md"
            >
              <option value="">Product Status</option>
              <option value="new">New</option>
              <option value="secondHand">Second Hand</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Date Requested</label>
            <input
              type="date"
              name="date_requested"
              value={formData.date_requested}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 border rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Description</label>
            <input
              type="text"
              name="item_description"
              placeholder="Description"
              value={formData.item_description}
              onChange={handleChange}
              className="w-full text-sm px-3 py-2 border rounded-md"
              rows="3"
            />
          </div>
        </div>
        
        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={loading}  
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  );
}
