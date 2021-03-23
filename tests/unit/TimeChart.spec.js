import { shallowMount } from '@vue/test-utils';
import TimeChart from '@/components/TimeChart';

const testData = [
    [
        {
            t: '2020-01-01',
            y: 53285,
        },
        {
            t: '2020-01-02',
            y: 57725,
        },
        {
            t: '2020-01-03',
            y: 54990,
        },
        {
            t: '2020-01-04',
            y: 58784,
        },
        {
            t: '2020-01-05',
            y: 60916,
        },
    ],
    [
        {
            t: '2020-01-01',
            y: 26164,
        },
        {
            t: '2020-01-02',
            y: 27324,
        },
        {
            t: '2020-01-03',
            y: 28778,
        },
        {
            t: '2020-01-04',
            y: 30507,
        },
        {
            t: '2020-01-05',
            y: 30370,
        },
    ],
    [
        {
            t: '2020-01-01',
            y: 656,
        },
        {
            t: '2020-01-02',
            y: 445,
        },
        {
            t: '2020-01-03',
            y: 455,
        },
        {
            t: '2020-01-04',
            y: 407,
        },
        {
            t: '2020-01-05',
            y: 830,
        },
    ],
];

const testLabels = [
    'Cases',
    'Patients',
    'Deaths',
];

describe('TimeChart', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(TimeChart, {
            propsData: {
                data: testData,
                labels: testLabels,
            },
        });

        const canvas = wrapper.find('canvas');

        expect(canvas.exists()).toBe(true);
        expect(canvas.classes()).toContain('chartjs-render-monitor');
    });

    it('renders multiple series', () => {
        const { datasets } = wrapper.vm.$options.chart.config.data;

        for (let i = 0; i < testData.length; i++) {
            expect(datasets[i].data).toEqual(testData[i]);
            expect(datasets[i].label).toEqual(testLabels[i]);
            expect(datasets[i].fill).toBe(false);
        }
    });

    it('renders single series', async () => {
        expect.assertions(5);

        wrapper.setProps({
            data: [
                testData[0],
            ],
            labels: [
                testLabels[0],
            ],
        });

        await wrapper.vm.$nextTick(() => {});

        const { datasets } = wrapper.vm.$options.chart.config.data;

        expect(datasets[0].data).toEqual(testData[0]);
        expect(datasets[0].label).toEqual(testLabels[0]);
        expect(datasets[0].fill).toBe(true);

        expect(datasets[1]).toBe(undefined);
        expect(datasets[2]).toBe(undefined);
    });
});
