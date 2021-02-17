/// <reference types="cypress" />
import { themeConfig } from '../../src/.vuepress/config';

describe('Object VR', () => {
    // This test runs only if Object2VR player has been defined in the configuration.
    if (!themeConfig.env || !themeConfig.env.OBJECT2VR_PLAYER) return;

    it('renders object VR', () => {
        cy.visit('/2021/01/06/object-vr/');
        cy.get('div#panorama-head > div > div > canvas').should('exist');
        cy.window().then((win) => {
            expect(win.object2vrPlayer).to.be.a('function');
        });
    });
});
