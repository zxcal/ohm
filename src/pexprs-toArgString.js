'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/* Trying to convert pexpr to string that could be used as argument of function. */
/* Rulename could be used directly, and for those we don't have a better way to */
/* represent, use '$'+index (index in the arguement list) */

pexprs.PExpr.prototype.toArgString = common.abstract;

pexprs.any.toArgString = function() {
  return 'any';
};

pexprs.end.toArgString = function() {
  return 'end';
};

pexprs.Prim.prototype.toArgString =
pexprs.Range.prototype.toArgString =
pexprs.Lex.prototype.toArgString =
pexprs.Value.prototype.toArgString =
pexprs.Obj.prototype.toArgString =
pexprs.UnicodeChar.prototype.toArgString = function() {
  return '';
};

pexprs.Alt.prototype.toArgString = function() {
  return 'alt_option';
};

pexprs.Param.prototype.toArgString = function() {
  return '$param' + this.index;
};

pexprs.Seq.prototype.toArgString = function() {
  if (this.factors.length === 1) {
    return this.factors[0].toArgString().length === 0 ?
      '$0' :
      this.factors[0].toArgString();
  }

  var ans = [];
  var count = {};
  this.factors.forEach(function(factor, idx) {
      var arg = factor.toArgString().length > 0 ?
        factor.toArgString() :
        '$' + (idx + 1);

      // Check if argument name duplicated
      if (!count[arg]) {
        count[arg] = 1;
      } else {
        if (count[arg] === 1) {
          ans[ans.indexOf(arg)] = arg + '_1';
        }
        arg = arg + '_' + (++count[arg]);
      }

      ans.push(arg);
    });

  return ans.join(',');
};

pexprs.Iter.prototype.toArgString = function() {
  var str = this.expr.toArgString();
  str = str.length === 0 ? 'Iter' : str.split(',').join('_');
  switch (this.operator) {
    case '*':
    case '+':
      return str + 's'; // return `argument`s
    case '?': return 'opt' + str; // return opt`argument`
  }
};

pexprs.Not.prototype.toArgString = function() {
  return 'not_' + this.expr.toArgString().split(',').join('_');
};

pexprs.Lookahead.prototype.toArgString = function() {
  return 'has' + this.expr.toArgString().split(',').join('_');
};

pexprs.Arr.prototype.toArgString = function() {
  return '_' + this.expr.toString().split(',').join('_');
};

pexprs.Apply.prototype.toArgString = function() {
  return this.ruleName;
};

pexprs.TypeCheck.prototype.toArgString = function() {
  return this.type;
};
