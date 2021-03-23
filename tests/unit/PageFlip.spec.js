import { shallowMount } from '@vue/test-utils';
import { sprintf } from 'sprintf-js';
import PageFlip from '@/components/PageFlip';

const testFrontmatter = {
    pageflips: [
        {
            id: 'foo-bar-1',
            title: 'Foo Bar #1',
            description: 'Foo Bar Description #1',
            image: 'https://example.com/pageflips/foo-bar-1_01.jpg',
            name: 'foo-bar-1_%02d.jpg',
            path: 'https://example.com/pageflips/',
            width: 350,
            height: 495,
            size: 32,
        },
        {
            id: 'foo-bar-2',
            title: 'Foo Bar #2',
            description: 'Foo Bar Description #2',
            image: 'https://example.com/pageflips/foo-bar-2_01.jpg',
            name: 'foo-bar-2_%02d.jpg',
            path: 'https://example.com/pageflips/',
            orientation: 'landscape',
            width: 495,
            height: 350,
            size: 64,
        },
    ],
};

describe('PageFlip', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(PageFlip, {
            propsData: {
                pageflip: testFrontmatter.pageflips[0],
                index: 0,
            },
            stubs: {
                BootstrapIcon: true,
            },
        });

        expect(wrapper.find('.PageFlip').exists()).toBe(true);
    });

    it('renders a collapsed preview initially', () => {
        const preview = wrapper.find('.PageFlip__Preview');

        expect(preview.exists()).toBe(true);

        const thumbnail = preview.find('.PageFlip__Preview__Thumbnail');

        expect(thumbnail.classes()).toContain('PageFlip__Preview__Thumbnail--Portrait');
        expect(thumbnail.element.style.backgroundImage).toEqual(`url(${testFrontmatter.pageflips[0].image})`);

        expect(preview.find('h3').text()).toEqual(testFrontmatter.pageflips[0].title);
        expect(preview.find('p').text()).toEqual(testFrontmatter.pageflips[0].description);

        expect(wrapper.find('.PageFlip__Canvas__Container').exists()).toBe(false);
    });

    it('expands the canvas on thumbnail click', async () => {
        const thumbnail = wrapper.find('.PageFlip__Preview__Thumbnail');

        thumbnail.trigger('click');

        await wrapper.vm.$nextTick(() => {});

        const container = wrapper.find('.PageFlip__Canvas__Container');

        expect(container.exists()).toBe(true);

        const canvas = wrapper.find('.PageFlip__Canvas');

        expect(canvas.classes()).toContain('PageFlip__Canvas--Portrait');
        expect(canvas.element.style.minWidth).toEqual(`${testFrontmatter.pageflips[0].width}px`);
        expect(canvas.element.style.minHeight).toEqual(`${testFrontmatter.pageflips[0].height}px`);
    });

    it('renders correct page images', () => {
        const testPages = [];

        for (let i = 1; i <= testFrontmatter.pageflips[0].size; i++) {
            testPages.push(`${testFrontmatter.pageflips[0].path}${sprintf(testFrontmatter.pageflips[0].name, i)}`);
        }

        expect(wrapper.vm.pages).toEqual(testPages);
    });

    it('collapses the canvas on thumbnail click', async () => {
        const thumbnail = wrapper.find('.PageFlip__Preview__Thumbnail');

        thumbnail.trigger('click');

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('.PageFlip__Canvas__Container').exists()).toBe(false);
    });

    it('supports landscape orientation ', async () => {
        wrapper.setProps({
            pageflip: testFrontmatter.pageflips[1],
            index: 1,
        });

        await wrapper.vm.$nextTick(() => {});

        const thumbnail = wrapper.find('.PageFlip__Preview__Thumbnail');

        expect(thumbnail.classes()).toContain('PageFlip__Preview__Thumbnail--Landscape');
        expect(thumbnail.element.style.backgroundImage).toEqual(`url(${testFrontmatter.pageflips[1].image})`);

        const preview = wrapper.find('.PageFlip__Preview');

        expect(preview.find('h3').text()).toEqual(testFrontmatter.pageflips[1].title);
        expect(preview.find('p').text()).toEqual(testFrontmatter.pageflips[1].description);
    });

    it('renders correct page images and expands again on button click', async () => {
        const button = wrapper.find('.PageFlip__ExpandButton');

        expect(button.classes()).not.toContain('active');

        button.trigger('click');

        await wrapper.vm.$nextTick(() => {});

        expect(button.classes()).toContain('active');

        const testPages = [];

        for (let i = 1; i <= testFrontmatter.pageflips[1].size; i++) {
            testPages.push(`${testFrontmatter.pageflips[1].path}${sprintf(testFrontmatter.pageflips[1].name, i)}`);
        }

        expect(wrapper.vm.pages).toEqual(testPages);
    });

    it('collapses the canvas on button click', async () => {
        const button = wrapper.find('.PageFlip__ExpandButton');

        button.trigger('click');

        await wrapper.vm.$nextTick(() => {});

        expect(button.classes()).not.toContain('active');
        expect(wrapper.find('.PageFlip__Canvas__Container').exists()).toBe(false);
    });
});
