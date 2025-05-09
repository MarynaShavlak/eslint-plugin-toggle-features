const rule = require("../../../lib/rules/one-line-arrow-function"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("one-line-arrow-function", rule, {
  valid: [
    {
      code: `
        toggleFeatures({
          on: () => console.log('Feature enabled'),
          off: () => console.log('Feature disabled'),
        });
      `,
    },
    {
      code: `
        toggleFeatures({
          on: () => true,
          off: () => false,
        });
      `,
    },
    {
      code: `
        toggleFeatures({
          on: () => 1 + 1,
          off: () => someVariable
        });
      `,
    }
  ],

  invalid: [
    {
      // Invalid test case where arrow functions are block statements
      code: `
        toggleFeatures({
          on: () => {
            console.log('Feature enabled');
          },
          off: () => {
            console.log('Feature disabled');
          }
        });
      `,
      errors: [
        {
          message: 'Arrow function for "on" should be a one-liner.',
          type: "Property",
        },
        {
          message: 'Arrow function for "off" should be a one-liner.',
          type: "Property",
        },
      ],
    },
    {
      // Invalid test case with one block statement and one correct one-liner
      code: `
        toggleFeatures({
          on: () => {
            doSomething();
          },
          off: () => console.log('Feature disabled'),
        });
      `,
      errors: [
        {
          message: 'Arrow function for "on" should be a one-liner.',
          type: "Property",
        },
      ],
    }
  ],
});
