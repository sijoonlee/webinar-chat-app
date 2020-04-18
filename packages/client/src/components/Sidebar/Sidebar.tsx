// import './sidebar.scss';

// import React, { useEffect, useState } from 'react';

// import { api } from '../../lib/API';
// import { Link } from 'react-router-dom';
// import { Conversation } from '../../lib/types';

// export const Sidebar = () => {
//   const [convos, setConvos] = useState<Conversation[]>([]);

//   const getConversations = async () => {
//     setConvos(await api.getConversations());
//   };

//   useEffect(() => {
//     getConversations();
//   }, []);

//   return <aside>
//     <div>
//       <Link className="button" to="/c/new">+</Link>
//     </div>
//     <ul>
//       {convos.map(c => <li>
//         <Link to={`/c/${c.id}`}>
//           {c.name}
//         </Link>
//       </li>)}
//     </ul>
//   </aside>;
// };
import './sidebar.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Conversations } from '../../containers/conversations.container';

export const Sidebar = () => {
  const { conversations, loadConversations } = Conversations.useContainer();

  useEffect(() => {
    loadConversations();
  }, []);

  return <aside>
    <div>
      <Link className="button" to="/c/new">+</Link>
    </div>
    <ul>
      {conversations.map(c => <li>
        <Link to={`/c/${c.id}`}>
          {c.name}
        </Link>
      </li>)}
    </ul>
  </aside>;
};
