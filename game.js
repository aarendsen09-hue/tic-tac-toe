const gameboard = (() => {
    const board = [];

    const getBoard = () => board;

    const makeMove = (loc, player) => {
        if (board[loc].getValue() === 0) {
            board[loc] = displayController.getPlayerToken(getActivePlayer());
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
    const getPlayerToken = (player) => player.token; 


})