# WordPress Plugin Installer Widget

<img src="https://i.imgur.com/BrE3yhA.png" />

<h2><a href="https://wp-install.surge.sh/">&rarr; Build your own widget</a></h2>

## Forking the widget

If the widget is missing something you need, you can fork it. Simply copy the `widget` directory into your own project. When the widget is built, the index file (containing HTML and inlined CSS and JS) is placed into the `public/widget/` directory.

The widget is powered by Inferno rather than React to reduce the file size. If you'd prefer to use React, simply swap references to Inferno out for React.

## Project Structure

This repository contains two separate pieces:

* `/` contains the site code which powers the majority of the site at `wp-install.surge.sh`. This is a create-react-app app.
* `/widget/` contains the actual widget source code. This is a minimal Inferno app.

## Building

```
cd widget
npm install
npm run build

cd ..
npm install
npm run build
```

## License

Licensed under the [GPL version 2+](LICENSE.md). Copyright 2017 Ryan McCue and contributors.

Incorporates [Dashicons](https://github.com/WordPress/dashicons), used under the GPL license.
