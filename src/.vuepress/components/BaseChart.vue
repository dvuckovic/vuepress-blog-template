<template>
    <canvas
        ref="chart"
        class="chart" />
</template>

<script>
import Chart from 'chart.js';
import 'chartjs-plugin-deferred';

export default {
    props: {
        data: {
            type: null,
        },

        labels: {
            type: Array,
        },
    },

    data () {
        return {
            type: null,
        };
    },

    chart: null,

    watch: {
        data (newData) {
            this.initChart(newData);
        },

        labels () {
            this.initChart(this.data);
        },
    },

    mounted () {
        this.initChart(this.data);
    },

    beforeDestroy () {
        this.$options.chart = null;
    },

    methods: {
        initChart (data) {
            if (data && data.length) {
                const datasets = [];

                data.forEach((dataset, index) => {
                    datasets.push({
                        ...this.datasetOptions(index, data),
                        data: dataset,
                    });
                });

                this.$options.chart = new Chart(this.$refs.chart.getContext('2d'), {
                    // The type of chart we want to create.
                    type: this.type,

                    // The data for our dataset.
                    data: this.dataOptions(datasets),

                    // Configuration options go here.
                    options: {
                        ...this.chartOptions(),

                        // Performance optimizations.
                        elements: {
                            line: {
                                tension: 0, // disables bezier curves
                            },
                        },

                        // Generic tooltip options.
                        tooltips: {
                            intersect: false,
                            displayColors: false,
                        },

                        // Plugins.
                        plugins: {
                            deferred: {
                                yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
                            },
                        },
                    },
                });
            }
        },

        datasetOptions () {
            return {};
        },

        dataOptions (datasets) {
            return {
                datasets,
            };
        },

        chartOptions () {
            return {};
        },
    },
};
</script>

<style lang="scss">
.chart {
    margin: 2rem 0 5rem;
}
</style>
