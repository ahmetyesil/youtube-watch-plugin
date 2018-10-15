/**
 * Chrome Extensions don't have access to events when not being in the page scope.
 * So we inject the main functions into the page.
 *
 * @author    Jacob Groß
 * @date    2016-03-01
 */
;(function inject(document) {
    'use strict'

    let s = document.createElement('script')
    s.src = chrome.extension.getURL('main.js')
    // s.async = true // it's async by default
    s.onload = function onload() {
        this.parentNode.removeChild(this);
        s = null // GC
    }
    let d = document.createElement('div');
    d.onload = function onload() {
        this.parentNode.removeChild(this);
        d = null // GC
    }


    //
    // var request = new XMLHttpRequest();
    // request.onreadystatechange = function()
    // {
    //     if (request.readyState == 4 && request.status == 200)
    //     {
    //         alert('request.responseText'+request.responseText);
    //         document.body.appendChild(request.responseText);
    //     }
    // };
    // request.open('GET', chrome.extension.getURL('index.html'));
    // request.send();
    // document.documentElement.appendChild(s)



})(window.document)
