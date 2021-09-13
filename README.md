# Does XD plugin environment supports your stylesheet?
## JS script to check that

Latest script run is on 9/10/2021.

This script intends to check whether your existing stylesheet has any chances with Adobe XD and the supported stylesheets by their plugin.
Run steps:
* clone that repo and run an IIS server (or any server of your choice) in the cloned folder;
* fill `style.css` with your exising stylesheet;
* make sure that your server runs on port 80 (or change the URIs in `index.js:93`);
* open `index.html` in your browser

The file `adobe-plugin-ref.html` is a simplified version of https://adobexdplatform.com/plugin-docs/reference/uxp/namespace/css.html.
