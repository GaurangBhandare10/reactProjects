import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes} from 'react-router-dom' 
import EditPost from './EditPost';
import { DataProvider } from './context/DataContext'

function App() {
  return (
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route  index  element={<Home/>}/>
             {/* here we used the searchResults in the posts prop bcoz we want to add the functionality of displaying the post by searching 
            as well as displaying the post in reverse order * this is similar to the thing 
            which we did in chapter 9 just that here we defined an extra varaible searchresults and setSearchResults */}
              <Route  path="post">
                <Route index element={<NewPost/>}/>
                  <Route  path=":id" element={<PostPage/>}/>
              </Route>
              <Route path= 'edit'>
                <Route path=':id' index element={<EditPost/>}/>
              </Route>
              <Route  path='about' element={<About/>}/> 
              <Route path="*" element={<Missing/>}/>
          </Route>
        </Routes>
    </DataProvider>
  );
}

export default App;
