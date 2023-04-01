import React, { useState, useRef, useCallback } from 'react'
import useArticleSearch from '../useArticleSearch'
import LoadingSpinner from '../components/LoadingSpinner'
import CardContainer from '../components/CardContainer'
import BackToTopButton from '../components/BackToTopButton'
import ListBackground from '../components/ListBackground'
import { useOutletContext } from 'react-router-dom';
import styled from "styled-components";
import SearchIcon from '../assets/icons/SearchIcon'

export default function List({ list, listTitle }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useOutletContext();

  const { articles, hasMore, loading, error } = useArticleSearch(pageNumber, list, query);

  const observer = useRef(); // for observing the target element before fetching new list

  const lastArticleElementRef = useCallback(el => {
    if (loading) {
      return;// if it is still loading -> don't trigger infinite scroll
    }
    if (observer.current) {
      observer.current.disconnect(); // disconnect previously observing element
    }
    observer.current = new IntersectionObserver(entries => { // set new observer
      if (entries[0].isIntersecting && hasMore) {
        console.log('end of current list');
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (el) {
      observer.current.observe(el); // observe the last element
    }
  }, [loading, hasMore])

  function searchInputHandler(event) {
    setQuery(event.target.value);
    console.log('fetch the first list again');
    setPageNumber(1); // always start at page 1 for new query
  }

  return (
    <Wrapper className='listPageWrapper'>
      <ListBackground list={list} title={listTitle} />
      <BackToTopButton />
      <div className="searchBoxWrapper">
        <SearchIcon />
        <input type="text" placeholder='搜尋新聞' value={query} onChange={searchInputHandler} />
      </div>
      <div className="cardListWrapper">
        {articles.map((article) => {
            return (
              <CardContainer key={article.title}
                title={article.title}
                image={article.image}
                zoneName={article.zoneName}
                channelName={article.channelName}
                href={article.href}
                publishTime={article.publishTime} />
            )
        })}
        <div ref={lastArticleElementRef} />
        {loading && <LoadingSpinner />}
        {error && <h1 className="errorMessage"><b>Error</b></h1>}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.background};

  .searchBoxWrapper {
    display: flex;
    margin: 30px auto;
    justify-content: center;
    align-items: center
  }
  
  .searchBoxWrapper input {
    background-color: ${props => props.theme.inputBackground};
    text-align: center;
    border-radius: 20px;
  }

  .cardListWrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 1900px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 20px;
  }

  h1.errorMessage {
    color: ${props => props.theme.text};
  }
`