<script>
import BaseChart from './BaseChart';

export default {
    extends: BaseChart,

    data () {
        return {
            type: 'line',
            colors: [
                '#ff6384',
                '#87ceeb',
                '#fff',
            ],
            borderWidths: [
                '0.75',
                '0.75',
                '2',
            ],
        };
    },

    methods: {
        datasetOptions (index, data) {
            return {
                label: this.labels[index],
                borderColor: this.colors[index],
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                pointBackgroundColor: this.colors[index],
                pointRadius: 0,
                pointHitRadius: 3,
                pointStyle: 'circle',
                fill: data.length === 1,
                lineTension: 0,
                borderWidth: this.borderWidths[index],
            };
        },

        chartOptions () {
            return {
                legend: {
                    labels: {
                        fontFamily: '"Helvetica", sans-serif',
                        fontColor: '#888',
                        fontSize: 13,
                        usePointStyle: true,
                    },
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: '#2c2c2c',
                                lineWidth: 2,
                                zeroLineColor: '#236b8e',
                            },
                            ticks: {
                                fontColor: '#888',
                            },
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                color: '#2c2c2c',
                                lineWidth: 2,
                            },
                            type: 'time',
                            time: {
                                displayFormats: {
                                    month: 'MMM',
                                },
                            },
                            distribution: 'series',
                            offset: true,
                            ticks: {
                                fontColor: '#888',
                                source: 'data',
                                autoSkip: true,
                                autoSkipPadding: 35,
                                maxRotation: 0,
                                sampleSize: 100,
                            },
                        },
                    ],
                },
            };
        },
    },
};
</script>
