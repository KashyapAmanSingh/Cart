/* eslint-disable @next/next/no-img-element */
  "use client"

 import React from 'react'
  // import MainPage from './mainPage'
import Link from 'next/link';
 
 const Navbar = () => {



  return (
   <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand text-white fw-bolder" href="/">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white fw-bolder" aria-current="page" href="/cart">Cart</Link>
        </li>
     
       {/*  <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">




          <Link  className="dropdown-item" href="/supplements">Supplements</Link>
<Link   className="dropdown-item" href="/footwears">FootWears</Link>
<Link  className="dropdown-item" href="/nutrition">Nutrition</Link>
<Link  className="dropdown-item" href="/equipments">Equipments</Link>



   
          </ul>
        </li>
          */}
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  );



   
 }
 
 export default Navbar

 