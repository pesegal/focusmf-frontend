<template>
    <div>
        <h1> Test Chart </h1>


    </div>
</template>

<script>
import * as d3 from "d3"
const data = [103,40,40,45,5,61, 50, 30, 40]

export default {
    name: "test-chart",
    mounted () {
        console.log(this.$el)
        const svg = d3.select(this.$el)
            .append('svg')
            .attr('width', 500)
            .attr('height', 270)
            .append('g')
            .attr('transform', 'translate(0,10)')

        const x = d3.scaleLinear().range([0,430])
        const y = d3.scaleLinear().range([210, 0])

        x.domain(d3.extent(data, (d, i) => i))
        y.domain([0, d3.max(data, d => d)])

        const createPath = d3.line().x((d, i) => x(i)).y(d => y(d))
        svg.append('path').attr('d', createPath(data))
    },
    data() {
        return {
            test_list: [1,2,3,4,5]
            // TODO: Peter get task action data here!
            // TODO: Extract D3 Logic to Vue Template
        }
    },
}
</script>

<style lang="scss">
    svg {
        margin: 25px;

        path {
            fill: none;
            stroke: green;
            stroke-width: 3px;
        }
    }

</style>