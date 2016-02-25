/* eslint-env browser */
/* global cmUtil, createElement, d3, getWidthDependentElements, grammarEditor, inputEditor */
/* global options, setError, CodeMirror, restoreEditorState, grammar, semantics*/

'use strict';

var ArrayProto = Array.prototype;
function $(sel) { return document.querySelector(sel); }

var UnicodeChars = {
  HORIZONTAL_ELLIPSIS: '\u2026',
  WHITE_BULLET: '\u25E6'
};

var inputMatchResult;

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

  var semanticEditorMeasurement = measureSize(wrapperEl, 'semanticContainer');
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
    if (el.classList.contains('hidden') && el.children.length === 1) {
      el.style.display = 'none';
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
  if (el.children.length === 2) {
    return;
  }

  var editor = el.children[1].children[0];
  editor.hidden = !editor.hidden;

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

  var height = newMeasurement.height + (showing ? children.height : 0);
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
    return desc[desc.length - 1] === '_' ||
           desc === 'spaces' ||
           desc === 'end' ||
           desc === 'empty';
  }
  return false;
}

function shouldNodeBeVisible(traceNode) {
  // TODO: We need to distinguish between nodes that nodes that should be
  // hidden and nodes that should be collapsed by default.

  if (isBlackhole(traceNode)) {
    return false;
  }

  switch (traceNode.expr.constructor.name) {
    case 'Seq':
    case 'Alt':
      return false;
    case 'Apply':
      // Don't show a separate node for failed inline rule applications.
      return traceNode.succeeded || traceNode.expr.ruleName.indexOf('_') === -1;
    default:
      // Hide things that don't correspond to something the user wrote.
      if (!traceNode.expr.interval) {
        return false;
      }
  }
  return true;
}

function isPrimitive(expr) {
  switch (expr.constructor.name) {
    case 'Prim':
    case 'Range':
    case 'UnicodeChar':
      return true;
    default:
      return false;
  }
}

function getArgExpr(traceNode) {
  var expr = grammar.ruleBodies[traceNode.expr.ruleName];
  if (expr.constructor.name === 'Alt') {
    var altChildren = traceNode.children;

    // Get the real children of alternative rule
    if (altChildren.length !== 1 && altChildren[0].displayString === 'spaces') {
      altChildren = altChildren.filter(function(child) {
        return !isBlackhole(child);
      })[0].children;
    }

    expr = altChildren.filter(function(child) {
      return child.succeeded;
    })[0].expr;
  }
  return expr;
}

