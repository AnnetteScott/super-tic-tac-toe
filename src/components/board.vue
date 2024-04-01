<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'PlanEditor',
	/* props: {
		
	}, */
	setup(){
		return {
			
		}
	},
	data() {
		return {
			
		};
	},
	methods: {
		action(row: number, col: number){
			
		}
	}
})

</script>

<template>
	<div class="board_container square">
		<div class="small_square square" @click="action(1, 1)"></div>
		<div class="small_square square" @click="action(1, 2)"></div>
		<div class="small_square square" @click="action(1, 3)"></div>
		<div class="small_square square" @click="action(2, 1)"></div>
		<div class="small_square square" @click="action(2, 2)"></div>
		<div class="small_square square" @click="action(2, 3)"></div>
		<div class="small_square square" @click="action(3, 1)"></div>
		<div class="small_square square" @click="action(3, 2)"></div>
		<div class="small_square square" @click="action(3, 3)"></div>
	</div>
</template>

<style scoped>

</style>
