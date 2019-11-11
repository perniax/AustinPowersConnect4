(function() {
    var currentPlayer = "player1";

    //to select the column with the mouse:
    $(".column").on("click", function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");
        // });

        //now to pile the slots on each column
        for (var i = 5; i >= 0; i--) {
            // the row to check
            var slotInColumn = slotsInColumn.eq(i);
            if (
                !slotInColumn.hasClass("player1") && // &&=or
                !slotInColumn.hasClass("player2")
            ) {
                slotInColumn.addClass(currentPlayer);
                break;
            }
        }

        if (i == -1) {
            return; // the column is full, so ignore this choice until choose a valid one
        }
        if (checkForVictory(slotsInColumn)) {
            win();
        } else if (checkForVictory($(".row" + i))) {
            win();
            //Diagonal condition
        } else if (checkForDiagonalVictory()) {
            win();
        }
        switchPlayers();
    });

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    ///Winning Conditional (connect 4):
    function checkForVictory(slots) {
        // arg is defined in the first equation as the e.target
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    // alert("you won!");
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    var diagonalVictories = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [8, 15, 22, 29],
        [7, 14, 21, 28],
        [14, 21, 28, 35],
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        [20, 27, 34, 41],
        [12, 19, 26, 33],
        [19, 26, 33, 40],
        [18, 25, 32, 39],
        [38, 33, 28, 23],
        [37, 32, 27, 22],
        [32, 27, 22, 17],
        [36, 31, 26, 21],
        [31, 26, 21, 16],
        [26, 21, 16, 11],
        [24, 19, 14, 9],
        [19, 14, 9, 4],
        [18, 13, 8, 3],
        [30, 25, 20, 15],
        [25, 20, 15, 10],
        [20, 15, 10, 5]
    ];

    function checkForDiagonalVictory() {
        // https://www.dyn-web.com/javascript/arrays/multidimensional.php
        for (var i = 0; i < diagonalVictories.length; i++) {
            var count = 0;
            for (var j = 0; j < diagonalVictories[i].length; j++) {
                if (
                    $(".slot")
                        .eq(diagonalVictories[i][j])
                        .hasClass(currentPlayer)
                ) {
                    count++;
                }
            }
            if (count == 4) {
                // alert("you won!");
                win();
            }
        }
    }
    function win() {
        $(".win").show();
        $(".blur").show();
    }

    $("button").on("click", function() {
        location.reload();
    });
})();
