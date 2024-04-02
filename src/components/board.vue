<script lang="ts">
import BoardManager, { State } from '@/boardManager';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'PlanEditor',
	emits: ['action'],
	props: {
		mRow: {
			type: Number,
			required: true
		},
		mCol: {
			type: Number,
			required: true
		}
	},
	setup(){
		return {
			State,
			BoardManager
		}
	},
	data() {
		return {
			board: BoardManager.smallBoard.value[this.mRow][this.mCol]
		};
	},
	methods: {
		action(row: number, col: number){
			this.$emit('action', [row, col])
		}
	}
})

</script>

<template>
	<template v-for="n, row of board">
		<template v-for="s, col of n">
			<div class="small_square square" @click="action(row, col)">
				<span class="material-symbols-outlined">{{ s }}</span>
			</div>
		</template>
	</template>
	<span class="material-symbols-outlined winner">{{ BoardManager.bigBoard.value[mRow][mCol] }}</span>
</template>

<style scoped>

</style>
