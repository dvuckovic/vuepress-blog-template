import { shallowMount } from '@vue/test-utils';
import PolarAreaChart from '@/components/PolarAreaChart';

const testData = [
    [
        125,
        1288,
        104,
        2568,
        190,
        1147,
        387,
        2554,
    ],
];

const testLabels = [
    'N',
    'NE',
    'E',
    'SE',
    'S',
    'SW',
    'W',
    'NW',
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
];

describe('PolarAreaChart', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(PolarAreaChart, {
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
