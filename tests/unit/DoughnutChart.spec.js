import { shallowMount } from '@vue/test-utils';
import DoughnutChart from '@/components/DoughnutChart';

const testData = [
    [
        50,
        25,
        12.5,
        6.25,
        3.125,
        1.5625,
        0.78125,
        0.78125,
    ],
];

const testLabels = [
    '1/2',
    '1/4',
    '1/8',
    '1/16',
    '1/32',
    '1/64',
    '1/128',
    '1/128',
];

const chartColors = [
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
];

describe('DoughnutChart', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(DoughnutChart, {
            propsData: {
                data: testData,
                labels: testLabels,
            },
        });

        const canvas = wrapper.find('canvas');

        expect(canvas.exists()).toBe(true);
        expect(canvas.classes()).toContain('chartjs-render-monitor');
    });

    it('renders single series with predefined colors', async () => {
        expect.assertions(3);

        const { datasets, labels } = wrapper.vm.$options.chart.config.data;

        expect(datasets[0].data).toEqual(testData[0]);
        expect(datasets[0].backgroundColor).toEqual(chartColors);

        expect(labels).toEqual(testLabels);
    });
});
