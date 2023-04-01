import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styled, { useTheme } from 'styled-components';

export default function CardContainer({title, image, zoneName, channelName, href, publishTime}) {
  const theme = useTheme();
  return (
      <StyledCard bg={theme.mode} text={theme.bootstrapText}>
        <StyledCardImg variant="top" src={image} />
        <Card.Body>
          <StyledCardTitle>{title}</StyledCardTitle>
        <StyledListGroup className="list-group-flush">
          <StyledListGroupItem className="channel-info">
            <span className="zone">
              <b>Zone: </b>{zoneName}
            </span>
            <span className="channel">
              <b>Channel: </b>{channelName}
            </span>
          </StyledListGroupItem>
          <StyledListGroupItem className="created-time"><b>建立時間: </b>{publishTime}</StyledListGroupItem>
        </StyledListGroup>
        <StyledCardButton variant="primary"><a href={href} target="_blank" rel="noopener noreferrer">前往閱讀</a></StyledCardButton>
        </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 480px;
  height: 530px;
  box-shadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.2)
`
const StyledCardImg = styled(Card.Img)`
  height: 300px;
  max-width: 100%;
  object-fill: fill;
`
const StyledCardTitle = styled(Card.Title)`
  display: block;
  height: 28%;
`

const StyledListGroup = styled(ListGroup)`
  height: 45%;
`

const StyledListGroupItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.text};

  &.channel-info {
    background-color: ${(props) => props.theme.bootstrapCardTextBackground1};
    borderRadius: 10px 10px 0px 0px;
  }

  span.zone {
    text-align: left;
  }

  span.channel {
    text-align: right;
  }

  &.created-time {
    background-color: ${(props) => props.theme.bootstrapCardTextBackground2};
    borderRadius: 0px 0px 10px 10px;
  }
`

const StyledCardButton = styled(Button)`
  display: block;
  margin: 10px auto;

  a {
    color: inherit;
    text-decoration: inherit;
  }
`