# Please Don't Go 💔

Please Don't Go is a JavaScript plugin used for changing the title and the favicon of the website when a visitor navigates to another tab in the window.

## Installation
Please Don't Go is available on Bower and GitHub.

### Bower
```
bower install pleaseDontGo
```

```html
<script type="text/javascript" src="path/to/bower_components/pleaseDontGo/dist/pleaseDontGo.min.js"></script>
```

### GitHub
Download the script or the minified version in the ````dist```` folder.

```html
<script type="text/javascript" src="path/to/pleaseDontGo.min.js"></script>
```

## Usage
The plugin, which does not depend on jQuery, will look for the link element with ````rel="icon"````. 

```html
<link rel="icon" type="image/x-icon" href="path/to/favicon.ico">
```

```html
<script type="text/javascript">
  pleaseDontGo.init({
    newTitle: 'Please Don\'t Go',
    newFavicon: '/assets/images/favicon-dontgo.ico',
    timeout: 2000
  });
</script>
```

The plugin also allows you to set the new title, the path to the new favicon, and the timeout delay for switching them around.

## Changelog
**1.0**
* Initial release

## Issues
Please submit any issues [here](https://github.com/thomasvaeth/pleaseDontGo/issues).

## License
Please Don't Go is licensed under the MIT License.
