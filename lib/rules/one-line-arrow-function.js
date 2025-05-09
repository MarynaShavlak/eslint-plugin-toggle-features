"use strict";

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce one-line arrow functions in the "on" and "off" options of toggleFeatures',
      category: 'Best Practices',
      recommended: false,
      url: 'https://www.npmjs.com/package/eslint-plugin-toggle-features-rule-plugin',

    },
    fixable: null, // This rule is not auto-fixable
    schema: [], // No options needed
    messages: {}, // Add messageId and message

  },
  create(context) {
    return {
      CallExpression(node) {
        // Check if the function name is 'toggleFeatures'
        if (node.callee.name === 'toggleFeatures') {
          const optionsArgument = node.arguments[0];

          // Ensure that the first argument is an object literal (options)
          if (
              optionsArgument &&
              optionsArgument.type === 'ObjectExpression'
          ) {
            const properties = optionsArgument.properties;

            // Loop through the properties in the options object
            properties.forEach((property) => {
              if (
                  (property.key.name === 'on' ||
                      property.key.name === 'off') &&
                  property.value.type === 'ArrowFunctionExpression'
              ) {
                const arrowFunction = property.value;

                // Check if the body is a BlockStatement (multiline)
                if (arrowFunction.body.type === 'BlockStatement') {
                  context.report({
                    node: property,
                    message:
                        'Arrow function for "{{ option }}" should be a one-liner.',
                    data: {
                      option: property.key.name,
                    },
                  });
                }
              }
            });
          }
        }
      },
    };
  },
};

