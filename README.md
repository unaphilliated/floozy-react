# Rsbuild project

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Learn more

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!

# Project structure

## Folder strategy

* Assets
  * Images, fonts, etc.
* Components
  * Reusable UI components
* Pages
  * Page-level components built from unique or reusable sub-components
* Styles
  * Reusable style variables
  * Style templates
  * Global style sheet
  * Individual page style sheets

This was setup with loose guidance from the article [Recommended React Folder Structure Guide](https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc)

## Styling strategy

### MUI
For MUI components, use `theme.ts` for global styling. This is applied in `index.tsx` and can be accessed everywhere.
* [MUI Theme documentation](https://mui.com/material-ui/customization/theming/)
* [MUI Pallete documentation](https://mui.com/material-ui/customization/palette/)

### Traditional (SCSS)
For traditional styling, use SCSS. Shared variables can be defined in `_variables.scss`. Shared format templates can be defined as seen in `_form.scss`, used in ex. `Login.scss` and `Register.scss`.

TODO: Add some mixin examples