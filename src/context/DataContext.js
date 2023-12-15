import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch'
import useWindowSize from '../hooks/useWindowSize';
const DataContext= createContext({});

export const DataProvider = ({children})=>{
    const[search,setSearch]=useState('');
    const[searchResults,setSearchResults]=useState([]);
    const {width} = useWindowSize();
    const[posts,setPosts]=useState([]);
    const {data,fetchError,isLoading}= useAxiosFetch('http://localhost:3500/posts')
    useEffect(()=>{
        setPosts(data);
      },[data])
    
      useEffect (()=>{
        const filteredResults = posts.filter(
            post=>((post.body).toLowerCase()).includes(search.toLowerCase())
          || ((post.title).toLowerCase()).includes(search.toLowerCase())
          ) 
          // we used the || to do the same thing for botth body and the title of the post so that we can search using either of them
          setSearchResults(filteredResults.reverse())
      },[posts,search])

    return (
        <DataContext.Provider value={ {
            width,search,setSearch,searchResults,fetchError,isLoading,
            posts,setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;