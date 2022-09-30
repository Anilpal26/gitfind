import React from 'react';
import { useRef } from 'react';

const Search = ({searchedUsername , isSuccessful}) => {

  const inputRef = useRef();

  const searched = (e) => {
    e.preventDefault();
    const searchKeyword = inputRef.current.value;
    searchedUsername(searchKeyword);
  }

  return (
    <div className='card search'>
      <h2>Search for Username</h2>
      <form onSubmit={searched}>
        <input type='text' ref={inputRef}/>
        <button type='submit'>Search</button>
      </form>
      {isSuccessful === false ? (
        <p className='incorrect'>Invalid Username</p>
      )  : true }
    </div>
  )
}

export default Search;