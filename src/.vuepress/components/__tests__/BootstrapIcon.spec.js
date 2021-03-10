import { shallowMount } from '@vue/test-utils';
import BootstrapIcon from '../BootstrapIcon';

describe('BootstrapIcon', () => {
    let wrapper;

    it('mounts successfully', () => {
        wrapper = shallowMount(BootstrapIcon);

        expect(wrapper.find('.BootstrapIcon').exists()).toBe(true);
        expect(wrapper.find('use').attributes('href')).toMatch('#x');
        expect(wrapper.find('.BootstrapIcon').element.style['font-size']).toEqual('16px');
    });

    it('supports the icon prop', async () => {
        const icon = 'emoji-smile';

        wrapper.setProps({
            icon,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('use').attributes('href')).toMatch(`#${icon}`);
    });

    it('supports the size prop', async () => {
        const size = '24';

        wrapper.setProps({
            size,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('.BootstrapIcon').element.style['font-size']).toEqual(`${size}px`);
    });

    it('supports the spin prop', async () => {
        wrapper.setProps({
            spin: true,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('.BootstrapIcon').classes()).toContain('BootstrapIcon--Spin');
    });
});
