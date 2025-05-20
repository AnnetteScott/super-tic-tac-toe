<script setup lang="ts">
import Board from '@/components/board.vue'
import BoardManager, { State } from '@/boardManager'
import { ref } from 'vue';
BoardManager.init()

let turn = State.X
let turnRow = null as number | null;
let turnCol = null as number | null;
let won = null as null | number[][];

let hoveredCol = ref(-1)
let hoveredRow = ref(-1)
let hoveredOutRow = ref(-1)
let hoveredOutCol = ref(-1)

function move(mRow: number, mCol: number, row: number, col: number){
	if(!BoardManager.Move(mRow, mCol, row, col, turn)){
		return;
	}
	
	won = BoardManager.bigWin(mRow, mCol, turn);
	if(won !== null){
		turnRow = mRow;
		turnCol = mCol;
		return;
	}

	switch (turn){
		case State.X:
			turn = State.O;
			break;
		case State.O:
			turn = State.X;
			break;
		default:
			turn = State.X;
	}

	if(BoardManager.bigBoard.value[row][col] !== State.Blank){
		turnRow = null;
		turnCol = null;
	}else{
		turnRow = row;
		turnCol = col;
	}

}

function restart(){
	BoardManager.init();
	turn = State.X
	turnRow = null
	turnCol = null
	won = null
}

function getValue(state: State, row: number, col: number, mRow: number, mCol: number){
	if(state.valueOf() !== State.Blank){
		return state;
	}
	if(row === hoveredRow.value && col === hoveredCol.value && mRow === hoveredOutRow.value && mCol === hoveredOutCol.value){
		return turn;
	}
	return state
}

</script>

<template>
<main>
	<div>
		<h1 v-if="!won">Turn: 
			<span class="material-symbols-outlined">{{ turn }}</span>
		</h1>
		<h1 v-if="won !== null">Won: 
			<span class="material-symbols-outlined">{{ turn }}</span>
		</h1>
		<button v-if="won !== null" @click="restart()">Restart</button>
	</div>
	<div class="board_container master_square">
		<template v-for="array3, mRow of BoardManager.smallBoard.value">
			<template v-for="array2, mCol of array3">
				<div class="board_container square" :class="{winner: won?.find(a => a[0] === mRow && a[1] === mCol)}">
					<template v-if="BoardManager.bigBoard.value[mRow][mCol] === State.Blank">
						<template v-for="array, row of array2">
							<template v-for="state, col of array">
								<div class="small_square square" 
									@click="move(mRow, mCol, row, col)"
									@mouseover="hoveredCol = col, hoveredRow = row, hoveredOutCol = mCol, hoveredOutRow = mRow"
								>
									<span class="material-symbols-outlined">{{ getValue(state, row, col, mRow, mCol) }}</span>
								</div>
							</template>
						</template>
					</template>
					<span  v-if="BoardManager.bigBoard.value[mRow][mCol] === State.Blank || won !== null" 
						:class="{blocked: turnRow != null && turnCol != null && won === null ? (turnRow != mRow || turnCol != mCol) : won?.find(a => a[0] !== mRow && a[1] !== mCol) ? true : false}"
					></span>
					<span class="material-symbols-outlined absolute">{{ BoardManager.bigBoard.value[mRow][mCol] }}</span>
				</div>
			</template>
		</template>
	</div>
</main>
</template>

<style>
@import url("../public/root.css");
.board_container{
	width: min-content;
	height: min-content;
	display: grid;
	grid-template-columns: auto auto auto;
	padding: 11px;
	width: 113px;
	height: 113px;
}

.master_square {
	padding: 0;
	width: 338px;
	height: 338px;
}

.small_square{
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.square {
	z-index: 1;
}

.board_container > .square:nth-child(n+4):nth-child(-n+6){
	border-bottom: 1px solid black;
	border-top: 1px solid black;
}

.board_container > .square:nth-child(3n+2){
	border-left: 1px solid black;
	border-right: 1px solid black;
}

.blocked {
	background-color: #00000022;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 10;
}

.absolute {
	position: absolute;
	font-size: 112px;
}

.winner {
	background-color: #46fd327a;
}
</style>
