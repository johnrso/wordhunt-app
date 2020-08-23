import React, { Component } from 'react'
import Container from '@material-ui/core/Container';

export default function SolvedSquare(props) {
  return (
    <Container className = "letter">
      {props.letter}
    </Container>
  );
}
