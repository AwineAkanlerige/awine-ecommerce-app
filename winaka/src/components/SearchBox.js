import React from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap/'
import { useNavigate,} from 'react-router-dom';
import { useState } from 'react';

function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : `/search`)
    }; 
  return (

   <Form className ='d-flex me-auto' onSubmit={submitHandler}>
    <InputGroup>
      <FormControl type="text"
        name="q"
        id="q" onChange = {(e) => setQuery(e.target.value)}
        placeholder="search products..."
        aria-label="Search Products"
        aria-describedby="button-search"
        className='search-box'
      ></FormControl>
         <Button variant="dark" type="submit" id="button-serach"
         className='search-button'>
      <i className='fas fa-search'></i>
    </Button>
  </InputGroup>
</Form>
  )
}

export default SearchBox
