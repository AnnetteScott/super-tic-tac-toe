import { ref, type Ref } from "vue"

export enum State {
	Blank = "", X = "close", O = "radio_button_unchecked"
}

export default class BoardManager {
	public static smallBoard: Ref<State[][][][]> = ref([]);
	public static bigBoard: Ref<State[][]> = ref([]);

	public static init(){
		BoardManager.smallBoard.value = [];
		BoardManager.bigBoard.value = [];
		for(let mRow = 0; mRow < 3; mRow++){
			BoardManager.smallBoard.value.push([])
			for(let mCol = 0; mCol < 3; mCol++){
				BoardManager.smallBoard.value[mRow].push([])
				for(let row = 0; row < 3; row++){
					BoardManager.smallBoard.value[mRow][mCol].push([])
					for(let col = 0; col < 3; col++){
						BoardManager.smallBoard.value[mRow][mCol][row].push(State.Blank)
					}
				}
			}
		}

		for(let row = 0; row < 3; row++){
			BoardManager.bigBoard.value.push([])
			for(let col = 0; col < 3; col++){
				BoardManager.bigBoard.value[row].push(State.Blank)
			}
		}
	}

	public static Move(mRow: number, mCol: number, row: number, col: number, s: State){
		let board = this.smallBoard.value[mRow][mCol]
		if(board[row][col] == State.Blank){
			board[row][col] = s;
		}else{
			return undefined;
		}
		
		
		//check col
		for(let i = 0; i < 3; i++){
			if(board[row][i] != s)
				break;
			if(i == 3-1){
				this.bigBoard.value[mRow][mCol] = s;
				return 2;
			}
		}
		
		//check row
		for(let i = 0; i < 3; i++){
			if(board[i][col] != s)
				break;
			if(i == 3-1){
				this.bigBoard.value[mRow][mCol] = s;
				return 2;
			}
		}
		
		//check diag
		if(row == col){
			//we're on a diagonal
			for(let i = 0; i < 3; i++){
				if(board[i][i] != s)
					break;
				if(i == 3-1){
					this.bigBoard.value[mRow][mCol] = s;
					return 2;
				}
			}
		}
			
		//check anti diag
		if(row + col == 3 - 1){
			for(let i = 0; i < 3; i++){
				if(board[i][(3-1)-i] != s)
					break;
				if(i == 3-1){
					this.bigBoard.value[mRow][mCol] = s;
					return 2;
				}
			}
		}
		return 1;
	}

	public static bigWin(mRow: number, mCol: number, s: State){		
		//check col
		for(let i = 0; i < 3; i++){
			if(this.bigBoard.value[mRow][i] != s)
				break;
			if(i == 3-1){
				return [[mRow, 0],[mRow, 1],[mRow, 2]];
			}
		}
		
		//check row
		for(let i = 0; i < 3; i++){
			if(this.bigBoard.value[i][mCol] != s)
				break;
			if(i == 3-1){
				return [[0, mCol],[1, mCol],[2, mCol]];;
			}
		}
		
		//check diag
		if(mRow == mCol){
			//we're on a diagonal
			for(let i = 0; i < 3; i++){
				if(this.bigBoard.value[i][i] != s)
					break;
				if(i == 3-1){
					return [[0, 0],[1, 1],[2, 2]];
				}
			}
		}
			
		//check anti diag
		if(mRow + mCol == 3 - 1){
			for(let i = 0; i < 3; i++){
				if(this.bigBoard.value[i][(3-1)-i] != s)
					break;
				if(i == 3-1){
					return [[0, 2],[1, 1],[2, 0]];
				}
			}
		}
		return null;
	}
}