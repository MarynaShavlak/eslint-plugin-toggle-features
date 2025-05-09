"use strict";

const rule = require("../../../lib/rules/component-jsx-props"),
  RuleTester = require("eslint").RuleTester;
const babelParser = require("@babel/eslint-parser");


const ruleTester = new RuleTester({
      languageOptions: {
        ecmaVersion: 6,
        sourceType: "script",
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      }
}
);
ruleTester.run("component-jsx-props", rule, {
  valid: [
    // Valid: JSX Elements used for "on" and "off"
    {
      code: `
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<RedesignedGridViewSkeleton />}
          off={<DeprecatedGridViewSkeleton />}
        />
      `,
    },
    // Valid: Both on and off as JSX Elements
    {
      code: `
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<SomeComponent />}
          off={<OtherComponent />}
        />
      `,
    },
    {
      code: `
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={
            <>
              <Text text="text" />
              <Button>text of button</Button>
            </>
          }
          off={
            <>
              <TextDeprecated text="text" />
              <ButtonDeprecated >
                text of button
              </ButtonDeprecated>
            </>
          }
        />
      `,
    },
  ],

  invalid: [
    {
      // Invalid: Using variable for "on" prop
      code: `
        const redesigned = <RedesignedGridViewSkeleton />;
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={redesigned}
          off={<DeprecatedGridViewSkeleton />}
        />
      `,
      errors: [
        {
          message: 'The "on" prop should only contain JSX elements or fragments.',
          type: "JSXAttribute",
        },
      ],
    },
    {
      // Invalid: Non-JSX expression for "off" prop
      code: `
        const deprecated = <DeprecatedGridViewSkeleton />;
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<RedesignedGridViewSkeleton />}
          off={deprecated}
        />
      `,
      errors: [
        {
          message: 'The "off" prop should only contain JSX elements or fragments.',
          type: "JSXAttribute",
        },
      ],
    },
    {
      // Invalid: Both "on" and "off" are variables
      code: `
        const redesigned = <RedesignedGridViewSkeleton />;
        const deprecated = <DeprecatedGridViewSkeleton />;
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={redesigned}
          off={deprecated}
        />
      `,
      errors: [
        {
          message: 'The "on" prop should only contain JSX elements or fragments.',
          type: "JSXAttribute",
        },
        {
          message: 'The "off" prop should only contain JSX elements or fragments.',
          type: "JSXAttribute",
        },
      ],
    }
  ],
});
