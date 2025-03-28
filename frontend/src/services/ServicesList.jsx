import React from 'react'
import ServicesCard from './ServicesCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
        {
            imgUrl: weatherImg,
            title: "Calculate Weather",
            desc: "Get accurate and fast weather predictions.",
        },
        {
            imgUrl: guideImg,
            title: "Book a Guide",
            desc: "Book a tour guide for your trip.",
        },
        {
            imgUrl: customizationImg,
            title: "Customization",
            desc: "Customize your travel experience to your preferences.",
        }
]

const ServicesList = () => {
  return (
    <>
    {
        servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4 ư' key={index}>
                <ServicesCard item ={item} />
            </Col>
        ))
    }
    </>
  )
}

export default ServicesList;
