import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import PhotoAlbum from '../PhotoAlbum';

const testFrontmatter = {
    paths: {
        high: 'https://example.com/photos/',
        low: 'https://example.com/photos/thumbs/',
    },
    albums: [
        {
            id: 'foo-bar-1',
            photos: [
                {
                    name: 'foo-bar-1_1.jpg',
                    title: 'Foo Bar #1',
                    size: '2048x1362',
                    location: '45.43048,12.33268',
                },
                {
                    name: 'foo-bar-1_2.jpg',
                    title: 'Foo Bar #2',
                    size: '1362x2048',
                    location: '45.43019,12.33275',
                },
                {
                    name: 'foo-bar-1_3.jpg',
                    title: 'Foo Bar #3',
                    size: '2048x1362',
                    location: '45.42997,12.33277',
                },
                {
                    name: 'foo-bar-1_4.jpg',
                    title: 'Foo Bar #4',
                    size: '1362x2048',
                    location: '45.42950,12.33284',
                },
                {
                    name: 'foo-bar-1_5.jpg',
                    title: 'Foo Bar #5',
                    size: '2048x1362',
                    location: '45.42919,12.33288',
                },
            ],
        },
        {
            id: 'foo-bar-2',
            photos: [
                {
                    name: 'foo-bar-2_1.jpg',
                    title: 'Foo Bar #1',
                    size: '640x480',
                },
                {
                    name: 'foo-bar-2_2.jpg',
                    title: 'Foo Bar #2',
                    size: '480x640',
                },
                {
                    name: 'foo-bar-2_3.jpg',
                    title: 'Foo Bar #3',
                    size: '640x480',
                },
                {
                    name: 'foo-bar-2_4.jpg',
                    title: 'Foo Bar #4',
                    size: '480x640',
                },
                {
                    name: 'foo-bar-2_5.jpg',
                    title: 'Foo Bar #5',
                    size: '640x480',
                },
            ],
        },
    ],
};

Vue.prototype.$frontmatter = testFrontmatter;

describe('PhotoAlbum', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(PhotoAlbum, {
            stubs: {
                BootstrapIcon: true,
                GeotagMap: true,
            },
        });

        expect(wrapper.find('.PhotoAlbum').exists()).toBe(true);
    });

    it('renders the default album', () => {
        expect(wrapper.vm.photoAlbum).toEqual(testFrontmatter.albums[0]);
        expect(wrapper.find(`div[data-pswp-uid="${testFrontmatter.albums[0].id}"]`).exists()).toBe(true);

        const figures = wrapper.findAll('.PhotoAlbum__Figure');

        expect(figures.length > 0).toBe(true);

        figures.wrappers.forEach((figure, figureIdx) => {
            const link = figure.find('a');

            expect(link.attributes('title')).toEqual(testFrontmatter.albums[0].photos[figureIdx].title);
            expect(link.attributes('data-name')).toEqual(testFrontmatter.albums[0].photos[figureIdx].name);
            expect(link.attributes('data-size')).toEqual(testFrontmatter.albums[0].photos[figureIdx].size);
            expect(link.attributes('href'))
                .toEqual(`${testFrontmatter.paths.high}${testFrontmatter.albums[0].photos[figureIdx].name}`);

            expect(figure.find('.PhotoAlbum__Figcaption').text())
                .toEqual(testFrontmatter.albums[0].photos[figureIdx].title);
        });
    });

    it('shows the mode switch in album mode by default', () => {
        const modeSwitch = wrapper.find('.PhotoAlbum__ModeSwitch');

        expect(modeSwitch.exists()).toBe(true);
        expect(modeSwitch.find('.PhotoAlbum__ModeSwitch__Album').classes()).toContain('active');
        expect(modeSwitch.find('.PhotoAlbum__ModeSwitch__Map').classes()).not.toContain('active');

        expect(wrapper.find('.PhotoAlbum__ImageGallery').exists()).toBe(true);
        expect(wrapper.find('geotagmap-stub').exists()).not.toBe(true);
    });

    it('shows map on mode switch', async () => {
        const modeSwitch = wrapper.find('.PhotoAlbum__ModeSwitch');
        modeSwitch.find('.PhotoAlbum__ModeSwitch__Map').trigger('click');

        await wrapper.vm.$nextTick(() => {});
        await wrapper.vm.$nextTick(() => {});

        expect(modeSwitch.find('.PhotoAlbum__ModeSwitch__Album').classes()).not.toContain('active');
        expect(modeSwitch.find('.PhotoAlbum__ModeSwitch__Map').classes()).toContain('active');

        expect(wrapper.find('.PhotoAlbum__ImageGallery').element.style.display).toEqual('none');
        expect(wrapper.find('geotagmap-stub').exists()).toBe(true);
    });

    it('shows album on mode switch', async () => {
        const modeSwitch = wrapper.find('.PhotoAlbum__ModeSwitch');
        modeSwitch.find('.PhotoAlbum__ModeSwitch__Album').trigger('click');

        await wrapper.vm.$nextTick(() => {});

        expect(modeSwitch.find('.PhotoAlbum__ModeSwitch__Album').classes()).toContain('active');
        expect(modeSwitch.find('.PhotoAlbum__ModeSwitch__Map').classes()).not.toContain('active');

        expect(wrapper.find('.PhotoAlbum__ImageGallery').exists()).toBe(true);
        expect(wrapper.find('geotagmap-stub').exists()).not.toBe(true);
    });

    it('renders a specific album', async () => {
        wrapper.setProps({
            id: testFrontmatter.albums[1].id,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.vm.photoAlbum).toEqual(testFrontmatter.albums[1]);
        expect(wrapper.find(`div[data-pswp-uid="${testFrontmatter.albums[1].id}"]`).exists()).toBe(true);
    });

    it('hides the mode switch if no locations are present in the album', async () => {
        expect(wrapper.find('.PhotoAlbum__ModeSwitch').exists()).not.toBe(true);
    });
});
