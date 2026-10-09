# 3D Interactive Restaurant Menu

Explore a small virtual restaurant through interactive 3D food and drink scenes. Browse the menu, rotate each model, and try the controls to add items, switch models, or play animations.

## Pages

- **Home** (`index.html`) — introduces the experience and links to the menu items.
- **About** (`about.html`) — describes the project.
- **Food** (`burger.html`) — explore a burger, add fries, rotate the scene, or view the model in wireframe.
- **Dessert** (`cake.html`) — explore and decorate a cake with strawberries or a candle, switch models, and use the rotation and wireframe controls.
- **Drinks** (`coke.html`) — explore a cola can, open it, switch models, and play the recycling animation.

The 3D scenes support mouse and touch interaction for looking around the models.

## Run locally

This is a static website; it does not need a build step or `npm install`.

1. Open this folder in Visual Studio Code.
2. Start a local web server, for example with the **Live Server** extension: right-click `index.html` and select **Open with Live Server**.
3. Use the navigation menu to open the Food, Dessert, or Drinks pages.

The site loads some libraries and fonts from online CDNs, so an internet connection is needed for all features to load correctly.

## Built with

- HTML, CSS, and JavaScript
- [Three.js](https://threejs.org/) for the 3D scenes
- [Bootstrap](https://getbootstrap.com/) for responsive layout and navigation
- [Blender](https://www.blender.org/) for creating the 3D models, exported as GLB files
- Models, images, and audio stored in `assets/`

## Project structure

```text
index.html       Home page
about.html       About page
burger.html      Interactive burger scene
cake.html        Interactive cake scene
coke.html        Interactive cola can scene
burger.js        Burger scene and controls
cake.js          Cake scene and controls
coke.js          Cola scene and controls
style.css        Shared page styles
style_button.css 3D page control styles
assets/          3D models, images, fonts, and audio
```
