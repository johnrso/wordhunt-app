from board import Board, Square
import time

class Player:

    def __init__(self, board, wordList):
        self.wordList = wordList
        self.board = board

    def play(self):
        while (len(self.wordList) > 0):
            curr = self.wordList.pop(0)
            for coord in curr:
                print(self.board)
                if coord == '-':
                    self.board.add_word()
                else:
                    self.board.add_letter(coord)
