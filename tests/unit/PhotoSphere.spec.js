import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import PhotoSphere from '@/components/PhotoSphere';

const testFrontmatter = {
    panoramas: [
        {
            id: 'foo-bar-1',
            caption: 'Foo Bar #1',
            panorama: [
                'https://example.com/panoramas/foo-bar-1_0.jpg',
                'https://example.com/panoramas/foo-bar-1_1.jpg',
                'https://example.com/panoramas/foo-bar-1_2.jpg',
                'https://example.com/panoramas/foo-bar-1_3.jpg',
                'https://example.com/panoramas/foo-bar-1_4.jpg',
                'https://example.com/panoramas/foo-bar-1_5.jpg',
            ],
        },
        {
            id: 'foo-bar-2',
            caption: 'Foo Bar #2',
            panorama: [
                'https://example.com/panoramas/foo-bar-2_0.jpg',
                'https://example.com/panoramas/foo-bar-2_1.jpg',
                'https://example.com/panoramas/foo-bar-2_2.jpg',
                'https://example.com/panoramas/foo-bar-2_3.jpg',
                'https://example.com/panoramas/foo-bar-2_4.jpg',
                'https://example.com/panoramas/foo-bar-2_5.jpg',
            ],
        },
    ],
};

Vue.prototype.$frontmatter = testFrontmatter;

describe('PhotoSphere', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(PhotoSphere);

        const viewer = wrapper.find('.PhotoSphere__Viewer');

        expect(viewer.exists()).toBe(true);
        expect(viewer.attributes('id')).toBe('photo-sphere-1');
    });

    it('renders the default panorama', () => {
        expect(wrapper.vm.photoSphere).toEqual(testFrontmatter.panoramas[0]);
    });

    it('renders a specific panorama', async () => {
        wrapper.setProps({
            id: testFrontmatter.panoramas[1].id,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.vm.photoSphere).toEqual(testFrontmatter.panoramas[1]);
    });

    it('calculates the viewer height', () => {
        expect(wrapper.vm.viewerHeight).toEqual(585);

        wrapper.vm.viewerWidth = 768;

        expect(wrapper.vm.viewerHeight).toEqual(432);
    });
});
