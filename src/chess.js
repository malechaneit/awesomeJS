function chess(row, col) {

    var board = "";
    for (y = 1; y <= row; y++) {

        if (y > 1) {
            board += "\n";
        }

        for (x = 1; x <= col; x++) {

            if (y%2 === 0) {

                if (x%2 !== 0) {
                    board += " ";
                } else {
                    board += "#";
                }
            } else {

                if (x%2 !== 0) {
                    board += "#";
                } else {
                    board += " ";
                }
            }

        }

        // Or we can cheat by adding 2 symbols in 1 iteration

        /*for (x = 1; x <= col/2; x++) {

            if (y%2 === 0) {
                board += " #"
            } else {
                board += "# ";
            }

        }*/
    }

    console.log(board.length);

    return board;
}

console.log(chess(5,10));