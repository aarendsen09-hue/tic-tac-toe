const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
const screen = document.querySelector(".screen");
const below = document.querySelector(".below");
const restart = document.querySelector(".restart");
const result = document.querySelector("h1");

const gameboard = (() => {
    let board = [0,0,0,0,0,0,0,0,0];

    const getBoard = () => board;
    var isPlayable = true;

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            makeMove(box.dataset.index);
            renderBoard();
        })
    });

    restart.addEventListener("click", () => {
        clearBoard();
        isPlayable = true;
    })

    const makeMove = (loc) => {
        if (isPlayable) {
            if (board[loc] !== 0) {
                return;
            }
            board[loc] = displayController.getActivePlayer().token;

            let row = Math.trunc(loc / 3);
            let col = (loc % 3);
            var count = 0;
            for (let i = row*3; i < row*3 + 3; i++) {
                if (board[i] !== displayController.getActivePlayer().token) {
                    break;
                }
                count++;
            }
            if (count == 3) {
                return displayController.endGame(displayController.getActivePlayer());
            }
            count = 0;
            for (let i = col; i < 9; i+=3) {
                if (board[i] !== displayController.getActivePlayer().token) {
                    break;
                }
                count++;
            }
            if (count == 3) {
                return displayController.endGame(displayController.getActivePlayer());
            }
            count = 0;
            if (board[4] == displayController.getActivePlayer().token) {
                if ((board[0] == displayController.getActivePlayer().token && board[8] == displayController.getActivePlayer().token) || (board[2] == displayController.getActivePlayer().token && board[6] == displayController.getActivePlayer().token)) {
                    return displayController.endGame(displayController.getActivePlayer());
                }
            }

            for (let i = 0; i < 9; i++) {
                if (board[i] !== 0) {
                    count++;
                }
            }
            if (count == 9) {
                return displayController.endGame("tie");
            }
            displayController.switchPlayerTurn();
    }
    }

    const renderBoard = () => {
        boxes.forEach(box => {
            box.textContent = getBoard()[box.dataset.index] || "";
        });
    }

    const endGame = () => {
        // board = [0,0,0,0,0,0,0,0,0];
        isPlayable = false;
    //     boxes.forEach(box => {
    //         box.textContent = "";
    // });
    }

    const clearBoard = () => {
        board = [0,0,0,0,0,0,0,0,0];
        result.textContent = "";
        boxes.forEach(box => {
            box.textContent = "";
        });
    }

    return {
        getBoard,
        makeMove,
        renderBoard,
        endGame,
        clearBoard,
    };
})();

const displayController = (() => {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const players = [
        {
            name: playerOneName,
            token: "X",
        },
        {
            name: playerTwoName,
            token: "O",
        },
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
    // const getPlayerToken = (player) => player.token; 

    const endGame = (player) => {
        if (player === "tie") {
            result.textContent = "Tie!";
        }
        else {
            result.textContent = `${player.name} won!`;
        }
        below.appendChild(result);
        gameboard.endGame();
        
    }

    return {
        switchPlayerTurn,
        getActivePlayer,
        endGame,
    };
})();