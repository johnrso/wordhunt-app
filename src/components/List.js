import React, { Component } from 'react'

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


export default function List(props) {
  let retval = []
  for (const letter of props.letters.entries()) {
    retval.push(
      <li>{letter}</li>
    )
  }
  return (
    <Container className = "list">
      <h1>Word Hunt Solver</h1>
      {props.letters}
    </Container>
  );
}
