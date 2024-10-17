// import React, { useState } from 'react';
// import { BASE_URL } from '../utils/config'
// import './addtour.css';

// const AddTourForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: 0,
//     price: 0,
//     maxGroupSize: 0,
//     desc: '',
//     photo: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//       e.preventDefault()
      
//       try {

//          const res = await fetch(`${BASE_URL}/tours`, {
//             method: 'post',
//             headers: {
//                'content-type': 'application/json'
//             },
//             credentials: 'include',
//             body: JSON.stringify(formData)
//          })

//          const result = await res.json()

//          if(!res.ok) {
//             return alert(result.message)
//          }
//          alert('Submitted successfully');
//          setFormData({
//         title: '',
//         city: '',
//         address: '',
//         distance: 0,
//         price: 0,
//         maxGroupSize: 0,
//         desc: '',
//         photo: '',
//       });
//       } catch (error) {
//          alert(error.message)
//       }   
//    }
  

   
   

//   return (
//     <form className="form-container" onSubmit={handleSubmit}>
//   <input className="form-input" type="text" name="title" placeholder="Title" onChange={handleChange} />
//   <input className="form-input" type="text" name="city" placeholder="City" onChange={handleChange} />
//   <input className="form-input" type="text" name="address" placeholder="Address" onChange={handleChange} />
//   <input className="form-input" type="number" name="distance" placeholder="Distance" onChange={handleChange} />
//   <input className="form-input" type="number" name="price" placeholder="Price" onChange={handleChange} />
//   <input className="form-input" type="number" name="maxGroupSize" placeholder="Max Group Size" onChange={handleChange} />
//   <textarea className="form-textarea" name="desc" placeholder="Description" onChange={handleChange} />
//   <input className="form-input" type="text" name="photo" placeholder="Photo URL" onChange={handleChange} />
//   <button className="form-submit" type="submit">Submit</button>
// </form>
//   );
// };

// export default AddTourForm;

import React, { useState } from 'react';
import { BASE_URL } from '../utils/config';
import './addtour.css';

const AddTourForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    price: 0,
    maxGroupSize: 0,
    desc: '',
    photo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/tours`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      alert('Submitted successfully');
      setFormData({
        title: '',
        city: '',
        address: '',
        distance: 0,
        price: 0,
        maxGroupSize: 0,
        desc: '',
        photo: '',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-column">
        <label htmlFor="title">Title:</label>
        <input className="form-input" type="text" id="title" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        
        <label htmlFor="city">City:</label>
        <input className="form-input" type="text" id="city" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        
        <label htmlFor="address">Address:</label>
        <input className="form-input" type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        
        <label htmlFor="distance">Distance:</label>
        <input className="form-input" type="number" id="distance" name="distance" placeholder="Distance" value={formData.distance} onChange={handleChange} />
      </div>
      
      <div className="form-column">
        <label htmlFor="price">Price:</label>
        <input className="form-input" type="number" id="price" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        
        <label htmlFor="maxGroupSize">Max Group Size:</label>
        <input className="form-input" type="number" id="maxGroupSize" name="maxGroupSize" placeholder="Max Group Size" value={formData.maxGroupSize} onChange={handleChange} />
        
        <label htmlFor="desc">Description:</label>
        <textarea className="form-textarea" id="desc" name="desc" placeholder="Description" value={formData.desc} onChange={handleChange} />
        
        <label htmlFor="photo">Photo URL:</label>
        <input className="form-input" type="text" id="photo" name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} />
      </div>
      
      <button className="form-submit" type="submit">Submit</button>
    </form>
  );
};

export default AddTourForm;
