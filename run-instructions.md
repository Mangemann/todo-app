Running the tests:

-Make sure you have installed the project/dependencies
-If running against local application, make sure the app is started before running the tests.

By default, the tests will run against the local application on http://localhost:3000/, however it can be changed to run against the live version at https://wc-react-todo-app.netlify.app/. This change is made in the file cypress/support/e2e.js.

To run the tests in terminal, use the command: npm run cypressHeadless (Runs on the electrum browser)
To run it through Cypress UI, use the command: npm run cypressOpen. From there you select e2e testing, then select browser to test through, then select the spec file to run. The spec file to run in this instance is todo-list.cy.js

Due to current incompability between Cypress and Firefox, the tests can not be run on that browser.
