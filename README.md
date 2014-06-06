# jsLoader.js

A javascript lazy loader I putzed around with for a quick way to add js to a page.

Installation
------------

To use this you can download a copy of either the `jsLoader.js` or `jsLoader.min.js` files and reference it
in a script tag on a webpage. 

Usage
-----
The current build of jsLoader parses data from pseudo script tags making use of any markup with specific data attributes. It requires the tag to have the attributes `data-type="jsLoader"` and `data-src`. 

`data-src` is where you list out your javascript files to be added in.

Currently this build of jsLoader requires you to initialize it via JS using the `jsLoader.tag()` method.

Multiple jsLoader tags can be used on a page, the `jsLoader.tag()` method will iterate over all of them.

Example tag (note: can be any tag, not just a meta tag):
```html
<meta data-type="jsLoader" data-src="foo.js,bar.js,foobar.js">
```

Options
-------
To utilize any of the following options, include a `data-options` attribute on your jsLoader tag. Future plans are to support an object being passed to a js function.

`directory` [String] : Allows you to declare a directory to be prepended for each javascript file url being added.

`param` [String] : (Unimplemented) Allows you to append additional url parameters to the javascript being added to the page. This would also require something to make use of these parameters since javascript doesn't.

`position` [String] : (Unimplemented) Allows you to declare where the script tags will be placed in the HTML document. Planned values are `header` and `footer`. 

`allowNoExt` [Boolean] : Allows you to omit the .js extension when listing out files in the `data-src` attribute.

`allowUrl` [Boolean] : (Unimplemented) Allows you to include javascript files via url with either http(s) or relative protocol.


