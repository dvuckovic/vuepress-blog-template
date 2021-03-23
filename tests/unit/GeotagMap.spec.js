import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import GeotagMap from '@/components/GeotagMap';

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

describe('GeotagMap', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(GeotagMap);

        expect(wrapper.find('.GeotagMap').exists()).toBe(true);
    });

    it('shows markers for each location', async () => {
        const cluster = wrapper.find('gmapcluster-stub');

        expect(cluster.exists()).toBe(true);

        const markers = cluster.findAll('gmapmarker-stub');

        expect(markers.length > 0).toBe(true);

        markers.wrappers.forEach((marker, markerIdx) => {
            const photo = testFrontmatter.albums[0].photos[markerIdx];
            const photoPosition = {
                lat: parseFloat(photo.location.split(',')[0]),
                lng: parseFloat(photo.location.split(',')[1]),
            };

            expect(marker.vm.position).toEqual(photoPosition);
            expect(marker.vm.icon.url).toEqual(`${testFrontmatter.paths.low}${photo.name}`);
            expect(marker.attributes('title')).toEqual(`${photo.title} (${photo.name})`);
            expect(marker.attributes('clickable')).toBeTruthy();
        });
    });

    it('hides if no locations are present in the album', async () => {
        wrapper.setProps({
            id: testFrontmatter.albums[1].id,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('.GeotagMap').exists()).not.toBe(true);
    });
});
