import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './about.css'; // Import CSS module

const About = () => {
   return (
      <section>
         <Container className={styles.section}>
            <Row>
               <Col>
                  <h2 className={styles.heading}>
                     Welcome to BookNow
                  </h2>
                  <p className={styles.paragraph}>
                     Your ultimate destination for hassle-free hotel bookings. Our platform offers a seamless and user-friendly experience, allowing you to find the perfect accommodation tailored to your preferences and budget. With exclusive deals, a diverse selection of hotels worldwide, and flexible booking options, we strive to make every stay memorable. Our team is dedicated to providing exceptional service and ensuring that your travel experience is nothing short of extraordinary. Explore our website and unlock a world of endless possibilities for your next getaway.
                  </p>
                  <Link to="/tours" className={styles.button}>
                     Explore Now
                  </Link>
               </Col>
            </Row>
         </Container>
      </section>
   );
};

export default About;
