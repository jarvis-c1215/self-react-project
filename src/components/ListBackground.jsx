import React from "react";
import newsVideo from "../assets/videos/google-video.mp4";
import googleVideo from "../assets/videos/newspaper-video.mp4";
import styled from "styled-components";

//Downloaded from: https://www.pexels.com/search/videos/

export default function Background({ list, title }) {
  let video;
  if (list === "hot") {
    video = newsVideo;
  }
  if (list === "latest") {
    video = googleVideo;
  }

  return (
      <Wrapper className="background">
        <div className="overlay" />
        <video src={video} autoPlay loop muted />
          <div className="content">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/HK01_Logo.svg"
              alt="HK01"
            />
            <h1>{title}</h1>
        </div>
      </Wrapper>
  );
}

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 300px;
    margin-bottom: 0px;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background-color: ${(props) => props.theme.backgroundOverlay};
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    font-family: "Microsoft JhengHei", "Arial Narrow Bold", sans-serif;
  }
  img {
    width: 150px;
    height: 100px;
    minwidth: 100px;
    margin: 15px auto;
    filter: ${(props) => props.theme.mode === 'dark' ? 'brightness(0%) invert(100%)' : undefined };
  }
  h1 {
    color: ${(props) => props.theme.text};
    text-align: center;
    margin: 15px auto;
  }
`;
