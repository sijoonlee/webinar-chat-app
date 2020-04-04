import React from 'react';

import { Sidebar } from '../../components/Sidebar/Sidebar';


export const HomePage = () => {

  return <main className="home">
    <Sidebar />
  </main>;
};

// import { Link } from 'react-router-dom'; // this will leave history through History
// export const HomePage = () => {
//   return <div>
//     <h1>Chat app</h1>
//     <Link to="/second">Go to the second page</Link>
//   </div>;
// };
