import React from 'react'
import { withRouter } from "react-router-dom";
import {footerLinks} from '../../../constants/index'
import "./footer.css"


const Footer = () => {
  return (
    <footer className='flex flex-col text-white mt-5 border-t border-gray-100'>
      <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
        <div className='flex flex-col justify-start items-start gap-6'>
          {/* <Image src="/logo.svg" alt="logo" 
          width="118" height="18" className='object-contain'/> */}
          <p className='text-base text-white'>
            Lieu 2025<br/>
            All rights reserved &copy;
          </p>
        </div>
          <div className='footer__links'>
            {footerLinks.map((link) => (
              <div key={link.title} className='footer__link'>
                <h3 className='font-bold'>
                  {link.title}</h3>
                  {link.links.map((item) => (
                    <a 
                    key={item.title}
                    href={item.url}
                    className='text-white'>
                    {item.title}
                    </a>
                  ))}
              </div>
            ))}
          </div>
          </div>
          <div className='flex justify-between items-center flex-wrap
          mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
            <p> @2025 Lieu. All Rights Reserved.</p>
            <div className='footer__copyrights-link'>
              <a href="/" className='text-white'>
                Privacy Policy
              </a>
              <a href="/" className='text-white'>
                Terms of Use
              </a>
            </div>
          </div>
    </footer>
  )
}

export default withRouter(Footer)