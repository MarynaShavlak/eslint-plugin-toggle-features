# eslint-plugin-toggle-features

An ESLint plugin to enforce one-line arrow functions in toggleFeatures.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-toggle-features`:

```sh
npm install eslint-plugin-toggle-features --save-dev
```

## Usage

Add `toggle-features` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "toggle-features"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "toggle-features/one-line-arrow-function": ["error"],
        "toggle-features/component-jsx-props": ["error"]
    }
}
```

## Configurations

This plugin does not offer any predefined configurations. You need to manually enable the rules you want to apply in your `.eslintrc` configuration file.

Example configuration:

```json
{
  "plugins": [
    "toggle-features"
  ],
  "rules": {
    "toggle-features/one-line-arrow-function": ["error"],
    "toggle-features/component-jsx-props": ["error"]
  }
}
```


## Rules

### `toggle-features/one-line-arrow-function`

**Type**: problem 

This rule enforces the use of one-line arrow functions for the `on` and `off` options in the `toggleFeatures` function.
If the arrow function body is a block statement (i.e., multiline), it will report an error.

#### Rule Details

This rule checks the `toggleFeatures` function calls and ensures that any arrow functions provided as values to the `on` and `off` properties in the options object are one-liners. 

**Incorrect:**

```js
toggleFeatures({
    name: 'featureName',
    on: () => {
      console.log('Feature enabled');
    },
    off: () => {
      console.log('Feature disabled');
    }
});
```

**Correct**
```js
toggleFeatures({
    name: 'featureName',
    on: () => console.log('Feature enabled'),
    off: () => console.log('Feature disabled')
});
```

## Rule Rationale
Use the `one-line-arrow-function` rule to enforce concise, one-line arrow functions for the `on` and `off` options in the `toggleFeatures` function. 
This rule ensures that toggle logic remains simple and readable by preventing the use of multiline arrow functions. 
It promotes a cleaner, more consistent codebase, especially when managing feature toggles, by reducing complexity and keeping the toggle functions easy to follow.


### `toggle-features/component-jsx-props`

**Type**: problem

This rule ensures that only JSX elements are passed to the `on` and `off` props of the `ToggleFeaturesComponent`. 
Variables or non-JSX expressions are not allowed.

#### Rule Details

The `component-jsx-props` rule ensures that JSX components or fragments, not variables, are directly passed to the `on` and `off` props in the `ToggleFeaturesComponent`. 
If a variable or non-JSX expression is used, this rule will report an error.

**Incorrect:**
```jsx
const redesigned = <RedesignedGridViewSkeleton />;
<ToggleFeaturesComponent
  feature="isAppRedesigned"
  on={redesigned}
  off={<DeprecatedGridViewSkeleton />}
/>;
```
**Correct:**
```jsx
<ToggleFeaturesComponent
  feature="isAppRedesigned"
  on={<RedesignedGridViewSkeleton />}
  off={<DeprecatedGridViewSkeleton />}
/>;
```
## Rule Rationale
This rule helps ensure consistency in code by enforcing that the `on` and `off` props of `ToggleFeaturesComponent` always receive JSX elements directly, avoiding potential issues with variables or expressions that could introduce unexpected behavior.

