const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");

const gameboard = (() => {
    const board = [0,0,0,0,0,0,0,0,0];

    const getBoard = () => board;

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            makeMove(box.dataset.index);
            renderBoard();
        })
    });

    const makeMove = (loc) => {
        let madeMove = false;
        while (madeMove == false) {
            if (board[loc] === 0) {
                board[loc] = displayController.getActivePlayer().token;
                madeMove = true;
                // for (const box of boxes) {
                //     if (box.dataset.index == loc) {
                //         box.textContent = board[loc];
                //     }
                // }
            }
        }

        let row = Math.trunc(loc / 3);
        let col = (loc % 3) - 1;
        if (loc % 3 == 0) {
            row = (loc / 3) - 1;
            col = 2;
        }
        var count = 0;
        for (let i = (loc - col); i < (loc - col) + 3; i++) {
            if (board[i] !== displayController.getActivePlayer().token) {
                break;
            }
            count++;
        }
        if (count == 3) {
            return displayController.endGame(displayController.getActivePlayer());
        }
        count = 0;
        for (let i = (loc - row); i < (loc - row) + 3; i++) {
            if (board[i] !== getActivePlayer.token) {
                break;
            }
            count++;
        }
        if (count == 3) {
            return displayController.endGame(displayController.getActivePlayer());
        }
        count = 0;
        if (board[4] == getActivePlayer.token) {
            if ((board[0] == getActivePlayer().token && board[8] == getActivePlayer().token) || (board[2] == getActivePlayer().token && board[6] == getActivePlayer().token)) {
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

    const renderBoard = () => {
        boxes.forEach(box => {
            box.textContent = getBoard()[box.dataset.index] || "";
        });
    }


    return {
        getBoard,
        makeMove,
        renderBoard,
    };
})();

const displayController = (() => {
    playerOneName = "Player One";
    playerTwoName = "Player Two";

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
        const result = document.createElement("h1");
        if (player === "tie") {
            result.textContent = "Tie!";
        }
        else {
            result.textContent = `${player} won!`;
        }
        container.appendChild(result);

    }

    return {
        switchPlayerTurn,
        getActivePlayer,
        endGame,
    };
})();