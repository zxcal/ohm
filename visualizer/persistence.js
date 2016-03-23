/* global document, window, grammarEditor, semantics, XMLHttpRequest */
'use strict';

(function setup() {
  function getFromURL(url, cb) {
    var httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange = function() {
      if (httpObj.readyState === 4 && httpObj.status === 200) {
        cb(httpObj.responseText);
      }
    };
    httpObj.open('GET', url, true);
    httpObj.send();
  }

  function postToURL(url, data, cb) {
    var httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange = function() {
      if (httpObj.readyState === 4 && httpObj.status === 200) {
        cb(httpObj.responseText);
      }
    };
    httpObj.open('POST', url, true);
    httpObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpObj.send(data);
  }

  function getStringifiedActionsFor(type) {
    // type: operations || attributes
    var ops = document.querySelectorAll('#' + type + ' .action[readonly]');
    ops = [].slice.call(ops).map(function(elem) { return elem.value; });

    var strObj = {};
    ops.forEach(function(op) {
      var actions = semantics.get(op).actionDict;
      strObj[op] = {};
      Object.getOwnPropertyNames(actions).filter(function(action) {
        // exclude visualizer's helper actions
        return (action !== '_default') && (action !== '_nonterminal');
      }).forEach(function(action) {
        strObj[op][action] = actions[action].toString();
      });
    });
    return strObj;
  }

  function getSemantics() {
    var ops = getStringifiedActionsFor('operations');
    var atts = getStringifiedActionsFor('attributes');
    return JSON.stringify({operations: ops, attributes: atts});
  }

  function setSemantics(src) {
    console.log('Installing semantics:', src); // eslint-disable-line no-console
  }

  document.querySelector('#grammars').style.setProperty('display', 'block');

  var loadedGrammar = 'ohm';
  var grammarName = document.querySelector('#grammarName');

  var loadButton = document.querySelector('#loadGrammar');
  loadButton.addEventListener('click', function(e) {
    var grammar = window.prompt('Grammar to load:', loadedGrammar); // eslint-disable-line no-alert
    if (grammar === null) {
      return;
    }

    getFromURL('../grammars/' + grammar, function(src) {
      loadedGrammar = grammar;
      grammarName.textContent = grammar;
      grammarName.classList.remove('unnamed');

      grammarEditor.setValue(src);
      getFromURL('../semantics/' + grammar, function(src) {
        setSemantics(src);
      });
    });
  });

  var saveButton = document.querySelector('#saveGrammar');
  saveButton.addEventListener('click', function(e) {
    var grammar = window.prompt('Save grammar as:', loadedGrammar); // eslint-disable-line no-alert
    if (grammar === null) {
      return;
    }

    postToURL('../grammars/' + grammar, grammarEditor.getValue(), function(response) {
      loadedGrammar = grammar;
      grammarName.textContent = grammar;
      grammarName.classList.remove('unnamed');

      postToURL('../semantics/' + grammar, getSemantics(), function(response) {
        // console.log(response);
      });
    });
  });
})();
