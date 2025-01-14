import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({ tour, avgRating }) => {
   const {title, price, reviews, photo, city, address } = tour
   const navigate = useNavigate()

   const { user } = useContext(AuthContext)

   const [booking, setBooking] = useState({
      userId: user && user.id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: '',
      bookUpto: '',
      price:price,
      reviews:reviews,
      photo:photo,
      city:city,
      address:address
   })

   const handleChange = e => {
      setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

const serviceFee = 2;
const bookAtDate = new Date(booking.bookAt);
const bookUptoDate = new Date(booking.bookUpto);
if(bookUptoDate<=bookAtDate) alert("Select correct dates");
const daysDifference = Math.ceil((bookUptoDate - bookAtDate) / (1000 * 60 * 60 * 24)); // Calculate difference in days
const totalAmount = (Number(price) * Number(booking.guestSize)) * daysDifference + Number(serviceFee);
 // Adding one day to bookAtDate

   const handleClick = async e => {
      e.preventDefault()
      console.log(booking)
      
      try {
         if (!user || user === undefined || user === null) {
            return alert('Please sign in')
         }

         const res = await fetch(`${BASE_URL}/booking`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(booking)
         })

         const result = await res.json()

         if(!res.ok) {
            return alert(result.message)
         }
         navigate('/thank-you')
      } catch (error) {
         alert(error.message)
      }   
   }

   return (
      <div className='booking'>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>${price} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
               <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
         </div>

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <input type="tel" placeholder='Phone' id='phone' required
                     onChange={handleChange} />
               </FormGroup>
               {/* <FormGroup>
                  <input type="email" placeholder='userEmail' id='userEmail' required
                     onChange={handleChange} />
               </FormGroup> */}
               <FormGroup className='d-flex align-items-center gap-3'>
                  <input type="date" placeholder='' id='bookAt' required
                     onChange={handleChange} />
                  <input type="date" placeholder='' id='bookUpto' required
                     onChange={handleChange} min={booking.bookAt} />
               </FormGroup>
               <FormGroup className='d-flex align-items-center gap-3'>
                 <input type="number" placeholder='Guest' id='guestSize' required
                     onChange={handleChange} />
               </FormGroup>
               
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}


         {/* =============== BOOKING BOTTOM ================ */}
         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>${price} <i class='ri-close-line'></i> 1 person</h5>
                  <span> ${price}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0'>
                  <h5>Service charge</h5>
                  <span>${serviceFee}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0 total'>
                  <h5>Total</h5>
                  {/* <span>${totalAmount}</span> */}
                  <span>${isNaN(totalAmount) ? 0 : totalAmount}</span>
               </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick} disabled={booking.bookAt === booking.bookUpto}>Book Now</Button>
         </div>
      </div>
   )
}

export default Booking