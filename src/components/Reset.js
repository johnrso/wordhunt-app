import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

export default function Submit(props) {
  return (
    <Container className = "submit" onClick = {props.onClick}>
      <Button variant="contained">RESET</Button>
    </Container>
  );
}
