import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({PagesText}) {
  return <>
       <nav aria-label="breadcrumb" className='mx-5 pt-1 pb-0 mb-0'>
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                  <li className="breadcrumb-item text-sm">
                    <Link className="opacity-5 text-dark" to="/">
                      Admin
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item text-sm text-dark active"
                    aria-current="page"
                  >
                    {PagesText}
                  </li>
                </ol>
               
              </nav>
  </>;
}

export default Breadcrumb;
