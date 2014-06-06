/* ==========================================================================
 jsLoader - a nifty javascript lazy loader
 author: Michael Springer <mike@sprngr.me>
 version: 0.4
 license: MIT License
 ========================================================================== */

//Set some helper vars and functions
var head = document.getElementsByTagName("head")[0];

//Borrowed polyfill from Mozilla
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (searchString, position) {
        "use strict";
        position = position || this.length;
        position = position - searchString.length;
        return this.lastIndexOf(searchString) === position;
    }
}

//Trims whitespace
if (typeof String.prototype.trim !== 'function') { // detect native implementation
    String.prototype.trim = function () {
        "use strict";
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}


//The fun stuff
jsLoader = {

    //Debug doesn't create any script tags
    debug: function () {
        "use strict";
        console.log("::: jsLoader Debug :::");

        var jsTag = document.querySelectorAll('[data-type="jsLoader"]');
        console.log("Valid jsLoader tags found: " + jsTag.length);
        for (var i = 0; i < jsTag.length; i++) {
            console.log("::: jsLoader #" + i + " :::");

            if (jsTag[i].hasAttribute("data-src")) {
                console.log("src[" + jsTag[i].dataset.src.split(",").length + "]: " + jsTag[i].dataset.src);

                if (jsTag[i].hasAttribute("data-options")) {
                    console.log("Options set: ");
                    var options = {};
                    var optionsArray = jsTag[i].dataset.options.split(",");
                    for (var o = 0; o < optionsArray.length; o++) {
                        console.log(optionsArray[o].trim());

                        var option = optionsArray[o].split(":")[0].trim();
                        var value = optionsArray[o].split(":")[1].trim();

                        switch (option) {
                            case "directory":
                                options.directory = value;
                                break;
                            case "param":
                                options.param = value;
                                break;
                            case "position":
                                options.position = value;
                                break;
                            case "allowNoExt":
                                options.allowNoExt = !!((value === "true"));
                                break;
                            case "allowURL":
                                options.allowURL = !!((value === "true"));
                                break;
                            default:
                        }
                    }
                    console.log(options);
                }

            } else {
                console.log("No source attribute (data-src) set");
                console.log("jsTag attributes set: ");
                console.log(jsTag[i].dataset);
            }
        }
    },

    tag: function () {
        "use strict";
        var jsTag = document.querySelectorAll('[data-type="jsLoader"]');

        for (var i = 0; i < jsTag.length; i++) {

            if (jsTag[i].hasAttribute("data-src")) {

                if (jsTag[i].hasAttribute("data-options")) {
                    var options = {};
                    var optionsArray = jsTag[i].dataset.options.split(",");
                    for (var o = 0; o < optionsArray.length; o++) {

                        var option = optionsArray[o].split(":")[0].trim();
                        var value = optionsArray[o].split(":")[1].trim();

                        switch (option) {
                            case "directory":
                                options.directory = value;
                                break;
                            case "param":
                                options.param = value;
                                break;
                            case "position":
                                options.position = value;
                                break;
                            case "allowNoExt":
                                options.allowNoExt = !!((value === "true"));
                                break;
                            case "allowURL":
                                options.allowURL = !!((value === "true"));
                                break;
                            default:
                        }
                    }
                }

                var jsDir = "";
                if (options.directory !== "" && options.directory !== undefined) {
                    jsDir = (options.directory.endsWith("/")) ? options.directory + "" : options.directory + "/";
                }

                var jsList = jsTag[i].dataset.src.split(",");

                for (var k = 0; k < jsList.length; k++) {
                    if (jsList[k] !== undefined) {
                        if (jsList[k] && options.allowURL) {
                            //Doesn't do anything at the moment, I forgot to finish it out :/
                        } else {
                            if (jsList[k].endsWith(".js") && options.allowNoExt) {
                                jsList[k] = jsList[k].substring(0, jsList[k].length - 3);
                            }
                        }

                        var jsResult = (options.allowNoExt) ? jsDir + jsList[k].trim() + ".js" : jsDir + jsList[k].trim() + "";
                        var s = document.createElement("script");
                        s.src = jsResult;
                        head.appendChild(s);
                    }
                }
            }
            head.removeChild(jsTag[i]);
        }
    },

    load: function () {
        //TODO this thing
    }
};