import React, { Component }from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Square from './Square.js'
import SolvedSquare from './SolvedSquare.js'
import List from './List.js'
import Submit from './Submit.js'
import Reset from './Reset.js'

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: new Array(16).fill('A'),
      words: [],
      moves:[],
      solved: false
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
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"letters": this.state.letters})
      };

    fetch('http://localhost:5000/solve', requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState(
        {
          words: data.words,
          moves: data.solved,
          solved: true
        }
      )
    );
  }

  handleClick2() {
    this.setState({
      solved: false
    })
  }
  renderSquare(i) {
    if (this.state.solved) {
      return (
        <SolvedSquare
        letter = {this.state.letters[i]}
        />
      );
    } else {
        return (
          <Square
          letter = {this.state.letters[i]}
          handleChange = {this.handlerGen(i)}
          />
        );
    }
  }

  render() {
    var squares = [];
    var disp = [];

    for (var i = 0; i < 16; i++) {
      squares.push(
        <Grid item xs={3}>
          <Paper className = "tile">{this.renderSquare(i)}</Paper>
        </Grid>
      )
    }

    disp.push(
      <h1>Word Hunt Solver</h1>
    )
    if (this.state.solved) {
      disp.push(
        <List
          words = {this.state.words}
        />
      );
      disp.push(
        <Reset
          onClick={() => this.handleClick2()}
        />
      );
    } else {
      disp.push(
        <p>This app was made using React tied to a Flask backend.
            Enter the letters of the board on the right, and click "SOLVE" to find
            all words on the board. </p>
          );
      disp.push(
        <p> Disclaimer: not all words guaranteed to be
            valid, as the game's dictionary is not public. Regardless, Enjoy! </p>
          );
      disp.push(
        <Submit
          onClick={() => this.handleClick()}
        />
      );
    }

    return (
      <div>
        <Container className = "game">
          <Grid container spacing={3}>
            <Grid item xs={1}/>
            <Grid item xs={5}>
              <Container className = "disp">
                {disp}
              </Container>
            </Grid>
            <Grid item xs = {5}>
              <Container className = "board">
                <Grid container spacing={1}>
                  {squares}
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
