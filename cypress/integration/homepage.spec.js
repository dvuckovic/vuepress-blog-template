/// <reference types="cypress" />
import { title, description, base, themeConfig } from '../../src/.vuepress/config';

describe('Homepage', () => {
    it('renders at root level', () => {
        cy.visit(base);
        cy.location('pathname').should('eq', base);
    });

    it('has the home icon', () => {
        cy.get('.navbar-brand').as('logo');
        cy.get('@logo').should('have.attr', 'href', base);
        cy.get('@logo').find('img').should('have.attr', 'src', themeConfig.logo);
    });

    it('has the primary navigation items', () => {
        cy.get('ul.navbar-nav[role="menu"] > li').as('menu');
        cy.get('@menu').should('have.length', themeConfig.nav.length);
        cy.get('@menu').each((item, index) => {
            cy.get(item).contains(themeConfig.nav[index].text);
        });
    });

    it('has the search box', () => {
        cy.get('.search-box').should('exist');
    });

    it('has the feed button', () => {
        cy.get('.Header__Nav__Right a.Feed').should('have.attr', 'href', themeConfig.feed.path);
    });

    it('has the contact buttons', () => {
        themeConfig.contact.forEach((item) => {
            cy.get(`.Header__Nav__Right a[title="${item.text}"]`).should('have.attr', 'href', item.link);
        });
    });

    it('has header background', () => {
        cy.get('.Header--ImageBackground').should('have.css', 'background-image', `url("${themeConfig.coverHome}")`);
    });

    it('contains the primary title and the tag line', () => {
        cy.contains('h1', title);
        cy.contains('h2', description);
    });

    it('has number of configured posts', () => {
        cy.get('article').should('have.length', themeConfig.globalPagination.lengthPerPage);
    });

    it('has pagination for posts', () => {
        cy.get('.pagination').find('a').contains('Next').click({ force: true });
        cy.location('pathname').should('eq', `${base}page/2/`);
        cy.get('.pagination').find('a').contains('Prev').click({ force: true });
        cy.location('pathname').should('eq', base);
    });

    it('has footer links', () => {
        cy.get('.Footer .order-1 [role="menuitem"] > a').each((item, index) => {
            const itemConfig = themeConfig.footer.links[index];
            const itemLink = itemConfig.link.replace(/\.md$/, '.html');
            cy.get(item).should('have.attr', 'href', itemLink).contains(itemConfig.text);
        });
        cy.get('.Footer .order-2 [role="menuitem"] > a').each((item, index) => {
            const itemConfig = themeConfig.footer.syndication[index];
            const itemLink = itemConfig.link.replace(/\.md$/, '.html');
            cy.get(item).should('have.attr', 'href', itemLink)
                .find('img').should('have.attr', 'src', itemConfig.image);
        });
        cy.get('.Footer .order-3 [role="menuitem"] > a').each((item, index) => {
            const itemConfig = themeConfig.footer.copyright[index];
            const itemLink = itemConfig.link.replace(/\.md$/, '.html');
            cy.get(item).should('have.attr', 'href', itemLink).contains(itemConfig.text);
        });
    });
});
