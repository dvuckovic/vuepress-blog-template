import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import ObjectVR from '@/components/ObjectVR';

const testFrontmatter = {
    objects: [
        {
            id: 'foo-bar-1',
            config: 'https://example.com/objects/foo-bar-1.xml',
        },
        {
            id: 'foo-bar-2',
            config: 'https://example.com/objects/foo-bar-2.xml',
        },
    ],
};

Vue.prototype.$frontmatter = testFrontmatter;

// Avoid console errors for the undefined alert global function.
window.alert = jest.fn();

describe('ObjectVR', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(ObjectVR);

        expect(wrapper.find('.ObjectVR').exists()).toBe(true);
    });

    it('renders the default object', () => {
        expect(wrapper.vm.objectVR).toEqual(testFrontmatter.objects[0]);
        expect(wrapper.find(`div#${testFrontmatter.objects[0].id}`).exists()).toBe(true);
    });

    it('renders a specific object', async () => {
        wrapper.setProps({
            id: testFrontmatter.objects[1].id,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.vm.objectVR).toEqual(testFrontmatter.objects[1]);
        expect(wrapper.find(`div#${testFrontmatter.objects[1].id}`).exists()).toBe(true);
    });
});
