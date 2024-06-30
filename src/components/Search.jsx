import React from 'react'

export const Search = ({query, setQuery}) => {
  const handleChange = (e)=>{
    setQuery(e.target.value);
  }
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
    onChange={handleChange} value={query}/>
  )
}
