import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Exclusive Deals`,
      desc: `Access to exclusive discounts and offers on hotel bookings, ensuring you get the best possible rates for your stay.`,
   },
   {
      imgUrl: guideImg,
      title: `Wide Selection`,
      desc: `A vast range of hotels, resorts, and accommodations worldwide, catering to every budget and preference, ensuring you find the perfect place to stay.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Flexible Booking Options',
      desc: `Flexible booking policies that allow you to modify or cancel reservations easily, providing peace of mind and convenience for your travel plans.`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList