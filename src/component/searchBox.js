import React, { useState } from 'react';
import './searchBox.css'


const articles = [
  {
    title: 'Creating a Chrome extension with Vue.js and Node.js',
    author: 'Ayushman Gupta',
    content:'The main problem that I have with default new tab is that it is little too simple. It limits users to only eight shortcuts and it uses favicons of those websites for the preview. The favicons are usually very small (16×16px) and when they are used anywhere other than the tab they look blurry. This pet peeve forced me to create my own Chrome extension with subtle traits that I like.'
  },
  {
    title: 'Mental Health',
    author: 'Miricyl',
    content: 'Are you looking for a way to make a difference in the lives of children and young people affected by mental illness? Look no further… The Miricyl charity is dedicated to providing digital solutions to help young people and their families, and we need your support to make it happen.'
  },
  {
    title: 'DEFINITE AND INDEFINITE ARTICLES',
    author: 'butte edu',
    content: "In English there are three articles: a, an, and the. Articles are used before nouns or noun equivalents and are a type of adjective. The definite article (the) is used before a noun to indicate that the identity of the noun is known to the reader. The indefinite article (a, an) is used before a noun that is general or when its identity is not known. There are certain situations in which a noun takes no article. As a guide, the following definitions and table summarize the basic use of articles. Continue reading for a more detailed explanation of the rules and for examples of how and when to apply them."
  }
];

const SearchBox = () => {
  const [searchedTerms, setsearchedTerms] = useState('');
  
  const handleInputChange = (event) => {
    setsearchedTerms(event.target.value);
  };

  const getHighText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  

  const totalFounds = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.filter((part) => part.toLowerCase() === highlight.toLowerCase()).length;
  };

  const searchedFounded = () => {
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchedTerms.toLowerCase()) ||
      article.content.toLowerCase().includes(searchedTerms.toLowerCase())
    );
  };

  const founds= searchedFounded();
  
  return (
    <div>
      <input
      className='searchBox'
        type="text"
        value={searchedTerms}
        onChange={handleInputChange}
        placeholder="Search..."
      />
       <p>Found {founds.length} articles with {totalFounds(articles.map((article) => article.content).join(' '), searchedTerms)} highlights.</p>
      <ul>
        {searchedFounded().map((article, index) => (
          <li key={index}>
            <h3>{getHighText(article.title, searchedTerms)}</h3>
            <p>{getHighText(article.content, searchedTerms)}</p>
            <p>Author: {article.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
