<!-- 需求：实现座位布置功能 -->
<template>
	<div class="coord-box">
		<div class="row" v-for="row in maxY" :key="row">
			<!-- 公式： 结束行  * (当前列 - 1) + 当前行 -->
			<!-- 根据坐标值求出 结束行、当前坐标列、当前坐标行，然后套用公式即可 -->
			<div class="col" v-for="col in maxX" :key="col" @click="handleClickCoord(col, row)">
				<div v-if="col <= x && row <= y" class="active">
					{{ y * (col - 1) + row }}
				</div>
				<!-- <div v-if="col >= x && row <= y" class="active">
					{{ y * (maxX - col) + row }}
				</div> -->
				<!-- <div v-if="col <= x && row >= y" class="active">
					{{ (maxY - y + 1) * (col - 1) + (maxY - row + 1) }}
				</div> -->
				<!-- <div v-if="col >= x && row >= y" class="active">
					{{ (maxY - y + 1) * (maxX - col) + (maxY - row + 1) }}
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			x: 0, // 点击坐标 x 的值
			y: 0, // 点击坐标 y 的值
			maxX: 6, // 坐标x最大值
			maxY: 6 // 坐标y最大值
		}
	},
	methods: {
		handleClickCoord(col, row) {
			this.x = col
			this.y = row
		}
	}
}
</script>

<style lang="less" scoped>
.coord-box {
	width: 500px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	.row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		.col {
			width: 50px;
			height: 50px;
			cursor: pointer;
			border: 1px solid #ccc;
			border-radius: 50%;
			overflow: hidden;
			> div {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.active {
				background: #1890ff;
				color: #fff;
			}
		}
	}
}
</style>
