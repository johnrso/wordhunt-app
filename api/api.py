from flask import Flask, request, jsonify, json

from board import Board
from solver import GraphSolver
from player import Player
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

current = Board('./dictionaries/webster_dictionary.json')
solver = GraphSolver(current)

solver.solve()

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/solve', methods=["POST", "GET"])
@cross_origin(origin='localhost')
def startSolve():
    global current, solver
    if request.method != "GET":
        args = request.get_json()
        if len(args["letters"]) == 16:
            current = Board('./dictionaries/webster_dictionary.json', letters = args["letters"])
            solver = GraphSolver(current)
            solver.solve()
            p = Player(current, solver.getSolutions())
            p.play()

            letters = []
            for i in range(current.width):
                for j in range(current.height):
                    letters.append(str(current.board[i][j]))

            return jsonify(solved = solver.getSolutions(), words = current.getOrderedList())
        else:
            return "Incorrectly formatted board."
    else:
        letters = []
        for i in range(current.width):
            for j in range(current.height):
                letters.append(str(current.board[i][j]))

        return jsonify(board = letters, solved = solver.getSolutions(), words = current.getOrderedList())

if __name__ == "__main__":
    app.run(debug = True)
