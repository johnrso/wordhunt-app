from flask import Flask, request, jsonify

from board import Board
from solver import GraphSolver
from player import Player

app = Flask(__name__)

current = None
solver = None

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/solve', methods=["POST", "GET"])
def startSolve():
    global current, solver
    error = None
    if request.method == "POST":
        args = request.get_json()
        if len(args["board"]) == 16:
            current = Board('./dictionaries/webster_dictionary.json', letters = args["board"])
            solver = GraphSolver(current)
            solver.solve()
            return "success"
        else:
            return "Incorrectly formatted board."
    else:
        letters = []
        for i in range(current.width):
            for j in range(current.height):
                letters.append(str(current.board[i][j]))

        if solver:
            return jsonify(board = letters, solved = solver.getSolutions())
        else:
            return jsonify(board = letters, words = [])

if __name__ == "__main__":
    current = Board('./dictionaries/webster_dictionary.json')
    app.run(debug = True)
