const gameboard = (() => {
    const board = [0,0,0,0,0,0,0,0,0];

    const getBoard = () => board;

    const makeMove = (loc, player) => {
        let madeMove = false;
        while (madeMove = false) {
            if (board[loc].getValue() === 0) {
                board[loc] = displayController.getActivePlayer.token;
                madeMove = true;
            }
        }

        const row = Math.trunc(loc / 3);
        const col = (loc % 3) - 1;
        if (loc % 3 == 0) {
            row = (loc / 3) - 1;
            col = 2;
        }
        var count = 0;
        for (let i = (loc - col); i < (loc - col) + 3; i++) {
            if (board[i] !== getActivePlayer.token) {
                break;
            }
            count++;
        }
        if (count == 3) {
            return displayController.endGame(displayController.getActivePlayer);
        }
        count = 0;
        for (let i = (loc - row); i < (loc - row) + 3; i++) {
            if (board[i] !== getActivePlayer.token) {
                break;
            }
            count++;
        }
        if (count == 3) {
            return displayController.endGame(displayController.getActivePlayer);
        }
        count = 0;
        if (board[4] == getActivePlayer.token) {
            if ((board[1] == getActivePlayer.token && board[9] == getActivePlayer.token) || (board[3] == getActivePlayer.token && board[7] == getActivePlayer.token)) {
                return displayController.endGame(displayController.getActivePlayer);
            }
        }

        for (let i = 0; i < 9; i++) {
            if (board[i] !== 0) {
                count++;
            }
        }
        if (count == 9) {
            return displayController.endGame(tie);
        }
    }
});

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

    const playRound = (loc) => {
        makeMove(loc, getActivePlayer());
        
    }

    const endGame = (player) => {
        if (player = "tie") {

        }
    }

})