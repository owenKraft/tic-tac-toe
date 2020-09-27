const gameBoard = (() => {
    const blankArray = [0,0,0,0,0,0,0,0,0];
    let gameArray = [0,0,0,0,0,0,0,0,0];
    let gameOver = false;

    checkRows = () => {
        let rowOne = gameArray[0]+gameArray[1]+gameArray[2];
        let rowTwo = gameArray[3]+gameArray[4]+gameArray[5];
        let rowThree = gameArray[6]+gameArray[7]+gameArray[8];
        
        if(rowOne == "XXX" || rowTwo == "XXX" || rowThree == "XXX"){
            playerWins();
        } else if(rowOne == "OOO" || rowTwo == "OOO" || rowThree == "OOO") {
            compWins();
        } else {
            console.log("keep playing!")
        };
    }
    checkColumns = () => {
        let colOne = gameArray[0]+gameArray[3]+gameArray[6];
        let colTwo = gameArray[1]+gameArray[4]+gameArray[7];
        let colThree = gameArray[2]+gameArray[5]+gameArray[8];
        
        if(colOne == "XXX" || colTwo == "XXX" || colThree == "XXX"){
            playerWins();
        } else if(colOne == "OOO" || colTwo == "OOO" || colThree == "OOO") {
            compWins();
        } else {
            console.log("keep playing!")
        };
    }
    checkDiags = () => {
        let diagOne = gameArray[0]+gameArray[4]+gameArray[8];
        let diagTwo = gameArray[2]+gameArray[4]+gameArray[6];

        if(diagOne == "XXX" || diagTwo == "XXX"){
            playerWins();
        } else if (diagOne == "OOO" || diagTwo == "OOO"){
            compWins();
        }
    }

    checkForTie = () => {
        isZero = (element) => element == 0;
        if(gameArray.findIndex(isZero) == -1 && gameOver != true){
            displayController.updateGameText("what? a tie!? we must play again!");
            document.getElementById("restartBtn").focus();
        }
    }

    playerWins = () => {
        console.log("you win!")
        displayController.displayWinMessage("player");
        displayController.updateScore("player");
        gameOver = true;
        document.getElementById("restartBtn").focus();
    }

    compWins = () => {
        console.log("you lost!")
        displayController.displayWinMessage("comp");
        displayController.updateScore("comp");
        gameOver = true;
        document.getElementById("restartBtn").focus();
    }

    checkForWin = () => {
        checkRows();
        checkColumns();
        checkDiags();
    }

    checkForGameOver = () => {
        if(gameOver != true){
            checkForWin();
            checkForTie();
        }
    }

    const cell = document.querySelectorAll(".cell");
    cell.forEach(function(e){
        e.addEventListener("click", function(){
            if(e.innerText != ""){
                displayController.displayTryAgainMessage();
                displayController.setTargetElement(e.id);
            } else {
                markSelection(e.id,"X");
                updateGameArray(e.id,"X");
                makeCompSelection();
                checkForGameOver();
                checkGameArray();
            }
        })
    });

    markSelection = (id,selection) => {
        if(gameOver != true){
            document.getElementById(id).innerText = selection;
        }
    }

    updateGameArray = (id,selection) => {
        if(gameOver != true){
            if(id.length > 1){
                let trimmedId = Number(id.substring(1));
                gameArray[trimmedId] = selection;
            } else {
                gameArray[id] = selection;
            }
        }
    }

    makeCompSelection = () =>{
        checkForGameOver();
        isZero = (element) => element == 0;
        if(gameArray.findIndex(isZero) != -1 && gameOver != true){
            let randomNum = getRandomInt();
            while(gameArray[randomNum] != 0){
                console.log(randomNum);
                randomNum = getRandomInt();
            }
            updateGameArray(randomNum,"O");
            let compSelection = "A" + randomNum;
            markSelection(compSelection,"O");
        }
    }

    getRandomInt = () => {
        return Math.floor(Math.random() * Math.floor(9));
    }

    checkGameArray = index => {
        console.log(gameArray);
    }

    restartGame = () => {
        gameArray = [0,0,0,0,0,0,0,0,0];
        gameOver = false;
        console.log("blank array = " + blankArray);
        console.log(gameArray);
        cell.forEach(function(e){
            e.innerText = "";
        });
        displayController.updateGameText("alright, let's try this again");
    }

    return {
        restartGame,
    }
})();

const displayController = (() => {
    let playerScore = 0;
    let compScore = 0;
    let tryAgainMessageActive;
    let targetElement;
    
    displayWinMessage = (winner) => {
        if(winner == "player"){
            updateGameText("you won?! let's play again!");
        } else {
            updateGameText("i won! let's play again!");
        }
    }

    updateScore = (winner) => {
        if(winner == "player"){
            playerScore += 1;
            document.getElementById("playerScore").innerText = playerScore;
        } else {
            compScore += 1;
            document.getElementById("compScore").innerText = compScore;
        }
    }

    displayTryAgainMessage = () => {
        updateGameText("try again! that spot is already taken");
        tryAgainMessageActive = true;
    }

    setTargetElement = (id) => {
        targetElement = id;
    }

    document.addEventListener("click", function(e){
        if(tryAgainMessageActive === true && e.target.id != targetElement){
            updateGameText("alright, let's keep playing");
            tryAgainMessageActive = false;
            targetElement = "";
        }
    })

    displayTieMessage = () => {
        updateGameText("what? a tie!? we must play again!");
    }

    updateGameText = (textToDisplay) => {
        document.getElementById("gameText").innerText = textToDisplay;
    }

    changeName = () =>{
        let elementValue = document.getElementById("nameInput").innerText;
        if(elementValue == ""){
            document.getElementById("playerName").innerText = "your";
        } else {
            document.getElementById("playerName").innerText = elementValue + "\'s";
        }
    }

    document.getElementById("restartBtn").addEventListener("click", gameBoard.restartGame)

    document.getElementById("nameInput").addEventListener("keyup", changeName);

    return {
        displayWinMessage,
        updateScore,
        displayTryAgainMessage,
        updateGameText,
        setTargetElement,
    }
})();
