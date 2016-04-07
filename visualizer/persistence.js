/* eslint-env browser */
/* global ohmEditor, grammarEditor, semantics */
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
        // FIXME: necessary when saving loaded functions again
        strObj[op][action] = actions[action].toString().replace('function (', 'function(');
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
    // FIXME: A worker would be safer here!
    var semOps = (function() {
      var module = {};
      eval(src); // eslint-disable-line no-eval
      return module.exports;
    })();

    if (semOps.operations) {
      Object.getOwnPropertyNames(semOps.operations).forEach(function(opName) {
        ohmEditor.addSemanticAction(opName, semOps.operations[opName], 'Operation');
      });
    }
    if (semOps.attributes) {
      Object.getOwnPropertyNames(semOps.attributes).forEach(function(opName) {
        ohmEditor.addSemanticAction(opName, semOps.attributes[opName], 'Attribute');
      });
    }

    // unselect operation/attribute
    var state = ohmEditor.getState();
    if (state && state.actionNode) {
      state.actionNode.click();
    }

    // refreshBottomSection is done automatically!
  }

  document.querySelector('#grammars').style.setProperty('display', 'block');

  var loadedGrammar = 'unnamed grammar';
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
        setTimeout(function() {
          setSemantics(src);
        }, 500); // FIXME: remove this timeout (must be > 250ms of triggerRefresh)
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

  window.onload = function() {
    function cancel(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }

    function isGrammarFile(file) {
      var fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
      return file.type.match(/text\/ohm-js/) || fileExtension === 'ohm';
    }

    function isSemanticsFile(file) {
      return file.type.match(/text\/javascript/);
    }

    function loadGrammar(file) {
      var fileName = file.name.substring(0, file.name.lastIndexOf('.') || undefined);
      var reader = new FileReader();
      reader.onload = function(e) {
        loadedGrammar = fileName;
        grammarName.textContent = fileName;
        grammarName.classList.remove('unnamed');
        grammarEditor.setValue(reader.result);
      };
      reader.readAsText(file);
    }

    function loadSemantics(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        setSemantics(reader.result);
      };
      reader.readAsText(file);
    }

    // disable CodeMirrors DnD
    grammarEditor.setOption('dragDrop', false);

    var grammarEditorWrapper = grammarEditor.display.wrapper.parentNode;
    grammarEditorWrapper.addEventListener('dragover', cancel);
    grammarEditorWrapper.addEventListener('dragenter', cancel);
    grammarEditorWrapper.addEventListener('drop', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      var grammarFile;
      var semanticsFile;

      var files = e.dataTransfer.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (isGrammarFile(file)) {
          if (!grammarFile) {
            grammarFile = file;
          } else {
            // console.log('Can only load one grammar file... skipping ' + file.name);
          }
        } else if (isSemanticsFile(file)) {
          if (!semanticsFile) {
            semanticsFile = file;
          } else {
            // console.log('Can only load one semantics file... skipping ' + file.name);
          }
        }
      }

      if (grammarFile) {
        loadGrammar(grammarFile);
        if (semanticsFile) {
          setTimeout(function() {
            loadSemantics(semanticsFile);
          }, 500); // FIXME: remove this timeout (must be > 250ms of triggerRefresh)
        }
      } else if (semanticsFile) {
        loadSemantics(semanticsFile);
      }

      return false;
    });
  };

  function prepareGrammarDownload(e) {
    if (!e.dataTransfer) {
      return;
    }

    var rawData = grammarEditor.getValue();

    var mimeType = 'text/ohm-js';
    var filename = loadedGrammar + '.ohm';
    var url = 'data:application/stream;base64,' + btoa(rawData);

    var data = [mimeType, filename, url].join(':');
    e.dataTransfer.setData('DownloadURL', data);
  }

  function prepareSemanticsDownload(e) {
    if (!e.dataTransfer) {
      return;
    }

    var rawData = getSemantics();

    var mimeType = 'text/javascript';
    var filename = loadedGrammar + '.ohmjs';
    var url = 'data:application/stream;base64,' + btoa(rawData);

    var data = [mimeType, filename, url].join(':');
    e.dataTransfer.setData('DownloadURL', data);
  }

  document.querySelector('#downloadGrammar').
    addEventListener('dragstart', prepareGrammarDownload);
  document.querySelector('#downloadSemantics').
    addEventListener('dragstart', prepareSemanticsDownload);
})();
