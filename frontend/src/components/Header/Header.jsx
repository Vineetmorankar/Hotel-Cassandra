// import React, { useEffect, useRef, useContext } from 'react'
// import { Container, Row, Button } from 'reactstrap'
// import { NavLink, Link, useNavigate } from 'react-router-dom'
// import Logo from '../../assets/images/logo.png'
// import "./header.css"
// import { AuthContext } from '../../context/AuthContext'

// const nav__links = [
//    {
//       path: '/home',
//       display: 'Home'
//    },
//    {
//       path: '/about',
//       display: 'About'
//    },
//    {
//       path: '/tours',
//       display: 'Hotels'
//    },
// ]

// const Header = () => {
//    const headerRef = useRef(null)
//    const menuRef = useRef(null)
//    const navigate = useNavigate()
//    const { user, dispatch } = useContext(AuthContext)

//    const logout = () => {
//       dispatch({ type: 'LOGOUT' })
//       navigate('/')
//    }

//    const stickyHeaderFunc = () => {
//       window.addEventListener('scroll', () => {
//          if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//             headerRef.current.classList.add('sticky__header')
//          } else {
//             headerRef.current.classList.remove('sticky__header')
//          }
//       })
//    }

//    useEffect(() => {
//       stickyHeaderFunc()

//       return window.removeEventListener('scroll', stickyHeaderFunc)
//    })

//    const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

//    return (
//       <header className='header' ref={headerRef}>
//          <Container>
//             <Row>
//                <div className="nav__wrapper d-flex align-items-center justify-content-between">
//                   {/* ========== LOGO ========== */}
//                   <div className="logo w-20px">
//                      <img src={Logo} alt="" />
//                   </div>
//                   {/* ========================== */}
                   
//                   {/* ========== MENU START ========== */}
//                   <div className="navigation" ref={menuRef} onClick={toggleMenu}>
//                      <ul className="menu d-flex align-items-center gap-5">
//                         {
//                            nav__links.map((item, index) => (
//                               <li className="nav__item" key={index}>
//                                  <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
//                               </li>
//                            ))
//                         }
//                      </ul>
//                   </div>
//                   {/* ================================ */}

//                   <div className="nav__right d-flex align-items-center gap-4">
//                      <div className="nav__btns d-flex align-items-center gap-2">
//                         {
//                            user ? <> 
//                            <h5 className='mb-0'>{user.username}</h5>
//                                  <Button className='btn btn-dark gap-2 ml-2' onClick={logout}>Logout</Button>
//                                  <Button className='btn primary__btn gap-2'><Link to={`/mytours/${user._id}`}>MyBooking</Link></Button>
//                               </> : <>
//                                  <Button className='btn secondary__btn gap-2 '><Link to='/login'>Login</Link></Button>
//                                  <Button className='btn primary__btn gap-2'><Link to='/register'>Register</Link></Button>
//                               </>
//                         }
//                         {/* <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
//                         <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button> */}
//                      </div>

//                      <span className="mobile__menu" onClick={toggleMenu}>
//                         <i class="ri-menu-line"></i>
//                      </span>
//                   </div>
//                </div>
//             </Row>
//          </Container>
//       </header>
//    )
// }

// export default Header


// {/* <Link to={`/mytours/${user._id}`}>
//                      <button className=' booking__btn'>My Tours </button>
//                   </Link> */}


// ===========================================================================================================

import React, { useEffect, useRef, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import "./header.css"
import { AuthContext } from '../../context/AuthContext'

const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Hotels' },
]

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const stickyHeaderFunc = () => {
    if (headerRef.current) { // Ensure headerRef is valid
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current.classList.add('sticky__header')
        } else {
          headerRef.current.classList.remove('sticky__header')
        }
      })
    }
  }

  useEffect(() => {
    stickyHeaderFunc()

    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc) // Cleanup on unmount
    }
  }, []); // Added empty dependency array to ensure this runs only once

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo w-20px">
              <img src={Logo} alt="Logo" />
            </div>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={({ isActive }) => isActive ? 'active__link' : ''}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-2">
                {user ? (
                  <>
                    <h5 className='mb-0'>{user.username}</h5>
                    <Button className='btn btn-dark gap-2 ml-2' onClick={logout}>Logout</Button>
                    <Button className='btn primary__btn gap-2'><Link to={`/mytours/${user.id}`}>My Booking</Link></Button>
                  </>
                ) : (
                  <>
                    <Button className='btn secondary__btn gap-2'><Link to='/login'>Login</Link></Button>
                    <Button className='btn primary__btn gap-2'><Link to='/register'>Register</Link></Button>
                  </>
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header;


