// import { useEffect, useState } from 'react';
// import { UserDataContext } from '@/client_ts/Contexts.ts';
//
// export const UserProvider = (props: any) => {
//   const [ user, setUser ] = useState<UserDataContext | null>(null)
//
//   const [ isReady, setIsReady ] = useState(false);
//
//
//   const loadFromLocalStorage = () => {
//     try {
//       const serializedState = localStorage.getItem('state');
//       if (serializedState == null) return undefined;
//       return JSON.parse(serializedState);
//     } catch (err) {
//       console.log(err);
//       return null;
//     }
//   };
//
//   useEffect(() => {
//     const state = loadFromLocalStorage();
//     setIsReady(true);
//   }, [])
//
//   return (
//     <UserContext.Provider value={ { getData: user, setData: setUser } }>
//       { isReady ? props.children : null }
//     </UserContext.Provider>
//   );
// }
