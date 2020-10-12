<template>
  <h2>Chart</h2>
  <div class="my_dataviz" :key="state.key"></div>
  <button @click.prevent="update">Update</button>
</template>

<script>
import * as d3 from "d3";
import { reactive } from "vue";
import axios from "axios";

export default {
  name: "Chart",
  props: {
    plantId: String,
  },
  setup(props) {
    const update = () => {
      state.data.unshift({ x: new Date().toString(), y: 14 });
      state.key += 1;
    };

    axios.get(`/api/readings/${props.plantId}/`).then(response => {
      const data = response.data.data.map(reading => {
        return {
          x: new Date(reading.time.seconds * 1000).toString(),
          y: reading.level,
        };
      });
      state.data = data;
      createChart();
    });

    const state = reactive({
      data: [],
      key: 1,
    });

    const createChart = () => {
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 500;
      const height = 300;

      const xScale = d3
        .scaleTime()
        .domain(
          d3.extent(state.data, function(d) {
            return new Date(d.x);
          })
        )
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

      const line = d3
        .line()
        .x(function(d) {
          return xScale(new Date(d.x));
        }) // set the x values for the line generator
        .y(function(d) {
          return yScale(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line

      // 1. Add the SVG to the page and employ #2
      let svg = d3
        .select(".my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // 3. Call the x axis in a group tag
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

      // 4. Call the y axis in a group tag
      svg
        .append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

      // 9. Append the path, bind the data, and call the line generator
      svg
        .append("path")
        .datum(state.data) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("d", line); // 11. Calls the line generator

      // 12. Appends a circle for each datapoint
      svg
        .selectAll(".dot")
        .data(state.data)
        .enter()
        .append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d) {
          return xScale(new Date(d.x));
        })
        .attr("cy", function(d) {
          return yScale(d.y);
        })
        .attr("r", 5);
    };

    return {
      state,
      update,
      createChart,
    };
  },

  updated() {
    this.createChart();
  },

  mounted() {},
};
</script>

<style>
.line {
  fill: none;
  stroke: #ffab00;
  stroke-width: 3;
}

.overlay {
  fill: none;
  pointer-events: all;
}

/* Style the dots by assigning a fill and stroke */
.dot {
  fill: #ffab00;
  stroke: #fff;
}

.focus circle {
  fill: none;
  stroke: steelblue;
}
</style>
