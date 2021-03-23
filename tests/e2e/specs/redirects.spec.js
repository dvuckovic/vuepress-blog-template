import { themeConfig } from '../../../src/.vuepress/config';
import redirects from '../../../src/.vuepress/redirects';

describe('Redirects', () => {
    it('executes a sample redirection properly', () => {
        const index = 0;
        cy.visit(redirects[index].from, { failOnStatusCode: false });
        cy.location('pathname').should('eq', redirects[index].to);
    });

    it('serves an error for not found pages', () => {
        cy.visit('/foobar', { failOnStatusCode: false });
        cy.contains('h1', themeConfig.errorTitle);
        cy.contains('h2', themeConfig.errorDescription);
    });
});
