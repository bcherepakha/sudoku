/* global sudoku */
const game = {
    board: '',
    boardEl: document.querySelector('.sudoku__board'),
    createCells() {
        const cells = [];

        for (let i=0; i < 81; i++) {
            const cell = document.createElement('div');

            cell.className = 'sudoku__cell';

            cell.addEventListener('click', this.activateCell.bind(this, i));

            cells.push(cell);
        }

        this.cells = cells;
        this.boardEl.append(...cells);

        window.addEventListener('keypress', this.fillCell.bind(this));
    },
    activateCell(i) {
        this.activeCell = i;
        this.activeRow = Math.floor(i / 9);
        this.activeColumn = i % 9;
        this.activeSquare = this.activeColumn % 3 + 3 * (this.activeRow % 3);
        this.render();
    },
    fillCell(e) {
        const num = parseInt(e.key);
        const { activeCell, board, activeRow, activeColumn } = this;
        const canChange = this.startBoard[activeCell] === '.';
        const candidates = sudoku.get_candidates(this.board);

        if (!canChange || num === 0 || isNaN(num)) {
            return ;
        }

        if (!candidates[activeRow][activeColumn].includes(num)) {
            alert('Не валидный ввод');
            return ;
        }

        const startBoard = board.slice(0, activeCell);
        const endBoard = board.slice(activeCell+1);

        this.board = startBoard + num + endBoard;

        this.render();
    },
    start(complexity) {
        this.board = sudoku.generate(complexity);
        this.startBoard = this.board;

        this.render();
    },
    render() {
        const { board, activeCell } = this;

        this.cells.forEach(function(cell, idx) {
            const text = board[idx];

            if (text === '.') {
                cell.innerText = '';
            } else {
                cell.innerText = text;
            }

            if (activeCell === idx) {
                cell.classList.add('sudoku__cell--active');
            } else {
                cell.classList.remove('sudoku__cell--active');
            }
        });
    }
};

game.createCells();
game.start('medium'); //? this = game

console.log( game );
