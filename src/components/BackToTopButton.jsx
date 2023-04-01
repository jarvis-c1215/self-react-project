import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
  };

  const listenToScroll = () => {
    let heightToHidden = 400;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if(winScroll > heightToHidden) {
        setIsVisible(true);
    }else {
        setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return (
    <Wrapper>
        {isVisible && (
            <div className='top-btn' onClick={goToBtn}>
            <FaArrowUp className="top-btn--icon" />
            </div>
        )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .top-btn {
    font-size: 1.8rem;
    width: 4rem;
    height: 4rem;
    color: #fff;
    background-color: rgb(0, 51, 232);
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;;
    border-radius: 50%;
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &--icon {
      animation: gototop 1.2s linear infinite alternate-reverse;
    }
    @keyframes gototop {
      0% {
        transform: translateY(-0.5rem);
      }
      100% {
        transform: translateY(1rem);
      }
    }
  }
  @media (max-width: 768px) {
    .top-btn {
      right: 0;
      left: 80%;
    }
  }
`;