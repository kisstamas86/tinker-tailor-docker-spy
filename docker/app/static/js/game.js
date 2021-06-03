let player1_discs = document.querySelectorAll('.disc_1');
let player2_discs = document.querySelectorAll('.disc_2');
let dropHappened = false;
initGame();

function initGame() {

    addPlayersName();
    addEventListenerToDisc();
    addEventListenerToField();
    game();
    // Your game can start here, but define separate functions, don't write everything in here :)

}

function game() {
    let player_1 = document.getElementsByClassName('player_name_1');
    let player_2 = document.getElementsByClassName('player_name_2');
    if (window.removeEnemyDiscHappened) {
        if (window.turn) {
            let howManyInStart = document.getElementsByClassName("player1_container")[0].children.length;
            changeDraggebility(player1_discs, howManyInStart);
            changeDraggebility(player2_discs, 0, false);
            player_1[0].classList.remove('not_moving')
            player_2[0].classList.add('not_moving')
        } else {
            let howManyInStart = document.getElementsByClassName("player2_container")[0].children.length;
            changeDraggebility(player2_discs, howManyInStart);
            changeDraggebility(player1_discs, 0, false);
            player_1[0].classList.add('not_moving')
            player_2[0].classList.remove('not_moving')
        }
    }
}

function askPlayerColor(mode) {
    let gameMode = mode
    let playerData = document.getElementById('playerData')
    let player_2 = document.getElementById('player_2')
    playerData.classList.remove('invisible');
    if (gameMode == 'single') {
        player_2.value = "Robot";
    }
}

function activateStartButton() {
    let colorPlayer_1 = document.getElementById('color_player_1').value;
    let player_1 = document.getElementById('player_1').value;
    let colorPlayer_2 = document.getElementById('color_player_2').value;
    let player_2 = document.getElementById('player_2').value;
    let formAction = document.getElementById('playerData')
    if (colorPlayer_1 === colorPlayer_2 || player_1 === player_2) {
        confirm('Please choose different color and name!')
        formAction.action = ""
    }
}

function addEventListenerToDisc() {
    let discs = document.querySelectorAll('.disc_1, .disc_2');
    for (let elem of discs) {
        elem.addEventListener('dragstart', dragStartHandler);
        elem.addEventListener('dragend', dragEndHandler);
        elem.addEventListener('click', removeDisc)
    }
}

function changeDraggebility(discs, howManyInStart, turn = true) {
    for (let disc of discs) {
        if (howManyInStart === 0) {
            disc.setAttribute("draggable", turn);
        } else {
            if (!disc.parentNode.classList.contains('cell')) {
                disc.setAttribute("draggable", turn);
            }
        }
    }
}

function addEventListenerToField() {
    let fields = document.querySelectorAll('.cell');
    for (let field of fields) {
        field.addEventListener('dragenter', dropEnterHandler);
        field.addEventListener('dragleave', dropLeaveHandler);
        field.addEventListener('dragover', dropOverHandler);
        field.addEventListener('drop', dropHandler);
    }
}

