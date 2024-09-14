# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Setup
The frontend of this project is built using Vite to setup a react javascript project. Options for launching
the frontend are in the package.json. For development mode use "npm run dev" and to build use "npm run build".
The finished build will be put into the /dist directory. Since this project was made to be deployed on render,
it is important to change environmental variables. This app uses vite's SOME_KEY variable to store the API key
for "https://fortniteapi.io/".