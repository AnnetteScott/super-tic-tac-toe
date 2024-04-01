import { ref, type Ref } from "vue"

export enum State {
	Blank = "", X = "X", O = "O"
}

export default class BoardManager {
	public static smallBoard: Ref<State[][][][]>;
	public static bigBoard: Ref<State[][]>;

	constructor(){
		BoardManager.smallBoard = ref([]);
		BoardManager.bigBoard = ref([]);
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
		
		console.log(BoardManager.smallBoard.value)
		console.log(BoardManager.bigBoard.value)
	}

	/* public static Move(mRow: number, mCol: number, row: number, col: number, s: State){
        if(board[x][y] == State.Blank){
            board[x][y] = s;
        }
        moveCount++;
        
        //check end conditions
        
        //check col
        for(int i = 0; i < n; i++){
            if(board[x][i] != s)
                break;
            if(i == n-1){
                //report win for s
            }
        }
        
        //check row
        for(int i = 0; i < n; i++){
            if(board[i][y] != s)
                break;
            if(i == n-1){
                //report win for s
            }
        }
        
        //check diag
        if(x == y){
            //we're on a diagonal
            for(int i = 0; i < n; i++){
                if(board[i][i] != s)
                    break;
                if(i == n-1){
                    //report win for s
                }
            }
        }
            
        //check anti diag (thanks rampion)
        if(x + y == n - 1){
            for(int i = 0; i < n; i++){
                if(board[i][(n-1)-i] != s)
                    break;
                if(i == n-1){
                    //report win for s
                }
            }
        }

        //check draw
        if(moveCount == (Math.pow(n, 2) - 1)){
            //report draw
        }
    } */
}