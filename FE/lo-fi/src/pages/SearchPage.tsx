import React, {useEffect} from 'react'
import Category from '../components/Category'
import './SearchPage.css'
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';


export default function SearchPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log('로그인 되지 않음')
      navigate('/login')
    }
  }, [])
  const category: string = "list"

  return (
    <div style={{height: '100%', width: '100%'}}>
      <SearchBar category={category}/>
      <Category/>
      <List/>
    </div>
  )
}
