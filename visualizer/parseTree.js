/* eslint-env browser */
/* global CodeMirror, grammar, semantics, funcBodyGrammar */

'use strict';

// Wrap the module in a universal module definition (UMD), allowing us to
// either include it as a <script> or to `require` it as a CommonJS module.
(function(root, name, initModule) {
  if (typeof exports === 'object') {
    module.exports = initModule;
  } else {
    root[name] = initModule(root.ohm, root.document, root.cmUtil, root.d3);
  }
})(this, 'refreshParseTree', function(ohm, document, cmUtil, d3) {
  var ArrayProto = Array.prototype;
  function $(sel) { return document.querySelector(sel); }
  var UnicodeChars = {
    HORIZONTAL_ELLIPSIS: '\u2026',
    WHITE_BULLET: '\u25E6',
    ANTICLOCKWISE_OPEN_CIRCLE_ARROW: '\u21BA',
    TELEPHONE_RECORDER: '\u2315'
  };

  var state, ui, rootTrace;

  var resultMap, todo, passThrough;
  function initActionLog() {
    resultMap = undefined;
    todo = undefined;
    passThrough = undefined;
  }

  function Fail() { }
  Fail.prototype.toString = function() {
    return undefined;
  };
  var failure = new Fail();

  function ErrorWrapper(expression, e) {
    this.expression = expression;
    this.error = e;
  }
  ErrorWrapper.prototype.toString = function() {
    return this.error.message;
  };

  function toKey(cstNode, optActionName) {
    return cstNode.ctorName + '_from_' +
      cstNode.interval.startIdx + '_to_' +
      cstNode.interval.endIdx + '_at_' +
      (optActionName || state.actionNode.value);
  }

  function failed(cstNode) { // eslint-disable-line no-unused-vars
    var actionNames = semantics.getAllActionNames();
    var hasFailureAtCSTNode = actionNames.some(function(actionName) {
      return resultMap[toKey(cstNode, name)] === failure;
    });
    return hasFailureAtCSTNode;
  }

  function noResultForChildrenOf(cstNode) {
    var hasNoResult = cstNode.children.every(function(child) {
      return !resultMap.hasOwnProperty(toKey(child, state.actionNode.value));
    });
    return hasNoResult;
  }

  var refreshTimeout;
  function triggerRefresh(delay) {
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
    }
    refreshTimeout = setTimeout(refreshBottomSection, delay || 0);
  }
  function refreshBottomSection() {
    refreshParseTree(ui, grammar, rootTrace, false, state); // eslint-disable-line no-undef
  }

  // DOM Helpers
  // -----------

  function createElement(sel, optContent) {
    var parts = sel.split('.');
    var tagName = parts[0];
    if (tagName.length === 0) {
      tagName = 'div';
    }

    var el = document.createElement(tagName);
    el.className = parts.slice(1).join(' ');
    if (optContent) {
      el.textContent = optContent;
    }
    return el;
  }

  // D3 Helpers
  // ----------

  function currentHeightPx(optEl) {
    return (optEl || this).offsetHeight + 'px';
  }

  function tweenWithCallback(endValue, cb) {
    return function tween(d, i, a) {
      var interp = d3.interpolate(a, endValue);
      return function(t) {
        var stepValue = interp.apply(this, arguments);
        cb(stepValue);
        return stepValue;
      };
    };
  }

  // Parse tree helpers
  // ------------------

  function toggleClasses(el, map) {
    for (var k in map) {
      if (map.hasOwnProperty(k)) {
        el.classList.toggle(k, map[k]);
      }
    }
  }

  function measureSize(wrapperEl, selector) {
    if (!wrapperEl.querySelector('.' + selector)) {
      return {
        width: 0,
        height: 0
      };
    }

    var tempWrapper = $('#measuringDiv .pexpr');
    var selectorClone = wrapperEl.querySelector('.' + selector).cloneNode(true);
    var clone = tempWrapper.appendChild(selectorClone);
    var result = {
      width: clone.offsetWidth,
      height: clone.offsetHeight
    };
    tempWrapper.innerHTML = '';
    return result;
  }

  function measureContent(wrapperEl) {
    var labelMeasurement = measureLabel(wrapperEl);

    var semanticEditorMeasurement = measureSize(wrapperEl, 'exampleActionContainer');
    var result = {
      width: Math.max(semanticEditorMeasurement.width, labelMeasurement.width),
      height: semanticEditorMeasurement.height
    };
    return result;
  }

  function measureLabel(wrapperEl) {
    return measureSize(wrapperEl, 'label');
  }

  function measureChildren(wrapperEl) {
    var measuringDiv = $('#measuringDiv');
    var clone = measuringDiv.appendChild(wrapperEl.cloneNode(true));
    clone.style.width = '';
    var children = clone.lastChild;
    children.hidden = !children.hidden;
    var result = {
      width: children.offsetWidth,
      height: children.offsetHeight
    };
    measuringDiv.removeChild(clone);
    return result;
  }

  function measureInput(inputEl) {
    var measuringDiv = $('#measuringDiv');
    var span = measuringDiv.appendChild(createElement('span.input', inputEl.textContent));
    var result = {
      width: span.offsetWidth,
      height: span.offsetHeight
    };
    measuringDiv.removeChild(span);
    return result;
  }

  function initializeWidths() {
    var els = getWidthDependentElements($('.pexpr'));

    // First, ensure that each pexpr node must be as least as wide as the width
    // of its associated input text.
    for (var i = 0; i < els.length; ++i) {
      var el = els[i];
      if (!el._input) {
        el.style.minWidth = '0';
      } else {
        el.style.minWidth = measureInput(el._input).width + 'px';
      }
    }

    // Then, set the initial widths of all the input elements.
    updateInputWidths(els);
  }

  // Returns an array of elements whose width could depend on `el`, including
  // the element itself.
  function getWidthDependentElements(el) {
    var els = [el];
    // Add all ancestor pexpr nodes.
    var node = el;
    while ((node = node.parentNode) !== document) {
      if (node.classList.contains('pexpr')) {
        els.push(node);
      }
    }
    // And add all descendent pexpr nodes.
    return els.concat(ArrayProto.slice.call(el.querySelectorAll('.pexpr')));
  }

  // For each pexpr div in `els`, updates the width of its associated input
  // span based on the current width of the pexpr. This ensures the input text
  // for each pexpr node appears directly above it in the visualization.
  function updateInputWidths(els) {
    for (var i = 0; i < els.length; ++i) {
      var el = els[i];
      if (!el._input) {
        continue;
      }
      el._input.style.minWidth = el.offsetWidth + 'px';
      if (!el.style.minWidth) {
        el.style.minWidth = measureInput(el._input).width + 'px';
      }
    }
  }

  function updateDependentElements(el, newWidth) {
    var widthDeps = getWidthDependentElements(el);
    d3.select(el)
        .transition()
        .duration(500)
        .styleTween('width', tweenWithCallback(newWidth + 'px', function(v) {
          updateInputWidths(widthDeps);
        }))
        .each('end', function() {
          // Remove the width and allow the flexboxes to adjust to the correct
          // size. If there is a glitch when this happens, we haven't calculated
          // `newWidth` correctly.
          this.style.width = '';
        });
  }

  function toggleSemanticEditor(el) {
    // if there is no semantic editor associated with the `el`
    if (el.children.length <= 2) {
      return;
    }

    var editor = el.children[1];
    if (editor.classList.contains('hidden')) {
      editor.classList.remove('hidden');
      editor.children[1].hidden = false;

      // Refresh CodeMirror
      var semanticEditor = editor.children[0].lastChild.firstChild.CodeMirror;
      if (semanticEditor.getValue() && semanticEditor.getValue() !== '') {
        semanticEditor.refresh();
      }
      semanticEditor.focus();
    } else {
      editor.classList.add('hidden');

      // Hide result
      if (editor.children[1].classList.contains('hidden')) {
        editor.children[1].hidden = true;
      }
    }

    // The pexpr can't be smaller than the input text.
    var newWidth = Math.max(el.offsetWidth, measureInput(el._input).width);
    updateDependentElements(el, newWidth);
  }

  // Hides or shows the children of `el`, which is a div.pexpr.
  function toggleTraceElement(el) {
    var children = el.lastChild;
    var showing = children.hidden;
    el.classList.toggle('collapsed', !showing && children.childNodes.length > 0);

    var childrenSize = measureChildren(el);
    var newMeasurement = measureContent(el);
    var newWidth = newMeasurement.width;
    if (showing) {
      newWidth = Math.max(childrenSize.width, newWidth);
    }

    // The pexpr can't be smaller than the input text.
    newWidth = Math.max(newWidth, measureInput(el._input).width);
    updateDependentElements(el, newWidth);

    var height = showing ? childrenSize.height : 0;
    d3.select(el.lastChild).style('height', currentHeightPx)
        .transition()
        .duration(500)
        .style('height', height + 'px')
        .each('start', function() { if (showing) { this.hidden = false; } })
        .each('end', function() {
          if (!showing) {
            this.hidden = true;
          }
          this.style.height = '';
        });
  }

  // A blackhole node is hidden and makes all its descendents hidden too.
  function isBlackhole(traceNode) {
    if (traceNode.replacedBy) {
      return true;
    }

    var desc = traceNode.displayString;
    if (desc) {
      return desc === 'space' || desc === 'empty';
    }
    return false;
  }

  function shouldNodeBeLabeled(traceNode) {
    if (isBlackhole(traceNode)) {
      return false;
    }

    var expr = traceNode.expr;

    // Don't label Seq and Alt nodes.
    if (expr instanceof ohm.pexprs.Seq || expr instanceof ohm.pexprs.Alt) {
      return false;
    }

    // Don't label failed inline rule applications.
    if (expr instanceof ohm.pexprs.Apply) {
      return traceNode.succeeded;
    }

    // Hide labels for nodes that don't correspond to something the user wrote.
    if (!expr.interval) {
      return false;
    }
    return true;
  }

  function isPrimitive(expr) {
    return expr instanceof ohm.pexprs.Prim ||
           expr instanceof ohm.pexprs.Range ||
           expr instanceof ohm.pexprs.UnicodeChar;
  }

  function getArgExpr(traceNode) {
    var expr = grammar.ruleBodies[traceNode.expr.ruleName];
    if (expr instanceof ohm.pexprs.Alt) {
      var altChildren = traceNode.children;

      // Get the real children of alternative rule
      if (altChildren.length !== 1 && altChildren[0].displayString === 'spaces') {
        altChildren = altChildren.filter(function(child) {
          return !isBlackhole(child) && child.displayString !== 'spaces';
        })[0].children;
      }

      expr = altChildren.filter(function(child) {
        return child.succeeded;
      })[0].expr;
    } else if (!expr) {
      expr = traceNode.expr;
    }
    return expr;
  }

  function getArgDisplay(expr) {
    var ans = [];
    if (expr instanceof ohm.pexprs.Seq) {
      expr.factors.forEach(function(factor) {
        ans.push(factor.toDisplayString());
      });
    } else {
      ans.push(expr.toDisplayString());
    }
    return ans;
  }

  function getArgString(expr) {
    var ans = [];
    if (expr instanceof ohm.pexprs.Seq) {
      ans = expr.toArgString().split(',');
    } else {
      var arg = expr.toArgString();
      ans.push(arg.length === 0 ? '$1' : arg);
    }
    return ans;
  }

  function getSemanticArgs(header, optArgs) {
    var ans = [];
    for (var i = 1; i < header.children.length; i++) {
      ans.push(header.children[i].children[1].value || optArgs[i - 1]);
    }
    return ans;
  }

  function saveSemanticAction(traceNode, funcStr, exampleActionContainer, clearMarks) {
    var func;
    var wrapper;
    var funcObj = Object.create(null);
    var actionName = state.actionNode.value;
    var ruleName = traceNode.expr.ruleName;
    if (funcStr.trim().length !== 0) {
      funcObj.args = getSemanticArgs(exampleActionContainer.firstChild.firstChild,
        getArgString(getArgExpr(traceNode)));
      funcObj.body = funcStr;
      var argStr = '(' + funcObj.args.join(', ') + ')';
      var bodyMatchResult = funcBodyGrammar.match(funcStr, 'BodyExpression');
      if (bodyMatchResult.succeeded()) {
        funcStr = 'return ' + funcStr + ';';
      }

      wrapper = function(/* arguments */) {
        var ans;
        var key = toKey(this, actionName);
        try {
          ans = func.apply(this, arguments);
          var aChildFailed = this.children.some(function(child) {
            return failed(child);
            // return resultMap[toKey(child, actionName)] === failure;
          });
          if (aChildFailed) {
            ans = failure;
          }
        } catch (error) {
          if (todo) {
            ans = failure;
          } else {
            if (error instanceof Error) {
              ans = new ErrorWrapper(key, error);
            } else {
              ans = error;
            }
            throw ans;
          }
        } finally {
          resultMap[key] = ans;
        }
        return ans;
      };
      funcStr = 'function' + argStr + ' {\n' + funcStr + '\n}';
      func = eval('(' + funcStr + ')'); // eslint-disable-line no-eval
      wrapper.toString = function() {
        return funcStr;
      };
      console.log(funcStr);  // eslint-disable-line no-console
    }

    semantics.get(actionName).actionDict[ruleName] = wrapper;

    if (!func) {
      funcObj = Object.create(null);
    }
    state.funcObjMap[ruleName] = funcObj;
  }

  function loadHeader(traceNode, header, optArgStr) {
    var rule = header.appendChild(createElement('.block'));
    rule.appendChild(createElement('span.name', traceNode.displayString + ' ='));

    var expr = getArgExpr(traceNode);
    var displayStrs = getArgDisplay(expr);
    var defaultArgStrs = getArgString(expr);
    displayStrs.forEach(function(display, idx) {
      var arg = header.appendChild(createElement('.block'));
      var nameTag = arg.appendChild(createElement('span.name', display));
      var nameEditor = arg.appendChild(createElement('textarea.represent'));
      if (!optArgStr || optArgStr[idx] === defaultArgStrs[idx]) {
        nameEditor.hidden = true;
        if (defaultArgStrs[idx] !== display) {
          nameEditor.value = defaultArgStrs[idx];
        }
      } else {
        nameEditor.value = optArgStr[idx];
      }

      nameEditor.autofocus = true;
      nameEditor.cols = Math.max(nameEditor.value.length, 1);
      nameEditor.addEventListener('keyup', function() {
        nameEditor.cols = Math.max(nameEditor.value.length, 1);
      });
      nameTag.addEventListener('click', function(e) {
        nameEditor.hidden = !nameEditor.hidden;
        if (!nameEditor.hidden && nameEditor.value.length === 0) {
          nameEditor.focus();
        }
      });
    });
  }

  function retrieveFunc(ruleName) {
    if (state.funcObjMap[ruleName]) {
      return state.funcObjMap[ruleName];
    }

    var funcObj = Object.create(null);
    var actionFn = semantics.get(state.actionNode.value)
      .actionDict[ruleName];
    if (actionFn) {
      var actionFnStr = actionFn.toString();
      funcObj.args = [];
      actionFnStr.substring(actionFnStr.indexOf('(') + 1, actionFnStr.indexOf(')'))
        .split(',').forEach(function(arg) {
          funcObj.args.push(arg.trim());
        });

      var startIdx = actionFnStr.indexOf('\n') + 1;
      var endIdx = actionFnStr.lastIndexOf('\n');
      funcObj.body = actionFnStr.substring(startIdx, endIdx);
      if (funcObj.body.indexOf('return ') === 0) {
        // remove `return` and trailing `;`
        funcObj.body = funcObj.body.substring(7, funcObj.body.length - 1);
      }
    }
    return funcObj;
  }

  function appendSemanticEditor(ui, grammar, rootTrace, wrapper, traceNode, clearMarks,
    showFailures, optState) {

    var ruleName = traceNode.expr.ruleName;
    var key = toKey(traceNode.cstNode);

    var exampleActionContainer = wrapper.appendChild(createElement('.exampleActionContainer'));
    var editorWrap = exampleActionContainer.appendChild(createElement('.editor'));

    // Editor header
    var header = editorWrap.appendChild(createElement('.editorHeader'));

    // Editor body
    var body = editorWrap.appendChild(createElement('.editorBody'));
    var semanticEditor = CodeMirror(body);
    function handleSavingEvent(editor) {
      clearMarks();
      try {
        if (!optState) {
          optState = Object.create(null);
        }
        optState.lastEdited = key;
        saveSemanticAction(traceNode, editor.getValue(), exampleActionContainer, clearMarks);
        refreshParseTree(ui, grammar, rootTrace, showFailures, optState);
        clearMarks();
      } catch (error) {
        if (optState) {
          optState.funcObjMap[ruleName] = undefined;
        }
        editorWrap.nextElementSibling.className = 'semanticResult error';
        editorWrap.nextElementSibling.textContent = error.message;
      }
    }

    semanticEditor.setOption('extraKeys', {
      'Cmd-S': function(cm) {
        handleSavingEvent(cm);
      }
    });

    var funcObj = retrieveFunc(ruleName);
    semanticEditor.setValue(funcObj.body || '');
    loadHeader(traceNode, header, funcObj.args);

    // Add semantic action result
    var res = resultMap[key];
    var resultContainer = exampleActionContainer.appendChild(createElement('.semanticResult'));
    var saveButton = exampleActionContainer.appendChild(createElement('button.saveAction', 'save'));
    saveButton.addEventListener('click', function(e) {
      handleSavingEvent(semanticEditor);
    });

    if (res instanceof ErrorWrapper) {
      resultContainer.classList.add('error');
      resultContainer.textContent = res;
      if (res.expression === key) {
        wrapper.children[0].classList.add('mark');
      }
    } else if (res === failure) {
      resultContainer.classList.add('error');
      if (todo.includes(key) || noResultForChildrenOf(traceNode.cstNode)) {
        wrapper.children[0].classList.add('mark');
      }
    } else {
      if (optState && optState.lastEdited === key) {
        optState.lastEdited = undefined;
      }
      if (!res && optState && optState.reservedResultMap &&
        optState.reservedResultMap.hasOwnProperty(key) &&
        (funcObj.body || traceNode.cstNode.isIteration())) {
        resultContainer.innerHTML = optState.reservedResultMap[key];
        resultContainer.classList.add('reservedResult');
      } else {
        if (traceNode.cstNode.isIteration()) {
          if (traceNode.cstNode.children.length > 0 &&
            resultMap.hasOwnProperty(toKey(traceNode.cstNode.children[0]))) {
            res = [];
            traceNode.cstNode.children.forEach(function(child) {
              res.push(resultMap[toKey(child)]);
            });
            resultMap[key] = res;
          }
        }
        resultContainer.innerHTML = JSON.stringify(res);
      }
    }

    // The result comes from `_nonterminal`
    if (passThrough && passThrough.includes(key)) {
      wrapper.children[0].classList.add('passThrough');
    }

    // Hide result if it's an error, or it gets from `_nonterminal`,
    // evaluating process haven't get to it
    if (resultContainer.classList.contains('error') ||
      wrapper.children[0].classList.contains('passThrough') ||
      (!resultMap.hasOwnProperty(key) && !resultContainer.classList.contains('reservedResult'))) {
      resultContainer.classList.add('hidden');
      resultContainer.hidden = true;
    }

    if (optState && optState.lastEdited !== key ||
      !wrapper.children[0].classList.contains('mark')) {
      exampleActionContainer.classList.add('hidden');
    } else if (resultContainer.hidden) {
      resultContainer.hidden = false;
    }
  }

  function initSemantics(actionType, actionName) {
    semantics['add' + actionType](actionName, {
      _nonterminal: function(children) {
        var ans;
        var key = toKey(this, actionName);
        try {
          if (children.length === 1) {
            if (!passThrough) {
              passThrough = [];
            }
            passThrough.push(key);

            ans = (actionType === 'Attribute' ?
              children[0][actionName] :
              children[0][actionName]());
          } else {
            if (!todo) {
              todo = [];
            }
            todo.push(key);
            ans = failure;
          }
        } catch (error) {
          if (todo) {
            ans = failure;
          } else {
            if (error instanceof Error) {
              ans = new ErrorWrapper(key, error);
            } else {
              ans = error;
            }
            throw ans;
          }
        } finally {
          resultMap[key] = ans;
        }
        return ans;
      }
    });
  }

  function populateResult(traceNode, actionType, actionName) {
    resultMap = {};
    try {
      semantics.get(actionName);
    } catch (error) {
      initSemantics(actionType, actionName);
    }

    try {
      var nodeWrapper = semantics._getSemantics().wrap(traceNode.cstNode);
      if (actionType === 'Operation') {
        nodeWrapper[actionName]();
      } else {
        nodeWrapper._forgetMemoizedResultFor(actionName);
        nodeWrapper[actionName]; // eslint-disable-line no-unused-expressions
      }
    } catch (error) {
      // console.log(error);
    }
  }

  function couldZoom(currentRootTrace, traceNode) {
    return currentRootTrace !== traceNode &&
      traceNode.expr.ruleName !== 'spaces' &&
      !isPrimitive(traceNode.expr);
  }

  function zoomIn(ui, grammar, rootTrace, showFailures, traceNode, optState) {
    var zoomNode = $('#zoom');
    zoomNode.textContent = UnicodeChars.ANTICLOCKWISE_OPEN_CIRCLE_ARROW;
    zoomNode._trace = traceNode;
    zoomNode.hidden = false;

    zoomNode.addEventListener('click', function(e) {
      zoomNode.hidden = true;
      zoomNode._trace = undefined;
      if (optState) {
        optState.zoomState = undefined;
      } else {
        optState = Object.create(null);
      }
      refreshParseTree(ui, grammar, rootTrace, showFailures, state);
      e.stopPropagation();
      e.preventDefault();
    });
    zoomNode.addEventListener('mouseover', function(e) {
      var zoomState = {zoomTrace: zoomNode._trace, previewOnly: true};
      if (optState) {
        optState.zoomState = zoomState;
      } else {
        optState = {zoomState: zoomState};
      }
      if (!optState.reservedResultMap) {
        optState.reservedResultMap = {};
      }
      Object.keys(resultMap).forEach(function(key) {
        optState.reservedResultMap[key] = resultMap[key];
      });
      refreshParseTree(ui, grammar, rootTrace, showFailures, optState);
      e.stopPropagation();
      e.preventDefault();
    });
    zoomNode.addEventListener('mouseout', function(e) {
      var zoomState = zoomNode._trace && {zoomTrace: zoomNode._trace};
      if (optState) {
        optState.zoomState = zoomState;
      } else {
        optState = {zoomState: zoomState};
      }

      refreshParseTree(ui, grammar, rootTrace, showFailures, state);
      e.stopPropagation();
      e.preventDefault();
    });

    if (optState) {
      optState.zoomState = {zoomTrace: traceNode};
    } else {
      optState = {zoomState: {zoomTrace: traceNode}};
    }
    refreshParseTree(ui, grammar, rootTrace, showFailures, optState);
  }

  function createTraceElement(ui, grammar, rootTrace, traceNode, parent, input,
    showFailures, optState) {
    var pexpr = traceNode.expr;
    var ruleName = pexpr.ruleName;
    if (optState && optState.actionNode && optState.actionNode.readOnly && !resultMap) {
      populateResult(traceNode, optState.actionNode._type, optState.actionNode.value);
    }

    var wrapper = parent.appendChild(createElement('.pexpr'));
    wrapper.classList.add(pexpr.constructor.name.toLowerCase());
    wrapper.classList.toggle('failed', !traceNode.succeeded);

    if (optState && optState.zoomState &&
      optState.zoomState.zoomTrace === traceNode && optState.zoomState.previewOnly) {
      if (input) {
        input.classList.add('highlight');
      }
      wrapper.classList.add('zoomBorder');
    }

    var inputMark, grammarMark, defMark;
    wrapper.addEventListener('mouseover', function(e) {

      if (input) {
        input.classList.add('highlight');
      }
      if (traceNode.interval) {
        inputMark = cmUtil.markInterval(ui.inputEditor, traceNode.interval, 'highlight', false);
        ui.inputEditor.getWrapperElement().classList.add('highlighting');
      }
      if (pexpr.interval) {
        grammarMark = cmUtil.markInterval(ui.grammarEditor, pexpr.interval, 'active-appl', false);
        ui.grammarEditor.getWrapperElement().classList.add('highlighting');
        cmUtil.scrollToInterval(ui.grammarEditor, pexpr.interval);
      }
      var ruleName = pexpr.ruleName;
      if (ruleName) {
        var defInterval = grammar.ruleBodies[ruleName].definitionInterval;
        if (defInterval) {
          defMark = cmUtil.markInterval(ui.grammarEditor, defInterval, 'active-definition', true);
          cmUtil.scrollToInterval(ui.grammarEditor, defInterval);
        }
      }
      e.stopPropagation();
    });

    function clearMarks() {
      if (input) {
        input.classList.remove('highlight');
      }
      inputMark = cmUtil.clearMark(inputMark);
      grammarMark = cmUtil.clearMark(grammarMark);
      defMark = cmUtil.clearMark(defMark);
      ui.grammarEditor.getWrapperElement().classList.remove('highlighting');
      ui.inputEditor.getWrapperElement().classList.remove('highlighting');
    }
    wrapper.addEventListener('mouseout', function(e) {
      clearMarks();
    });
    wrapper._input = input;

    var text = pexpr.ruleName === 'spaces' ? UnicodeChars.WHITE_BULLET : traceNode.displayString;
    // Truncate the label if it is too long.
    if (text.length > 20 && text.indexOf(' ') >= 0) {
      text = text.slice(0, 20) + UnicodeChars.HORIZONTAL_ELLIPSIS;
    }

    var label = wrapper.appendChild(createElement('.label', text));
    label.setAttribute('title', text);
    toggleClasses(label, {
      prim: isPrimitive(traceNode.expr),
      spaces: ruleName === 'spaces'
    });

    var zoomButton = label.appendChild(createElement('button.zoom',
      UnicodeChars.TELEPHONE_RECORDER + ' zoom'));
    zoomButton.hidden = true;
    zoomButton.addEventListener('click', function(e) {
      var currentRootTrace = optState && optState.zoomState && optState.zoomState.zoomTrace ||
        rootTrace;
      if (couldZoom(currentRootTrace, traceNode)) {
        zoomIn(ui, grammar, rootTrace, showFailures, traceNode, optState);
        clearMarks();
      }
      e.stopPropagation();
      e.preventDefault();
    });

    label.addEventListener('click', function(e) {
      if (e.altKey && !(e.shiftKey || e.metaKey)) {
        console.log(traceNode);  // eslint-disable-line no-console
      } else if (e.metaKey && !e.shiftKey &&
        optState.actionNode && optState.actionNode.readOnly) {
        toggleSemanticEditor(wrapper); // cmd + click to open or close semantic editor
        clearMarks();
      } else if (pexpr.constructor.name !== 'Prim') {
        toggleTraceElement(wrapper);
      }
      if (input) {
        input.classList.remove('highlight');
      }
      e.stopPropagation();
      e.preventDefault();
    });

    label.addEventListener('mouseover', function(e) {
      var currentRootTrace = optState && optState.zoomState && optState.zoomState.zoomTrace ||
        rootTrace;
      if (couldZoom(currentRootTrace, traceNode)) {
        zoomButton.hidden = false;
      }
    });

    label.addEventListener('mouseout', function(e) {
      zoomButton.hidden = true;
    });

    // Append semantic editor to the node
    if (optState && optState.actionNode && optState.actionNode.readOnly &&
      !(isPrimitive(traceNode.expr) || ruleName === 'spaces')) {
      appendSemanticEditor(ui, grammar, rootTrace, wrapper, traceNode, clearMarks,
        showFailures, optState);
    }
    return wrapper;
  }

  // To make it easier to navigate around the parse tree, handle mousewheel events
  // and translate vertical overscroll into horizontal movement. I.e., when scrolled all
  // the way down, further downwards scrolling instead moves to the right -- and similarly
  // with up and left.
  $('#parseResults').addEventListener('wheel', function(e) {
    var el = e.currentTarget;
    var overscroll;
    var scrollingDown = e.deltaY > 0;

    if (scrollingDown) {
      var scrollBottom = el.scrollHeight - el.clientHeight - el.scrollTop;
      overscroll = e.deltaY - scrollBottom;
      if (overscroll > 0) {
        el.scrollLeft += overscroll;
      }
    } else {
      overscroll = el.scrollTop + e.deltaY;
      if (overscroll < 0) {
        el.scrollLeft += overscroll;
      }
    }
  });

  function addActionNode(actionContainer, actionType, button) {
    if (actionContainer.children.length > 1 &&
      !actionContainer.lastChild.previousSibling.readOnly) {
      var lastActionNode = actionContainer.lastChild.previousSibling;
      if (state.actionNode) {
        state.actionNode.classList.remove('selected');
      }
      if (!lastActionNode.classList.contains('selected')) {
        lastActionNode.classList.add('selected');
      }
      state.actionNode = lastActionNode;
      state.actionNode._type = 'Operation';
      lastActionNode.select();
      return;
    }

    var newActionNode = createElement('textarea.action');
    newActionNode.placeholder = 'New ' + actionType;
    newActionNode.cols = ('New ' + actionType).length;
    newActionNode.addEventListener('keyup', function(e) {
      newActionNode.cols = Math.max(newActionNode.value.length, ('New ' + actionType).length);
    });
    newActionNode.addEventListener('keypress', function(event) {
      if (event.keyCode === 13) {
        if (newActionNode.value) {
          try {
            initSemantics(actionType, newActionNode.value);
            newActionNode.readOnly = true;
            state.actionNode = newActionNode;
            state.actionNode._type = actionType;
            state.funcObjMap = Object.create(null);
            state.lastEdited = undefined;
            triggerRefresh();
          } catch (error) {
            window.alert(error); // eslint-disable-line no-alert
            newActionNode.select();
          }
        }
        event.preventDefault();
      }
    });

    newActionNode.addEventListener('click', function(e) {
      if (state.actionNode !== newActionNode) {
        state.funcObjMap = Object.create(null);
        state.lastEdited = undefined;
      }

      if (state.actionNode) {
        state.actionNode.classList.remove('selected');
      }

      if (state.actionNode === newActionNode && newActionNode.readOnly) {
        state.actionNode = undefined;
      } else {
        state.actionNode = newActionNode;
        state.actionNode._type = actionType;
        newActionNode.classList.add('selected');
      }
      if (!newActionNode.readOnly) {
        newActionNode.select();
      }
      triggerRefresh();
    });
    if (state.actionNode) {
      state.actionNode.classList.remove('selected');
    }
    state.actionNode = newActionNode;
    state.actionNode._type = actionType;
    newActionNode.classList.add('selected');
    actionContainer.insertBefore(newActionNode, button);
    newActionNode.select();
  }

  var addOpButton = $('#addOperation');
  addOpButton.addEventListener('click', function(e) {
    addActionNode($('#operations'), 'Operation', addOpButton);
    return;

  });

  var addAtButton = $('#addAttribute');
  addAtButton.addEventListener('click', function(e) {
    addActionNode($('#attributes'), 'Attribute', addAtButton);
    return;
  });

  function refreshParseTree(currentUI, grammar, rTrace, showFailures, optState) {
    $('#expandedInput').innerHTML = '';
    $('#parseResults').innerHTML = '';

    state = optState;
    ui = currentUI;
    rootTrace = rTrace;

    var trace;
    if (optState && optState.zoomState && !optState.zoomState.previewOnly) {
      trace = optState.zoomState.zoomTrace;
    } else {
      trace = rootTrace;
    }

    var inputStack = [$('#expandedInput')];
    var containerStack = [$('#parseResults')];

    initActionLog();
    trace.walk({
      enter: function(node, parent, depth) {
        // Don't recurse into nodes that didn't succeed unless "Show failures" is enabled.
        if (!showFailures && !node.succeeded) {
          return node.SKIP;
        }
        var childInput;
        var isWhitespace = node.expr.ruleName === 'spaces';
        var isLeaf = isPrimitive(node.expr) ||
                     isBlackhole(node) ||
                     isWhitespace ||
                     node.children.length === 0;

        // Don't bother showing whitespace nodes that didn't consume anything.
        if (isWhitespace && node.interval.contents.length === 0) {
          return node.SKIP;
        }

        // If the node or its descendants successfully consumed input, create a span to wrap
        // all the input that was consumed.
        if (node.succeeded && !node.replacedBy) {
          var contents = isLeaf ? node.interval.contents : '';
          var inputContainer = inputStack[inputStack.length - 1];
          childInput = inputContainer.appendChild(createElement('span.input', contents));

          // Represent any non-empty run of whitespace as a single dot.
          if (isWhitespace && contents.length > 0) {
            childInput.innerHTML = '&#xb7;';  // Unicode Character 'MIDDLE DOT'
            childInput.classList.add('whitespace');
          }
        }
        var container = containerStack[containerStack.length - 1];
        var el = createTraceElement(ui, grammar, rootTrace, node, container, childInput,
          showFailures, state);
        toggleClasses(el, {
          failed: !node.succeeded,
          hidden: !shouldNodeBeLabeled(node),
          whitespace: isWhitespace
        });
        if (isLeaf) {
          return node.SKIP;
        }
        inputStack.push(childInput);
        containerStack.push(el.appendChild(createElement('.children')));
      },
      exit: function(node, parent, depth) {
        containerStack.pop();
        inputStack.pop();
      }
    });
    initializeWidths();
  }
  return refreshParseTree;
});