function getNeighbours(field) {
    let square = field.dataset.square;
    let point = parseInt(field.dataset.point);
    let neighbours = [];
    if (point === 1) {
        let neighbour1 = document.querySelector(`[data-square="${square}"][data-point="8"]`);
        let neighbour2 = document.querySelector(`[data-square="${square}"][data-point="2"]`);
        neighbours.push(neighbour1, neighbour2);
    } else if (point % 2 === 1) {
        let neighbour1 = document.querySelector(`[data-square="${square}"][data-point="${point - 1}"]`);
        let neighbour2 = document.querySelector(`[data-square="${square}"][data-point="${point + 1}"]`);
        neighbours.push(neighbour1, neighbour2);
    } else if (point === 8) {
        let neighbour1 = document.querySelector(`[data-square="${square}"][data-point="1"]`);
        let neighbour2 = document.querySelector(`[data-square="${square}"][data-point="7"]`);
        neighbours.push(neighbour1, neighbour2);
        if (square === "a") {
            let neighbour3 = document.querySelector(`[data-square="b"][data-point="${point}"]`);
            neighbours.push(neighbour3);
        } else if (square === "b") {
            let neighbour3 = document.querySelector(`[data-square="a"][data-point="${point}"]`);
            let neighbour4 = document.querySelector(`[data-square="c"][data-point="${point}"]`);
            neighbours.push(neighbour3, neighbour4);
        } else if (square === "c") {
            let neighbour3 = document.querySelector(`[data-square="b"][data-point="${point}"]`);
            neighbours.push(neighbour3);
        }
    } else if (point % 2 === 0) {
        let neighbour1 = document.querySelector(`[data-square="${square}"][data-point="${point - 1}"]`);
        let neighbour2 = document.querySelector(`[data-square="${square}"][data-point="${point + 1}"]`);
        neighbours.push(neighbour1, neighbour2);
        if (square === "a") {
            let neighbour3 = document.querySelector(`[data-square="b"][data-point="${point}"]`);
            neighbours.push(neighbour3);
        } else if (square === "b") {
            let neighbour3 = document.querySelector(`[data-square="a"][data-point="${point}"]`);
            let neighbour4 = document.querySelector(`[data-square="c"][data-point="${point}"]`);
            neighbours.push(neighbour3, neighbour4);
        } else if (square === "c") {
            let neighbour3 = document.querySelector(`[data-square="b"][data-point="${point}"]`);
            neighbours.push(neighbour3);
        }
    }
    return neighbours;
}

function dragStartHandler(e) {
    let disc_container_1 = document.querySelector('.player1_container')
    let disc_container_2 = document.querySelector('.player2_container')
    const dropZones = document.querySelectorAll('.cell');
    if (disc_container_1.childElementCount === 0 && player1_discs.length > 3) {
        setDropZoneHighlight(getNeighbours(this.parentNode));
    } else {
        setDropZoneHighlight(dropZones);
    }
    if (disc_container_2.childElementCount === 0 && player2_discs.length > 3) {
        setDropZoneHighlight(getNeighbours(this.parentNode));
    } else {
        setDropZoneHighlight(dropZones);
    }
    this.classList.add('dragged', 'drag_feedback');
    e.dataTransfer.setData('type/dragged-box', 'dragged');

}

function dragEndHandler(e) {

    let player_1 = document.getElementsByClassName('player_name_1')[0].innerText;
    let player_2 = document.getElementsByClassName('player_name_2')[0].innerText;
    let message = document.querySelector('.message');
    const dropZones = document.querySelectorAll('.cell');
    setDropZoneHighlight(dropZones, false);
    this.classList.remove('dragged');
    if (e.dataTransfer.dropEffect === "move" && dropHappened) {
        if (window.turn) {
            if (inMill(this)) {
                message.innerText = player_1 + ' has a mill!';
                let deletableEnemyDiscs = lookForDeletableEnemyDisc(player2_discs);
                if (deletableEnemyDiscs.length !== 0) {
                    window.removeEnemyDiscHappened = false;
                    addDeletableToDiscs(deletableEnemyDiscs);
                } else {
                    message.innerText = 'You got mill, but can not remove shit!';
                }
            }
            markIfInMill(player1_discs);
        } else {
            if (inMill(this)) {
                message.innerText = player_2 + ' has a mill!';
                let deletableEnemyDiscs = lookForDeletableEnemyDisc(player1_discs);
                if (deletableEnemyDiscs.length !== 0) {
                    window.removeEnemyDiscHappened = false;
                    addDeletableToDiscs(deletableEnemyDiscs);
                } else {
                    message.innerText = 'You got mill, but can not remove shit!';
                }
            }
            markIfInMill(player2_discs);
        }
        remove_disc_container();
        win();
        if (window.removeEnemyDiscHappened) {
            window.turn = !window.turn;
            dropHappened = true;
            game();
        }
        dropHappened = true;
    }
}

function dropEnterHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box') && !this.hasChildNodes()) {
        this.classList.add('over-zone');
        e.preventDefault();
    }
}

function dropLeaveHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box') &&
        e.relatedTarget !== null &&
        e.currentTarget !== e.relatedTarget.closest('.cell')) {
        this.classList.remove('over-zone');
    }
}

function dropOverHandler(e) {
    e.preventDefault();
}

function dropHandler(e) {
    e.preventDefault();
    let draggedElement = document.querySelector('.dragged');
    if (e.target.classList.contains('cell') && !e.target.hasChildNodes() && e.target.classList.contains('active-zone')) {
        e.target.appendChild(draggedElement);
        dropHappened = true;
    }
}

function setDropZoneHighlight(fields, highlight = true) {
    for (const field of fields) {
        if (highlight && !field.hasChildNodes()) {
            field.classList.add('active-zone');
        } else {
            field.classList.remove('active-zone')
            field.classList.remove('over-zone')
        }
    }
}

function addPlayersName() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const player_1_name = urlParams.get('player_1');
    const player_1_color = urlParams.get('color_player_1');
    const player_2_name = urlParams.get('player_2');
    const player_2_color = urlParams.get('color_player_2');
    const player_1 = document.getElementsByClassName("player_name_1")[0];
    const player_2 = document.getElementsByClassName("player_name_2")[0];
    player_1.innerHTML = player_1_name;
    player_1.classList.add(player_1_color);
    player_2.innerHTML = player_2_name;
    player_2.classList.add(player_2_color);
    let player_1_discs = document.getElementsByClassName("disc_1");
    let player_2_discs = document.getElementsByClassName("disc_2");
    window.life_player_1 = player_1_discs.length;
    window.life_player_2 = player_2_discs.length;
    window.turn = true;
    window.removeEnemyDiscHappened = true;
    for (let disc of player_1_discs) {
        disc.classList.add(player_1_color);
    }
    for (let disc of player_2_discs) {
        disc.classList.add(player_2_color);
    }
}

function win() {
    let player_1 = document.getElementsByClassName('player_name_1')[0].innerText;
    let player_2 = document.getElementsByClassName('player_name_2')[0].innerText;
    let player1_discs = document.querySelectorAll('.disc_1');
    let player2_discs = document.querySelectorAll('.disc_2');
    let board = document.querySelector('.gameboard');
    let message = document.querySelector('.message');
    if (player1_discs.length <= 2) {
        message.innerText = player_2 + ' has won the game!';
        board.style.pointerEvents = 'none';
    }
    if (player2_discs.length <= 2) {
        message.innerText = player_1 + ' has won the game!';
        board.style.pointerEvents = 'none';
    }
}