function getArgDisplay(expr) {
  var ans = [];
  if (expr.constructor.name === 'Seq') {
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
  if (expr.constructor.name === 'Seq') {
    ans = expr.toArgString().split(',');
  } else {
    ans.push(expr.toArgString());
  }
  return ans;
}

function getSemanticArgs(header) {
  var ans = [];
  for (var i = 1; i < header.children.length; i++) {
    ans.push(header.children[i].children[1].value);
  }
  return ans;
}

function saveSemanticAction(traceNode, funcStr, actionType, actionName, semanticContainer) {
  var func;
  try {
    // TODO: translate the simpler editing language to javascript function
    if (funcStr.trim().length !== 0) {
      var argStr = '(' + getSemanticArgs(semanticContainer.children[0].children[0]) + ')';

      // console.log('function', 'function' + argStr + '{' + funcStr + '}');
      func = eval('(function' + argStr + '{' + funcStr + '})'); // eslint-disable-line no-eval
    }
    semantics['get' + actionType](actionName).actionDict[traceNode.expr.ruleName] = func;

    // Trigger to refresh the parsing result
    restoreEditorState(inputEditor, 'input', $('#sampleInput'));
  } catch (e) {
    semanticContainer.children[1].className = 'semanticResult error';
    semanticContainer.children[1].textContent = e.message;
  }
}

function loadHeader(traceNode, header, optArgStr) {
  var rule = header.appendChild(createElement('.block'));
  rule.appendChild(createElement('span.name', traceNode.displayString + ' ='));

  var expr = getArgExpr(traceNode);
  var displayStrs = getArgDisplay(expr);
  var argStrs = optArgStr || getArgString(expr);
  displayStrs.forEach(function(display, idx) {
    var arg = header.appendChild(createElement('.block'));
    arg.appendChild(createElement('span.name', display));
    var nameEditor = arg.appendChild(createElement('textarea.represent', argStrs[idx]));
    nameEditor.cols = Math.max(nameEditor.value.length, display.length);
    nameEditor.addEventListener('keyup', function() {
      nameEditor.cols = Math.max(nameEditor.value.length, display.length);
    });
  });
}

function appendSemanticEditor(wrapper, traceNode, clearMarks) {
  var ruleName = traceNode.expr.ruleName;
  var semanticContainer = wrapper.appendChild(createElement('.semanticContainer'));
  var editorWrap = semanticContainer.appendChild(createElement('.editor'));

  // Editor header
  var header = editorWrap.appendChild(createElement('.editorHeader'));

  // Editor body
  var body = editorWrap.appendChild(createElement('.editorBody'));
  var semanticEditor = CodeMirror(body);
  semanticEditor.setOption('extraKeys', {
    'Cmd-S': function(cm) {
      clearMarks();
      // TODO: need to be modified, action type and action name
      saveSemanticAction(traceNode, cm.getValue(), 'Operation', 'eval', semanticContainer);
    }
  });

  // TODO: ['get'+actionType](actionName)
  var actionFn = semantics.getOperation('eval').actionDict[ruleName];
  var optArgStr;
  if (actionFn) {
    var actionFnStr = actionFn.toString();
    optArgStr = [];
    actionFnStr.substring(actionFnStr.indexOf('(') + 1, actionFnStr.indexOf(')'))
      .split(',').forEach(function(arg) {
        optArgStr.push(arg.trim());
      });

    var actionFnBody = actionFnStr.substring(actionFnStr.indexOf('{') + 1, actionFnStr.length - 1);
    semanticEditor.setValue(actionFnBody);
  }
  loadHeader(traceNode, header, optArgStr);
  editorWrap.hidden = true;

  // Add semantic action result
  var inputSeg = traceNode.interval.contents;
  var matchResult = inputMatchResult;
  inputMatchResult = grammar.match(inputSeg, ruleName);
  if (inputMatchResult.failed()) { // Left recursion is involved
    inputMatchResult = matchResult;
  }

  try {
    // TODO: 'eval' -> action name
    var res = semantics(inputMatchResult)['eval'](); // eslint-disable-line dot-notation
    semanticContainer.appendChild(createElement('.semanticResult', res));
  } catch (e) {
    var errorElt = semanticContainer.appendChild(createElement('.semanticResult.error'));

    // Showing error message only when it actually has semantic action
    if (actionFn) {
      errorElt.textContent = e;
    }
  }
}

function createTraceElement(traceNode, parent, input) {
  var wrapper = parent.appendChild(createElement('.pexpr'));
  var pexpr = traceNode.expr;
  wrapper.classList.add(pexpr.constructor.name.toLowerCase());
  wrapper.classList.toggle('failed', !traceNode.succeeded);

  var inputMark, grammarMark, defMark;
  function clearMarks() {
    if (input) {
      input.classList.remove('highlight');
    }
    inputMark = cmUtil.clearMark(inputMark);
    grammarMark = cmUtil.clearMark(grammarMark);
    defMark = cmUtil.clearMark(defMark);
    grammarEditor.getWrapperElement().classList.remove('highlighting');
    inputEditor.getWrapperElement().classList.remove('highlighting');
  }

  wrapper.addEventListener('mouseover', function(e) {
    if (input) {
      input.classList.add('highlight');
    }
    if (traceNode.interval) {
      inputMark = cmUtil.markInterval(inputEditor, traceNode.interval, 'highlight', false);
      inputEditor.getWrapperElement().classList.add('highlighting');
    }

    if (pexpr.interval) {
      grammarMark = cmUtil.markInterval(grammarEditor, pexpr.interval, 'active-appl', false);
      grammarEditor.getWrapperElement().classList.add('highlighting');
      cmUtil.scrollToInterval(grammarEditor, pexpr.interval);
    }

    var ruleName = pexpr.ruleName;
    if (ruleName) {
      var defInterval = grammar.ruleBodies[ruleName].definitionInterval;
      if (defInterval) {
        defMark = cmUtil.markInterval(grammarEditor, defInterval, 'active-definition', true);
        cmUtil.scrollToInterval(grammarEditor, defInterval);
      }
    }
    e.stopPropagation();
  });

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
    spaces: pexpr.ruleName === 'spaces'
  });

  label.addEventListener('click', function(e) {
    if (e.altKey && !(e.shiftKey || e.metaKey)) {
      console.log(traceNode);  // eslint-disable-line no-console
    } else if (e.metaKey && !e.shiftKey && options.eval/* TODO: modify option check */) {
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

  // Append semantic editor to the node
  if (options.eval &&
    traceNode.succeeded &&
    pexpr.ruleName && pexpr.ruleName !== 'spaces') {

    // TODO: remove
    if (!semantics.getOperation('eval')) {
      semantics.addOperation('eval', {
        number: function(_) { return parseFloat(this.interval.contents); }
      });
    }

    appendSemanticEditor(wrapper, traceNode, clearMarks);
  }

  return wrapper;
}

function refreshParseTree(input) {  // eslint-disable-line no-unused-vars
  var trace = grammar.trace(input);
  if (trace.result.failed()) {
    // Intervals with start == end won't show up in CodeMirror.
    var interval = trace.result.getInterval();
    interval.endIdx += 1;
    setError('input', inputEditor, interval, 'Expected ' + trace.result.getExpectedText());
  }

  var inputStack = [$('#expandedInput')];
  var containerStack = [$('#parseResults')];

  trace.walk({
    enter: function(node, parent, depth) {
      // Don't recurse into nodes that didn't succeed unless "Show failures" is enabled.
      if (!(options.showFailures || node.succeeded)) {
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
      var el = createTraceElement(node, container, childInput);

      toggleClasses(el, {
        failed: !node.succeeded,
        hidden: !shouldNodeBeVisible(node),
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
