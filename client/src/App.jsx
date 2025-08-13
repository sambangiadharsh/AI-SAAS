import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import WriteArticle from './Pages/WriteArticle'
import BlogTitles from './Pages/BlogTitles'
import Layout from './Pages/Layout'
import Community from './Pages/Community'
import RemoveBackground from './Pages/RemoveBackground'
import RemoveObject from './Pages/RemoveObject'
import ReviewResume from './Pages/ReviewResume'
import GenerateImages from './Pages/GenerateImages'
import { useAuth } from '@clerk/clerk-react'
import {Toaster} from 'react-hot-toast'
import AboutUs from './Pages/AboutUs'
import Contact from './Pages/Contact'
const App = () => {
  
    const {getToken}=useAuth();
    useEffect(()=>{
      getToken().then((token)=>console.log(token));
    })
  
  return (
    <div>
      <Toaster/>
      <Routes >
     
        <Route path='/' element={<Home/>}/>
        <Route path='/ai' element={<Layout/>}>
        <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='write-article' element={<WriteArticle/>}/>
          <Route path='blog-titles' element={<BlogTitles/>}/>
          <Route path='community' element={<Community/>}/>
          <Route path='remove-background' element={<RemoveBackground/>}/>
          <Route path='remove-object' element={<RemoveObject/>}/>
          <Route path='review-resume' element={<ReviewResume/>}/>
          <Route path='generate-image' element={<GenerateImages/>}/>
        
            
        </Route>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>}/>

      </Routes>
    </div>
  )
}

export default App
