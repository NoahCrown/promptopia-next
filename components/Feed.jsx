
'use client'

import {useState, useEffect} from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout '>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))
      }
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('') 
  const [posts, setPosts] = useState([])
  const handleSearchChange = async (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
    console.log(searchText)
  }

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      try {
        const response = await fetch(`/api/search`, {
          method: "POST",
          body: JSON.stringify({
            searchText
          }),
        });
  
        if (response.ok) {
          const data = await response.json(); 
          setPosts(data)
        } else {
          console.error('Failed to fetch search results');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTagClick = async (tag) => {
    try {
      const response = await fetch(`/api/search`, {
        method: "POST",
        body: JSON.stringify({
          searchText:tag
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        setPosts(data)
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)

    }

  

    fetchPosts()

  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          required
          className='search_input peer'

        />

      </form>

      <p className='text-sm font-satoshi text-gray-400'>*Tip: If you wanna reset the data, just enter enter on the search bar to get all the results.</p>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}

      />

    </section>
  )
}

export default Feed
