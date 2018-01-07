'use strict';

const gameboardArray = [
    {
        name: 'Gameboard 1',
        array: [

     [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],

     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],

     [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],

     [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],

     [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],

     [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],

     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

     [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],

     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],

     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

   ]
    }, {
        name: 'Gameboard 2',
        array: [

     [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],

     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],

     [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],

     [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],

     [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],

     [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],

     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

     [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],

     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],

     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

   ]
    }, {
        name: 'Gameboard 3',
        array: [

     [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],

     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],

     [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],

     [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],

     [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],

     [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],

     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

     [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],

     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],

     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

   ]
    }

];

class BaseElement {
    createElement() {

    }

    getElement() {
        return this.elementState.element;

    }

    setElement() {
        this.elementState = {
            element: this.createElement()
        }

        this.initialize();
        return this.getElement();
    }

    initialize() {

    }
}

// extends - rozszerzamy klase bazową, dziedziczymy metody
// super - mamy dostęp do parametrów i metod klasy wyżej
class Cell extends BaseElement {
    constructor({
        isShip,
        location,
        gameBoard
    }) {
        super();
        this.isShip = isShip;
        this.location = location;
        this.state = 'unknown';
        this.gameBoard = gameBoard;
        this.onClick = this.fireTorpedo;
    }

    createElement() {
        const element = document.createElement('div');
        //nie dodajemy tu funkcji, tylko w konstruktorze - this.fireTorpido
        element.addEventListener('click', this.onClick.bind(this));
        return element;
    }

    setState(state) {
        this.state = state;
        this.refresh();
    }

    fireTorpedo() {
        if (this.isShip === true) {
            this.gameBoard.score +=1;
            
            gameResult.innerHTML = '';
            
//            while(gameResult.firstChild){
//                gameResult.removeChild(gameResult.firstChild);
//            }
            
            gameResult.append(`${this.gameBoard.score} / ${this.gameBoard.totalScore}`);
            this.setState('hit');
        } else {
            this.setState('miss');
        }
    }

    refresh() {
        // this.getElement().className = 'cell-' + this.state;
        this.getElement().className = `cell-${this.state}`

    }

    initialize() {
        this.refresh();
    }

}

class GameBoard extends BaseElement {
    constructor({
        size
    }) {
        super();

        this.cells = [];
        this.columnNumber = size;
        this.rowNumber = size;
        this.fleet = gameboardArray[Math.floor(Math.random() * gameboardArray.length)];
        this.score = 0;
        this.totalScore = this.getTotalScore(this.fleet);

        for (let rowIndex = 0; rowIndex < this.rowNumber; ++rowIndex) {
            for (let columnIndex = 0; columnIndex < this.columnNumber; ++columnIndex) {
                this.cells.push(new Cell({
                    isShip: this.fleet.array[rowIndex][columnIndex] === 1,
                    location: [rowIndex, columnIndex],
                    gameBoard: this
                }));

            }
        }

        gameResult.append(`${this.score} / ${this.totalScore}`)
    }

    createElement() {
        const gameBoard = document.createElement('div');
        gameBoard.className = 'gameBoard';

        for (let rowIndex = 0; rowIndex < this.rowNumber; ++rowIndex) {

            const row = document.createElement('div');
            row.className = 'board-row';

            for (let columnIndex = 0; columnIndex < this.columnNumber; ++columnIndex) {
                const cell = this.cells[rowIndex * this.columnNumber + columnIndex];

                row.appendChild(cell.setElement());
            }

            gameBoard.appendChild(row);
        }

        return gameBoard;
    }

    getTotalScore(fleet) {
        let total = 0;
        //        fleet.array.forEach(function(row) {
        //            
        //        });
        //sprawdzamy kazdy wiersz w array
        fleet.array.forEach((row) => {
            total += row.filter((x) => {
                return x === 1
            }).length
            //length bo wynikiem filter jest tablica a my chcemy number
        });
        return total;

    }
}

const gameboardContainer = document.getElementById('gameboardContainer');
const gameResult = document.getElementById('gameResult');
const gameBoard = new GameBoard({
    size: 10
});
gameboardContainer.appendChild(gameBoard.setElement());
