import { base, themeConfig } from '../../../src/.vuepress/config';

describe('Analytics', () => {
    // This test runs only if GA has been activated in the configuration.
    if (!themeConfig.ga) return;

    it('has GA code present', () => {
        cy.visit(base);
        cy.window().then((win) => {
            // Runs only in production mode.
            if (win.devMode) return;

            // Google Analytics tracker has been loaded.
            expect(win.ga).to.be.a('function');

            // Check if tracking ID matches.
            win.ga((tracker) => {
                expect(tracker.get('trackingId')).to.equal(themeConfig.env.GOOGLE_ANALYTICS_ID);
            });
        });
    });
});
