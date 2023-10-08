import { config_4x4, config_5x5, config_6x6 } from "../configs"

export class Square {
    constructor (r, c, color) {
        this.row = r
        this.column = c
        this.color = color
    }
}

export class Group {
    constructor() {
        this.squares = []; // An array to store 2x2 squares in the group
    }

    // Method to add a square to the group
    addSquare(square) {
        this.squares.push(square);
        this.selected = false; // Add a selected property
    }

    // Method to check if all squares in the group have the same color
    hasSameColor() {
        if (this.squares.length < 4) {
            // A group must have 4 squares to check for the same color
            return false;
        }

        const firstColor = this.squares[0].color;

        for (let i = 1; i < this.squares.length; i++) {
            if (this.squares[i].color !== firstColor) {
                return false; // Not all squares have the same color
            }
        }

        return true; // All squares have the same color
    }
}

export class Board {
    constructor(config) {
        this.config = config; // Store the configuration
        this.size = parseInt(config.numColumns);
        this.squares = [];
        this.groups = []; // An array to store 2x2 groups

        // Create squares based on the configuration's baseSquares
        for (let csq of config.baseSquares) {
            let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color);
            this.squares.push(sq);
        }

        // Check if it's the 5x5 configuration
        if (config.name === "Configuration #2" && this.size === 5) {
            // Add a white square in the bottom right corner
            const whiteSquare = new Square(4, 4, "white");
            this.squares.push(whiteSquare);
        }

        // Create 2x2 groups based on the configuration
        for (let i = 0; i < this.size - 1; i++) {
            for (let j = 0; j < this.size - 1; j++) {
                const group = new Group();
                group.addSquare(this.getSquare(i, j));
                group.addSquare(this.getSquare(i + 1, j));
                group.addSquare(this.getSquare(i, j + 1));
                group.addSquare(this.getSquare(i + 1, j + 1));
                this.groups.push(group);
            }
        }
    }

    // Method to get a square at a specific row and column
    getSquare(row, column) {
        for (let square of this.squares) {
            if (square.row === row && square.column === column) {
                return square;
            }
        }
        return null;
    }
}
    
export default class Model {
    constructor() {
        this.configs = [ config_4x4, config_5x5, config_6x6 ]
        this.currentConfig = 0;
        this.board = new Board(this.configs[this.currentConfig])
    }
    
}