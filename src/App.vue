<script setup lang="ts">
import Board from '@/components/board.vue'
import BoardManager from '@/boardManager'
new BoardManager()
</script>

<template>
	<main>
		<div class="board_container master_square">
			<Board />
			<Board />
			<Board />
			<Board />
			<Board />
			<Board />
			<Board />
			<Board />
			<Board />
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
}

.master_square {
	padding: 0;
}

.small_square{
	width: 30px;
	height: 30px;
}

.square:nth-child(n+4):nth-child(-n+6){
	border-bottom: 1px solid black;
	border-top: 1px solid black;
}

.square:nth-child(3n+2){
	border-left: 1px solid black;
	border-right: 1px solid black;
}
</style>
