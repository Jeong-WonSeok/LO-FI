import React, {useState} from 'react'
import Category from '../components/Category'
import './SearchPage.css'
import List from '../components/List';
import SearchBar from '../components/SearchBar';



export default function SearchPage() {
  const category: string = "list"

  return (
    <div style={{height: '100%', width: '100%'}}>
      <SearchBar category={category}/>
      <Category/>
      <List/>
    </div>
  )
}
