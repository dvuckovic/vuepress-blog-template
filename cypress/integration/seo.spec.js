/// <reference types="cypress" />
import matter from 'gray-matter';
import { base, title, description, themeConfig } from '../../src/.vuepress/config';

describe('SEO', () => {
    // This test runs only if SEO has been activated in the configuration.
    if (!themeConfig.seo) return;

    it('has expected meta tags for the homepage', () => {
        cy.visit(base);
        cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', title);
        cy.get('head meta[property="og:title"]').should('have.attr', 'content', title);
        cy.get('head meta[property="og:description"]').should('have.attr', 'content', description);
        cy.get('head meta[property="og:image"]').should('have.attr', 'content', themeConfig.coverHome);
        cy.get('head meta[property="og:url"]').should('have.attr', 'content', base);
    });

    it('has expected meta tags for the tag page', () => {
        const url = '/tag/';

        cy.visit(url);
        cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', title);
        cy.get('head meta[property="og:title"]').should('have.attr', 'content', 'Tag');
        cy.get('head meta[property="og:description"]').should('have.attr', 'content', description);
        cy.get('head meta[property="og:image"]').should('have.attr', 'content', themeConfig.coverHome);
        cy.get('head meta[property="og:url"]').should('have.attr', 'content', url);
    });

    it('has expected meta tags for the posts page', () => {
        const url = '/tag/post/';

        cy.visit(url);
        cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', title);
        cy.get('head meta[property="og:title"]').should('have.attr', 'content', 'post Tag');
        cy.get('head meta[property="og:description"]').should('have.attr', 'content', description);
        cy.get('head meta[property="og:image"]').should('have.attr', 'content', themeConfig.coverHome);
        cy.get('head meta[property="og:url"]').should('have.attr', 'content', url);
    });

    it('has expected meta tags for a post', () => {
        const markdownPath = 'src/posts/blog-post.md';

        cy.readFile(markdownPath).then((markdown) => {
            const frontmatter = matter(markdown).data;
            const [ , slug ] = markdownPath.match(/\/([\w-]+)\.md$/);
            const { date } = frontmatter;
            const isoDate = date.toISOString().substring(0, 10);
            const [ YYYY, MM, DD ] = isoDate.split('-');
            const url = `/${YYYY}/${MM}/${DD}/${slug}/`;

            cy.visit(url);
            cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', title);
            cy.get('head meta[property="og:title"]').should('have.attr', 'content', frontmatter.title);
            cy.get('head meta[property="og:description"]').should('have.attr', 'content', frontmatter.summary);
            cy.get('head meta[property="og:image"]').should('have.attr', 'content', frontmatter.image);
            cy.get('head meta[property="og:url"]').should('have.attr', 'content', url);
        });
    });

    it('has expected meta tags for a static page', () => {
        const markdownPath = 'src/static-page.md';

        cy.readFile(markdownPath).then((markdown) => {
            const frontmatter = matter(markdown).data;
            const [ , slug ] = markdownPath.match(/\/([\w-]+)\.md$/);
            const url = `/${slug}.html`;

            cy.visit(url);
            cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', title);
            cy.get('head meta[property="og:title"]').should('have.attr', 'content', frontmatter.title);
            cy.get('head meta[property="og:description"]').should('have.attr', 'content', frontmatter.summary);
            cy.get('head meta[property="og:image"]').should('have.attr', 'content', frontmatter.image);
            cy.get('head meta[property="og:url"]').should('have.attr', 'content', url);
        });
    });
});
