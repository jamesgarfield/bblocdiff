// ==UserScript==
// @name       bblocdiff
// @namespace  http://really-serious.biz
// @version    1.0
// @description  Gives you a net lines of code change for bitbucket PRs
// @match      https://bitbucket.org/*
// @match      http://bitbucket.org/*
// @copyright  2015+, James Garfield
// ==/UserScript==

setTimeout(_bbnetloc_main, 3000)

function _bbnetloc_main() {
    
    var added = sumInnerText(document.querySelectorAll(".lines-added"));
    var removed = sumInnerText(document.querySelectorAll(".lines-removed"));
    
    var header = document.querySelectorAll("#commit-files-summary")[0];
    
    if (!header) {
        return;
    }
    
    var netSpan = (added+removed > 0) ? '<span class="lines-added">' : '<span class="lines-removed">'
    
    header.innerHTML = '<li class="iterable-item file file-modified"> \
        <div class="commit-file-diff-stats"> \
          <span class="lines-added">+' +
            added + 
          '</span> \
          <span class="lines-removed">' +
              removed +
          '</span>' +
          '</div>' +
              '<a class="execute" href="#">' + (added+removed) + '</a>' +
      '</li>' + header.innerHTML;
    
    function sumInnerText(nodeList) {
        values = Array.prototype.map.call(nodeList, function(n) { return parseInt(n.innerText, 10); })
        return values.reduce(function(a,b) { return a+b; }, 0);
    }
}



