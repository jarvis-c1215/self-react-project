import React from "react";
import styled from "styled-components";
import logoVideo from "../assets/videos/logo-video.mp4";

//Downloaded from: https://www.pexels.com/search/videos/

export default function HomePageBackground({ title }) {
  let video = logoVideo;

  return (
    <Wrapper className="homepageBackground">
      <div className="overlay" />
      <video src={video} autoPlay muted />
      <div className="content">
        <h1>{title}</h1>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width:100%;
  height:100%;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.mode === 'dark' ? props.theme.backgroundOverlay : undefined };
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 200px;
    top: -30px;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Microsoft JhengHei", "Arial Narrow Bold", sans-serif;
  }
  h1 {
    display: block;
    text-align: left;
    margin: 15px auto;
    font-size: 4vw;
    color: ${(props) => props.theme.text};
  }
`;