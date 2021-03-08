/// <reference types="cypress" />
import { themeConfig } from '../../src/.vuepress/config';

describe('Photo Album', () => {
    it('renders photo album', () => {
        cy.visit('/2021/01/04/photo-album/');
        cy.get('.PhotoAlbum').as('album');
        cy.get('@album').should('exist');
        cy.get('@album').find('.PhotoAlbum__ModeSwitch').should('exist');
        cy.get('@album').find('.PhotoAlbum__ImageGallery').should('exist');
        cy.get('@album').find('.PhotoAlbum__Figure').should('exist');
    });

    it('renders geotagging map', () => {
        // This test runs only if Object2VR player has been defined in the configuration.
        if (!themeConfig.env || !themeConfig.env.GOOGLE_MAPS_API_KEY) return;

        cy.get('.PhotoAlbum__ModeSwitch__Map').click({ force: true });
        cy.get('.vue-map').should('exist');
        cy.get('div[title="Photo 1 (1024x768?1)"]').should('exist');
        cy.window().then((win) => {
            expect(win.google.maps).to.be.a('object');
        });
    });
});
