import React, { Component } from 'react'

import LinkedItem from "./LinkedItem"

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


export default function List(props) {
  let retval = [], dict = props.words;
  for (var key in dict) {
    retval.push(
      <li><LinkedItem val = {dict[key]}/></li>
    )
  }

  if (retval.length == 0) {
    return (
      <Container className = "list-non">
        <p>no words found :&#40;</p>
      </Container>
    )
  } else {
    return (
      <Container className = "list">
      <ol>
      {retval}
      </ol>
      </Container>
    );
  }
}
