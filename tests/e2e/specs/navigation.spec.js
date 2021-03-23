import { base, themeConfig } from '../../../src/.vuepress/config';

describe('Navigation', () => {
    it('start at root level', () => {
        cy.visit(base);
        cy.location('pathname').should('eq', base);
    });

    it('navigates primary items', () => {
        themeConfig.nav.forEach((item) => {
            cy.contains('a', item.text).click();
            cy.location('pathname').should('contain', item.link);
        });
    });

    it('navigates back to homepage', () => {
        cy.get('.navbar-brand').click();
        cy.location('pathname').should('eq', base);
    });

    it('has mobile navigation drawer', () => {
        cy.get('.navbar-collapse').as('navbar-collapse');
        cy.get('.navbar-toggler').as('navbar-toggler');

        cy.get('@navbar-collapse').should('be.visible');
        cy.get('@navbar-toggler').should('not.be.visible');

        cy.viewport(575, 1080);

        cy.get('@navbar-collapse').should('not.be.visible');
        cy.get('@navbar-toggler').should('be.visible');

        cy.get('@navbar-toggler').find('svg use')
            .should('have.attr', 'xlink:href')
            .and('match', /#list$/);
        cy.get('@navbar-toggler').click().find('svg use')
            .should('have.attr', 'xlink:href')
            .and('match', /#x$/);
        cy.get('@navbar-toggler').click().find('svg use')
            .should('have.attr', 'xlink:href')
            .and('match', /#list$/);

        cy.viewport(1000, 660);

        cy.get('@navbar-collapse').should('be.visible');
        cy.get('@navbar-toggler').should('not.be.visible');
    });
});
