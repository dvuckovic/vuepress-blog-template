<script>
import BaseChart from './BaseChart';

export default {
    extends: BaseChart,

    data () {
        return {
            type: 'doughnut',
            colors: [
                '#ff6384',
                '#f771ae',
                '#e485d1',
                '#c899ea',
                '#aaaaf7',
                '#91b9fa',
                '#84c5f5',
                '#87ceeb',
                '#5dd2e2',
                '#40d5ca',
                '#51d4a5',
                '#78d078',
                '#a4c74a',
                '#d1b821',
                '#ffa119',
                '#ff940d',
                '#ff8604',
                '#ff7700',
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
            };
        },
    },
};
</script>