function inMill(disc) {
    let color = disc.classList[1];
    let square = disc.parentNode.dataset.square;
    let point = parseInt(disc.parentNode.dataset.point);
    let horizontalMillLeft = 0;
    let horizontalMillRight = 0;
    let verticalMill = 0;
    let neighborOnSquareLeftOne = "";
    if (point === 1) {
        neighborOnSquareLeftOne = document.querySelector(`[data-square="${square}"][data-point="8"]`);
    } else {
        neighborOnSquareLeftOne = document.querySelector(`[data-square="${square}"][data-point="${point - 1}"]`);
    }
    if (neighborOnSquareLeftOne.hasChildNodes() && neighborOnSquareLeftOne.childNodes[0].classList.contains(color)) {
        horizontalMillLeft++;
    }
    let neighborOnSquareRightOne = "";
    if (point === 8) {
        neighborOnSquareRightOne = document.querySelector(`[data-square="${square}"][data-point="1"]`);
    } else {
        neighborOnSquareRightOne = document.querySelector(`[data-square="${square}"][data-point="${point + 1}"]`);
    }
    if (neighborOnSquareRightOne.hasChildNodes() && neighborOnSquareRightOne.childNodes[0].classList.contains(color)) {
        horizontalMillRight++;
    }
    if (point % 2 === 0) {
        let neighborsOnAnotherSquare = document.querySelectorAll(`[data-point="${point}"]`);
        for (let neighbor of neighborsOnAnotherSquare) {
            if (neighbor.hasChildNodes() && neighbor.childNodes[0].classList.contains(color)) {
                verticalMill++;
            }
        }
    } else {
        let neighborOnSquareLeftTwo = "";
        if (point === 1) {
            neighborOnSquareLeftTwo = document.querySelector(`[data-square="${square}"][data-point="7"]`);
        } else if (point === 2) {
            neighborOnSquareLeftTwo = document.querySelector(`[data-square="${square}"][data-point="8"]`);
        } else {
            neighborOnSquareLeftTwo = document.querySelector(`[data-square="${square}"][data-point="${point - 2}"]`);
        }
        if (neighborOnSquareLeftTwo.hasChildNodes() && neighborOnSquareLeftTwo.childNodes[0].classList.contains(color)) {
            horizontalMillLeft++;
        }
        let neighborOnSquareRightTwo = "";
        if (point === 8) {
            neighborOnSquareRightTwo = document.querySelector(`[data-square="${square}"][data-point="2"]`);
        } else if (point === 7) {
            neighborOnSquareRightTwo = document.querySelector(`[data-square="${square}"][data-point="1"]`);
        } else {
            neighborOnSquareRightTwo = document.querySelector(`[data-square="${square}"][data-point="${point + 2}"]`);
        }
        if (neighborOnSquareRightTwo.hasChildNodes() && neighborOnSquareRightTwo.childNodes[0].classList.contains(color)) {
            horizontalMillRight++;
        }
    }
    if (horizontalMillLeft === 2 ||
        horizontalMillRight === 2 ||
        (horizontalMillLeft === 1 && horizontalMillRight === 1 && point % 2 === 0)||
        verticalMill === 3) {
        return true;
    }
    ;
}

function addDeletableToDiscs(discs) {
    for (let disc of discs) {
        disc.classList.add('deletable');
    }
}

function removeDeletableFromDiscs(discs) {
    for (let disc of discs) {
        disc.classList.remove('deletable');
    }
}

function removeDisc() {
    let message = document.querySelector('.message')
    if (this.classList.contains('deletable')) {
        this.remove();
        message.innerText = 'Keep going!';
        player1_discs = document.querySelectorAll('.disc_1');
        player2_discs = document.querySelectorAll('.disc_2');
        removeDeletableFromDiscs(player2_discs);
        removeDeletableFromDiscs(player1_discs);
        window.removeEnemyDiscHappened = true;
        win();
        window.turn = !window.turn;
        dropHappened = false;
        game();
    }
}

function markIfInMill(discs) {
    for (let disc of discs) {
        if (disc.parentNode.classList.contains("cell")) {
            if (inMill(disc)) {
                disc.classList.add("in_mill")
            } else if (disc.classList.contains("in_mill")) {
                disc.classList.remove("in_mill")
            }
        }
    }
}

function remove_disc_container() {
    let container_1 = document.querySelector('.player1_container')
    let container_2 = document.querySelector('.player2_container')
    if (container_1.childElementCount === 0) {
        container_1.classList.add('invisible')
    }
    if (container_2.childElementCount === 0) {
        container_2.classList.add('invisible')
    }
}

function lookForDeletableEnemyDisc(discs) {
    let deletable = [];
    for (let disc of discs) {
        if (disc.parentNode.classList.contains("cell")) {
            if (!disc.classList.contains("in_mill")) {
                deletable.push(disc);
            }
        }
    }
    return deletable;
}

function surrender() {
    let board = document.querySelector('.gameboard');
    let message = document.querySelector('.message');
    let player_1 = document.getElementsByClassName('player_name_1')[0].innerText;
    let player_2 = document.getElementsByClassName('player_name_2')[0].innerText;
    if (window.turn) {
        message.innerText = player_2 + ' has won the game!';
    } else {
        message.innerText = player_1 + ' has won the game!';
    }
    board.style.pointerEvents = 'none';
}