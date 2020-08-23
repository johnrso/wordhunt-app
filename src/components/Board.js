import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Square from './Square.js'
import List from './List.js'
import Submit from './Submit.js'

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: new Array(16).fill('A')
    };
  }

  handlerGen(i) {
    return (e) => {
      const letters = this.state.letters.slice();
      letters[i] = e.target.value;
      this.setState({letters: letters});
    }
  }

  handleClick() {
    this.setState({letters: new Array(16).fill("Z")})
  }

  renderSquare(i) {
    return (
      <Square
        letter = {this.state.letters[i]}
        handleChange = {this.handlerGen(i)}
      />
    );
  }

  render() {
    var retval = [];
    for (var i = 0; i < 16; i++) {
      retval.push(
        <Grid item xs={3}>
          <Paper className = "tile">{this.renderSquare(i)}</Paper>
        </Grid>
      )
    }
    return (
      <div>
        <Container className = "game">
          <Grid container spacing={3}>
            <Grid item xs={1}/>
            <Grid item xs={5}>
              <List
                letters = {this.state.letters}
              />
              <Submit
                onClick={() => this.handleClick()}
              />
            </Grid>
            <Grid item xs = {5}>
              <Container className = "board">
                <Grid container spacing={1}>
                  {retval}
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
