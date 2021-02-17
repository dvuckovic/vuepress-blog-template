<script>
import BaseChart from './BaseChart';

export default {
    extends: BaseChart,

    data () {
        return {
            type: 'polarArea',
            colors: [
                '#ff6384',
                '#f771ae',
                '#e485d1',
                '#c899ea',
                '#aaaaf7',
                '#91b9fa',
                '#84c5f5',
                '#87ceeb',
            ],
        };
    },

    methods: {
        datasetOptions () {
            return {
                backgroundColor: this.colors,
                borderWidth: 0.75,
            };
        },

        dataOptions (datasets) {
            return {
                datasets,
                labels: this.labels,
            };
        },

        chartOptions () {
            return {
                legend: {
                    position: 'right',
                    align: 'end',
                    labels: {
                        fontFamily: '"Helvetica", sans-serif',
                        fontColor: '#888',
                        fontSize: 13,
                        usePointStyle: true,
                    },
                },
                scale: {
                    gridLines: {
                        color: '#2c2c2c',
                        lineWidth: 2,
                    },
                    ticks: {
                        backdropColor: '#333',
                        fontColor: '#888',
                    },
                },
            };
        },
    },
};
</script>
