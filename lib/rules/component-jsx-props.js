"use strict";

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "Ensure only JSX elements or JSX fragments are used for \"on\" and \"off\" props in ToggleFeaturesComponent",
      recommended: false,
      url: 'https://www.npmjs.com/package/eslint-plugin-toggle-features-rule-plugin',
    },
    fixable: null,
    schema: [],
    messages: {
      invalidPropType: 'The "{{prop}}" prop should only contain JSX elements or fragments.',
    },
  },

  create(context) {
    return {
      JSXAttribute(node) {
        // Check if the component is ToggleFeaturesComponent
        const isToggleFeaturesComponent =
            node.parent &&
            node.parent.name &&
            node.parent.name.name === 'ToggleFeaturesComponent';

        if (!isToggleFeaturesComponent) return;

        // Check if the prop is 'on' or 'off'
        if (node.name.name === 'on' || node.name.name === 'off') {
          const value = node.value && node.value.expression;

          // Allow JSXElement, JSXFragment, or JSXExpressionContainer containing valid JSX
          if (
              value &&
              value.type !== 'JSXElement' &&  // Regular JSX element
              value.type !== 'JSXFragment' && // JSX fragment (<>...</>)
              value.type !== 'JSXExpressionContainer' // Container for complex JSX
          ) {
            context.report({
              node,
              messageId: 'invalidPropType',
              data: { prop: node.name.name },
            });
          } else if (value && value.type === 'JSXExpressionContainer') {
            // Check if the expression inside the container is a valid JSX element or fragment
            const expression = value.expression;
            if (
                expression.type !== 'JSXElement' &&
                expression.type !== 'JSXFragment'
            ) {
              context.report({
                node,
                messageId: 'invalidPropType',
                data: { prop: node.name.name },
              });
            }
          }
        }
      },
    };
  },

};
