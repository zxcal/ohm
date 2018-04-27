(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ohm = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _2.default.makeRecipe(["grammar", { "source": "BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = \"0\"..\"9\"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | \"a\"..\"f\"\n    | \"A\"..\"F\"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n}" }, "BuiltInRules", null, null, { "alnum": ["define", { "sourceInterval": [18, 78] }, "an alpha-numeric character", [], ["alt", { "sourceInterval": [60, 78] }, ["app", { "sourceInterval": [60, 66] }, "letter", []], ["app", { "sourceInterval": [73, 78] }, "digit", []]]], "letter": ["define", { "sourceInterval": [82, 142] }, "a letter", [], ["alt", { "sourceInterval": [107, 142] }, ["app", { "sourceInterval": [107, 112] }, "lower", []], ["app", { "sourceInterval": [119, 124] }, "upper", []], ["app", { "sourceInterval": [131, 142] }, "unicodeLtmo", []]]], "digit": ["define", { "sourceInterval": [146, 177] }, "a digit", [], ["range", { "sourceInterval": [169, 177] }, "0", "9"]], "hexDigit": ["define", { "sourceInterval": [181, 254] }, "a hexadecimal digit", [], ["alt", { "sourceInterval": [219, 254] }, ["app", { "sourceInterval": [219, 224] }, "digit", []], ["range", { "sourceInterval": [231, 239] }, "a", "f"], ["range", { "sourceInterval": [246, 254] }, "A", "F"]]], "ListOf": ["define", { "sourceInterval": [258, 336] }, null, ["elem", "sep"], ["alt", { "sourceInterval": [282, 336] }, ["app", { "sourceInterval": [282, 307] }, "NonemptyListOf", [["param", {}, 0], ["param", {}, 1]]], ["app", { "sourceInterval": [314, 336] }, "EmptyListOf", [["param", {}, 0], ["param", {}, 1]]]]], "NonemptyListOf": ["define", { "sourceInterval": [340, 388] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [372, 388] }, ["param", {}, 0], ["star", { "sourceInterval": [377, 388] }, ["seq", { "sourceInterval": [378, 386] }, ["param", {}, 1], ["param", {}, 0]]]]], "EmptyListOf": ["define", { "sourceInterval": [392, 434] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [438, 438] }]], "listOf": ["define", { "sourceInterval": [438, 516] }, null, ["elem", "sep"], ["alt", { "sourceInterval": [462, 516] }, ["app", { "sourceInterval": [462, 487] }, "nonemptyListOf", [["param", {}, 0], ["param", {}, 1]]], ["app", { "sourceInterval": [494, 516] }, "emptyListOf", [["param", {}, 0], ["param", {}, 1]]]]], "nonemptyListOf": ["define", { "sourceInterval": [520, 568] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [552, 568] }, ["param", {}, 0], ["star", { "sourceInterval": [557, 568] }, ["seq", { "sourceInterval": [558, 566] }, ["param", {}, 1], ["param", {}, 0]]]]], "emptyListOf": ["define", { "sourceInterval": [572, 614] }, null, ["elem", "sep"], ["seq", { "sourceInterval": [616, 616] }]] }]); // var ohm = require('..');

},{"..":46}],2:[function(require,module,exports){
"use strict";

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _2.default.makeRecipe(["grammar", { "source": "Ohm {\n\n  Grammars\n    = Grammar*\n\n  Grammar\n    = ident SuperGrammar? \"{\" Rule* \"}\"\n\n  SuperGrammar\n    = \"<:\" ident\n\n  Rule\n    = ident Formals? ruleDescr? \"=\"  RuleBody  -- define\n    | ident Formals?            \":=\" RuleBody  -- override\n    | ident Formals?            \"+=\" RuleBody  -- extend\n\n  RuleBody\n    = \"|\"? NonemptyListOf<TopLevelTerm, \"|\">\n\n  TopLevelTerm\n    = Seq caseName  -- inline\n    | Seq\n\n  Formals\n    = \"<\" ListOf<ident, \",\"> \">\"\n\n  Params\n    = \"<\" ListOf<Seq, \",\"> \">\"\n\n  Alt\n    = NonemptyListOf<Seq, \"|\">\n\n  Seq\n    = Iter*\n\n  Iter\n    = Pred \"*\"  -- star\n    | Pred \"+\"  -- plus\n    | Pred \"?\"  -- opt\n    | Pred\n\n  Pred\n    = \"~\" Lex  -- not\n    | \"&\" Lex  -- lookahead\n    | Lex\n\n  Lex\n    = \"#\" Base  -- lex\n    | Base\n\n  Base\n    = ident Params? ~(ruleDescr? \"=\" | \":=\" | \"+=\")  -- application\n    | oneCharTerminal \"..\" oneCharTerminal           -- range\n    | terminal                                       -- terminal\n    | \"(\" Alt \")\"                                    -- paren\n\n  ruleDescr  (a rule description)\n    = \"(\" ruleDescrText \")\"\n\n  ruleDescrText\n    = (~\")\" any)*\n\n  caseName\n    = \"--\" (~\"\\n\" space)* name (~\"\\n\" space)* (\"\\n\" | &\"}\")\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n  ident  (an identifier)\n    = name\n\n  terminal\n    = \"\\\"\" terminalChar* \"\\\"\"\n\n  oneCharTerminal\n    = \"\\\"\" terminalChar \"\\\"\"\n\n  terminalChar\n    = escapeChar\n    | ~\"\\\\\" ~\"\\\"\" ~\"\\n\" any\n\n  escapeChar  (an escape sequence)\n    = \"\\\\\\\\\"                                     -- backslash\n    | \"\\\\\\\"\"                                     -- doubleQuote\n    | \"\\\\\\'\"                                     -- singleQuote\n    | \"\\\\b\"                                      -- backspace\n    | \"\\\\n\"                                      -- lineFeed\n    | \"\\\\r\"                                      -- carriageReturn\n    | \"\\\\t\"                                      -- tab\n    | \"\\\\u\" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape\n    | \"\\\\x\" hexDigit hexDigit                    -- hexEscape\n\n  space\n   += comment\n\n  comment\n    = \"//\" (~\"\\n\" any)* \"\\n\"  -- singleLine\n    | \"/*\" (~\"*/\" any)* \"*/\"  -- multiLine\n\n  tokens = token*\n\n  token = caseName | comment | ident | operator | punctuation | terminal | any\n\n  operator = \"<:\" | \"=\" | \":=\" | \"+=\" | \"*\" | \"+\" | \"?\" | \"~\" | \"&\"\n\n  punctuation = \"<\" | \">\" | \",\" | \"--\"\n}" }, "Ohm", null, "Grammars", { "Grammars": ["define", { "sourceInterval": [9, 32] }, null, [], ["star", { "sourceInterval": [24, 32] }, ["app", { "sourceInterval": [24, 31] }, "Grammar", []]]], "Grammar": ["define", { "sourceInterval": [36, 83] }, null, [], ["seq", { "sourceInterval": [50, 83] }, ["app", { "sourceInterval": [50, 55] }, "ident", []], ["opt", { "sourceInterval": [56, 69] }, ["app", { "sourceInterval": [56, 68] }, "SuperGrammar", []]], ["terminal", { "sourceInterval": [70, 73] }, "{"], ["star", { "sourceInterval": [74, 79] }, ["app", { "sourceInterval": [74, 78] }, "Rule", []]], ["terminal", { "sourceInterval": [80, 83] }, "}"]]], "SuperGrammar": ["define", { "sourceInterval": [87, 116] }, null, [], ["seq", { "sourceInterval": [106, 116] }, ["terminal", { "sourceInterval": [106, 110] }, "<:"], ["app", { "sourceInterval": [111, 116] }, "ident", []]]], "Rule_define": ["define", { "sourceInterval": [131, 181] }, null, [], ["seq", { "sourceInterval": [131, 170] }, ["app", { "sourceInterval": [131, 136] }, "ident", []], ["opt", { "sourceInterval": [137, 145] }, ["app", { "sourceInterval": [137, 144] }, "Formals", []]], ["opt", { "sourceInterval": [146, 156] }, ["app", { "sourceInterval": [146, 155] }, "ruleDescr", []]], ["terminal", { "sourceInterval": [157, 160] }, "="], ["app", { "sourceInterval": [162, 170] }, "RuleBody", []]]], "Rule_override": ["define", { "sourceInterval": [188, 240] }, null, [], ["seq", { "sourceInterval": [188, 227] }, ["app", { "sourceInterval": [188, 193] }, "ident", []], ["opt", { "sourceInterval": [194, 202] }, ["app", { "sourceInterval": [194, 201] }, "Formals", []]], ["terminal", { "sourceInterval": [214, 218] }, ":="], ["app", { "sourceInterval": [219, 227] }, "RuleBody", []]]], "Rule_extend": ["define", { "sourceInterval": [247, 297] }, null, [], ["seq", { "sourceInterval": [247, 286] }, ["app", { "sourceInterval": [247, 252] }, "ident", []], ["opt", { "sourceInterval": [253, 261] }, ["app", { "sourceInterval": [253, 260] }, "Formals", []]], ["terminal", { "sourceInterval": [273, 277] }, "+="], ["app", { "sourceInterval": [278, 286] }, "RuleBody", []]]], "Rule": ["define", { "sourceInterval": [120, 297] }, null, [], ["alt", { "sourceInterval": [131, 297] }, ["app", { "sourceInterval": [131, 170] }, "Rule_define", []], ["app", { "sourceInterval": [188, 227] }, "Rule_override", []], ["app", { "sourceInterval": [247, 286] }, "Rule_extend", []]]], "RuleBody": ["define", { "sourceInterval": [301, 354] }, null, [], ["seq", { "sourceInterval": [316, 354] }, ["opt", { "sourceInterval": [316, 320] }, ["terminal", { "sourceInterval": [316, 319] }, "|"]], ["app", { "sourceInterval": [321, 354] }, "NonemptyListOf", [["app", { "sourceInterval": [336, 348] }, "TopLevelTerm", []], ["terminal", { "sourceInterval": [350, 353] }, "|"]]]]], "TopLevelTerm_inline": ["define", { "sourceInterval": [377, 400] }, null, [], ["seq", { "sourceInterval": [377, 389] }, ["app", { "sourceInterval": [377, 380] }, "Seq", []], ["app", { "sourceInterval": [381, 389] }, "caseName", []]]], "TopLevelTerm": ["define", { "sourceInterval": [358, 410] }, null, [], ["alt", { "sourceInterval": [377, 410] }, ["app", { "sourceInterval": [377, 389] }, "TopLevelTerm_inline", []], ["app", { "sourceInterval": [407, 410] }, "Seq", []]]], "Formals": ["define", { "sourceInterval": [414, 454] }, null, [], ["seq", { "sourceInterval": [428, 454] }, ["terminal", { "sourceInterval": [428, 431] }, "<"], ["app", { "sourceInterval": [432, 450] }, "ListOf", [["app", { "sourceInterval": [439, 444] }, "ident", []], ["terminal", { "sourceInterval": [446, 449] }, ","]]], ["terminal", { "sourceInterval": [451, 454] }, ">"]]], "Params": ["define", { "sourceInterval": [458, 495] }, null, [], ["seq", { "sourceInterval": [471, 495] }, ["terminal", { "sourceInterval": [471, 474] }, "<"], ["app", { "sourceInterval": [475, 491] }, "ListOf", [["app", { "sourceInterval": [482, 485] }, "Seq", []], ["terminal", { "sourceInterval": [487, 490] }, ","]]], ["terminal", { "sourceInterval": [492, 495] }, ">"]]], "Alt": ["define", { "sourceInterval": [499, 533] }, null, [], ["app", { "sourceInterval": [509, 533] }, "NonemptyListOf", [["app", { "sourceInterval": [524, 527] }, "Seq", []], ["terminal", { "sourceInterval": [529, 532] }, "|"]]]], "Seq": ["define", { "sourceInterval": [537, 552] }, null, [], ["star", { "sourceInterval": [547, 552] }, ["app", { "sourceInterval": [547, 551] }, "Iter", []]]], "Iter_star": ["define", { "sourceInterval": [567, 584] }, null, [], ["seq", { "sourceInterval": [567, 575] }, ["app", { "sourceInterval": [567, 571] }, "Pred", []], ["terminal", { "sourceInterval": [572, 575] }, "*"]]], "Iter_plus": ["define", { "sourceInterval": [591, 608] }, null, [], ["seq", { "sourceInterval": [591, 599] }, ["app", { "sourceInterval": [591, 595] }, "Pred", []], ["terminal", { "sourceInterval": [596, 599] }, "+"]]], "Iter_opt": ["define", { "sourceInterval": [615, 631] }, null, [], ["seq", { "sourceInterval": [615, 623] }, ["app", { "sourceInterval": [615, 619] }, "Pred", []], ["terminal", { "sourceInterval": [620, 623] }, "?"]]], "Iter": ["define", { "sourceInterval": [556, 642] }, null, [], ["alt", { "sourceInterval": [567, 642] }, ["app", { "sourceInterval": [567, 575] }, "Iter_star", []], ["app", { "sourceInterval": [591, 599] }, "Iter_plus", []], ["app", { "sourceInterval": [615, 623] }, "Iter_opt", []], ["app", { "sourceInterval": [638, 642] }, "Pred", []]]], "Pred_not": ["define", { "sourceInterval": [657, 672] }, null, [], ["seq", { "sourceInterval": [657, 664] }, ["terminal", { "sourceInterval": [657, 660] }, "~"], ["app", { "sourceInterval": [661, 664] }, "Lex", []]]], "Pred_lookahead": ["define", { "sourceInterval": [679, 700] }, null, [], ["seq", { "sourceInterval": [679, 686] }, ["terminal", { "sourceInterval": [679, 682] }, "&"], ["app", { "sourceInterval": [683, 686] }, "Lex", []]]], "Pred": ["define", { "sourceInterval": [646, 710] }, null, [], ["alt", { "sourceInterval": [657, 710] }, ["app", { "sourceInterval": [657, 664] }, "Pred_not", []], ["app", { "sourceInterval": [679, 686] }, "Pred_lookahead", []], ["app", { "sourceInterval": [707, 710] }, "Lex", []]]], "Lex_lex": ["define", { "sourceInterval": [724, 740] }, null, [], ["seq", { "sourceInterval": [724, 732] }, ["terminal", { "sourceInterval": [724, 727] }, "#"], ["app", { "sourceInterval": [728, 732] }, "Base", []]]], "Lex": ["define", { "sourceInterval": [714, 751] }, null, [], ["alt", { "sourceInterval": [724, 751] }, ["app", { "sourceInterval": [724, 732] }, "Lex_lex", []], ["app", { "sourceInterval": [747, 751] }, "Base", []]]], "Base_application": ["define", { "sourceInterval": [766, 827] }, null, [], ["seq", { "sourceInterval": [766, 811] }, ["app", { "sourceInterval": [766, 771] }, "ident", []], ["opt", { "sourceInterval": [772, 779] }, ["app", { "sourceInterval": [772, 778] }, "Params", []]], ["not", { "sourceInterval": [780, 811] }, ["alt", { "sourceInterval": [782, 810] }, ["seq", { "sourceInterval": [782, 796] }, ["opt", { "sourceInterval": [782, 792] }, ["app", { "sourceInterval": [782, 791] }, "ruleDescr", []]], ["terminal", { "sourceInterval": [793, 796] }, "="]], ["terminal", { "sourceInterval": [799, 803] }, ":="], ["terminal", { "sourceInterval": [806, 810] }, "+="]]]]], "Base_range": ["define", { "sourceInterval": [834, 889] }, null, [], ["seq", { "sourceInterval": [834, 870] }, ["app", { "sourceInterval": [834, 849] }, "oneCharTerminal", []], ["terminal", { "sourceInterval": [850, 854] }, ".."], ["app", { "sourceInterval": [855, 870] }, "oneCharTerminal", []]]], "Base_terminal": ["define", { "sourceInterval": [896, 954] }, null, [], ["app", { "sourceInterval": [896, 904] }, "terminal", []]], "Base_paren": ["define", { "sourceInterval": [961, 1016] }, null, [], ["seq", { "sourceInterval": [961, 972] }, ["terminal", { "sourceInterval": [961, 964] }, "("], ["app", { "sourceInterval": [965, 968] }, "Alt", []], ["terminal", { "sourceInterval": [969, 972] }, ")"]]], "Base": ["define", { "sourceInterval": [755, 1016] }, null, [], ["alt", { "sourceInterval": [766, 1016] }, ["app", { "sourceInterval": [766, 811] }, "Base_application", []], ["app", { "sourceInterval": [834, 870] }, "Base_range", []], ["app", { "sourceInterval": [896, 904] }, "Base_terminal", []], ["app", { "sourceInterval": [961, 972] }, "Base_paren", []]]], "ruleDescr": ["define", { "sourceInterval": [1020, 1079] }, "a rule description", [], ["seq", { "sourceInterval": [1058, 1079] }, ["terminal", { "sourceInterval": [1058, 1061] }, "("], ["app", { "sourceInterval": [1062, 1075] }, "ruleDescrText", []], ["terminal", { "sourceInterval": [1076, 1079] }, ")"]]], "ruleDescrText": ["define", { "sourceInterval": [1083, 1114] }, null, [], ["star", { "sourceInterval": [1103, 1114] }, ["seq", { "sourceInterval": [1104, 1112] }, ["not", { "sourceInterval": [1104, 1108] }, ["terminal", { "sourceInterval": [1105, 1108] }, ")"]], ["app", { "sourceInterval": [1109, 1112] }, "any", []]]]], "caseName": ["define", { "sourceInterval": [1118, 1186] }, null, [], ["seq", { "sourceInterval": [1133, 1186] }, ["terminal", { "sourceInterval": [1133, 1137] }, "--"], ["star", { "sourceInterval": [1138, 1152] }, ["seq", { "sourceInterval": [1139, 1150] }, ["not", { "sourceInterval": [1139, 1144] }, ["terminal", { "sourceInterval": [1140, 1144] }, "\n"]], ["app", { "sourceInterval": [1145, 1150] }, "space", []]]], ["app", { "sourceInterval": [1153, 1157] }, "name", []], ["star", { "sourceInterval": [1158, 1172] }, ["seq", { "sourceInterval": [1159, 1170] }, ["not", { "sourceInterval": [1159, 1164] }, ["terminal", { "sourceInterval": [1160, 1164] }, "\n"]], ["app", { "sourceInterval": [1165, 1170] }, "space", []]]], ["alt", { "sourceInterval": [1174, 1185] }, ["terminal", { "sourceInterval": [1174, 1178] }, "\n"], ["lookahead", { "sourceInterval": [1181, 1185] }, ["terminal", { "sourceInterval": [1182, 1185] }, "}"]]]]], "name": ["define", { "sourceInterval": [1190, 1230] }, "a name", [], ["seq", { "sourceInterval": [1211, 1230] }, ["app", { "sourceInterval": [1211, 1220] }, "nameFirst", []], ["star", { "sourceInterval": [1221, 1230] }, ["app", { "sourceInterval": [1221, 1229] }, "nameRest", []]]]], "nameFirst": ["define", { "sourceInterval": [1234, 1266] }, null, [], ["alt", { "sourceInterval": [1250, 1266] }, ["terminal", { "sourceInterval": [1250, 1253] }, "_"], ["app", { "sourceInterval": [1260, 1266] }, "letter", []]]], "nameRest": ["define", { "sourceInterval": [1270, 1300] }, null, [], ["alt", { "sourceInterval": [1285, 1300] }, ["terminal", { "sourceInterval": [1285, 1288] }, "_"], ["app", { "sourceInterval": [1295, 1300] }, "alnum", []]]], "ident": ["define", { "sourceInterval": [1304, 1337] }, "an identifier", [], ["app", { "sourceInterval": [1333, 1337] }, "name", []]], "terminal": ["define", { "sourceInterval": [1341, 1379] }, null, [], ["seq", { "sourceInterval": [1356, 1379] }, ["terminal", { "sourceInterval": [1356, 1360] }, "\""], ["star", { "sourceInterval": [1361, 1374] }, ["app", { "sourceInterval": [1361, 1373] }, "terminalChar", []]], ["terminal", { "sourceInterval": [1375, 1379] }, "\""]]], "oneCharTerminal": ["define", { "sourceInterval": [1383, 1427] }, null, [], ["seq", { "sourceInterval": [1405, 1427] }, ["terminal", { "sourceInterval": [1405, 1409] }, "\""], ["app", { "sourceInterval": [1410, 1422] }, "terminalChar", []], ["terminal", { "sourceInterval": [1423, 1427] }, "\""]]], "terminalChar": ["define", { "sourceInterval": [1431, 1488] }, null, [], ["alt", { "sourceInterval": [1450, 1488] }, ["app", { "sourceInterval": [1450, 1460] }, "escapeChar", []], ["seq", { "sourceInterval": [1467, 1488] }, ["not", { "sourceInterval": [1467, 1472] }, ["terminal", { "sourceInterval": [1468, 1472] }, "\\"]], ["not", { "sourceInterval": [1473, 1478] }, ["terminal", { "sourceInterval": [1474, 1478] }, "\""]], ["not", { "sourceInterval": [1479, 1484] }, ["terminal", { "sourceInterval": [1480, 1484] }, "\n"]], ["app", { "sourceInterval": [1485, 1488] }, "any", []]]]], "escapeChar_backslash": ["define", { "sourceInterval": [1531, 1586] }, null, [], ["terminal", { "sourceInterval": [1531, 1537] }, "\\\\"]], "escapeChar_doubleQuote": ["define", { "sourceInterval": [1593, 1650] }, null, [], ["terminal", { "sourceInterval": [1593, 1599] }, "\\\""]], "escapeChar_singleQuote": ["define", { "sourceInterval": [1657, 1714] }, null, [], ["terminal", { "sourceInterval": [1657, 1663] }, "\\'"]], "escapeChar_backspace": ["define", { "sourceInterval": [1721, 1776] }, null, [], ["terminal", { "sourceInterval": [1721, 1726] }, "\\b"]], "escapeChar_lineFeed": ["define", { "sourceInterval": [1783, 1837] }, null, [], ["terminal", { "sourceInterval": [1783, 1788] }, "\\n"]], "escapeChar_carriageReturn": ["define", { "sourceInterval": [1844, 1904] }, null, [], ["terminal", { "sourceInterval": [1844, 1849] }, "\\r"]], "escapeChar_tab": ["define", { "sourceInterval": [1911, 1960] }, null, [], ["terminal", { "sourceInterval": [1911, 1916] }, "\\t"]], "escapeChar_unicodeEscape": ["define", { "sourceInterval": [1967, 2026] }, null, [], ["seq", { "sourceInterval": [1967, 2008] }, ["terminal", { "sourceInterval": [1967, 1972] }, "\\u"], ["app", { "sourceInterval": [1973, 1981] }, "hexDigit", []], ["app", { "sourceInterval": [1982, 1990] }, "hexDigit", []], ["app", { "sourceInterval": [1991, 1999] }, "hexDigit", []], ["app", { "sourceInterval": [2000, 2008] }, "hexDigit", []]]], "escapeChar_hexEscape": ["define", { "sourceInterval": [2033, 2088] }, null, [], ["seq", { "sourceInterval": [2033, 2056] }, ["terminal", { "sourceInterval": [2033, 2038] }, "\\x"], ["app", { "sourceInterval": [2039, 2047] }, "hexDigit", []], ["app", { "sourceInterval": [2048, 2056] }, "hexDigit", []]]], "escapeChar": ["define", { "sourceInterval": [1492, 2088] }, "an escape sequence", [], ["alt", { "sourceInterval": [1531, 2088] }, ["app", { "sourceInterval": [1531, 1537] }, "escapeChar_backslash", []], ["app", { "sourceInterval": [1593, 1599] }, "escapeChar_doubleQuote", []], ["app", { "sourceInterval": [1657, 1663] }, "escapeChar_singleQuote", []], ["app", { "sourceInterval": [1721, 1726] }, "escapeChar_backspace", []], ["app", { "sourceInterval": [1783, 1788] }, "escapeChar_lineFeed", []], ["app", { "sourceInterval": [1844, 1849] }, "escapeChar_carriageReturn", []], ["app", { "sourceInterval": [1911, 1916] }, "escapeChar_tab", []], ["app", { "sourceInterval": [1967, 2008] }, "escapeChar_unicodeEscape", []], ["app", { "sourceInterval": [2033, 2056] }, "escapeChar_hexEscape", []]]], "space": ["extend", { "sourceInterval": [2092, 2111] }, null, [], ["app", { "sourceInterval": [2104, 2111] }, "comment", []]], "comment_singleLine": ["define", { "sourceInterval": [2129, 2166] }, null, [], ["seq", { "sourceInterval": [2129, 2151] }, ["terminal", { "sourceInterval": [2129, 2133] }, "//"], ["star", { "sourceInterval": [2134, 2146] }, ["seq", { "sourceInterval": [2135, 2144] }, ["not", { "sourceInterval": [2135, 2140] }, ["terminal", { "sourceInterval": [2136, 2140] }, "\n"]], ["app", { "sourceInterval": [2141, 2144] }, "any", []]]], ["terminal", { "sourceInterval": [2147, 2151] }, "\n"]]], "comment_multiLine": ["define", { "sourceInterval": [2173, 2209] }, null, [], ["seq", { "sourceInterval": [2173, 2195] }, ["terminal", { "sourceInterval": [2173, 2177] }, "/*"], ["star", { "sourceInterval": [2178, 2190] }, ["seq", { "sourceInterval": [2179, 2188] }, ["not", { "sourceInterval": [2179, 2184] }, ["terminal", { "sourceInterval": [2180, 2184] }, "*/"]], ["app", { "sourceInterval": [2185, 2188] }, "any", []]]], ["terminal", { "sourceInterval": [2191, 2195] }, "*/"]]], "comment": ["define", { "sourceInterval": [2115, 2209] }, null, [], ["alt", { "sourceInterval": [2129, 2209] }, ["app", { "sourceInterval": [2129, 2151] }, "comment_singleLine", []], ["app", { "sourceInterval": [2173, 2195] }, "comment_multiLine", []]]], "tokens": ["define", { "sourceInterval": [2213, 2228] }, null, [], ["star", { "sourceInterval": [2222, 2228] }, ["app", { "sourceInterval": [2222, 2227] }, "token", []]]], "token": ["define", { "sourceInterval": [2232, 2308] }, null, [], ["alt", { "sourceInterval": [2240, 2308] }, ["app", { "sourceInterval": [2240, 2248] }, "caseName", []], ["app", { "sourceInterval": [2251, 2258] }, "comment", []], ["app", { "sourceInterval": [2261, 2266] }, "ident", []], ["app", { "sourceInterval": [2269, 2277] }, "operator", []], ["app", { "sourceInterval": [2280, 2291] }, "punctuation", []], ["app", { "sourceInterval": [2294, 2302] }, "terminal", []], ["app", { "sourceInterval": [2305, 2308] }, "any", []]]], "operator": ["define", { "sourceInterval": [2312, 2377] }, null, [], ["alt", { "sourceInterval": [2323, 2377] }, ["terminal", { "sourceInterval": [2323, 2327] }, "<:"], ["terminal", { "sourceInterval": [2330, 2333] }, "="], ["terminal", { "sourceInterval": [2336, 2340] }, ":="], ["terminal", { "sourceInterval": [2343, 2347] }, "+="], ["terminal", { "sourceInterval": [2350, 2353] }, "*"], ["terminal", { "sourceInterval": [2356, 2359] }, "+"], ["terminal", { "sourceInterval": [2362, 2365] }, "?"], ["terminal", { "sourceInterval": [2368, 2371] }, "~"], ["terminal", { "sourceInterval": [2374, 2377] }, "&"]]], "punctuation": ["define", { "sourceInterval": [2381, 2417] }, null, [], ["alt", { "sourceInterval": [2395, 2417] }, ["terminal", { "sourceInterval": [2395, 2398] }, "<"], ["terminal", { "sourceInterval": [2401, 2404] }, ">"], ["terminal", { "sourceInterval": [2407, 2410] }, ","], ["terminal", { "sourceInterval": [2413, 2417] }, "--"]]] }]); // var ohm = require('..');

},{"..":46}],3:[function(require,module,exports){
"use strict";

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _2.default.makeRecipe(["grammar", { "source": "OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = \"(\" ListOf<name, \",\"> \")\"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n}" }, "OperationsAndAttributes", null, "AttributeSignature", { "AttributeSignature": ["define", { "sourceInterval": [29, 58] }, null, [], ["app", { "sourceInterval": [54, 58] }, "name", []]], "OperationSignature": ["define", { "sourceInterval": [62, 100] }, null, [], ["seq", { "sourceInterval": [87, 100] }, ["app", { "sourceInterval": [87, 91] }, "name", []], ["opt", { "sourceInterval": [92, 100] }, ["app", { "sourceInterval": [92, 99] }, "Formals", []]]]], "Formals": ["define", { "sourceInterval": [104, 143] }, null, [], ["seq", { "sourceInterval": [118, 143] }, ["terminal", { "sourceInterval": [118, 121] }, "("], ["app", { "sourceInterval": [122, 139] }, "ListOf", [["app", { "sourceInterval": [129, 133] }, "name", []], ["terminal", { "sourceInterval": [135, 138] }, ","]]], ["terminal", { "sourceInterval": [140, 143] }, ")"]]], "name": ["define", { "sourceInterval": [147, 187] }, "a name", [], ["seq", { "sourceInterval": [168, 187] }, ["app", { "sourceInterval": [168, 177] }, "nameFirst", []], ["star", { "sourceInterval": [178, 187] }, ["app", { "sourceInterval": [178, 186] }, "nameRest", []]]]], "nameFirst": ["define", { "sourceInterval": [191, 223] }, null, [], ["alt", { "sourceInterval": [207, 223] }, ["terminal", { "sourceInterval": [207, 210] }, "_"], ["app", { "sourceInterval": [217, 223] }, "letter", []]]], "nameRest": ["define", { "sourceInterval": [227, 257] }, null, [], ["alt", { "sourceInterval": [242, 257] }, ["terminal", { "sourceInterval": [242, 245] }, "_"], ["app", { "sourceInterval": [252, 257] }, "alnum", []]]] }]); // var ohm = require('..');

},{"..":46}],4:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var assert = require('../src/common').assert;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Helpers

function getProp(name, thing, fn) {
  return fn(thing[name]);
}

function mapProp(name, thing, fn) {
  return thing[name].map(fn);
}

// Returns a function that will walk a single property of a node.
// `descriptor` is a string indicating the property name, optionally ending
// with '[]' (e.g., 'children[]').
function getPropWalkFn(descriptor) {
  var parts = descriptor.split(/ ?\[\]/);
  if (parts.length === 2) {
    return mapProp.bind(null, parts[0]);
  }
  return getProp.bind(null, descriptor);
}

function getProps(walkFns, thing, fn) {
  return walkFns.map(function (walkFn) {
    return walkFn(thing, fn);
  });
}

function getWalkFn(shape) {
  if (typeof shape === 'string') {
    return getProps.bind(null, [getPropWalkFn(shape)]);
  } else if (Array.isArray(shape)) {
    return getProps.bind(null, shape.map(getPropWalkFn));
  } else {
    assert(typeof shape === 'function', 'Expected a string, Array, or function');
    assert(shape.length === 2, 'Expected a function of arity 2, got ' + shape.length);
    return shape;
  }
}

function isRestrictedIdentifier(str) {
  return (/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(str)
  );
}

function trim(s) {
  return s.trim();
}

function parseSignature(sig) {
  var parts = sig.split(/[()]/).map(trim);
  if (parts.length === 3 && parts[2] === '') {
    var name = parts[0];
    var params = [];
    if (parts[1].length > 0) {
      params = parts[1].split(',').map(trim);
    }
    if (isRestrictedIdentifier(name) && params.every(isRestrictedIdentifier)) {
      return { name: name, formals: params };
    }
  }
  throw new Error('Invalid operation signature: ' + sig);
}

/*
  A VisitorFamily contains a set of recursive operations that are defined over some kind of
  tree structure. The `config` parameter specifies how to walk the tree:
  - 'getTag' is function which, given a node in the tree, returns the node's 'tag' (type)
  - 'shapes' an object that maps from a tag to a value that describes how to recursively
    evaluate the operation for nodes of that type. The value can be:
    * a string indicating the property name that holds that node's only child
    * an Array of property names (or an empty array indicating a leaf type), or
    * a function taking two arguments (node, fn), and returning an Array which is the result
      of apply `fn` to each of the node's children.
 */
function VisitorFamily(config) {
  this._shapes = config.shapes;
  this._getTag = config.getTag;

  this.Adapter = function (thing, family) {
    this._adaptee = thing;
    this._family = family;
  };
  this.Adapter.prototype.valueOf = function () {
    throw new Error('heeey!');
  };
  this.operations = {};

  this._arities = Object.create(null);
  this._getChildren = Object.create(null);

  var self = this;
  Object.keys(this._shapes).forEach(function (k) {
    var shape = self._shapes[k];
    self._getChildren[k] = getWalkFn(shape);

    // A function means the arity isn't fixed, so don't put an entry in the arity map.
    if (typeof shape !== 'function') {
      self._arities[k] = Array.isArray(shape) ? shape.length : 1;
    }
  });
  this._wrap = function (thing) {
    return new self.Adapter(thing, self);
  };
}

VisitorFamily.prototype.wrap = function (thing) {
  return this._wrap(thing);
};

VisitorFamily.prototype._checkActionDict = function (dict) {
  var self = this;
  Object.keys(dict).forEach(function (k) {
    assert(k in self._getChildren, "Unrecognized action name '" + k + "'");
    var action = dict[k];
    assert(typeof action === 'function', "Key '" + k + "': expected function, got " + action);
    if (k in self._arities) {
      var expected = self._arities[k];
      var actual = dict[k].length;
      assert(actual === expected, "Action '" + k + "' has the wrong arity: expected " + expected + ', got ' + actual);
    }
  });
};

VisitorFamily.prototype.addOperation = function (signature, actions) {
  var sig = parseSignature(signature);
  var name = sig.name;
  this._checkActionDict(actions);
  this.operations[name] = {
    name: name,
    formals: sig.formals,
    actions: actions
  };

  var family = this;
  this.Adapter.prototype[name] = function () {
    var tag = family._getTag(this._adaptee);
    assert(tag in family._getChildren, "getTag returned unrecognized tag '" + tag + "'");
    assert(tag in actions, "No action for '" + tag + "' in operation '" + name + "'");

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    var args = Object.create(null);
    for (var i = 0; i < arguments.length; i++) {
      args[sig.formals[i]] = arguments[i];
    }

    var oldArgs = this.args;
    this.args = args;
    var ans = actions[tag].apply(this, family._getChildren[tag](this._adaptee, family._wrap));
    this.args = oldArgs;
    return ans;
  };
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = VisitorFamily;

},{"../src/common":44}],5:[function(require,module,exports){
'use strict';

module.exports = {
  VisitorFamily: require('./VisitorFamily'),
  semanticsForToAST: require('./semantics-toAST').semantics,
  toAST: require('./semantics-toAST').helper
};

},{"./VisitorFamily":4,"./semantics-toAST":6}],6:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var pexprs = require('../src/pexprs');
var MatchResult = require('../src/MatchResult');
var Grammar = require('../src/Grammar');
var extend = require('util-extend');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var defaultOperation = {
  _terminal: function _terminal() {
    return this.primitiveValue;
  },

  _nonterminal: function _nonterminal(children) {
    var ctorName = this._node.ctorName;
    var mapping = this.args.mapping;

    // without customization
    if (!mapping.hasOwnProperty(ctorName)) {
      // intermediate node
      if (this._node instanceof pexprs.Alt || this._node instanceof pexprs.Apply) {
        return children[0].toAST(mapping);
      }

      // lexical rule
      if (this.isLexical()) {
        return this.sourceString;
      }

      // singular node (e.g. only surrounded by literals or lookaheads)
      var realChildren = children.filter(function (child) {
        return !child.isTerminal();
      });
      if (realChildren.length === 1) {
        return realChildren[0].toAST(mapping);
      }

      // rest: terms with multiple children
    }

    // direct forward
    if (typeof mapping[ctorName] === 'number') {
      return children[mapping[ctorName]].toAST(mapping);
    }

    // named/mapped children or unnamed children ('0', '1', '2', ...)
    var propMap = mapping[ctorName] || children;
    var node = {
      type: ctorName
    };
    for (var prop in propMap) {
      var mappedProp = mapping[ctorName] && mapping[ctorName][prop];
      if (typeof mappedProp === 'number') {
        // direct forward
        node[prop] = children[mappedProp].toAST(mapping);
      } else if (typeof mappedProp === 'string' || typeof mappedProp === 'boolean' || mappedProp === null) {
        // primitive value
        node[prop] = mappedProp;
      } else if ((typeof mappedProp === 'undefined' ? 'undefined' : _typeof(mappedProp)) === 'object' && mappedProp instanceof Number) {
        // primitive number (must be unboxed)
        node[prop] = Number(mappedProp);
      } else if (typeof mappedProp === 'function') {
        // computed value
        node[prop] = mappedProp.call(this, children);
      } else if (mappedProp === undefined) {
        if (children[prop] && !children[prop].isTerminal()) {
          node[prop] = children[prop].toAST(mapping);
        } else {
          // delete predefined 'type' properties, like 'type', if explicitely removed
          delete node[prop];
        }
      }
    }
    return node;
  },

  _iter: function _iter(children) {
    if (this._node.isOptional()) {
      if (this.numChildren === 0) {
        return null;
      } else {
        return children[0].toAST(this.args.mapping);
      }
    }

    return children.map(function (child) {
      return child.toAST(this.args.mapping);
    }, this);
  },

  NonemptyListOf: function NonemptyListOf(first, sep, rest) {
    return [first.toAST(this.args.mapping)].concat(rest.toAST(this.args.mapping));
  },

  EmptyListOf: function EmptyListOf() {
    return [];
  }
};

// Returns a plain JavaScript object that includes an abstract syntax tree (AST)
// for the given match result `res` containg a concrete syntax tree (CST) and grammar.
// The optional `mapping` parameter can be used to customize how the nodes of the CST
// are mapped to the AST (see /doc/extras.md#toastmatchresult-mapping).
function toAST(res, mapping) {
  if (!(res instanceof MatchResult) || res.failed()) {
    throw new Error('toAST() expects a succesfull MatchResult as first parameter');
  }

  mapping = extend({}, mapping);
  var operation = extend({}, defaultOperation);
  for (var termName in mapping) {
    if (typeof mapping[termName] === 'function') {
      operation[termName] = mapping[termName];
      delete mapping[termName];
    }
  }
  var g = res._cst.grammar;
  var s = g.createSemantics().addOperation('toAST(mapping)', operation);
  return s(res).toAST(mapping);
}

// Returns a semantics containg the toAST(mapping) operation for the given grammar g.
function semanticsForToAST(g) {
  if (!(g instanceof Grammar)) {
    throw new Error('semanticsToAST() expects a Grammar as parameter');
  }

  return g.createSemantics().addOperation('toAST(mapping)', defaultOperation);
}

module.exports = {
  helper: toAST,
  semantics: semanticsForToAST
};

},{"../src/Grammar":33,"../src/MatchResult":37,"../src/pexprs":64,"util-extend":29}],7:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":9,"es5-ext/object/is-callable":12,"es5-ext/object/normalize-options":17,"es5-ext/string/#/contains":19}],8:[function(require,module,exports){
"use strict";

// eslint-disable-next-line no-empty-function
module.exports = function () {};

},{}],9:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? Object.assign
	: require("./shim");

},{"./is-implemented":10,"./shim":11}],10:[function(require,module,exports){
"use strict";

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};

},{}],11:[function(require,module,exports){
"use strict";

var keys  = require("../keys")
  , value = require("../valid-value")
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":14,"../valid-value":18}],12:[function(require,module,exports){
// Deprecated

"use strict";

module.exports = function (obj) {
 return typeof obj === "function";
};

},{}],13:[function(require,module,exports){
"use strict";

var _undefined = require("../function/noop")(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};

},{"../function/noop":8}],14:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? Object.keys
	: require("./shim");

},{"./is-implemented":15,"./shim":16}],15:[function(require,module,exports){
"use strict";

module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
 return false;
}
};

},{}],16:[function(require,module,exports){
"use strict";

var isValue = require("../is-value");

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};

},{"../is-value":13}],17:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

},{"./is-value":13}],18:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{"./is-value":13}],19:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? String.prototype.contains
	: require("./shim");

},{"./is-implemented":20,"./shim":21}],20:[function(require,module,exports){
"use strict";

var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};

},{}],21:[function(require,module,exports){
"use strict";

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],22:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":23,"./polyfill":25}],23:[function(require,module,exports){
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{}],24:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};

},{}],25:[function(require,module,exports){
// ES2015 Symbol polyfill for environments that do not (or partially) support it

'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

},{"./validate-symbol":26,"d":7}],26:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":24}],27:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],28:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],29:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = extend;
function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

},{}],30:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var GrammarDecl = require('./GrammarDecl');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {}

Builder.prototype = {
  currentDecl: null,

  newGrammar: function newGrammar(name) {
    return new GrammarDecl(name);
  },

  grammar: function grammar(metaInfo, name, superGrammar, defaultStartRule, rules) {
    var gDecl = new GrammarDecl(name);
    if (superGrammar) {
      gDecl.withSuperGrammar(this.fromRecipe(superGrammar));
    }
    if (defaultStartRule) {
      gDecl.withDefaultStartRule(defaultStartRule);
    }
    if (metaInfo && metaInfo.source) {
      gDecl.withSource(metaInfo.source);
    }

    var self = this;
    this.currentDecl = gDecl;
    Object.keys(rules).forEach(function (ruleName) {
      var ruleRecipe = rules[ruleName];

      var action = ruleRecipe[0]; // define/extend/override
      var metaInfo = ruleRecipe[1];
      var description = ruleRecipe[2];
      var formals = ruleRecipe[3];
      var body = self.fromRecipe(ruleRecipe[4]);

      var source;
      if (gDecl.source && metaInfo && metaInfo.sourceInterval) {
        source = gDecl.source.subInterval(metaInfo.sourceInterval[0], metaInfo.sourceInterval[1] - metaInfo.sourceInterval[0]);
      }
      gDecl[action](ruleName, formals, body, description, source);
    });
    this.currentDecl = null;
    return gDecl.build();
  },

  terminal: function terminal(x) {
    return new pexprs.Terminal(x);
  },

  range: function range(from, to) {
    return new pexprs.Range(from, to);
  },

  param: function param(index) {
    return new pexprs.Param(index);
  },

  alt: function alt() /* term1, term1, ... */{
    var terms = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },

  seq: function seq() /* factor1, factor2, ... */{
    var factors = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },

  star: function star(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Star(expr);
  },

  plus: function plus(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Plus(expr);
  },

  opt: function opt(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Opt(expr);
  },

  not: function not(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Not(expr);
  },

  la: function la(expr) {
    // TODO: temporary to still be able to read old recipes
    return this.lookahead(expr);
  },

  lookahead: function lookahead(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lookahead(expr);
  },

  lex: function lex(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lex(expr);
  },

  app: function app(ruleName, optParams) {
    if (optParams && optParams.length > 0) {
      optParams = optParams.map(function (param) {
        return param instanceof pexprs.PExpr ? param : this.fromRecipe(param);
      }, this);
    }
    return new pexprs.Apply(ruleName, optParams);
  },

  fromRecipe: function fromRecipe(recipe) {
    // the meta-info of 'grammar' is proccessed in Builder.grammar
    var result = this[recipe[0]].apply(this, recipe[0] === 'grammar' ? recipe.slice(1) : recipe.slice(2));

    var metaInfo = recipe[1];
    if (metaInfo) {
      if (metaInfo.sourceInterval && this.currentDecl) {
        result.withSource(this.currentDecl.sourceInterval.apply(this.currentDecl, metaInfo.sourceInterval));
      }
    }
    return result;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;

},{"./GrammarDecl":34,"./pexprs":64}],31:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Failure = require('./Failure');
var TerminalNode = require('./nodes').TerminalNode;
var assert = require('./common').assert;
var inherits = require('inherits');
var pexprs = require('./pexprs');

function CaseInsensitiveTerminal(param) {
  this.obj = param;
}
inherits(CaseInsensitiveTerminal, pexprs.PExpr);

CaseInsensitiveTerminal.prototype = {
  _getString: function _getString(state) {
    var terminal = state.currentApplication().args[this.obj.index];
    assert(terminal instanceof pexprs.Terminal, 'expected a Terminal expression');
    return terminal.obj;
  },

  // Implementation of the PExpr API

  allowsSkippingPrecedingSpace: function allowsSkippingPrecedingSpace() {
    return true;
  },

  eval: function _eval(state) {
    var inputStream = state.inputStream;
    var origPos = inputStream.pos;
    var matchStr = this._getString(state);
    if (!inputStream.matchString(matchStr, true)) {
      state.processFailure(origPos, this);
      return false;
    } else {
      state.pushBinding(new TerminalNode(state.grammar, matchStr), origPos);
      return true;
    }
  },

  generateExample: function generateExample(grammar, examples, inSyntacticContext, actuals) {
    // Start with a example generated from the Terminal...
    var str = this.obj.generateExample(grammar, examples, inSyntacticContext, actuals).value;

    // ...and randomly switch characters to uppercase/lowercase.
    var value = '';
    for (var i = 0; i < str.length; ++i) {
      value += Math.random() < 0.5 ? str[i].toLocaleLowerCase() : str[i].toLocaleUpperCase();
    }
    return { value: value };
  },

  getArity: function getArity() {
    return 1;
  },

  substituteParams: function substituteParams(actuals) {
    return new CaseInsensitiveTerminal(this.obj.substituteParams(actuals));
  },

  toDisplayString: function toDisplayString() {
    return this.obj.toDisplayString() + ' (case-insensitive)';
  },

  toFailure: function toFailure() {
    return new Failure(this, this.obj.toFailure() + ' (case-insensitive)', 'description');
  },

  _isNullable: function _isNullable(grammar, memo) {
    return this.obj._isNullable(grammar, memo);
  }
};

module.exports = CaseInsensitiveTerminal;

},{"./Failure":32,"./common":44,"./nodes":47,"./pexprs":64,"inherits":27}],32:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

/*
  `Failure`s represent expressions that weren't matched while parsing. They are used to generate
  error messages automatically. The interface of `Failure`s includes the collowing methods:

  - getText() : String
  - getType() : String  (one of {"description", "string", "code"})
  - isDescription() : bool
  - isStringTerminal() : bool
  - isCode() : bool
  - isFluffy() : bool
  - makeFluffy() : void
  - subsumes(Failure) : bool
*/

function isValidType(type) {
  return type === 'description' || type === 'string' || type === 'code';
}

function Failure(pexpr, text, type) {
  if (!isValidType(type)) {
    throw new Error('invalid Failure type: ' + type);
  }
  this.pexpr = pexpr;
  this.text = text;
  this.type = type;
  this.fluffy = false;
}

Failure.prototype.getPExpr = function () {
  return this.pexpr;
};

Failure.prototype.getText = function () {
  return this.text;
};

Failure.prototype.getType = function () {
  return this.type;
};

Failure.prototype.isDescription = function () {
  return this.type === 'description';
};

Failure.prototype.isStringTerminal = function () {
  return this.type === 'string';
};

Failure.prototype.isCode = function () {
  return this.type === 'code';
};

Failure.prototype.isFluffy = function () {
  return this.fluffy;
};

Failure.prototype.makeFluffy = function () {
  this.fluffy = true;
};

Failure.prototype.clearFluffy = function () {
  this.fluffy = false;
};

Failure.prototype.subsumes = function (that) {
  return this.getText() === that.getText() && this.type === that.type && (!this.isFluffy() || this.isFluffy() && that.isFluffy());
};

Failure.prototype.toString = function () {
  return this.type === 'string' ? JSON.stringify(this.getText()) : this.getText();
};

Failure.prototype.clone = function () {
  var failure = new Failure(this.pexpr, this.text, this.type);
  if (this.isFluffy()) {
    failure.makeFluffy();
  }
  return failure;
};

Failure.prototype.toKey = function () {
  return this.toString() + '#' + this.type;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Failure;

},{}],33:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var CaseInsensitiveTerminal = require('./CaseInsensitiveTerminal');
var Matcher = require('./Matcher');
var Semantics = require('./Semantics');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function getSortedRuleValues(grammar) {
  return Object.keys(grammar.rules).sort().map(function (name) {
    return grammar.rules[name];
  });
}

function Grammar(name, superGrammar, rules, optDefaultStartRule) {
  this.name = name;
  this.superGrammar = superGrammar;
  this.rules = rules;
  if (optDefaultStartRule) {
    if (!(optDefaultStartRule in rules)) {
      throw new Error("Invalid start rule: '" + optDefaultStartRule + "' is not a rule in grammar '" + name + "'");
    }
    this.defaultStartRule = optDefaultStartRule;
  }
}

var ohmGrammar;
var buildGrammar;

// This method is called from main.js once Ohm has loaded.
Grammar.initApplicationParser = function (grammar, builderFn) {
  ohmGrammar = grammar;
  buildGrammar = builderFn;
};

Grammar.prototype = {
  matcher: function matcher() {
    return new Matcher(this);
  },

  // Return true if the grammar is a built-in grammar, otherwise false.
  // NOTE: This might give an unexpected result if called before BuiltInRules is defined!
  isBuiltIn: function isBuiltIn() {
    return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
  },

  equals: function equals(g) {
    if (this === g) {
      return true;
    }
    // Do the cheapest comparisons first.
    if (g == null || this.name !== g.name || this.defaultStartRule !== g.defaultStartRule || !(this.superGrammar === g.superGrammar || this.superGrammar.equals(g.superGrammar))) {
      return false;
    }
    var myRules = getSortedRuleValues(this);
    var otherRules = getSortedRuleValues(g);
    return myRules.length === otherRules.length && myRules.every(function (rule, i) {
      return rule.description === otherRules[i].description && rule.formals.join(',') === otherRules[i].formals.join(',') && rule.body.toString() === otherRules[i].body.toString();
    });
  },

  match: function match(input, optStartApplication) {
    var m = this.matcher();
    m.replaceInputRange(0, 0, input);
    return m.match(optStartApplication);
  },

  trace: function trace(input, optStartApplication) {
    var m = this.matcher();
    m.replaceInputRange(0, 0, input);
    return m.trace(optStartApplication);
  },

  semantics: function semantics() {
    // TODO: Remove this eventually! Deprecated in v0.12.
    throw new Error('semantics() is deprecated -- use createSemantics() instead.');
  },

  createSemantics: function createSemantics() {
    return Semantics.createSemantics(this);
  },

  extendSemantics: function extendSemantics(superSemantics) {
    return Semantics.createSemantics(this, superSemantics._getSemantics());
  },

  // Check that every key in `actionDict` corresponds to a semantic action, and that it maps to
  // a function of the correct arity. If not, throw an exception.
  _checkTopDownActionDict: function _checkTopDownActionDict(what, name, actionDict) {
    function isSpecialAction(a) {
      return a === '_iter' || a === '_terminal' || a === '_nonterminal' || a === '_default';
    }

    var problems = [];
    for (var k in actionDict) {
      var v = actionDict[k];
      if (!isSpecialAction(k) && !(k in this.rules)) {
        problems.push("'" + k + "' is not a valid semantic action for '" + this.name + "'");
      } else if (typeof v !== 'function') {
        problems.push("'" + k + "' must be a function in an action dictionary for '" + this.name + "'");
      } else {
        var actual = v.length;
        var expected = this._topDownActionArity(k);
        if (actual !== expected) {
          problems.push("Semantic action '" + k + "' has the wrong arity: " + 'expected ' + expected + ', got ' + actual);
        }
      }
    }
    if (problems.length > 0) {
      var prettyProblems = problems.map(function (problem) {
        return '- ' + problem;
      });
      var error = new Error("Found errors in the action dictionary of the '" + name + "' " + what + ':\n' + prettyProblems.join('\n'));
      error.problems = problems;
      throw error;
    }
  },

  // Return the expected arity for a semantic action named `actionName`, which
  // is either a rule name or a special action name like '_nonterminal'.
  _topDownActionArity: function _topDownActionArity(actionName) {
    if (actionName === '_iter' || actionName === '_nonterminal' || actionName === '_default') {
      return 1;
    } else if (actionName === '_terminal') {
      return 0;
    }
    return this.rules[actionName].body.getArity();
  },

  _inheritsFrom: function _inheritsFrom(grammar) {
    var g = this.superGrammar;
    while (g) {
      if (g.equals(grammar, true)) {
        return true;
      }
      g = g.superGrammar;
    }
    return false;
  },

  toRecipe: function toRecipe(optVarName) {
    var metaInfo = {};
    // Include the grammar source if it is available.
    if (this.source) {
      metaInfo.source = this.source.contents;
    }

    var superGrammar = null;
    if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
      superGrammar = JSON.parse(this.superGrammar.toRecipe());
    }

    var startRule = null;
    if (this.defaultStartRule) {
      startRule = this.defaultStartRule;
    }

    var rules = {};
    var self = this;
    Object.keys(this.rules).forEach(function (ruleName) {
      var ruleInfo = self.rules[ruleName];
      var body = ruleInfo.body;
      var isDefinition = !self.superGrammar || !self.superGrammar.rules[ruleName];

      var operation;
      if (isDefinition) {
        operation = 'define';
      } else {
        operation = body instanceof pexprs.Extend ? 'extend' : 'override';
      }

      var metaInfo = {};
      if (ruleInfo.source && self.source) {
        var adjusted = ruleInfo.source.relativeTo(self.source);
        metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
      }

      var description = isDefinition ? ruleInfo.description : null;
      var bodyRecipe = body.outputRecipe(ruleInfo.formals, self.source);

      rules[ruleName] = [operation, // "define"/"extend"/"override"
      metaInfo, description, ruleInfo.formals, bodyRecipe];
    });

    return JSON.stringify(['grammar', metaInfo, this.name, superGrammar, startRule, rules]);
  },

  // TODO: Come up with better names for these methods.
  // TODO: Write the analog of these methods for inherited attributes.
  toOperationActionDictionaryTemplate: function toOperationActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },
  toAttributeActionDictionaryTemplate: function toAttributeActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },

  _toOperationOrAttributeActionDictionaryTemplate: function _toOperationOrAttributeActionDictionaryTemplate() {
    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus
    // should appear next to other cases of AddExpr.

    var sb = new common.StringBuffer();
    sb.append('{');

    var first = true;
    for (var ruleName in this.rules) {
      var body = this.rules[ruleName].body;
      if (first) {
        first = false;
      } else {
        sb.append(',');
      }
      sb.append('\n');
      sb.append('  ');
      this.addSemanticActionTemplate(ruleName, body, sb);
    }

    sb.append('\n}');
    return sb.contents();
  },

  addSemanticActionTemplate: function addSemanticActionTemplate(ruleName, body, sb) {
    sb.append(ruleName);
    sb.append(': function(');
    var arity = this._topDownActionArity(ruleName);
    sb.append(common.repeat('_', arity).join(', '));
    sb.append(') {\n');
    sb.append('  }');
  },

  // Parse a string which expresses a rule application in this grammar, and return the
  // resulting Apply node.
  parseApplication: function parseApplication(str) {
    var app;
    if (str.indexOf('<') === -1) {
      // simple application
      app = new pexprs.Apply(str);
    } else {
      // parameterized application
      var cst = ohmGrammar.match(str, 'Base_application');
      app = buildGrammar(cst, {});
    }

    // Ensure that the application is valid.
    if (!(app.ruleName in this.rules)) {
      throw errors.undeclaredRule(app.ruleName, this.name);
    }
    var formals = this.rules[app.ruleName].formals;
    if (formals.length !== app.args.length) {
      var source = this.rules[app.ruleName].source;
      throw errors.wrongNumberOfParameters(app.ruleName, formals.length, app.args.length, source);
    }
    return app;
  }
};

// The following grammar contains a few rules that couldn't be written  in "userland".
// At the bottom of src/main.js, we create a sub-grammar of this grammar that's called
// `BuiltInRules`. That grammar contains several convenience rules, e.g., `letter` and
// `digit`, and is implicitly the super-grammar of any grammar whose super-grammar
// isn't specified.
Grammar.ProtoBuiltInRules = new Grammar('ProtoBuiltInRules', // name
undefined, // supergrammar
{
  any: {
    body: pexprs.any,
    formals: [],
    description: 'any character',
    primitive: true
  },
  end: {
    body: pexprs.end,
    formals: [],
    description: 'end of input',
    primitive: true
  },

  caseInsensitive: {
    body: new CaseInsensitiveTerminal(new pexprs.Param(0)),
    formals: ['str'],
    primitive: true
  },
  lower: {
    body: new pexprs.UnicodeChar('Ll'),
    formals: [],
    description: 'a lowercase letter',
    primitive: true
  },
  upper: {
    body: new pexprs.UnicodeChar('Lu'),
    formals: [],
    description: 'an uppercase letter',
    primitive: true
  },
  // The union of Lt (titlecase), Lm (modifier), and Lo (other), i.e. any letter not in Ll or Lu.
  unicodeLtmo: {
    body: new pexprs.UnicodeChar('Ltmo'),
    formals: [],
    description: 'a Unicode character in Lt, Lm, or Lo',
    primitive: true
  },

  // These rules are not truly primitive (they could be written in userland) but are defined
  // here for bootstrapping purposes.
  spaces: {
    body: new pexprs.Star(new pexprs.Apply('space')),
    formals: []
  },
  space: {
    body: new pexprs.Range('\x00', ' '),
    formals: [],
    description: 'a space'
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;

},{"./CaseInsensitiveTerminal":31,"./Matcher":39,"./Semantics":42,"./common":44,"./errors":45,"./pexprs":64}],34:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Grammar = require('./Grammar');
var InputStream = require('./InputStream');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Constructors

function GrammarDecl(name) {
  this.name = name;
}

// Helpers

GrammarDecl.prototype.sourceInterval = function (startIdx, endIdx) {
  return this.source.subInterval(startIdx, endIdx - startIdx);
};

GrammarDecl.prototype.ensureSuperGrammar = function () {
  if (!this.superGrammar) {
    this.withSuperGrammar(
    // TODO: The conditional expression below is an ugly hack. It's kind of ok because
    // I doubt anyone will ever try to declare a grammar called `BuiltInRules`. Still,
    // we should try to find a better way to do this.
    this.name === 'BuiltInRules' ? Grammar.ProtoBuiltInRules : Grammar.BuiltInRules);
  }
  return this.superGrammar;
};

GrammarDecl.prototype.installOverriddenOrExtendedRule = function (name, formals, body, source) {
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
  }
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  var expectedFormals = ruleInfo.formals;
  var expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
  if (formals.length !== expectedNumFormals) {
    throw errors.wrongNumberOfParameters(name, expectedNumFormals, formals.length, source);
  }
  return this.install(name, formals, body, ruleInfo.description, source);
};

GrammarDecl.prototype.install = function (name, formals, body, description, source) {
  this.rules[name] = {
    body: body.introduceParams(formals),
    formals: formals,
    description: description,
    source: source
  };
  return this;
};

// Stuff that you should only do once

GrammarDecl.prototype.withSuperGrammar = function (superGrammar) {
  if (this.superGrammar) {
    throw new Error('the super grammar of a GrammarDecl cannot be set more than once');
  }
  this.superGrammar = superGrammar;
  this.rules = Object.create(superGrammar.rules);

  // Grammars with an explicit supergrammar inherit a default start rule.
  if (!superGrammar.isBuiltIn()) {
    this.defaultStartRule = superGrammar.defaultStartRule;
  }
  return this;
};

GrammarDecl.prototype.withDefaultStartRule = function (ruleName) {
  this.defaultStartRule = ruleName;
  return this;
};

GrammarDecl.prototype.withSource = function (source) {
  this.source = new InputStream(source).interval(0, source.length);
  return this;
};

// Creates a Grammar instance, and if it passes the sanity checks, returns it.
GrammarDecl.prototype.build = function () {
  var grammar = new Grammar(this.name, this.ensureSuperGrammar(), this.rules, this.defaultStartRule);

  // TODO: change the pexpr.prototype.assert... methods to make them add
  // exceptions to an array that's provided as an arg. Then we'll be able to
  // show more than one error of the same type at a time.
  // TODO: include the offending pexpr in the errors, that way we can show
  // the part of the source that caused it.
  var grammarErrors = [];
  var grammarHasInvalidApplications = false;
  Object.keys(grammar.rules).forEach(function (ruleName) {
    var body = grammar.rules[ruleName].body;
    try {
      body.assertChoicesHaveUniformArity(ruleName);
    } catch (e) {
      grammarErrors.push(e);
    }
    try {
      body.assertAllApplicationsAreValid(ruleName, grammar);
    } catch (e) {
      grammarErrors.push(e);
      grammarHasInvalidApplications = true;
    }
  });
  if (!grammarHasInvalidApplications) {
    // The following check can only be done if the grammar has no invalid applications.
    Object.keys(grammar.rules).forEach(function (ruleName) {
      var body = grammar.rules[ruleName].body;
      try {
        body.assertIteratedExprsAreNotNullable(grammar, []);
      } catch (e) {
        grammarErrors.push(e);
      }
    });
  }
  if (grammarErrors.length > 0) {
    errors.throwErrors(grammarErrors);
  }
  if (this.source) {
    grammar.source = this.source;
  }

  return grammar;
};

// Rule declarations

GrammarDecl.prototype.define = function (name, formals, body, description, source) {
  this.ensureSuperGrammar();
  if (this.superGrammar.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.superGrammar.name, source);
  } else if (this.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.name, source);
  }
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
  }
  return this.install(name, formals, body, description, source);
};

GrammarDecl.prototype.override = function (name, formals, body, descIgnored, source) {
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotOverrideUndeclaredRule(name, this.superGrammar.name, source);
  }
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

GrammarDecl.prototype.extend = function (name, formals, fragment, descIgnored, source) {
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotExtendUndeclaredRule(name, this.superGrammar.name, source);
  }
  var body = new pexprs.Extend(this.superGrammar, name, fragment);
  body.source = fragment.source;
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = GrammarDecl;

},{"./Grammar":33,"./InputStream":35,"./common":44,"./errors":45,"./pexprs":64}],35:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream(source) {
  this.source = source;
  this.pos = 0;
  this.examinedLength = 0;
}

InputStream.prototype = {
  atEnd: function atEnd() {
    var ans = this.pos === this.source.length;
    this.examinedLength = Math.max(this.examinedLength, this.pos + 1);
    return ans;
  },

  next: function next() {
    var ans = this.source[this.pos++];
    this.examinedLength = Math.max(this.examinedLength, this.pos);
    return ans;
  },

  matchString: function matchString(s, optIgnoreCase) {
    var idx;
    if (optIgnoreCase) {
      /*
        Case-insensitive comparison is a tricky business. Some notable gotchas include the
        "Turkish I" problem (http://www.i18nguy.com/unicode/turkish-i18n.html) and the fact
        that the German Esszet (ß) turns into "SS" in upper case.
         This is intended to be a locale-invariant comparison, which means it may not obey
        locale-specific expectations (e.g. "i" => "İ").
       */
      for (idx = 0; idx < s.length; idx++) {
        var actual = this.next();
        var expected = s[idx];
        if (actual == null || actual.toUpperCase() !== expected.toUpperCase()) {
          return false;
        }
      }
      return true;
    }
    // Default is case-sensitive comparison.
    for (idx = 0; idx < s.length; idx++) {
      if (this.next() !== s[idx]) {
        return false;
      }
    }
    return true;
  },

  sourceSlice: function sourceSlice(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  interval: function interval(startIdx, optEndIdx) {
    return new Interval(this.source, startIdx, optEndIdx ? optEndIdx : this.pos);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;

},{"./Interval":36}],36:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var assert = require('./common').assert;
var errors = require('./errors');
var util = require('./util');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(sourceString, startIdx, endIdx) {
  this.sourceString = sourceString;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Interval.coverage = function () /* interval1, interval2, ... */{
  var sourceString = arguments[0].sourceString;
  var startIdx = arguments[0].startIdx;
  var endIdx = arguments[0].endIdx;
  for (var idx = 1; idx < arguments.length; idx++) {
    var interval = arguments[idx];
    if (interval.sourceString !== sourceString) {
      throw errors.intervalSourcesDontMatch();
    } else {
      startIdx = Math.min(startIdx, arguments[idx].startIdx);
      endIdx = Math.max(endIdx, arguments[idx].endIdx);
    }
  }
  return new Interval(sourceString, startIdx, endIdx);
};

Interval.prototype = {
  coverageWith: function coverageWith() /* interval1, interval2, ... */{
    var intervals = Array.prototype.slice.call(arguments);
    intervals.push(this);
    return Interval.coverage.apply(undefined, intervals);
  },

  collapsedLeft: function collapsedLeft() {
    return new Interval(this.sourceString, this.startIdx, this.startIdx);
  },

  collapsedRight: function collapsedRight() {
    return new Interval(this.sourceString, this.endIdx, this.endIdx);
  },

  getLineAndColumnMessage: function getLineAndColumnMessage() {
    var range = [this.startIdx, this.endIdx];
    return util.getLineAndColumnMessage(this.sourceString, this.startIdx, range);
  },

  // Returns an array of 0, 1, or 2 intervals that represents the result of the
  // interval difference operation.
  minus: function minus(that) {
    if (this.sourceString !== that.sourceString) {
      throw errors.intervalSourcesDontMatch();
    } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
      // `this` and `that` are the same interval!
      return [];
    } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
      // `that` splits `this` into two intervals
      return [new Interval(this.sourceString, this.startIdx, that.startIdx), new Interval(this.sourceString, that.endIdx, this.endIdx)];
    } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
      // `that` contains a prefix of `this`
      return [new Interval(this.sourceString, that.endIdx, this.endIdx)];
    } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
      // `that` contains a suffix of `this`
      return [new Interval(this.sourceString, this.startIdx, that.startIdx)];
    } else {
      // `that` and `this` do not overlap
      return [this];
    }
  },

  // Returns a new Interval that has the same extent as this one, but which is relative
  // to `that`, an Interval that fully covers this one.
  relativeTo: function relativeTo(that) {
    if (this.sourceString !== that.sourceString) {
      throw errors.intervalSourcesDontMatch();
    }
    assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx, 'other interval does not cover this one');
    return new Interval(this.sourceString, this.startIdx - that.startIdx, this.endIdx - that.startIdx);
  },

  // Returns a new Interval which contains the same contents as this one,
  // but with whitespace trimmed from both ends. (This only makes sense when
  // the input stream is a string.)
  trimmed: function trimmed() {
    var contents = this.contents;
    var startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
    var endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
    return new Interval(this.sourceString, startIdx, endIdx);
  },

  subInterval: function subInterval(offset, len) {
    var newStartIdx = this.startIdx + offset;
    return new Interval(this.sourceString, newStartIdx, newStartIdx + len);
  }
};

Object.defineProperties(Interval.prototype, {
  contents: {
    get: function get() {
      if (this._contents === undefined) {
        this._contents = this.sourceString.slice(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  },
  length: {
    get: function get() {
      return this.endIdx - this.startIdx;
    },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;

},{"./common":44,"./errors":45,"./util":65}],37:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var util = require('./util');
var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function MatchResult(matcher, input, startExpr, cst, cstOffset, rightmostFailurePosition, optRecordedFailures) {

  this.matcher = matcher;
  this.input = input;
  this.startExpr = startExpr;
  this._cst = cst;
  this._cstOffset = cstOffset;
  this._rightmostFailurePosition = rightmostFailurePosition;
  this._rightmostFailures = optRecordedFailures;

  if (this.failed()) {
    common.defineLazyProperty(this, 'message', function () {
      var detail = 'Expected ' + this.getExpectedText();
      return util.getLineAndColumnMessage(this.input, this.getRightmostFailurePosition()) + detail;
    });
    common.defineLazyProperty(this, 'shortMessage', function () {
      var detail = 'expected ' + this.getExpectedText();
      var errorInfo = util.getLineAndColumn(this.input, this.getRightmostFailurePosition());
      return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ': ' + detail;
    });
  }
}

MatchResult.prototype.succeeded = function () {
  return !!this._cst;
};

MatchResult.prototype.failed = function () {
  return !this.succeeded();
};

MatchResult.prototype.getRightmostFailurePosition = function () {
  return this._rightmostFailurePosition;
};

MatchResult.prototype.getRightmostFailures = function () {
  if (!this._rightmostFailures) {
    this.matcher.setInput(this.input);
    var matchResultWithFailures = this.matcher._match(this.startExpr, false, this.getRightmostFailurePosition());
    this._rightmostFailures = matchResultWithFailures.getRightmostFailures();
  }
  return this._rightmostFailures;
};

MatchResult.prototype.toString = function () {
  return this.succeeded() ? '[match succeeded]' : '[match failed at position ' + this.getRightmostFailurePosition() + ']';
};

// Return a string summarizing the expected contents of the input stream when
// the match failure occurred.
MatchResult.prototype.getExpectedText = function () {
  if (this.succeeded()) {
    throw new Error('cannot get expected text of a successful MatchResult');
  }

  var sb = new common.StringBuffer();
  var failures = this.getRightmostFailures();

  // Filter out the fluffy failures to make the default error messages more useful
  failures = failures.filter(function (failure) {
    return !failure.isFluffy();
  });

  for (var idx = 0; idx < failures.length; idx++) {
    if (idx > 0) {
      if (idx === failures.length - 1) {
        sb.append(failures.length > 2 ? ', or ' : ' or ');
      } else {
        sb.append(', ');
      }
    }
    sb.append(failures[idx].toString());
  }
  return sb.contents();
};

MatchResult.prototype.getInterval = function () {
  var pos = this.getRightmostFailurePosition();
  return new Interval(this.input, pos, pos);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchResult;

},{"./Interval":36,"./common":44,"./util":65}],38:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var InputStream = require('./InputStream');
var MatchResult = require('./MatchResult');
var PosInfo = require('./PosInfo');
var Trace = require('./Trace');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

var applySpaces = new pexprs.Apply('spaces');

function MatchState(matcher, startExpr, optPositionToRecordFailures) {
  this.matcher = matcher;
  this.startExpr = startExpr;

  this.grammar = matcher.grammar;
  this.input = matcher.input;
  this.inputStream = new InputStream(matcher.input);
  this.memoTable = matcher.memoTable;

  this._bindings = [];
  this._bindingOffsets = [];
  this._applicationStack = [];
  this._posStack = [0];
  this.inLexifiedContextStack = [false];

  this.rightmostFailurePosition = -1;
  this._rightmostFailurePositionStack = [];
  this._recordedFailuresStack = [];

  if (optPositionToRecordFailures !== undefined) {
    this.positionToRecordFailures = optPositionToRecordFailures;
    this.recordedFailures = Object.create(null);
  }
}

MatchState.prototype = {
  posToOffset: function posToOffset(pos) {
    return pos - this._posStack[this._posStack.length - 1];
  },

  enterApplication: function enterApplication(posInfo, app) {
    this._posStack.push(this.inputStream.pos);
    this._applicationStack.push(app);
    this.inLexifiedContextStack.push(false);
    posInfo.enter(app);
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
    this.rightmostFailurePosition = -1;
  },

  exitApplication: function exitApplication(posInfo, optNode) {
    var origPos = this._posStack.pop();
    this._applicationStack.pop();
    this.inLexifiedContextStack.pop();
    posInfo.exit();

    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, this._rightmostFailurePositionStack.pop());

    if (optNode) {
      this.pushBinding(optNode, origPos);
    }
  },

  enterLexifiedContext: function enterLexifiedContext() {
    this.inLexifiedContextStack.push(true);
  },

  exitLexifiedContext: function exitLexifiedContext() {
    this.inLexifiedContextStack.pop();
  },

  currentApplication: function currentApplication() {
    return this._applicationStack[this._applicationStack.length - 1];
  },

  inSyntacticContext: function inSyntacticContext() {
    if (typeof this.inputStream.source !== 'string') {
      return false;
    }
    var currentApplication = this.currentApplication();
    if (currentApplication) {
      return currentApplication.isSyntactic() && !this.inLexifiedContext();
    } else {
      // The top-level context is syntactic if the start application is.
      return this.startExpr.factors[0].isSyntactic();
    }
  },

  inLexifiedContext: function inLexifiedContext() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  },

  skipSpaces: function skipSpaces() {
    this.pushFailuresInfo();
    this.eval(applySpaces);
    this.popBinding();
    this.popFailuresInfo();
    return this.inputStream.pos;
  },

  skipSpacesIfInSyntacticContext: function skipSpacesIfInSyntacticContext() {
    return this.inSyntacticContext() ? this.skipSpaces() : this.inputStream.pos;
  },

  maybeSkipSpacesBefore: function maybeSkipSpacesBefore(expr) {
    if (expr instanceof pexprs.Apply && expr.isSyntactic()) {
      return this.skipSpaces();
    } else if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
      return this.skipSpacesIfInSyntacticContext();
    } else {
      return this.inputStream.pos;
    }
  },

  pushBinding: function pushBinding(node, origPos) {
    this._bindings.push(node);
    this._bindingOffsets.push(this.posToOffset(origPos));
  },

  popBinding: function popBinding() {
    this._bindings.pop();
    this._bindingOffsets.pop();
  },

  numBindings: function numBindings() {
    return this._bindings.length;
  },

  truncateBindings: function truncateBindings(newLength) {
    // Yes, this is this really faster than setting the `length` property (tested with
    // bin/es5bench on Node v6.1.0).
    while (this._bindings.length > newLength) {
      this.popBinding();
    }
  },

  getCurrentPosInfo: function getCurrentPosInfo() {
    return this.getPosInfo(this.inputStream.pos);
  },

  getPosInfo: function getPosInfo(pos) {
    var posInfo = this.memoTable[pos];
    if (!posInfo) {
      posInfo = this.memoTable[pos] = new PosInfo();
    }
    return posInfo;
  },

  processFailure: function processFailure(pos, expr) {
    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, pos);

    if (this.recordedFailures && pos === this.positionToRecordFailures) {
      var app = this.currentApplication();
      if (app) {
        // Substitute parameters with the actual pexprs that were passed to
        // the current rule.
        expr = expr.substituteParams(app.args);
      } else {
        // This branch is only reached for the "end-check" that is
        // performed after the top-level application. In that case,
        // expr === pexprs.end so there is no need to substitute
        // parameters.
      }

      this.recordFailure(expr.toFailure(this.grammar), false);
    }
  },

  recordFailure: function recordFailure(failure, shouldCloneIfNew) {
    var key = failure.toKey();
    if (!this.recordedFailures[key]) {
      this.recordedFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
    } else if (this.recordedFailures[key].isFluffy() && !failure.isFluffy()) {
      this.recordedFailures[key].clearFluffy();
    }
  },

  recordFailures: function recordFailures(failures, shouldCloneIfNew) {
    var self = this;
    Object.keys(failures).forEach(function (key) {
      self.recordFailure(failures[key], shouldCloneIfNew);
    });
  },

  cloneRecordedFailures: function cloneRecordedFailures() {
    if (!this.recordedFailures) {
      return undefined;
    }

    var ans = Object.create(null);
    var self = this;
    Object.keys(this.recordedFailures).forEach(function (key) {
      ans[key] = self.recordedFailures[key].clone();
    });
    return ans;
  },

  getRightmostFailurePosition: function getRightmostFailurePosition() {
    return this.rightmostFailurePosition;
  },

  _getRightmostFailureOffset: function _getRightmostFailureOffset() {
    return this.rightmostFailurePosition >= 0 ? this.posToOffset(this.rightmostFailurePosition) : -1;
  },

  // Returns the memoized trace entry for `expr` at `pos`, if one exists, `null` otherwise.
  getMemoizedTraceEntry: function getMemoizedTraceEntry(pos, expr) {
    var posInfo = this.memoTable[pos];
    if (posInfo && expr.ruleName) {
      var memoRec = posInfo.memo[expr.toMemoKey()];
      if (memoRec && memoRec.traceEntry) {
        var entry = memoRec.traceEntry.cloneWithExpr(expr);
        entry.isMemoized = true;
        return entry;
      }
    }
    return null;
  },

  // Returns a new trace entry, with the currently active trace array as its children.
  getTraceEntry: function getTraceEntry(pos, expr, succeeded, bindings) {
    if (expr instanceof pexprs.Apply) {
      var app = this.currentApplication();
      var actuals = app ? app.args : [];
      expr = expr.substituteParams(actuals);
    }
    return this.getMemoizedTraceEntry(pos, expr) || new Trace(this.input, pos, this.inputStream.pos, expr, succeeded, bindings, this.trace);
  },

  isTracing: function isTracing() {
    return !!this.trace;
  },

  hasNecessaryInfo: function hasNecessaryInfo(memoRec) {
    if (this.trace && !memoRec.traceEntry) {
      return false;
    }

    if (this.recordedFailures && this.inputStream.pos + memoRec.rightmostFailureOffset === this.positionToRecordFailures) {
      return !!memoRec.failuresAtRightmostPosition;
    }

    return true;
  },

  useMemoizedResult: function useMemoizedResult(origPos, memoRec) {
    if (this.trace) {
      this.trace.push(memoRec.traceEntry);
    }

    var memoRecRightmostFailurePosition = this.inputStream.pos + memoRec.rightmostFailureOffset;
    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, memoRecRightmostFailurePosition);
    if (this.recordedFailures && this.positionToRecordFailures === memoRecRightmostFailurePosition && memoRec.failuresAtRightmostPosition) {
      this.recordFailures(memoRec.failuresAtRightmostPosition, true);
    }

    this.inputStream.examinedLength = Math.max(this.inputStream.examinedLength, memoRec.examinedLength + origPos);

    if (memoRec.value) {
      this.inputStream.pos += memoRec.matchLength;
      this.pushBinding(memoRec.value, origPos);
      return true;
    }
    return false;
  },

  // Evaluate `expr` and return `true` if it succeeded, `false` otherwise. On success, `bindings`
  // will have `expr.getArity()` more elements than before, and the input stream's position may
  // have increased. On failure, `bindings` and position will be unchanged.
  eval: function _eval(expr) {
    var inputStream = this.inputStream;
    var origNumBindings = this._bindings.length;

    var origRecordedFailures;
    if (this.recordedFailures) {
      origRecordedFailures = this.recordedFailures;
      this.recordedFailures = Object.create(null);
    }

    var origPos = inputStream.pos;
    var memoPos = this.maybeSkipSpacesBefore(expr);

    var origTrace;
    if (this.trace) {
      origTrace = this.trace;
      this.trace = [];
    }

    // Do the actual evaluation.
    var ans = expr.eval(this);

    if (this.trace) {
      var bindings = this._bindings.slice(origNumBindings);
      var traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
      traceEntry.isImplicitSpaces = expr === applySpaces;
      traceEntry.isRootNode = expr === this.startExpr;
      origTrace.push(traceEntry);
      this.trace = origTrace;
    }

    if (ans) {
      if (this.recordedFailures && inputStream.pos === this.positionToRecordFailures) {
        var self = this;
        Object.keys(this.recordedFailures).forEach(function (key) {
          self.recordedFailures[key].makeFluffy();
        });
      }
    } else {
      // Reset the position and the bindings.
      inputStream.pos = origPos;
      this.truncateBindings(origNumBindings);
    }

    if (this.recordedFailures) {
      this.recordFailures(origRecordedFailures, false);
    }

    return ans;
  },

  getMatchResult: function getMatchResult() {
    this.eval(this.startExpr);
    var rightmostFailures;
    if (this.recordedFailures) {
      var self = this;
      rightmostFailures = Object.keys(this.recordedFailures).map(function (key) {
        return self.recordedFailures[key];
      });
    }
    return new MatchResult(this.matcher, this.input, this.startExpr, this._bindings[0], this._bindingOffsets[0], this.rightmostFailurePosition, rightmostFailures);
  },

  getTrace: function getTrace() {
    this.trace = [];
    var matchResult = this.getMatchResult();

    // The trace node for the start rule is always the last entry. If it is a syntactic rule,
    // the first entry is for an application of 'spaces'.
    // TODO(pdubroy): Clean this up by introducing a special `Match<startAppl>` rule, which will
    // ensure that there is always a single root trace node.
    var rootTrace = this.trace[this.trace.length - 1];
    rootTrace.result = matchResult;
    return rootTrace;
  },

  pushFailuresInfo: function pushFailuresInfo() {
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
    this._recordedFailuresStack.push(this.recordedFailures);
  },

  popFailuresInfo: function popFailuresInfo() {
    this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop();
    this.recordedFailures = this._recordedFailuresStack.pop();
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchState;

},{"./InputStream":35,"./MatchResult":37,"./PosInfo":41,"./Trace":43,"./pexprs":64}],39:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var MatchState = require('./MatchState');

var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Matcher(grammar) {
  this.grammar = grammar;
  this.memoTable = [];
  this.input = '';
}

Matcher.prototype.getInput = function () {
  return this.input;
};

Matcher.prototype.setInput = function (str) {
  if (this.input !== str) {
    this.replaceInputRange(0, this.input.length, str);
  }
  return this;
};

Matcher.prototype.replaceInputRange = function (startIdx, endIdx, str) {
  var currentInput = this.input;
  if (startIdx < 0 || startIdx > currentInput.length || endIdx < 0 || endIdx > currentInput.length || startIdx > endIdx) {
    throw new Error('Invalid indices: ' + startIdx + ' and ' + endIdx);
  }

  // update input
  this.input = currentInput.slice(0, startIdx) + str + currentInput.slice(endIdx);

  // update memo table (similar to the above)
  var restOfMemoTable = this.memoTable.slice(endIdx);
  this.memoTable.length = startIdx;
  for (var idx = 0; idx < str.length; idx++) {
    this.memoTable.push(undefined);
  }
  restOfMemoTable.forEach(function (posInfo) {
    this.memoTable.push(posInfo);
  }, this);

  // Invalidate memoRecs
  for (var pos = 0; pos < startIdx; pos++) {
    var posInfo = this.memoTable[pos];
    if (posInfo) {
      posInfo.clearObsoleteEntries(pos, startIdx);
    }
  }

  return this;
};

Matcher.prototype.match = function (optStartApplicationStr) {
  return this._match(this._getStartExpr(optStartApplicationStr), false);
};

Matcher.prototype.trace = function (optStartApplicationStr) {
  return this._match(this._getStartExpr(optStartApplicationStr), true);
};

Matcher.prototype._match = function (startExpr, tracing, optPositionToRecordFailures) {
  var state = new MatchState(this, startExpr, optPositionToRecordFailures);
  return tracing ? state.getTrace() : state.getMatchResult();
};

/*
  Returns the starting expression for this Matcher's associated grammar. If `optStartApplicationStr`
  is specified, it is a string expressing a rule application in the grammar. If not specified, the
  grammar's default start rule will be used.
*/
Matcher.prototype._getStartExpr = function (optStartApplicationStr) {
  var applicationStr = optStartApplicationStr || this.grammar.defaultStartRule;
  if (!applicationStr) {
    throw new Error('Missing start rule argument -- the grammar has no default start rule.');
  }

  var startApp = this.grammar.parseApplication(applicationStr);
  return new pexprs.Seq([startApp, pexprs.end]);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Matcher;

},{"./MatchState":38,"./pexprs":64}],40:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Namespace() {}
Namespace.prototype = Object.create(null);

Namespace.asNamespace = function (objOrNamespace) {
  if (objOrNamespace instanceof Namespace) {
    return objOrNamespace;
  }
  return Namespace.createNamespace(objOrNamespace);
};

// Create a new namespace. If `optProps` is specified, all of its properties
// will be copied to the new namespace.
Namespace.createNamespace = function (optProps) {
  return Namespace.extend(Namespace.prototype, optProps);
};

// Create a new namespace which extends another namespace. If `optProps` is
// specified, all of its properties will be copied to the new namespace.
Namespace.extend = function (namespace, optProps) {
  if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
    throw new TypeError('not a Namespace object: ' + namespace);
  }
  var ns = Object.create(namespace, {
    constructor: {
      value: Namespace,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return extend(ns, optProps);
};

// TODO: Should this be a regular method?
Namespace.toString = function (ns) {
  return Object.prototype.toString.call(ns);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;

},{"util-extend":29}],41:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo() {
  this.applicationMemoKeyStack = []; // active applications at this position
  this.memo = {};
  this.maxExaminedLength = 0;
  this.maxRightmostFailureOffset = -1;
  this.currentLeftRecursion = undefined;
}

PosInfo.prototype = {
  isActive: function isActive(application) {
    return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
  },

  enter: function enter(application) {
    this.applicationMemoKeyStack.push(application.toMemoKey());
  },

  exit: function exit() {
    this.applicationMemoKeyStack.pop();
  },

  startLeftRecursion: function startLeftRecursion(headApplication, memoRec) {
    memoRec.isLeftRecursion = true;
    memoRec.headApplication = headApplication;
    memoRec.nextLeftRecursion = this.currentLeftRecursion;
    this.currentLeftRecursion = memoRec;

    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    var indexOfFirstInvolvedRule = applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
    var involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);

    memoRec.isInvolved = function (applicationMemoKey) {
      return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
    };

    memoRec.updateInvolvedApplicationMemoKeys = function () {
      for (var idx = indexOfFirstInvolvedRule; idx < applicationMemoKeyStack.length; idx++) {
        var applicationMemoKey = applicationMemoKeyStack[idx];
        if (!this.isInvolved(applicationMemoKey)) {
          involvedApplicationMemoKeys.push(applicationMemoKey);
        }
      }
    };
  },

  endLeftRecursion: function endLeftRecursion() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  },

  // Note: this method doesn't get called for the "head" of a left recursion -- for LR heads,
  // the memoized result (which starts out being a failure) is always used.
  shouldUseMemoizedResult: function shouldUseMemoizedResult(memoRec) {
    if (!memoRec.isLeftRecursion) {
      return true;
    }
    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    for (var idx = 0; idx < applicationMemoKeyStack.length; idx++) {
      var applicationMemoKey = applicationMemoKeyStack[idx];
      if (memoRec.isInvolved(applicationMemoKey)) {
        return false;
      }
    }
    return true;
  },

  memoize: function memoize(memoKey, memoRec) {
    this.memo[memoKey] = memoRec;
    this.maxExaminedLength = Math.max(this.maxExaminedLength, memoRec.examinedLength);
    this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
    return memoRec;
  },

  clearObsoleteEntries: function clearObsoleteEntries(pos, invalidatedIdx) {
    if (pos + this.maxExaminedLength <= invalidatedIdx) {
      // Optimization: none of the rule applications that were memoized here examined the
      // interval of the input that changed, so nothing has to be invalidated.
      return;
    }

    var memo = this.memo;
    this.maxExaminedLength = 0;
    this.maxRightmostFailureOffset = -1;
    var self = this;
    Object.keys(memo).forEach(function (k) {
      var memoRec = memo[k];
      if (pos + memoRec.examinedLength > invalidatedIdx) {
        delete memo[k];
      } else {
        self.maxExaminedLength = Math.max(self.maxExaminedLength, memoRec.examinedLength);
        self.maxRightmostFailureOffset = Math.max(self.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
      }
    });
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;

},{}],42:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var _Symbol = require('es6-symbol'); // eslint-disable-line no-undef
var inherits = require('inherits');

var InputStream = require('./InputStream');
var IterationNode = require('./nodes').IterationNode;
var MatchResult = require('./MatchResult');
var common = require('./common');
var errors = require('./errors');
var util = require('./util');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

var globalActionStack = [];
var prototypeGrammar;
var prototypeGrammarSemantics;

// JSON is not a valid subset of JavaScript because there are two possible line terminators,
// U+2028 (line separator) and U+2029 (paragraph separator) that are allowed in JSON strings
// but not in JavaScript strings.
// jsonToJS() properly encodes those two characters in JSON so that it can seamlessly be
// inserted into JavaScript code (plus the encoded version is still valid JSON)
function jsonToJS(str) {
  var output = str.replace(/[\u2028\u2029]/g, function (char, pos, str) {
    var hex = char.codePointAt(0).toString(16);
    return '\\u' + '0000'.slice(hex.length) + hex;
  });
  return output;
}

// ----------------- Wrappers -----------------

// Wrappers decorate CST nodes with all of the functionality (i.e., operations and attributes)
// provided by a Semantics (see below). `Wrapper` is the abstract superclass of all wrappers. A
// `Wrapper` must have `_node` and `_semantics` instance variables, which refer to the CST node and
// Semantics (resp.) for which it was created, and a `_childWrappers` instance variable which is
// used to cache the wrapper instances that are created for its child nodes. Setting these instance
// variables is the responsibility of the constructor of each Semantics-specific subclass of
// `Wrapper`.
function Wrapper() {}

Wrapper.prototype.toString = function () {
  return '[semantics wrapper for ' + this._node.grammar.name + ']';
};

// This is used by ohm editor to display a node wrapper appropriately.
Wrapper.prototype.toJSON = function () {
  return this.toString();
};

Wrapper.prototype._forgetMemoizedResultFor = function (attributeName) {
  // Remove the memoized attribute from the cstNode and all its children.
  delete this._node[this._semantics.attributeKeys[attributeName]];
  this.children.forEach(function (child) {
    child._forgetMemoizedResultFor(attributeName);
  });
};

// Returns the wrapper of the specified child node. Child wrappers are created lazily and cached in
// the parent wrapper's `_childWrappers` instance variable.
Wrapper.prototype.child = function (idx) {
  if (!(0 <= idx && idx < this._node.numChildren())) {
    // TODO: Consider throwing an exception here.
    return undefined;
  }
  var childWrapper = this._childWrappers[idx];
  if (!childWrapper) {
    var childNode = this._node.childAt(idx);
    var offset = this._node.childOffsets[idx];

    var source = this._baseInterval.subInterval(offset, childNode.matchLength);
    var base = childNode.isNonterminal() ? source : this._baseInterval;
    childWrapper = this._childWrappers[idx] = this._semantics.wrap(childNode, source, base);
  }
  return childWrapper;
};

// Returns an array containing the wrappers of all of the children of the node associated with this
// wrapper.
Wrapper.prototype._children = function () {
  // Force the creation of all child wrappers
  for (var idx = 0; idx < this._node.numChildren(); idx++) {
    this.child(idx);
  }
  return this._childWrappers;
};

// Returns `true` if the CST node associated with this wrapper corresponds to an iteration
// expression, i.e., a Kleene-*, Kleene-+, or an optional. Returns `false` otherwise.
Wrapper.prototype.isIteration = function () {
  return this._node.isIteration();
};

// Returns `true` if the CST node associated with this wrapper is a terminal node, `false`
// otherwise.
Wrapper.prototype.isTerminal = function () {
  return this._node.isTerminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node, `false`
// otherwise.
Wrapper.prototype.isNonterminal = function () {
  return this._node.isNonterminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a syntactic rule, `false` otherwise.
Wrapper.prototype.isSyntactic = function () {
  return this.isNonterminal() && this._node.isSyntactic();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a lexical rule, `false` otherwise.
Wrapper.prototype.isLexical = function () {
  return this.isNonterminal() && this._node.isLexical();
};

// Returns `true` if the CST node associated with this wrapper is an iterator node
// having either one or no child (? operator), `false` otherwise.
// Otherwise, throws an exception.
Wrapper.prototype.isOptional = function () {
  return this._node.isOptional();
};

// Create a new _iter wrapper in the same semantics as this wrapper.
Wrapper.prototype.iteration = function (optChildWrappers) {
  var childWrappers = optChildWrappers || [];

  var childNodes = childWrappers.map(function (c) {
    return c._node;
  });
  var iter = new IterationNode(this._node.grammar, childNodes, [], -1, false);

  var wrapper = this._semantics.wrap(iter, null, null);
  wrapper._childWrappers = childWrappers;
  return wrapper;
};

Object.defineProperties(Wrapper.prototype, {
  // Returns an array containing the children of this CST node.
  children: { get: function get() {
      return this._children();
    } },

  // Returns the name of grammar rule that created this CST node.
  ctorName: { get: function get() {
      return this._node.ctorName;
    } },

  // TODO: Remove this eventually (deprecated in v0.12).
  interval: { get: function get() {
      throw new Error('The `interval` property is deprecated -- use `source` instead');
    } },

  // Returns the number of children of this CST node.
  numChildren: { get: function get() {
      return this._node.numChildren();
    } },

  // Returns the primitive value of this CST node, if it's a terminal node. Otherwise,
  // throws an exception.
  primitiveValue: {
    get: function get() {
      if (this.isTerminal()) {
        return this._node.primitiveValue;
      }
      throw new TypeError("tried to access the 'primitiveValue' attribute of a non-terminal CST node");
    }
  },

  // Returns the contents of the input stream consumed by this CST node.
  sourceString: { get: function get() {
      return this.source.contents;
    } }
});

// ----------------- Semantics -----------------

// A Semantics is a container for a family of Operations and Attributes for a given grammar.
// Semantics enable modularity (different clients of a grammar can create their set of operations
// and attributes in isolation) and extensibility even when operations and attributes are mutually-
// recursive. This constructor should not be called directly except from
// `Semantics.createSemantics`. The normal ways to create a Semantics, given a grammar 'g', are
// `g.createSemantics()` and `g.extendSemantics(parentSemantics)`.
function Semantics(grammar, superSemantics) {
  var self = this;
  this.grammar = grammar;
  this.checkedActionDicts = false;

  // Constructor for wrapper instances, which are passed as the arguments to the semantic actions
  // of an operation or attribute. Operations and attributes require double dispatch: the semantic
  // action is chosen based on both the node's type and the semantics. Wrappers ensure that
  // the `execute` method is called with the correct (most specific) semantics object as an
  // argument.
  this.Wrapper = function (node, sourceInterval, baseInterval) {
    self.checkActionDictsIfHaventAlready();
    this._semantics = self;
    this._node = node;
    this.source = sourceInterval;

    // The interval that the childOffsets of `node` are relative to. It should be the source
    // of the closest Nonterminal node.
    this._baseInterval = baseInterval;

    if (node.isNonterminal()) {
      common.assert(sourceInterval === baseInterval);
    }

    this._childWrappers = [];
  };

  this.super = superSemantics;
  if (superSemantics) {
    if (!(grammar.equals(this.super.grammar) || grammar._inheritsFrom(this.super.grammar))) {
      throw new Error("Cannot extend a semantics for grammar '" + this.super.grammar.name + "' for use with grammar '" + grammar.name + "' (not a sub-grammar)");
    }
    inherits(this.Wrapper, this.super.Wrapper);
    this.operations = Object.create(this.super.operations);
    this.attributes = Object.create(this.super.attributes);
    this.attributeKeys = Object.create(null);

    // Assign unique symbols for each of the attributes inherited from the super-semantics so that
    // they are memoized independently.
    for (var attributeName in this.attributes) {
      this.attributeKeys[attributeName] = _Symbol();
    }
  } else {
    inherits(this.Wrapper, Wrapper);
    this.operations = Object.create(null);
    this.attributes = Object.create(null);
    this.attributeKeys = Object.create(null);
  }
}

Semantics.prototype.toString = function () {
  return '[semantics for ' + this.grammar.name + ']';
};

Semantics.prototype.checkActionDictsIfHaventAlready = function () {
  if (!this.checkedActionDicts) {
    this.checkActionDicts();
    this.checkedActionDicts = true;
  }
};

// Checks that the action dictionaries for all operations and attributes in this semantics,
// including the ones that were inherited from the super-semantics, agree with the grammar.
// Throws an exception if one or more of them doesn't.
Semantics.prototype.checkActionDicts = function () {
  var name;
  for (name in this.operations) {
    this.operations[name].checkActionDict(this.grammar);
  }
  for (name in this.attributes) {
    this.attributes[name].checkActionDict(this.grammar);
  }
};

Semantics.prototype.toRecipe = function (semanticsOnly) {
  function hasSuperSemantics(s) {
    return s.super !== Semantics.BuiltInSemantics._getSemantics();
  }

  var str = '(function(g) {\n';
  if (hasSuperSemantics(this)) {
    str += '  var semantics = ' + this.super.toRecipe(true) + '(g';

    var superSemanticsGrammar = this.super.grammar;
    var relatedGrammar = this.grammar;
    while (relatedGrammar !== superSemanticsGrammar) {
      str += '.superGrammar';
      relatedGrammar = relatedGrammar.superGrammar;
    }

    str += ');\n';
    str += '  return g.extendSemantics(semantics)';
  } else {
    str += '  return g.createSemantics()';
  }
  ['Operation', 'Attribute'].forEach(function (type) {
    var semanticOperations = this[type.toLowerCase() + 's'];
    Object.keys(semanticOperations).forEach(function (name) {
      var signature = name;
      if (semanticOperations[name].formals.length > 0) {
        signature += '(' + semanticOperations[name].formals.join(', ') + ')';
      }

      var method;
      if (hasSuperSemantics(this) && this.super[type.toLowerCase() + 's'][name]) {
        method = 'extend' + type;
      } else {
        method = 'add' + type;
      }
      str += '\n    .' + method + '(' + JSON.stringify(signature) + ', {';

      var actions = semanticOperations[name].actionDict;
      var srcArray = [];
      Object.keys(actions).forEach(function (actionName) {
        if (semanticOperations[name].builtInDefault !== actions[actionName]) {
          srcArray.push('\n      ' + JSON.stringify(actionName) + ': ' + actions[actionName].toString());
        }
      });
      str += srcArray.join(',');

      str += '\n    })';
    }, this);
  }, this);
  str += ';\n  })';

  if (!semanticsOnly) {
    str = '(function() {\n' + '  var grammar = this.fromRecipe(' + jsonToJS(this.grammar.toRecipe()) + ');\n' + '  var semantics = ' + str + '(grammar);\n' + '  return semantics;\n' + '});\n';
  }

  return str;
};

function parseSignature(signature, type) {
  if (!prototypeGrammar) {
    // The Operations and Attributes grammar won't be available while Ohm is loading,
    // but we can get away the following simplification b/c none of the operations
    // that are used while loading take arguments.
    common.assert(signature.indexOf('(') === -1);
    return {
      name: signature,
      formals: []
    };
  }

  var r = prototypeGrammar.match(signature, type === 'operation' ? 'OperationSignature' : 'AttributeSignature');
  if (r.failed()) {
    throw new Error(r.message);
  }

  return prototypeGrammarSemantics(r).parse();
}

function newDefaultAction(type, name, doIt) {
  return function (children) {
    var self = this;
    var thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
    var args = thisThing.formals.map(function (formal) {
      return self.args[formal];
    });

    if (this.isIteration()) {
      // This CST node corresponds to an iteration expression in the grammar (*, +, or ?). The
      // default behavior is to map this operation or attribute over all of its child nodes.
      return children.map(function (child) {
        return doIt.apply(child, args);
      });
    }

    // This CST node corresponds to a non-terminal in the grammar (e.g., AddExpr). The fact that
    // we got here means that this action dictionary doesn't have an action for this particular
    // non-terminal or a generic `_nonterminal` action.
    if (children.length === 1) {
      // As a convenience, if this node only has one child, we just return the result of
      // applying this operation / attribute to the child node.
      return doIt.apply(children[0], args);
    } else {
      // Otherwise, we throw an exception to let the programmer know that we don't know what
      // to do with this node.
      throw errors.missingSemanticAction(this.ctorName, name, type, globalActionStack);
    }
  };
}

Semantics.prototype.addOperationOrAttribute = function (type, signature, actionDict) {
  var typePlural = type + 's';

  var parsedNameAndFormalArgs = parseSignature(signature, type);
  var name = parsedNameAndFormalArgs.name;
  var formals = parsedNameAndFormalArgs.formals;

  // TODO: check that there are no duplicate formal arguments

  this.assertNewName(name, type);

  // Create the action dictionary for this operation / attribute that contains a `_default` action
  // which defines the default behavior of iteration, terminal, and non-terminal nodes...
  var builtInDefault = newDefaultAction(type, name, doIt);
  var realActionDict = { _default: builtInDefault };
  // ... and add in the actions supplied by the programmer, which may override some or all of the
  // default ones.
  Object.keys(actionDict).forEach(function (name) {
    realActionDict[name] = actionDict[name];
  });

  var entry = type === 'operation' ? new Operation(name, formals, realActionDict, builtInDefault) : new Attribute(name, realActionDict, builtInDefault);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  entry.checkActionDict(this.grammar);

  this[typePlural][name] = entry;

  function doIt() {
    // Dispatch to most specific version of this operation / attribute -- it may have been
    // overridden by a sub-semantics.
    var thisThing = this._semantics[typePlural][name];

    // Check that the caller passed the correct number of arguments.
    if (arguments.length !== thisThing.formals.length) {
      throw new Error('Invalid number of arguments passed to ' + name + ' ' + type + ' (expected ' + thisThing.formals.length + ', got ' + arguments.length + ')');
    }

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    var args = Object.create(null);
    for (var idx = 0; idx < arguments.length; idx++) {
      var formal = thisThing.formals[idx];
      args[formal] = arguments[idx];
    }

    var oldArgs = this.args;
    this.args = args;
    var ans = thisThing.execute(this._semantics, this);
    this.args = oldArgs;
    return ans;
  }

  if (type === 'operation') {
    this.Wrapper.prototype[name] = doIt;
    this.Wrapper.prototype[name].toString = function () {
      return '[' + name + ' operation]';
    };
  } else {
    Object.defineProperty(this.Wrapper.prototype, name, {
      get: doIt,
      configurable: true // So the property can be deleted.
    });
    this.attributeKeys[name] = _Symbol();
  }
};

Semantics.prototype.extendOperationOrAttribute = function (type, name, actionDict) {
  var typePlural = type + 's';

  // Make sure that `name` really is just a name, i.e., that it doesn't also contain formals.
  parseSignature(name, 'attribute');

  if (!(this.super && name in this.super[typePlural])) {
    throw new Error('Cannot extend ' + type + " '" + name + "': did not inherit an " + type + ' with that name');
  }
  if (Object.prototype.hasOwnProperty.call(this[typePlural], name)) {
    throw new Error('Cannot extend ' + type + " '" + name + "' again");
  }

  // Create a new operation / attribute whose actionDict delegates to the super operation /
  // attribute's actionDict, and which has all the keys from `inheritedActionDict`.
  var inheritedFormals = this[typePlural][name].formals;
  var inheritedActionDict = this[typePlural][name].actionDict;
  var newActionDict = Object.create(inheritedActionDict);
  Object.keys(actionDict).forEach(function (name) {
    newActionDict[name] = actionDict[name];
  });

  this[typePlural][name] = type === 'operation' ? new Operation(name, inheritedFormals, newActionDict) : new Attribute(name, newActionDict);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  this[typePlural][name].checkActionDict(this.grammar);
};

Semantics.prototype.assertNewName = function (name, type) {
  if (Wrapper.prototype.hasOwnProperty(name)) {
    throw new Error('Cannot add ' + type + " '" + name + "': that's a reserved name");
  }
  if (name in this.operations) {
    throw new Error('Cannot add ' + type + " '" + name + "': an operation with that name already exists");
  }
  if (name in this.attributes) {
    throw new Error('Cannot add ' + type + " '" + name + "': an attribute with that name already exists");
  }
};

// Returns a wrapper for the given CST `node` in this semantics.
// If `node` is already a wrapper, returns `node` itself.  // TODO: why is this needed?
Semantics.prototype.wrap = function (node, source, optBaseInterval) {
  var baseInterval = optBaseInterval || source;
  return node instanceof this.Wrapper ? node : new this.Wrapper(node, source, baseInterval);
};

// Creates a new Semantics instance for `grammar`, inheriting operations and attributes from
// `optSuperSemantics`, if it is specified. Returns a function that acts as a proxy for the new
// Semantics instance. When that function is invoked with a CST node as an argument, it returns
// a wrapper for that node which gives access to the operations and attributes provided by this
// semantics.
Semantics.createSemantics = function (grammar, optSuperSemantics) {
  var s = new Semantics(grammar, optSuperSemantics !== undefined ? optSuperSemantics : Semantics.BuiltInSemantics._getSemantics());

  // To enable clients to invoke a semantics like a function, return a function that acts as a proxy
  // for `s`, which is the real `Semantics` instance.
  var proxy = function ASemantics(matchResult) {
    if (!(matchResult instanceof MatchResult)) {
      throw new TypeError('Semantics expected a MatchResult, but got ' + common.unexpectedObjToString(matchResult));
    }
    if (matchResult.failed()) {
      throw new TypeError('cannot apply Semantics to ' + matchResult.toString());
    }

    var cst = matchResult._cst;
    if (cst.grammar !== grammar) {
      throw new Error("Cannot use a MatchResult from grammar '" + cst.grammar.name + "' with a semantics for '" + grammar.name + "'");
    }
    var inputStream = new InputStream(matchResult.input);
    return s.wrap(cst, inputStream.interval(matchResult._cstOffset, matchResult.input.length));
  };

  // Forward public methods from the proxy to the semantics instance.
  proxy.addOperation = function (signature, actionDict) {
    s.addOperationOrAttribute('operation', signature, actionDict);
    return proxy;
  };
  proxy.extendOperation = function (name, actionDict) {
    s.extendOperationOrAttribute('operation', name, actionDict);
    return proxy;
  };
  proxy.addAttribute = function (name, actionDict) {
    s.addOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy.extendAttribute = function (name, actionDict) {
    s.extendOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy._getActionDict = function (operationOrAttributeName) {
    var action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
    if (!action) {
      throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute ' + 'name in this semantics for "' + grammar.name + '"');
    }
    return action.actionDict;
  };
  proxy._remove = function (operationOrAttributeName) {
    var semantic;
    if (operationOrAttributeName in s.operations) {
      semantic = s.operations[operationOrAttributeName];
      delete s.operations[operationOrAttributeName];
    } else if (operationOrAttributeName in s.attributes) {
      semantic = s.attributes[operationOrAttributeName];
      delete s.attributes[operationOrAttributeName];
    }
    delete s.Wrapper.prototype[operationOrAttributeName];
    return semantic;
  };
  proxy.getOperationNames = function () {
    return Object.keys(s.operations);
  };
  proxy.getAttributeNames = function () {
    return Object.keys(s.attributes);
  };
  proxy.getGrammar = function () {
    return s.grammar;
  };
  proxy.toRecipe = function (semanticsOnly) {
    return s.toRecipe(semanticsOnly);
  };

  // Make the proxy's toString() work.
  proxy.toString = s.toString.bind(s);

  // Returns the semantics for the proxy.
  proxy._getSemantics = function () {
    return s;
  };

  return proxy;
};

// ----------------- Operation -----------------

// An Operation represents a function to be applied to a concrete syntax tree (CST) -- it's very
// similar to a Visitor (http://en.wikipedia.org/wiki/Visitor_pattern). An operation is executed by
// recursively walking the CST, and at each node, invoking the matching semantic action from
// `actionDict`. See `Operation.prototype.execute` for details of how a CST node's matching semantic
// action is found.
function Operation(name, formals, actionDict, builtInDefault) {
  this.name = name;
  this.formals = formals;
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}

Operation.prototype.typeName = 'operation';

Operation.prototype.checkActionDict = function (grammar) {
  grammar._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
};

// Execute this operation on the CST node associated with `nodeWrapper` in the context of the given
// Semantics instance.
Operation.prototype.execute = function (semantics, nodeWrapper) {
  try {
    // Look for a semantic action whose name matches the node's constructor name, which is either
    // the name of a rule in the grammar, or '_terminal' (for a terminal node), or '_iter' (for an
    // iteration node). In the latter case, the action function receives a single argument, which
    // is an array containing all of the children of the CST node.
    var ctorName = nodeWrapper._node.ctorName;
    var actionFn = this.actionDict[ctorName];
    var ans;
    if (actionFn) {
      globalActionStack.push([this, ctorName]);
      ans = this.doAction(semantics, nodeWrapper, actionFn, nodeWrapper.isIteration());
      return ans;
    }

    // The action dictionary does not contain a semantic action for this specific type of node.
    // If this is a nonterminal node and the programmer has provided a `_nonterminal` semantic
    // action, we invoke it:
    if (nodeWrapper.isNonterminal()) {
      actionFn = this.actionDict._nonterminal;
      if (actionFn) {
        globalActionStack.push([this, '_nonterminal', ctorName]);
        ans = this.doAction(semantics, nodeWrapper, actionFn, true);
        return ans;
      }
    }

    // Otherwise, we invoke the '_default' semantic action.
    globalActionStack.push([this, 'default action', ctorName]);
    ans = this.doAction(semantics, nodeWrapper, this.actionDict._default, true);
    return ans;
  } finally {
    globalActionStack.pop();
  }
};

// Invoke `actionFn` on the CST node that corresponds to `nodeWrapper`, in the context of
// `semantics`. If `optPassChildrenAsArray` is truthy, `actionFn` will be called with a single
// argument, which is an array of wrappers. Otherwise, the number of arguments to `actionFn` will
// be equal to the number of children in the CST node.
Operation.prototype.doAction = function (semantics, nodeWrapper, actionFn, optPassChildrenAsArray) {
  return optPassChildrenAsArray ? actionFn.call(nodeWrapper, nodeWrapper._children()) : actionFn.apply(nodeWrapper, nodeWrapper._children());
};

// ----------------- Attribute -----------------

// Attributes are Operations whose results are memoized. This means that, for any given semantics,
// the semantic action for a CST node will be invoked no more than once.
function Attribute(name, actionDict, builtInDefault) {
  this.name = name;
  this.formals = [];
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}
inherits(Attribute, Operation);

Attribute.prototype.typeName = 'attribute';

Attribute.prototype.execute = function (semantics, nodeWrapper) {
  var node = nodeWrapper._node;
  var key = semantics.attributeKeys[this.name];
  if (!node.hasOwnProperty(key)) {
    // The following is a super-send -- isn't JS beautiful? :/
    node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
  }
  return node[key];
};

// ----------------- Deferred initialization -----------------

util.awaitBuiltInRules(function (builtInRules) {
  var operationsAndAttributesGrammar = require('../dist/operations-and-attributes');
  initBuiltInSemantics(builtInRules);
  initPrototypeParser(operationsAndAttributesGrammar); // requires BuiltInSemantics
});

function initBuiltInSemantics(builtInRules) {
  var actions = {
    empty: function empty() {
      return this.iteration();
    },
    nonEmpty: function nonEmpty(first, _, rest) {
      return this.iteration([first].concat(rest.children));
    }
  };

  Semantics.BuiltInSemantics = Semantics.createSemantics(builtInRules, null).addOperation('asIteration', {
    emptyListOf: actions.empty,
    nonemptyListOf: actions.nonEmpty,
    EmptyListOf: actions.empty,
    NonemptyListOf: actions.nonEmpty
  });
}

function initPrototypeParser(grammar) {
  prototypeGrammarSemantics = grammar.createSemantics().addOperation('parse', {
    AttributeSignature: function AttributeSignature(name) {
      return {
        name: name.parse(),
        formals: []
      };
    },
    OperationSignature: function OperationSignature(name, optFormals) {
      return {
        name: name.parse(),
        formals: optFormals.parse()[0] || []
      };
    },
    Formals: function Formals(oparen, fs, cparen) {
      return fs.asIteration().parse();
    },
    name: function name(first, rest) {
      return this.sourceString;
    }
  });
  prototypeGrammar = grammar;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Semantics;

},{"../dist/operations-and-attributes":3,"./InputStream":35,"./MatchResult":37,"./common":44,"./errors":45,"./nodes":47,"./util":65,"es6-symbol":22,"inherits":27}],43:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');
var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Unicode characters that are used in the `toString` output.
var BALLOT_X = '\u2717';
var CHECK_MARK = '\u2713';
var DOT_OPERATOR = '\u22C5';
var RIGHTWARDS_DOUBLE_ARROW = '\u21D2';
var SYMBOL_FOR_HORIZONTAL_TABULATION = '\u2409';
var SYMBOL_FOR_LINE_FEED = '\u240A';
var SYMBOL_FOR_CARRIAGE_RETURN = '\u240D';

var Flags = {
  succeeded: 1 << 0,
  isRootNode: 1 << 1,
  isImplicitSpaces: 1 << 2,
  isMemoized: 1 << 3,
  isHeadOfLeftRecursion: 1 << 4,
  terminatesLR: 1 << 5
};

function spaces(n) {
  return common.repeat(' ', n).join('');
}

// Return a string representation of a portion of `input` at offset `pos`.
// The result will contain exactly `len` characters.
function getInputExcerpt(input, pos, len) {
  var excerpt = asEscapedString(input.slice(pos, pos + len));

  // Pad the output if necessary.
  if (excerpt.length < len) {
    return excerpt + common.repeat(' ', len - excerpt.length).join('');
  }
  return excerpt;
}

function asEscapedString(obj) {
  if (typeof obj === 'string') {
    // Replace non-printable characters with visible symbols.
    return obj.replace(/ /g, DOT_OPERATOR).replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION).replace(/\n/g, SYMBOL_FOR_LINE_FEED).replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
  }
  return String(obj);
}

// ----------------- Trace -----------------

function Trace(input, pos1, pos2, expr, succeeded, bindings, optChildren) {
  this.input = input;
  this.pos = this.pos1 = pos1;
  this.pos2 = pos2;
  this.source = new Interval(input, pos1, pos2);
  this.expr = expr;
  this.bindings = bindings;
  this.children = optChildren || [];
  this.terminatingLREntry = null;

  this._flags = succeeded ? Flags.succeeded : 0;
}

// A value that can be returned from visitor functions to indicate that a
// node should not be recursed into.
Trace.prototype.SKIP = {};

Object.defineProperty(Trace.prototype, 'displayString', {
  get: function get() {
    return this.expr.toDisplayString();
  }
});

// For convenience, create a getter and setter for the boolean flags in `Flags`.
Object.keys(Flags).forEach(function (name) {
  var mask = Flags[name];
  Object.defineProperty(Trace.prototype, name, {
    get: function get() {
      return (this._flags & mask) !== 0;
    },
    set: function set(val) {
      if (val) {
        this._flags |= mask;
      } else {
        this._flags &= ~mask;
      }
    }
  });
});

Trace.prototype.clone = function () {
  return this.cloneWithExpr(this.expr);
};

Trace.prototype.cloneWithExpr = function (expr) {
  var ans = new Trace(this.input, this.pos, this.pos2, expr, this.succeeded, this.bindings, this.children);

  ans.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion;
  ans.isImplicitSpaces = this.isImplicitSpaces;
  ans.isMemoized = this.isMemoized;
  ans.isRootNode = this.isRootNode;
  ans.terminatesLR = this.terminatesLR;
  ans.terminatingLREntry = this.terminatingLREntry;
  return ans;
};

// Record the trace information for the terminating condition of the LR loop.
Trace.prototype.recordLRTermination = function (ruleBodyTrace, value) {
  this.terminatingLREntry = new Trace(this.input, this.pos, this.pos2, this.expr, false, [value], [ruleBodyTrace]);
  this.terminatingLREntry.terminatesLR = true;
};

// Recursively traverse this trace node and all its descendents, calling a visitor function
// for each node that is visited. If `vistorObjOrFn` is an object, then its 'enter' property
// is a function to call before visiting the children of a node, and its 'exit' property is
// a function to call afterwards. If `visitorObjOrFn` is a function, it represents the 'enter'
// function.
//
// The functions are called with three arguments: the Trace node, its parent Trace, and a number
// representing the depth of the node in the tree. (The root node has depth 0.) `optThisArg`, if
// specified, is the value to use for `this` when executing the visitor functions.
Trace.prototype.walk = function (visitorObjOrFn, optThisArg) {
  var visitor = visitorObjOrFn;
  if (typeof visitor === 'function') {
    visitor = { enter: visitor };
  }

  function _walk(node, parent, depth) {
    var recurse = true;
    if (visitor.enter) {
      if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
        recurse = false;
      }
    }
    if (recurse) {
      node.children.forEach(function (child) {
        _walk(child, node, depth + 1);
      });
      if (visitor.exit) {
        visitor.exit.call(optThisArg, node, parent, depth);
      }
    }
  }
  if (this.isRootNode) {
    // Don't visit the root node itself, only its children.
    this.children.forEach(function (c) {
      _walk(c, null, 0);
    });
  } else {
    _walk(this, null, 0);
  }
};

// Return a string representation of the trace.
// Sample:
//     12⋅+⋅2⋅*⋅3 ✓ exp ⇒  "12"
//     12⋅+⋅2⋅*⋅3   ✓ addExp (LR) ⇒  "12"
//     12⋅+⋅2⋅*⋅3       ✗ addExp_plus
Trace.prototype.toString = function () {
  var sb = new common.StringBuffer();
  this.walk(function (node, parent, depth) {
    if (!node) {
      return this.SKIP;
    }
    var ctorName = node.expr.constructor.name;
    // Don't print anything for Alt nodes.
    if (ctorName === 'Alt') {
      return; // eslint-disable-line consistent-return
    }
    sb.append(getInputExcerpt(node.input, node.pos, 10) + spaces(depth * 2 + 1));
    sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + ' ' + node.displayString);
    if (node.isHeadOfLeftRecursion) {
      sb.append(' (LR)');
    }
    if (node.succeeded) {
      var contents = asEscapedString(node.source.contents);
      sb.append(' ' + RIGHTWARDS_DOUBLE_ARROW + '  ');
      sb.append(typeof contents === 'string' ? '"' + contents + '"' : contents);
    }
    sb.append('\n');
  }.bind(this));
  return sb.contents();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Trace;

},{"./Interval":36,"./common":44}],44:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Helpers

var escapeStringFor = {};
for (var c = 0; c < 128; c++) {
  escapeStringFor[c] = String.fromCharCode(c);
}
escapeStringFor["'".charCodeAt(0)] = "\\'";
escapeStringFor['"'.charCodeAt(0)] = '\\"';
escapeStringFor['\\'.charCodeAt(0)] = '\\\\';
escapeStringFor['\b'.charCodeAt(0)] = '\\b';
escapeStringFor['\f'.charCodeAt(0)] = '\\f';
escapeStringFor['\n'.charCodeAt(0)] = '\\n';
escapeStringFor['\r'.charCodeAt(0)] = '\\r';
escapeStringFor['\t'.charCodeAt(0)] = '\\t';
escapeStringFor['\x0B'.charCodeAt(0)] = '\\v';

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function (optMethodName) {
  var methodName = optMethodName || '';
  return function () {
    throw new Error('this method ' + methodName + ' is abstract! ' + '(it has no implementation in class ' + this.constructor.name + ')');
  };
};

exports.assert = function (cond, message) {
  if (!cond) {
    throw new Error(message);
  }
};

// Define a lazily-computed, non-enumerable property named `propName`
// on the object `obj`. `getterFn` will be called to compute the value the
// first time the property is accessed.
exports.defineLazyProperty = function (obj, propName, getterFn) {
  var memo;
  Object.defineProperty(obj, propName, {
    get: function get() {
      if (!memo) {
        memo = getterFn.call(this);
      }
      return memo;
    }
  });
};

exports.clone = function (obj) {
  if (obj) {
    return extend({}, obj);
  }
  return obj;
};

exports.extend = extend;

exports.repeatFn = function (fn, n) {
  var arr = [];
  while (n-- > 0) {
    arr.push(fn());
  }
  return arr;
};

exports.repeatStr = function (str, n) {
  return new Array(n + 1).join(str);
};

exports.repeat = function (x, n) {
  return exports.repeatFn(function () {
    return x;
  }, n);
};

exports.getDuplicates = function (array) {
  var duplicates = [];
  for (var idx = 0; idx < array.length; idx++) {
    var x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.copyWithoutDuplicates = function (array) {
  var noDuplicates = [];
  array.forEach(function (entry) {
    if (noDuplicates.indexOf(entry) < 0) {
      noDuplicates.push(entry);
    }
  });
  return noDuplicates;
};

exports.isSyntactic = function (ruleName) {
  var firstChar = ruleName[0];
  return firstChar === firstChar.toUpperCase();
};

exports.isLexical = function (ruleName) {
  return !exports.isSyntactic(ruleName);
};

exports.padLeft = function (str, len, optChar) {
  var ch = optChar || ' ';
  if (str.length < len) {
    return exports.repeatStr(ch, len - str.length) + str;
  }
  return str;
};

// StringBuffer

exports.StringBuffer = function () {
  this.strings = [];
};

exports.StringBuffer.prototype.append = function (str) {
  this.strings.push(str);
};

exports.StringBuffer.prototype.contents = function () {
  return this.strings.join('');
};

// Character escaping and unescaping

exports.escapeChar = function (c, optDelim) {
  var charCode = c.charCodeAt(0);
  if ((c === '"' || c === "'") && optDelim && c !== optDelim) {
    return c;
  } else if (charCode < 128) {
    return escapeStringFor[charCode];
  } else if (128 <= charCode && charCode < 256) {
    return '\\x' + exports.padLeft(charCode.toString(16), 2, '0');
  } else {
    return '\\u' + exports.padLeft(charCode.toString(16), 4, '0');
  }
};

exports.unescapeChar = function (s) {
  if (s.charAt(0) === '\\') {
    switch (s.charAt(1)) {
      case 'b':
        return '\b';
      case 'f':
        return '\f';
      case 'n':
        return '\n';
      case 'r':
        return '\r';
      case 't':
        return '\t';
      case 'v':
        return '\v';
      case 'x':
        return String.fromCharCode(parseInt(s.substring(2, 4), 16));
      case 'u':
        return String.fromCharCode(parseInt(s.substring(2, 6), 16));
      default:
        return s.charAt(1);
    }
  } else {
    return s;
  }
};

// Helper for producing a description of an unknown object in a safe way.
// Especially useful for error messages where an unexpected type of object was encountered.
exports.unexpectedObjToString = function (obj) {
  if (obj == null) {
    return String(obj);
  }
  var baseToString = Object.prototype.toString.call(obj);
  try {
    var typeName;
    if (obj.constructor && obj.constructor.name) {
      typeName = obj.constructor.name;
    } else if (baseToString.indexOf('[object ') === 0) {
      typeName = baseToString.slice(8, -1); // Extract e.g. "Array" from "[object Array]".
    } else {
      typeName = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    }
    return typeName + ': ' + JSON.stringify(String(obj));
  } catch (e) {
    return baseToString;
  }
};

},{"util-extend":29}],45:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = require('./pexprs');

var Namespace = require('./Namespace');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function createError(message, optInterval) {
  var e;
  if (optInterval) {
    e = new Error(optInterval.getLineAndColumnMessage() + message);
    e.shortMessage = message;
    e.interval = optInterval;
  } else {
    e = new Error(message);
  }
  return e;
}

// ----------------- errors about intervals -----------------

function intervalSourcesDontMatch() {
  return createError("Interval sources don't match");
}

// ----------------- errors about grammars -----------------

// Grammar syntax error

function grammarSyntaxError(matchFailure) {
  var e = new Error();
  Object.defineProperty(e, 'message', { get: function get() {
      return matchFailure.message;
    } });
  Object.defineProperty(e, 'shortMessage', { get: function get() {
      return 'Expected ' + matchFailure.getExpectedText();
    } });
  e.interval = matchFailure.getInterval();
  return e;
}

// Undeclared grammar

function undeclaredGrammar(grammarName, namespace, interval) {
  var message = namespace ? 'Grammar ' + grammarName + ' is not declared in namespace ' + Namespace.toString(namespace) : 'Undeclared grammar ' + grammarName;
  return createError(message, interval);
}

// Duplicate grammar declaration

function duplicateGrammarDeclaration(grammar, namespace) {
  return createError('Grammar ' + grammar.name + ' is already declared in this namespace');
}

// ----------------- rules -----------------

// Undeclared rule

function undeclaredRule(ruleName, grammarName, optInterval) {
  return createError('Rule ' + ruleName + ' is not declared in grammar ' + grammarName, optInterval);
}

// Cannot override undeclared rule

function cannotOverrideUndeclaredRule(ruleName, grammarName, optSource) {
  return createError('Cannot override rule ' + ruleName + ' because it is not declared in ' + grammarName, optSource);
}

// Cannot extend undeclared rule

function cannotExtendUndeclaredRule(ruleName, grammarName, optSource) {
  return createError('Cannot extend rule ' + ruleName + ' because it is not declared in ' + grammarName, optSource);
}

// Duplicate rule declaration

function duplicateRuleDeclaration(ruleName, grammarName, declGrammarName, optSource) {
  var message = "Duplicate declaration for rule '" + ruleName + "' in grammar '" + grammarName + "'";
  if (grammarName !== declGrammarName) {
    message += " (originally declared in '" + declGrammarName + "')";
  }
  return createError(message, optSource);
}

// Wrong number of parameters

function wrongNumberOfParameters(ruleName, expected, actual, source) {
  return createError('Wrong number of parameters for rule ' + ruleName + ' (expected ' + expected + ', got ' + actual + ')', source);
}

// Wrong number of arguments

function wrongNumberOfArguments(ruleName, expected, actual, expr) {
  return createError('Wrong number of arguments for rule ' + ruleName + ' (expected ' + expected + ', got ' + actual + ')', expr.source);
}

// Duplicate parameter names

function duplicateParameterNames(ruleName, duplicates, source) {
  return createError('Duplicate parameter names in rule ' + ruleName + ': ' + duplicates.join(', '), source);
}

// Invalid parameter expression

function invalidParameter(ruleName, expr) {
  return createError('Invalid parameter to rule ' + ruleName + ': ' + expr + ' has arity ' + expr.getArity() + ', but parameter expressions must have arity 1', expr.source);
}

// Application of syntactic rule from lexical rule

function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
  return createError('Cannot apply syntactic rule ' + ruleName + ' from here (inside a lexical context)', applyExpr.source);
}

// Incorrect argument type

function incorrectArgumentType(expectedType, expr) {
  return createError('Incorrect argument type: expected ' + expectedType, expr.source);
}

// ----------------- Kleene operators -----------------

function kleeneExprHasNullableOperand(kleeneExpr, applicationStack) {
  var actuals = applicationStack.length > 0 ? applicationStack[applicationStack.length - 1].args : [];
  var expr = kleeneExpr.expr.substituteParams(actuals);
  var message = 'Nullable expression ' + expr + " is not allowed inside '" + kleeneExpr.operator + "' (possible infinite loop)";
  if (applicationStack.length > 0) {
    var stackTrace = applicationStack.map(function (app) {
      return new pexprs.Apply(app.ruleName, app.args);
    }).join('\n');
    message += '\nApplication stack (most recent application last):\n' + stackTrace;
  }
  return createError(message, kleeneExpr.expr.source);
}

// ----------------- arity -----------------

function inconsistentArity(ruleName, expected, actual, expr) {
  return createError('Rule ' + ruleName + ' involves an alternation which has inconsistent arity ' + '(expected ' + expected + ', got ' + actual + ')', expr.source);
}

// ----------------- properties -----------------

function duplicatePropertyNames(duplicates) {
  return createError('Object pattern has duplicate property names: ' + duplicates.join(', '));
}

// ----------------- constructors -----------------

function invalidConstructorCall(grammar, ctorName, children) {
  return createError('Attempt to invoke constructor ' + ctorName + ' with invalid or unexpected arguments');
}

// ----------------- convenience -----------------

function multipleErrors(errors) {
  var messages = errors.map(function (e) {
    return e.message;
  });
  return createError(['Errors:'].concat(messages).join('\n- '), errors[0].interval);
}

// ----------------- semantic -----------------

function missingSemanticAction(ctorName, name, type, stack) {
  var stackTrace = stack.slice(0, -1).map(function (info) {
    var ans = '  ' + info[0].name + ' > ' + info[1];
    return info.length === 3 ? ans + " for '" + info[2] + "'" : ans;
  }).join('\n');
  stackTrace += '\n  ' + name + ' > ' + ctorName;

  var where = type + " '" + name + "'";
  var message = "Missing semantic action for '" + ctorName + "' in " + where + '\n' + 'Action stack (most recent call last):\n' + stackTrace;

  var e = createError(message);
  e.name = 'missingSemanticAction';
  return e;
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  applicationOfSyntacticRuleFromLexicalContext: applicationOfSyntacticRuleFromLexicalContext,
  cannotExtendUndeclaredRule: cannotExtendUndeclaredRule,
  cannotOverrideUndeclaredRule: cannotOverrideUndeclaredRule,
  duplicateGrammarDeclaration: duplicateGrammarDeclaration,
  duplicateParameterNames: duplicateParameterNames,
  duplicatePropertyNames: duplicatePropertyNames,
  duplicateRuleDeclaration: duplicateRuleDeclaration,
  inconsistentArity: inconsistentArity,
  incorrectArgumentType: incorrectArgumentType,
  intervalSourcesDontMatch: intervalSourcesDontMatch,
  invalidConstructorCall: invalidConstructorCall,
  invalidParameter: invalidParameter,
  grammarSyntaxError: grammarSyntaxError,
  kleeneExprHasNullableOperand: kleeneExprHasNullableOperand,
  missingSemanticAction: missingSemanticAction,
  undeclaredGrammar: undeclaredGrammar,
  undeclaredRule: undeclaredRule,
  wrongNumberOfArguments: wrongNumberOfArguments,
  wrongNumberOfParameters: wrongNumberOfParameters,

  throwErrors: function throwErrors(errors) {
    if (errors.length === 1) {
      throw errors[0];
    }
    if (errors.length > 1) {
      throw multipleErrors(errors);
    }
  }
};

},{"./Namespace":40,"./pexprs":64}],46:[function(require,module,exports){
/* global document, XMLHttpRequest */

'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Builder = require('./Builder');
var Grammar = require('./Grammar');
var Namespace = require('./Namespace');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');
var util = require('./util');
var version = require('./version');

var isBuffer = require('is-buffer');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// The metagrammar, i.e. the grammar for Ohm grammars. Initialized at the
// bottom of this file because loading the grammar requires Ohm itself.
var ohmGrammar;

// An object which makes it possible to stub out the document API for testing.
var documentInterface = {
  querySelector: function querySelector(sel) {
    return document.querySelector(sel);
  },
  querySelectorAll: function querySelectorAll(sel) {
    return document.querySelectorAll(sel);
  }
};

// Check if `obj` is a DOM element.
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

function isUndefined(obj) {
  return obj === void 0; // eslint-disable-line no-void
}

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function isArrayLike(obj) {
  if (obj == null) {
    return false;
  }
  var length = obj.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

// TODO: just use the jQuery thing
function load(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  try {
    req.send();
    if (req.status === 0 || req.status === 200) {
      return req.responseText;
    }
  } catch (e) {}
  throw new Error('unable to load url ' + url);
}

// Returns a Grammar instance (i.e., an object with a `match` method) for
// `tree`, which is the concrete syntax tree of a user-written grammar.
// The grammar will be assigned into `namespace` under the name of the grammar
// as specified in the source.
function buildGrammar(match, namespace, optOhmGrammarForTesting) {
  var builder = new Builder();
  var decl;
  var currentRuleName;
  var currentRuleFormals;
  var overriding = false;
  var metaGrammar = optOhmGrammarForTesting || ohmGrammar;

  // A visitor that produces a Grammar instance from the CST.
  var helpers = metaGrammar.createSemantics().addOperation('visit', {
    Grammar: function Grammar(n, s, open, rs, close) {
      var grammarName = n.visit();
      decl = builder.newGrammar(grammarName, namespace);
      s.visit();
      rs.visit();
      var g = decl.build();
      g.source = this.source.trimmed();
      if (grammarName in namespace) {
        throw errors.duplicateGrammarDeclaration(g, namespace);
      }
      namespace[grammarName] = g;
      return g;
    },

    SuperGrammar: function SuperGrammar(_, n) {
      var superGrammarName = n.visit();
      if (superGrammarName === 'null') {
        decl.withSuperGrammar(null);
      } else {
        if (!namespace || !(superGrammarName in namespace)) {
          throw errors.undeclaredGrammar(superGrammarName, namespace, n.source);
        }
        decl.withSuperGrammar(namespace[superGrammarName]);
      }
    },

    Rule_define: function Rule_define(n, fs, d, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      // If there is no default start rule yet, set it now. This must be done before visiting
      // the body, because it might contain an inline rule definition.
      if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
        decl.withDefaultStartRule(currentRuleName);
      }
      var body = b.visit();
      var description = d.visit()[0];
      var source = this.source.trimmed();
      return decl.define(currentRuleName, currentRuleFormals, body, description, source);
    },
    Rule_override: function Rule_override(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      overriding = true;
      var body = b.visit();
      var source = this.source.trimmed();
      var ans = decl.override(currentRuleName, currentRuleFormals, body, null, source);
      overriding = false;
      return ans;
    },
    Rule_extend: function Rule_extend(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      var body = b.visit();
      var source = this.source.trimmed();
      var ans = decl.extend(currentRuleName, currentRuleFormals, body, null, source);
      return ans;
    },
    RuleBody: function RuleBody(_, terms) {
      var args = terms.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },

    Formals: function Formals(opointy, fs, cpointy) {
      return fs.visit();
    },

    Params: function Params(opointy, ps, cpointy) {
      return ps.visit();
    },

    Alt: function Alt(seqs) {
      var args = seqs.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },

    TopLevelTerm_inline: function TopLevelTerm_inline(b, n) {
      var inlineRuleName = currentRuleName + '_' + n.visit();
      var body = b.visit();
      var source = this.source.trimmed();
      var isNewRuleDeclaration = !(decl.superGrammar && decl.superGrammar.rules[inlineRuleName]);
      if (overriding && !isNewRuleDeclaration) {
        decl.override(inlineRuleName, currentRuleFormals, body, null, source);
      } else {
        decl.define(inlineRuleName, currentRuleFormals, body, null, source);
      }
      var params = currentRuleFormals.map(function (formal) {
        return builder.app(formal);
      });
      return builder.app(inlineRuleName, params).withSource(body.source);
    },

    Seq: function Seq(expr) {
      return builder.seq.apply(builder, expr.visit()).withSource(this.source);
    },

    Iter_star: function Iter_star(x, _) {
      return builder.star(x.visit()).withSource(this.source);
    },
    Iter_plus: function Iter_plus(x, _) {
      return builder.plus(x.visit()).withSource(this.source);
    },
    Iter_opt: function Iter_opt(x, _) {
      return builder.opt(x.visit()).withSource(this.source);
    },

    Pred_not: function Pred_not(_, x) {
      return builder.not(x.visit()).withSource(this.source);
    },
    Pred_lookahead: function Pred_lookahead(_, x) {
      return builder.lookahead(x.visit()).withSource(this.source);
    },

    Lex_lex: function Lex_lex(_, x) {
      return builder.lex(x.visit()).withSource(this.source);
    },

    Base_application: function Base_application(rule, ps) {
      return builder.app(rule.visit(), ps.visit()[0] || []).withSource(this.source);
    },
    Base_range: function Base_range(from, _, to) {
      return builder.range(from.visit(), to.visit()).withSource(this.source);
    },
    Base_terminal: function Base_terminal(expr) {
      return builder.terminal(expr.visit()).withSource(this.source);
    },
    Base_paren: function Base_paren(open, x, close) {
      return x.visit();
    },

    ruleDescr: function ruleDescr(open, t, close) {
      return t.visit();
    },
    ruleDescrText: function ruleDescrText(_) {
      return this.sourceString.trim();
    },

    caseName: function caseName(_, space1, n, space2, end) {
      return n.visit();
    },

    name: function name(first, rest) {
      return this.sourceString;
    },
    nameFirst: function nameFirst(expr) {},
    nameRest: function nameRest(expr) {},

    terminal: function terminal(open, cs, close) {
      return cs.visit().join('');
    },

    oneCharTerminal: function oneCharTerminal(open, c, close) {
      return c.visit();
    },

    terminalChar: function terminalChar(_) {
      return common.unescapeChar(this.sourceString);
    },

    escapeChar: function escapeChar(_) {
      return this.sourceString;
    },

    NonemptyListOf: function NonemptyListOf(x, _, xs) {
      return [x.visit()].concat(xs.visit());
    },
    EmptyListOf: function EmptyListOf() {
      return [];
    },

    _terminal: function _terminal() {
      return this.primitiveValue;
    }
  });
  return helpers(match).visit();
}

function compileAndLoad(source, namespace) {
  var m = ohmGrammar.match(source, 'Grammars');
  if (m.failed()) {
    throw errors.grammarSyntaxError(m);
  }
  return buildGrammar(m, namespace);
}

// Return the contents of a script element, fetching it via XHR if necessary.
function getScriptElementContents(el) {
  if (!isElement(el)) {
    throw new TypeError('Expected a DOM Node, got ' + common.unexpectedObjToString(el));
  }
  if (el.type !== 'text/ohm-js') {
    throw new Error('Expected a script tag with type="text/ohm-js", got ' + el);
  }
  return el.getAttribute('src') ? load(el.getAttribute('src')) : el.innerHTML;
}

function grammar(source, optNamespace) {
  var ns = grammars(source, optNamespace);

  // Ensure that the source contained no more than one grammar definition.
  var grammarNames = Object.keys(ns);
  if (grammarNames.length === 0) {
    throw new Error('Missing grammar definition');
  } else if (grammarNames.length > 1) {
    var secondGrammar = ns[grammarNames[1]];
    var interval = secondGrammar.source;
    throw new Error(util.getLineAndColumnMessage(interval.sourceString, interval.startIdx) + 'Found more than one grammar definition -- use ohm.grammars() instead.');
  }
  return ns[grammarNames[0]]; // Return the one and only grammar.
}

function grammars(source, optNamespace) {
  var ns = Namespace.extend(Namespace.asNamespace(optNamespace));
  if (typeof source !== 'string') {
    // For convenience, detect Node.js Buffer objects and automatically call toString().
    if (isBuffer(source)) {
      source = source.toString();
    } else {
      throw new TypeError('Expected string as first argument, got ' + common.unexpectedObjToString(source));
    }
  }
  compileAndLoad(source, ns);
  return ns;
}

function grammarFromScriptElement(optNode) {
  var node = optNode;
  if (isUndefined(node)) {
    var nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
    if (nodeList.length !== 1) {
      throw new Error('Expected exactly one script tag with type="text/ohm-js", found ' + nodeList.length);
    }
    node = nodeList[0];
  }
  return grammar(getScriptElementContents(node));
}

function grammarsFromScriptElements(optNodeOrNodeList) {
  // Simple case: the argument is a DOM node.
  if (isElement(optNodeOrNodeList)) {
    return grammars(optNodeOrNodeList);
  }
  // Otherwise, it must be either undefined or a NodeList.
  var nodeList = optNodeOrNodeList;
  if (isUndefined(nodeList)) {
    // Find all script elements with type="text/ohm-js".
    nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
  } else if (typeof nodeList === 'string' || !isElement(nodeList) && !isArrayLike(nodeList)) {
    throw new TypeError('Expected a Node, NodeList, or Array, but got ' + nodeList);
  }
  var ns = Namespace.createNamespace();
  for (var i = 0; i < nodeList.length; ++i) {
    // Copy the new grammars into `ns` to keep the namespace flat.
    common.extend(ns, grammars(getScriptElementContents(nodeList[i]), ns));
  }
  return ns;
}

function makeRecipe(recipe) {
  if (typeof recipe === 'function') {
    return recipe.call(new Builder());
  } else {
    if (typeof recipe === 'string') {
      // stringified JSON recipe
      recipe = JSON.parse(recipe);
    }
    return new Builder().fromRecipe(recipe);
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about
// module.exports = {
exports.default = {
  createNamespace: Namespace.createNamespace,
  grammar: grammar,
  grammars: grammars,
  grammarFromScriptElement: grammarFromScriptElement,
  grammarsFromScriptElements: grammarsFromScriptElements,
  makeRecipe: makeRecipe,
  ohmGrammar: null, // Initialized below, after Grammar.BuiltInRules.
  pexprs: pexprs,
  util: util,
  extras: require('../extras'),
  version: version
};

// Stuff for testing, etc.

module.exports._buildGrammar = buildGrammar;
module.exports._setDocumentInterfaceForTesting = function (doc) {
  documentInterface = doc;
};

// Late initialization for stuff that is bootstrapped.

Grammar.BuiltInRules = require('../dist/built-in-rules');
util.announceBuiltInRules(Grammar.BuiltInRules);

module.exports.ohmGrammar = ohmGrammar = require('../dist/ohm-grammar');
Grammar.initApplicationParser(ohmGrammar, buildGrammar);

},{"../dist/built-in-rules":1,"../dist/ohm-grammar":2,"../extras":5,"./Builder":30,"./Grammar":33,"./Namespace":40,"./common":44,"./errors":45,"./pexprs":64,"./util":65,"./version":66,"is-buffer":28}],47:[function(require,module,exports){
'use strict';

var inherits = require('inherits');

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Node(grammar, ctorName, matchLength) {
  this.grammar = grammar;
  this.ctorName = ctorName;
  this.matchLength = matchLength;
}

Node.prototype.numChildren = function () {
  return this.children ? this.children.length : 0;
};

Node.prototype.childAt = function (idx) {
  if (this.children) {
    return this.children[idx];
  }
};

Node.prototype.indexOfChild = function (arg) {
  return this.children.indexOf(arg);
};

Node.prototype.hasChildren = function () {
  return this.numChildren() > 1;
};

Node.prototype.hasNoChildren = function () {
  return !this.hasChildren();
};

Node.prototype.onlyChild = function () {
  if (this.numChildren() !== 1) {
    throw new Error('cannot get only child of a node of type ' + this.ctorName + ' (it has ' + this.numChildren() + ' children)');
  } else {
    return this.firstChild();
  }
};

Node.prototype.firstChild = function () {
  if (this.hasNoChildren()) {
    throw new Error('cannot get first child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(0);
  }
};

Node.prototype.lastChild = function () {
  if (this.hasNoChildren()) {
    throw new Error('cannot get last child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(this.numChildren() - 1);
  }
};

Node.prototype.childBefore = function (child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childBefore() called w/ an argument that is not a child');
  } else if (childIdx === 0) {
    throw new Error('cannot get child before first child');
  } else {
    return this.childAt(childIdx - 1);
  }
};

Node.prototype.childAfter = function (child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childAfter() called w/ an argument that is not a child');
  } else if (childIdx === this.numChildren() - 1) {
    throw new Error('cannot get child after last child');
  } else {
    return this.childAt(childIdx + 1);
  }
};

Node.prototype.isTerminal = function () {
  return false;
};

Node.prototype.isNonterminal = function () {
  return false;
};

Node.prototype.isIteration = function () {
  return false;
};

Node.prototype.isOptional = function () {
  return false;
};

Node.prototype.toJSON = function () {
  var r = {};
  r[this.ctorName] = this.children;
  return r;
};

// Terminals

function TerminalNode(grammar, value) {
  var matchLength = value ? value.length : 0;
  Node.call(this, grammar, '_terminal', matchLength);
  this.primitiveValue = value;
}
inherits(TerminalNode, Node);

TerminalNode.prototype.isTerminal = function () {
  return true;
};

TerminalNode.prototype.toJSON = function () {
  var r = {};
  r[this.ctorName] = this.primitiveValue;
  return r;
};

// Nonterminals

function NonterminalNode(grammar, ruleName, children, childOffsets, matchLength) {
  Node.call(this, grammar, ruleName, matchLength);
  this.children = children;
  this.childOffsets = childOffsets;
}
inherits(NonterminalNode, Node);

NonterminalNode.prototype.isNonterminal = function () {
  return true;
};

NonterminalNode.prototype.isLexical = function () {
  return common.isLexical(this.ctorName);
};

NonterminalNode.prototype.isSyntactic = function () {
  return common.isSyntactic(this.ctorName);
};

// Iterations

function IterationNode(grammar, children, childOffsets, matchLength, isOptional) {
  Node.call(this, grammar, '_iter', matchLength);
  this.children = children;
  this.childOffsets = childOffsets;
  this.optional = isOptional;
}
inherits(IterationNode, Node);

IterationNode.prototype.isIteration = function () {
  return true;
};

IterationNode.prototype.isOptional = function () {
  return this.optional;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  Node: Node,
  TerminalNode: TerminalNode,
  NonterminalNode: NonterminalNode,
  IterationNode: IterationNode
};

},{"./common":44,"inherits":27}],48:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Return true if we should skip spaces preceding this expression in a syntactic context.
*/
pexprs.PExpr.prototype.allowsSkippingPrecedingSpace = common.abstract('allowsSkippingPrecedingSpace');

/*
  Generally, these are all first-order expressions and (with the exception of Apply)
  directly read from the input stream.
*/
pexprs.any.allowsSkippingPrecedingSpace = pexprs.end.allowsSkippingPrecedingSpace = pexprs.Apply.prototype.allowsSkippingPrecedingSpace = pexprs.Terminal.prototype.allowsSkippingPrecedingSpace = pexprs.Range.prototype.allowsSkippingPrecedingSpace = pexprs.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function () {
  return true;
};

/*
  Higher-order expressions that don't directly consume input.
*/
pexprs.Alt.prototype.allowsSkippingPrecedingSpace = pexprs.Iter.prototype.allowsSkippingPrecedingSpace = pexprs.Lex.prototype.allowsSkippingPrecedingSpace = pexprs.Lookahead.prototype.allowsSkippingPrecedingSpace = pexprs.Not.prototype.allowsSkippingPrecedingSpace = pexprs.Param.prototype.allowsSkippingPrecedingSpace = pexprs.Seq.prototype.allowsSkippingPrecedingSpace = function () {
  return false;
};

},{"./common":44,"./pexprs":64}],49:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');
var util = require('./util');

var BuiltInRules;

util.awaitBuiltInRules(function (g) {
  BuiltInRules = g;
});

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var lexifyCount;

pexprs.PExpr.prototype.assertAllApplicationsAreValid = function (ruleName, grammar) {
  lexifyCount = 0;
  this._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.PExpr.prototype._assertAllApplicationsAreValid = common.abstract('_assertAllApplicationsAreValid');

pexprs.any._assertAllApplicationsAreValid = pexprs.end._assertAllApplicationsAreValid = pexprs.Terminal.prototype._assertAllApplicationsAreValid = pexprs.Range.prototype._assertAllApplicationsAreValid = pexprs.Param.prototype._assertAllApplicationsAreValid = pexprs.UnicodeChar.prototype._assertAllApplicationsAreValid = function (ruleName, grammar) {
  // no-op
};

pexprs.Lex.prototype._assertAllApplicationsAreValid = function (ruleName, grammar) {
  lexifyCount++;
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
  lexifyCount--;
};

pexprs.Alt.prototype._assertAllApplicationsAreValid = function (ruleName, grammar) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Seq.prototype._assertAllApplicationsAreValid = function (ruleName, grammar) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Iter.prototype._assertAllApplicationsAreValid = pexprs.Not.prototype._assertAllApplicationsAreValid = pexprs.Lookahead.prototype._assertAllApplicationsAreValid = function (ruleName, grammar) {
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.Apply.prototype._assertAllApplicationsAreValid = function (ruleName, grammar) {
  var ruleInfo = grammar.rules[this.ruleName];

  // Make sure that the rule exists...
  if (!ruleInfo) {
    throw errors.undeclaredRule(this.ruleName, grammar.name, this.source);
  }

  // ...and that this application is allowed
  if (common.isSyntactic(this.ruleName) && (!common.isSyntactic(ruleName) || lexifyCount > 0)) {
    throw errors.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
  }

  // ...and that this application has the correct number of arguments
  var actual = this.args.length;
  var expected = ruleInfo.formals.length;
  if (actual !== expected) {
    throw errors.wrongNumberOfArguments(this.ruleName, expected, actual, this.source);
  }

  // ...and that all of the argument expressions only have valid applications and have arity 1.
  var self = this;
  this.args.forEach(function (arg) {
    arg._assertAllApplicationsAreValid(ruleName, grammar);
    if (arg.getArity() !== 1) {
      throw errors.invalidParameter(self.ruleName, arg);
    }
  });

  // Extra checks for "special" applications

  // If it's an application of 'caseInsensitive', ensure that the argument is a Terminal.
  if (BuiltInRules && ruleInfo === BuiltInRules.rules.caseInsensitive) {
    if (!(this.args[0] instanceof pexprs.Terminal)) {
      throw errors.incorrectArgumentType('a Terminal (e.g. \"abc\")', this.args[0]);
    }
  }
};

},{"./common":44,"./errors":45,"./pexprs":64,"./util":65}],50:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract('assertChoicesHaveUniformArity');

pexprs.any.assertChoicesHaveUniformArity = pexprs.end.assertChoicesHaveUniformArity = pexprs.Terminal.prototype.assertChoicesHaveUniformArity = pexprs.Range.prototype.assertChoicesHaveUniformArity = pexprs.Param.prototype.assertChoicesHaveUniformArity = pexprs.Lex.prototype.assertChoicesHaveUniformArity = pexprs.UnicodeChar.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  var arity = this.terms[0].getArity();
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    term.assertChoicesHaveUniformArity();
    var otherArity = term.getArity();
    if (arity !== otherArity) {
      throw errors.inconsistentArity(ruleName, arity, otherArity, term);
    }
  }
};

pexprs.Extend.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  // Extend is a special case of Alt that's guaranteed to have exactly two
  // cases: [extensions, origBody].
  var actualArity = this.terms[0].getArity();
  var expectedArity = this.terms[1].getArity();
  if (actualArity !== expectedArity) {
    throw errors.inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
  }
};

pexprs.Iter.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  // no-op (not required b/c the nested expr doesn't show up in the CST)
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Apply.prototype.assertChoicesHaveUniformArity = function (ruleName) {
  // The arities of the parameter expressions is required to be 1 by
  // `assertAllApplicationsAreValid()`.
};

},{"./common":44,"./errors":45,"./pexprs":64}],51:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertIteratedExprsAreNotNullable = common.abstract('assertIteratedExprsAreNotNullable');

pexprs.any.assertIteratedExprsAreNotNullable = pexprs.end.assertIteratedExprsAreNotNullable = pexprs.Terminal.prototype.assertIteratedExprsAreNotNullable = pexprs.Range.prototype.assertIteratedExprsAreNotNullable = pexprs.Param.prototype.assertIteratedExprsAreNotNullable = pexprs.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function (grammar) {
  // no-op
};

pexprs.Alt.prototype.assertIteratedExprsAreNotNullable = function (grammar) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertIteratedExprsAreNotNullable(grammar);
  }
};

pexprs.Seq.prototype.assertIteratedExprsAreNotNullable = function (grammar) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertIteratedExprsAreNotNullable(grammar);
  }
};

pexprs.Iter.prototype.assertIteratedExprsAreNotNullable = function (grammar) {
  // Note: this is the implementation of this method for `Star` and `Plus` expressions.
  // It is overridden for `Opt` below.
  this.expr.assertIteratedExprsAreNotNullable(grammar);
  if (this.expr.isNullable(grammar)) {
    throw errors.kleeneExprHasNullableOperand(this, []);
  }
};

pexprs.Opt.prototype.assertIteratedExprsAreNotNullable = pexprs.Not.prototype.assertIteratedExprsAreNotNullable = pexprs.Lookahead.prototype.assertIteratedExprsAreNotNullable = pexprs.Lex.prototype.assertIteratedExprsAreNotNullable = function (grammar) {
  this.expr.assertIteratedExprsAreNotNullable(grammar);
};

pexprs.Apply.prototype.assertIteratedExprsAreNotNullable = function (grammar) {
  this.args.forEach(function (arg) {
    arg.assertIteratedExprsAreNotNullable(grammar);
  });
};

},{"./common":44,"./errors":45,"./pexprs":64}],52:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var common = require('./common');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.check = common.abstract('check');

pexprs.any.check = function (grammar, vals) {
  return vals.length >= 1;
};

pexprs.end.check = function (grammar, vals) {
  return vals[0] instanceof nodes.Node && vals[0].isTerminal() && vals[0].primitiveValue === undefined;
};

pexprs.Terminal.prototype.check = function (grammar, vals) {
  return vals[0] instanceof nodes.Node && vals[0].isTerminal() && vals[0].primitiveValue === this.obj;
};

pexprs.Range.prototype.check = function (grammar, vals) {
  return vals[0] instanceof nodes.Node && vals[0].isTerminal() && _typeof(vals[0].primitiveValue) === _typeof(this.from);
};

pexprs.Param.prototype.check = function (grammar, vals) {
  return vals.length >= 1;
};

pexprs.Alt.prototype.check = function (grammar, vals) {
  for (var i = 0; i < this.terms.length; i++) {
    var term = this.terms[i];
    if (term.check(grammar, vals)) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.check = function (grammar, vals) {
  var pos = 0;
  for (var i = 0; i < this.factors.length; i++) {
    var factor = this.factors[i];
    if (factor.check(grammar, vals.slice(pos))) {
      pos += factor.getArity();
    } else {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.check = function (grammar, vals) {
  var arity = this.getArity();
  var columns = vals.slice(0, arity);
  if (columns.length !== arity) {
    return false;
  }
  var rowCount = columns[0].length;
  var i;
  for (i = 1; i < arity; i++) {
    if (columns[i].length !== rowCount) {
      return false;
    }
  }

  for (i = 0; i < rowCount; i++) {
    var row = [];
    for (var j = 0; j < arity; j++) {
      row.push(columns[j][i]);
    }
    if (!this.expr.check(grammar, row)) {
      return false;
    }
  }

  return true;
};

pexprs.Not.prototype.check = function (grammar, vals) {
  return true;
};

pexprs.Lookahead.prototype.check = pexprs.Lex.prototype.check = function (grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Apply.prototype.check = function (grammar, vals) {
  if (!(vals[0] instanceof nodes.Node && vals[0].grammar === grammar && vals[0].ctorName === this.ruleName)) {
    return false;
  }

  // TODO: think about *not* doing the following checks, i.e., trusting that the rule
  // was correctly constructed.
  var ruleNode = vals[0];
  var body = grammar.rules[this.ruleName].body;
  return body.check(grammar, ruleNode.children) && ruleNode.numChildren() === body.getArity();
};

pexprs.UnicodeChar.prototype.check = function (grammar, vals) {
  return vals[0] instanceof nodes.Node && vals[0].isTerminal() && typeof vals[0].primitiveValue === 'string';
};

},{"./common":44,"./nodes":47,"./pexprs":64}],53:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Trace = require('./Trace');
var common = require('./common');
var errors = require('./errors');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

var TerminalNode = nodes.TerminalNode;
var NonterminalNode = nodes.NonterminalNode;
var IterationNode = nodes.IterationNode;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Evaluate the expression and return `true` if it succeeds, `false` otherwise. This method should
  only be called directly by `State.prototype.eval(expr)`, which also updates the data structures
  that are used for tracing. (Making those updates in a method of `State` enables the trace-specific
  data structures to be "secrets" of that class, which is good for modularity.)

  The contract of this method is as follows:
  * When the return value is `true`,
    - the state object will have `expr.getArity()` more bindings than it did before the call.
  * When the return value is `false`,
    - the state object may have more bindings than it did before the call, and
    - its input stream's position may be anywhere.

  Note that `State.prototype.eval(expr)`, unlike this method, guarantees that neither the state
  object's bindings nor its input stream's position will change if the expression fails to match.
*/
pexprs.PExpr.prototype.eval = common.abstract('eval'); // function(state) { ... }

pexprs.any.eval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch) {
    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.end.eval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (inputStream.atEnd()) {
    state.pushBinding(new TerminalNode(state.grammar, undefined), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Terminal.prototype.eval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (!inputStream.matchString(this.obj)) {
    state.processFailure(origPos, this);
    return false;
  } else {
    state.pushBinding(new TerminalNode(state.grammar, this.obj), origPos);
    return true;
  }
};

pexprs.Range.prototype.eval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.from <= ch && ch <= this.to) {
    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Param.prototype.eval = function (state) {
  return state.eval(state.currentApplication().args[this.index]);
};

pexprs.Lex.prototype.eval = function (state) {
  state.enterLexifiedContext();
  var ans = state.eval(this.expr);
  state.exitLexifiedContext();
  return ans;
};

pexprs.Alt.prototype.eval = function (state) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (state.eval(this.terms[idx])) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.eval = function (state) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    var factor = this.factors[idx];
    if (!state.eval(factor)) {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.eval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var arity = this.getArity();
  var cols = [];
  var colOffsets = [];
  while (cols.length < arity) {
    cols.push([]);
    colOffsets.push([]);
  }

  var numMatches = 0;
  var prevPos = origPos;
  var idx;
  while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
    if (inputStream.pos === prevPos) {
      throw errors.kleeneExprHasNullableOperand(this, state._applicationStack);
    }
    prevPos = inputStream.pos;
    numMatches++;
    var row = state._bindings.splice(state._bindings.length - arity, arity);
    var rowOffsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
    for (idx = 0; idx < row.length; idx++) {
      cols[idx].push(row[idx]);
      colOffsets[idx].push(rowOffsets[idx]);
    }
  }
  if (numMatches < this.minNumMatches) {
    return false;
  }
  var offset = state.posToOffset(origPos);
  var matchLength = 0;
  if (numMatches > 0) {
    var lastCol = cols[arity - 1];
    var lastColOffsets = colOffsets[arity - 1];

    var endOffset = lastColOffsets[lastColOffsets.length - 1] + lastCol[lastCol.length - 1].matchLength;
    offset = colOffsets[0][0];
    matchLength = endOffset - offset;
  }
  var isOptional = this instanceof pexprs.Opt;
  for (idx = 0; idx < cols.length; idx++) {
    state._bindings.push(new IterationNode(state.grammar, cols[idx], colOffsets[idx], matchLength, isOptional));
    state._bindingOffsets.push(offset);
  }
  return true;
};

pexprs.Not.prototype.eval = function (state) {
  /*
    TODO:
    - Right now we're just throwing away all of the failures that happen inside a `not`, and
      recording `this` as a failed expression.
    - Double negation should be equivalent to lookahead, but that's not the case right now wrt
      failures. E.g., ~~'foo' produces a failure for ~~'foo', but maybe it should produce
      a failure for 'foo' instead.
  */

  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  state.pushFailuresInfo();

  var ans = state.eval(this.expr);

  state.popFailuresInfo();
  if (ans) {
    state.processFailure(origPos, this);
    return false;
  }

  inputStream.pos = origPos;
  return true;
};

pexprs.Lookahead.prototype.eval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (state.eval(this.expr)) {
    inputStream.pos = origPos;
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.eval = function (state) {
  var caller = state.currentApplication();
  var actuals = caller ? caller.args : [];
  var app = this.substituteParams(actuals);

  var posInfo = state.getCurrentPosInfo();
  if (posInfo.isActive(app)) {
    // This rule is already active at this position, i.e., it is left-recursive.
    return app.handleCycle(state);
  }

  var memoKey = app.toMemoKey();
  var memoRec = posInfo.memo[memoKey];

  if (memoRec && posInfo.shouldUseMemoizedResult(memoRec)) {
    if (state.hasNecessaryInfo(memoRec)) {
      return state.useMemoizedResult(state.inputStream.pos, memoRec);
    }
    delete posInfo.memo[memoKey];
  }
  return app.reallyEval(state);
};

pexprs.Apply.prototype.handleCycle = function (state) {
  var posInfo = state.getCurrentPosInfo();
  var currentLeftRecursion = posInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var memoRec = posInfo.memo[memoKey];

  if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
    // We already know about this left recursion, but it's possible there are "involved
    // applications" that we don't already know about, so...
    memoRec.updateInvolvedApplicationMemoKeys();
  } else if (!memoRec) {
    // New left recursion detected! Memoize a failure to try to get a seed parse.
    memoRec = posInfo.memoize(memoKey, { matchLength: 0, examinedLength: 0, value: false, rightmostFailureOffset: -1 });
    posInfo.startLeftRecursion(this, memoRec);
  }
  return state.useMemoizedResult(state.inputStream.pos, memoRec);
};

pexprs.Apply.prototype.reallyEval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var origPosInfo = state.getCurrentPosInfo();
  var ruleInfo = state.grammar.rules[this.ruleName];
  var body = ruleInfo.body;
  var description = ruleInfo.description;

  state.enterApplication(origPosInfo, this);

  if (description) {
    state.pushFailuresInfo();
  }

  // Reset the input stream's examinedLength property so that we can track
  // the examined length of this particular application.
  var origInputStreamExaminedLength = inputStream.examinedLength;
  inputStream.examinedLength = 0;

  var value = this.evalOnce(body, state);
  var currentLR = origPosInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var isHeadOfLeftRecursion = currentLR && currentLR.headApplication.toMemoKey() === memoKey;
  var memoRec;

  if (isHeadOfLeftRecursion) {
    value = this.growSeedResult(body, state, origPos, currentLR, value);
    origPosInfo.endLeftRecursion();
    memoRec = currentLR;
    memoRec.examinedLength = inputStream.examinedLength - origPos;
    memoRec.rightmostFailureOffset = state._getRightmostFailureOffset();
    origPosInfo.memoize(memoKey, memoRec); // updates origPosInfo's maxExaminedLength
  } else if (!currentLR || !currentLR.isInvolved(memoKey)) {
    // This application is not involved in left recursion, so it's ok to memoize it.
    memoRec = origPosInfo.memoize(memoKey, {
      matchLength: inputStream.pos - origPos,
      examinedLength: inputStream.examinedLength - origPos,
      value: value,
      failuresAtRightmostPosition: state.cloneRecordedFailures(),
      rightmostFailureOffset: state._getRightmostFailureOffset()
    });
  }
  var succeeded = !!value;

  if (description) {
    state.popFailuresInfo();
    if (!succeeded) {
      state.processFailure(origPos, this);
    }
    if (memoRec) {
      memoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();
    }
  }

  // Record trace information in the memo table, so that it is available if the memoized result
  // is used later.
  if (state.isTracing() && memoRec) {
    var entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
    if (isHeadOfLeftRecursion) {
      common.assert(entry.terminatingLREntry != null || !succeeded);
      entry.isHeadOfLeftRecursion = true;
    }
    memoRec.traceEntry = entry;
  }

  // Fix the input stream's examinedLength -- it should be the maximum examined length
  // across all applications, not just this one.
  inputStream.examinedLength = Math.max(inputStream.examinedLength, origInputStreamExaminedLength);

  state.exitApplication(origPosInfo, value);

  return succeeded;
};

pexprs.Apply.prototype.evalOnce = function (expr, state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;

  if (state.eval(expr)) {
    var arity = expr.getArity();
    var bindings = state._bindings.splice(state._bindings.length - arity, arity);
    var offsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
    return new NonterminalNode(state.grammar, this.ruleName, bindings, offsets, inputStream.pos - origPos);
  } else {
    return false;
  }
};

pexprs.Apply.prototype.growSeedResult = function (body, state, origPos, lrMemoRec, newValue) {
  if (!newValue) {
    return false;
  }

  var inputStream = state.inputStream;

  while (true) {
    lrMemoRec.matchLength = inputStream.pos - origPos;
    lrMemoRec.value = newValue;
    lrMemoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();

    if (state.isTracing()) {
      // Before evaluating the body again, add a trace node for this application to the memo entry.
      // Its only child is a copy of the trace node from `newValue`, which will always be the last
      // element in `state.trace`.
      var seedTrace = state.trace[state.trace.length - 1];
      lrMemoRec.traceEntry = new Trace(state.input, origPos, inputStream.pos, this, true, [newValue], [seedTrace.clone()]);
    }
    inputStream.pos = origPos;
    newValue = this.evalOnce(body, state);
    if (inputStream.pos - origPos <= lrMemoRec.matchLength) {
      break;
    }
    if (state.isTracing()) {
      state.trace.splice(-2, 1); // Drop the trace for the old seed.
    }
  }
  if (state.isTracing()) {
    // The last entry is for an unused result -- pop it and save it in the "real" entry.
    lrMemoRec.traceEntry.recordLRTermination(state.trace.pop(), newValue);
  }
  inputStream.pos = origPos + lrMemoRec.matchLength;
  return lrMemoRec.value;
};

pexprs.UnicodeChar.prototype.eval = function (state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.pattern.test(ch)) {
    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

},{"./Trace":43,"./common":44,"./errors":45,"./nodes":47,"./pexprs":64}],54:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------

function flatten(listOfLists) {
  return Array.prototype.concat.apply([], listOfLists);
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.generateExample = common.abstract('generateExample');

function categorizeExamples(examples) {
  // A list of rules that the system needs examples of, in order to generate an example
  //   for the current rule
  var examplesNeeded = examples.filter(function (example) {
    return example.hasOwnProperty('examplesNeeded');
  }).map(function (example) {
    return example.examplesNeeded;
  });

  examplesNeeded = flatten(examplesNeeded);

  var uniqueExamplesNeeded = {};
  for (var i = 0; i < examplesNeeded.length; i++) {
    var currentExampleNeeded = examplesNeeded[i];
    uniqueExamplesNeeded[currentExampleNeeded] = true;
  }
  examplesNeeded = Object.keys(uniqueExamplesNeeded);

  // A list of successfully generated examples
  var successfulExamples = examples.filter(function (example) {
    return example.hasOwnProperty('value');
  }).map(function (item) {
    return item.value;
  });

  // This flag returns true if the system cannot generate the rule it is currently
  //   attempting to generate, regardless of whether or not it has the examples it needs.
  //   Currently, this is only used in overriding generators to prevent the system from
  //   generating examples for certain rules (e.g. 'ident').
  var needHelp = examples.some(function (item) {
    return item.needHelp;
  });

  return {
    examplesNeeded: examplesNeeded,
    successfulExamples: successfulExamples,
    needHelp: needHelp
  };
}

pexprs.any.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  return { value: String.fromCharCode(Math.floor(Math.random() * 255)) };
};

// Assumes that terminal's object is always a string
pexprs.Terminal.prototype.generateExample = function (grammar, examples, inSyntacticContext) {
  return { value: this.obj };
};

pexprs.Range.prototype.generateExample = function (grammar, examples, inSyntacticContext) {
  var rangeSize = this.to.charCodeAt(0) - this.from.charCodeAt(0);
  return { value: String.fromCharCode(this.from.charCodeAt(0) + Math.floor(rangeSize * Math.random())) };
};

pexprs.Param.prototype.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  return actuals[this.index].generateExample(grammar, examples, inSyntacticContext, actuals);
};

pexprs.Alt.prototype.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  // items -> termExamples
  var termExamples = this.terms.map(function (term) {
    return term.generateExample(grammar, examples, inSyntacticContext, actuals);
  });

  var categorizedExamples = categorizeExamples(termExamples);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;
  var needHelp = categorizedExamples.needHelp;

  var ans = {};

  // Alt can contain both an example and a request for examples
  if (successfulExamples.length > 0) {
    var i = Math.floor(Math.random() * successfulExamples.length);
    ans.value = successfulExamples[i];
  }
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }
  ans.needHelp = needHelp;

  return ans;
};

pexprs.Seq.prototype.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  var factorExamples = this.factors.map(function (factor) {
    return factor.generateExample(grammar, examples, inSyntacticContext, actuals);
  });
  var categorizedExamples = categorizeExamples(factorExamples);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;
  var needHelp = categorizedExamples.needHelp;

  var ans = {};

  // In a Seq, all pieces must succeed in order to have a successful example.
  if (examplesNeeded.length > 0 || needHelp) {
    ans.examplesNeeded = examplesNeeded;
    ans.needHelp = needHelp;
  } else {
    ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  }

  return ans;
};

pexprs.Iter.prototype.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  var rangeTimes = Math.min(this.maxNumMatches - this.minNumMatches, 3);
  var numTimes = Math.floor(Math.random() * (rangeTimes + 1) + this.minNumMatches);
  var items = [];

  for (var i = 0; i < numTimes; i++) {
    items.push(this.expr.generateExample(grammar, examples, inSyntacticContext, actuals));
  }

  var categorizedExamples = categorizeExamples(items);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;

  var ans = {};

  // It's always either one or the other.
  // TODO: instead of ' ', call 'spaces.generateExample()'
  ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }

  return ans;
};

// Right now, 'Not' and 'Lookahead' generate nothing and assume that whatever follows will
//   work according to the encoded constraints.
pexprs.Not.prototype.generateExample = function (grammar, examples, inSyntacticContext) {
  return { value: '' };
};

pexprs.Lookahead.prototype.generateExample = function (grammar, examples, inSyntacticContext) {
  return { value: '' };
};

pexprs.Lex.prototype.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  return this.expr.generateExample(grammar, examples, false, actuals);
};

pexprs.Apply.prototype.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  var ans = {};

  var ruleName = this.substituteParams(actuals).toString();

  if (!examples.hasOwnProperty(ruleName)) {
    ans.examplesNeeded = [ruleName];
  } else {
    var relevantExamples = examples[ruleName];
    var i = Math.floor(Math.random() * relevantExamples.length);
    ans.value = relevantExamples[i];
  }

  return ans;
};

pexprs.UnicodeChar.prototype.generateExample = function (grammar, examples, inSyntacticContext, actuals) {
  var char;
  switch (this.category) {
    case 'Lu':
      char = 'Á';break;
    case 'Ll':
      char = 'ŏ';break;
    case 'Lt':
      char = 'ǅ';break;
    case 'Lm':
      char = 'ˮ';break;
    case 'Lo':
      char = 'ƻ';break;

    case 'Nl':
      char = 'ↂ';break;
    case 'Nd':
      char = '½';break;

    case 'Mn':
      char = '\u0487';break;
    case 'Mc':
      char = 'ि';break;

    case 'Pc':
      char = '⁀';break;

    case 'Zs':
      char = '\u2001';break;

    case 'L':
      char = 'Á';break;
    case 'Ltmo':
      char = 'ǅ';break;
  }
  return { value: char }; // 💩
};

},{"./common":44,"./pexprs":64}],55:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.getArity = common.abstract('getArity');

pexprs.any.getArity = pexprs.end.getArity = pexprs.Terminal.prototype.getArity = pexprs.Range.prototype.getArity = pexprs.Param.prototype.getArity = pexprs.Apply.prototype.getArity = pexprs.UnicodeChar.prototype.getArity = function () {
  return 1;
};

pexprs.Alt.prototype.getArity = function () {
  // This is ok b/c all terms must have the same arity -- this property is
  // checked by the Grammar constructor.
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};

pexprs.Seq.prototype.getArity = function () {
  var arity = 0;
  for (var idx = 0; idx < this.factors.length; idx++) {
    arity += this.factors[idx].getArity();
  }
  return arity;
};

pexprs.Iter.prototype.getArity = function () {
  return this.expr.getArity();
};

pexprs.Not.prototype.getArity = function () {
  return 0;
};

pexprs.Lookahead.prototype.getArity = pexprs.Lex.prototype.getArity = function () {
  return this.expr.getArity();
};

},{"./common":44,"./pexprs":64}],56:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Called at grammar creation time to rewrite a rule body, replacing each reference to a formal
  parameter with a `Param` node. Returns a PExpr -- either a new one, or the original one if
  it was modified in place.
*/
pexprs.PExpr.prototype.introduceParams = common.abstract('introduceParams');

pexprs.any.introduceParams = pexprs.end.introduceParams = pexprs.Terminal.prototype.introduceParams = pexprs.Range.prototype.introduceParams = pexprs.Param.prototype.introduceParams = pexprs.UnicodeChar.prototype.introduceParams = function (formals) {
  return this;
};

pexprs.Alt.prototype.introduceParams = function (formals) {
  this.terms.forEach(function (term, idx, terms) {
    terms[idx] = term.introduceParams(formals);
  });
  return this;
};

pexprs.Seq.prototype.introduceParams = function (formals) {
  this.factors.forEach(function (factor, idx, factors) {
    factors[idx] = factor.introduceParams(formals);
  });
  return this;
};

pexprs.Iter.prototype.introduceParams = pexprs.Not.prototype.introduceParams = pexprs.Lookahead.prototype.introduceParams = pexprs.Lex.prototype.introduceParams = function (formals) {
  this.expr = this.expr.introduceParams(formals);
  return this;
};

pexprs.Apply.prototype.introduceParams = function (formals) {
  var index = formals.indexOf(this.ruleName);
  if (index >= 0) {
    if (this.args.length > 0) {
      // TODO: Should this be supported? See issue #64.
      throw new Error('Parameterized rules cannot be passed as arguments to another rule.');
    }
    return new pexprs.Param(index).withSource(this.source);
  } else {
    this.args.forEach(function (arg, idx, args) {
      args[idx] = arg.introduceParams(formals);
    });
    return this;
  }
};

},{"./common":44,"./pexprs":64}],57:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns `true` if this parsing expression may accept without consuming any input.
pexprs.PExpr.prototype.isNullable = function (grammar) {
  return this._isNullable(grammar, Object.create(null));
};

pexprs.PExpr.prototype._isNullable = common.abstract('_isNullable');

pexprs.any._isNullable = pexprs.Range.prototype._isNullable = pexprs.Param.prototype._isNullable = pexprs.Plus.prototype._isNullable = pexprs.UnicodeChar.prototype._isNullable = function (grammar, memo) {
  return false;
};

pexprs.end._isNullable = function (grammar, memo) {
  return true;
};

pexprs.Terminal.prototype._isNullable = function (grammar, memo) {
  if (typeof this.obj === 'string') {
    // This is an over-simplification: it's only correct if the input is a string. If it's an array
    // or an object, then the empty string parsing expression is not nullable.
    return this.obj === '';
  } else {
    return false;
  }
};

pexprs.Alt.prototype._isNullable = function (grammar, memo) {
  return this.terms.length === 0 || this.terms.some(function (term) {
    return term._isNullable(grammar, memo);
  });
};

pexprs.Seq.prototype._isNullable = function (grammar, memo) {
  return this.factors.every(function (factor) {
    return factor._isNullable(grammar, memo);
  });
};

pexprs.Star.prototype._isNullable = pexprs.Opt.prototype._isNullable = pexprs.Not.prototype._isNullable = pexprs.Lookahead.prototype._isNullable = function (grammar, memo) {
  return true;
};

pexprs.Lex.prototype._isNullable = function (grammar, memo) {
  return this.expr._isNullable(grammar, memo);
};

pexprs.Apply.prototype._isNullable = function (grammar, memo) {
  var key = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(memo, key)) {
    var body = grammar.rules[this.ruleName].body;
    var inlined = body.substituteParams(this.args);
    memo[key] = false; // Prevent infinite recursion for recursive rules.
    memo[key] = inlined._isNullable(grammar, memo);
  }
  return memo[key];
};

},{"./common":44,"./pexprs":64}],58:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function getMetaInfo(expr, grammarInterval) {
  var metaInfo = {};
  if (expr.source && grammarInterval) {
    var adjusted = expr.source.relativeTo(grammarInterval);
    metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
  }
  return metaInfo;
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract('outputRecipe');

pexprs.any.outputRecipe = function (formals, grammarInterval) {
  return ['any', getMetaInfo(this, grammarInterval)];
};

pexprs.end.outputRecipe = function (formals, grammarInterval) {
  return ['end', getMetaInfo(this, grammarInterval)];
};

pexprs.Terminal.prototype.outputRecipe = function (formals, grammarInterval) {
  return ['terminal', getMetaInfo(this, grammarInterval), this.obj];
};

pexprs.Range.prototype.outputRecipe = function (formals, grammarInterval) {
  return ['range', getMetaInfo(this, grammarInterval), this.from, this.to];
};

pexprs.Param.prototype.outputRecipe = function (formals, grammarInterval) {
  return ['param', getMetaInfo(this, grammarInterval), this.index];
};

pexprs.Alt.prototype.outputRecipe = function (formals, grammarInterval) {
  return ['alt', getMetaInfo(this, grammarInterval)].concat(this.terms.map(function (term) {
    return term.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Extend.prototype.outputRecipe = function (formals, grammarInterval) {
  var extension = this.terms[0]; // [extension, orginal]
  return extension.outputRecipe(formals, grammarInterval);
};

pexprs.Seq.prototype.outputRecipe = function (formals, grammarInterval) {
  return ['seq', getMetaInfo(this, grammarInterval)].concat(this.factors.map(function (factor) {
    return factor.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Star.prototype.outputRecipe = pexprs.Plus.prototype.outputRecipe = pexprs.Opt.prototype.outputRecipe = pexprs.Not.prototype.outputRecipe = pexprs.Lookahead.prototype.outputRecipe = pexprs.Lex.prototype.outputRecipe = function (formals, grammarInterval) {
  return [this.constructor.name.toLowerCase(), getMetaInfo(this, grammarInterval), this.expr.outputRecipe(formals, grammarInterval)];
};

pexprs.Apply.prototype.outputRecipe = function (formals, grammarInterval) {
  return ['app', getMetaInfo(this, grammarInterval), this.ruleName, this.args.map(function (arg) {
    return arg.outputRecipe(formals, grammarInterval);
  })];
};

pexprs.UnicodeChar.prototype.outputRecipe = function (formals, grammarInterval) {
  return ['unicodeChar', getMetaInfo(this, grammarInterval), this.category];
};

},{"./common":44,"./pexprs":64}],59:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a PExpr that results from recursively replacing every formal parameter (i.e., instance
  of `Param`) inside this PExpr with its actual value from `actuals` (an Array).

  The receiver must not be modified; a new PExpr must be returned if any replacement is necessary.
*/
// function(actuals) { ... }
pexprs.PExpr.prototype.substituteParams = common.abstract('substituteParams');

pexprs.any.substituteParams = pexprs.end.substituteParams = pexprs.Terminal.prototype.substituteParams = pexprs.Range.prototype.substituteParams = pexprs.UnicodeChar.prototype.substituteParams = function (actuals) {
  return this;
};

pexprs.Param.prototype.substituteParams = function (actuals) {
  return actuals[this.index];
};

pexprs.Alt.prototype.substituteParams = function (actuals) {
  return new pexprs.Alt(this.terms.map(function (term) {
    return term.substituteParams(actuals);
  }));
};

pexprs.Seq.prototype.substituteParams = function (actuals) {
  return new pexprs.Seq(this.factors.map(function (factor) {
    return factor.substituteParams(actuals);
  }));
};

pexprs.Iter.prototype.substituteParams = pexprs.Not.prototype.substituteParams = pexprs.Lookahead.prototype.substituteParams = pexprs.Lex.prototype.substituteParams = function (actuals) {
  return new this.constructor(this.expr.substituteParams(actuals));
};

pexprs.Apply.prototype.substituteParams = function (actuals) {
  if (this.args.length === 0) {
    // Avoid making a copy of this application, as an optimization
    return this;
  } else {
    var args = this.args.map(function (arg) {
      return arg.substituteParams(actuals);
    });
    return new pexprs.Apply(this.ruleName, args);
  }
};

},{"./common":44,"./pexprs":64}],60:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

var copyWithoutDuplicates = common.copyWithoutDuplicates;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function isRestrictedJSIdentifier(str) {
  return (/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str)
  );
}

function resolveDuplicatedNames(argumentNameList) {
  // `count` is used to record the number of times each argument name occurs in the list,
  // this is useful for checking duplicated argument name. It maps argument names to ints.
  var count = Object.create(null);
  argumentNameList.forEach(function (argName) {
    count[argName] = (count[argName] || 0) + 1;
  });

  // Append subscripts ('_1', '_2', ...) to duplicate argument names.
  Object.keys(count).forEach(function (dupArgName) {
    if (count[dupArgName] <= 1) {
      return;
    }

    // This name shows up more than once, so add subscripts.
    var subscript = 1;
    argumentNameList.forEach(function (argName, idx) {
      if (argName === dupArgName) {
        argumentNameList[idx] = argName + '_' + subscript++;
      }
    });
  });
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a list of strings that will be used as the default argument names for its receiver
  (a pexpr) in a semantic action. This is used exclusively by the Semantics Editor.

  `firstArgIndex` is the 1-based index of the first argument name that will be generated for this
  pexpr. It enables us to name arguments positionally, e.g., if the second argument is a
  non-alphanumeric terminal like "+", it will be named '$2'.

  `noDupCheck` is true if the caller of `toArgumentNameList` is not a top level caller. It enables
  us to avoid nested duplication subscripts appending, e.g., '_1_1', '_1_2', by only checking
  duplicates at the top level.

  Here is a more elaborate example that illustrates how this method works:
  `(a "+" b).toArgumentNameList(1)` evaluates to `['a', '$2', 'b']` with the following recursive
  calls:

    (a).toArgumentNameList(1) -> ['a'],
    ("+").toArgumentNameList(2) -> ['$2'],
    (b).toArgumentNameList(3) -> ['b']

  Notes:
  * This method must only be called on well-formed expressions, e.g., the receiver must
    not have any Alt sub-expressions with inconsistent arities.
  * e.getArity() === e.toArgumentNameList(1).length
*/
// function(firstArgIndex, noDupCheck) { ... }
pexprs.PExpr.prototype.toArgumentNameList = common.abstract('toArgumentNameList');

pexprs.any.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return ['any'];
};

pexprs.end.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return ['end'];
};

pexprs.Terminal.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  if (typeof this.obj === 'string' && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
    // If this terminal is a valid suffix for a JS identifier, just prepend it with '_'
    return ['_' + this.obj];
  } else {
    // Otherwise, name it positionally.
    return ['$' + firstArgIndex];
  }
};

pexprs.Range.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  var argName = this.from + '_to_' + this.to;
  // If the `argName` is not valid then try to prepend a `_`.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '_' + argName;
  }
  // If the `argName` still not valid after prepending a `_`, then name it positionally.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '$' + firstArgIndex;
  }
  return [argName];
};

pexprs.Alt.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  // `termArgNameLists` is an array of arrays where each row is the
  // argument name list that corresponds to a term in this alternation.
  var termArgNameLists = this.terms.map(function (term) {
    return term.toArgumentNameList(firstArgIndex, true);
  });

  var argumentNameList = [];
  var numArgs = termArgNameLists[0].length;
  for (var colIdx = 0; colIdx < numArgs; colIdx++) {
    var col = [];
    for (var rowIdx = 0; rowIdx < this.terms.length; rowIdx++) {
      col.push(termArgNameLists[rowIdx][colIdx]);
    }
    var uniqueNames = copyWithoutDuplicates(col);
    argumentNameList.push(uniqueNames.join('_or_'));
  }

  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Seq.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  // Generate the argument name list, without worrying about duplicates.
  var argumentNameList = [];
  this.factors.forEach(function (factor) {
    var factorArgumentNameList = factor.toArgumentNameList(firstArgIndex, true);
    argumentNameList = argumentNameList.concat(factorArgumentNameList);

    // Shift the firstArgIndex to take this factor's argument names into account.
    firstArgIndex += factorArgumentNameList.length;
  });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Iter.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  var argumentNameList = this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map(function (exprArgumentString) {
    return exprArgumentString[exprArgumentString.length - 1] === 's' ? exprArgumentString + 'es' : exprArgumentString + 's';
  });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Opt.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map(function (argName) {
    return 'opt' + argName[0].toUpperCase() + argName.slice(1);
  });
};

pexprs.Not.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return [];
};

pexprs.Lookahead.prototype.toArgumentNameList = pexprs.Lex.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck);
};

pexprs.Apply.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return [this.ruleName];
};

pexprs.UnicodeChar.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return ['$' + firstArgIndex];
};

pexprs.Param.prototype.toArgumentNameList = function (firstArgIndex, noDupCheck) {
  return ['param' + this.index];
};

// "Value pexprs" (Value, Str, Arr, Obj) are going away soon, so we don't worry about them here.

},{"./common":44,"./pexprs":64}],61:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns a string representing the PExpr, for use as a UI label, etc.
pexprs.PExpr.prototype.toDisplayString = common.abstract('toDisplayString');

pexprs.Alt.prototype.toDisplayString = pexprs.Seq.prototype.toDisplayString = function () {
  if (this.source) {
    return this.source.trimmed().contents;
  }
  return '[' + this.constructor.name + ']';
};

pexprs.any.toDisplayString = pexprs.end.toDisplayString = pexprs.Iter.prototype.toDisplayString = pexprs.Not.prototype.toDisplayString = pexprs.Lookahead.prototype.toDisplayString = pexprs.Lex.prototype.toDisplayString = pexprs.Terminal.prototype.toDisplayString = pexprs.Range.prototype.toDisplayString = pexprs.Param.prototype.toDisplayString = function () {
  return this.toString();
};

pexprs.Apply.prototype.toDisplayString = function () {
  if (this.args.length > 0) {
    var ps = this.args.map(function (arg) {
      return arg.toDisplayString();
    });
    return this.ruleName + '<' + ps.join(',') + '>';
  } else {
    return this.ruleName;
  }
};

pexprs.UnicodeChar.prototype.toDisplayString = function () {
  return 'Unicode [' + this.category + '] character';
};

},{"./common":44,"./pexprs":64}],62:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Failure = require('./Failure');
var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toFailure = common.abstract('toFailure');

pexprs.any.toFailure = function (grammar) {
  return new Failure(this, 'any object', 'description');
};

pexprs.end.toFailure = function (grammar) {
  return new Failure(this, 'end of input', 'description');
};

pexprs.Terminal.prototype.toFailure = function (grammar) {
  return new Failure(this, this.obj, 'string');
};

pexprs.Range.prototype.toFailure = function (grammar) {
  // TODO: come up with something better
  return new Failure(this, JSON.stringify(this.from) + '..' + JSON.stringify(this.to), 'code');
};

pexprs.Not.prototype.toFailure = function (grammar) {
  var description = this.expr === pexprs.any ? 'nothing' : 'not ' + this.expr.toFailure(grammar);
  return new Failure(this, description, 'description');
};

pexprs.Lookahead.prototype.toFailure = function (grammar) {
  return this.expr.toFailure(grammar);
};

pexprs.Apply.prototype.toFailure = function (grammar) {
  var description = grammar.rules[this.ruleName].description;
  if (!description) {
    var article = /^[aeiouAEIOU]/.test(this.ruleName) ? 'an' : 'a';
    description = article + ' ' + this.ruleName;
  }
  return new Failure(this, description, 'description');
};

pexprs.UnicodeChar.prototype.toFailure = function (grammar) {
  return new Failure(this, 'a Unicode [' + this.category + '] character', 'description');
};

pexprs.Alt.prototype.toFailure = function (grammar) {
  var fs = this.terms.map(function (t) {
    return t.toFailure();
  });
  var description = '(' + fs.join(' or ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Seq.prototype.toFailure = function (grammar) {
  var fs = this.factors.map(function (f) {
    return f.toFailure();
  });
  var description = '(' + fs.join(' ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Iter.prototype.toFailure = function (grammar) {
  var description = '(' + this.expr.toFailure() + this.operator + ')';
  return new Failure(this, description, 'description');
};

},{"./Failure":32,"./common":44,"./pexprs":64}],63:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  e1.toString() === e2.toString() ==> e1 and e2 are semantically equivalent.
  Note that this is not an iff (<==>): e.g.,
  (~"b" "a").toString() !== ("a").toString(), even though
  ~"b" "a" and "a" are interchangeable in any grammar,
  both in terms of the languages they accept and their arities.
*/
pexprs.PExpr.prototype.toString = common.abstract('toString');

pexprs.any.toString = function () {
  return 'any';
};

pexprs.end.toString = function () {
  return 'end';
};

pexprs.Terminal.prototype.toString = function () {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toString = function () {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toString = function () {
  return '$' + this.index;
};

pexprs.Lex.prototype.toString = function () {
  return '#(' + this.expr.toString() + ')';
};

pexprs.Alt.prototype.toString = function () {
  return this.terms.length === 1 ? this.terms[0].toString() : '(' + this.terms.map(function (term) {
    return term.toString();
  }).join(' | ') + ')';
};

pexprs.Seq.prototype.toString = function () {
  return this.factors.length === 1 ? this.factors[0].toString() : '(' + this.factors.map(function (factor) {
    return factor.toString();
  }).join(' ') + ')';
};

pexprs.Iter.prototype.toString = function () {
  return this.expr + this.operator;
};

pexprs.Not.prototype.toString = function () {
  return '~' + this.expr;
};

pexprs.Lookahead.prototype.toString = function () {
  return '&' + this.expr;
};

pexprs.Apply.prototype.toString = function () {
  if (this.args.length > 0) {
    var ps = this.args.map(function (arg) {
      return arg.toString();
    });
    return this.ruleName + '<' + ps.join(',') + '>';
  } else {
    return this.ruleName;
  }
};

pexprs.UnicodeChar.prototype.toString = function () {
  return '\\p{' + this.category + '}';
};

},{"./common":44,"./pexprs":64}],64:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var UnicodeCategories = require('../third_party/UnicodeCategories');
var common = require('./common');
var inherits = require('inherits');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

function PExpr() {
  throw new Error("PExpr cannot be instantiated -- it's abstract");
}

// Set the `source` property to the interval containing the source for this expression.
PExpr.prototype.withSource = function (interval) {
  if (interval) {
    this.source = interval.trimmed();
  }
  return this;
};

// Any

var any = Object.create(PExpr.prototype);

// End

var end = Object.create(PExpr.prototype);

// Terminals

function Terminal(obj) {
  this.obj = obj;
}
inherits(Terminal, PExpr);

// Ranges

function Range(from, to) {
  this.from = from;
  this.to = to;
}
inherits(Range, PExpr);

// Parameters

function Param(index) {
  this.index = index;
}
inherits(Param, PExpr);

// Alternation

function Alt(terms) {
  this.terms = terms;
}
inherits(Alt, PExpr);

// Extend is an implementation detail of rule extension

function Extend(superGrammar, name, body) {
  this.superGrammar = superGrammar;
  this.name = name;
  this.body = body;
  var origBody = superGrammar.rules[name].body;
  this.terms = [body, origBody];
}
inherits(Extend, Alt);

// Sequences

function Seq(factors) {
  this.factors = factors;
}
inherits(Seq, PExpr);

// Iterators and optionals

function Iter(expr) {
  this.expr = expr;
}
inherits(Iter, PExpr);

function Star(expr) {
  this.expr = expr;
}
inherits(Star, Iter);

function Plus(expr) {
  this.expr = expr;
}
inherits(Plus, Iter);

function Opt(expr) {
  this.expr = expr;
}
inherits(Opt, Iter);

Star.prototype.operator = '*';
Plus.prototype.operator = '+';
Opt.prototype.operator = '?';

Star.prototype.minNumMatches = 0;
Plus.prototype.minNumMatches = 1;
Opt.prototype.minNumMatches = 0;

Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Opt.prototype.maxNumMatches = 1;

// Predicates

function Not(expr) {
  this.expr = expr;
}
inherits(Not, PExpr);

function Lookahead(expr) {
  this.expr = expr;
}
inherits(Lookahead, PExpr);

// "Lexification"

function Lex(expr) {
  this.expr = expr;
}
inherits(Lex, PExpr);

// Rule application

function Apply(ruleName, optArgs) {
  this.ruleName = ruleName;
  this.args = optArgs || [];
}
inherits(Apply, PExpr);

Apply.prototype.isSyntactic = function () {
  return common.isSyntactic(this.ruleName);
};

// This method just caches the result of `this.toString()` in a non-enumerable property.
Apply.prototype.toMemoKey = function () {
  if (!this._memoKey) {
    Object.defineProperty(this, '_memoKey', { value: this.toString() });
  }
  return this._memoKey;
};

// Unicode character

function UnicodeChar(category) {
  this.category = category;
  this.pattern = UnicodeCategories[category];
}
inherits(UnicodeChar, PExpr);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.PExpr = PExpr;
exports.any = any;
exports.end = end;
exports.Terminal = Terminal;
exports.Range = Range;
exports.Param = Param;
exports.Alt = Alt;
exports.Extend = Extend;
exports.Seq = Seq;
exports.Iter = Iter;
exports.Star = Star;
exports.Plus = Plus;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Lex = Lex;
exports.Apply = Apply;
exports.UnicodeChar = UnicodeChar;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

require('./pexprs-allowsSkippingPrecedingSpace');
require('./pexprs-assertAllApplicationsAreValid');
require('./pexprs-assertChoicesHaveUniformArity');
require('./pexprs-assertIteratedExprsAreNotNullable');
require('./pexprs-check');
require('./pexprs-eval');
require('./pexprs-getArity');
require('./pexprs-generateExample');
require('./pexprs-outputRecipe');
require('./pexprs-introduceParams');
require('./pexprs-isNullable');
require('./pexprs-substituteParams');
require('./pexprs-toDisplayString');
require('./pexprs-toArgumentNameList');
require('./pexprs-toFailure');
require('./pexprs-toString');

},{"../third_party/UnicodeCategories":67,"./common":44,"./pexprs-allowsSkippingPrecedingSpace":48,"./pexprs-assertAllApplicationsAreValid":49,"./pexprs-assertChoicesHaveUniformArity":50,"./pexprs-assertIteratedExprsAreNotNullable":51,"./pexprs-check":52,"./pexprs-eval":53,"./pexprs-generateExample":54,"./pexprs-getArity":55,"./pexprs-introduceParams":56,"./pexprs-isNullable":57,"./pexprs-outputRecipe":58,"./pexprs-substituteParams":59,"./pexprs-toArgumentNameList":60,"./pexprs-toDisplayString":61,"./pexprs-toFailure":62,"./pexprs-toString":63,"inherits":27}],65:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Given an array of numbers `arr`, return an array of the numbers as strings,
// right-justified and padded to the same length.
function padNumbersToEqualLength(arr) {
  var maxLen = 0;
  var strings = arr.map(function (n) {
    var str = n.toString();
    maxLen = Math.max(maxLen, str.length);
    return str;
  });
  return strings.map(function (s) {
    return common.padLeft(s, maxLen);
  });
}

// Produce a new string that would be the result of copying the contents
// of the string `src` onto `dest` at offset `offest`.
function strcpy(dest, src, offset) {
  var origDestLen = dest.length;
  var start = dest.slice(0, offset);
  var end = dest.slice(offset + src.length);
  return (start + src + end).substr(0, origDestLen);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

var builtInRulesCallbacks = [];

// Since Grammar.BuiltInRules is bootstrapped, most of Ohm can't directly depend it.
// This function allows modules that do depend on the built-in rules to register a callback
// that will be called later in the initialization process.
exports.awaitBuiltInRules = function (cb) {
  builtInRulesCallbacks.push(cb);
};

exports.announceBuiltInRules = function (grammar) {
  builtInRulesCallbacks.forEach(function (cb) {
    cb(grammar);
  });
  builtInRulesCallbacks = null;
};

// Return an object with the line and column information for the given
// offset in `str`.
exports.getLineAndColumn = function (str, offset) {
  var lineNum = 1;
  var colNum = 1;

  var currOffset = 0;
  var lineStartOffset = 0;

  var nextLine = null;
  var prevLine = null;
  var prevLineStartOffset = -1;

  while (currOffset < offset) {
    var c = str.charAt(currOffset++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      prevLineStartOffset = lineStartOffset;
      lineStartOffset = currOffset;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  // Find the end of the target line.
  var lineEndOffset = str.indexOf('\n', lineStartOffset);
  if (lineEndOffset === -1) {
    lineEndOffset = str.length;
  } else {
    // Get the next line.
    var nextLineEndOffset = str.indexOf('\n', lineEndOffset + 1);
    nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset) : str.slice(lineEndOffset, nextLineEndOffset);
    // Strip leading and trailing EOL char(s).
    nextLine = nextLine.replace(/^\r?\n/, '').replace(/\r$/, '');
  }

  // Get the previous line.
  if (prevLineStartOffset >= 0) {
    prevLine = str.slice(prevLineStartOffset, lineStartOffset).replace(/\r?\n$/, ''); // Strip trailing EOL char(s).
  }

  // Get the target line, stripping a trailing carriage return if necessary.
  var line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, '');

  return {
    lineNum: lineNum,
    colNum: colNum,
    line: line,
    prevLine: prevLine,
    nextLine: nextLine
  };
};

// Return a nicely-formatted string describing the line and column for the
// given offset in `str`.
exports.getLineAndColumnMessage = function (str, offset /* ...ranges */) {
  var repeatStr = common.repeatStr;

  var lineAndCol = exports.getLineAndColumn(str, offset);
  var sb = new common.StringBuffer();
  sb.append('Line ' + lineAndCol.lineNum + ', col ' + lineAndCol.colNum + ':\n');

  // An array of the previous, current, and next line numbers as strings of equal length.
  var lineNumbers = padNumbersToEqualLength([lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1, lineAndCol.lineNum, lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1]);

  // Helper for appending formatting input lines to the buffer.
  function appendLine(num, content, prefix) {
    sb.append(prefix + lineNumbers[num] + ' | ' + content + '\n');
  }

  // Include the previous line for context if possible.
  if (lineAndCol.prevLine != null) {
    appendLine(0, lineAndCol.prevLine, '  ');
  }
  // Line that the error occurred on.
  appendLine(1, lineAndCol.line, '> ');

  // Build up the line that points to the offset and possible indicates one or more ranges.
  // Start with a blank line, and indicate each range by overlaying a string of `~` chars.
  var lineLen = lineAndCol.line.length;
  var indicationLine = repeatStr(' ', lineLen + 1);
  var ranges = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < ranges.length; ++i) {
    var startIdx = ranges[i][0];
    var endIdx = ranges[i][1];
    common.assert(startIdx >= 0 && startIdx <= endIdx, 'range start must be >= 0 and <= end');

    var lineStartOffset = offset - lineAndCol.colNum + 1;
    startIdx = Math.max(0, startIdx - lineStartOffset);
    endIdx = Math.min(endIdx - lineStartOffset, lineLen);

    indicationLine = strcpy(indicationLine, repeatStr('~', endIdx - startIdx), startIdx);
  }
  var gutterWidth = 2 + lineNumbers[1].length + 3;
  sb.append(repeatStr(' ', gutterWidth));
  indicationLine = strcpy(indicationLine, '^', lineAndCol.colNum - 1);
  sb.append(indicationLine.replace(/ +$/, '') + '\n');

  // Include the next line for context if possible.
  if (lineAndCol.nextLine != null) {
    appendLine(2, lineAndCol.nextLine, '  ');
  }
  return sb.contents();
};

},{"./common":44}],66:[function(require,module,exports){
(function (browserifyGlobalOhmVersion){
/* global browserifyGlobalOhmVersion */

'use strict';

// When running under Node, read the version from package.json. For the browser,
// use a special global variable defined in the build process (see bin/build-debug.js).

module.exports = typeof browserifyGlobalOhmVersion === 'string' ? browserifyGlobalOhmVersion : require('../package.json').version;

}).call(this,"0.14.0")

},{"../package.json":undefined}],67:[function(require,module,exports){
"use strict";

// Based on https://github.com/mathiasbynens/unicode-9.0.0.
// These are just categories that are used in ES5/ES2015.
// The full list of Unicode categories is here: http://www.fileformat.info/info/unicode/category/index.htm.
module.exports = {
  // Letters
  Lu: /[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]/,
  Ll: /[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]/,
  Lt: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,
  Lm: /[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]/,
  Lo: /[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,

  // Numbers
  Nl: /[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]|\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]/,
  Nd: /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|[\uD805\uD807][\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]/,

  // Marks
  Mn: /[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]/,
  Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,

  // Punctuation, Connector
  Pc: /[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]/,

  // Separator, Space
  Zs: /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,

  // These two are not real Unicode categories, but our useful for Ohm.
  // L is a combination of all the letter categories.
  // Ltmo is a combination of Lt, Lm, and Lo.
  L: /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
  Ltmo: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]|[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]|[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/
};

},{}]},{},[46])(46)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2J1aWx0LWluLXJ1bGVzLmpzIiwiZGlzdC9vaG0tZ3JhbW1hci5qcyIsImRpc3Qvb3BlcmF0aW9ucy1hbmQtYXR0cmlidXRlcy5qcyIsImV4dHJhcy9WaXNpdG9yRmFtaWx5LmpzIiwiZXh0cmFzL2luZGV4LmpzIiwiZXh0cmFzL3NlbWFudGljcy10b0FTVC5qcyIsIm5vZGVfbW9kdWxlcy9kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvZnVuY3Rpb24vbm9vcC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWUuanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvaXMtaW1wbGVtZW50ZWQuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9pcy1zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9wb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL3ZhbGlkYXRlLXN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91dGlsLWV4dGVuZC9leHRlbmQuanMiLCJzcmMvQnVpbGRlci5qcyIsInNyYy9DYXNlSW5zZW5zaXRpdmVUZXJtaW5hbC5qcyIsInNyYy9GYWlsdXJlLmpzIiwic3JjL0dyYW1tYXIuanMiLCJzcmMvR3JhbW1hckRlY2wuanMiLCJzcmMvSW5wdXRTdHJlYW0uanMiLCJzcmMvSW50ZXJ2YWwuanMiLCJzcmMvTWF0Y2hSZXN1bHQuanMiLCJzcmMvTWF0Y2hTdGF0ZS5qcyIsInNyYy9NYXRjaGVyLmpzIiwic3JjL05hbWVzcGFjZS5qcyIsInNyYy9Qb3NJbmZvLmpzIiwic3JjL1NlbWFudGljcy5qcyIsInNyYy9UcmFjZS5qcyIsInNyYy9jb21tb24uanMiLCJzcmMvZXJyb3JzLmpzIiwic3JjL21haW4uanMiLCJzcmMvbm9kZXMuanMiLCJzcmMvcGV4cHJzLWFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UuanMiLCJzcmMvcGV4cHJzLWFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkLmpzIiwic3JjL3BleHBycy1hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eS5qcyIsInNyYy9wZXhwcnMtYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlLmpzIiwic3JjL3BleHBycy1jaGVjay5qcyIsInNyYy9wZXhwcnMtZXZhbC5qcyIsInNyYy9wZXhwcnMtZ2VuZXJhdGVFeGFtcGxlLmpzIiwic3JjL3BleHBycy1nZXRBcml0eS5qcyIsInNyYy9wZXhwcnMtaW50cm9kdWNlUGFyYW1zLmpzIiwic3JjL3BleHBycy1pc051bGxhYmxlLmpzIiwic3JjL3BleHBycy1vdXRwdXRSZWNpcGUuanMiLCJzcmMvcGV4cHJzLXN1YnN0aXR1dGVQYXJhbXMuanMiLCJzcmMvcGV4cHJzLXRvQXJndW1lbnROYW1lTGlzdC5qcyIsInNyYy9wZXhwcnMtdG9EaXNwbGF5U3RyaW5nLmpzIiwic3JjL3BleHBycy10b0ZhaWx1cmUuanMiLCJzcmMvcGV4cHJzLXRvU3RyaW5nLmpzIiwic3JjL3BleHBycy5qcyIsInNyYy91dGlsLmpzIiwic3JjL3ZlcnNpb24uanMiLCJ0aGlyZF9wYXJ0eS9Vbmljb2RlQ2F0ZWdvcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0E7Ozs7OztBQUNBLE9BQU8sT0FBUCxHQUFpQixXQUFJLFVBQUosQ0FBZSxDQUFDLFNBQUQsRUFBVyxFQUFDLFVBQVMsOHBCQUFWLEVBQVgsRUFBcXJCLGNBQXJyQixFQUFvc0IsSUFBcHNCLEVBQXlzQixJQUF6c0IsRUFBOHNCLEVBQUMsU0FBUSxDQUFDLFFBQUQsRUFBVSxFQUFDLGtCQUFpQixDQUFDLEVBQUQsRUFBSSxFQUFKLENBQWxCLEVBQVYsRUFBcUMsNEJBQXJDLEVBQWtFLEVBQWxFLEVBQXFFLENBQUMsS0FBRCxFQUFPLEVBQUMsa0JBQWlCLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBbEIsRUFBUCxFQUFrQyxDQUFDLEtBQUQsRUFBTyxFQUFDLGtCQUFpQixDQUFDLEVBQUQsRUFBSSxFQUFKLENBQWxCLEVBQVAsRUFBa0MsUUFBbEMsRUFBMkMsRUFBM0MsQ0FBbEMsRUFBaUYsQ0FBQyxLQUFELEVBQU8sRUFBQyxrQkFBaUIsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFsQixFQUFQLEVBQWtDLE9BQWxDLEVBQTBDLEVBQTFDLENBQWpGLENBQXJFLENBQVQsRUFBK00sVUFBUyxD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O0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFJLGsxS0FOVzs7QUFRZjtBQUNBLE1BQUksNkpBVFc7QUFVZixNQUFJLGt2QkFWVzs7QUFZZjtBQUNBLE1BQUksMmhHQWJXO0FBY2YsTUFBSSxpb0JBZFc7O0FBZ0JmO0FBQ0EsTUFBSSxzREFqQlc7O0FBbUJmO0FBQ0EsTUFBSSw4Q0FwQlc7O0FBc0JmO0FBQ0E7QUFDQTtBQUNBLEtBQUcscXROQXpCWTtBQTBCZixRQUFNO0FBMUJTLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gdmFyIG9obSA9IHJlcXVpcmUoJy4uJyk7XG5pbXBvcnQgb2htIGZyb20gJy4uJztcbm1vZHVsZS5leHBvcnRzID0gb2htLm1ha2VSZWNpcGUoW1wiZ3JhbW1hclwiLHtcInNvdXJjZVwiOlwiQnVpbHRJblJ1bGVzIHtcXG5cXG4gIGFsbnVtICAoYW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXIpXFxuICAgID0gbGV0dGVyXFxuICAgIHwgZGlnaXRcXG5cXG4gIGxldHRlciAgKGEgbGV0dGVyKVxcbiAgICA9IGxvd2VyXFxuICAgIHwgdXBwZXJcXG4gICAgfCB1bmljb2RlTHRtb1xcblxcbiAgZGlnaXQgIChhIGRpZ2l0KVxcbiAgICA9IFxcXCIwXFxcIi4uXFxcIjlcXFwiXFxuXFxuICBoZXhEaWdpdCAgKGEgaGV4YWRlY2ltYWwgZGlnaXQpXFxuICAgID0gZGlnaXRcXG4gICAgfCBcXFwiYVxcXCIuLlxcXCJmXFxcIlxcbiAgICB8IFxcXCJBXFxcIi4uXFxcIkZcXFwiXFxuXFxuICBMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICA9IE5vbmVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgfCBFbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuXFxuICBOb25lbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gZWxlbSAoc2VwIGVsZW0pKlxcblxcbiAgRW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICA9IC8qIG5vdGhpbmcgKi9cXG5cXG4gIGxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gbm9uZW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICB8IGVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG5cXG4gIG5vbmVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgPSBlbGVtIChzZXAgZWxlbSkqXFxuXFxuICBlbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gLyogbm90aGluZyAqL1xcblxcbn1cIn0sXCJCdWlsdEluUnVsZXNcIixudWxsLG51bGwse1wiYWxudW1cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOCw3OF19LFwiYW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXJcIixbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MCw3OF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYwLDY2XX0sXCJsZXR0ZXJcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzMsNzhdfSxcImRpZ2l0XCIsW11dXV0sXCJsZXR0ZXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MiwxNDJdfSxcImEgbGV0dGVyXCIsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA3LDE0Ml19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNywxMTJdfSxcImxvd2VyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOSwxMjRdfSxcInVwcGVyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMSwxNDJdfSxcInVuaWNvZGVMdG1vXCIsW11dXV0sXCJkaWdpdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0NiwxNzddfSxcImEgZGlnaXRcIixbXSxbXCJyYW5nZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2OSwxNzddfSxcIjBcIixcIjlcIl1dLFwiaGV4RGlnaXRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODEsMjU0XX0sXCJhIGhleGFkZWNpbWFsIGRpZ2l0XCIsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5LDI1NF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxOSwyMjRdfSxcImRpZ2l0XCIsW11dLFtcInJhbmdlXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMxLDIzOV19LFwiYVwiLFwiZlwiXSxbXCJyYW5nZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI0NiwyNTRdfSxcIkFcIixcIkZcIl1dXSxcIkxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1OCwzMzZdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyODIsMzM2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjgyLDMwN119LFwiTm9uZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE0LDMzNl19LFwiRW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV1dXSxcIk5vbmVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzQwLDM4OF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3MiwzODhdfSxbXCJwYXJhbVwiLHt9LDBdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzcsMzg4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc4LDM4Nl19LFtcInBhcmFtXCIse30sMV0sW1wicGFyYW1cIix7fSwwXV1dXV0sXCJFbXB0eUxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM5Miw0MzRdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0MzgsNDM4XX1dXSxcImxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQzOCw1MTZdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NjIsNTE2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDYyLDQ4N119LFwibm9uZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDk0LDUxNl19LFwiZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV1dXSxcIm5vbmVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTIwLDU2OF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU1Miw1NjhdfSxbXCJwYXJhbVwiLHt9LDBdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NTcsNTY4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTU4LDU2Nl19LFtcInBhcmFtXCIse30sMV0sW1wicGFyYW1cIix7fSwwXV1dXV0sXCJlbXB0eUxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU3Miw2MTRdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTYsNjE2XX1dXX1dKTtcbiIsIi8vIHZhciBvaG0gPSByZXF1aXJlKCcuLicpO1xuaW1wb3J0IG9obSBmcm9tICcuLic7XG5tb2R1bGUuZXhwb3J0cyA9IG9obS5tYWtlUmVjaXBlKFtcImdyYW1tYXJcIix7XCJzb3VyY2VcIjpcIk9obSB7XFxuXFxuICBHcmFtbWFyc1xcbiAgICA9IEdyYW1tYXIqXFxuXFxuICBHcmFtbWFyXFxuICAgID0gaWRlbnQgU3VwZXJHcmFtbWFyPyBcXFwie1xcXCIgUnVsZSogXFxcIn1cXFwiXFxuXFxuICBTdXBlckdyYW1tYXJcXG4gICAgPSBcXFwiPDpcXFwiIGlkZW50XFxuXFxuICBSdWxlXFxuICAgID0gaWRlbnQgRm9ybWFscz8gcnVsZURlc2NyPyBcXFwiPVxcXCIgIFJ1bGVCb2R5ICAtLSBkZWZpbmVcXG4gICAgfCBpZGVudCBGb3JtYWxzPyAgICAgICAgICAgIFxcXCI6PVxcXCIgUnVsZUJvZHkgIC0tIG92ZXJyaWRlXFxuICAgIHwgaWRlbnQgRm9ybWFscz8gICAgICAgICAgICBcXFwiKz1cXFwiIFJ1bGVCb2R5ICAtLSBleHRlbmRcXG5cXG4gIFJ1bGVCb2R5XFxuICAgID0gXFxcInxcXFwiPyBOb25lbXB0eUxpc3RPZjxUb3BMZXZlbFRlcm0sIFxcXCJ8XFxcIj5cXG5cXG4gIFRvcExldmVsVGVybVxcbiAgICA9IFNlcSBjYXNlTmFtZSAgLS0gaW5saW5lXFxuICAgIHwgU2VxXFxuXFxuICBGb3JtYWxzXFxuICAgID0gXFxcIjxcXFwiIExpc3RPZjxpZGVudCwgXFxcIixcXFwiPiBcXFwiPlxcXCJcXG5cXG4gIFBhcmFtc1xcbiAgICA9IFxcXCI8XFxcIiBMaXN0T2Y8U2VxLCBcXFwiLFxcXCI+IFxcXCI+XFxcIlxcblxcbiAgQWx0XFxuICAgID0gTm9uZW1wdHlMaXN0T2Y8U2VxLCBcXFwifFxcXCI+XFxuXFxuICBTZXFcXG4gICAgPSBJdGVyKlxcblxcbiAgSXRlclxcbiAgICA9IFByZWQgXFxcIipcXFwiICAtLSBzdGFyXFxuICAgIHwgUHJlZCBcXFwiK1xcXCIgIC0tIHBsdXNcXG4gICAgfCBQcmVkIFxcXCI/XFxcIiAgLS0gb3B0XFxuICAgIHwgUHJlZFxcblxcbiAgUHJlZFxcbiAgICA9IFxcXCJ+XFxcIiBMZXggIC0tIG5vdFxcbiAgICB8IFxcXCImXFxcIiBMZXggIC0tIGxvb2thaGVhZFxcbiAgICB8IExleFxcblxcbiAgTGV4XFxuICAgID0gXFxcIiNcXFwiIEJhc2UgIC0tIGxleFxcbiAgICB8IEJhc2VcXG5cXG4gIEJhc2VcXG4gICAgPSBpZGVudCBQYXJhbXM/IH4ocnVsZURlc2NyPyBcXFwiPVxcXCIgfCBcXFwiOj1cXFwiIHwgXFxcIis9XFxcIikgIC0tIGFwcGxpY2F0aW9uXFxuICAgIHwgb25lQ2hhclRlcm1pbmFsIFxcXCIuLlxcXCIgb25lQ2hhclRlcm1pbmFsICAgICAgICAgICAtLSByYW5nZVxcbiAgICB8IHRlcm1pbmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gdGVybWluYWxcXG4gICAgfCBcXFwiKFxcXCIgQWx0IFxcXCIpXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIHBhcmVuXFxuXFxuICBydWxlRGVzY3IgIChhIHJ1bGUgZGVzY3JpcHRpb24pXFxuICAgID0gXFxcIihcXFwiIHJ1bGVEZXNjclRleHQgXFxcIilcXFwiXFxuXFxuICBydWxlRGVzY3JUZXh0XFxuICAgID0gKH5cXFwiKVxcXCIgYW55KSpcXG5cXG4gIGNhc2VOYW1lXFxuICAgID0gXFxcIi0tXFxcIiAoflxcXCJcXFxcblxcXCIgc3BhY2UpKiBuYW1lICh+XFxcIlxcXFxuXFxcIiBzcGFjZSkqIChcXFwiXFxcXG5cXFwiIHwgJlxcXCJ9XFxcIilcXG5cXG4gIG5hbWUgIChhIG5hbWUpXFxuICAgID0gbmFtZUZpcnN0IG5hbWVSZXN0KlxcblxcbiAgbmFtZUZpcnN0XFxuICAgID0gXFxcIl9cXFwiXFxuICAgIHwgbGV0dGVyXFxuXFxuICBuYW1lUmVzdFxcbiAgICA9IFxcXCJfXFxcIlxcbiAgICB8IGFsbnVtXFxuXFxuICBpZGVudCAgKGFuIGlkZW50aWZpZXIpXFxuICAgID0gbmFtZVxcblxcbiAgdGVybWluYWxcXG4gICAgPSBcXFwiXFxcXFxcXCJcXFwiIHRlcm1pbmFsQ2hhciogXFxcIlxcXFxcXFwiXFxcIlxcblxcbiAgb25lQ2hhclRlcm1pbmFsXFxuICAgID0gXFxcIlxcXFxcXFwiXFxcIiB0ZXJtaW5hbENoYXIgXFxcIlxcXFxcXFwiXFxcIlxcblxcbiAgdGVybWluYWxDaGFyXFxuICAgID0gZXNjYXBlQ2hhclxcbiAgICB8IH5cXFwiXFxcXFxcXFxcXFwiIH5cXFwiXFxcXFxcXCJcXFwiIH5cXFwiXFxcXG5cXFwiIGFueVxcblxcbiAgZXNjYXBlQ2hhciAgKGFuIGVzY2FwZSBzZXF1ZW5jZSlcXG4gICAgPSBcXFwiXFxcXFxcXFxcXFxcXFxcXFxcXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gYmFja3NsYXNoXFxuICAgIHwgXFxcIlxcXFxcXFxcXFxcXFxcXCJcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIGRvdWJsZVF1b3RlXFxuICAgIHwgXFxcIlxcXFxcXFxcXFxcXCdcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIHNpbmdsZVF1b3RlXFxuICAgIHwgXFxcIlxcXFxcXFxcYlxcXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIGJhY2tzcGFjZVxcbiAgICB8IFxcXCJcXFxcXFxcXG5cXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBsaW5lRmVlZFxcbiAgICB8IFxcXCJcXFxcXFxcXHJcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBjYXJyaWFnZVJldHVyblxcbiAgICB8IFxcXCJcXFxcXFxcXHRcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSB0YWJcXG4gICAgfCBcXFwiXFxcXFxcXFx1XFxcIiBoZXhEaWdpdCBoZXhEaWdpdCBoZXhEaWdpdCBoZXhEaWdpdCAgLS0gdW5pY29kZUVzY2FwZVxcbiAgICB8IFxcXCJcXFxcXFxcXHhcXFwiIGhleERpZ2l0IGhleERpZ2l0ICAgICAgICAgICAgICAgICAgICAtLSBoZXhFc2NhcGVcXG5cXG4gIHNwYWNlXFxuICAgKz0gY29tbWVudFxcblxcbiAgY29tbWVudFxcbiAgICA9IFxcXCIvL1xcXCIgKH5cXFwiXFxcXG5cXFwiIGFueSkqIFxcXCJcXFxcblxcXCIgIC0tIHNpbmdsZUxpbmVcXG4gICAgfCBcXFwiLypcXFwiICh+XFxcIiovXFxcIiBhbnkpKiBcXFwiKi9cXFwiICAtLSBtdWx0aUxpbmVcXG5cXG4gIHRva2VucyA9IHRva2VuKlxcblxcbiAgdG9rZW4gPSBjYXNlTmFtZSB8IGNvbW1lbnQgfCBpZGVudCB8IG9wZXJhdG9yIHwgcHVuY3R1YXRpb24gfCB0ZXJtaW5hbCB8IGFueVxcblxcbiAgb3BlcmF0b3IgPSBcXFwiPDpcXFwiIHwgXFxcIj1cXFwiIHwgXFxcIjo9XFxcIiB8IFxcXCIrPVxcXCIgfCBcXFwiKlxcXCIgfCBcXFwiK1xcXCIgfCBcXFwiP1xcXCIgfCBcXFwiflxcXCIgfCBcXFwiJlxcXCJcXG5cXG4gIHB1bmN0dWF0aW9uID0gXFxcIjxcXFwiIHwgXFxcIj5cXFwiIHwgXFxcIixcXFwiIHwgXFxcIi0tXFxcIlxcbn1cIn0sXCJPaG1cIixudWxsLFwiR3JhbW1hcnNcIix7XCJHcmFtbWFyc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzksMzJdfSxudWxsLFtdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNCwzMl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI0LDMxXX0sXCJHcmFtbWFyXCIsW11dXV0sXCJHcmFtbWFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzYsODNdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzUwLDgzXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTAsNTVdfSxcImlkZW50XCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2LDY5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTYsNjhdfSxcIlN1cGVyR3JhbW1hclwiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MCw3M119LFwie1wiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzQsNzldfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NCw3OF19LFwiUnVsZVwiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MCw4M119LFwifVwiXV1dLFwiU3VwZXJHcmFtbWFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODcsMTE2XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDYsMTE2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDYsMTEwXX0sXCI8OlwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTEsMTE2XX0sXCJpZGVudFwiLFtdXV1dLFwiUnVsZV9kZWZpbmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzEsMTgxXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzEsMTcwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDEzNl19LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM3LDE0NV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNywxNDRdfSxcIkZvcm1hbHNcIixbXV1dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0NiwxNTZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDYsMTU1XX0sXCJydWxlRGVzY3JcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTU3LDE2MF19LFwiPVwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjIsMTcwXX0sXCJSdWxlQm9keVwiLFtdXV1dLFwiUnVsZV9vdmVycmlkZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4OCwyNDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4OCwyMjddfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODgsMTkzXX0sXCJpZGVudFwiLFtdXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTQsMjAyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk0LDIwMV19LFwiRm9ybWFsc1wiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTQsMjE4XX0sXCI6PVwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTksMjI3XX0sXCJSdWxlQm9keVwiLFtdXV1dLFwiUnVsZV9leHRlbmRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDcsMjk3XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDcsMjg2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI1Ml19LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjUzLDI2MV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1MywyNjBdfSxcIkZvcm1hbHNcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjczLDI3N119LFwiKz1cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjc4LDI4Nl19LFwiUnVsZUJvZHlcIixbXV1dXSxcIlJ1bGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjAsMjk3XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzEsMjk3XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDE3MF19LFwiUnVsZV9kZWZpbmVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTg4LDIyN119LFwiUnVsZV9vdmVycmlkZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDcsMjg2XX0sXCJSdWxlX2V4dGVuZFwiLFtdXV1dLFwiUnVsZUJvZHlcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszMDEsMzU0XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszMTYsMzU0XX0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE2LDMyMF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE2LDMxOV19LFwifFwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzIxLDM1NF19LFwiTm9uZW1wdHlMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzM2LDM0OF19LFwiVG9wTGV2ZWxUZXJtXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzUwLDM1M119LFwifFwiXV1dXV0sXCJUb3BMZXZlbFRlcm1faW5saW5lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc3LDQwMF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc3LDM4OV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3NywzODBdfSxcIlNlcVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszODEsMzg5XX0sXCJjYXNlTmFtZVwiLFtdXV1dLFwiVG9wTGV2ZWxUZXJtXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzU4LDQxMF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc3LDQxMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3NywzODldfSxcIlRvcExldmVsVGVybV9pbmxpbmVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDA3LDQxMF19LFwiU2VxXCIsW11dXV0sXCJGb3JtYWxzXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDE0LDQ1NF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDI4LDQ1NF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDI4LDQzMV19LFwiPFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0MzIsNDUwXX0sXCJMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDM5LDQ0NF19LFwiaWRlbnRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NDYsNDQ5XX0sXCIsXCJdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NTEsNDU0XX0sXCI+XCJdXV0sXCJQYXJhbXNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NTgsNDk1XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NzEsNDk1XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NzEsNDc0XX0sXCI8XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQ3NSw0OTFdfSxcIkxpc3RPZlwiLFtbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0ODIsNDg1XX0sXCJTZXFcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0ODcsNDkwXX0sXCIsXCJdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0OTIsNDk1XX0sXCI+XCJdXV0sXCJBbHRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0OTksNTMzXX0sbnVsbCxbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MDksNTMzXX0sXCJOb25lbXB0eUxpc3RPZlwiLFtbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MjQsNTI3XX0sXCJTZXFcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MjksNTMyXX0sXCJ8XCJdXV1dLFwiU2VxXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTM3LDU1Ml19LG51bGwsW10sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzU0Nyw1NTJdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NDcsNTUxXX0sXCJJdGVyXCIsW11dXV0sXCJJdGVyX3N0YXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NjcsNTg0XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NjcsNTc1XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU3MV19LFwiUHJlZFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU3Miw1NzVdfSxcIipcIl1dXSxcIkl0ZXJfcGx1c1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5MSw2MDhdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5MSw1OTldfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNTk1XX0sXCJQcmVkXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTk2LDU5OV19LFwiK1wiXV1dLFwiSXRlcl9vcHRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTUsNjMxXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTUsNjIzXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYxOV19LFwiUHJlZFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYyMCw2MjNdfSxcIj9cIl1dXSxcIkl0ZXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NTYsNjQyXX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NjcsNjQyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU3NV19LFwiSXRlcl9zdGFyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5MSw1OTldfSxcIkl0ZXJfcGx1c1wiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTUsNjIzXX0sXCJJdGVyX29wdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MzgsNjQyXX0sXCJQcmVkXCIsW11dXV0sXCJQcmVkX25vdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NzJdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NjRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NjBdfSxcIn5cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjYxLDY2NF19LFwiTGV4XCIsW11dXV0sXCJQcmVkX2xvb2thaGVhZFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw3MDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw2ODZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw2ODJdfSxcIiZcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjgzLDY4Nl19LFwiTGV4XCIsW11dXV0sXCJQcmVkXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjQ2LDcxMF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjU3LDcxMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NjRdfSxcIlByZWRfbm90XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw2ODZdfSxcIlByZWRfbG9va2FoZWFkXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcwNyw3MTBdfSxcIkxleFwiLFtdXV1dLFwiTGV4X2xleFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3NDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3MzJdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3MjddfSxcIiNcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzI4LDczMl19LFwiQmFzZVwiLFtdXV1dLFwiTGV4XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzE0LDc1MV19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzI0LDc1MV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3MzJdfSxcIkxleF9sZXhcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzQ3LDc1MV19LFwiQmFzZVwiLFtdXV1dLFwiQmFzZV9hcHBsaWNhdGlvblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc2Niw4MjddfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc2Niw4MTFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsNzcxXX0sXCJpZGVudFwiLFtdXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NzIsNzc5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzcyLDc3OF19LFwiUGFyYW1zXCIsW11dXSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3ODAsODExXX0sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgyLDgxMF19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc4Miw3OTZdfSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3ODIsNzkyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgyLDc5MV19LFwicnVsZURlc2NyXCIsW11dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc5Myw3OTZdfSxcIj1cIl1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzk5LDgwM119LFwiOj1cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MDYsODEwXX0sXCIrPVwiXV1dXV0sXCJCYXNlX3JhbmdlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODM0LDg4OV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODM0LDg3MF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4NDldfSxcIm9uZUNoYXJUZXJtaW5hbFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg1MCw4NTRdfSxcIi4uXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg1NSw4NzBdfSxcIm9uZUNoYXJUZXJtaW5hbFwiLFtdXV1dLFwiQmFzZV90ZXJtaW5hbFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg5Niw5NTRdfSxudWxsLFtdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg5Niw5MDRdfSxcInRlcm1pbmFsXCIsW11dXSxcIkJhc2VfcGFyZW5cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjEsMTAxNl19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTYxLDk3Ml19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTYxLDk2NF19LFwiKFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjUsOTY4XX0sXCJBbHRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjksOTcyXX0sXCIpXCJdXV0sXCJCYXNlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzU1LDEwMTZdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc2NiwxMDE2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzY2LDgxMV19LFwiQmFzZV9hcHBsaWNhdGlvblwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MzQsODcwXX0sXCJCYXNlX3JhbmdlXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg5Niw5MDRdfSxcIkJhc2VfdGVybWluYWxcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTYxLDk3Ml19LFwiQmFzZV9wYXJlblwiLFtdXV1dLFwicnVsZURlc2NyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTAyMCwxMDc5XX0sXCJhIHJ1bGUgZGVzY3JpcHRpb25cIixbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDU4LDEwNzldfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNTgsMTA2MV19LFwiKFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDYyLDEwNzVdfSxcInJ1bGVEZXNjclRleHRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDc2LDEwNzldfSxcIilcIl1dXSxcInJ1bGVEZXNjclRleHRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDgzLDExMTRdfSxudWxsLFtdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTAzLDExMTRdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTA0LDExMTJdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTA0LDExMDhdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDUsMTEwOF19LFwiKVwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEwOSwxMTEyXX0sXCJhbnlcIixbXV1dXV0sXCJjYXNlTmFtZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMTgsMTE4Nl19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEzMywxMTg2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTMzLDExMzddfSxcIi0tXCJdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTM4LDExNTJdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTM5LDExNTBdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTM5LDExNDRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNDAsMTE0NF19LFwiXFxuXCJdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTQ1LDExNTBdfSxcInNwYWNlXCIsW11dXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE1MywxMTU3XX0sXCJuYW1lXCIsW11dLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTU4LDExNzJdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTU5LDExNzBdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTU5LDExNjRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNjAsMTE2NF19LFwiXFxuXCJdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTY1LDExNzBdfSxcInNwYWNlXCIsW11dXV0sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE3NCwxMTg1XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTc0LDExNzhdfSxcIlxcblwiXSxbXCJsb29rYWhlYWRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTgxLDExODVdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExODIsMTE4NV19LFwifVwiXV1dXV0sXCJuYW1lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE5MCwxMjMwXX0sXCJhIG5hbWVcIixbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjExLDEyMzBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjExLDEyMjBdfSxcIm5hbWVGaXJzdFwiLFtdXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIyMSwxMjMwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIyMSwxMjI5XX0sXCJuYW1lUmVzdFwiLFtdXV1dXSxcIm5hbWVGaXJzdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyMzQsMTI2Nl19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI1MCwxMjY2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjUwLDEyNTNdfSxcIl9cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI2MCwxMjY2XX0sXCJsZXR0ZXJcIixbXV1dXSxcIm5hbWVSZXN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI3MCwxMzAwXX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjg1LDEzMDBdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyODUsMTI4OF19LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjk1LDEzMDBdfSxcImFsbnVtXCIsW11dXV0sXCJpZGVudFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMDQsMTMzN119LFwiYW4gaWRlbnRpZmllclwiLFtdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMzMsMTMzN119LFwibmFtZVwiLFtdXV0sXCJ0ZXJtaW5hbFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNDEsMTM3OV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM1NiwxMzc5XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzU2LDEzNjBdfSxcIlxcXCJcIl0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNjEsMTM3NF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNjEsMTM3M119LFwidGVybWluYWxDaGFyXCIsW11dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNzUsMTM3OV19LFwiXFxcIlwiXV1dLFwib25lQ2hhclRlcm1pbmFsXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM4MywxNDI3XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDA1LDE0MjddfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MDUsMTQwOV19LFwiXFxcIlwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDEwLDE0MjJdfSxcInRlcm1pbmFsQ2hhclwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MjMsMTQyN119LFwiXFxcIlwiXV1dLFwidGVybWluYWxDaGFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQzMSwxNDg4XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDUwLDE0ODhdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDUwLDE0NjBdfSxcImVzY2FwZUNoYXJcIixbXV0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ2NywxNDg4XX0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ2NywxNDcyXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDY4LDE0NzJdfSxcIlxcXFxcIl1dLFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0NzMsMTQ3OF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ3NCwxNDc4XX0sXCJcXFwiXCJdXSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDc5LDE0ODRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0ODAsMTQ4NF19LFwiXFxuXCJdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDg1LDE0ODhdfSxcImFueVwiLFtdXV1dXSxcImVzY2FwZUNoYXJfYmFja3NsYXNoXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTUzMSwxNTg2XX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1MzEsMTUzN119LFwiXFxcXFxcXFxcIl1dLFwiZXNjYXBlQ2hhcl9kb3VibGVRdW90ZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1OTMsMTY1MF19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNTkzLDE1OTldfSxcIlxcXFxcXFwiXCJdXSxcImVzY2FwZUNoYXJfc2luZ2xlUXVvdGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjU3LDE3MTRdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY1NywxNjYzXX0sXCJcXFxcJ1wiXV0sXCJlc2NhcGVDaGFyX2JhY2tzcGFjZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3MjEsMTc3Nl19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzIxLDE3MjZdfSxcIlxcXFxiXCJdXSxcImVzY2FwZUNoYXJfbGluZUZlZWRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzgzLDE4MzddfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc4MywxNzg4XX0sXCJcXFxcblwiXV0sXCJlc2NhcGVDaGFyX2NhcnJpYWdlUmV0dXJuXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTg0NCwxOTA0XX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4NDQsMTg0OV19LFwiXFxcXHJcIl1dLFwiZXNjYXBlQ2hhcl90YWJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTExLDE5NjBdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxMSwxOTE2XX0sXCJcXFxcdFwiXV0sXCJlc2NhcGVDaGFyX3VuaWNvZGVFc2NhcGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTY3LDIwMjZdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5NjcsMjAwOF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk2NywxOTcyXX0sXCJcXFxcdVwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTczLDE5ODFdfSxcImhleERpZ2l0XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5ODIsMTk5MF19LFwiaGV4RGlnaXRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk5MSwxOTk5XX0sXCJoZXhEaWdpdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDAwLDIwMDhdfSxcImhleERpZ2l0XCIsW11dXV0sXCJlc2NhcGVDaGFyX2hleEVzY2FwZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwMzMsMjA4OF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjAzMywyMDU2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDMzLDIwMzhdfSxcIlxcXFx4XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwMzksMjA0N119LFwiaGV4RGlnaXRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA0OCwyMDU2XX0sXCJoZXhEaWdpdFwiLFtdXV1dLFwiZXNjYXBlQ2hhclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0OTIsMjA4OF19LFwiYW4gZXNjYXBlIHNlcXVlbmNlXCIsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTUzMSwyMDg4XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTUzMSwxNTM3XX0sXCJlc2NhcGVDaGFyX2JhY2tzbGFzaFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNTkzLDE1OTldfSxcImVzY2FwZUNoYXJfZG91YmxlUXVvdGVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY1NywxNjYzXX0sXCJlc2NhcGVDaGFyX3NpbmdsZVF1b3RlXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3MjEsMTcyNl19LFwiZXNjYXBlQ2hhcl9iYWNrc3BhY2VcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc4MywxNzg4XX0sXCJlc2NhcGVDaGFyX2xpbmVGZWVkXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4NDQsMTg0OV19LFwiZXNjYXBlQ2hhcl9jYXJyaWFnZVJldHVyblwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTExLDE5MTZdfSxcImVzY2FwZUNoYXJfdGFiXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5NjcsMjAwOF19LFwiZXNjYXBlQ2hhcl91bmljb2RlRXNjYXBlXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwMzMsMjA1Nl19LFwiZXNjYXBlQ2hhcl9oZXhFc2NhcGVcIixbXV1dXSxcInNwYWNlXCI6W1wiZXh0ZW5kXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA5MiwyMTExXX0sbnVsbCxbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTA0LDIxMTFdfSxcImNvbW1lbnRcIixbXV1dLFwiY29tbWVudF9zaW5nbGVMaW5lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEyOSwyMTY2XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTI5LDIxNTFdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMjksMjEzM119LFwiLy9cIl0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzQsMjE0Nl19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzUsMjE0NF19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzUsMjE0MF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEzNiwyMTQwXX0sXCJcXG5cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxNDEsMjE0NF19LFwiYW55XCIsW11dXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTQ3LDIxNTFdfSxcIlxcblwiXV1dLFwiY29tbWVudF9tdWx0aUxpbmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTczLDIyMDldfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxNzMsMjE5NV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE3MywyMTc3XX0sXCIvKlwiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE3OCwyMTkwXX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE3OSwyMTg4XX0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE3OSwyMTg0XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTgwLDIxODRdfSxcIiovXCJdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTg1LDIxODhdfSxcImFueVwiLFtdXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5MSwyMTk1XX0sXCIqL1wiXV1dLFwiY29tbWVudFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMTUsMjIwOV19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEyOSwyMjA5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEyOSwyMTUxXX0sXCJjb21tZW50X3NpbmdsZUxpbmVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE3MywyMTk1XX0sXCJjb21tZW50X211bHRpTGluZVwiLFtdXV1dLFwidG9rZW5zXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjIxMywyMjI4XX0sbnVsbCxbXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjIyMiwyMjI4XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjIyMiwyMjI3XX0sXCJ0b2tlblwiLFtdXV1dLFwidG9rZW5cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjMyLDIzMDhdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyNDAsMjMwOF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyNDAsMjI0OF19LFwiY2FzZU5hbWVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI1MSwyMjU4XX0sXCJjb21tZW50XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyNjEsMjI2Nl19LFwiaWRlbnRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI2OSwyMjc3XX0sXCJvcGVyYXRvclwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjgwLDIyOTFdfSxcInB1bmN0dWF0aW9uXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyOTQsMjMwMl19LFwidGVybWluYWxcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMwNSwyMzA4XX0sXCJhbnlcIixbXV1dXSxcIm9wZXJhdG9yXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMxMiwyMzc3XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzIzLDIzNzddfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzMjMsMjMyN119LFwiPDpcIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzMwLDIzMzNdfSxcIj1cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzM2LDIzNDBdfSxcIjo9XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjM0MywyMzQ3XX0sXCIrPVwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNTAsMjM1M119LFwiKlwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNTYsMjM1OV19LFwiK1wiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNjIsMjM2NV19LFwiP1wiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNjgsMjM3MV19LFwiflwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNzQsMjM3N119LFwiJlwiXV1dLFwicHVuY3R1YXRpb25cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzgxLDI0MTddfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzOTUsMjQxN119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjM5NSwyMzk4XX0sXCI8XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQwMSwyNDA0XX0sXCI+XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQwNywyNDEwXX0sXCIsXCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQxMywyNDE3XX0sXCItLVwiXV1dfV0pO1xuIiwiLy8gdmFyIG9obSA9IHJlcXVpcmUoJy4uJyk7XG5pbXBvcnQgb2htIGZyb20gJy4uJztcbm1vZHVsZS5leHBvcnRzID0gb2htLm1ha2VSZWNpcGUoW1wiZ3JhbW1hclwiLHtcInNvdXJjZVwiOlwiT3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXMge1xcblxcbiAgQXR0cmlidXRlU2lnbmF0dXJlID1cXG4gICAgbmFtZVxcblxcbiAgT3BlcmF0aW9uU2lnbmF0dXJlID1cXG4gICAgbmFtZSBGb3JtYWxzP1xcblxcbiAgRm9ybWFsc1xcbiAgICA9IFxcXCIoXFxcIiBMaXN0T2Y8bmFtZSwgXFxcIixcXFwiPiBcXFwiKVxcXCJcXG5cXG4gIG5hbWUgIChhIG5hbWUpXFxuICAgID0gbmFtZUZpcnN0IG5hbWVSZXN0KlxcblxcbiAgbmFtZUZpcnN0XFxuICAgID0gXFxcIl9cXFwiXFxuICAgIHwgbGV0dGVyXFxuXFxuICBuYW1lUmVzdFxcbiAgICA9IFxcXCJfXFxcIlxcbiAgICB8IGFsbnVtXFxuXFxufVwifSxcIk9wZXJhdGlvbnNBbmRBdHRyaWJ1dGVzXCIsbnVsbCxcIkF0dHJpYnV0ZVNpZ25hdHVyZVwiLHtcIkF0dHJpYnV0ZVNpZ25hdHVyZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI5LDU4XX0sbnVsbCxbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NCw1OF19LFwibmFtZVwiLFtdXV0sXCJPcGVyYXRpb25TaWduYXR1cmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MiwxMDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDEwMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDkxXX0sXCJuYW1lXCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzkyLDEwMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzkyLDk5XX0sXCJGb3JtYWxzXCIsW11dXV1dLFwiRm9ybWFsc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNCwxNDNdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOCwxNDNdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOCwxMjFdfSxcIihcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIyLDEzOV19LFwiTGlzdE9mXCIsW1tcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyOSwxMzNdfSxcIm5hbWVcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzUsMTM4XX0sXCIsXCJdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDAsMTQzXX0sXCIpXCJdXV0sXCJuYW1lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ3LDE4N119LFwiYSBuYW1lXCIsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY4LDE4N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2OCwxNzddfSxcIm5hbWVGaXJzdFwiLFtdXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc4LDE4N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3OCwxODZdfSxcIm5hbWVSZXN0XCIsW11dXV1dLFwibmFtZUZpcnN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxLDIyM119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA3LDIyM119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA3LDIxMF19LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTcsMjIzXX0sXCJsZXR0ZXJcIixbXV1dXSxcIm5hbWVSZXN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI3LDI1N119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQyLDI1N119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQyLDI0NV19LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNTIsMjU3XX0sXCJhbG51bVwiLFtdXV1dfV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGFzc2VydCA9IHJlcXVpcmUoJy4uL3NyYy9jb21tb24nKS5hc3NlcnQ7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBIZWxwZXJzXG5cbmZ1bmN0aW9uIGdldFByb3AobmFtZSwgdGhpbmcsIGZuKSB7XG4gIHJldHVybiBmbih0aGluZ1tuYW1lXSk7XG59XG5cbmZ1bmN0aW9uIG1hcFByb3AobmFtZSwgdGhpbmcsIGZuKSB7XG4gIHJldHVybiB0aGluZ1tuYW1lXS5tYXAoZm4pO1xufVxuXG4vLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIHdhbGsgYSBzaW5nbGUgcHJvcGVydHkgb2YgYSBub2RlLlxuLy8gYGRlc2NyaXB0b3JgIGlzIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIHByb3BlcnR5IG5hbWUsIG9wdGlvbmFsbHkgZW5kaW5nXG4vLyB3aXRoICdbXScgKGUuZy4sICdjaGlsZHJlbltdJykuXG5mdW5jdGlvbiBnZXRQcm9wV2Fsa0ZuKGRlc2NyaXB0b3IpIHtcbiAgdmFyIHBhcnRzID0gZGVzY3JpcHRvci5zcGxpdCgvID9cXFtcXF0vKTtcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHJldHVybiBtYXBQcm9wLmJpbmQobnVsbCwgcGFydHNbMF0pO1xuICB9XG4gIHJldHVybiBnZXRQcm9wLmJpbmQobnVsbCwgZGVzY3JpcHRvcik7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BzKHdhbGtGbnMsIHRoaW5nLCBmbikge1xuICByZXR1cm4gd2Fsa0Zucy5tYXAoZnVuY3Rpb24od2Fsa0ZuKSB7XG4gICAgcmV0dXJuIHdhbGtGbih0aGluZywgZm4pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2Fsa0ZuKHNoYXBlKSB7XG4gIGlmICh0eXBlb2Ygc2hhcGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGdldFByb3BzLmJpbmQobnVsbCwgW2dldFByb3BXYWxrRm4oc2hhcGUpXSk7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzaGFwZSkpIHtcbiAgICByZXR1cm4gZ2V0UHJvcHMuYmluZChudWxsLCBzaGFwZS5tYXAoZ2V0UHJvcFdhbGtGbikpO1xuICB9IGVsc2Uge1xuICAgIGFzc2VydCh0eXBlb2Ygc2hhcGUgPT09ICdmdW5jdGlvbicsICdFeHBlY3RlZCBhIHN0cmluZywgQXJyYXksIG9yIGZ1bmN0aW9uJyk7XG4gICAgYXNzZXJ0KHNoYXBlLmxlbmd0aCA9PT0gMiwgJ0V4cGVjdGVkIGEgZnVuY3Rpb24gb2YgYXJpdHkgMiwgZ290ICcgKyBzaGFwZS5sZW5ndGgpO1xuICAgIHJldHVybiBzaGFwZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1Jlc3RyaWN0ZWRJZGVudGlmaWVyKHN0cikge1xuICByZXR1cm4gL15bYS16QS1aX11bMC05YS16QS1aX10qJC8udGVzdChzdHIpO1xufVxuXG5mdW5jdGlvbiB0cmltKHMpIHtcbiAgcmV0dXJuIHMudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVNpZ25hdHVyZShzaWcpIHtcbiAgdmFyIHBhcnRzID0gc2lnLnNwbGl0KC9bKCldLykubWFwKHRyaW0pO1xuICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmIHBhcnRzWzJdID09PSAnJykge1xuICAgIHZhciBuYW1lID0gcGFydHNbMF07XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgIGlmIChwYXJ0c1sxXS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMgPSBwYXJ0c1sxXS5zcGxpdCgnLCcpLm1hcCh0cmltKTtcbiAgICB9XG4gICAgaWYgKGlzUmVzdHJpY3RlZElkZW50aWZpZXIobmFtZSkgJiYgcGFyYW1zLmV2ZXJ5KGlzUmVzdHJpY3RlZElkZW50aWZpZXIpKSB7XG4gICAgICByZXR1cm4ge25hbWU6IG5hbWUsIGZvcm1hbHM6IHBhcmFtc307XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBvcGVyYXRpb24gc2lnbmF0dXJlOiAnICsgc2lnKTtcbn1cblxuLypcbiAgQSBWaXNpdG9yRmFtaWx5IGNvbnRhaW5zIGEgc2V0IG9mIHJlY3Vyc2l2ZSBvcGVyYXRpb25zIHRoYXQgYXJlIGRlZmluZWQgb3ZlciBzb21lIGtpbmQgb2ZcbiAgdHJlZSBzdHJ1Y3R1cmUuIFRoZSBgY29uZmlnYCBwYXJhbWV0ZXIgc3BlY2lmaWVzIGhvdyB0byB3YWxrIHRoZSB0cmVlOlxuICAtICdnZXRUYWcnIGlzIGZ1bmN0aW9uIHdoaWNoLCBnaXZlbiBhIG5vZGUgaW4gdGhlIHRyZWUsIHJldHVybnMgdGhlIG5vZGUncyAndGFnJyAodHlwZSlcbiAgLSAnc2hhcGVzJyBhbiBvYmplY3QgdGhhdCBtYXBzIGZyb20gYSB0YWcgdG8gYSB2YWx1ZSB0aGF0IGRlc2NyaWJlcyBob3cgdG8gcmVjdXJzaXZlbHlcbiAgICBldmFsdWF0ZSB0aGUgb3BlcmF0aW9uIGZvciBub2RlcyBvZiB0aGF0IHR5cGUuIFRoZSB2YWx1ZSBjYW4gYmU6XG4gICAgKiBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBwcm9wZXJ0eSBuYW1lIHRoYXQgaG9sZHMgdGhhdCBub2RlJ3Mgb25seSBjaGlsZFxuICAgICogYW4gQXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgKG9yIGFuIGVtcHR5IGFycmF5IGluZGljYXRpbmcgYSBsZWFmIHR5cGUpLCBvclxuICAgICogYSBmdW5jdGlvbiB0YWtpbmcgdHdvIGFyZ3VtZW50cyAobm9kZSwgZm4pLCBhbmQgcmV0dXJuaW5nIGFuIEFycmF5IHdoaWNoIGlzIHRoZSByZXN1bHRcbiAgICAgIG9mIGFwcGx5IGBmbmAgdG8gZWFjaCBvZiB0aGUgbm9kZSdzIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBWaXNpdG9yRmFtaWx5KGNvbmZpZykge1xuICB0aGlzLl9zaGFwZXMgPSBjb25maWcuc2hhcGVzO1xuICB0aGlzLl9nZXRUYWcgPSBjb25maWcuZ2V0VGFnO1xuXG4gIHRoaXMuQWRhcHRlciA9IGZ1bmN0aW9uKHRoaW5nLCBmYW1pbHkpIHtcbiAgICB0aGlzLl9hZGFwdGVlID0gdGhpbmc7XG4gICAgdGhpcy5fZmFtaWx5ID0gZmFtaWx5O1xuICB9O1xuICB0aGlzLkFkYXB0ZXIucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlZWV5IScpO1xuICB9O1xuICB0aGlzLm9wZXJhdGlvbnMgPSB7fTtcblxuICB0aGlzLl9hcml0aWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fZ2V0Q2hpbGRyZW4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgT2JqZWN0LmtleXModGhpcy5fc2hhcGVzKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICB2YXIgc2hhcGUgPSBzZWxmLl9zaGFwZXNba107XG4gICAgc2VsZi5fZ2V0Q2hpbGRyZW5ba10gPSBnZXRXYWxrRm4oc2hhcGUpO1xuXG4gICAgLy8gQSBmdW5jdGlvbiBtZWFucyB0aGUgYXJpdHkgaXNuJ3QgZml4ZWQsIHNvIGRvbid0IHB1dCBhbiBlbnRyeSBpbiB0aGUgYXJpdHkgbWFwLlxuICAgIGlmICh0eXBlb2Ygc2hhcGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNlbGYuX2FyaXRpZXNba10gPSBBcnJheS5pc0FycmF5KHNoYXBlKSA/IHNoYXBlLmxlbmd0aCA6IDE7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5fd3JhcCA9IGZ1bmN0aW9uKHRoaW5nKSB7IHJldHVybiBuZXcgc2VsZi5BZGFwdGVyKHRoaW5nLCBzZWxmKTsgfTtcbn1cblxuVmlzaXRvckZhbWlseS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uKHRoaW5nKSB7XG4gIHJldHVybiB0aGlzLl93cmFwKHRoaW5nKTtcbn07XG5cblZpc2l0b3JGYW1pbHkucHJvdG90eXBlLl9jaGVja0FjdGlvbkRpY3QgPSBmdW5jdGlvbihkaWN0KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgT2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgYXNzZXJ0KGsgaW4gc2VsZi5fZ2V0Q2hpbGRyZW4sIFwiVW5yZWNvZ25pemVkIGFjdGlvbiBuYW1lICdcIiArIGsgKyBcIidcIik7XG4gICAgdmFyIGFjdGlvbiA9IGRpY3Rba107XG4gICAgYXNzZXJ0KHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicsIFwiS2V5ICdcIiArIGsgKyBcIic6IGV4cGVjdGVkIGZ1bmN0aW9uLCBnb3QgXCIgKyBhY3Rpb24pO1xuICAgIGlmIChrIGluIHNlbGYuX2FyaXRpZXMpIHtcbiAgICAgIHZhciBleHBlY3RlZCA9IHNlbGYuX2FyaXRpZXNba107XG4gICAgICB2YXIgYWN0dWFsID0gZGljdFtrXS5sZW5ndGg7XG4gICAgICBhc3NlcnQoYWN0dWFsID09PSBleHBlY3RlZCxcbiAgICAgICAgICAgICBcIkFjdGlvbiAnXCIgKyBrICsgXCInIGhhcyB0aGUgd3JvbmcgYXJpdHk6IGV4cGVjdGVkIFwiICsgZXhwZWN0ZWQgKyAnLCBnb3QgJyArIGFjdHVhbCk7XG4gICAgfVxuICB9KTtcbn07XG5cblZpc2l0b3JGYW1pbHkucHJvdG90eXBlLmFkZE9wZXJhdGlvbiA9IGZ1bmN0aW9uKHNpZ25hdHVyZSwgYWN0aW9ucykge1xuICB2YXIgc2lnID0gcGFyc2VTaWduYXR1cmUoc2lnbmF0dXJlKTtcbiAgdmFyIG5hbWUgPSBzaWcubmFtZTtcbiAgdGhpcy5fY2hlY2tBY3Rpb25EaWN0KGFjdGlvbnMpO1xuICB0aGlzLm9wZXJhdGlvbnNbbmFtZV0gPSB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBmb3JtYWxzOiBzaWcuZm9ybWFscyxcbiAgICBhY3Rpb25zOiBhY3Rpb25zXG4gIH07XG5cbiAgdmFyIGZhbWlseSA9IHRoaXM7XG4gIHRoaXMuQWRhcHRlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFnID0gZmFtaWx5Ll9nZXRUYWcodGhpcy5fYWRhcHRlZSk7XG4gICAgYXNzZXJ0KHRhZyBpbiBmYW1pbHkuX2dldENoaWxkcmVuLCBcImdldFRhZyByZXR1cm5lZCB1bnJlY29nbml6ZWQgdGFnICdcIiArIHRhZyArIFwiJ1wiKTtcbiAgICBhc3NlcnQodGFnIGluIGFjdGlvbnMsIFwiTm8gYWN0aW9uIGZvciAnXCIgKyB0YWcgKyBcIicgaW4gb3BlcmF0aW9uICdcIiArIG5hbWUgKyBcIidcIik7XG5cbiAgICAvLyBDcmVhdGUgYW4gXCJhcmd1bWVudHMgb2JqZWN0XCIgZnJvbSB0aGUgYXJndW1lbnRzIHRoYXQgd2VyZSBwYXNzZWQgdG8gdGhpc1xuICAgIC8vIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZS5cbiAgICB2YXIgYXJncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3Nbc2lnLmZvcm1hbHNbaV1dID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIHZhciBvbGRBcmdzID0gdGhpcy5hcmdzO1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdmFyIGFucyA9IGFjdGlvbnNbdGFnXS5hcHBseSh0aGlzLCBmYW1pbHkuX2dldENoaWxkcmVuW3RhZ10odGhpcy5fYWRhcHRlZSwgZmFtaWx5Ll93cmFwKSk7XG4gICAgdGhpcy5hcmdzID0gb2xkQXJncztcbiAgICByZXR1cm4gYW5zO1xuICB9O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc2l0b3JGYW1pbHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBWaXNpdG9yRmFtaWx5OiByZXF1aXJlKCcuL1Zpc2l0b3JGYW1pbHknKSxcbiAgc2VtYW50aWNzRm9yVG9BU1Q6IHJlcXVpcmUoJy4vc2VtYW50aWNzLXRvQVNUJykuc2VtYW50aWNzLFxuICB0b0FTVDogcmVxdWlyZSgnLi9zZW1hbnRpY3MtdG9BU1QnKS5oZWxwZXJcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi4vc3JjL3BleHBycycpO1xudmFyIE1hdGNoUmVzdWx0ID0gcmVxdWlyZSgnLi4vc3JjL01hdGNoUmVzdWx0Jyk7XG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4uL3NyYy9HcmFtbWFyJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgndXRpbC1leHRlbmQnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBkZWZhdWx0T3BlcmF0aW9uID0ge1xuICBfdGVybWluYWw6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByaW1pdGl2ZVZhbHVlO1xuICB9LFxuXG4gIF9ub250ZXJtaW5hbDogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICB2YXIgY3Rvck5hbWUgPSB0aGlzLl9ub2RlLmN0b3JOYW1lO1xuICAgIHZhciBtYXBwaW5nID0gdGhpcy5hcmdzLm1hcHBpbmc7XG5cbiAgICAvLyB3aXRob3V0IGN1c3RvbWl6YXRpb25cbiAgICBpZiAoIW1hcHBpbmcuaGFzT3duUHJvcGVydHkoY3Rvck5hbWUpKSB7XG4gICAgICAvLyBpbnRlcm1lZGlhdGUgbm9kZVxuICAgICAgaWYgKHRoaXMuX25vZGUgaW5zdGFuY2VvZiBwZXhwcnMuQWx0IHx8IHRoaXMuX25vZGUgaW5zdGFuY2VvZiBwZXhwcnMuQXBwbHkpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuWzBdLnRvQVNUKG1hcHBpbmcpO1xuICAgICAgfVxuXG4gICAgICAvLyBsZXhpY2FsIHJ1bGVcbiAgICAgIGlmICh0aGlzLmlzTGV4aWNhbCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZVN0cmluZztcbiAgICAgIH1cblxuICAgICAgLy8gc2luZ3VsYXIgbm9kZSAoZS5nLiBvbmx5IHN1cnJvdW5kZWQgYnkgbGl0ZXJhbHMgb3IgbG9va2FoZWFkcylcbiAgICAgIHZhciByZWFsQ2hpbGRyZW4gPSBjaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuICFjaGlsZC5pc1Rlcm1pbmFsKCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChyZWFsQ2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiByZWFsQ2hpbGRyZW5bMF0udG9BU1QobWFwcGluZyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlc3Q6IHRlcm1zIHdpdGggbXVsdGlwbGUgY2hpbGRyZW5cbiAgICB9XG5cbiAgICAvLyBkaXJlY3QgZm9yd2FyZFxuICAgIGlmICh0eXBlb2YgbWFwcGluZ1tjdG9yTmFtZV0gPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gY2hpbGRyZW5bbWFwcGluZ1tjdG9yTmFtZV1dLnRvQVNUKG1hcHBpbmcpO1xuICAgIH1cblxuICAgIC8vIG5hbWVkL21hcHBlZCBjaGlsZHJlbiBvciB1bm5hbWVkIGNoaWxkcmVuICgnMCcsICcxJywgJzInLCAuLi4pXG4gICAgdmFyIHByb3BNYXAgPSBtYXBwaW5nW2N0b3JOYW1lXSB8fCBjaGlsZHJlbjtcbiAgICB2YXIgbm9kZSA9IHtcbiAgICAgIHR5cGU6IGN0b3JOYW1lXG4gICAgfTtcbiAgICBmb3IgKHZhciBwcm9wIGluIHByb3BNYXApIHtcbiAgICAgIHZhciBtYXBwZWRQcm9wID0gbWFwcGluZ1tjdG9yTmFtZV0gJiYgbWFwcGluZ1tjdG9yTmFtZV1bcHJvcF07XG4gICAgICBpZiAodHlwZW9mIG1hcHBlZFByb3AgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8vIGRpcmVjdCBmb3J3YXJkXG4gICAgICAgIG5vZGVbcHJvcF0gPSBjaGlsZHJlblttYXBwZWRQcm9wXS50b0FTVChtYXBwaW5nKTtcbiAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBtYXBwZWRQcm9wID09PSAnc3RyaW5nJykgfHwgKHR5cGVvZiBtYXBwZWRQcm9wID09PSAnYm9vbGVhbicpIHx8XG4gICAgICAgICAgKG1hcHBlZFByb3AgPT09IG51bGwpKSB7XG4gICAgICAgIC8vIHByaW1pdGl2ZSB2YWx1ZVxuICAgICAgICBub2RlW3Byb3BdID0gbWFwcGVkUHJvcDtcbiAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBtYXBwZWRQcm9wID09PSAnb2JqZWN0JykgJiYgKG1hcHBlZFByb3AgaW5zdGFuY2VvZiBOdW1iZXIpKSB7XG4gICAgICAgIC8vIHByaW1pdGl2ZSBudW1iZXIgKG11c3QgYmUgdW5ib3hlZClcbiAgICAgICAgbm9kZVtwcm9wXSA9IE51bWJlcihtYXBwZWRQcm9wKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1hcHBlZFByb3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gY29tcHV0ZWQgdmFsdWVcbiAgICAgICAgbm9kZVtwcm9wXSA9IG1hcHBlZFByb3AuY2FsbCh0aGlzLCBjaGlsZHJlbik7XG4gICAgICB9IGVsc2UgaWYgKG1hcHBlZFByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY2hpbGRyZW5bcHJvcF0gJiYgIWNoaWxkcmVuW3Byb3BdLmlzVGVybWluYWwoKSkge1xuICAgICAgICAgIG5vZGVbcHJvcF0gPSBjaGlsZHJlbltwcm9wXS50b0FTVChtYXBwaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkZWxldGUgcHJlZGVmaW5lZCAndHlwZScgcHJvcGVydGllcywgbGlrZSAndHlwZScsIGlmIGV4cGxpY2l0ZWx5IHJlbW92ZWRcbiAgICAgICAgICBkZWxldGUgbm9kZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfSxcblxuICBfaXRlcjogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICBpZiAodGhpcy5fbm9kZS5pc09wdGlvbmFsKCkpIHtcbiAgICAgIGlmICh0aGlzLm51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuWzBdLnRvQVNUKHRoaXMuYXJncy5tYXBwaW5nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQudG9BU1QodGhpcy5hcmdzLm1hcHBpbmcpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIE5vbmVtcHR5TGlzdE9mOiBmdW5jdGlvbihmaXJzdCwgc2VwLCByZXN0KSB7XG4gICAgcmV0dXJuIFtmaXJzdC50b0FTVCh0aGlzLmFyZ3MubWFwcGluZyldLmNvbmNhdChyZXN0LnRvQVNUKHRoaXMuYXJncy5tYXBwaW5nKSk7XG4gIH0sXG5cbiAgRW1wdHlMaXN0T2Y6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuLy8gUmV0dXJucyBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0IHRoYXQgaW5jbHVkZXMgYW4gYWJzdHJhY3Qgc3ludGF4IHRyZWUgKEFTVClcbi8vIGZvciB0aGUgZ2l2ZW4gbWF0Y2ggcmVzdWx0IGByZXNgIGNvbnRhaW5nIGEgY29uY3JldGUgc3ludGF4IHRyZWUgKENTVCkgYW5kIGdyYW1tYXIuXG4vLyBUaGUgb3B0aW9uYWwgYG1hcHBpbmdgIHBhcmFtZXRlciBjYW4gYmUgdXNlZCB0byBjdXN0b21pemUgaG93IHRoZSBub2RlcyBvZiB0aGUgQ1NUXG4vLyBhcmUgbWFwcGVkIHRvIHRoZSBBU1QgKHNlZSAvZG9jL2V4dHJhcy5tZCN0b2FzdG1hdGNocmVzdWx0LW1hcHBpbmcpLlxuZnVuY3Rpb24gdG9BU1QocmVzLCBtYXBwaW5nKSB7XG4gIGlmICghKHJlcyBpbnN0YW5jZW9mIE1hdGNoUmVzdWx0KSB8fCByZXMuZmFpbGVkKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvQVNUKCkgZXhwZWN0cyBhIHN1Y2Nlc2Z1bGwgTWF0Y2hSZXN1bHQgYXMgZmlyc3QgcGFyYW1ldGVyJyk7XG4gIH1cblxuICBtYXBwaW5nID0gZXh0ZW5kKHt9LCBtYXBwaW5nKTtcbiAgdmFyIG9wZXJhdGlvbiA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wZXJhdGlvbik7XG4gIGZvciAodmFyIHRlcm1OYW1lIGluIG1hcHBpbmcpIHtcbiAgICBpZiAodHlwZW9mIG1hcHBpbmdbdGVybU5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcGVyYXRpb25bdGVybU5hbWVdID0gbWFwcGluZ1t0ZXJtTmFtZV07XG4gICAgICBkZWxldGUgbWFwcGluZ1t0ZXJtTmFtZV07XG4gICAgfVxuICB9XG4gIHZhciBnID0gcmVzLl9jc3QuZ3JhbW1hcjtcbiAgdmFyIHMgPSBnLmNyZWF0ZVNlbWFudGljcygpLmFkZE9wZXJhdGlvbigndG9BU1QobWFwcGluZyknLCBvcGVyYXRpb24pO1xuICByZXR1cm4gcyhyZXMpLnRvQVNUKG1hcHBpbmcpO1xufVxuXG4vLyBSZXR1cm5zIGEgc2VtYW50aWNzIGNvbnRhaW5nIHRoZSB0b0FTVChtYXBwaW5nKSBvcGVyYXRpb24gZm9yIHRoZSBnaXZlbiBncmFtbWFyIGcuXG5mdW5jdGlvbiBzZW1hbnRpY3NGb3JUb0FTVChnKSB7XG4gIGlmICghKGcgaW5zdGFuY2VvZiBHcmFtbWFyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2VtYW50aWNzVG9BU1QoKSBleHBlY3RzIGEgR3JhbW1hciBhcyBwYXJhbWV0ZXInKTtcbiAgfVxuXG4gIHJldHVybiBnLmNyZWF0ZVNlbWFudGljcygpLmFkZE9wZXJhdGlvbigndG9BU1QobWFwcGluZyknLCBkZWZhdWx0T3BlcmF0aW9uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhlbHBlcjogdG9BU1QsXG4gIHNlbWFudGljczogc2VtYW50aWNzRm9yVG9BU1Rcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gICAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvYXNzaWduJylcbiAgLCBub3JtYWxpemVPcHRzID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMnKVxuICAsIGlzQ2FsbGFibGUgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZScpXG4gICwgY29udGFpbnMgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMnKVxuXG4gICwgZDtcblxuZCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRzY3IsIHZhbHVlLyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgdywgb3B0aW9ucywgZGVzYztcblx0aWYgKChhcmd1bWVudHMubGVuZ3RoIDwgMikgfHwgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykpIHtcblx0XHRvcHRpb25zID0gdmFsdWU7XG5cdFx0dmFsdWUgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbMl07XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB3ID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHRcdHcgPSBjb250YWlucy5jYWxsKGRzY3IsICd3Jyk7XG5cdH1cblxuXHRkZXNjID0geyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSwgd3JpdGFibGU6IHcgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG5cbmQuZ3MgPSBmdW5jdGlvbiAoZHNjciwgZ2V0LCBzZXQvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCBvcHRpb25zLCBkZXNjO1xuXHRpZiAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSBnZXQ7XG5cdFx0Z2V0ID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzNdO1xuXHR9XG5cdGlmIChnZXQgPT0gbnVsbCkge1xuXHRcdGdldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShnZXQpKSB7XG5cdFx0b3B0aW9ucyA9IGdldDtcblx0XHRnZXQgPSBzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoc2V0ID09IG51bGwpIHtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoc2V0KSkge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHR9XG5cblx0ZGVzYyA9IHsgZ2V0OiBnZXQsIHNldDogc2V0LCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5LWZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHt9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IE9iamVjdC5hc3NpZ25cblx0OiByZXF1aXJlKFwiLi9zaGltXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiwgb2JqO1xuXHRpZiAodHlwZW9mIGFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdG9iaiA9IHsgZm9vOiBcInJhelwiIH07XG5cdGFzc2lnbihvYmosIHsgYmFyOiBcImR3YVwiIH0sIHsgdHJ6eTogXCJ0cnp5XCIgfSk7XG5cdHJldHVybiAob2JqLmZvbyArIG9iai5iYXIgKyBvYmoudHJ6eSkgPT09IFwicmF6ZHdhdHJ6eVwiO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIga2V5cyAgPSByZXF1aXJlKFwiLi4va2V5c1wiKVxuICAsIHZhbHVlID0gcmVxdWlyZShcIi4uL3ZhbGlkLXZhbHVlXCIpXG4gICwgbWF4ICAgPSBNYXRoLm1heDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGVzdCwgc3JjIC8qLCDigKZzcmNuKi8pIHtcblx0dmFyIGVycm9yLCBpLCBsZW5ndGggPSBtYXgoYXJndW1lbnRzLmxlbmd0aCwgMiksIGFzc2lnbjtcblx0ZGVzdCA9IE9iamVjdCh2YWx1ZShkZXN0KSk7XG5cdGFzc2lnbiA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR0cnkge1xuXHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlO1xuXHRcdH1cblx0fTtcblx0Zm9yIChpID0gMTsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0c3JjID0gYXJndW1lbnRzW2ldO1xuXHRcdGtleXMoc3JjKS5mb3JFYWNoKGFzc2lnbik7XG5cdH1cblx0aWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHRocm93IGVycm9yO1xuXHRyZXR1cm4gZGVzdDtcbn07XG4iLCIvLyBEZXByZWNhdGVkXG5cblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3VuZGVmaW5lZCA9IHJlcXVpcmUoXCIuLi9mdW5jdGlvbi9ub29wXCIpKCk7IC8vIFN1cHBvcnQgRVMzIGVuZ2luZXNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsKSB7XG4gcmV0dXJuICh2YWwgIT09IF91bmRlZmluZWQpICYmICh2YWwgIT09IG51bGwpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2lzLWltcGxlbWVudGVkXCIpKClcblx0PyBPYmplY3Qua2V5c1xuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0T2JqZWN0LmtleXMoXCJwcmltaXRpdmVcIik7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcbiByZXR1cm4gZmFsc2U7XG59XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4uL2lzLXZhbHVlXCIpO1xuXG52YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblx0cmV0dXJuIGtleXMoaXNWYWx1ZShvYmplY3QpID8gT2JqZWN0KG9iamVjdCkgOiBvYmplY3QpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuL2lzLXZhbHVlXCIpO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMxIC8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAoIWlzVmFsdWUob3B0aW9ucykpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4vaXMtdmFsdWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNWYWx1ZSh2YWx1ZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IFN0cmluZy5wcm90b3R5cGUuY29udGFpbnNcblx0OiByZXF1aXJlKFwiLi9zaGltXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHIgPSBcInJhemR3YXRyenlcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygc3RyLmNvbnRhaW5zICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIChzdHIuY29udGFpbnMoXCJkd2FcIikgPT09IHRydWUpICYmIChzdHIuY29udGFpbnMoXCJmb29cIikgPT09IGZhbHNlKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpID8gU3ltYm9sIDogcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdmFsaWRUeXBlcyA9IHsgb2JqZWN0OiB0cnVlLCBzeW1ib2w6IHRydWUgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzeW1ib2w7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdHN5bWJvbCA9IFN5bWJvbCgndGVzdCBzeW1ib2wnKTtcblx0dHJ5IHsgU3RyaW5nKHN5bWJvbCk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gUmV0dXJuICd0cnVlJyBhbHNvIGZvciBwb2x5ZmlsbHNcblx0aWYgKCF2YWxpZFR5cGVzW3R5cGVvZiBTeW1ib2wuaXRlcmF0b3JdKSByZXR1cm4gZmFsc2U7XG5cdGlmICghdmFsaWRUeXBlc1t0eXBlb2YgU3ltYm9sLnRvUHJpbWl0aXZlXSkgcmV0dXJuIGZhbHNlO1xuXHRpZiAoIXZhbGlkVHlwZXNbdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZ10pIHJldHVybiBmYWxzZTtcblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHgpIHtcblx0aWYgKCF4KSByZXR1cm4gZmFsc2U7XG5cdGlmICh0eXBlb2YgeCA9PT0gJ3N5bWJvbCcpIHJldHVybiB0cnVlO1xuXHRpZiAoIXguY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcblx0aWYgKHguY29uc3RydWN0b3IubmFtZSAhPT0gJ1N5bWJvbCcpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuICh4W3guY29uc3RydWN0b3IudG9TdHJpbmdUYWddID09PSAnU3ltYm9sJyk7XG59O1xuIiwiLy8gRVMyMDE1IFN5bWJvbCBwb2x5ZmlsbCBmb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IChvciBwYXJ0aWFsbHkpIHN1cHBvcnQgaXRcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCB2YWxpZGF0ZVN5bWJvbCA9IHJlcXVpcmUoJy4vdmFsaWRhdGUtc3ltYm9sJylcblxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBvYmpQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlXG4gICwgTmF0aXZlU3ltYm9sLCBTeW1ib2xQb2x5ZmlsbCwgSGlkZGVuU3ltYm9sLCBnbG9iYWxTeW1ib2xzID0gY3JlYXRlKG51bGwpXG4gICwgaXNOYXRpdmVTYWZlO1xuXG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHROYXRpdmVTeW1ib2wgPSBTeW1ib2w7XG5cdHRyeSB7XG5cdFx0U3RyaW5nKE5hdGl2ZVN5bWJvbCgpKTtcblx0XHRpc05hdGl2ZVNhZmUgPSB0cnVlO1xuXHR9IGNhdGNoIChpZ25vcmUpIHt9XG59XG5cbnZhciBnZW5lcmF0ZU5hbWUgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgY3JlYXRlZCA9IGNyZWF0ZShudWxsKTtcblx0cmV0dXJuIGZ1bmN0aW9uIChkZXNjKSB7XG5cdFx0dmFyIHBvc3RmaXggPSAwLCBuYW1lLCBpZTExQnVnV29ya2Fyb3VuZDtcblx0XHR3aGlsZSAoY3JlYXRlZFtkZXNjICsgKHBvc3RmaXggfHwgJycpXSkgKytwb3N0Zml4O1xuXHRcdGRlc2MgKz0gKHBvc3RmaXggfHwgJycpO1xuXHRcdGNyZWF0ZWRbZGVzY10gPSB0cnVlO1xuXHRcdG5hbWUgPSAnQEAnICsgZGVzYztcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmpQcm90b3R5cGUsIG5hbWUsIGQuZ3MobnVsbCwgZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHQvLyBGb3IgSUUxMSBpc3N1ZSBzZWU6XG5cdFx0XHQvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFja2RldGFpbC92aWV3LzE5Mjg1MDgvXG5cdFx0XHQvLyAgICBpZTExLWJyb2tlbi1nZXR0ZXJzLW9uLWRvbS1vYmplY3RzXG5cdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vbWVkaWtvby9lczYtc3ltYm9sL2lzc3Vlcy8xMlxuXHRcdFx0aWYgKGllMTFCdWdXb3JrYXJvdW5kKSByZXR1cm47XG5cdFx0XHRpZTExQnVnV29ya2Fyb3VuZCA9IHRydWU7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBkKHZhbHVlKSk7XG5cdFx0XHRpZTExQnVnV29ya2Fyb3VuZCA9IGZhbHNlO1xuXHRcdH0pKTtcblx0XHRyZXR1cm4gbmFtZTtcblx0fTtcbn0oKSk7XG5cbi8vIEludGVybmFsIGNvbnN0cnVjdG9yIChub3Qgb25lIGV4cG9zZWQpIGZvciBjcmVhdGluZyBTeW1ib2wgaW5zdGFuY2VzLlxuLy8gVGhpcyBvbmUgaXMgdXNlZCB0byBlbnN1cmUgdGhhdCBgc29tZVN5bWJvbCBpbnN0YW5jZW9mIFN5bWJvbGAgYWx3YXlzIHJldHVybiBmYWxzZVxuSGlkZGVuU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgSGlkZGVuU3ltYm9sKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcblx0cmV0dXJuIFN5bWJvbFBvbHlmaWxsKGRlc2NyaXB0aW9uKTtcbn07XG5cbi8vIEV4cG9zZWQgYFN5bWJvbGAgY29uc3RydWN0b3Jcbi8vIChyZXR1cm5zIGluc3RhbmNlcyBvZiBIaWRkZW5TeW1ib2wpXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbFBvbHlmaWxsID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG5cdHZhciBzeW1ib2w7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgU3ltYm9sKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcblx0aWYgKGlzTmF0aXZlU2FmZSkgcmV0dXJuIE5hdGl2ZVN5bWJvbChkZXNjcmlwdGlvbik7XG5cdHN5bWJvbCA9IGNyZWF0ZShIaWRkZW5TeW1ib2wucHJvdG90eXBlKTtcblx0ZGVzY3JpcHRpb24gPSAoZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCA/ICcnIDogU3RyaW5nKGRlc2NyaXB0aW9uKSk7XG5cdHJldHVybiBkZWZpbmVQcm9wZXJ0aWVzKHN5bWJvbCwge1xuXHRcdF9fZGVzY3JpcHRpb25fXzogZCgnJywgZGVzY3JpcHRpb24pLFxuXHRcdF9fbmFtZV9fOiBkKCcnLCBnZW5lcmF0ZU5hbWUoZGVzY3JpcHRpb24pKVxuXHR9KTtcbn07XG5kZWZpbmVQcm9wZXJ0aWVzKFN5bWJvbFBvbHlmaWxsLCB7XG5cdGZvcjogZChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0aWYgKGdsb2JhbFN5bWJvbHNba2V5XSkgcmV0dXJuIGdsb2JhbFN5bWJvbHNba2V5XTtcblx0XHRyZXR1cm4gKGdsb2JhbFN5bWJvbHNba2V5XSA9IFN5bWJvbFBvbHlmaWxsKFN0cmluZyhrZXkpKSk7XG5cdH0pLFxuXHRrZXlGb3I6IGQoZnVuY3Rpb24gKHMpIHtcblx0XHR2YXIga2V5O1xuXHRcdHZhbGlkYXRlU3ltYm9sKHMpO1xuXHRcdGZvciAoa2V5IGluIGdsb2JhbFN5bWJvbHMpIGlmIChnbG9iYWxTeW1ib2xzW2tleV0gPT09IHMpIHJldHVybiBrZXk7XG5cdH0pLFxuXG5cdC8vIFRvIGVuc3VyZSBwcm9wZXIgaW50ZXJvcGVyYWJpbGl0eSB3aXRoIG90aGVyIG5hdGl2ZSBmdW5jdGlvbnMgKGUuZy4gQXJyYXkuZnJvbSlcblx0Ly8gZmFsbGJhY2sgdG8gZXZlbnR1YWwgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mIGdpdmVuIHN5bWJvbFxuXHRoYXNJbnN0YW5jZTogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuaGFzSW5zdGFuY2UpIHx8IFN5bWJvbFBvbHlmaWxsKCdoYXNJbnN0YW5jZScpKSxcblx0aXNDb25jYXRTcHJlYWRhYmxlOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUpIHx8XG5cdFx0U3ltYm9sUG9seWZpbGwoJ2lzQ29uY2F0U3ByZWFkYWJsZScpKSxcblx0aXRlcmF0b3I6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLml0ZXJhdG9yKSB8fCBTeW1ib2xQb2x5ZmlsbCgnaXRlcmF0b3InKSksXG5cdG1hdGNoOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5tYXRjaCkgfHwgU3ltYm9sUG9seWZpbGwoJ21hdGNoJykpLFxuXHRyZXBsYWNlOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5yZXBsYWNlKSB8fCBTeW1ib2xQb2x5ZmlsbCgncmVwbGFjZScpKSxcblx0c2VhcmNoOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5zZWFyY2gpIHx8IFN5bWJvbFBvbHlmaWxsKCdzZWFyY2gnKSksXG5cdHNwZWNpZXM6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnNwZWNpZXMpIHx8IFN5bWJvbFBvbHlmaWxsKCdzcGVjaWVzJykpLFxuXHRzcGxpdDogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuc3BsaXQpIHx8IFN5bWJvbFBvbHlmaWxsKCdzcGxpdCcpKSxcblx0dG9QcmltaXRpdmU6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnRvUHJpbWl0aXZlKSB8fCBTeW1ib2xQb2x5ZmlsbCgndG9QcmltaXRpdmUnKSksXG5cdHRvU3RyaW5nVGFnOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC50b1N0cmluZ1RhZykgfHwgU3ltYm9sUG9seWZpbGwoJ3RvU3RyaW5nVGFnJykpLFxuXHR1bnNjb3BhYmxlczogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wudW5zY29wYWJsZXMpIHx8IFN5bWJvbFBvbHlmaWxsKCd1bnNjb3BhYmxlcycpKVxufSk7XG5cbi8vIEludGVybmFsIHR3ZWFrcyBmb3IgcmVhbCBzeW1ib2wgcHJvZHVjZXJcbmRlZmluZVByb3BlcnRpZXMoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwge1xuXHRjb25zdHJ1Y3RvcjogZChTeW1ib2xQb2x5ZmlsbCksXG5cdHRvU3RyaW5nOiBkKCcnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fbmFtZV9fOyB9KVxufSk7XG5cbi8vIFByb3BlciBpbXBsZW1lbnRhdGlvbiBvZiBtZXRob2RzIGV4cG9zZWQgb24gU3ltYm9sLnByb3RvdHlwZVxuLy8gVGhleSB3b24ndCBiZSBhY2Nlc3NpYmxlIG9uIHByb2R1Y2VkIHN5bWJvbCBpbnN0YW5jZXMgYXMgdGhleSBkZXJpdmUgZnJvbSBIaWRkZW5TeW1ib2wucHJvdG90eXBlXG5kZWZpbmVQcm9wZXJ0aWVzKFN5bWJvbFBvbHlmaWxsLnByb3RvdHlwZSwge1xuXHR0b1N0cmluZzogZChmdW5jdGlvbiAoKSB7IHJldHVybiAnU3ltYm9sICgnICsgdmFsaWRhdGVTeW1ib2wodGhpcykuX19kZXNjcmlwdGlvbl9fICsgJyknOyB9KSxcblx0dmFsdWVPZjogZChmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZVN5bWJvbCh0aGlzKTsgfSlcbn0pO1xuZGVmaW5lUHJvcGVydHkoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1ByaW1pdGl2ZSwgZCgnJywgZnVuY3Rpb24gKCkge1xuXHR2YXIgc3ltYm9sID0gdmFsaWRhdGVTeW1ib2wodGhpcyk7XG5cdGlmICh0eXBlb2Ygc3ltYm9sID09PSAnc3ltYm9sJykgcmV0dXJuIHN5bWJvbDtcblx0cmV0dXJuIHN5bWJvbC50b1N0cmluZygpO1xufSkpO1xuZGVmaW5lUHJvcGVydHkoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywgZCgnYycsICdTeW1ib2wnKSk7XG5cbi8vIFByb3BlciBpbXBsZW1lbnRhdG9uIG9mIHRvUHJpbWl0aXZlIGFuZCB0b1N0cmluZ1RhZyBmb3IgcmV0dXJuZWQgc3ltYm9sIGluc3RhbmNlc1xuZGVmaW5lUHJvcGVydHkoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsXG5cdGQoJ2MnLCBTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGVbU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWddKSk7XG5cbi8vIE5vdGU6IEl0J3MgaW1wb3J0YW50IHRvIGRlZmluZSBgdG9QcmltaXRpdmVgIGFzIGxhc3Qgb25lLCBhcyBzb21lIGltcGxlbWVudGF0aW9uc1xuLy8gaW1wbGVtZW50IGB0b1ByaW1pdGl2ZWAgbmF0aXZlbHkgd2l0aG91dCBpbXBsZW1lbnRpbmcgYHRvU3RyaW5nVGFnYCAob3Igb3RoZXIgc3BlY2lmaWVkIHN5bWJvbHMpXG4vLyBBbmQgdGhhdCBtYXkgaW52b2tlIGVycm9yIGluIGRlZmluaXRpb24gZmxvdzpcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21lZGlrb28vZXM2LXN5bWJvbC9pc3N1ZXMvMTMjaXNzdWVjb21tZW50LTE2NDE0NjE0OVxuZGVmaW5lUHJvcGVydHkoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9QcmltaXRpdmUsXG5cdGQoJ2MnLCBTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGVbU3ltYm9sUG9seWZpbGwudG9QcmltaXRpdmVdKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXMtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNTeW1ib2wodmFsdWUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKHZhbHVlICsgXCIgaXMgbm90IGEgc3ltYm9sXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZDtcbmZ1bmN0aW9uIGV4dGVuZChvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8IHR5cGVvZiBhZGQgIT09ICdvYmplY3QnKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEdyYW1tYXJEZWNsID0gcmVxdWlyZSgnLi9HcmFtbWFyRGVjbCcpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBCdWlsZGVyKCkge31cblxuQnVpbGRlci5wcm90b3R5cGUgPSB7XG4gIGN1cnJlbnREZWNsOiBudWxsLFxuXG4gIG5ld0dyYW1tYXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEdyYW1tYXJEZWNsKG5hbWUpO1xuICB9LFxuXG4gIGdyYW1tYXI6IGZ1bmN0aW9uKG1ldGFJbmZvLCBuYW1lLCBzdXBlckdyYW1tYXIsIGRlZmF1bHRTdGFydFJ1bGUsIHJ1bGVzKSB7XG4gICAgdmFyIGdEZWNsID0gbmV3IEdyYW1tYXJEZWNsKG5hbWUpO1xuICAgIGlmIChzdXBlckdyYW1tYXIpIHtcbiAgICAgIGdEZWNsLndpdGhTdXBlckdyYW1tYXIodGhpcy5mcm9tUmVjaXBlKHN1cGVyR3JhbW1hcikpO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdFN0YXJ0UnVsZSkge1xuICAgICAgZ0RlY2wud2l0aERlZmF1bHRTdGFydFJ1bGUoZGVmYXVsdFN0YXJ0UnVsZSk7XG4gICAgfVxuICAgIGlmIChtZXRhSW5mbyAmJiBtZXRhSW5mby5zb3VyY2UpIHtcbiAgICAgIGdEZWNsLndpdGhTb3VyY2UobWV0YUluZm8uc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5jdXJyZW50RGVjbCA9IGdEZWNsO1xuICAgIE9iamVjdC5rZXlzKHJ1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgICB2YXIgcnVsZVJlY2lwZSA9IHJ1bGVzW3J1bGVOYW1lXTtcblxuICAgICAgdmFyIGFjdGlvbiA9IHJ1bGVSZWNpcGVbMF07IC8vIGRlZmluZS9leHRlbmQvb3ZlcnJpZGVcbiAgICAgIHZhciBtZXRhSW5mbyA9IHJ1bGVSZWNpcGVbMV07XG4gICAgICB2YXIgZGVzY3JpcHRpb24gPSBydWxlUmVjaXBlWzJdO1xuICAgICAgdmFyIGZvcm1hbHMgPSBydWxlUmVjaXBlWzNdO1xuICAgICAgdmFyIGJvZHkgPSBzZWxmLmZyb21SZWNpcGUocnVsZVJlY2lwZVs0XSk7XG5cbiAgICAgIHZhciBzb3VyY2U7XG4gICAgICBpZiAoZ0RlY2wuc291cmNlICYmIG1ldGFJbmZvICYmIG1ldGFJbmZvLnNvdXJjZUludGVydmFsKSB7XG4gICAgICAgIHNvdXJjZSA9IGdEZWNsLnNvdXJjZS5zdWJJbnRlcnZhbChcbiAgICAgICAgICAgIG1ldGFJbmZvLnNvdXJjZUludGVydmFsWzBdLFxuICAgICAgICAgICAgbWV0YUluZm8uc291cmNlSW50ZXJ2YWxbMV0gLSBtZXRhSW5mby5zb3VyY2VJbnRlcnZhbFswXSk7XG4gICAgICB9XG4gICAgICBnRGVjbFthY3Rpb25dKHJ1bGVOYW1lLCBmb3JtYWxzLCBib2R5LCBkZXNjcmlwdGlvbiwgc291cmNlKTtcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnREZWNsID0gbnVsbDtcbiAgICByZXR1cm4gZ0RlY2wuYnVpbGQoKTtcbiAgfSxcblxuICB0ZXJtaW5hbDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlRlcm1pbmFsKHgpO1xuICB9LFxuXG4gIHJhbmdlOiBmdW5jdGlvbihmcm9tLCB0bykge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlJhbmdlKGZyb20sIHRvKTtcbiAgfSxcblxuICBwYXJhbTogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gbmV3IHBleHBycy5QYXJhbShpbmRleCk7XG4gIH0sXG5cbiAgYWx0OiBmdW5jdGlvbigvKiB0ZXJtMSwgdGVybTEsIC4uLiAqLykge1xuICAgIHZhciB0ZXJtcyA9IFtdO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2lkeF07XG4gICAgICBpZiAoIShhcmcgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICAgIGFyZyA9IHRoaXMuZnJvbVJlY2lwZShhcmcpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIHBleHBycy5BbHQpIHtcbiAgICAgICAgdGVybXMgPSB0ZXJtcy5jb25jYXQoYXJnLnRlcm1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlcm1zLnB1c2goYXJnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRlcm1zLmxlbmd0aCA9PT0gMSA/IHRlcm1zWzBdIDogbmV3IHBleHBycy5BbHQodGVybXMpO1xuICB9LFxuXG4gIHNlcTogZnVuY3Rpb24oLyogZmFjdG9yMSwgZmFjdG9yMiwgLi4uICovKSB7XG4gICAgdmFyIGZhY3RvcnMgPSBbXTtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpZHhdO1xuICAgICAgaWYgKCEoYXJnIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgICBhcmcgPSB0aGlzLmZyb21SZWNpcGUoYXJnKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBwZXhwcnMuU2VxKSB7XG4gICAgICAgIGZhY3RvcnMgPSBmYWN0b3JzLmNvbmNhdChhcmcuZmFjdG9ycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3JzLnB1c2goYXJnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhY3RvcnMubGVuZ3RoID09PSAxID8gZmFjdG9yc1swXSA6IG5ldyBwZXhwcnMuU2VxKGZhY3RvcnMpO1xuICB9LFxuXG4gIHN0YXI6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuU3RhcihleHByKTtcbiAgfSxcblxuICBwbHVzOiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLlBsdXMoZXhwcik7XG4gIH0sXG5cbiAgb3B0OiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLk9wdChleHByKTtcbiAgfSxcblxuICBub3Q6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuTm90KGV4cHIpO1xuICB9LFxuXG4gIGxhOiBmdW5jdGlvbihleHByKSB7XG4gICAgLy8gVE9ETzogdGVtcG9yYXJ5IHRvIHN0aWxsIGJlIGFibGUgdG8gcmVhZCBvbGQgcmVjaXBlc1xuICAgIHJldHVybiB0aGlzLmxvb2thaGVhZChleHByKTtcbiAgfSxcblxuICBsb29rYWhlYWQ6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuTG9va2FoZWFkKGV4cHIpO1xuICB9LFxuXG4gIGxleDogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICBleHByID0gdGhpcy5mcm9tUmVjaXBlKGV4cHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5MZXgoZXhwcik7XG4gIH0sXG5cbiAgYXBwOiBmdW5jdGlvbihydWxlTmFtZSwgb3B0UGFyYW1zKSB7XG4gICAgaWYgKG9wdFBhcmFtcyAmJiBvcHRQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0UGFyYW1zID0gb3B0UGFyYW1zLm1hcChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgICByZXR1cm4gcGFyYW0gaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIgPyBwYXJhbSA6XG4gICAgICAgICAgdGhpcy5mcm9tUmVjaXBlKHBhcmFtKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5BcHBseShydWxlTmFtZSwgb3B0UGFyYW1zKTtcbiAgfSxcblxuICBmcm9tUmVjaXBlOiBmdW5jdGlvbihyZWNpcGUpIHtcbiAgICAvLyB0aGUgbWV0YS1pbmZvIG9mICdncmFtbWFyJyBpcyBwcm9jY2Vzc2VkIGluIEJ1aWxkZXIuZ3JhbW1hclxuICAgIHZhciByZXN1bHQgPSB0aGlzW3JlY2lwZVswXV0uYXBwbHkodGhpcyxcbiAgICAgIHJlY2lwZVswXSA9PT0gJ2dyYW1tYXInID8gcmVjaXBlLnNsaWNlKDEpIDogcmVjaXBlLnNsaWNlKDIpKTtcblxuICAgIHZhciBtZXRhSW5mbyA9IHJlY2lwZVsxXTtcbiAgICBpZiAobWV0YUluZm8pIHtcbiAgICAgIGlmIChtZXRhSW5mby5zb3VyY2VJbnRlcnZhbCAmJiB0aGlzLmN1cnJlbnREZWNsKSB7XG4gICAgICAgIHJlc3VsdC53aXRoU291cmNlKFxuICAgICAgICAgIHRoaXMuY3VycmVudERlY2wuc291cmNlSW50ZXJ2YWwuYXBwbHkodGhpcy5jdXJyZW50RGVjbCwgbWV0YUluZm8uc291cmNlSW50ZXJ2YWwpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1aWxkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgRmFpbHVyZSA9IHJlcXVpcmUoJy4vRmFpbHVyZScpO1xudmFyIFRlcm1pbmFsTm9kZSA9IHJlcXVpcmUoJy4vbm9kZXMnKS5UZXJtaW5hbE5vZGU7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnLi9jb21tb24nKS5hc3NlcnQ7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbmZ1bmN0aW9uIENhc2VJbnNlbnNpdGl2ZVRlcm1pbmFsKHBhcmFtKSB7XG4gIHRoaXMub2JqID0gcGFyYW07XG59XG5pbmhlcml0cyhDYXNlSW5zZW5zaXRpdmVUZXJtaW5hbCwgcGV4cHJzLlBFeHByKTtcblxuQ2FzZUluc2Vuc2l0aXZlVGVybWluYWwucHJvdG90eXBlID0ge1xuICBfZ2V0U3RyaW5nOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgIHZhciB0ZXJtaW5hbCA9IHN0YXRlLmN1cnJlbnRBcHBsaWNhdGlvbigpLmFyZ3NbdGhpcy5vYmouaW5kZXhdO1xuICAgIGFzc2VydCh0ZXJtaW5hbCBpbnN0YW5jZW9mIHBleHBycy5UZXJtaW5hbCwgJ2V4cGVjdGVkIGEgVGVybWluYWwgZXhwcmVzc2lvbicpO1xuICAgIHJldHVybiB0ZXJtaW5hbC5vYmo7XG4gIH0sXG5cbiAgLy8gSW1wbGVtZW50YXRpb24gb2YgdGhlIFBFeHByIEFQSVxuXG4gIGFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGV2YWw6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gICAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgdmFyIG1hdGNoU3RyID0gdGhpcy5fZ2V0U3RyaW5nKHN0YXRlKTtcbiAgICBpZiAoIWlucHV0U3RyZWFtLm1hdGNoU3RyaW5nKG1hdGNoU3RyLCB0cnVlKSkge1xuICAgICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnB1c2hCaW5kaW5nKG5ldyBUZXJtaW5hbE5vZGUoc3RhdGUuZ3JhbW1hciwgbWF0Y2hTdHIpLCBvcmlnUG9zKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSxcblxuICBnZW5lcmF0ZUV4YW1wbGU6IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgICAvLyBTdGFydCB3aXRoIGEgZXhhbXBsZSBnZW5lcmF0ZWQgZnJvbSB0aGUgVGVybWluYWwuLi5cbiAgICB2YXIgc3RyID0gdGhpcy5vYmouZ2VuZXJhdGVFeGFtcGxlKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpLnZhbHVlO1xuXG4gICAgLy8gLi4uYW5kIHJhbmRvbWx5IHN3aXRjaCBjaGFyYWN0ZXJzIHRvIHVwcGVyY2FzZS9sb3dlcmNhc2UuXG4gICAgdmFyIHZhbHVlID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhbHVlICs9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBzdHJbaV0udG9Mb2NhbGVMb3dlckNhc2UoKSA6IHN0cltpXS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICByZXR1cm4ge3ZhbHVlOiB2YWx1ZX07XG4gIH0sXG5cbiAgZ2V0QXJpdHk6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAxO1xuICB9LFxuXG4gIHN1YnN0aXR1dGVQYXJhbXM6IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgICByZXR1cm4gbmV3IENhc2VJbnNlbnNpdGl2ZVRlcm1pbmFsKHRoaXMub2JqLnN1YnN0aXR1dGVQYXJhbXMoYWN0dWFscykpO1xuICB9LFxuXG4gIHRvRGlzcGxheVN0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub2JqLnRvRGlzcGxheVN0cmluZygpICsgJyAoY2FzZS1pbnNlbnNpdGl2ZSknO1xuICB9LFxuXG4gIHRvRmFpbHVyZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIHRoaXMub2JqLnRvRmFpbHVyZSgpICsgJyAoY2FzZS1pbnNlbnNpdGl2ZSknLCAnZGVzY3JpcHRpb24nKTtcbiAgfSxcblxuICBfaXNOdWxsYWJsZTogZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICAgIHJldHVybiB0aGlzLm9iai5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXNlSW5zZW5zaXRpdmVUZXJtaW5hbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIGBGYWlsdXJlYHMgcmVwcmVzZW50IGV4cHJlc3Npb25zIHRoYXQgd2VyZW4ndCBtYXRjaGVkIHdoaWxlIHBhcnNpbmcuIFRoZXkgYXJlIHVzZWQgdG8gZ2VuZXJhdGVcbiAgZXJyb3IgbWVzc2FnZXMgYXV0b21hdGljYWxseS4gVGhlIGludGVyZmFjZSBvZiBgRmFpbHVyZWBzIGluY2x1ZGVzIHRoZSBjb2xsb3dpbmcgbWV0aG9kczpcblxuICAtIGdldFRleHQoKSA6IFN0cmluZ1xuICAtIGdldFR5cGUoKSA6IFN0cmluZyAgKG9uZSBvZiB7XCJkZXNjcmlwdGlvblwiLCBcInN0cmluZ1wiLCBcImNvZGVcIn0pXG4gIC0gaXNEZXNjcmlwdGlvbigpIDogYm9vbFxuICAtIGlzU3RyaW5nVGVybWluYWwoKSA6IGJvb2xcbiAgLSBpc0NvZGUoKSA6IGJvb2xcbiAgLSBpc0ZsdWZmeSgpIDogYm9vbFxuICAtIG1ha2VGbHVmZnkoKSA6IHZvaWRcbiAgLSBzdWJzdW1lcyhGYWlsdXJlKSA6IGJvb2xcbiovXG5cbmZ1bmN0aW9uIGlzVmFsaWRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUgPT09ICdkZXNjcmlwdGlvbicgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ2NvZGUnO1xufVxuXG5mdW5jdGlvbiBGYWlsdXJlKHBleHByLCB0ZXh0LCB0eXBlKSB7XG4gIGlmICghaXNWYWxpZFR5cGUodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgRmFpbHVyZSB0eXBlOiAnICsgdHlwZSk7XG4gIH1cbiAgdGhpcy5wZXhwciA9IHBleHByO1xuICB0aGlzLnRleHQgPSB0ZXh0O1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmZsdWZmeSA9IGZhbHNlO1xufVxuXG5GYWlsdXJlLnByb3RvdHlwZS5nZXRQRXhwciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wZXhwcjtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudGV4dDtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmdldFR5cGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmlzRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2Rlc2NyaXB0aW9uJztcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmlzU3RyaW5nVGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ3N0cmluZyc7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5pc0NvZGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2NvZGUnO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuaXNGbHVmZnkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmx1ZmZ5O1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUubWFrZUZsdWZmeSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZsdWZmeSA9IHRydWU7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5jbGVhckZsdWZmeSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZsdWZmeSA9IGZhbHNlO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuc3Vic3VtZXMgPSBmdW5jdGlvbih0aGF0KSB7XG4gIHJldHVybiB0aGlzLmdldFRleHQoKSA9PT0gdGhhdC5nZXRUZXh0KCkgJiZcbiAgICAgIHRoaXMudHlwZSA9PT0gdGhhdC50eXBlICYmXG4gICAgICAoIXRoaXMuaXNGbHVmZnkoKSB8fCB0aGlzLmlzRmx1ZmZ5KCkgJiYgdGhhdC5pc0ZsdWZmeSgpKTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdzdHJpbmcnID9cbiAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmdldFRleHQoKSkgOlxuICAgIHRoaXMuZ2V0VGV4dCgpO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZhaWx1cmUgPSBuZXcgRmFpbHVyZSh0aGlzLnBleHByLCB0aGlzLnRleHQsIHRoaXMudHlwZSk7XG4gIGlmICh0aGlzLmlzRmx1ZmZ5KCkpIHtcbiAgICBmYWlsdXJlLm1ha2VGbHVmZnkoKTtcbiAgfVxuICByZXR1cm4gZmFpbHVyZTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLnRvS2V5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCkgKyAnIycgKyB0aGlzLnR5cGU7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBGYWlsdXJlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIENhc2VJbnNlbnNpdGl2ZVRlcm1pbmFsID0gcmVxdWlyZSgnLi9DYXNlSW5zZW5zaXRpdmVUZXJtaW5hbCcpO1xudmFyIE1hdGNoZXIgPSByZXF1aXJlKCcuL01hdGNoZXInKTtcbnZhciBTZW1hbnRpY3MgPSByZXF1aXJlKCcuL1NlbWFudGljcycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gZ2V0U29ydGVkUnVsZVZhbHVlcyhncmFtbWFyKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhncmFtbWFyLnJ1bGVzKS5zb3J0KCkubWFwKGZ1bmN0aW9uKG5hbWUpIHsgcmV0dXJuIGdyYW1tYXIucnVsZXNbbmFtZV07IH0pO1xufVxuXG5mdW5jdGlvbiBHcmFtbWFyKFxuICAgIG5hbWUsXG4gICAgc3VwZXJHcmFtbWFyLFxuICAgIHJ1bGVzLFxuICAgIG9wdERlZmF1bHRTdGFydFJ1bGUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG4gIHRoaXMucnVsZXMgPSBydWxlcztcbiAgaWYgKG9wdERlZmF1bHRTdGFydFJ1bGUpIHtcbiAgICBpZiAoIShvcHREZWZhdWx0U3RhcnRSdWxlIGluIHJ1bGVzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdGFydCBydWxlOiAnXCIgKyBvcHREZWZhdWx0U3RhcnRSdWxlICtcbiAgICAgICAgICAgICAgICAgICAgICBcIicgaXMgbm90IGEgcnVsZSBpbiBncmFtbWFyICdcIiArIG5hbWUgKyBcIidcIik7XG4gICAgfVxuICAgIHRoaXMuZGVmYXVsdFN0YXJ0UnVsZSA9IG9wdERlZmF1bHRTdGFydFJ1bGU7XG4gIH1cbn1cblxudmFyIG9obUdyYW1tYXI7XG52YXIgYnVpbGRHcmFtbWFyO1xuXG4vLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgZnJvbSBtYWluLmpzIG9uY2UgT2htIGhhcyBsb2FkZWQuXG5HcmFtbWFyLmluaXRBcHBsaWNhdGlvblBhcnNlciA9IGZ1bmN0aW9uKGdyYW1tYXIsIGJ1aWxkZXJGbikge1xuICBvaG1HcmFtbWFyID0gZ3JhbW1hcjtcbiAgYnVpbGRHcmFtbWFyID0gYnVpbGRlckZuO1xufTtcblxuR3JhbW1hci5wcm90b3R5cGUgPSB7XG4gIG1hdGNoZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTWF0Y2hlcih0aGlzKTtcbiAgfSxcblxuICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ3JhbW1hciBpcyBhIGJ1aWx0LWluIGdyYW1tYXIsIG90aGVyd2lzZSBmYWxzZS5cbiAgLy8gTk9URTogVGhpcyBtaWdodCBnaXZlIGFuIHVuZXhwZWN0ZWQgcmVzdWx0IGlmIGNhbGxlZCBiZWZvcmUgQnVpbHRJblJ1bGVzIGlzIGRlZmluZWQhXG4gIGlzQnVpbHRJbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgPT09IEdyYW1tYXIuUHJvdG9CdWlsdEluUnVsZXMgfHwgdGhpcyA9PT0gR3JhbW1hci5CdWlsdEluUnVsZXM7XG4gIH0sXG5cbiAgZXF1YWxzOiBmdW5jdGlvbihnKSB7XG4gICAgaWYgKHRoaXMgPT09IGcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBEbyB0aGUgY2hlYXBlc3QgY29tcGFyaXNvbnMgZmlyc3QuXG4gICAgaWYgKGcgPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLm5hbWUgIT09IGcubmFtZSB8fFxuICAgICAgICB0aGlzLmRlZmF1bHRTdGFydFJ1bGUgIT09IGcuZGVmYXVsdFN0YXJ0UnVsZSB8fFxuICAgICAgICAhKHRoaXMuc3VwZXJHcmFtbWFyID09PSBnLnN1cGVyR3JhbW1hciB8fCB0aGlzLnN1cGVyR3JhbW1hci5lcXVhbHMoZy5zdXBlckdyYW1tYXIpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbXlSdWxlcyA9IGdldFNvcnRlZFJ1bGVWYWx1ZXModGhpcyk7XG4gICAgdmFyIG90aGVyUnVsZXMgPSBnZXRTb3J0ZWRSdWxlVmFsdWVzKGcpO1xuICAgIHJldHVybiBteVJ1bGVzLmxlbmd0aCA9PT0gb3RoZXJSdWxlcy5sZW5ndGggJiYgbXlSdWxlcy5ldmVyeShmdW5jdGlvbihydWxlLCBpKSB7XG4gICAgICByZXR1cm4gcnVsZS5kZXNjcmlwdGlvbiA9PT0gb3RoZXJSdWxlc1tpXS5kZXNjcmlwdGlvbiAmJlxuICAgICAgICAgICAgIHJ1bGUuZm9ybWFscy5qb2luKCcsJykgPT09IG90aGVyUnVsZXNbaV0uZm9ybWFscy5qb2luKCcsJykgJiZcbiAgICAgICAgICAgICBydWxlLmJvZHkudG9TdHJpbmcoKSA9PT0gb3RoZXJSdWxlc1tpXS5ib2R5LnRvU3RyaW5nKCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgbWF0Y2g6IGZ1bmN0aW9uKGlucHV0LCBvcHRTdGFydEFwcGxpY2F0aW9uKSB7XG4gICAgdmFyIG0gPSB0aGlzLm1hdGNoZXIoKTtcbiAgICBtLnJlcGxhY2VJbnB1dFJhbmdlKDAsIDAsIGlucHV0KTtcbiAgICByZXR1cm4gbS5tYXRjaChvcHRTdGFydEFwcGxpY2F0aW9uKTtcbiAgfSxcblxuICB0cmFjZTogZnVuY3Rpb24oaW5wdXQsIG9wdFN0YXJ0QXBwbGljYXRpb24pIHtcbiAgICB2YXIgbSA9IHRoaXMubWF0Y2hlcigpO1xuICAgIG0ucmVwbGFjZUlucHV0UmFuZ2UoMCwgMCwgaW5wdXQpO1xuICAgIHJldHVybiBtLnRyYWNlKG9wdFN0YXJ0QXBwbGljYXRpb24pO1xuICB9LFxuXG4gIHNlbWFudGljczogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgZXZlbnR1YWxseSEgRGVwcmVjYXRlZCBpbiB2MC4xMi5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlbWFudGljcygpIGlzIGRlcHJlY2F0ZWQgLS0gdXNlIGNyZWF0ZVNlbWFudGljcygpIGluc3RlYWQuJyk7XG4gIH0sXG5cbiAgY3JlYXRlU2VtYW50aWNzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU2VtYW50aWNzLmNyZWF0ZVNlbWFudGljcyh0aGlzKTtcbiAgfSxcblxuICBleHRlbmRTZW1hbnRpY3M6IGZ1bmN0aW9uKHN1cGVyU2VtYW50aWNzKSB7XG4gICAgcmV0dXJuIFNlbWFudGljcy5jcmVhdGVTZW1hbnRpY3ModGhpcywgc3VwZXJTZW1hbnRpY3MuX2dldFNlbWFudGljcygpKTtcbiAgfSxcblxuICAvLyBDaGVjayB0aGF0IGV2ZXJ5IGtleSBpbiBgYWN0aW9uRGljdGAgY29ycmVzcG9uZHMgdG8gYSBzZW1hbnRpYyBhY3Rpb24sIGFuZCB0aGF0IGl0IG1hcHMgdG9cbiAgLy8gYSBmdW5jdGlvbiBvZiB0aGUgY29ycmVjdCBhcml0eS4gSWYgbm90LCB0aHJvdyBhbiBleGNlcHRpb24uXG4gIF9jaGVja1RvcERvd25BY3Rpb25EaWN0OiBmdW5jdGlvbih3aGF0LCBuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgZnVuY3Rpb24gaXNTcGVjaWFsQWN0aW9uKGEpIHtcbiAgICAgIHJldHVybiBhID09PSAnX2l0ZXInIHx8IGEgPT09ICdfdGVybWluYWwnIHx8IGEgPT09ICdfbm9udGVybWluYWwnIHx8IGEgPT09ICdfZGVmYXVsdCc7XG4gICAgfVxuXG4gICAgdmFyIHByb2JsZW1zID0gW107XG4gICAgZm9yICh2YXIgayBpbiBhY3Rpb25EaWN0KSB7XG4gICAgICB2YXIgdiA9IGFjdGlvbkRpY3Rba107XG4gICAgICBpZiAoIWlzU3BlY2lhbEFjdGlvbihrKSAmJiAhKGsgaW4gdGhpcy5ydWxlcykpIHtcbiAgICAgICAgcHJvYmxlbXMucHVzaChcIidcIiArIGsgKyBcIicgaXMgbm90IGEgdmFsaWQgc2VtYW50aWMgYWN0aW9uIGZvciAnXCIgKyB0aGlzLm5hbWUgKyBcIidcIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByb2JsZW1zLnB1c2goXG4gICAgICAgICAgICBcIidcIiArIGsgKyBcIicgbXVzdCBiZSBhIGZ1bmN0aW9uIGluIGFuIGFjdGlvbiBkaWN0aW9uYXJ5IGZvciAnXCIgKyB0aGlzLm5hbWUgKyBcIidcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYWN0dWFsID0gdi5sZW5ndGg7XG4gICAgICAgIHZhciBleHBlY3RlZCA9IHRoaXMuX3RvcERvd25BY3Rpb25Bcml0eShrKTtcbiAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICAgICAgICBwcm9ibGVtcy5wdXNoKFxuICAgICAgICAgICAgICBcIlNlbWFudGljIGFjdGlvbiAnXCIgKyBrICsgXCInIGhhcyB0aGUgd3JvbmcgYXJpdHk6IFwiICtcbiAgICAgICAgICAgICAgJ2V4cGVjdGVkICcgKyBleHBlY3RlZCArICcsIGdvdCAnICsgYWN0dWFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvYmxlbXMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHByZXR0eVByb2JsZW1zID0gcHJvYmxlbXMubWFwKGZ1bmN0aW9uKHByb2JsZW0pIHsgcmV0dXJuICctICcgKyBwcm9ibGVtOyB9KTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgICBcIkZvdW5kIGVycm9ycyBpbiB0aGUgYWN0aW9uIGRpY3Rpb25hcnkgb2YgdGhlICdcIiArIG5hbWUgKyBcIicgXCIgKyB3aGF0ICsgJzpcXG4nICtcbiAgICAgICAgICBwcmV0dHlQcm9ibGVtcy5qb2luKCdcXG4nKSk7XG4gICAgICBlcnJvci5wcm9ibGVtcyA9IHByb2JsZW1zO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9LFxuXG4gIC8vIFJldHVybiB0aGUgZXhwZWN0ZWQgYXJpdHkgZm9yIGEgc2VtYW50aWMgYWN0aW9uIG5hbWVkIGBhY3Rpb25OYW1lYCwgd2hpY2hcbiAgLy8gaXMgZWl0aGVyIGEgcnVsZSBuYW1lIG9yIGEgc3BlY2lhbCBhY3Rpb24gbmFtZSBsaWtlICdfbm9udGVybWluYWwnLlxuICBfdG9wRG93bkFjdGlvbkFyaXR5OiBmdW5jdGlvbihhY3Rpb25OYW1lKSB7XG4gICAgaWYgKGFjdGlvbk5hbWUgPT09ICdfaXRlcicgfHwgYWN0aW9uTmFtZSA9PT0gJ19ub250ZXJtaW5hbCcgfHwgYWN0aW9uTmFtZSA9PT0gJ19kZWZhdWx0Jykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChhY3Rpb25OYW1lID09PSAnX3Rlcm1pbmFsJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2FjdGlvbk5hbWVdLmJvZHkuZ2V0QXJpdHkoKTtcbiAgfSxcblxuICBfaW5oZXJpdHNGcm9tOiBmdW5jdGlvbihncmFtbWFyKSB7XG4gICAgdmFyIGcgPSB0aGlzLnN1cGVyR3JhbW1hcjtcbiAgICB3aGlsZSAoZykge1xuICAgICAgaWYgKGcuZXF1YWxzKGdyYW1tYXIsIHRydWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgZyA9IGcuc3VwZXJHcmFtbWFyO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgdG9SZWNpcGU6IGZ1bmN0aW9uKG9wdFZhck5hbWUpIHtcbiAgICB2YXIgbWV0YUluZm8gPSB7fTtcbiAgICAvLyBJbmNsdWRlIHRoZSBncmFtbWFyIHNvdXJjZSBpZiBpdCBpcyBhdmFpbGFibGUuXG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICBtZXRhSW5mby5zb3VyY2UgPSB0aGlzLnNvdXJjZS5jb250ZW50cztcbiAgICB9XG5cbiAgICB2YXIgc3VwZXJHcmFtbWFyID0gbnVsbDtcbiAgICBpZiAodGhpcy5zdXBlckdyYW1tYXIgJiYgIXRoaXMuc3VwZXJHcmFtbWFyLmlzQnVpbHRJbigpKSB7XG4gICAgICBzdXBlckdyYW1tYXIgPSBKU09OLnBhcnNlKHRoaXMuc3VwZXJHcmFtbWFyLnRvUmVjaXBlKCkpO1xuICAgIH1cblxuICAgIHZhciBzdGFydFJ1bGUgPSBudWxsO1xuICAgIGlmICh0aGlzLmRlZmF1bHRTdGFydFJ1bGUpIHtcbiAgICAgIHN0YXJ0UnVsZSA9IHRoaXMuZGVmYXVsdFN0YXJ0UnVsZTtcbiAgICB9XG5cbiAgICB2YXIgcnVsZXMgPSB7fTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmtleXModGhpcy5ydWxlcykuZm9yRWFjaChmdW5jdGlvbihydWxlTmFtZSkge1xuICAgICAgdmFyIHJ1bGVJbmZvID0gc2VsZi5ydWxlc1tydWxlTmFtZV07XG4gICAgICB2YXIgYm9keSA9IHJ1bGVJbmZvLmJvZHk7XG4gICAgICB2YXIgaXNEZWZpbml0aW9uID0gIXNlbGYuc3VwZXJHcmFtbWFyIHx8ICFzZWxmLnN1cGVyR3JhbW1hci5ydWxlc1tydWxlTmFtZV07XG5cbiAgICAgIHZhciBvcGVyYXRpb247XG4gICAgICBpZiAoaXNEZWZpbml0aW9uKSB7XG4gICAgICAgIG9wZXJhdGlvbiA9ICdkZWZpbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BlcmF0aW9uID0gYm9keSBpbnN0YW5jZW9mIHBleHBycy5FeHRlbmQgPyAnZXh0ZW5kJyA6ICdvdmVycmlkZSc7XG4gICAgICB9XG5cbiAgICAgIHZhciBtZXRhSW5mbyA9IHt9O1xuICAgICAgaWYgKHJ1bGVJbmZvLnNvdXJjZSAmJiBzZWxmLnNvdXJjZSkge1xuICAgICAgICB2YXIgYWRqdXN0ZWQgPSBydWxlSW5mby5zb3VyY2UucmVsYXRpdmVUbyhzZWxmLnNvdXJjZSk7XG4gICAgICAgIG1ldGFJbmZvLnNvdXJjZUludGVydmFsID0gW2FkanVzdGVkLnN0YXJ0SWR4LCBhZGp1c3RlZC5lbmRJZHhdO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGVzY3JpcHRpb24gPSBpc0RlZmluaXRpb24gPyBydWxlSW5mby5kZXNjcmlwdGlvbiA6IG51bGw7XG4gICAgICB2YXIgYm9keVJlY2lwZSA9IGJvZHkub3V0cHV0UmVjaXBlKHJ1bGVJbmZvLmZvcm1hbHMsIHNlbGYuc291cmNlKTtcblxuICAgICAgcnVsZXNbcnVsZU5hbWVdID0gW1xuICAgICAgICBvcGVyYXRpb24sIC8vIFwiZGVmaW5lXCIvXCJleHRlbmRcIi9cIm92ZXJyaWRlXCJcbiAgICAgICAgbWV0YUluZm8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBydWxlSW5mby5mb3JtYWxzLFxuICAgICAgICBib2R5UmVjaXBlXG4gICAgICBdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFtcbiAgICAgICdncmFtbWFyJyxcbiAgICAgIG1ldGFJbmZvLFxuICAgICAgdGhpcy5uYW1lLFxuICAgICAgc3VwZXJHcmFtbWFyLFxuICAgICAgc3RhcnRSdWxlLFxuICAgICAgcnVsZXNcbiAgICBdKTtcbiAgfSxcblxuICAvLyBUT0RPOiBDb21lIHVwIHdpdGggYmV0dGVyIG5hbWVzIGZvciB0aGVzZSBtZXRob2RzLlxuICAvLyBUT0RPOiBXcml0ZSB0aGUgYW5hbG9nIG9mIHRoZXNlIG1ldGhvZHMgZm9yIGluaGVyaXRlZCBhdHRyaWJ1dGVzLlxuICB0b09wZXJhdGlvbkFjdGlvbkRpY3Rpb25hcnlUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvT3BlcmF0aW9uT3JBdHRyaWJ1dGVBY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGUoKTtcbiAgfSxcbiAgdG9BdHRyaWJ1dGVBY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl90b09wZXJhdGlvbk9yQXR0cmlidXRlQWN0aW9uRGljdGlvbmFyeVRlbXBsYXRlKCk7XG4gIH0sXG5cbiAgX3RvT3BlcmF0aW9uT3JBdHRyaWJ1dGVBY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE86IGFkZCB0aGUgc3VwZXItZ3JhbW1hcidzIHRlbXBsYXRlcyBhdCB0aGUgcmlnaHQgcGxhY2UsIGUuZy4sIGEgY2FzZSBmb3IgQWRkRXhwcl9wbHVzXG4gICAgLy8gc2hvdWxkIGFwcGVhciBuZXh0IHRvIG90aGVyIGNhc2VzIG9mIEFkZEV4cHIuXG5cbiAgICB2YXIgc2IgPSBuZXcgY29tbW9uLlN0cmluZ0J1ZmZlcigpO1xuICAgIHNiLmFwcGVuZCgneycpO1xuXG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBydWxlTmFtZSBpbiB0aGlzLnJ1bGVzKSB7XG4gICAgICB2YXIgYm9keSA9IHRoaXMucnVsZXNbcnVsZU5hbWVdLmJvZHk7XG4gICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNiLmFwcGVuZCgnLCcpO1xuICAgICAgfVxuICAgICAgc2IuYXBwZW5kKCdcXG4nKTtcbiAgICAgIHNiLmFwcGVuZCgnICAnKTtcbiAgICAgIHRoaXMuYWRkU2VtYW50aWNBY3Rpb25UZW1wbGF0ZShydWxlTmFtZSwgYm9keSwgc2IpO1xuICAgIH1cblxuICAgIHNiLmFwcGVuZCgnXFxufScpO1xuICAgIHJldHVybiBzYi5jb250ZW50cygpO1xuICB9LFxuXG4gIGFkZFNlbWFudGljQWN0aW9uVGVtcGxhdGU6IGZ1bmN0aW9uKHJ1bGVOYW1lLCBib2R5LCBzYikge1xuICAgIHNiLmFwcGVuZChydWxlTmFtZSk7XG4gICAgc2IuYXBwZW5kKCc6IGZ1bmN0aW9uKCcpO1xuICAgIHZhciBhcml0eSA9IHRoaXMuX3RvcERvd25BY3Rpb25Bcml0eShydWxlTmFtZSk7XG4gICAgc2IuYXBwZW5kKGNvbW1vbi5yZXBlYXQoJ18nLCBhcml0eSkuam9pbignLCAnKSk7XG4gICAgc2IuYXBwZW5kKCcpIHtcXG4nKTtcbiAgICBzYi5hcHBlbmQoJyAgfScpO1xuICB9LFxuXG4gIC8vIFBhcnNlIGEgc3RyaW5nIHdoaWNoIGV4cHJlc3NlcyBhIHJ1bGUgYXBwbGljYXRpb24gaW4gdGhpcyBncmFtbWFyLCBhbmQgcmV0dXJuIHRoZVxuICAvLyByZXN1bHRpbmcgQXBwbHkgbm9kZS5cbiAgcGFyc2VBcHBsaWNhdGlvbjogZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIGFwcDtcbiAgICBpZiAoc3RyLmluZGV4T2YoJzwnKSA9PT0gLTEpIHtcbiAgICAgIC8vIHNpbXBsZSBhcHBsaWNhdGlvblxuICAgICAgYXBwID0gbmV3IHBleHBycy5BcHBseShzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBwYXJhbWV0ZXJpemVkIGFwcGxpY2F0aW9uXG4gICAgICB2YXIgY3N0ID0gb2htR3JhbW1hci5tYXRjaChzdHIsICdCYXNlX2FwcGxpY2F0aW9uJyk7XG4gICAgICBhcHAgPSBidWlsZEdyYW1tYXIoY3N0LCB7fSk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoYXQgdGhlIGFwcGxpY2F0aW9uIGlzIHZhbGlkLlxuICAgIGlmICghKGFwcC5ydWxlTmFtZSBpbiB0aGlzLnJ1bGVzKSkge1xuICAgICAgdGhyb3cgZXJyb3JzLnVuZGVjbGFyZWRSdWxlKGFwcC5ydWxlTmFtZSwgdGhpcy5uYW1lKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hbHMgPSB0aGlzLnJ1bGVzW2FwcC5ydWxlTmFtZV0uZm9ybWFscztcbiAgICBpZiAoZm9ybWFscy5sZW5ndGggIT09IGFwcC5hcmdzLmxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMucnVsZXNbYXBwLnJ1bGVOYW1lXS5zb3VyY2U7XG4gICAgICB0aHJvdyBlcnJvcnMud3JvbmdOdW1iZXJPZlBhcmFtZXRlcnMoYXBwLnJ1bGVOYW1lLCBmb3JtYWxzLmxlbmd0aCwgYXBwLmFyZ3MubGVuZ3RoLCBzb3VyY2UpO1xuICAgIH1cbiAgICByZXR1cm4gYXBwO1xuICB9XG59O1xuXG4vLyBUaGUgZm9sbG93aW5nIGdyYW1tYXIgY29udGFpbnMgYSBmZXcgcnVsZXMgdGhhdCBjb3VsZG4ndCBiZSB3cml0dGVuICBpbiBcInVzZXJsYW5kXCIuXG4vLyBBdCB0aGUgYm90dG9tIG9mIHNyYy9tYWluLmpzLCB3ZSBjcmVhdGUgYSBzdWItZ3JhbW1hciBvZiB0aGlzIGdyYW1tYXIgdGhhdCdzIGNhbGxlZFxuLy8gYEJ1aWx0SW5SdWxlc2AuIFRoYXQgZ3JhbW1hciBjb250YWlucyBzZXZlcmFsIGNvbnZlbmllbmNlIHJ1bGVzLCBlLmcuLCBgbGV0dGVyYCBhbmRcbi8vIGBkaWdpdGAsIGFuZCBpcyBpbXBsaWNpdGx5IHRoZSBzdXBlci1ncmFtbWFyIG9mIGFueSBncmFtbWFyIHdob3NlIHN1cGVyLWdyYW1tYXJcbi8vIGlzbid0IHNwZWNpZmllZC5cbkdyYW1tYXIuUHJvdG9CdWlsdEluUnVsZXMgPSBuZXcgR3JhbW1hcihcbiAgJ1Byb3RvQnVpbHRJblJ1bGVzJywgIC8vIG5hbWVcbiAgdW5kZWZpbmVkLCAgLy8gc3VwZXJncmFtbWFyXG4gIHtcbiAgICBhbnk6IHtcbiAgICAgIGJvZHk6IHBleHBycy5hbnksXG4gICAgICBmb3JtYWxzOiBbXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnYW55IGNoYXJhY3RlcicsXG4gICAgICBwcmltaXRpdmU6IHRydWVcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgYm9keTogcGV4cHJzLmVuZCxcbiAgICAgIGZvcm1hbHM6IFtdLFxuICAgICAgZGVzY3JpcHRpb246ICdlbmQgb2YgaW5wdXQnLFxuICAgICAgcHJpbWl0aXZlOiB0cnVlXG4gICAgfSxcblxuICAgIGNhc2VJbnNlbnNpdGl2ZToge1xuICAgICAgYm9keTogbmV3IENhc2VJbnNlbnNpdGl2ZVRlcm1pbmFsKG5ldyBwZXhwcnMuUGFyYW0oMCkpLFxuICAgICAgZm9ybWFsczogWydzdHInXSxcbiAgICAgIHByaW1pdGl2ZTogdHJ1ZVxuICAgIH0sXG4gICAgbG93ZXI6IHtcbiAgICAgIGJvZHk6IG5ldyBwZXhwcnMuVW5pY29kZUNoYXIoJ0xsJyksXG4gICAgICBmb3JtYWxzOiBbXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnYSBsb3dlcmNhc2UgbGV0dGVyJyxcbiAgICAgIHByaW1pdGl2ZTogdHJ1ZVxuICAgIH0sXG4gICAgdXBwZXI6IHtcbiAgICAgIGJvZHk6IG5ldyBwZXhwcnMuVW5pY29kZUNoYXIoJ0x1JyksXG4gICAgICBmb3JtYWxzOiBbXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnYW4gdXBwZXJjYXNlIGxldHRlcicsXG4gICAgICBwcmltaXRpdmU6IHRydWVcbiAgICB9LFxuICAgIC8vIFRoZSB1bmlvbiBvZiBMdCAodGl0bGVjYXNlKSwgTG0gKG1vZGlmaWVyKSwgYW5kIExvIChvdGhlciksIGkuZS4gYW55IGxldHRlciBub3QgaW4gTGwgb3IgTHUuXG4gICAgdW5pY29kZUx0bW86IHtcbiAgICAgIGJvZHk6IG5ldyBwZXhwcnMuVW5pY29kZUNoYXIoJ0x0bW8nKSxcbiAgICAgIGZvcm1hbHM6IFtdLFxuICAgICAgZGVzY3JpcHRpb246ICdhIFVuaWNvZGUgY2hhcmFjdGVyIGluIEx0LCBMbSwgb3IgTG8nLFxuICAgICAgcHJpbWl0aXZlOiB0cnVlXG4gICAgfSxcblxuICAgIC8vIFRoZXNlIHJ1bGVzIGFyZSBub3QgdHJ1bHkgcHJpbWl0aXZlICh0aGV5IGNvdWxkIGJlIHdyaXR0ZW4gaW4gdXNlcmxhbmQpIGJ1dCBhcmUgZGVmaW5lZFxuICAgIC8vIGhlcmUgZm9yIGJvb3RzdHJhcHBpbmcgcHVycG9zZXMuXG4gICAgc3BhY2VzOiB7XG4gICAgICBib2R5OiBuZXcgcGV4cHJzLlN0YXIobmV3IHBleHBycy5BcHBseSgnc3BhY2UnKSksXG4gICAgICBmb3JtYWxzOiBbXVxuICAgIH0sXG4gICAgc3BhY2U6IHtcbiAgICAgIGJvZHk6IG5ldyBwZXhwcnMuUmFuZ2UoJ1xceDAwJywgJyAnKSxcbiAgICAgIGZvcm1hbHM6IFtdLFxuICAgICAgZGVzY3JpcHRpb246ICdhIHNwYWNlJ1xuICAgIH1cbiAgfVxuKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhbW1hcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBHcmFtbWFyID0gcmVxdWlyZSgnLi9HcmFtbWFyJyk7XG52YXIgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCcuL0lucHV0U3RyZWFtJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIFN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBDb25zdHJ1Y3RvcnNcblxuZnVuY3Rpb24gR3JhbW1hckRlY2wobmFtZSkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xufVxuXG4vLyBIZWxwZXJzXG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5zb3VyY2VJbnRlcnZhbCA9IGZ1bmN0aW9uKHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnN1YkludGVydmFsKHN0YXJ0SWR4LCBlbmRJZHggLSBzdGFydElkeCk7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuZW5zdXJlU3VwZXJHcmFtbWFyID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5zdXBlckdyYW1tYXIpIHtcbiAgICB0aGlzLndpdGhTdXBlckdyYW1tYXIoXG4gICAgICAgIC8vIFRPRE86IFRoZSBjb25kaXRpb25hbCBleHByZXNzaW9uIGJlbG93IGlzIGFuIHVnbHkgaGFjay4gSXQncyBraW5kIG9mIG9rIGJlY2F1c2VcbiAgICAgICAgLy8gSSBkb3VidCBhbnlvbmUgd2lsbCBldmVyIHRyeSB0byBkZWNsYXJlIGEgZ3JhbW1hciBjYWxsZWQgYEJ1aWx0SW5SdWxlc2AuIFN0aWxsLFxuICAgICAgICAvLyB3ZSBzaG91bGQgdHJ5IHRvIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgICAgIHRoaXMubmFtZSA9PT0gJ0J1aWx0SW5SdWxlcycgP1xuICAgICAgICAgICAgR3JhbW1hci5Qcm90b0J1aWx0SW5SdWxlcyA6XG4gICAgICAgICAgICBHcmFtbWFyLkJ1aWx0SW5SdWxlcyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuc3VwZXJHcmFtbWFyO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLmluc3RhbGxPdmVycmlkZGVuT3JFeHRlbmRlZFJ1bGUgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBib2R5LCBzb3VyY2UpIHtcbiAgdmFyIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzID0gY29tbW9uLmdldER1cGxpY2F0ZXMoZm9ybWFscyk7XG4gIGlmIChkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzKG5hbWUsIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzLCBzb3VyY2UpO1xuICB9XG4gIHZhciBydWxlSW5mbyA9IHRoaXMuZW5zdXJlU3VwZXJHcmFtbWFyKCkucnVsZXNbbmFtZV07XG4gIHZhciBleHBlY3RlZEZvcm1hbHMgPSBydWxlSW5mby5mb3JtYWxzO1xuICB2YXIgZXhwZWN0ZWROdW1Gb3JtYWxzID0gZXhwZWN0ZWRGb3JtYWxzID8gZXhwZWN0ZWRGb3JtYWxzLmxlbmd0aCA6IDA7XG4gIGlmIChmb3JtYWxzLmxlbmd0aCAhPT0gZXhwZWN0ZWROdW1Gb3JtYWxzKSB7XG4gICAgdGhyb3cgZXJyb3JzLndyb25nTnVtYmVyT2ZQYXJhbWV0ZXJzKG5hbWUsIGV4cGVjdGVkTnVtRm9ybWFscywgZm9ybWFscy5sZW5ndGgsIHNvdXJjZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuaW5zdGFsbChuYW1lLCBmb3JtYWxzLCBib2R5LCBydWxlSW5mby5kZXNjcmlwdGlvbiwgc291cmNlKTtcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5pbnN0YWxsID0gZnVuY3Rpb24obmFtZSwgZm9ybWFscywgYm9keSwgZGVzY3JpcHRpb24sIHNvdXJjZSkge1xuICB0aGlzLnJ1bGVzW25hbWVdID0ge1xuICAgIGJvZHk6IGJvZHkuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpLFxuICAgIGZvcm1hbHM6IGZvcm1hbHMsXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgIHNvdXJjZTogc291cmNlXG4gIH07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gU3R1ZmYgdGhhdCB5b3Ugc2hvdWxkIG9ubHkgZG8gb25jZVxuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aFN1cGVyR3JhbW1hciA9IGZ1bmN0aW9uKHN1cGVyR3JhbW1hcikge1xuICBpZiAodGhpcy5zdXBlckdyYW1tYXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBzdXBlciBncmFtbWFyIG9mIGEgR3JhbW1hckRlY2wgY2Fubm90IGJlIHNldCBtb3JlIHRoYW4gb25jZScpO1xuICB9XG4gIHRoaXMuc3VwZXJHcmFtbWFyID0gc3VwZXJHcmFtbWFyO1xuICB0aGlzLnJ1bGVzID0gT2JqZWN0LmNyZWF0ZShzdXBlckdyYW1tYXIucnVsZXMpO1xuXG4gIC8vIEdyYW1tYXJzIHdpdGggYW4gZXhwbGljaXQgc3VwZXJncmFtbWFyIGluaGVyaXQgYSBkZWZhdWx0IHN0YXJ0IHJ1bGUuXG4gIGlmICghc3VwZXJHcmFtbWFyLmlzQnVpbHRJbigpKSB7XG4gICAgdGhpcy5kZWZhdWx0U3RhcnRSdWxlID0gc3VwZXJHcmFtbWFyLmRlZmF1bHRTdGFydFJ1bGU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aERlZmF1bHRTdGFydFJ1bGUgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmRlZmF1bHRTdGFydFJ1bGUgPSBydWxlTmFtZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aFNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IG5ldyBJbnB1dFN0cmVhbShzb3VyY2UpLmludGVydmFsKDAsIHNvdXJjZS5sZW5ndGgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIENyZWF0ZXMgYSBHcmFtbWFyIGluc3RhbmNlLCBhbmQgaWYgaXQgcGFzc2VzIHRoZSBzYW5pdHkgY2hlY2tzLCByZXR1cm5zIGl0LlxuR3JhbW1hckRlY2wucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBncmFtbWFyID0gbmV3IEdyYW1tYXIoXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpLFxuICAgICAgdGhpcy5ydWxlcyxcbiAgICAgIHRoaXMuZGVmYXVsdFN0YXJ0UnVsZSk7XG5cbiAgLy8gVE9ETzogY2hhbmdlIHRoZSBwZXhwci5wcm90b3R5cGUuYXNzZXJ0Li4uIG1ldGhvZHMgdG8gbWFrZSB0aGVtIGFkZFxuICAvLyBleGNlcHRpb25zIHRvIGFuIGFycmF5IHRoYXQncyBwcm92aWRlZCBhcyBhbiBhcmcuIFRoZW4gd2UnbGwgYmUgYWJsZSB0b1xuICAvLyBzaG93IG1vcmUgdGhhbiBvbmUgZXJyb3Igb2YgdGhlIHNhbWUgdHlwZSBhdCBhIHRpbWUuXG4gIC8vIFRPRE86IGluY2x1ZGUgdGhlIG9mZmVuZGluZyBwZXhwciBpbiB0aGUgZXJyb3JzLCB0aGF0IHdheSB3ZSBjYW4gc2hvd1xuICAvLyB0aGUgcGFydCBvZiB0aGUgc291cmNlIHRoYXQgY2F1c2VkIGl0LlxuICB2YXIgZ3JhbW1hckVycm9ycyA9IFtdO1xuICB2YXIgZ3JhbW1hckhhc0ludmFsaWRBcHBsaWNhdGlvbnMgPSBmYWxzZTtcbiAgT2JqZWN0LmtleXMoZ3JhbW1hci5ydWxlcykuZm9yRWFjaChmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlc1tydWxlTmFtZV0uYm9keTtcbiAgICB0cnkge1xuICAgICAgYm9keS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZ3JhbW1hckVycm9ycy5wdXNoKGUpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYm9keS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZ3JhbW1hckVycm9ycy5wdXNoKGUpO1xuICAgICAgZ3JhbW1hckhhc0ludmFsaWRBcHBsaWNhdGlvbnMgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIGlmICghZ3JhbW1hckhhc0ludmFsaWRBcHBsaWNhdGlvbnMpIHtcbiAgICAvLyBUaGUgZm9sbG93aW5nIGNoZWNrIGNhbiBvbmx5IGJlIGRvbmUgaWYgdGhlIGdyYW1tYXIgaGFzIG5vIGludmFsaWQgYXBwbGljYXRpb25zLlxuICAgIE9iamVjdC5rZXlzKGdyYW1tYXIucnVsZXMpLmZvckVhY2goZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICAgIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlc1tydWxlTmFtZV0uYm9keTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGJvZHkuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIFtdKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZ3JhbW1hckVycm9ycy5wdXNoKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGlmIChncmFtbWFyRXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICBlcnJvcnMudGhyb3dFcnJvcnMoZ3JhbW1hckVycm9ycyk7XG4gIH1cbiAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgZ3JhbW1hci5zb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgfVxuXG4gIHJldHVybiBncmFtbWFyO1xufTtcblxuLy8gUnVsZSBkZWNsYXJhdGlvbnNcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcm1hbHMsIGJvZHksIGRlc2NyaXB0aW9uLCBzb3VyY2UpIHtcbiAgdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKTtcbiAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVzW25hbWVdKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbihuYW1lLCB0aGlzLm5hbWUsIHRoaXMuc3VwZXJHcmFtbWFyLm5hbWUsIHNvdXJjZSk7XG4gIH0gZWxzZSBpZiAodGhpcy5ydWxlc1tuYW1lXSkge1xuICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24obmFtZSwgdGhpcy5uYW1lLCB0aGlzLm5hbWUsIHNvdXJjZSk7XG4gIH1cbiAgdmFyIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzID0gY29tbW9uLmdldER1cGxpY2F0ZXMoZm9ybWFscyk7XG4gIGlmIChkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzKG5hbWUsIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzLCBzb3VyY2UpO1xuICB9XG4gIHJldHVybiB0aGlzLmluc3RhbGwobmFtZSwgZm9ybWFscywgYm9keSwgZGVzY3JpcHRpb24sIHNvdXJjZSk7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUub3ZlcnJpZGUgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBib2R5LCBkZXNjSWdub3JlZCwgc291cmNlKSB7XG4gIHZhciBydWxlSW5mbyA9IHRoaXMuZW5zdXJlU3VwZXJHcmFtbWFyKCkucnVsZXNbbmFtZV07XG4gIGlmICghcnVsZUluZm8pIHtcbiAgICB0aHJvdyBlcnJvcnMuY2Fubm90T3ZlcnJpZGVVbmRlY2xhcmVkUnVsZShuYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lLCBzb3VyY2UpO1xuICB9XG4gIHRoaXMuaW5zdGFsbE92ZXJyaWRkZW5PckV4dGVuZGVkUnVsZShuYW1lLCBmb3JtYWxzLCBib2R5LCBzb3VyY2UpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBmcmFnbWVudCwgZGVzY0lnbm9yZWQsIHNvdXJjZSkge1xuICB2YXIgcnVsZUluZm8gPSB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpLnJ1bGVzW25hbWVdO1xuICBpZiAoIXJ1bGVJbmZvKSB7XG4gICAgdGhyb3cgZXJyb3JzLmNhbm5vdEV4dGVuZFVuZGVjbGFyZWRSdWxlKG5hbWUsIHRoaXMuc3VwZXJHcmFtbWFyLm5hbWUsIHNvdXJjZSk7XG4gIH1cbiAgdmFyIGJvZHkgPSBuZXcgcGV4cHJzLkV4dGVuZCh0aGlzLnN1cGVyR3JhbW1hciwgbmFtZSwgZnJhZ21lbnQpO1xuICBib2R5LnNvdXJjZSA9IGZyYWdtZW50LnNvdXJjZTtcbiAgdGhpcy5pbnN0YWxsT3ZlcnJpZGRlbk9yRXh0ZW5kZWRSdWxlKG5hbWUsIGZvcm1hbHMsIGJvZHksIHNvdXJjZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhbW1hckRlY2w7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgSW50ZXJ2YWwgPSByZXF1aXJlKCcuL0ludGVydmFsJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBJbnB1dFN0cmVhbShzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gIHRoaXMucG9zID0gMDtcbiAgdGhpcy5leGFtaW5lZExlbmd0aCA9IDA7XG59XG5cbklucHV0U3RyZWFtLnByb3RvdHlwZSA9IHtcbiAgYXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhbnMgPSB0aGlzLnBvcyA9PT0gdGhpcy5zb3VyY2UubGVuZ3RoO1xuICAgIHRoaXMuZXhhbWluZWRMZW5ndGggPSBNYXRoLm1heCh0aGlzLmV4YW1pbmVkTGVuZ3RoLCB0aGlzLnBvcyArIDEpO1xuICAgIHJldHVybiBhbnM7XG4gIH0sXG5cbiAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFucyA9IHRoaXMuc291cmNlW3RoaXMucG9zKytdO1xuICAgIHRoaXMuZXhhbWluZWRMZW5ndGggPSBNYXRoLm1heCh0aGlzLmV4YW1pbmVkTGVuZ3RoLCB0aGlzLnBvcyk7XG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICBtYXRjaFN0cmluZzogZnVuY3Rpb24ocywgb3B0SWdub3JlQ2FzZSkge1xuICAgIHZhciBpZHg7XG4gICAgaWYgKG9wdElnbm9yZUNhc2UpIHtcbiAgICAgIC8qXG4gICAgICAgIENhc2UtaW5zZW5zaXRpdmUgY29tcGFyaXNvbiBpcyBhIHRyaWNreSBidXNpbmVzcy4gU29tZSBub3RhYmxlIGdvdGNoYXMgaW5jbHVkZSB0aGVcbiAgICAgICAgXCJUdXJraXNoIElcIiBwcm9ibGVtIChodHRwOi8vd3d3LmkxOG5ndXkuY29tL3VuaWNvZGUvdHVya2lzaC1pMThuLmh0bWwpIGFuZCB0aGUgZmFjdFxuICAgICAgICB0aGF0IHRoZSBHZXJtYW4gRXNzemV0ICjDnykgdHVybnMgaW50byBcIlNTXCIgaW4gdXBwZXIgY2FzZS5cblxuICAgICAgICBUaGlzIGlzIGludGVuZGVkIHRvIGJlIGEgbG9jYWxlLWludmFyaWFudCBjb21wYXJpc29uLCB3aGljaCBtZWFucyBpdCBtYXkgbm90IG9iZXlcbiAgICAgICAgbG9jYWxlLXNwZWNpZmljIGV4cGVjdGF0aW9ucyAoZS5nLiBcImlcIiA9PiBcIsSwXCIpLlxuICAgICAgICovXG4gICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICB2YXIgYWN0dWFsID0gdGhpcy5uZXh0KCk7XG4gICAgICAgIHZhciBleHBlY3RlZCA9IHNbaWR4XTtcbiAgICAgICAgaWYgKGFjdHVhbCA9PSBudWxsIHx8IGFjdHVhbC50b1VwcGVyQ2FzZSgpICE9PSBleHBlY3RlZC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gRGVmYXVsdCBpcyBjYXNlLXNlbnNpdGl2ZSBjb21wYXJpc29uLlxuICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBpZiAodGhpcy5uZXh0KCkgIT09IHNbaWR4XSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgc291cmNlU2xpY2U6IGZ1bmN0aW9uKHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnRJZHgsIGVuZElkeCk7XG4gIH0sXG5cbiAgaW50ZXJ2YWw6IGZ1bmN0aW9uKHN0YXJ0SWR4LCBvcHRFbmRJZHgpIHtcbiAgICByZXR1cm4gbmV3IEludGVydmFsKHRoaXMuc291cmNlLCBzdGFydElkeCwgb3B0RW5kSWR4ID8gb3B0RW5kSWR4IDogdGhpcy5wb3MpO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN0cmVhbTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuL2NvbW1vbicpLmFzc2VydDtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEludGVydmFsKHNvdXJjZVN0cmluZywgc3RhcnRJZHgsIGVuZElkeCkge1xuICB0aGlzLnNvdXJjZVN0cmluZyA9IHNvdXJjZVN0cmluZztcbiAgdGhpcy5zdGFydElkeCA9IHN0YXJ0SWR4O1xuICB0aGlzLmVuZElkeCA9IGVuZElkeDtcbn1cblxuSW50ZXJ2YWwuY292ZXJhZ2UgPSBmdW5jdGlvbigvKiBpbnRlcnZhbDEsIGludGVydmFsMiwgLi4uICovKSB7XG4gIHZhciBzb3VyY2VTdHJpbmcgPSBhcmd1bWVudHNbMF0uc291cmNlU3RyaW5nO1xuICB2YXIgc3RhcnRJZHggPSBhcmd1bWVudHNbMF0uc3RhcnRJZHg7XG4gIHZhciBlbmRJZHggPSBhcmd1bWVudHNbMF0uZW5kSWR4O1xuICBmb3IgKHZhciBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciBpbnRlcnZhbCA9IGFyZ3VtZW50c1tpZHhdO1xuICAgIGlmIChpbnRlcnZhbC5zb3VyY2VTdHJpbmcgIT09IHNvdXJjZVN0cmluZykge1xuICAgICAgdGhyb3cgZXJyb3JzLmludGVydmFsU291cmNlc0RvbnRNYXRjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydElkeCA9IE1hdGgubWluKHN0YXJ0SWR4LCBhcmd1bWVudHNbaWR4XS5zdGFydElkeCk7XG4gICAgICBlbmRJZHggPSBNYXRoLm1heChlbmRJZHgsIGFyZ3VtZW50c1tpZHhdLmVuZElkeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgSW50ZXJ2YWwoc291cmNlU3RyaW5nLCBzdGFydElkeCwgZW5kSWR4KTtcbn07XG5cbkludGVydmFsLnByb3RvdHlwZSA9IHtcbiAgY292ZXJhZ2VXaXRoOiBmdW5jdGlvbigvKiBpbnRlcnZhbDEsIGludGVydmFsMiwgLi4uICovKSB7XG4gICAgdmFyIGludGVydmFscyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgaW50ZXJ2YWxzLnB1c2godGhpcyk7XG4gICAgcmV0dXJuIEludGVydmFsLmNvdmVyYWdlLmFwcGx5KHVuZGVmaW5lZCwgaW50ZXJ2YWxzKTtcbiAgfSxcblxuICBjb2xsYXBzZWRMZWZ0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEludGVydmFsKHRoaXMuc291cmNlU3RyaW5nLCB0aGlzLnN0YXJ0SWR4LCB0aGlzLnN0YXJ0SWR4KTtcbiAgfSxcblxuICBjb2xsYXBzZWRSaWdodDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLnNvdXJjZVN0cmluZywgdGhpcy5lbmRJZHgsIHRoaXMuZW5kSWR4KTtcbiAgfSxcblxuICBnZXRMaW5lQW5kQ29sdW1uTWVzc2FnZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJhbmdlID0gW3RoaXMuc3RhcnRJZHgsIHRoaXMuZW5kSWR4XTtcbiAgICByZXR1cm4gdXRpbC5nZXRMaW5lQW5kQ29sdW1uTWVzc2FnZSh0aGlzLnNvdXJjZVN0cmluZywgdGhpcy5zdGFydElkeCwgcmFuZ2UpO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgMCwgMSwgb3IgMiBpbnRlcnZhbHMgdGhhdCByZXByZXNlbnRzIHRoZSByZXN1bHQgb2YgdGhlXG4gIC8vIGludGVydmFsIGRpZmZlcmVuY2Ugb3BlcmF0aW9uLlxuICBtaW51czogZnVuY3Rpb24odGhhdCkge1xuICAgIGlmICh0aGlzLnNvdXJjZVN0cmluZyAhPT0gdGhhdC5zb3VyY2VTdHJpbmcpIHtcbiAgICAgIHRocm93IGVycm9ycy5pbnRlcnZhbFNvdXJjZXNEb250TWF0Y2goKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPT09IHRoYXQuc3RhcnRJZHggJiYgdGhpcy5lbmRJZHggPT09IHRoYXQuZW5kSWR4KSB7XG4gICAgICAvLyBgdGhpc2AgYW5kIGB0aGF0YCBhcmUgdGhlIHNhbWUgaW50ZXJ2YWwhXG4gICAgICByZXR1cm4gW1xuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LnN0YXJ0SWR4ICYmIHRoYXQuZW5kSWR4IDwgdGhpcy5lbmRJZHgpIHtcbiAgICAgIC8vIGB0aGF0YCBzcGxpdHMgYHRoaXNgIGludG8gdHdvIGludGVydmFsc1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuc291cmNlU3RyaW5nLCB0aGlzLnN0YXJ0SWR4LCB0aGF0LnN0YXJ0SWR4KSxcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuc291cmNlU3RyaW5nLCB0aGF0LmVuZElkeCwgdGhpcy5lbmRJZHgpXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGFydElkeCA8IHRoYXQuZW5kSWR4ICYmIHRoYXQuZW5kSWR4IDwgdGhpcy5lbmRJZHgpIHtcbiAgICAgIC8vIGB0aGF0YCBjb250YWlucyBhIHByZWZpeCBvZiBgdGhpc2BcbiAgICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBJbnRlcnZhbCh0aGlzLnNvdXJjZVN0cmluZywgdGhhdC5lbmRJZHgsIHRoaXMuZW5kSWR4KVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LnN0YXJ0SWR4ICYmIHRoYXQuc3RhcnRJZHggPCB0aGlzLmVuZElkeCkge1xuICAgICAgLy8gYHRoYXRgIGNvbnRhaW5zIGEgc3VmZml4IG9mIGB0aGlzYFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuc291cmNlU3RyaW5nLCB0aGlzLnN0YXJ0SWR4LCB0aGF0LnN0YXJ0SWR4KVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYHRoYXRgIGFuZCBgdGhpc2AgZG8gbm90IG92ZXJsYXBcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXNcbiAgICAgIF07XG4gICAgfVxuICB9LFxuXG4gIC8vIFJldHVybnMgYSBuZXcgSW50ZXJ2YWwgdGhhdCBoYXMgdGhlIHNhbWUgZXh0ZW50IGFzIHRoaXMgb25lLCBidXQgd2hpY2ggaXMgcmVsYXRpdmVcbiAgLy8gdG8gYHRoYXRgLCBhbiBJbnRlcnZhbCB0aGF0IGZ1bGx5IGNvdmVycyB0aGlzIG9uZS5cbiAgcmVsYXRpdmVUbzogZnVuY3Rpb24odGhhdCkge1xuICAgIGlmICh0aGlzLnNvdXJjZVN0cmluZyAhPT0gdGhhdC5zb3VyY2VTdHJpbmcpIHtcbiAgICAgIHRocm93IGVycm9ycy5pbnRlcnZhbFNvdXJjZXNEb250TWF0Y2goKTtcbiAgICB9XG4gICAgYXNzZXJ0KHRoaXMuc3RhcnRJZHggPj0gdGhhdC5zdGFydElkeCAmJiB0aGlzLmVuZElkeCA8PSB0aGF0LmVuZElkeCxcbiAgICAgICAgICAgJ290aGVyIGludGVydmFsIGRvZXMgbm90IGNvdmVyIHRoaXMgb25lJyk7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLnNvdXJjZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZHggLSB0aGF0LnN0YXJ0SWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRJZHggLSB0aGF0LnN0YXJ0SWR4KTtcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgbmV3IEludGVydmFsIHdoaWNoIGNvbnRhaW5zIHRoZSBzYW1lIGNvbnRlbnRzIGFzIHRoaXMgb25lLFxuICAvLyBidXQgd2l0aCB3aGl0ZXNwYWNlIHRyaW1tZWQgZnJvbSBib3RoIGVuZHMuIChUaGlzIG9ubHkgbWFrZXMgc2Vuc2Ugd2hlblxuICAvLyB0aGUgaW5wdXQgc3RyZWFtIGlzIGEgc3RyaW5nLilcbiAgdHJpbW1lZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRlbnRzID0gdGhpcy5jb250ZW50cztcbiAgICB2YXIgc3RhcnRJZHggPSB0aGlzLnN0YXJ0SWR4ICsgY29udGVudHMubWF0Y2goL15cXHMqLylbMF0ubGVuZ3RoO1xuICAgIHZhciBlbmRJZHggPSB0aGlzLmVuZElkeCAtIGNvbnRlbnRzLm1hdGNoKC9cXHMqJC8pWzBdLmxlbmd0aDtcbiAgICByZXR1cm4gbmV3IEludGVydmFsKHRoaXMuc291cmNlU3RyaW5nLCBzdGFydElkeCwgZW5kSWR4KTtcbiAgfSxcblxuICBzdWJJbnRlcnZhbDogZnVuY3Rpb24ob2Zmc2V0LCBsZW4pIHtcbiAgICB2YXIgbmV3U3RhcnRJZHggPSB0aGlzLnN0YXJ0SWR4ICsgb2Zmc2V0O1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5zb3VyY2VTdHJpbmcsIG5ld1N0YXJ0SWR4LCBuZXdTdGFydElkeCArIGxlbik7XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEludGVydmFsLnByb3RvdHlwZSwge1xuICBjb250ZW50czoge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fY29udGVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9jb250ZW50cyA9IHRoaXMuc291cmNlU3RyaW5nLnNsaWNlKHRoaXMuc3RhcnRJZHgsIHRoaXMuZW5kSWR4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9jb250ZW50cztcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfSxcbiAgbGVuZ3RoOiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuZW5kSWR4IC0gdGhpcy5zdGFydElkeDsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH1cbn0pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnZhbDtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gTWF0Y2hSZXN1bHQoXG4gICAgbWF0Y2hlcixcbiAgICBpbnB1dCxcbiAgICBzdGFydEV4cHIsXG4gICAgY3N0LFxuICAgIGNzdE9mZnNldCxcbiAgICByaWdodG1vc3RGYWlsdXJlUG9zaXRpb24sXG4gICAgb3B0UmVjb3JkZWRGYWlsdXJlcykge1xuXG4gIHRoaXMubWF0Y2hlciA9IG1hdGNoZXI7XG4gIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgdGhpcy5zdGFydEV4cHIgPSBzdGFydEV4cHI7XG4gIHRoaXMuX2NzdCA9IGNzdDtcbiAgdGhpcy5fY3N0T2Zmc2V0ID0gY3N0T2Zmc2V0O1xuICB0aGlzLl9yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24gPSByaWdodG1vc3RGYWlsdXJlUG9zaXRpb247XG4gIHRoaXMuX3JpZ2h0bW9zdEZhaWx1cmVzID0gb3B0UmVjb3JkZWRGYWlsdXJlcztcblxuICBpZiAodGhpcy5mYWlsZWQoKSkge1xuICAgIGNvbW1vbi5kZWZpbmVMYXp5UHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXRhaWwgPSAnRXhwZWN0ZWQgJyArIHRoaXMuZ2V0RXhwZWN0ZWRUZXh0KCk7XG4gICAgICByZXR1cm4gdXRpbC5nZXRMaW5lQW5kQ29sdW1uTWVzc2FnZSh0aGlzLmlucHV0LCB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpKSArIGRldGFpbDtcbiAgICB9KTtcbiAgICBjb21tb24uZGVmaW5lTGF6eVByb3BlcnR5KHRoaXMsICdzaG9ydE1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXRhaWwgPSAnZXhwZWN0ZWQgJyArIHRoaXMuZ2V0RXhwZWN0ZWRUZXh0KCk7XG4gICAgICB2YXIgZXJyb3JJbmZvID0gdXRpbC5nZXRMaW5lQW5kQ29sdW1uKHRoaXMuaW5wdXQsIHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCkpO1xuICAgICAgcmV0dXJuICdMaW5lICcgKyBlcnJvckluZm8ubGluZU51bSArICcsIGNvbCAnICsgZXJyb3JJbmZvLmNvbE51bSArICc6ICcgKyBkZXRhaWw7XG4gICAgfSk7XG4gIH1cbn1cblxuTWF0Y2hSZXN1bHQucHJvdG90eXBlLnN1Y2NlZWRlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gISF0aGlzLl9jc3Q7XG59O1xuXG5NYXRjaFJlc3VsdC5wcm90b3R5cGUuZmFpbGVkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5zdWNjZWVkZWQoKTtcbn07XG5cbk1hdGNoUmVzdWx0LnByb3RvdHlwZS5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX3JpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbjtcbn07XG5cbk1hdGNoUmVzdWx0LnByb3RvdHlwZS5nZXRSaWdodG1vc3RGYWlsdXJlcyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuX3JpZ2h0bW9zdEZhaWx1cmVzKSB7XG4gICAgdGhpcy5tYXRjaGVyLnNldElucHV0KHRoaXMuaW5wdXQpO1xuICAgIHZhciBtYXRjaFJlc3VsdFdpdGhGYWlsdXJlcyA9XG4gICAgICAgIHRoaXMubWF0Y2hlci5fbWF0Y2godGhpcy5zdGFydEV4cHIsIGZhbHNlLCB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpKTtcbiAgICB0aGlzLl9yaWdodG1vc3RGYWlsdXJlcyA9IG1hdGNoUmVzdWx0V2l0aEZhaWx1cmVzLmdldFJpZ2h0bW9zdEZhaWx1cmVzKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX3JpZ2h0bW9zdEZhaWx1cmVzO1xufTtcblxuTWF0Y2hSZXN1bHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN1Y2NlZWRlZCgpID9cbiAgICAgICdbbWF0Y2ggc3VjY2VlZGVkXScgOlxuICAgICAgJ1ttYXRjaCBmYWlsZWQgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCkgKyAnXSc7XG59O1xuXG4vLyBSZXR1cm4gYSBzdHJpbmcgc3VtbWFyaXppbmcgdGhlIGV4cGVjdGVkIGNvbnRlbnRzIG9mIHRoZSBpbnB1dCBzdHJlYW0gd2hlblxuLy8gdGhlIG1hdGNoIGZhaWx1cmUgb2NjdXJyZWQuXG5NYXRjaFJlc3VsdC5wcm90b3R5cGUuZ2V0RXhwZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN1Y2NlZWRlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZ2V0IGV4cGVjdGVkIHRleHQgb2YgYSBzdWNjZXNzZnVsIE1hdGNoUmVzdWx0Jyk7XG4gIH1cblxuICB2YXIgc2IgPSBuZXcgY29tbW9uLlN0cmluZ0J1ZmZlcigpO1xuICB2YXIgZmFpbHVyZXMgPSB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVzKCk7XG5cbiAgLy8gRmlsdGVyIG91dCB0aGUgZmx1ZmZ5IGZhaWx1cmVzIHRvIG1ha2UgdGhlIGRlZmF1bHQgZXJyb3IgbWVzc2FnZXMgbW9yZSB1c2VmdWxcbiAgZmFpbHVyZXMgPSBmYWlsdXJlcy5maWx0ZXIoZnVuY3Rpb24oZmFpbHVyZSkge1xuICAgIHJldHVybiAhZmFpbHVyZS5pc0ZsdWZmeSgpO1xuICB9KTtcblxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBmYWlsdXJlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIGlmIChpZHggPT09IGZhaWx1cmVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc2IuYXBwZW5kKGZhaWx1cmVzLmxlbmd0aCA+IDIgPyAnLCBvciAnIDogJyBvciAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNiLmFwcGVuZCgnLCAnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2IuYXBwZW5kKGZhaWx1cmVzW2lkeF0udG9TdHJpbmcoKSk7XG4gIH1cbiAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG59O1xuXG5NYXRjaFJlc3VsdC5wcm90b3R5cGUuZ2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBvcyA9IHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCk7XG4gIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dCwgcG9zLCBwb3MpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gTWF0Y2hSZXN1bHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCcuL0lucHV0U3RyZWFtJyk7XG52YXIgTWF0Y2hSZXN1bHQgPSByZXF1aXJlKCcuL01hdGNoUmVzdWx0Jyk7XG52YXIgUG9zSW5mbyA9IHJlcXVpcmUoJy4vUG9zSW5mbycpO1xudmFyIFRyYWNlID0gcmVxdWlyZSgnLi9UcmFjZScpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgYXBwbHlTcGFjZXMgPSBuZXcgcGV4cHJzLkFwcGx5KCdzcGFjZXMnKTtcblxuZnVuY3Rpb24gTWF0Y2hTdGF0ZShtYXRjaGVyLCBzdGFydEV4cHIsIG9wdFBvc2l0aW9uVG9SZWNvcmRGYWlsdXJlcykge1xuICB0aGlzLm1hdGNoZXIgPSBtYXRjaGVyO1xuICB0aGlzLnN0YXJ0RXhwciA9IHN0YXJ0RXhwcjtcblxuICB0aGlzLmdyYW1tYXIgPSBtYXRjaGVyLmdyYW1tYXI7XG4gIHRoaXMuaW5wdXQgPSBtYXRjaGVyLmlucHV0O1xuICB0aGlzLmlucHV0U3RyZWFtID0gbmV3IElucHV0U3RyZWFtKG1hdGNoZXIuaW5wdXQpO1xuICB0aGlzLm1lbW9UYWJsZSA9IG1hdGNoZXIubWVtb1RhYmxlO1xuXG4gIHRoaXMuX2JpbmRpbmdzID0gW107XG4gIHRoaXMuX2JpbmRpbmdPZmZzZXRzID0gW107XG4gIHRoaXMuX2FwcGxpY2F0aW9uU3RhY2sgPSBbXTtcbiAgdGhpcy5fcG9zU3RhY2sgPSBbMF07XG4gIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjayA9IFtmYWxzZV07XG5cbiAgdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24gPSAtMTtcbiAgdGhpcy5fcmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uU3RhY2sgPSBbXTtcbiAgdGhpcy5fcmVjb3JkZWRGYWlsdXJlc1N0YWNrID0gW107XG5cbiAgaWYgKG9wdFBvc2l0aW9uVG9SZWNvcmRGYWlsdXJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5wb3NpdGlvblRvUmVjb3JkRmFpbHVyZXMgPSBvcHRQb3NpdGlvblRvUmVjb3JkRmFpbHVyZXM7XG4gICAgdGhpcy5yZWNvcmRlZEZhaWx1cmVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxufVxuXG5NYXRjaFN0YXRlLnByb3RvdHlwZSA9IHtcbiAgcG9zVG9PZmZzZXQ6IGZ1bmN0aW9uKHBvcykge1xuICAgIHJldHVybiBwb3MgLSB0aGlzLl9wb3NTdGFja1t0aGlzLl9wb3NTdGFjay5sZW5ndGggLSAxXTtcbiAgfSxcblxuICBlbnRlckFwcGxpY2F0aW9uOiBmdW5jdGlvbihwb3NJbmZvLCBhcHApIHtcbiAgICB0aGlzLl9wb3NTdGFjay5wdXNoKHRoaXMuaW5wdXRTdHJlYW0ucG9zKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblN0YWNrLnB1c2goYXBwKTtcbiAgICB0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2sucHVzaChmYWxzZSk7XG4gICAgcG9zSW5mby5lbnRlcihhcHApO1xuICAgIHRoaXMuX3JpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvblN0YWNrLnB1c2godGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24pO1xuICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gLTE7XG4gIH0sXG5cbiAgZXhpdEFwcGxpY2F0aW9uOiBmdW5jdGlvbihwb3NJbmZvLCBvcHROb2RlKSB7XG4gICAgdmFyIG9yaWdQb3MgPSB0aGlzLl9wb3NTdGFjay5wb3AoKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblN0YWNrLnBvcCgpO1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wb3AoKTtcbiAgICBwb3NJbmZvLmV4aXQoKTtcblxuICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gTWF0aC5tYXgoXG4gICAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uLFxuICAgICAgICB0aGlzLl9yaWdodG1vc3RGYWlsdXJlUG9zaXRpb25TdGFjay5wb3AoKSk7XG5cbiAgICBpZiAob3B0Tm9kZSkge1xuICAgICAgdGhpcy5wdXNoQmluZGluZyhvcHROb2RlLCBvcmlnUG9zKTtcbiAgICB9XG4gIH0sXG5cbiAgZW50ZXJMZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wdXNoKHRydWUpO1xuICB9LFxuXG4gIGV4aXRMZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wb3AoKTtcbiAgfSxcblxuICBjdXJyZW50QXBwbGljYXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBsaWNhdGlvblN0YWNrW3RoaXMuX2FwcGxpY2F0aW9uU3RhY2subGVuZ3RoIC0gMV07XG4gIH0sXG5cbiAgaW5TeW50YWN0aWNDb250ZXh0OiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgY3VycmVudEFwcGxpY2F0aW9uID0gdGhpcy5jdXJyZW50QXBwbGljYXRpb24oKTtcbiAgICBpZiAoY3VycmVudEFwcGxpY2F0aW9uKSB7XG4gICAgICByZXR1cm4gY3VycmVudEFwcGxpY2F0aW9uLmlzU3ludGFjdGljKCkgJiYgIXRoaXMuaW5MZXhpZmllZENvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlIHRvcC1sZXZlbCBjb250ZXh0IGlzIHN5bnRhY3RpYyBpZiB0aGUgc3RhcnQgYXBwbGljYXRpb24gaXMuXG4gICAgICByZXR1cm4gdGhpcy5zdGFydEV4cHIuZmFjdG9yc1swXS5pc1N5bnRhY3RpYygpO1xuICAgIH1cbiAgfSxcblxuICBpbkxleGlmaWVkQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFja1t0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2subGVuZ3RoIC0gMV07XG4gIH0sXG5cbiAgc2tpcFNwYWNlczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wdXNoRmFpbHVyZXNJbmZvKCk7XG4gICAgdGhpcy5ldmFsKGFwcGx5U3BhY2VzKTtcbiAgICB0aGlzLnBvcEJpbmRpbmcoKTtcbiAgICB0aGlzLnBvcEZhaWx1cmVzSW5mbygpO1xuICAgIHJldHVybiB0aGlzLmlucHV0U3RyZWFtLnBvcztcbiAgfSxcblxuICBza2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluU3ludGFjdGljQ29udGV4dCgpID9cbiAgICAgICAgdGhpcy5za2lwU3BhY2VzKCkgOlxuICAgICAgICB0aGlzLmlucHV0U3RyZWFtLnBvcztcbiAgfSxcblxuICBtYXliZVNraXBTcGFjZXNCZWZvcmU6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIHBleHBycy5BcHBseSAmJiBleHByLmlzU3ludGFjdGljKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXBTcGFjZXMoKTtcbiAgICB9IGVsc2UgaWYgKGV4cHIuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSgpICYmIGV4cHIgIT09IGFwcGx5U3BhY2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5za2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXRTdHJlYW0ucG9zO1xuICAgIH1cbiAgfSxcblxuICBwdXNoQmluZGluZzogZnVuY3Rpb24obm9kZSwgb3JpZ1Bvcykge1xuICAgIHRoaXMuX2JpbmRpbmdzLnB1c2gobm9kZSk7XG4gICAgdGhpcy5fYmluZGluZ09mZnNldHMucHVzaCh0aGlzLnBvc1RvT2Zmc2V0KG9yaWdQb3MpKTtcbiAgfSxcblxuICBwb3BCaW5kaW5nOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9iaW5kaW5ncy5wb3AoKTtcbiAgICB0aGlzLl9iaW5kaW5nT2Zmc2V0cy5wb3AoKTtcbiAgfSxcblxuICBudW1CaW5kaW5nczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdzLmxlbmd0aDtcbiAgfSxcblxuICB0cnVuY2F0ZUJpbmRpbmdzOiBmdW5jdGlvbihuZXdMZW5ndGgpIHtcbiAgICAvLyBZZXMsIHRoaXMgaXMgdGhpcyByZWFsbHkgZmFzdGVyIHRoYW4gc2V0dGluZyB0aGUgYGxlbmd0aGAgcHJvcGVydHkgKHRlc3RlZCB3aXRoXG4gICAgLy8gYmluL2VzNWJlbmNoIG9uIE5vZGUgdjYuMS4wKS5cbiAgICB3aGlsZSAodGhpcy5fYmluZGluZ3MubGVuZ3RoID4gbmV3TGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvcEJpbmRpbmcoKTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0Q3VycmVudFBvc0luZm86IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldFBvc0luZm8odGhpcy5pbnB1dFN0cmVhbS5wb3MpO1xuICB9LFxuXG4gIGdldFBvc0luZm86IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciBwb3NJbmZvID0gdGhpcy5tZW1vVGFibGVbcG9zXTtcbiAgICBpZiAoIXBvc0luZm8pIHtcbiAgICAgIHBvc0luZm8gPSB0aGlzLm1lbW9UYWJsZVtwb3NdID0gbmV3IFBvc0luZm8oKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvc0luZm87XG4gIH0sXG5cbiAgcHJvY2Vzc0ZhaWx1cmU6IGZ1bmN0aW9uKHBvcywgZXhwcikge1xuICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gTWF0aC5tYXgodGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24sIHBvcyk7XG5cbiAgICBpZiAodGhpcy5yZWNvcmRlZEZhaWx1cmVzICYmIHBvcyA9PT0gdGhpcy5wb3NpdGlvblRvUmVjb3JkRmFpbHVyZXMpIHtcbiAgICAgIHZhciBhcHAgPSB0aGlzLmN1cnJlbnRBcHBsaWNhdGlvbigpO1xuICAgICAgaWYgKGFwcCkge1xuICAgICAgICAvLyBTdWJzdGl0dXRlIHBhcmFtZXRlcnMgd2l0aCB0aGUgYWN0dWFsIHBleHBycyB0aGF0IHdlcmUgcGFzc2VkIHRvXG4gICAgICAgIC8vIHRoZSBjdXJyZW50IHJ1bGUuXG4gICAgICAgIGV4cHIgPSBleHByLnN1YnN0aXR1dGVQYXJhbXMoYXBwLmFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhpcyBicmFuY2ggaXMgb25seSByZWFjaGVkIGZvciB0aGUgXCJlbmQtY2hlY2tcIiB0aGF0IGlzXG4gICAgICAgIC8vIHBlcmZvcm1lZCBhZnRlciB0aGUgdG9wLWxldmVsIGFwcGxpY2F0aW9uLiBJbiB0aGF0IGNhc2UsXG4gICAgICAgIC8vIGV4cHIgPT09IHBleHBycy5lbmQgc28gdGhlcmUgaXMgbm8gbmVlZCB0byBzdWJzdGl0dXRlXG4gICAgICAgIC8vIHBhcmFtZXRlcnMuXG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVjb3JkRmFpbHVyZShleHByLnRvRmFpbHVyZSh0aGlzLmdyYW1tYXIpLCBmYWxzZSk7XG4gICAgfVxuICB9LFxuXG4gIHJlY29yZEZhaWx1cmU6IGZ1bmN0aW9uKGZhaWx1cmUsIHNob3VsZENsb25lSWZOZXcpIHtcbiAgICB2YXIga2V5ID0gZmFpbHVyZS50b0tleSgpO1xuICAgIGlmICghdGhpcy5yZWNvcmRlZEZhaWx1cmVzW2tleV0pIHtcbiAgICAgIHRoaXMucmVjb3JkZWRGYWlsdXJlc1trZXldID0gc2hvdWxkQ2xvbmVJZk5ldyA/IGZhaWx1cmUuY2xvbmUoKSA6IGZhaWx1cmU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJlY29yZGVkRmFpbHVyZXNba2V5XS5pc0ZsdWZmeSgpICYmICFmYWlsdXJlLmlzRmx1ZmZ5KCkpIHtcbiAgICAgIHRoaXMucmVjb3JkZWRGYWlsdXJlc1trZXldLmNsZWFyRmx1ZmZ5KCk7XG4gICAgfVxuICB9LFxuXG4gIHJlY29yZEZhaWx1cmVzOiBmdW5jdGlvbihmYWlsdXJlcywgc2hvdWxkQ2xvbmVJZk5ldykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBPYmplY3Qua2V5cyhmYWlsdXJlcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHNlbGYucmVjb3JkRmFpbHVyZShmYWlsdXJlc1trZXldLCBzaG91bGRDbG9uZUlmTmV3KTtcbiAgICB9KTtcbiAgfSxcblxuICBjbG9uZVJlY29yZGVkRmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5yZWNvcmRlZEZhaWx1cmVzKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBhbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBPYmplY3Qua2V5cyh0aGlzLnJlY29yZGVkRmFpbHVyZXMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBhbnNba2V5XSA9IHNlbGYucmVjb3JkZWRGYWlsdXJlc1trZXldLmNsb25lKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICBnZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbjtcbiAgfSxcblxuICBfZ2V0UmlnaHRtb3N0RmFpbHVyZU9mZnNldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID49IDAgP1xuICAgICAgICB0aGlzLnBvc1RvT2Zmc2V0KHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKSA6XG4gICAgICAgIC0xO1xuICB9LFxuXG4gIC8vIFJldHVybnMgdGhlIG1lbW9pemVkIHRyYWNlIGVudHJ5IGZvciBgZXhwcmAgYXQgYHBvc2AsIGlmIG9uZSBleGlzdHMsIGBudWxsYCBvdGhlcndpc2UuXG4gIGdldE1lbW9pemVkVHJhY2VFbnRyeTogZnVuY3Rpb24ocG9zLCBleHByKSB7XG4gICAgdmFyIHBvc0luZm8gPSB0aGlzLm1lbW9UYWJsZVtwb3NdO1xuICAgIGlmIChwb3NJbmZvICYmIGV4cHIucnVsZU5hbWUpIHtcbiAgICAgIHZhciBtZW1vUmVjID0gcG9zSW5mby5tZW1vW2V4cHIudG9NZW1vS2V5KCldO1xuICAgICAgaWYgKG1lbW9SZWMgJiYgbWVtb1JlYy50cmFjZUVudHJ5KSB7XG4gICAgICAgIHZhciBlbnRyeSA9IG1lbW9SZWMudHJhY2VFbnRyeS5jbG9uZVdpdGhFeHByKGV4cHIpO1xuICAgICAgICBlbnRyeS5pc01lbW9pemVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgbmV3IHRyYWNlIGVudHJ5LCB3aXRoIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRyYWNlIGFycmF5IGFzIGl0cyBjaGlsZHJlbi5cbiAgZ2V0VHJhY2VFbnRyeTogZnVuY3Rpb24ocG9zLCBleHByLCBzdWNjZWVkZWQsIGJpbmRpbmdzKSB7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuQXBwbHkpIHtcbiAgICAgIHZhciBhcHAgPSB0aGlzLmN1cnJlbnRBcHBsaWNhdGlvbigpO1xuICAgICAgdmFyIGFjdHVhbHMgPSBhcHAgPyBhcHAuYXJncyA6IFtdO1xuICAgICAgZXhwciA9IGV4cHIuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWVtb2l6ZWRUcmFjZUVudHJ5KHBvcywgZXhwcikgfHxcbiAgICAgICAgICAgbmV3IFRyYWNlKHRoaXMuaW5wdXQsIHBvcywgdGhpcy5pbnB1dFN0cmVhbS5wb3MsIGV4cHIsIHN1Y2NlZWRlZCwgYmluZGluZ3MsIHRoaXMudHJhY2UpO1xuICB9LFxuXG4gIGlzVHJhY2luZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICEhdGhpcy50cmFjZTtcbiAgfSxcblxuICBoYXNOZWNlc3NhcnlJbmZvOiBmdW5jdGlvbihtZW1vUmVjKSB7XG4gICAgaWYgKHRoaXMudHJhY2UgJiYgIW1lbW9SZWMudHJhY2VFbnRyeSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlY29yZGVkRmFpbHVyZXMgJiZcbiAgICAgICAgdGhpcy5pbnB1dFN0cmVhbS5wb3MgKyBtZW1vUmVjLnJpZ2h0bW9zdEZhaWx1cmVPZmZzZXQgPT09IHRoaXMucG9zaXRpb25Ub1JlY29yZEZhaWx1cmVzKSB7XG4gICAgICByZXR1cm4gISFtZW1vUmVjLmZhaWx1cmVzQXRSaWdodG1vc3RQb3NpdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuXG4gIHVzZU1lbW9pemVkUmVzdWx0OiBmdW5jdGlvbihvcmlnUG9zLCBtZW1vUmVjKSB7XG4gICAgaWYgKHRoaXMudHJhY2UpIHtcbiAgICAgIHRoaXMudHJhY2UucHVzaChtZW1vUmVjLnRyYWNlRW50cnkpO1xuICAgIH1cblxuICAgIHZhciBtZW1vUmVjUmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gdGhpcy5pbnB1dFN0cmVhbS5wb3MgKyBtZW1vUmVjLnJpZ2h0bW9zdEZhaWx1cmVPZmZzZXQ7XG4gICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24gPVxuICAgICAgICBNYXRoLm1heCh0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiwgbWVtb1JlY1JpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbik7XG4gICAgaWYgKHRoaXMucmVjb3JkZWRGYWlsdXJlcyAmJlxuICAgICAgICB0aGlzLnBvc2l0aW9uVG9SZWNvcmRGYWlsdXJlcyA9PT0gbWVtb1JlY1JpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiAmJlxuICAgICAgICBtZW1vUmVjLmZhaWx1cmVzQXRSaWdodG1vc3RQb3NpdGlvbikge1xuICAgICAgdGhpcy5yZWNvcmRGYWlsdXJlcyhtZW1vUmVjLmZhaWx1cmVzQXRSaWdodG1vc3RQb3NpdGlvbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5pbnB1dFN0cmVhbS5leGFtaW5lZExlbmd0aCA9XG4gICAgICAgIE1hdGgubWF4KHRoaXMuaW5wdXRTdHJlYW0uZXhhbWluZWRMZW5ndGgsIG1lbW9SZWMuZXhhbWluZWRMZW5ndGggKyBvcmlnUG9zKTtcblxuICAgIGlmIChtZW1vUmVjLnZhbHVlKSB7XG4gICAgICB0aGlzLmlucHV0U3RyZWFtLnBvcyArPSBtZW1vUmVjLm1hdGNoTGVuZ3RoO1xuICAgICAgdGhpcy5wdXNoQmluZGluZyhtZW1vUmVjLnZhbHVlLCBvcmlnUG9zKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLy8gRXZhbHVhdGUgYGV4cHJgIGFuZCByZXR1cm4gYHRydWVgIGlmIGl0IHN1Y2NlZWRlZCwgYGZhbHNlYCBvdGhlcndpc2UuIE9uIHN1Y2Nlc3MsIGBiaW5kaW5nc2BcbiAgLy8gd2lsbCBoYXZlIGBleHByLmdldEFyaXR5KClgIG1vcmUgZWxlbWVudHMgdGhhbiBiZWZvcmUsIGFuZCB0aGUgaW5wdXQgc3RyZWFtJ3MgcG9zaXRpb24gbWF5XG4gIC8vIGhhdmUgaW5jcmVhc2VkLiBPbiBmYWlsdXJlLCBgYmluZGluZ3NgIGFuZCBwb3NpdGlvbiB3aWxsIGJlIHVuY2hhbmdlZC5cbiAgZXZhbDogZnVuY3Rpb24oZXhwcikge1xuICAgIHZhciBpbnB1dFN0cmVhbSA9IHRoaXMuaW5wdXRTdHJlYW07XG4gICAgdmFyIG9yaWdOdW1CaW5kaW5ncyA9IHRoaXMuX2JpbmRpbmdzLmxlbmd0aDtcblxuICAgIHZhciBvcmlnUmVjb3JkZWRGYWlsdXJlcztcbiAgICBpZiAodGhpcy5yZWNvcmRlZEZhaWx1cmVzKSB7XG4gICAgICBvcmlnUmVjb3JkZWRGYWlsdXJlcyA9IHRoaXMucmVjb3JkZWRGYWlsdXJlcztcbiAgICAgIHRoaXMucmVjb3JkZWRGYWlsdXJlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuXG4gICAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgdmFyIG1lbW9Qb3MgPSB0aGlzLm1heWJlU2tpcFNwYWNlc0JlZm9yZShleHByKTtcblxuICAgIHZhciBvcmlnVHJhY2U7XG4gICAgaWYgKHRoaXMudHJhY2UpIHtcbiAgICAgIG9yaWdUcmFjZSA9IHRoaXMudHJhY2U7XG4gICAgICB0aGlzLnRyYWNlID0gW107XG4gICAgfVxuXG4gICAgLy8gRG8gdGhlIGFjdHVhbCBldmFsdWF0aW9uLlxuICAgIHZhciBhbnMgPSBleHByLmV2YWwodGhpcyk7XG5cbiAgICBpZiAodGhpcy50cmFjZSkge1xuICAgICAgdmFyIGJpbmRpbmdzID0gdGhpcy5fYmluZGluZ3Muc2xpY2Uob3JpZ051bUJpbmRpbmdzKTtcbiAgICAgIHZhciB0cmFjZUVudHJ5ID0gdGhpcy5nZXRUcmFjZUVudHJ5KG1lbW9Qb3MsIGV4cHIsIGFucywgYmluZGluZ3MpO1xuICAgICAgdHJhY2VFbnRyeS5pc0ltcGxpY2l0U3BhY2VzID0gZXhwciA9PT0gYXBwbHlTcGFjZXM7XG4gICAgICB0cmFjZUVudHJ5LmlzUm9vdE5vZGUgPSBleHByID09PSB0aGlzLnN0YXJ0RXhwcjtcbiAgICAgIG9yaWdUcmFjZS5wdXNoKHRyYWNlRW50cnkpO1xuICAgICAgdGhpcy50cmFjZSA9IG9yaWdUcmFjZTtcbiAgICB9XG5cbiAgICBpZiAoYW5zKSB7XG4gICAgICBpZiAodGhpcy5yZWNvcmRlZEZhaWx1cmVzICYmIGlucHV0U3RyZWFtLnBvcyA9PT0gdGhpcy5wb3NpdGlvblRvUmVjb3JkRmFpbHVyZXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnJlY29yZGVkRmFpbHVyZXMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgc2VsZi5yZWNvcmRlZEZhaWx1cmVzW2tleV0ubWFrZUZsdWZmeSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVzZXQgdGhlIHBvc2l0aW9uIGFuZCB0aGUgYmluZGluZ3MuXG4gICAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgICAgdGhpcy50cnVuY2F0ZUJpbmRpbmdzKG9yaWdOdW1CaW5kaW5ncyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVjb3JkZWRGYWlsdXJlcykge1xuICAgICAgdGhpcy5yZWNvcmRGYWlsdXJlcyhvcmlnUmVjb3JkZWRGYWlsdXJlcywgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBhbnM7XG4gIH0sXG5cbiAgZ2V0TWF0Y2hSZXN1bHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZXZhbCh0aGlzLnN0YXJ0RXhwcik7XG4gICAgdmFyIHJpZ2h0bW9zdEZhaWx1cmVzO1xuICAgIGlmICh0aGlzLnJlY29yZGVkRmFpbHVyZXMpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHJpZ2h0bW9zdEZhaWx1cmVzID0gT2JqZWN0LmtleXModGhpcy5yZWNvcmRlZEZhaWx1cmVzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJlY29yZGVkRmFpbHVyZXNba2V5XTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE1hdGNoUmVzdWx0KFxuICAgICAgICB0aGlzLm1hdGNoZXIsXG4gICAgICAgIHRoaXMuaW5wdXQsXG4gICAgICAgIHRoaXMuc3RhcnRFeHByLFxuICAgICAgICB0aGlzLl9iaW5kaW5nc1swXSxcbiAgICAgICAgdGhpcy5fYmluZGluZ09mZnNldHNbMF0sXG4gICAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uLFxuICAgICAgICByaWdodG1vc3RGYWlsdXJlcyk7XG4gIH0sXG5cbiAgZ2V0VHJhY2U6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHJhY2UgPSBbXTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSB0aGlzLmdldE1hdGNoUmVzdWx0KCk7XG5cbiAgICAvLyBUaGUgdHJhY2Ugbm9kZSBmb3IgdGhlIHN0YXJ0IHJ1bGUgaXMgYWx3YXlzIHRoZSBsYXN0IGVudHJ5LiBJZiBpdCBpcyBhIHN5bnRhY3RpYyBydWxlLFxuICAgIC8vIHRoZSBmaXJzdCBlbnRyeSBpcyBmb3IgYW4gYXBwbGljYXRpb24gb2YgJ3NwYWNlcycuXG4gICAgLy8gVE9ETyhwZHVicm95KTogQ2xlYW4gdGhpcyB1cCBieSBpbnRyb2R1Y2luZyBhIHNwZWNpYWwgYE1hdGNoPHN0YXJ0QXBwbD5gIHJ1bGUsIHdoaWNoIHdpbGxcbiAgICAvLyBlbnN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgYSBzaW5nbGUgcm9vdCB0cmFjZSBub2RlLlxuICAgIHZhciByb290VHJhY2UgPSB0aGlzLnRyYWNlW3RoaXMudHJhY2UubGVuZ3RoIC0gMV07XG4gICAgcm9vdFRyYWNlLnJlc3VsdCA9IG1hdGNoUmVzdWx0O1xuICAgIHJldHVybiByb290VHJhY2U7XG4gIH0sXG5cbiAgcHVzaEZhaWx1cmVzSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uU3RhY2sucHVzaCh0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbik7XG4gICAgdGhpcy5fcmVjb3JkZWRGYWlsdXJlc1N0YWNrLnB1c2godGhpcy5yZWNvcmRlZEZhaWx1cmVzKTtcbiAgfSxcblxuICBwb3BGYWlsdXJlc0luZm86IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gdGhpcy5fcmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uU3RhY2sucG9wKCk7XG4gICAgdGhpcy5yZWNvcmRlZEZhaWx1cmVzID0gdGhpcy5fcmVjb3JkZWRGYWlsdXJlc1N0YWNrLnBvcCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXRjaFN0YXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIE1hdGNoU3RhdGUgPSByZXF1aXJlKCcuL01hdGNoU3RhdGUnKTtcblxudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBNYXRjaGVyKGdyYW1tYXIpIHtcbiAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgdGhpcy5tZW1vVGFibGUgPSBbXTtcbiAgdGhpcy5pbnB1dCA9ICcnO1xufVxuXG5NYXRjaGVyLnByb3RvdHlwZS5nZXRJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pbnB1dDtcbn07XG5cbk1hdGNoZXIucHJvdG90eXBlLnNldElucHV0ID0gZnVuY3Rpb24oc3RyKSB7XG4gIGlmICh0aGlzLmlucHV0ICE9PSBzdHIpIHtcbiAgICB0aGlzLnJlcGxhY2VJbnB1dFJhbmdlKDAsIHRoaXMuaW5wdXQubGVuZ3RoLCBzdHIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuTWF0Y2hlci5wcm90b3R5cGUucmVwbGFjZUlucHV0UmFuZ2UgPSBmdW5jdGlvbihzdGFydElkeCwgZW5kSWR4LCBzdHIpIHtcbiAgdmFyIGN1cnJlbnRJbnB1dCA9IHRoaXMuaW5wdXQ7XG4gIGlmIChzdGFydElkeCA8IDAgfHwgc3RhcnRJZHggPiBjdXJyZW50SW5wdXQubGVuZ3RoIHx8XG4gICAgICBlbmRJZHggPCAwIHx8IGVuZElkeCA+IGN1cnJlbnRJbnB1dC5sZW5ndGggfHxcbiAgICAgIHN0YXJ0SWR4ID4gZW5kSWR4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGluZGljZXM6ICcgKyBzdGFydElkeCArICcgYW5kICcgKyBlbmRJZHgpO1xuICB9XG5cbiAgLy8gdXBkYXRlIGlucHV0XG4gIHRoaXMuaW5wdXQgPSBjdXJyZW50SW5wdXQuc2xpY2UoMCwgc3RhcnRJZHgpICsgc3RyICsgY3VycmVudElucHV0LnNsaWNlKGVuZElkeCk7XG5cbiAgLy8gdXBkYXRlIG1lbW8gdGFibGUgKHNpbWlsYXIgdG8gdGhlIGFib3ZlKVxuICB2YXIgcmVzdE9mTWVtb1RhYmxlID0gdGhpcy5tZW1vVGFibGUuc2xpY2UoZW5kSWR4KTtcbiAgdGhpcy5tZW1vVGFibGUubGVuZ3RoID0gc3RhcnRJZHg7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHN0ci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5tZW1vVGFibGUucHVzaCh1bmRlZmluZWQpO1xuICB9XG4gIHJlc3RPZk1lbW9UYWJsZS5mb3JFYWNoKFxuICAgICAgZnVuY3Rpb24ocG9zSW5mbykgeyB0aGlzLm1lbW9UYWJsZS5wdXNoKHBvc0luZm8pOyB9LFxuICAgICAgdGhpcyk7XG5cbiAgLy8gSW52YWxpZGF0ZSBtZW1vUmVjc1xuICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCBzdGFydElkeDsgcG9zKyspIHtcbiAgICB2YXIgcG9zSW5mbyA9IHRoaXMubWVtb1RhYmxlW3Bvc107XG4gICAgaWYgKHBvc0luZm8pIHtcbiAgICAgIHBvc0luZm8uY2xlYXJPYnNvbGV0ZUVudHJpZXMocG9zLCBzdGFydElkeCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5NYXRjaGVyLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKG9wdFN0YXJ0QXBwbGljYXRpb25TdHIpIHtcbiAgcmV0dXJuIHRoaXMuX21hdGNoKHRoaXMuX2dldFN0YXJ0RXhwcihvcHRTdGFydEFwcGxpY2F0aW9uU3RyKSwgZmFsc2UpO1xufTtcblxuTWF0Y2hlci5wcm90b3R5cGUudHJhY2UgPSBmdW5jdGlvbihvcHRTdGFydEFwcGxpY2F0aW9uU3RyKSB7XG4gIHJldHVybiB0aGlzLl9tYXRjaCh0aGlzLl9nZXRTdGFydEV4cHIob3B0U3RhcnRBcHBsaWNhdGlvblN0ciksIHRydWUpO1xufTtcblxuTWF0Y2hlci5wcm90b3R5cGUuX21hdGNoID0gZnVuY3Rpb24oc3RhcnRFeHByLCB0cmFjaW5nLCBvcHRQb3NpdGlvblRvUmVjb3JkRmFpbHVyZXMpIHtcbiAgdmFyIHN0YXRlID0gbmV3IE1hdGNoU3RhdGUodGhpcywgc3RhcnRFeHByLCBvcHRQb3NpdGlvblRvUmVjb3JkRmFpbHVyZXMpO1xuICByZXR1cm4gdHJhY2luZyA/IHN0YXRlLmdldFRyYWNlKCkgOiBzdGF0ZS5nZXRNYXRjaFJlc3VsdCgpO1xufTtcblxuLypcbiAgUmV0dXJucyB0aGUgc3RhcnRpbmcgZXhwcmVzc2lvbiBmb3IgdGhpcyBNYXRjaGVyJ3MgYXNzb2NpYXRlZCBncmFtbWFyLiBJZiBgb3B0U3RhcnRBcHBsaWNhdGlvblN0cmBcbiAgaXMgc3BlY2lmaWVkLCBpdCBpcyBhIHN0cmluZyBleHByZXNzaW5nIGEgcnVsZSBhcHBsaWNhdGlvbiBpbiB0aGUgZ3JhbW1hci4gSWYgbm90IHNwZWNpZmllZCwgdGhlXG4gIGdyYW1tYXIncyBkZWZhdWx0IHN0YXJ0IHJ1bGUgd2lsbCBiZSB1c2VkLlxuKi9cbk1hdGNoZXIucHJvdG90eXBlLl9nZXRTdGFydEV4cHIgPSBmdW5jdGlvbihvcHRTdGFydEFwcGxpY2F0aW9uU3RyKSB7XG4gIHZhciBhcHBsaWNhdGlvblN0ciA9IG9wdFN0YXJ0QXBwbGljYXRpb25TdHIgfHwgdGhpcy5ncmFtbWFyLmRlZmF1bHRTdGFydFJ1bGU7XG4gIGlmICghYXBwbGljYXRpb25TdHIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc3RhcnQgcnVsZSBhcmd1bWVudCAtLSB0aGUgZ3JhbW1hciBoYXMgbm8gZGVmYXVsdCBzdGFydCBydWxlLicpO1xuICB9XG5cbiAgdmFyIHN0YXJ0QXBwID0gdGhpcy5ncmFtbWFyLnBhcnNlQXBwbGljYXRpb24oYXBwbGljYXRpb25TdHIpO1xuICByZXR1cm4gbmV3IHBleHBycy5TZXEoW3N0YXJ0QXBwLCBwZXhwcnMuZW5kXSk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXRjaGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3V0aWwtZXh0ZW5kJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBOYW1lc3BhY2UoKSB7XG59XG5OYW1lc3BhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuTmFtZXNwYWNlLmFzTmFtZXNwYWNlID0gZnVuY3Rpb24ob2JqT3JOYW1lc3BhY2UpIHtcbiAgaWYgKG9iak9yTmFtZXNwYWNlIGluc3RhbmNlb2YgTmFtZXNwYWNlKSB7XG4gICAgcmV0dXJuIG9iak9yTmFtZXNwYWNlO1xuICB9XG4gIHJldHVybiBOYW1lc3BhY2UuY3JlYXRlTmFtZXNwYWNlKG9iak9yTmFtZXNwYWNlKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2UuIElmIGBvcHRQcm9wc2AgaXMgc3BlY2lmaWVkLCBhbGwgb2YgaXRzIHByb3BlcnRpZXNcbi8vIHdpbGwgYmUgY29waWVkIHRvIHRoZSBuZXcgbmFtZXNwYWNlLlxuTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSA9IGZ1bmN0aW9uKG9wdFByb3BzKSB7XG4gIHJldHVybiBOYW1lc3BhY2UuZXh0ZW5kKE5hbWVzcGFjZS5wcm90b3R5cGUsIG9wdFByb3BzKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2Ugd2hpY2ggZXh0ZW5kcyBhbm90aGVyIG5hbWVzcGFjZS4gSWYgYG9wdFByb3BzYCBpc1xuLy8gc3BlY2lmaWVkLCBhbGwgb2YgaXRzIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIG5ldyBuYW1lc3BhY2UuXG5OYW1lc3BhY2UuZXh0ZW5kID0gZnVuY3Rpb24obmFtZXNwYWNlLCBvcHRQcm9wcykge1xuICBpZiAobmFtZXNwYWNlICE9PSBOYW1lc3BhY2UucHJvdG90eXBlICYmICEobmFtZXNwYWNlIGluc3RhbmNlb2YgTmFtZXNwYWNlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIE5hbWVzcGFjZSBvYmplY3Q6ICcgKyBuYW1lc3BhY2UpO1xuICB9XG4gIHZhciBucyA9IE9iamVjdC5jcmVhdGUobmFtZXNwYWNlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBOYW1lc3BhY2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGV4dGVuZChucywgb3B0UHJvcHMpO1xufTtcblxuLy8gVE9ETzogU2hvdWxkIHRoaXMgYmUgYSByZWd1bGFyIG1ldGhvZD9cbk5hbWVzcGFjZS50b1N0cmluZyA9IGZ1bmN0aW9uKG5zKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnMpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZXNwYWNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gUG9zSW5mbygpIHtcbiAgdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjayA9IFtdOyAgLy8gYWN0aXZlIGFwcGxpY2F0aW9ucyBhdCB0aGlzIHBvc2l0aW9uXG4gIHRoaXMubWVtbyA9IHt9O1xuICB0aGlzLm1heEV4YW1pbmVkTGVuZ3RoID0gMDtcbiAgdGhpcy5tYXhSaWdodG1vc3RGYWlsdXJlT2Zmc2V0ID0gLTE7XG4gIHRoaXMuY3VycmVudExlZnRSZWN1cnNpb24gPSB1bmRlZmluZWQ7XG59XG5cblBvc0luZm8ucHJvdG90eXBlID0ge1xuICBpc0FjdGl2ZTogZnVuY3Rpb24oYXBwbGljYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5pbmRleE9mKGFwcGxpY2F0aW9uLnRvTWVtb0tleSgpKSA+PSAwO1xuICB9LFxuXG4gIGVudGVyOiBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgIHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2sucHVzaChhcHBsaWNhdGlvbi50b01lbW9LZXkoKSk7XG4gIH0sXG5cbiAgZXhpdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5wb3AoKTtcbiAgfSxcblxuICBzdGFydExlZnRSZWN1cnNpb246IGZ1bmN0aW9uKGhlYWRBcHBsaWNhdGlvbiwgbWVtb1JlYykge1xuICAgIG1lbW9SZWMuaXNMZWZ0UmVjdXJzaW9uID0gdHJ1ZTtcbiAgICBtZW1vUmVjLmhlYWRBcHBsaWNhdGlvbiA9IGhlYWRBcHBsaWNhdGlvbjtcbiAgICBtZW1vUmVjLm5leHRMZWZ0UmVjdXJzaW9uID0gdGhpcy5jdXJyZW50TGVmdFJlY3Vyc2lvbjtcbiAgICB0aGlzLmN1cnJlbnRMZWZ0UmVjdXJzaW9uID0gbWVtb1JlYztcblxuICAgIHZhciBhcHBsaWNhdGlvbk1lbW9LZXlTdGFjayA9IHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2s7XG4gICAgdmFyIGluZGV4T2ZGaXJzdEludm9sdmVkUnVsZSA9IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLmluZGV4T2YoaGVhZEFwcGxpY2F0aW9uLnRvTWVtb0tleSgpKSArIDE7XG4gICAgdmFyIGludm9sdmVkQXBwbGljYXRpb25NZW1vS2V5cyA9IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLnNsaWNlKGluZGV4T2ZGaXJzdEludm9sdmVkUnVsZSk7XG5cbiAgICBtZW1vUmVjLmlzSW52b2x2ZWQgPSBmdW5jdGlvbihhcHBsaWNhdGlvbk1lbW9LZXkpIHtcbiAgICAgIHJldHVybiBpbnZvbHZlZEFwcGxpY2F0aW9uTWVtb0tleXMuaW5kZXhPZihhcHBsaWNhdGlvbk1lbW9LZXkpID49IDA7XG4gICAgfTtcblxuICAgIG1lbW9SZWMudXBkYXRlSW52b2x2ZWRBcHBsaWNhdGlvbk1lbW9LZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpZHggPSBpbmRleE9mRmlyc3RJbnZvbHZlZFJ1bGU7IGlkeCA8IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uTWVtb0tleSA9IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrW2lkeF07XG4gICAgICAgIGlmICghdGhpcy5pc0ludm9sdmVkKGFwcGxpY2F0aW9uTWVtb0tleSkpIHtcbiAgICAgICAgICBpbnZvbHZlZEFwcGxpY2F0aW9uTWVtb0tleXMucHVzaChhcHBsaWNhdGlvbk1lbW9LZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBlbmRMZWZ0UmVjdXJzaW9uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmN1cnJlbnRMZWZ0UmVjdXJzaW9uID0gdGhpcy5jdXJyZW50TGVmdFJlY3Vyc2lvbi5uZXh0TGVmdFJlY3Vyc2lvbjtcbiAgfSxcblxuICAvLyBOb3RlOiB0aGlzIG1ldGhvZCBkb2Vzbid0IGdldCBjYWxsZWQgZm9yIHRoZSBcImhlYWRcIiBvZiBhIGxlZnQgcmVjdXJzaW9uIC0tIGZvciBMUiBoZWFkcyxcbiAgLy8gdGhlIG1lbW9pemVkIHJlc3VsdCAod2hpY2ggc3RhcnRzIG91dCBiZWluZyBhIGZhaWx1cmUpIGlzIGFsd2F5cyB1c2VkLlxuICBzaG91bGRVc2VNZW1vaXplZFJlc3VsdDogZnVuY3Rpb24obWVtb1JlYykge1xuICAgIGlmICghbWVtb1JlYy5pc0xlZnRSZWN1cnNpb24pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgYXBwbGljYXRpb25NZW1vS2V5U3RhY2sgPSB0aGlzLmFwcGxpY2F0aW9uTWVtb0tleVN0YWNrO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBhcHBsaWNhdGlvbk1lbW9LZXkgPSBhcHBsaWNhdGlvbk1lbW9LZXlTdGFja1tpZHhdO1xuICAgICAgaWYgKG1lbW9SZWMuaXNJbnZvbHZlZChhcHBsaWNhdGlvbk1lbW9LZXkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgbWVtb2l6ZTogZnVuY3Rpb24obWVtb0tleSwgbWVtb1JlYykge1xuICAgIHRoaXMubWVtb1ttZW1vS2V5XSA9IG1lbW9SZWM7XG4gICAgdGhpcy5tYXhFeGFtaW5lZExlbmd0aCA9IE1hdGgubWF4KHRoaXMubWF4RXhhbWluZWRMZW5ndGgsIG1lbW9SZWMuZXhhbWluZWRMZW5ndGgpO1xuICAgIHRoaXMubWF4UmlnaHRtb3N0RmFpbHVyZU9mZnNldCA9XG4gICAgICAgIE1hdGgubWF4KHRoaXMubWF4UmlnaHRtb3N0RmFpbHVyZU9mZnNldCwgbWVtb1JlYy5yaWdodG1vc3RGYWlsdXJlT2Zmc2V0KTtcbiAgICByZXR1cm4gbWVtb1JlYztcbiAgfSxcblxuICBjbGVhck9ic29sZXRlRW50cmllczogZnVuY3Rpb24ocG9zLCBpbnZhbGlkYXRlZElkeCkge1xuICAgIGlmIChwb3MgKyB0aGlzLm1heEV4YW1pbmVkTGVuZ3RoIDw9IGludmFsaWRhdGVkSWR4KSB7XG4gICAgICAvLyBPcHRpbWl6YXRpb246IG5vbmUgb2YgdGhlIHJ1bGUgYXBwbGljYXRpb25zIHRoYXQgd2VyZSBtZW1vaXplZCBoZXJlIGV4YW1pbmVkIHRoZVxuICAgICAgLy8gaW50ZXJ2YWwgb2YgdGhlIGlucHV0IHRoYXQgY2hhbmdlZCwgc28gbm90aGluZyBoYXMgdG8gYmUgaW52YWxpZGF0ZWQuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG1lbW8gPSB0aGlzLm1lbW87XG4gICAgdGhpcy5tYXhFeGFtaW5lZExlbmd0aCA9IDA7XG4gICAgdGhpcy5tYXhSaWdodG1vc3RGYWlsdXJlT2Zmc2V0ID0gLTE7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5rZXlzKG1lbW8pLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgdmFyIG1lbW9SZWMgPSBtZW1vW2tdO1xuICAgICAgaWYgKHBvcyArIG1lbW9SZWMuZXhhbWluZWRMZW5ndGggPiBpbnZhbGlkYXRlZElkeCkge1xuICAgICAgICBkZWxldGUgbWVtb1trXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubWF4RXhhbWluZWRMZW5ndGggPSBNYXRoLm1heChzZWxmLm1heEV4YW1pbmVkTGVuZ3RoLCBtZW1vUmVjLmV4YW1pbmVkTGVuZ3RoKTtcbiAgICAgICAgc2VsZi5tYXhSaWdodG1vc3RGYWlsdXJlT2Zmc2V0ID1cbiAgICAgICAgICAgIE1hdGgubWF4KHNlbGYubWF4UmlnaHRtb3N0RmFpbHVyZU9mZnNldCwgbWVtb1JlYy5yaWdodG1vc3RGYWlsdXJlT2Zmc2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gUG9zSW5mbztcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBTeW1ib2wgPSByZXF1aXJlKCdlczYtc3ltYm9sJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG52YXIgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCcuL0lucHV0U3RyZWFtJyk7XG52YXIgSXRlcmF0aW9uTm9kZSA9IHJlcXVpcmUoJy4vbm9kZXMnKS5JdGVyYXRpb25Ob2RlO1xudmFyIE1hdGNoUmVzdWx0ID0gcmVxdWlyZSgnLi9NYXRjaFJlc3VsdCcpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgZ2xvYmFsQWN0aW9uU3RhY2sgPSBbXTtcbnZhciBwcm90b3R5cGVHcmFtbWFyO1xudmFyIHByb3RvdHlwZUdyYW1tYXJTZW1hbnRpY3M7XG5cbi8vIEpTT04gaXMgbm90IGEgdmFsaWQgc3Vic2V0IG9mIEphdmFTY3JpcHQgYmVjYXVzZSB0aGVyZSBhcmUgdHdvIHBvc3NpYmxlIGxpbmUgdGVybWluYXRvcnMsXG4vLyBVKzIwMjggKGxpbmUgc2VwYXJhdG9yKSBhbmQgVSsyMDI5IChwYXJhZ3JhcGggc2VwYXJhdG9yKSB0aGF0IGFyZSBhbGxvd2VkIGluIEpTT04gc3RyaW5nc1xuLy8gYnV0IG5vdCBpbiBKYXZhU2NyaXB0IHN0cmluZ3MuXG4vLyBqc29uVG9KUygpIHByb3Blcmx5IGVuY29kZXMgdGhvc2UgdHdvIGNoYXJhY3RlcnMgaW4gSlNPTiBzbyB0aGF0IGl0IGNhbiBzZWFtbGVzc2x5IGJlXG4vLyBpbnNlcnRlZCBpbnRvIEphdmFTY3JpcHQgY29kZSAocGx1cyB0aGUgZW5jb2RlZCB2ZXJzaW9uIGlzIHN0aWxsIHZhbGlkIEpTT04pXG5mdW5jdGlvbiBqc29uVG9KUyhzdHIpIHtcbiAgdmFyIG91dHB1dCA9IHN0ci5yZXBsYWNlKC9bXFx1MjAyOFxcdTIwMjldL2csIGZ1bmN0aW9uKGNoYXIsIHBvcywgc3RyKSB7XG4gICAgdmFyIGhleCA9IGNoYXIuY29kZVBvaW50QXQoMCkudG9TdHJpbmcoMTYpO1xuICAgIHJldHVybiAnXFxcXHUnICsgJzAwMDAnLnNsaWNlKGhleC5sZW5ndGgpICsgaGV4O1xuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gV3JhcHBlcnMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gV3JhcHBlcnMgZGVjb3JhdGUgQ1NUIG5vZGVzIHdpdGggYWxsIG9mIHRoZSBmdW5jdGlvbmFsaXR5IChpLmUuLCBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzKVxuLy8gcHJvdmlkZWQgYnkgYSBTZW1hbnRpY3MgKHNlZSBiZWxvdykuIGBXcmFwcGVyYCBpcyB0aGUgYWJzdHJhY3Qgc3VwZXJjbGFzcyBvZiBhbGwgd3JhcHBlcnMuIEFcbi8vIGBXcmFwcGVyYCBtdXN0IGhhdmUgYF9ub2RlYCBhbmQgYF9zZW1hbnRpY3NgIGluc3RhbmNlIHZhcmlhYmxlcywgd2hpY2ggcmVmZXIgdG8gdGhlIENTVCBub2RlIGFuZFxuLy8gU2VtYW50aWNzIChyZXNwLikgZm9yIHdoaWNoIGl0IHdhcyBjcmVhdGVkLCBhbmQgYSBgX2NoaWxkV3JhcHBlcnNgIGluc3RhbmNlIHZhcmlhYmxlIHdoaWNoIGlzXG4vLyB1c2VkIHRvIGNhY2hlIHRoZSB3cmFwcGVyIGluc3RhbmNlcyB0aGF0IGFyZSBjcmVhdGVkIGZvciBpdHMgY2hpbGQgbm9kZXMuIFNldHRpbmcgdGhlc2UgaW5zdGFuY2Vcbi8vIHZhcmlhYmxlcyBpcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgdGhlIGNvbnN0cnVjdG9yIG9mIGVhY2ggU2VtYW50aWNzLXNwZWNpZmljIHN1YmNsYXNzIG9mXG4vLyBgV3JhcHBlcmAuXG5mdW5jdGlvbiBXcmFwcGVyKCkge31cblxuV3JhcHBlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdbc2VtYW50aWNzIHdyYXBwZXIgZm9yICcgKyB0aGlzLl9ub2RlLmdyYW1tYXIubmFtZSArICddJztcbn07XG5cbi8vIFRoaXMgaXMgdXNlZCBieSBvaG0gZWRpdG9yIHRvIGRpc3BsYXkgYSBub2RlIHdyYXBwZXIgYXBwcm9wcmlhdGVseS5cbldyYXBwZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufTtcblxuV3JhcHBlci5wcm90b3R5cGUuX2ZvcmdldE1lbW9pemVkUmVzdWx0Rm9yID0gZnVuY3Rpb24oYXR0cmlidXRlTmFtZSkge1xuICAvLyBSZW1vdmUgdGhlIG1lbW9pemVkIGF0dHJpYnV0ZSBmcm9tIHRoZSBjc3ROb2RlIGFuZCBhbGwgaXRzIGNoaWxkcmVuLlxuICBkZWxldGUgdGhpcy5fbm9kZVt0aGlzLl9zZW1hbnRpY3MuYXR0cmlidXRlS2V5c1thdHRyaWJ1dGVOYW1lXV07XG4gIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgIGNoaWxkLl9mb3JnZXRNZW1vaXplZFJlc3VsdEZvcihhdHRyaWJ1dGVOYW1lKTtcbiAgfSk7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSB3cmFwcGVyIG9mIHRoZSBzcGVjaWZpZWQgY2hpbGQgbm9kZS4gQ2hpbGQgd3JhcHBlcnMgYXJlIGNyZWF0ZWQgbGF6aWx5IGFuZCBjYWNoZWQgaW5cbi8vIHRoZSBwYXJlbnQgd3JhcHBlcidzIGBfY2hpbGRXcmFwcGVyc2AgaW5zdGFuY2UgdmFyaWFibGUuXG5XcmFwcGVyLnByb3RvdHlwZS5jaGlsZCA9IGZ1bmN0aW9uKGlkeCkge1xuICBpZiAoISgwIDw9IGlkeCAmJiBpZHggPCB0aGlzLl9ub2RlLm51bUNoaWxkcmVuKCkpKSB7XG4gICAgLy8gVE9ETzogQ29uc2lkZXIgdGhyb3dpbmcgYW4gZXhjZXB0aW9uIGhlcmUuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICB2YXIgY2hpbGRXcmFwcGVyID0gdGhpcy5fY2hpbGRXcmFwcGVyc1tpZHhdO1xuICBpZiAoIWNoaWxkV3JhcHBlcikge1xuICAgIHZhciBjaGlsZE5vZGUgPSB0aGlzLl9ub2RlLmNoaWxkQXQoaWR4KTtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fbm9kZS5jaGlsZE9mZnNldHNbaWR4XTtcblxuICAgIHZhciBzb3VyY2UgPSB0aGlzLl9iYXNlSW50ZXJ2YWwuc3ViSW50ZXJ2YWwob2Zmc2V0LCBjaGlsZE5vZGUubWF0Y2hMZW5ndGgpO1xuICAgIHZhciBiYXNlID0gY2hpbGROb2RlLmlzTm9udGVybWluYWwoKSA/IHNvdXJjZSA6IHRoaXMuX2Jhc2VJbnRlcnZhbDtcbiAgICBjaGlsZFdyYXBwZXIgPSB0aGlzLl9jaGlsZFdyYXBwZXJzW2lkeF0gPSB0aGlzLl9zZW1hbnRpY3Mud3JhcChjaGlsZE5vZGUsIHNvdXJjZSwgYmFzZSk7XG4gIH1cbiAgcmV0dXJuIGNoaWxkV3JhcHBlcjtcbn07XG5cbi8vIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgd3JhcHBlcnMgb2YgYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpc1xuLy8gd3JhcHBlci5cbldyYXBwZXIucHJvdG90eXBlLl9jaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBGb3JjZSB0aGUgY3JlYXRpb24gb2YgYWxsIGNoaWxkIHdyYXBwZXJzXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuX25vZGUubnVtQ2hpbGRyZW4oKTsgaWR4KyspIHtcbiAgICB0aGlzLmNoaWxkKGlkeCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2NoaWxkV3JhcHBlcnM7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBjb3JyZXNwb25kcyB0byBhbiBpdGVyYXRpb25cbi8vIGV4cHJlc3Npb24sIGkuZS4sIGEgS2xlZW5lLSosIEtsZWVuZS0rLCBvciBhbiBvcHRpb25hbC4gUmV0dXJucyBgZmFsc2VgIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzSXRlcmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzSXRlcmF0aW9uKCk7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBpcyBhIHRlcm1pbmFsIG5vZGUsIGBmYWxzZWBcbi8vIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzVGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25vZGUuaXNUZXJtaW5hbCgpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYSBub250ZXJtaW5hbCBub2RlLCBgZmFsc2VgXG4vLyBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc05vbnRlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzTm9udGVybWluYWwoKTtcbn07XG5cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyIGlzIGEgbm9udGVybWluYWwgbm9kZVxuLy8gY29ycmVzcG9uZGluZyB0byBhIHN5bnRhY3RpYyBydWxlLCBgZmFsc2VgIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzU3ludGFjdGljID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmlzTm9udGVybWluYWwoKSAmJiB0aGlzLl9ub2RlLmlzU3ludGFjdGljKCk7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBpcyBhIG5vbnRlcm1pbmFsIG5vZGVcbi8vIGNvcnJlc3BvbmRpbmcgdG8gYSBsZXhpY2FsIHJ1bGUsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuV3JhcHBlci5wcm90b3R5cGUuaXNMZXhpY2FsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmlzTm9udGVybWluYWwoKSAmJiB0aGlzLl9ub2RlLmlzTGV4aWNhbCgpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYW4gaXRlcmF0b3Igbm9kZVxuLy8gaGF2aW5nIGVpdGhlciBvbmUgb3Igbm8gY2hpbGQgKD8gb3BlcmF0b3IpLCBgZmFsc2VgIG90aGVyd2lzZS5cbi8vIE90aGVyd2lzZSwgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbldyYXBwZXIucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25vZGUuaXNPcHRpb25hbCgpO1xufTtcblxuLy8gQ3JlYXRlIGEgbmV3IF9pdGVyIHdyYXBwZXIgaW4gdGhlIHNhbWUgc2VtYW50aWNzIGFzIHRoaXMgd3JhcHBlci5cbldyYXBwZXIucHJvdG90eXBlLml0ZXJhdGlvbiA9IGZ1bmN0aW9uKG9wdENoaWxkV3JhcHBlcnMpIHtcbiAgdmFyIGNoaWxkV3JhcHBlcnMgPSBvcHRDaGlsZFdyYXBwZXJzIHx8IFtdO1xuXG4gIHZhciBjaGlsZE5vZGVzID0gY2hpbGRXcmFwcGVycy5tYXAoZnVuY3Rpb24oYykgeyByZXR1cm4gYy5fbm9kZTsgfSk7XG4gIHZhciBpdGVyID0gbmV3IEl0ZXJhdGlvbk5vZGUodGhpcy5fbm9kZS5ncmFtbWFyLCBjaGlsZE5vZGVzLCBbXSwgLTEsIGZhbHNlKTtcblxuICB2YXIgd3JhcHBlciA9IHRoaXMuX3NlbWFudGljcy53cmFwKGl0ZXIsIG51bGwsIG51bGwpO1xuICB3cmFwcGVyLl9jaGlsZFdyYXBwZXJzID0gY2hpbGRXcmFwcGVycztcbiAgcmV0dXJuIHdyYXBwZXI7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhXcmFwcGVyLnByb3RvdHlwZSwge1xuICAvLyBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGNoaWxkcmVuIG9mIHRoaXMgQ1NUIG5vZGUuXG4gIGNoaWxkcmVuOiB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuKCk7IH19LFxuXG4gIC8vIFJldHVybnMgdGhlIG5hbWUgb2YgZ3JhbW1hciBydWxlIHRoYXQgY3JlYXRlZCB0aGlzIENTVCBub2RlLlxuICBjdG9yTmFtZToge2dldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9ub2RlLmN0b3JOYW1lOyB9fSxcblxuICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBldmVudHVhbGx5IChkZXByZWNhdGVkIGluIHYwLjEyKS5cbiAgaW50ZXJ2YWw6IHtnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGBpbnRlcnZhbGAgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCAtLSB1c2UgYHNvdXJjZWAgaW5zdGVhZCcpO1xuICB9fSxcblxuICAvLyBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gb2YgdGhpcyBDU1Qgbm9kZS5cbiAgbnVtQ2hpbGRyZW46IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbm9kZS5udW1DaGlsZHJlbigpOyB9fSxcblxuICAvLyBSZXR1cm5zIHRoZSBwcmltaXRpdmUgdmFsdWUgb2YgdGhpcyBDU1Qgbm9kZSwgaWYgaXQncyBhIHRlcm1pbmFsIG5vZGUuIE90aGVyd2lzZSxcbiAgLy8gdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgcHJpbWl0aXZlVmFsdWU6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNUZXJtaW5hbCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlLnByaW1pdGl2ZVZhbHVlO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcInRyaWVkIHRvIGFjY2VzcyB0aGUgJ3ByaW1pdGl2ZVZhbHVlJyBhdHRyaWJ1dGUgb2YgYSBub24tdGVybWluYWwgQ1NUIG5vZGVcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIFJldHVybnMgdGhlIGNvbnRlbnRzIG9mIHRoZSBpbnB1dCBzdHJlYW0gY29uc3VtZWQgYnkgdGhpcyBDU1Qgbm9kZS5cbiAgc291cmNlU3RyaW5nOiB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuc291cmNlLmNvbnRlbnRzOyB9fVxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFNlbWFudGljcyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBBIFNlbWFudGljcyBpcyBhIGNvbnRhaW5lciBmb3IgYSBmYW1pbHkgb2YgT3BlcmF0aW9ucyBhbmQgQXR0cmlidXRlcyBmb3IgYSBnaXZlbiBncmFtbWFyLlxuLy8gU2VtYW50aWNzIGVuYWJsZSBtb2R1bGFyaXR5IChkaWZmZXJlbnQgY2xpZW50cyBvZiBhIGdyYW1tYXIgY2FuIGNyZWF0ZSB0aGVpciBzZXQgb2Ygb3BlcmF0aW9uc1xuLy8gYW5kIGF0dHJpYnV0ZXMgaW4gaXNvbGF0aW9uKSBhbmQgZXh0ZW5zaWJpbGl0eSBldmVuIHdoZW4gb3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcyBhcmUgbXV0dWFsbHktXG4vLyByZWN1cnNpdmUuIFRoaXMgY29uc3RydWN0b3Igc2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkgZXhjZXB0IGZyb21cbi8vIGBTZW1hbnRpY3MuY3JlYXRlU2VtYW50aWNzYC4gVGhlIG5vcm1hbCB3YXlzIHRvIGNyZWF0ZSBhIFNlbWFudGljcywgZ2l2ZW4gYSBncmFtbWFyICdnJywgYXJlXG4vLyBgZy5jcmVhdGVTZW1hbnRpY3MoKWAgYW5kIGBnLmV4dGVuZFNlbWFudGljcyhwYXJlbnRTZW1hbnRpY3MpYC5cbmZ1bmN0aW9uIFNlbWFudGljcyhncmFtbWFyLCBzdXBlclNlbWFudGljcykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gIHRoaXMuY2hlY2tlZEFjdGlvbkRpY3RzID0gZmFsc2U7XG5cbiAgLy8gQ29uc3RydWN0b3IgZm9yIHdyYXBwZXIgaW5zdGFuY2VzLCB3aGljaCBhcmUgcGFzc2VkIGFzIHRoZSBhcmd1bWVudHMgdG8gdGhlIHNlbWFudGljIGFjdGlvbnNcbiAgLy8gb2YgYW4gb3BlcmF0aW9uIG9yIGF0dHJpYnV0ZS4gT3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcyByZXF1aXJlIGRvdWJsZSBkaXNwYXRjaDogdGhlIHNlbWFudGljXG4gIC8vIGFjdGlvbiBpcyBjaG9zZW4gYmFzZWQgb24gYm90aCB0aGUgbm9kZSdzIHR5cGUgYW5kIHRoZSBzZW1hbnRpY3MuIFdyYXBwZXJzIGVuc3VyZSB0aGF0XG4gIC8vIHRoZSBgZXhlY3V0ZWAgbWV0aG9kIGlzIGNhbGxlZCB3aXRoIHRoZSBjb3JyZWN0IChtb3N0IHNwZWNpZmljKSBzZW1hbnRpY3Mgb2JqZWN0IGFzIGFuXG4gIC8vIGFyZ3VtZW50LlxuICB0aGlzLldyYXBwZXIgPSBmdW5jdGlvbihub2RlLCBzb3VyY2VJbnRlcnZhbCwgYmFzZUludGVydmFsKSB7XG4gICAgc2VsZi5jaGVja0FjdGlvbkRpY3RzSWZIYXZlbnRBbHJlYWR5KCk7XG4gICAgdGhpcy5fc2VtYW50aWNzID0gc2VsZjtcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZUludGVydmFsO1xuXG4gICAgLy8gVGhlIGludGVydmFsIHRoYXQgdGhlIGNoaWxkT2Zmc2V0cyBvZiBgbm9kZWAgYXJlIHJlbGF0aXZlIHRvLiBJdCBzaG91bGQgYmUgdGhlIHNvdXJjZVxuICAgIC8vIG9mIHRoZSBjbG9zZXN0IE5vbnRlcm1pbmFsIG5vZGUuXG4gICAgdGhpcy5fYmFzZUludGVydmFsID0gYmFzZUludGVydmFsO1xuXG4gICAgaWYgKG5vZGUuaXNOb250ZXJtaW5hbCgpKSB7XG4gICAgICBjb21tb24uYXNzZXJ0KHNvdXJjZUludGVydmFsID09PSBiYXNlSW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHRoaXMuX2NoaWxkV3JhcHBlcnMgPSBbXTtcbiAgfTtcblxuICB0aGlzLnN1cGVyID0gc3VwZXJTZW1hbnRpY3M7XG4gIGlmIChzdXBlclNlbWFudGljcykge1xuICAgIGlmICghKGdyYW1tYXIuZXF1YWxzKHRoaXMuc3VwZXIuZ3JhbW1hcikgfHwgZ3JhbW1hci5faW5oZXJpdHNGcm9tKHRoaXMuc3VwZXIuZ3JhbW1hcikpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJDYW5ub3QgZXh0ZW5kIGEgc2VtYW50aWNzIGZvciBncmFtbWFyICdcIiArIHRoaXMuc3VwZXIuZ3JhbW1hci5uYW1lICtcbiAgICAgICAgICBcIicgZm9yIHVzZSB3aXRoIGdyYW1tYXIgJ1wiICsgZ3JhbW1hci5uYW1lICsgXCInIChub3QgYSBzdWItZ3JhbW1hcilcIik7XG4gICAgfVxuICAgIGluaGVyaXRzKHRoaXMuV3JhcHBlciwgdGhpcy5zdXBlci5XcmFwcGVyKTtcbiAgICB0aGlzLm9wZXJhdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuc3VwZXIub3BlcmF0aW9ucyk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnN1cGVyLmF0dHJpYnV0ZXMpO1xuICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAvLyBBc3NpZ24gdW5pcXVlIHN5bWJvbHMgZm9yIGVhY2ggb2YgdGhlIGF0dHJpYnV0ZXMgaW5oZXJpdGVkIGZyb20gdGhlIHN1cGVyLXNlbWFudGljcyBzbyB0aGF0XG4gICAgLy8gdGhleSBhcmUgbWVtb2l6ZWQgaW5kZXBlbmRlbnRseS5cbiAgICBmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVLZXlzW2F0dHJpYnV0ZU5hbWVdID0gU3ltYm9sKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGluaGVyaXRzKHRoaXMuV3JhcHBlciwgV3JhcHBlcik7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cbn1cblxuU2VtYW50aWNzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ1tzZW1hbnRpY3MgZm9yICcgKyB0aGlzLmdyYW1tYXIubmFtZSArICddJztcbn07XG5cblNlbWFudGljcy5wcm90b3R5cGUuY2hlY2tBY3Rpb25EaWN0c0lmSGF2ZW50QWxyZWFkeSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuY2hlY2tlZEFjdGlvbkRpY3RzKSB7XG4gICAgdGhpcy5jaGVja0FjdGlvbkRpY3RzKCk7XG4gICAgdGhpcy5jaGVja2VkQWN0aW9uRGljdHMgPSB0cnVlO1xuICB9XG59O1xuXG4vLyBDaGVja3MgdGhhdCB0aGUgYWN0aW9uIGRpY3Rpb25hcmllcyBmb3IgYWxsIG9wZXJhdGlvbnMgYW5kIGF0dHJpYnV0ZXMgaW4gdGhpcyBzZW1hbnRpY3MsXG4vLyBpbmNsdWRpbmcgdGhlIG9uZXMgdGhhdCB3ZXJlIGluaGVyaXRlZCBmcm9tIHRoZSBzdXBlci1zZW1hbnRpY3MsIGFncmVlIHdpdGggdGhlIGdyYW1tYXIuXG4vLyBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIG9uZSBvciBtb3JlIG9mIHRoZW0gZG9lc24ndC5cblNlbWFudGljcy5wcm90b3R5cGUuY2hlY2tBY3Rpb25EaWN0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZTtcbiAgZm9yIChuYW1lIGluIHRoaXMub3BlcmF0aW9ucykge1xuICAgIHRoaXMub3BlcmF0aW9uc1tuYW1lXS5jaGVja0FjdGlvbkRpY3QodGhpcy5ncmFtbWFyKTtcbiAgfVxuICBmb3IgKG5hbWUgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdLmNoZWNrQWN0aW9uRGljdCh0aGlzLmdyYW1tYXIpO1xuICB9XG59O1xuXG5TZW1hbnRpY3MucHJvdG90eXBlLnRvUmVjaXBlID0gZnVuY3Rpb24oc2VtYW50aWNzT25seSkge1xuICBmdW5jdGlvbiBoYXNTdXBlclNlbWFudGljcyhzKSB7XG4gICAgcmV0dXJuIHMuc3VwZXIgIT09IFNlbWFudGljcy5CdWlsdEluU2VtYW50aWNzLl9nZXRTZW1hbnRpY3MoKTtcbiAgfVxuXG4gIHZhciBzdHIgPSAnKGZ1bmN0aW9uKGcpIHtcXG4nO1xuICBpZiAoaGFzU3VwZXJTZW1hbnRpY3ModGhpcykpIHtcbiAgICBzdHIgKz0gJyAgdmFyIHNlbWFudGljcyA9ICcgKyB0aGlzLnN1cGVyLnRvUmVjaXBlKHRydWUpICsgJyhnJztcblxuICAgIHZhciBzdXBlclNlbWFudGljc0dyYW1tYXIgPSB0aGlzLnN1cGVyLmdyYW1tYXI7XG4gICAgdmFyIHJlbGF0ZWRHcmFtbWFyID0gdGhpcy5ncmFtbWFyO1xuICAgIHdoaWxlIChyZWxhdGVkR3JhbW1hciAhPT0gc3VwZXJTZW1hbnRpY3NHcmFtbWFyKSB7XG4gICAgICBzdHIgKz0gJy5zdXBlckdyYW1tYXInO1xuICAgICAgcmVsYXRlZEdyYW1tYXIgPSByZWxhdGVkR3JhbW1hci5zdXBlckdyYW1tYXI7XG4gICAgfVxuXG4gICAgc3RyICs9ICcpO1xcbic7XG4gICAgc3RyICs9ICcgIHJldHVybiBnLmV4dGVuZFNlbWFudGljcyhzZW1hbnRpY3MpJztcbiAgfSBlbHNlIHtcbiAgICBzdHIgKz0gJyAgcmV0dXJuIGcuY3JlYXRlU2VtYW50aWNzKCknO1xuICB9XG4gIFsnT3BlcmF0aW9uJywgJ0F0dHJpYnV0ZSddLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBzZW1hbnRpY09wZXJhdGlvbnMgPSB0aGlzW3R5cGUudG9Mb3dlckNhc2UoKSArICdzJ107XG4gICAgT2JqZWN0LmtleXMoc2VtYW50aWNPcGVyYXRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBzaWduYXR1cmUgPSBuYW1lO1xuICAgICAgaWYgKHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5mb3JtYWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2lnbmF0dXJlICs9ICcoJyArIHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5mb3JtYWxzLmpvaW4oJywgJykgKyAnKSc7XG4gICAgICB9XG5cbiAgICAgIHZhciBtZXRob2Q7XG4gICAgICBpZiAoaGFzU3VwZXJTZW1hbnRpY3ModGhpcykgJiYgdGhpcy5zdXBlclt0eXBlLnRvTG93ZXJDYXNlKCkgKyAncyddW25hbWVdKSB7XG4gICAgICAgIG1ldGhvZCA9ICdleHRlbmQnICsgdHlwZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZCA9ICdhZGQnICsgdHlwZTtcbiAgICAgIH1cbiAgICAgIHN0ciArPSAnXFxuICAgIC4nICsgbWV0aG9kICsgJygnICsgSlNPTi5zdHJpbmdpZnkoc2lnbmF0dXJlKSArICcsIHsnO1xuXG4gICAgICB2YXIgYWN0aW9ucyA9IHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5hY3Rpb25EaWN0O1xuICAgICAgdmFyIHNyY0FycmF5ID0gW107XG4gICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgaWYgKHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5idWlsdEluRGVmYXVsdCAhPT0gYWN0aW9uc1thY3Rpb25OYW1lXSkge1xuICAgICAgICAgIHNyY0FycmF5LnB1c2goJ1xcbiAgICAgICcgKyBKU09OLnN0cmluZ2lmeShhY3Rpb25OYW1lKSArICc6ICcgK1xuICAgICAgICAgICAgYWN0aW9uc1thY3Rpb25OYW1lXS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzdHIgKz0gc3JjQXJyYXkuam9pbignLCcpO1xuXG4gICAgICBzdHIgKz0gJ1xcbiAgICB9KSc7XG4gICAgfSwgdGhpcyk7XG4gIH0sIHRoaXMpO1xuICBzdHIgKz0gJztcXG4gIH0pJztcblxuICBpZiAoIXNlbWFudGljc09ubHkpIHtcbiAgICBzdHIgPVxuICAgICAgJyhmdW5jdGlvbigpIHtcXG4nICtcbiAgICAgICcgIHZhciBncmFtbWFyID0gdGhpcy5mcm9tUmVjaXBlKCcgKyBqc29uVG9KUyh0aGlzLmdyYW1tYXIudG9SZWNpcGUoKSkgKyAnKTtcXG4nICtcbiAgICAgICcgIHZhciBzZW1hbnRpY3MgPSAnICsgc3RyICsgJyhncmFtbWFyKTtcXG4nICtcbiAgICAgICcgIHJldHVybiBzZW1hbnRpY3M7XFxuJyArXG4gICAgICAnfSk7XFxuJztcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5mdW5jdGlvbiBwYXJzZVNpZ25hdHVyZShzaWduYXR1cmUsIHR5cGUpIHtcbiAgaWYgKCFwcm90b3R5cGVHcmFtbWFyKSB7XG4gICAgLy8gVGhlIE9wZXJhdGlvbnMgYW5kIEF0dHJpYnV0ZXMgZ3JhbW1hciB3b24ndCBiZSBhdmFpbGFibGUgd2hpbGUgT2htIGlzIGxvYWRpbmcsXG4gICAgLy8gYnV0IHdlIGNhbiBnZXQgYXdheSB0aGUgZm9sbG93aW5nIHNpbXBsaWZpY2F0aW9uIGIvYyBub25lIG9mIHRoZSBvcGVyYXRpb25zXG4gICAgLy8gdGhhdCBhcmUgdXNlZCB3aGlsZSBsb2FkaW5nIHRha2UgYXJndW1lbnRzLlxuICAgIGNvbW1vbi5hc3NlcnQoc2lnbmF0dXJlLmluZGV4T2YoJygnKSA9PT0gLTEpO1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBzaWduYXR1cmUsXG4gICAgICBmb3JtYWxzOiBbXVxuICAgIH07XG4gIH1cblxuICB2YXIgciA9IHByb3RvdHlwZUdyYW1tYXIubWF0Y2goXG4gICAgICBzaWduYXR1cmUsXG4gICAgICB0eXBlID09PSAnb3BlcmF0aW9uJyA/ICdPcGVyYXRpb25TaWduYXR1cmUnIDogJ0F0dHJpYnV0ZVNpZ25hdHVyZScpO1xuICBpZiAoci5mYWlsZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihyLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV0dXJuIHByb3RvdHlwZUdyYW1tYXJTZW1hbnRpY3MocikucGFyc2UoKTtcbn1cblxuZnVuY3Rpb24gbmV3RGVmYXVsdEFjdGlvbih0eXBlLCBuYW1lLCBkb0l0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgdGhpc1RoaW5nID0gdGhpcy5fc2VtYW50aWNzLm9wZXJhdGlvbnNbbmFtZV0gfHwgdGhpcy5fc2VtYW50aWNzLmF0dHJpYnV0ZXNbbmFtZV07XG4gICAgdmFyIGFyZ3MgPSB0aGlzVGhpbmcuZm9ybWFscy5tYXAoZnVuY3Rpb24oZm9ybWFsKSB7XG4gICAgICByZXR1cm4gc2VsZi5hcmdzW2Zvcm1hbF07XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5pc0l0ZXJhdGlvbigpKSB7XG4gICAgICAvLyBUaGlzIENTVCBub2RlIGNvcnJlc3BvbmRzIHRvIGFuIGl0ZXJhdGlvbiBleHByZXNzaW9uIGluIHRoZSBncmFtbWFyICgqLCArLCBvciA/KS4gVGhlXG4gICAgICAvLyBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIG1hcCB0aGlzIG9wZXJhdGlvbiBvciBhdHRyaWJ1dGUgb3ZlciBhbGwgb2YgaXRzIGNoaWxkIG5vZGVzLlxuICAgICAgcmV0dXJuIGNoaWxkcmVuLm1hcChmdW5jdGlvbihjaGlsZCkgeyByZXR1cm4gZG9JdC5hcHBseShjaGlsZCwgYXJncyk7IH0pO1xuICAgIH1cblxuICAgIC8vIFRoaXMgQ1NUIG5vZGUgY29ycmVzcG9uZHMgdG8gYSBub24tdGVybWluYWwgaW4gdGhlIGdyYW1tYXIgKGUuZy4sIEFkZEV4cHIpLiBUaGUgZmFjdCB0aGF0XG4gICAgLy8gd2UgZ290IGhlcmUgbWVhbnMgdGhhdCB0aGlzIGFjdGlvbiBkaWN0aW9uYXJ5IGRvZXNuJ3QgaGF2ZSBhbiBhY3Rpb24gZm9yIHRoaXMgcGFydGljdWxhclxuICAgIC8vIG5vbi10ZXJtaW5hbCBvciBhIGdlbmVyaWMgYF9ub250ZXJtaW5hbGAgYWN0aW9uLlxuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEFzIGEgY29udmVuaWVuY2UsIGlmIHRoaXMgbm9kZSBvbmx5IGhhcyBvbmUgY2hpbGQsIHdlIGp1c3QgcmV0dXJuIHRoZSByZXN1bHQgb2ZcbiAgICAgIC8vIGFwcGx5aW5nIHRoaXMgb3BlcmF0aW9uIC8gYXR0cmlidXRlIHRvIHRoZSBjaGlsZCBub2RlLlxuICAgICAgcmV0dXJuIGRvSXQuYXBwbHkoY2hpbGRyZW5bMF0sIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPdGhlcndpc2UsIHdlIHRocm93IGFuIGV4Y2VwdGlvbiB0byBsZXQgdGhlIHByb2dyYW1tZXIga25vdyB0aGF0IHdlIGRvbid0IGtub3cgd2hhdFxuICAgICAgLy8gdG8gZG8gd2l0aCB0aGlzIG5vZGUuXG4gICAgICB0aHJvdyBlcnJvcnMubWlzc2luZ1NlbWFudGljQWN0aW9uKHRoaXMuY3Rvck5hbWUsIG5hbWUsIHR5cGUsIGdsb2JhbEFjdGlvblN0YWNrKTtcbiAgICB9XG4gIH07XG59XG5cblNlbWFudGljcy5wcm90b3R5cGUuYWRkT3BlcmF0aW9uT3JBdHRyaWJ1dGUgPSBmdW5jdGlvbih0eXBlLCBzaWduYXR1cmUsIGFjdGlvbkRpY3QpIHtcbiAgdmFyIHR5cGVQbHVyYWwgPSB0eXBlICsgJ3MnO1xuXG4gIHZhciBwYXJzZWROYW1lQW5kRm9ybWFsQXJncyA9IHBhcnNlU2lnbmF0dXJlKHNpZ25hdHVyZSwgdHlwZSk7XG4gIHZhciBuYW1lID0gcGFyc2VkTmFtZUFuZEZvcm1hbEFyZ3MubmFtZTtcbiAgdmFyIGZvcm1hbHMgPSBwYXJzZWROYW1lQW5kRm9ybWFsQXJncy5mb3JtYWxzO1xuXG4gIC8vIFRPRE86IGNoZWNrIHRoYXQgdGhlcmUgYXJlIG5vIGR1cGxpY2F0ZSBmb3JtYWwgYXJndW1lbnRzXG5cbiAgdGhpcy5hc3NlcnROZXdOYW1lKG5hbWUsIHR5cGUpO1xuXG4gIC8vIENyZWF0ZSB0aGUgYWN0aW9uIGRpY3Rpb25hcnkgZm9yIHRoaXMgb3BlcmF0aW9uIC8gYXR0cmlidXRlIHRoYXQgY29udGFpbnMgYSBgX2RlZmF1bHRgIGFjdGlvblxuICAvLyB3aGljaCBkZWZpbmVzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIGl0ZXJhdGlvbiwgdGVybWluYWwsIGFuZCBub24tdGVybWluYWwgbm9kZXMuLi5cbiAgdmFyIGJ1aWx0SW5EZWZhdWx0ID0gbmV3RGVmYXVsdEFjdGlvbih0eXBlLCBuYW1lLCBkb0l0KTtcbiAgdmFyIHJlYWxBY3Rpb25EaWN0ID0ge19kZWZhdWx0OiBidWlsdEluRGVmYXVsdH07XG4gIC8vIC4uLiBhbmQgYWRkIGluIHRoZSBhY3Rpb25zIHN1cHBsaWVkIGJ5IHRoZSBwcm9ncmFtbWVyLCB3aGljaCBtYXkgb3ZlcnJpZGUgc29tZSBvciBhbGwgb2YgdGhlXG4gIC8vIGRlZmF1bHQgb25lcy5cbiAgT2JqZWN0LmtleXMoYWN0aW9uRGljdCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgcmVhbEFjdGlvbkRpY3RbbmFtZV0gPSBhY3Rpb25EaWN0W25hbWVdO1xuICB9KTtcblxuICB2YXIgZW50cnkgPSB0eXBlID09PSAnb3BlcmF0aW9uJyA/XG4gICAgICBuZXcgT3BlcmF0aW9uKG5hbWUsIGZvcm1hbHMsIHJlYWxBY3Rpb25EaWN0LCBidWlsdEluRGVmYXVsdCkgOlxuICAgICAgbmV3IEF0dHJpYnV0ZShuYW1lLCByZWFsQWN0aW9uRGljdCwgYnVpbHRJbkRlZmF1bHQpO1xuXG4gIC8vIFRoZSBmb2xsb3dpbmcgY2hlY2sgaXMgbm90IHN0cmljdGx5IG5lY2Vzc2FyeSAoaXQgd2lsbCBoYXBwZW4gbGF0ZXIgYW55d2F5KSBidXQgaXQncyBiZXR0ZXIgdG9cbiAgLy8gY2F0Y2ggZXJyb3JzIGVhcmx5LlxuICBlbnRyeS5jaGVja0FjdGlvbkRpY3QodGhpcy5ncmFtbWFyKTtcblxuICB0aGlzW3R5cGVQbHVyYWxdW25hbWVdID0gZW50cnk7XG5cbiAgZnVuY3Rpb24gZG9JdCgpIHtcbiAgICAvLyBEaXNwYXRjaCB0byBtb3N0IHNwZWNpZmljIHZlcnNpb24gb2YgdGhpcyBvcGVyYXRpb24gLyBhdHRyaWJ1dGUgLS0gaXQgbWF5IGhhdmUgYmVlblxuICAgIC8vIG92ZXJyaWRkZW4gYnkgYSBzdWItc2VtYW50aWNzLlxuICAgIHZhciB0aGlzVGhpbmcgPSB0aGlzLl9zZW1hbnRpY3NbdHlwZVBsdXJhbF1bbmFtZV07XG5cbiAgICAvLyBDaGVjayB0aGF0IHRoZSBjYWxsZXIgcGFzc2VkIHRoZSBjb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IHRoaXNUaGluZy5mb3JtYWxzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHMgcGFzc2VkIHRvICcgKyBuYW1lICsgJyAnICsgdHlwZSArICcgKGV4cGVjdGVkICcgK1xuICAgICAgICAgIHRoaXNUaGluZy5mb3JtYWxzLmxlbmd0aCArICcsIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcpJyk7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIFwiYXJndW1lbnRzIG9iamVjdFwiIGZyb20gdGhlIGFyZ3VtZW50cyB0aGF0IHdlcmUgcGFzc2VkIHRvIHRoaXNcbiAgICAvLyBvcGVyYXRpb24gLyBhdHRyaWJ1dGUuXG4gICAgdmFyIGFyZ3MgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgZm9ybWFsID0gdGhpc1RoaW5nLmZvcm1hbHNbaWR4XTtcbiAgICAgIGFyZ3NbZm9ybWFsXSA9IGFyZ3VtZW50c1tpZHhdO1xuICAgIH1cblxuICAgIHZhciBvbGRBcmdzID0gdGhpcy5hcmdzO1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdmFyIGFucyA9IHRoaXNUaGluZy5leGVjdXRlKHRoaXMuX3NlbWFudGljcywgdGhpcyk7XG4gICAgdGhpcy5hcmdzID0gb2xkQXJncztcbiAgICByZXR1cm4gYW5zO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdvcGVyYXRpb24nKSB7XG4gICAgdGhpcy5XcmFwcGVyLnByb3RvdHlwZVtuYW1lXSA9IGRvSXQ7XG4gICAgdGhpcy5XcmFwcGVyLnByb3RvdHlwZVtuYW1lXS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICdbJyArIG5hbWUgKyAnIG9wZXJhdGlvbl0nO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuV3JhcHBlci5wcm90b3R5cGUsIG5hbWUsIHtcbiAgICAgIGdldDogZG9JdCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSAgLy8gU28gdGhlIHByb3BlcnR5IGNhbiBiZSBkZWxldGVkLlxuICAgIH0pO1xuICAgIHRoaXMuYXR0cmlidXRlS2V5c1tuYW1lXSA9IFN5bWJvbCgpO1xuICB9XG59O1xuXG5TZW1hbnRpY3MucHJvdG90eXBlLmV4dGVuZE9wZXJhdGlvbk9yQXR0cmlidXRlID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgYWN0aW9uRGljdCkge1xuICB2YXIgdHlwZVBsdXJhbCA9IHR5cGUgKyAncyc7XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgYG5hbWVgIHJlYWxseSBpcyBqdXN0IGEgbmFtZSwgaS5lLiwgdGhhdCBpdCBkb2Vzbid0IGFsc28gY29udGFpbiBmb3JtYWxzLlxuICBwYXJzZVNpZ25hdHVyZShuYW1lLCAnYXR0cmlidXRlJyk7XG5cbiAgaWYgKCEodGhpcy5zdXBlciAmJiBuYW1lIGluIHRoaXMuc3VwZXJbdHlwZVBsdXJhbF0pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZXh0ZW5kICcgKyB0eXBlICsgXCIgJ1wiICsgbmFtZSArXG4gICAgICAgIFwiJzogZGlkIG5vdCBpbmhlcml0IGFuIFwiICsgdHlwZSArICcgd2l0aCB0aGF0IG5hbWUnKTtcbiAgfVxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXNbdHlwZVBsdXJhbF0sIG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZXh0ZW5kICcgKyB0eXBlICsgXCIgJ1wiICsgbmFtZSArIFwiJyBhZ2FpblwiKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIG5ldyBvcGVyYXRpb24gLyBhdHRyaWJ1dGUgd2hvc2UgYWN0aW9uRGljdCBkZWxlZ2F0ZXMgdG8gdGhlIHN1cGVyIG9wZXJhdGlvbiAvXG4gIC8vIGF0dHJpYnV0ZSdzIGFjdGlvbkRpY3QsIGFuZCB3aGljaCBoYXMgYWxsIHRoZSBrZXlzIGZyb20gYGluaGVyaXRlZEFjdGlvbkRpY3RgLlxuICB2YXIgaW5oZXJpdGVkRm9ybWFscyA9IHRoaXNbdHlwZVBsdXJhbF1bbmFtZV0uZm9ybWFscztcbiAgdmFyIGluaGVyaXRlZEFjdGlvbkRpY3QgPSB0aGlzW3R5cGVQbHVyYWxdW25hbWVdLmFjdGlvbkRpY3Q7XG4gIHZhciBuZXdBY3Rpb25EaWN0ID0gT2JqZWN0LmNyZWF0ZShpbmhlcml0ZWRBY3Rpb25EaWN0KTtcbiAgT2JqZWN0LmtleXMoYWN0aW9uRGljdCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgbmV3QWN0aW9uRGljdFtuYW1lXSA9IGFjdGlvbkRpY3RbbmFtZV07XG4gIH0pO1xuXG4gIHRoaXNbdHlwZVBsdXJhbF1bbmFtZV0gPSB0eXBlID09PSAnb3BlcmF0aW9uJyA/XG4gICAgICBuZXcgT3BlcmF0aW9uKG5hbWUsIGluaGVyaXRlZEZvcm1hbHMsIG5ld0FjdGlvbkRpY3QpIDpcbiAgICAgIG5ldyBBdHRyaWJ1dGUobmFtZSwgbmV3QWN0aW9uRGljdCk7XG5cbiAgLy8gVGhlIGZvbGxvd2luZyBjaGVjayBpcyBub3Qgc3RyaWN0bHkgbmVjZXNzYXJ5IChpdCB3aWxsIGhhcHBlbiBsYXRlciBhbnl3YXkpIGJ1dCBpdCdzIGJldHRlciB0b1xuICAvLyBjYXRjaCBlcnJvcnMgZWFybHkuXG4gIHRoaXNbdHlwZVBsdXJhbF1bbmFtZV0uY2hlY2tBY3Rpb25EaWN0KHRoaXMuZ3JhbW1hcik7XG59O1xuXG5TZW1hbnRpY3MucHJvdG90eXBlLmFzc2VydE5ld05hbWUgPSBmdW5jdGlvbihuYW1lLCB0eXBlKSB7XG4gIGlmIChXcmFwcGVyLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0Nhbm5vdCBhZGQgJyArIHR5cGUgKyBcIiAnXCIgKyBuYW1lICsgXCInOiB0aGF0J3MgYSByZXNlcnZlZCBuYW1lXCIpO1xuICB9XG4gIGlmIChuYW1lIGluIHRoaXMub3BlcmF0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0Nhbm5vdCBhZGQgJyArIHR5cGUgKyBcIiAnXCIgKyBuYW1lICsgXCInOiBhbiBvcGVyYXRpb24gd2l0aCB0aGF0IG5hbWUgYWxyZWFkeSBleGlzdHNcIik7XG4gIH1cbiAgaWYgKG5hbWUgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ2Fubm90IGFkZCAnICsgdHlwZSArIFwiICdcIiArIG5hbWUgKyBcIic6IGFuIGF0dHJpYnV0ZSB3aXRoIHRoYXQgbmFtZSBhbHJlYWR5IGV4aXN0c1wiKTtcbiAgfVxufTtcblxuLy8gUmV0dXJucyBhIHdyYXBwZXIgZm9yIHRoZSBnaXZlbiBDU1QgYG5vZGVgIGluIHRoaXMgc2VtYW50aWNzLlxuLy8gSWYgYG5vZGVgIGlzIGFscmVhZHkgYSB3cmFwcGVyLCByZXR1cm5zIGBub2RlYCBpdHNlbGYuICAvLyBUT0RPOiB3aHkgaXMgdGhpcyBuZWVkZWQ/XG5TZW1hbnRpY3MucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbihub2RlLCBzb3VyY2UsIG9wdEJhc2VJbnRlcnZhbCkge1xuICB2YXIgYmFzZUludGVydmFsID0gb3B0QmFzZUludGVydmFsIHx8IHNvdXJjZTtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiB0aGlzLldyYXBwZXIgPyBub2RlIDogbmV3IHRoaXMuV3JhcHBlcihub2RlLCBzb3VyY2UsIGJhc2VJbnRlcnZhbCk7XG59O1xuXG4vLyBDcmVhdGVzIGEgbmV3IFNlbWFudGljcyBpbnN0YW5jZSBmb3IgYGdyYW1tYXJgLCBpbmhlcml0aW5nIG9wZXJhdGlvbnMgYW5kIGF0dHJpYnV0ZXMgZnJvbVxuLy8gYG9wdFN1cGVyU2VtYW50aWNzYCwgaWYgaXQgaXMgc3BlY2lmaWVkLiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBhY3RzIGFzIGEgcHJveHkgZm9yIHRoZSBuZXdcbi8vIFNlbWFudGljcyBpbnN0YW5jZS4gV2hlbiB0aGF0IGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBhIENTVCBub2RlIGFzIGFuIGFyZ3VtZW50LCBpdCByZXR1cm5zXG4vLyBhIHdyYXBwZXIgZm9yIHRoYXQgbm9kZSB3aGljaCBnaXZlcyBhY2Nlc3MgdG8gdGhlIG9wZXJhdGlvbnMgYW5kIGF0dHJpYnV0ZXMgcHJvdmlkZWQgYnkgdGhpc1xuLy8gc2VtYW50aWNzLlxuU2VtYW50aWNzLmNyZWF0ZVNlbWFudGljcyA9IGZ1bmN0aW9uKGdyYW1tYXIsIG9wdFN1cGVyU2VtYW50aWNzKSB7XG4gIHZhciBzID0gbmV3IFNlbWFudGljcyhcbiAgICAgIGdyYW1tYXIsXG4gICAgICBvcHRTdXBlclNlbWFudGljcyAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgICBvcHRTdXBlclNlbWFudGljcyA6XG4gICAgICAgICAgU2VtYW50aWNzLkJ1aWx0SW5TZW1hbnRpY3MuX2dldFNlbWFudGljcygpKTtcblxuICAvLyBUbyBlbmFibGUgY2xpZW50cyB0byBpbnZva2UgYSBzZW1hbnRpY3MgbGlrZSBhIGZ1bmN0aW9uLCByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IGFjdHMgYXMgYSBwcm94eVxuICAvLyBmb3IgYHNgLCB3aGljaCBpcyB0aGUgcmVhbCBgU2VtYW50aWNzYCBpbnN0YW5jZS5cbiAgdmFyIHByb3h5ID0gZnVuY3Rpb24gQVNlbWFudGljcyhtYXRjaFJlc3VsdCkge1xuICAgIGlmICghKG1hdGNoUmVzdWx0IGluc3RhbmNlb2YgTWF0Y2hSZXN1bHQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdTZW1hbnRpY3MgZXhwZWN0ZWQgYSBNYXRjaFJlc3VsdCwgYnV0IGdvdCAnICsgY29tbW9uLnVuZXhwZWN0ZWRPYmpUb1N0cmluZyhtYXRjaFJlc3VsdCkpO1xuICAgIH1cbiAgICBpZiAobWF0Y2hSZXN1bHQuZmFpbGVkKCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Nhbm5vdCBhcHBseSBTZW1hbnRpY3MgdG8gJyArIG1hdGNoUmVzdWx0LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHZhciBjc3QgPSBtYXRjaFJlc3VsdC5fY3N0O1xuICAgIGlmIChjc3QuZ3JhbW1hciAhPT0gZ3JhbW1hcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiQ2Fubm90IHVzZSBhIE1hdGNoUmVzdWx0IGZyb20gZ3JhbW1hciAnXCIgKyBjc3QuZ3JhbW1hci5uYW1lICtcbiAgICAgICAgICBcIicgd2l0aCBhIHNlbWFudGljcyBmb3IgJ1wiICsgZ3JhbW1hci5uYW1lICsgXCInXCIpO1xuICAgIH1cbiAgICB2YXIgaW5wdXRTdHJlYW0gPSBuZXcgSW5wdXRTdHJlYW0obWF0Y2hSZXN1bHQuaW5wdXQpO1xuICAgIHJldHVybiBzLndyYXAoY3N0LCBpbnB1dFN0cmVhbS5pbnRlcnZhbChtYXRjaFJlc3VsdC5fY3N0T2Zmc2V0LCBtYXRjaFJlc3VsdC5pbnB1dC5sZW5ndGgpKTtcbiAgfTtcblxuICAvLyBGb3J3YXJkIHB1YmxpYyBtZXRob2RzIGZyb20gdGhlIHByb3h5IHRvIHRoZSBzZW1hbnRpY3MgaW5zdGFuY2UuXG4gIHByb3h5LmFkZE9wZXJhdGlvbiA9IGZ1bmN0aW9uKHNpZ25hdHVyZSwgYWN0aW9uRGljdCkge1xuICAgIHMuYWRkT3BlcmF0aW9uT3JBdHRyaWJ1dGUoJ29wZXJhdGlvbicsIHNpZ25hdHVyZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5leHRlbmRPcGVyYXRpb24gPSBmdW5jdGlvbihuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgcy5leHRlbmRPcGVyYXRpb25PckF0dHJpYnV0ZSgnb3BlcmF0aW9uJywgbmFtZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5hZGRBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgcy5hZGRPcGVyYXRpb25PckF0dHJpYnV0ZSgnYXR0cmlidXRlJywgbmFtZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5leHRlbmRBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgcy5leHRlbmRPcGVyYXRpb25PckF0dHJpYnV0ZSgnYXR0cmlidXRlJywgbmFtZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5fZ2V0QWN0aW9uRGljdCA9IGZ1bmN0aW9uKG9wZXJhdGlvbk9yQXR0cmlidXRlTmFtZSkge1xuICAgIHZhciBhY3Rpb24gPSBzLm9wZXJhdGlvbnNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXSB8fCBzLmF0dHJpYnV0ZXNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXTtcbiAgICBpZiAoIWFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUgKyAnXCIgaXMgbm90IGEgdmFsaWQgb3BlcmF0aW9uIG9yIGF0dHJpYnV0ZSAnICtcbiAgICAgICAgJ25hbWUgaW4gdGhpcyBzZW1hbnRpY3MgZm9yIFwiJyArIGdyYW1tYXIubmFtZSArICdcIicpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aW9uLmFjdGlvbkRpY3Q7XG4gIH07XG4gIHByb3h5Ll9yZW1vdmUgPSBmdW5jdGlvbihvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUpIHtcbiAgICB2YXIgc2VtYW50aWM7XG4gICAgaWYgKG9wZXJhdGlvbk9yQXR0cmlidXRlTmFtZSBpbiBzLm9wZXJhdGlvbnMpIHtcbiAgICAgIHNlbWFudGljID0gcy5vcGVyYXRpb25zW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgICBkZWxldGUgcy5vcGVyYXRpb25zW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgfSBlbHNlIGlmIChvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUgaW4gcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBzZW1hbnRpYyA9IHMuYXR0cmlidXRlc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgICAgZGVsZXRlIHMuYXR0cmlidXRlc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgIH1cbiAgICBkZWxldGUgcy5XcmFwcGVyLnByb3RvdHlwZVtvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgIHJldHVybiBzZW1hbnRpYztcbiAgfTtcbiAgcHJveHkuZ2V0T3BlcmF0aW9uTmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocy5vcGVyYXRpb25zKTtcbiAgfTtcbiAgcHJveHkuZ2V0QXR0cmlidXRlTmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocy5hdHRyaWJ1dGVzKTtcbiAgfTtcbiAgcHJveHkuZ2V0R3JhbW1hciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzLmdyYW1tYXI7XG4gIH07XG4gIHByb3h5LnRvUmVjaXBlID0gZnVuY3Rpb24oc2VtYW50aWNzT25seSkge1xuICAgIHJldHVybiBzLnRvUmVjaXBlKHNlbWFudGljc09ubHkpO1xuICB9O1xuXG4gIC8vIE1ha2UgdGhlIHByb3h5J3MgdG9TdHJpbmcoKSB3b3JrLlxuICBwcm94eS50b1N0cmluZyA9IHMudG9TdHJpbmcuYmluZChzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBzZW1hbnRpY3MgZm9yIHRoZSBwcm94eS5cbiAgcHJveHkuX2dldFNlbWFudGljcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzO1xuICB9O1xuXG4gIHJldHVybiBwcm94eTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIE9wZXJhdGlvbiAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBBbiBPcGVyYXRpb24gcmVwcmVzZW50cyBhIGZ1bmN0aW9uIHRvIGJlIGFwcGxpZWQgdG8gYSBjb25jcmV0ZSBzeW50YXggdHJlZSAoQ1NUKSAtLSBpdCdzIHZlcnlcbi8vIHNpbWlsYXIgdG8gYSBWaXNpdG9yIChodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Zpc2l0b3JfcGF0dGVybikuIEFuIG9wZXJhdGlvbiBpcyBleGVjdXRlZCBieVxuLy8gcmVjdXJzaXZlbHkgd2Fsa2luZyB0aGUgQ1NULCBhbmQgYXQgZWFjaCBub2RlLCBpbnZva2luZyB0aGUgbWF0Y2hpbmcgc2VtYW50aWMgYWN0aW9uIGZyb21cbi8vIGBhY3Rpb25EaWN0YC4gU2VlIGBPcGVyYXRpb24ucHJvdG90eXBlLmV4ZWN1dGVgIGZvciBkZXRhaWxzIG9mIGhvdyBhIENTVCBub2RlJ3MgbWF0Y2hpbmcgc2VtYW50aWNcbi8vIGFjdGlvbiBpcyBmb3VuZC5cbmZ1bmN0aW9uIE9wZXJhdGlvbihuYW1lLCBmb3JtYWxzLCBhY3Rpb25EaWN0LCBidWlsdEluRGVmYXVsdCkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmZvcm1hbHMgPSBmb3JtYWxzO1xuICB0aGlzLmFjdGlvbkRpY3QgPSBhY3Rpb25EaWN0O1xuICB0aGlzLmJ1aWx0SW5EZWZhdWx0ID0gYnVpbHRJbkRlZmF1bHQ7XG59XG5cbk9wZXJhdGlvbi5wcm90b3R5cGUudHlwZU5hbWUgPSAnb3BlcmF0aW9uJztcblxuT3BlcmF0aW9uLnByb3RvdHlwZS5jaGVja0FjdGlvbkRpY3QgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIGdyYW1tYXIuX2NoZWNrVG9wRG93bkFjdGlvbkRpY3QodGhpcy50eXBlTmFtZSwgdGhpcy5uYW1lLCB0aGlzLmFjdGlvbkRpY3QpO1xufTtcblxuLy8gRXhlY3V0ZSB0aGlzIG9wZXJhdGlvbiBvbiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIGBub2RlV3JhcHBlcmAgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGdpdmVuXG4vLyBTZW1hbnRpY3MgaW5zdGFuY2UuXG5PcGVyYXRpb24ucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbihzZW1hbnRpY3MsIG5vZGVXcmFwcGVyKSB7XG4gIHRyeSB7XG4gICAgLy8gTG9vayBmb3IgYSBzZW1hbnRpYyBhY3Rpb24gd2hvc2UgbmFtZSBtYXRjaGVzIHRoZSBub2RlJ3MgY29uc3RydWN0b3IgbmFtZSwgd2hpY2ggaXMgZWl0aGVyXG4gICAgLy8gdGhlIG5hbWUgb2YgYSBydWxlIGluIHRoZSBncmFtbWFyLCBvciAnX3Rlcm1pbmFsJyAoZm9yIGEgdGVybWluYWwgbm9kZSksIG9yICdfaXRlcicgKGZvciBhblxuICAgIC8vIGl0ZXJhdGlvbiBub2RlKS4gSW4gdGhlIGxhdHRlciBjYXNlLCB0aGUgYWN0aW9uIGZ1bmN0aW9uIHJlY2VpdmVzIGEgc2luZ2xlIGFyZ3VtZW50LCB3aGljaFxuICAgIC8vIGlzIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgQ1NUIG5vZGUuXG4gICAgdmFyIGN0b3JOYW1lID0gbm9kZVdyYXBwZXIuX25vZGUuY3Rvck5hbWU7XG4gICAgdmFyIGFjdGlvbkZuID0gdGhpcy5hY3Rpb25EaWN0W2N0b3JOYW1lXTtcbiAgICB2YXIgYW5zO1xuICAgIGlmIChhY3Rpb25Gbikge1xuICAgICAgZ2xvYmFsQWN0aW9uU3RhY2sucHVzaChbdGhpcywgY3Rvck5hbWVdKTtcbiAgICAgIGFucyA9IHRoaXMuZG9BY3Rpb24oc2VtYW50aWNzLCBub2RlV3JhcHBlciwgYWN0aW9uRm4sIG5vZGVXcmFwcGVyLmlzSXRlcmF0aW9uKCkpO1xuICAgICAgcmV0dXJuIGFucztcbiAgICB9XG5cbiAgICAvLyBUaGUgYWN0aW9uIGRpY3Rpb25hcnkgZG9lcyBub3QgY29udGFpbiBhIHNlbWFudGljIGFjdGlvbiBmb3IgdGhpcyBzcGVjaWZpYyB0eXBlIG9mIG5vZGUuXG4gICAgLy8gSWYgdGhpcyBpcyBhIG5vbnRlcm1pbmFsIG5vZGUgYW5kIHRoZSBwcm9ncmFtbWVyIGhhcyBwcm92aWRlZCBhIGBfbm9udGVybWluYWxgIHNlbWFudGljXG4gICAgLy8gYWN0aW9uLCB3ZSBpbnZva2UgaXQ6XG4gICAgaWYgKG5vZGVXcmFwcGVyLmlzTm9udGVybWluYWwoKSkge1xuICAgICAgYWN0aW9uRm4gPSB0aGlzLmFjdGlvbkRpY3QuX25vbnRlcm1pbmFsO1xuICAgICAgaWYgKGFjdGlvbkZuKSB7XG4gICAgICAgIGdsb2JhbEFjdGlvblN0YWNrLnB1c2goW3RoaXMsICdfbm9udGVybWluYWwnLCBjdG9yTmFtZV0pO1xuICAgICAgICBhbnMgPSB0aGlzLmRvQWN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIsIGFjdGlvbkZuLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGFucztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIHdlIGludm9rZSB0aGUgJ19kZWZhdWx0JyBzZW1hbnRpYyBhY3Rpb24uXG4gICAgZ2xvYmFsQWN0aW9uU3RhY2sucHVzaChbdGhpcywgJ2RlZmF1bHQgYWN0aW9uJywgY3Rvck5hbWVdKTtcbiAgICBhbnMgPSB0aGlzLmRvQWN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIsIHRoaXMuYWN0aW9uRGljdC5fZGVmYXVsdCwgdHJ1ZSk7XG4gICAgcmV0dXJuIGFucztcbiAgfSBmaW5hbGx5IHtcbiAgICBnbG9iYWxBY3Rpb25TdGFjay5wb3AoKTtcbiAgfVxufTtcblxuLy8gSW52b2tlIGBhY3Rpb25GbmAgb24gdGhlIENTVCBub2RlIHRoYXQgY29ycmVzcG9uZHMgdG8gYG5vZGVXcmFwcGVyYCwgaW4gdGhlIGNvbnRleHQgb2Zcbi8vIGBzZW1hbnRpY3NgLiBJZiBgb3B0UGFzc0NoaWxkcmVuQXNBcnJheWAgaXMgdHJ1dGh5LCBgYWN0aW9uRm5gIHdpbGwgYmUgY2FsbGVkIHdpdGggYSBzaW5nbGVcbi8vIGFyZ3VtZW50LCB3aGljaCBpcyBhbiBhcnJheSBvZiB3cmFwcGVycy4gT3RoZXJ3aXNlLCB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBgYWN0aW9uRm5gIHdpbGxcbi8vIGJlIGVxdWFsIHRvIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhlIENTVCBub2RlLlxuT3BlcmF0aW9uLnByb3RvdHlwZS5kb0FjdGlvbiA9IGZ1bmN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIsIGFjdGlvbkZuLCBvcHRQYXNzQ2hpbGRyZW5Bc0FycmF5KSB7XG4gIHJldHVybiBvcHRQYXNzQ2hpbGRyZW5Bc0FycmF5ID9cbiAgICAgIGFjdGlvbkZuLmNhbGwobm9kZVdyYXBwZXIsIG5vZGVXcmFwcGVyLl9jaGlsZHJlbigpKSA6XG4gICAgICBhY3Rpb25Gbi5hcHBseShub2RlV3JhcHBlciwgbm9kZVdyYXBwZXIuX2NoaWxkcmVuKCkpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gQXR0cmlidXRlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEF0dHJpYnV0ZXMgYXJlIE9wZXJhdGlvbnMgd2hvc2UgcmVzdWx0cyBhcmUgbWVtb2l6ZWQuIFRoaXMgbWVhbnMgdGhhdCwgZm9yIGFueSBnaXZlbiBzZW1hbnRpY3MsXG4vLyB0aGUgc2VtYW50aWMgYWN0aW9uIGZvciBhIENTVCBub2RlIHdpbGwgYmUgaW52b2tlZCBubyBtb3JlIHRoYW4gb25jZS5cbmZ1bmN0aW9uIEF0dHJpYnV0ZShuYW1lLCBhY3Rpb25EaWN0LCBidWlsdEluRGVmYXVsdCkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmZvcm1hbHMgPSBbXTtcbiAgdGhpcy5hY3Rpb25EaWN0ID0gYWN0aW9uRGljdDtcbiAgdGhpcy5idWlsdEluRGVmYXVsdCA9IGJ1aWx0SW5EZWZhdWx0O1xufVxuaW5oZXJpdHMoQXR0cmlidXRlLCBPcGVyYXRpb24pO1xuXG5BdHRyaWJ1dGUucHJvdG90eXBlLnR5cGVOYW1lID0gJ2F0dHJpYnV0ZSc7XG5cbkF0dHJpYnV0ZS5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIpIHtcbiAgdmFyIG5vZGUgPSBub2RlV3JhcHBlci5fbm9kZTtcbiAgdmFyIGtleSA9IHNlbWFudGljcy5hdHRyaWJ1dGVLZXlzW3RoaXMubmFtZV07XG4gIGlmICghbm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBpcyBhIHN1cGVyLXNlbmQgLS0gaXNuJ3QgSlMgYmVhdXRpZnVsPyA6L1xuICAgIG5vZGVba2V5XSA9IE9wZXJhdGlvbi5wcm90b3R5cGUuZXhlY3V0ZS5jYWxsKHRoaXMsIHNlbWFudGljcywgbm9kZVdyYXBwZXIpO1xuICB9XG4gIHJldHVybiBub2RlW2tleV07XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBEZWZlcnJlZCBpbml0aWFsaXphdGlvbiAtLS0tLS0tLS0tLS0tLS0tLVxuXG51dGlsLmF3YWl0QnVpbHRJblJ1bGVzKGZ1bmN0aW9uKGJ1aWx0SW5SdWxlcykge1xuICB2YXIgb3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXNHcmFtbWFyID0gcmVxdWlyZSgnLi4vZGlzdC9vcGVyYXRpb25zLWFuZC1hdHRyaWJ1dGVzJyk7XG4gIGluaXRCdWlsdEluU2VtYW50aWNzKGJ1aWx0SW5SdWxlcyk7XG4gIGluaXRQcm90b3R5cGVQYXJzZXIob3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXNHcmFtbWFyKTsgIC8vIHJlcXVpcmVzIEJ1aWx0SW5TZW1hbnRpY3Ncbn0pO1xuXG5mdW5jdGlvbiBpbml0QnVpbHRJblNlbWFudGljcyhidWlsdEluUnVsZXMpIHtcbiAgdmFyIGFjdGlvbnMgPSB7XG4gICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlcmF0aW9uKCk7XG4gICAgfSxcbiAgICBub25FbXB0eTogZnVuY3Rpb24oZmlyc3QsIF8sIHJlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLml0ZXJhdGlvbihbZmlyc3RdLmNvbmNhdChyZXN0LmNoaWxkcmVuKSk7XG4gICAgfVxuICB9O1xuXG4gIFNlbWFudGljcy5CdWlsdEluU2VtYW50aWNzID0gU2VtYW50aWNzXG4gICAgICAuY3JlYXRlU2VtYW50aWNzKGJ1aWx0SW5SdWxlcywgbnVsbClcbiAgICAgIC5hZGRPcGVyYXRpb24oJ2FzSXRlcmF0aW9uJywge1xuICAgICAgICBlbXB0eUxpc3RPZjogYWN0aW9ucy5lbXB0eSxcbiAgICAgICAgbm9uZW1wdHlMaXN0T2Y6IGFjdGlvbnMubm9uRW1wdHksXG4gICAgICAgIEVtcHR5TGlzdE9mOiBhY3Rpb25zLmVtcHR5LFxuICAgICAgICBOb25lbXB0eUxpc3RPZjogYWN0aW9ucy5ub25FbXB0eVxuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRQcm90b3R5cGVQYXJzZXIoZ3JhbW1hcikge1xuICBwcm90b3R5cGVHcmFtbWFyU2VtYW50aWNzID0gZ3JhbW1hci5jcmVhdGVTZW1hbnRpY3MoKS5hZGRPcGVyYXRpb24oJ3BhcnNlJywge1xuICAgIEF0dHJpYnV0ZVNpZ25hdHVyZTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZS5wYXJzZSgpLFxuICAgICAgICBmb3JtYWxzOiBbXVxuICAgICAgfTtcbiAgICB9LFxuICAgIE9wZXJhdGlvblNpZ25hdHVyZTogZnVuY3Rpb24obmFtZSwgb3B0Rm9ybWFscykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZS5wYXJzZSgpLFxuICAgICAgICBmb3JtYWxzOiBvcHRGb3JtYWxzLnBhcnNlKClbMF0gfHwgW11cbiAgICAgIH07XG4gICAgfSxcbiAgICBGb3JtYWxzOiBmdW5jdGlvbihvcGFyZW4sIGZzLCBjcGFyZW4pIHtcbiAgICAgIHJldHVybiBmcy5hc0l0ZXJhdGlvbigpLnBhcnNlKCk7XG4gICAgfSxcbiAgICBuYW1lOiBmdW5jdGlvbihmaXJzdCwgcmVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nO1xuICAgIH1cbiAgfSk7XG4gIHByb3RvdHlwZUdyYW1tYXIgPSBncmFtbWFyO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gU2VtYW50aWNzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbCcpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBVbmljb2RlIGNoYXJhY3RlcnMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgYHRvU3RyaW5nYCBvdXRwdXQuXG52YXIgQkFMTE9UX1ggPSAnXFx1MjcxNyc7XG52YXIgQ0hFQ0tfTUFSSyA9ICdcXHUyNzEzJztcbnZhciBET1RfT1BFUkFUT1IgPSAnXFx1MjJDNSc7XG52YXIgUklHSFRXQVJEU19ET1VCTEVfQVJST1cgPSAnXFx1MjFEMic7XG52YXIgU1lNQk9MX0ZPUl9IT1JJWk9OVEFMX1RBQlVMQVRJT04gPSAnXFx1MjQwOSc7XG52YXIgU1lNQk9MX0ZPUl9MSU5FX0ZFRUQgPSAnXFx1MjQwQSc7XG52YXIgU1lNQk9MX0ZPUl9DQVJSSUFHRV9SRVRVUk4gPSAnXFx1MjQwRCc7XG5cbnZhciBGbGFncyA9IHtcbiAgc3VjY2VlZGVkOiAxIDw8IDAsXG4gIGlzUm9vdE5vZGU6IDEgPDwgMSxcbiAgaXNJbXBsaWNpdFNwYWNlczogMSA8PCAyLFxuICBpc01lbW9pemVkOiAxIDw8IDMsXG4gIGlzSGVhZE9mTGVmdFJlY3Vyc2lvbjogMSA8PCA0LFxuICB0ZXJtaW5hdGVzTFI6IDEgPDwgNVxufTtcblxuZnVuY3Rpb24gc3BhY2VzKG4pIHtcbiAgcmV0dXJuIGNvbW1vbi5yZXBlYXQoJyAnLCBuKS5qb2luKCcnKTtcbn1cblxuLy8gUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcG9ydGlvbiBvZiBgaW5wdXRgIGF0IG9mZnNldCBgcG9zYC5cbi8vIFRoZSByZXN1bHQgd2lsbCBjb250YWluIGV4YWN0bHkgYGxlbmAgY2hhcmFjdGVycy5cbmZ1bmN0aW9uIGdldElucHV0RXhjZXJwdChpbnB1dCwgcG9zLCBsZW4pIHtcbiAgdmFyIGV4Y2VycHQgPSBhc0VzY2FwZWRTdHJpbmcoaW5wdXQuc2xpY2UocG9zLCBwb3MgKyBsZW4pKTtcblxuICAvLyBQYWQgdGhlIG91dHB1dCBpZiBuZWNlc3NhcnkuXG4gIGlmIChleGNlcnB0Lmxlbmd0aCA8IGxlbikge1xuICAgIHJldHVybiBleGNlcnB0ICsgY29tbW9uLnJlcGVhdCgnICcsIGxlbiAtIGV4Y2VycHQubGVuZ3RoKS5qb2luKCcnKTtcbiAgfVxuICByZXR1cm4gZXhjZXJwdDtcbn1cblxuZnVuY3Rpb24gYXNFc2NhcGVkU3RyaW5nKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBSZXBsYWNlIG5vbi1wcmludGFibGUgY2hhcmFjdGVycyB3aXRoIHZpc2libGUgc3ltYm9scy5cbiAgICByZXR1cm4gb2JqXG4gICAgICAgIC5yZXBsYWNlKC8gL2csIERPVF9PUEVSQVRPUilcbiAgICAgICAgLnJlcGxhY2UoL1xcdC9nLCBTWU1CT0xfRk9SX0hPUklaT05UQUxfVEFCVUxBVElPTilcbiAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCBTWU1CT0xfRk9SX0xJTkVfRkVFRClcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nLCBTWU1CT0xfRk9SX0NBUlJJQUdFX1JFVFVSTik7XG4gIH1cbiAgcmV0dXJuIFN0cmluZyhvYmopO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBUcmFjZSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBUcmFjZShpbnB1dCwgcG9zMSwgcG9zMiwgZXhwciwgc3VjY2VlZGVkLCBiaW5kaW5ncywgb3B0Q2hpbGRyZW4pIHtcbiAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICB0aGlzLnBvcyA9IHRoaXMucG9zMSA9IHBvczE7XG4gIHRoaXMucG9zMiA9IHBvczI7XG4gIHRoaXMuc291cmNlID0gbmV3IEludGVydmFsKGlucHV0LCBwb3MxLCBwb3MyKTtcbiAgdGhpcy5leHByID0gZXhwcjtcbiAgdGhpcy5iaW5kaW5ncyA9IGJpbmRpbmdzO1xuICB0aGlzLmNoaWxkcmVuID0gb3B0Q2hpbGRyZW4gfHwgW107XG4gIHRoaXMudGVybWluYXRpbmdMUkVudHJ5ID0gbnVsbDtcblxuICB0aGlzLl9mbGFncyA9IHN1Y2NlZWRlZCA/IEZsYWdzLnN1Y2NlZWRlZCA6IDA7XG59XG5cbi8vIEEgdmFsdWUgdGhhdCBjYW4gYmUgcmV0dXJuZWQgZnJvbSB2aXNpdG9yIGZ1bmN0aW9ucyB0byBpbmRpY2F0ZSB0aGF0IGFcbi8vIG5vZGUgc2hvdWxkIG5vdCBiZSByZWN1cnNlZCBpbnRvLlxuVHJhY2UucHJvdG90eXBlLlNLSVAgPSB7fTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYWNlLnByb3RvdHlwZSwgJ2Rpc3BsYXlTdHJpbmcnLCB7XG4gIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmV4cHIudG9EaXNwbGF5U3RyaW5nKCk7IH1cbn0pO1xuXG4vLyBGb3IgY29udmVuaWVuY2UsIGNyZWF0ZSBhIGdldHRlciBhbmQgc2V0dGVyIGZvciB0aGUgYm9vbGVhbiBmbGFncyBpbiBgRmxhZ3NgLlxuT2JqZWN0LmtleXMoRmxhZ3MpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICB2YXIgbWFzayA9IEZsYWdzW25hbWVdO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVHJhY2UucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZmxhZ3MgJiBtYXNrKSAhPT0gMDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZsYWdzIHw9IG1hc2s7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mbGFncyAmPSB+bWFzaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cblRyYWNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jbG9uZVdpdGhFeHByKHRoaXMuZXhwcik7XG59O1xuXG5UcmFjZS5wcm90b3R5cGUuY2xvbmVXaXRoRXhwciA9IGZ1bmN0aW9uKGV4cHIpIHtcbiAgdmFyIGFucyA9IG5ldyBUcmFjZShcbiAgICAgIHRoaXMuaW5wdXQsIHRoaXMucG9zLCB0aGlzLnBvczIsIGV4cHIsIHRoaXMuc3VjY2VlZGVkLCB0aGlzLmJpbmRpbmdzLCB0aGlzLmNoaWxkcmVuKTtcblxuICBhbnMuaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uID0gdGhpcy5pc0hlYWRPZkxlZnRSZWN1cnNpb247XG4gIGFucy5pc0ltcGxpY2l0U3BhY2VzID0gdGhpcy5pc0ltcGxpY2l0U3BhY2VzO1xuICBhbnMuaXNNZW1vaXplZCA9IHRoaXMuaXNNZW1vaXplZDtcbiAgYW5zLmlzUm9vdE5vZGUgPSB0aGlzLmlzUm9vdE5vZGU7XG4gIGFucy50ZXJtaW5hdGVzTFIgPSB0aGlzLnRlcm1pbmF0ZXNMUjtcbiAgYW5zLnRlcm1pbmF0aW5nTFJFbnRyeSA9IHRoaXMudGVybWluYXRpbmdMUkVudHJ5O1xuICByZXR1cm4gYW5zO1xufTtcblxuLy8gUmVjb3JkIHRoZSB0cmFjZSBpbmZvcm1hdGlvbiBmb3IgdGhlIHRlcm1pbmF0aW5nIGNvbmRpdGlvbiBvZiB0aGUgTFIgbG9vcC5cblRyYWNlLnByb3RvdHlwZS5yZWNvcmRMUlRlcm1pbmF0aW9uID0gZnVuY3Rpb24ocnVsZUJvZHlUcmFjZSwgdmFsdWUpIHtcbiAgdGhpcy50ZXJtaW5hdGluZ0xSRW50cnkgPVxuICAgICAgbmV3IFRyYWNlKHRoaXMuaW5wdXQsIHRoaXMucG9zLCB0aGlzLnBvczIsIHRoaXMuZXhwciwgZmFsc2UsIFt2YWx1ZV0sIFtydWxlQm9keVRyYWNlXSk7XG4gIHRoaXMudGVybWluYXRpbmdMUkVudHJ5LnRlcm1pbmF0ZXNMUiA9IHRydWU7XG59O1xuXG4vLyBSZWN1cnNpdmVseSB0cmF2ZXJzZSB0aGlzIHRyYWNlIG5vZGUgYW5kIGFsbCBpdHMgZGVzY2VuZGVudHMsIGNhbGxpbmcgYSB2aXNpdG9yIGZ1bmN0aW9uXG4vLyBmb3IgZWFjaCBub2RlIHRoYXQgaXMgdmlzaXRlZC4gSWYgYHZpc3Rvck9iak9yRm5gIGlzIGFuIG9iamVjdCwgdGhlbiBpdHMgJ2VudGVyJyBwcm9wZXJ0eVxuLy8gaXMgYSBmdW5jdGlvbiB0byBjYWxsIGJlZm9yZSB2aXNpdGluZyB0aGUgY2hpbGRyZW4gb2YgYSBub2RlLCBhbmQgaXRzICdleGl0JyBwcm9wZXJ0eSBpc1xuLy8gYSBmdW5jdGlvbiB0byBjYWxsIGFmdGVyd2FyZHMuIElmIGB2aXNpdG9yT2JqT3JGbmAgaXMgYSBmdW5jdGlvbiwgaXQgcmVwcmVzZW50cyB0aGUgJ2VudGVyJ1xuLy8gZnVuY3Rpb24uXG4vL1xuLy8gVGhlIGZ1bmN0aW9ucyBhcmUgY2FsbGVkIHdpdGggdGhyZWUgYXJndW1lbnRzOiB0aGUgVHJhY2Ugbm9kZSwgaXRzIHBhcmVudCBUcmFjZSwgYW5kIGEgbnVtYmVyXG4vLyByZXByZXNlbnRpbmcgdGhlIGRlcHRoIG9mIHRoZSBub2RlIGluIHRoZSB0cmVlLiAoVGhlIHJvb3Qgbm9kZSBoYXMgZGVwdGggMC4pIGBvcHRUaGlzQXJnYCwgaWZcbi8vIHNwZWNpZmllZCwgaXMgdGhlIHZhbHVlIHRvIHVzZSBmb3IgYHRoaXNgIHdoZW4gZXhlY3V0aW5nIHRoZSB2aXNpdG9yIGZ1bmN0aW9ucy5cblRyYWNlLnByb3RvdHlwZS53YWxrID0gZnVuY3Rpb24odmlzaXRvck9iak9yRm4sIG9wdFRoaXNBcmcpIHtcbiAgdmFyIHZpc2l0b3IgPSB2aXNpdG9yT2JqT3JGbjtcbiAgaWYgKHR5cGVvZiB2aXNpdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmlzaXRvciA9IHtlbnRlcjogdmlzaXRvcn07XG4gIH1cblxuICBmdW5jdGlvbiBfd2Fsayhub2RlLCBwYXJlbnQsIGRlcHRoKSB7XG4gICAgdmFyIHJlY3Vyc2UgPSB0cnVlO1xuICAgIGlmICh2aXNpdG9yLmVudGVyKSB7XG4gICAgICBpZiAodmlzaXRvci5lbnRlci5jYWxsKG9wdFRoaXNBcmcsIG5vZGUsIHBhcmVudCwgZGVwdGgpID09PSBUcmFjZS5wcm90b3R5cGUuU0tJUCkge1xuICAgICAgICByZWN1cnNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZWN1cnNlKSB7XG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgX3dhbGsoY2hpbGQsIG5vZGUsIGRlcHRoICsgMSk7XG4gICAgICB9KTtcbiAgICAgIGlmICh2aXNpdG9yLmV4aXQpIHtcbiAgICAgICAgdmlzaXRvci5leGl0LmNhbGwob3B0VGhpc0FyZywgbm9kZSwgcGFyZW50LCBkZXB0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh0aGlzLmlzUm9vdE5vZGUpIHtcbiAgICAvLyBEb24ndCB2aXNpdCB0aGUgcm9vdCBub2RlIGl0c2VsZiwgb25seSBpdHMgY2hpbGRyZW4uXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGMpIHsgX3dhbGsoYywgbnVsbCwgMCk7IH0pO1xuICB9IGVsc2Uge1xuICAgIF93YWxrKHRoaXMsIG51bGwsIDApO1xuICB9XG59O1xuXG4vLyBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyYWNlLlxuLy8gU2FtcGxlOlxuLy8gICAgIDEy4ouFK+KLhTLii4Uq4ouFMyDinJMgZXhwIOKHkiAgXCIxMlwiXG4vLyAgICAgMTLii4Ur4ouFMuKLhSrii4UzICAg4pyTIGFkZEV4cCAoTFIpIOKHkiAgXCIxMlwiXG4vLyAgICAgMTLii4Ur4ouFMuKLhSrii4UzICAgICAgIOKclyBhZGRFeHBfcGx1c1xuVHJhY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gIHRoaXMud2FsayhmdW5jdGlvbihub2RlLCBwYXJlbnQsIGRlcHRoKSB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5TS0lQO1xuICAgIH1cbiAgICB2YXIgY3Rvck5hbWUgPSBub2RlLmV4cHIuY29uc3RydWN0b3IubmFtZTtcbiAgICAvLyBEb24ndCBwcmludCBhbnl0aGluZyBmb3IgQWx0IG5vZGVzLlxuICAgIGlmIChjdG9yTmFtZSA9PT0gJ0FsdCcpIHtcbiAgICAgIHJldHVybjsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgICB9XG4gICAgc2IuYXBwZW5kKGdldElucHV0RXhjZXJwdChub2RlLmlucHV0LCBub2RlLnBvcywgMTApICsgc3BhY2VzKGRlcHRoICogMiArIDEpKTtcbiAgICBzYi5hcHBlbmQoKG5vZGUuc3VjY2VlZGVkID8gQ0hFQ0tfTUFSSyA6IEJBTExPVF9YKSArICcgJyArIG5vZGUuZGlzcGxheVN0cmluZyk7XG4gICAgaWYgKG5vZGUuaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uKSB7XG4gICAgICBzYi5hcHBlbmQoJyAoTFIpJyk7XG4gICAgfVxuICAgIGlmIChub2RlLnN1Y2NlZWRlZCkge1xuICAgICAgdmFyIGNvbnRlbnRzID0gYXNFc2NhcGVkU3RyaW5nKG5vZGUuc291cmNlLmNvbnRlbnRzKTtcbiAgICAgIHNiLmFwcGVuZCgnICcgKyBSSUdIVFdBUkRTX0RPVUJMRV9BUlJPVyArICcgICcpO1xuICAgICAgc2IuYXBwZW5kKHR5cGVvZiBjb250ZW50cyA9PT0gJ3N0cmluZycgPyAnXCInICsgY29udGVudHMgKyAnXCInIDogY29udGVudHMpO1xuICAgIH1cbiAgICBzYi5hcHBlbmQoJ1xcbicpO1xuICB9LmJpbmQodGhpcykpO1xuICByZXR1cm4gc2IuY29udGVudHMoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3V0aWwtZXh0ZW5kJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIFN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBIZWxwZXJzXG5cbnZhciBlc2NhcGVTdHJpbmdGb3IgPSB7fTtcbmZvciAodmFyIGMgPSAwOyBjIDwgMTI4OyBjKyspIHtcbiAgZXNjYXBlU3RyaW5nRm9yW2NdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbn1cbmVzY2FwZVN0cmluZ0ZvcltcIidcIi5jaGFyQ29kZUF0KDApXSA9IFwiXFxcXCdcIjtcbmVzY2FwZVN0cmluZ0ZvclsnXCInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxcIic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcXFwnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxcXFxcJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxiJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcYic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcZicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXGYnO1xuZXNjYXBlU3RyaW5nRm9yWydcXG4nLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxuJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxyJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxccic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcdCcuY2hhckNvZGVBdCgwKV0gPSAnXFxcXHQnO1xuZXNjYXBlU3RyaW5nRm9yWydcXHUwMDBiJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcdic7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLmFic3RyYWN0ID0gZnVuY3Rpb24ob3B0TWV0aG9kTmFtZSkge1xuICB2YXIgbWV0aG9kTmFtZSA9IG9wdE1ldGhvZE5hbWUgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAndGhpcyBtZXRob2QgJyArIG1ldGhvZE5hbWUgKyAnIGlzIGFic3RyYWN0ISAnICtcbiAgICAgICcoaXQgaGFzIG5vIGltcGxlbWVudGF0aW9uIGluIGNsYXNzICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnKScpO1xuICB9O1xufTtcblxuZXhwb3J0cy5hc3NlcnQgPSBmdW5jdGlvbihjb25kLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxufTtcblxuLy8gRGVmaW5lIGEgbGF6aWx5LWNvbXB1dGVkLCBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lZCBgcHJvcE5hbWVgXG4vLyBvbiB0aGUgb2JqZWN0IGBvYmpgLiBgZ2V0dGVyRm5gIHdpbGwgYmUgY2FsbGVkIHRvIGNvbXB1dGUgdGhlIHZhbHVlIHRoZVxuLy8gZmlyc3QgdGltZSB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWQuXG5leHBvcnRzLmRlZmluZUxhenlQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcE5hbWUsIGdldHRlckZuKSB7XG4gIHZhciBtZW1vO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wTmFtZSwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIW1lbW8pIHtcbiAgICAgICAgbWVtbyA9IGdldHRlckZuLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0cy5jbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xuICBpZiAob2JqKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgb2JqKTtcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5leHRlbmQgPSBleHRlbmQ7XG5cbmV4cG9ydHMucmVwZWF0Rm4gPSBmdW5jdGlvbihmbiwgbikge1xuICB2YXIgYXJyID0gW107XG4gIHdoaWxlIChuLS0gPiAwKSB7XG4gICAgYXJyLnB1c2goZm4oKSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbmV4cG9ydHMucmVwZWF0U3RyID0gZnVuY3Rpb24oc3RyLCBuKSB7XG4gIHJldHVybiBuZXcgQXJyYXkobiArIDEpLmpvaW4oc3RyKTtcbn07XG5cbmV4cG9ydHMucmVwZWF0ID0gZnVuY3Rpb24oeCwgbikge1xuICByZXR1cm4gZXhwb3J0cy5yZXBlYXRGbihmdW5jdGlvbigpIHsgcmV0dXJuIHg7IH0sIG4pO1xufTtcblxuZXhwb3J0cy5nZXREdXBsaWNhdGVzID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgdmFyIGR1cGxpY2F0ZXMgPSBbXTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJyYXkubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciB4ID0gYXJyYXlbaWR4XTtcbiAgICBpZiAoYXJyYXkubGFzdEluZGV4T2YoeCkgIT09IGlkeCAmJiBkdXBsaWNhdGVzLmluZGV4T2YoeCkgPCAwKSB7XG4gICAgICBkdXBsaWNhdGVzLnB1c2goeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkdXBsaWNhdGVzO1xufTtcblxuZXhwb3J0cy5jb3B5V2l0aG91dER1cGxpY2F0ZXMgPSBmdW5jdGlvbihhcnJheSkge1xuICB2YXIgbm9EdXBsaWNhdGVzID0gW107XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICBpZiAobm9EdXBsaWNhdGVzLmluZGV4T2YoZW50cnkpIDwgMCkge1xuICAgICAgbm9EdXBsaWNhdGVzLnB1c2goZW50cnkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBub0R1cGxpY2F0ZXM7XG59O1xuXG5leHBvcnRzLmlzU3ludGFjdGljID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdmFyIGZpcnN0Q2hhciA9IHJ1bGVOYW1lWzBdO1xuICByZXR1cm4gZmlyc3RDaGFyID09PSBmaXJzdENoYXIudG9VcHBlckNhc2UoKTtcbn07XG5cbmV4cG9ydHMuaXNMZXhpY2FsID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgcmV0dXJuICFleHBvcnRzLmlzU3ludGFjdGljKHJ1bGVOYW1lKTtcbn07XG5cbmV4cG9ydHMucGFkTGVmdCA9IGZ1bmN0aW9uKHN0ciwgbGVuLCBvcHRDaGFyKSB7XG4gIHZhciBjaCA9IG9wdENoYXIgfHwgJyAnO1xuICBpZiAoc3RyLmxlbmd0aCA8IGxlbikge1xuICAgIHJldHVybiBleHBvcnRzLnJlcGVhdFN0cihjaCwgbGVuIC0gc3RyLmxlbmd0aCkgKyBzdHI7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cbi8vIFN0cmluZ0J1ZmZlclxuXG5leHBvcnRzLlN0cmluZ0J1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0cmluZ3MgPSBbXTtcbn07XG5cbmV4cG9ydHMuU3RyaW5nQnVmZmVyLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihzdHIpIHtcbiAgdGhpcy5zdHJpbmdzLnB1c2goc3RyKTtcbn07XG5cbmV4cG9ydHMuU3RyaW5nQnVmZmVyLnByb3RvdHlwZS5jb250ZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdHJpbmdzLmpvaW4oJycpO1xufTtcblxuLy8gQ2hhcmFjdGVyIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nXG5cbmV4cG9ydHMuZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKGMsIG9wdERlbGltKSB7XG4gIHZhciBjaGFyQ29kZSA9IGMuY2hhckNvZGVBdCgwKTtcbiAgaWYgKChjID09PSAnXCInIHx8IGMgPT09IFwiJ1wiKSAmJiBvcHREZWxpbSAmJiBjICE9PSBvcHREZWxpbSkge1xuICAgIHJldHVybiBjO1xuICB9IGVsc2UgaWYgKGNoYXJDb2RlIDwgMTI4KSB7XG4gICAgcmV0dXJuIGVzY2FwZVN0cmluZ0ZvcltjaGFyQ29kZV07XG4gIH0gZWxzZSBpZiAoMTI4IDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDwgMjU2KSB7XG4gICAgcmV0dXJuICdcXFxceCcgKyBleHBvcnRzLnBhZExlZnQoY2hhckNvZGUudG9TdHJpbmcoMTYpLCAyLCAnMCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnXFxcXHUnICsgZXhwb3J0cy5wYWRMZWZ0KGNoYXJDb2RlLnRvU3RyaW5nKDE2KSwgNCwgJzAnKTtcbiAgfVxufTtcblxuZXhwb3J0cy51bmVzY2FwZUNoYXIgPSBmdW5jdGlvbihzKSB7XG4gIGlmIChzLmNoYXJBdCgwKSA9PT0gJ1xcXFwnKSB7XG4gICAgc3dpdGNoIChzLmNoYXJBdCgxKSkge1xuICAgICAgY2FzZSAnYic6IHJldHVybiAnXFxiJztcbiAgICAgIGNhc2UgJ2YnOiByZXR1cm4gJ1xcZic7XG4gICAgICBjYXNlICduJzogcmV0dXJuICdcXG4nO1xuICAgICAgY2FzZSAncic6IHJldHVybiAnXFxyJztcbiAgICAgIGNhc2UgJ3QnOiByZXR1cm4gJ1xcdCc7XG4gICAgICBjYXNlICd2JzogcmV0dXJuICdcXHYnO1xuICAgICAgY2FzZSAneCc6IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHMuc3Vic3RyaW5nKDIsIDQpLCAxNikpO1xuICAgICAgY2FzZSAndSc6IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHMuc3Vic3RyaW5nKDIsIDYpLCAxNikpO1xuICAgICAgZGVmYXVsdDogcmV0dXJuIHMuY2hhckF0KDEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcztcbiAgfVxufTtcblxuLy8gSGVscGVyIGZvciBwcm9kdWNpbmcgYSBkZXNjcmlwdGlvbiBvZiBhbiB1bmtub3duIG9iamVjdCBpbiBhIHNhZmUgd2F5LlxuLy8gRXNwZWNpYWxseSB1c2VmdWwgZm9yIGVycm9yIG1lc3NhZ2VzIHdoZXJlIGFuIHVuZXhwZWN0ZWQgdHlwZSBvZiBvYmplY3Qgd2FzIGVuY291bnRlcmVkLlxuZXhwb3J0cy51bmV4cGVjdGVkT2JqVG9TdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICB9XG4gIHZhciBiYXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbiAgdHJ5IHtcbiAgICB2YXIgdHlwZU5hbWU7XG4gICAgaWYgKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgdHlwZU5hbWUgPSBvYmouY29uc3RydWN0b3IubmFtZTtcbiAgICB9IGVsc2UgaWYgKGJhc2VUb1N0cmluZy5pbmRleE9mKCdbb2JqZWN0ICcpID09PSAwKSB7XG4gICAgICB0eXBlTmFtZSA9IGJhc2VUb1N0cmluZy5zbGljZSg4LCAtMSk7ICAvLyBFeHRyYWN0IGUuZy4gXCJBcnJheVwiIGZyb20gXCJbb2JqZWN0IEFycmF5XVwiLlxuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlTmFtZSA9IHR5cGVvZiBvYmo7XG4gICAgfVxuICAgIHJldHVybiB0eXBlTmFtZSArICc6ICcgKyBKU09OLnN0cmluZ2lmeShTdHJpbmcob2JqKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gYmFzZVRvU3RyaW5nO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbnZhciBOYW1lc3BhY2UgPSByZXF1aXJlKCcuL05hbWVzcGFjZScpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgb3B0SW50ZXJ2YWwpIHtcbiAgdmFyIGU7XG4gIGlmIChvcHRJbnRlcnZhbCkge1xuICAgIGUgPSBuZXcgRXJyb3Iob3B0SW50ZXJ2YWwuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2UoKSArIG1lc3NhZ2UpO1xuICAgIGUuc2hvcnRNZXNzYWdlID0gbWVzc2FnZTtcbiAgICBlLmludGVydmFsID0gb3B0SW50ZXJ2YWw7XG4gIH0gZWxzZSB7XG4gICAgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gZXJyb3JzIGFib3V0IGludGVydmFscyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBpbnRlcnZhbFNvdXJjZXNEb250TWF0Y2goKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcIkludGVydmFsIHNvdXJjZXMgZG9uJ3QgbWF0Y2hcIik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGVycm9ycyBhYm91dCBncmFtbWFycyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBHcmFtbWFyIHN5bnRheCBlcnJvclxuXG5mdW5jdGlvbiBncmFtbWFyU3ludGF4RXJyb3IobWF0Y2hGYWlsdXJlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnbWVzc2FnZScsIHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbWF0Y2hGYWlsdXJlLm1lc3NhZ2U7IH19KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsICdzaG9ydE1lc3NhZ2UnLCB7Z2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBtYXRjaEZhaWx1cmUuZ2V0RXhwZWN0ZWRUZXh0KCk7XG4gIH19KTtcbiAgZS5pbnRlcnZhbCA9IG1hdGNoRmFpbHVyZS5nZXRJbnRlcnZhbCgpO1xuICByZXR1cm4gZTtcbn1cblxuLy8gVW5kZWNsYXJlZCBncmFtbWFyXG5cbmZ1bmN0aW9uIHVuZGVjbGFyZWRHcmFtbWFyKGdyYW1tYXJOYW1lLCBuYW1lc3BhY2UsIGludGVydmFsKSB7XG4gIHZhciBtZXNzYWdlID0gbmFtZXNwYWNlID9cbiAgICAgICdHcmFtbWFyICcgKyBncmFtbWFyTmFtZSArICcgaXMgbm90IGRlY2xhcmVkIGluIG5hbWVzcGFjZSAnICsgTmFtZXNwYWNlLnRvU3RyaW5nKG5hbWVzcGFjZSkgOlxuICAgICAgJ1VuZGVjbGFyZWQgZ3JhbW1hciAnICsgZ3JhbW1hck5hbWU7XG4gIHJldHVybiBjcmVhdGVFcnJvcihtZXNzYWdlLCBpbnRlcnZhbCk7XG59XG5cbi8vIER1cGxpY2F0ZSBncmFtbWFyIGRlY2xhcmF0aW9uXG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbihncmFtbWFyLCBuYW1lc3BhY2UpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKCdHcmFtbWFyICcgKyBncmFtbWFyLm5hbWUgKyAnIGlzIGFscmVhZHkgZGVjbGFyZWQgaW4gdGhpcyBuYW1lc3BhY2UnKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gcnVsZXMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVW5kZWNsYXJlZCBydWxlXG5cbmZ1bmN0aW9uIHVuZGVjbGFyZWRSdWxlKHJ1bGVOYW1lLCBncmFtbWFyTmFtZSwgb3B0SW50ZXJ2YWwpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ1J1bGUgJyArIHJ1bGVOYW1lICsgJyBpcyBub3QgZGVjbGFyZWQgaW4gZ3JhbW1hciAnICsgZ3JhbW1hck5hbWUsXG4gICAgICBvcHRJbnRlcnZhbCk7XG59XG5cbi8vIENhbm5vdCBvdmVycmlkZSB1bmRlY2xhcmVkIHJ1bGVcblxuZnVuY3Rpb24gY2Fubm90T3ZlcnJpZGVVbmRlY2xhcmVkUnVsZShydWxlTmFtZSwgZ3JhbW1hck5hbWUsIG9wdFNvdXJjZSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnQ2Fubm90IG92ZXJyaWRlIHJ1bGUgJyArIHJ1bGVOYW1lICsgJyBiZWNhdXNlIGl0IGlzIG5vdCBkZWNsYXJlZCBpbiAnICsgZ3JhbW1hck5hbWUsXG4gICAgICBvcHRTb3VyY2UpO1xufVxuXG4vLyBDYW5ub3QgZXh0ZW5kIHVuZGVjbGFyZWQgcnVsZVxuXG5mdW5jdGlvbiBjYW5ub3RFeHRlbmRVbmRlY2xhcmVkUnVsZShydWxlTmFtZSwgZ3JhbW1hck5hbWUsIG9wdFNvdXJjZSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnQ2Fubm90IGV4dGVuZCBydWxlICcgKyBydWxlTmFtZSArICcgYmVjYXVzZSBpdCBpcyBub3QgZGVjbGFyZWQgaW4gJyArIGdyYW1tYXJOYW1lLFxuICAgICAgb3B0U291cmNlKTtcbn1cblxuLy8gRHVwbGljYXRlIHJ1bGUgZGVjbGFyYXRpb25cblxuZnVuY3Rpb24gZHVwbGljYXRlUnVsZURlY2xhcmF0aW9uKHJ1bGVOYW1lLCBncmFtbWFyTmFtZSwgZGVjbEdyYW1tYXJOYW1lLCBvcHRTb3VyY2UpIHtcbiAgdmFyIG1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBkZWNsYXJhdGlvbiBmb3IgcnVsZSAnXCIgKyBydWxlTmFtZSArXG4gICAgICBcIicgaW4gZ3JhbW1hciAnXCIgKyBncmFtbWFyTmFtZSArIFwiJ1wiO1xuICBpZiAoZ3JhbW1hck5hbWUgIT09IGRlY2xHcmFtbWFyTmFtZSkge1xuICAgIG1lc3NhZ2UgKz0gXCIgKG9yaWdpbmFsbHkgZGVjbGFyZWQgaW4gJ1wiICsgZGVjbEdyYW1tYXJOYW1lICsgXCInKVwiO1xuICB9XG4gIHJldHVybiBjcmVhdGVFcnJvcihtZXNzYWdlLCBvcHRTb3VyY2UpO1xufVxuXG4vLyBXcm9uZyBudW1iZXIgb2YgcGFyYW1ldGVyc1xuXG5mdW5jdGlvbiB3cm9uZ051bWJlck9mUGFyYW1ldGVycyhydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgc291cmNlKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdXcm9uZyBudW1iZXIgb2YgcGFyYW1ldGVycyBmb3IgcnVsZSAnICsgcnVsZU5hbWUgK1xuICAgICAgICAgICcgKGV4cGVjdGVkICcgKyBleHBlY3RlZCArICcsIGdvdCAnICsgYWN0dWFsICsgJyknLFxuICAgICAgc291cmNlKTtcbn1cblxuLy8gV3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50c1xuXG5mdW5jdGlvbiB3cm9uZ051bWJlck9mQXJndW1lbnRzKHJ1bGVOYW1lLCBleHBlY3RlZCwgYWN0dWFsLCBleHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdXcm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIGZvciBydWxlICcgKyBydWxlTmFtZSArXG4gICAgICAgICAgJyAoZXhwZWN0ZWQgJyArIGV4cGVjdGVkICsgJywgZ290ICcgKyBhY3R1YWwgKyAnKScsXG4gICAgICBleHByLnNvdXJjZSk7XG59XG5cbi8vIER1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXNcblxuZnVuY3Rpb24gZHVwbGljYXRlUGFyYW1ldGVyTmFtZXMocnVsZU5hbWUsIGR1cGxpY2F0ZXMsIHNvdXJjZSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnRHVwbGljYXRlIHBhcmFtZXRlciBuYW1lcyBpbiBydWxlICcgKyBydWxlTmFtZSArICc6ICcgKyBkdXBsaWNhdGVzLmpvaW4oJywgJyksXG4gICAgICBzb3VyY2UpO1xufVxuXG4vLyBJbnZhbGlkIHBhcmFtZXRlciBleHByZXNzaW9uXG5cbmZ1bmN0aW9uIGludmFsaWRQYXJhbWV0ZXIocnVsZU5hbWUsIGV4cHIpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0ludmFsaWQgcGFyYW1ldGVyIHRvIHJ1bGUgJyArIHJ1bGVOYW1lICsgJzogJyArIGV4cHIgKyAnIGhhcyBhcml0eSAnICsgZXhwci5nZXRBcml0eSgpICtcbiAgICAgICAgICcsIGJ1dCBwYXJhbWV0ZXIgZXhwcmVzc2lvbnMgbXVzdCBoYXZlIGFyaXR5IDEnLFxuICAgICAgZXhwci5zb3VyY2UpO1xufVxuXG4vLyBBcHBsaWNhdGlvbiBvZiBzeW50YWN0aWMgcnVsZSBmcm9tIGxleGljYWwgcnVsZVxuXG5mdW5jdGlvbiBhcHBsaWNhdGlvbk9mU3ludGFjdGljUnVsZUZyb21MZXhpY2FsQ29udGV4dChydWxlTmFtZSwgYXBwbHlFeHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdDYW5ub3QgYXBwbHkgc3ludGFjdGljIHJ1bGUgJyArIHJ1bGVOYW1lICsgJyBmcm9tIGhlcmUgKGluc2lkZSBhIGxleGljYWwgY29udGV4dCknLFxuICAgICAgYXBwbHlFeHByLnNvdXJjZSk7XG59XG5cbi8vIEluY29ycmVjdCBhcmd1bWVudCB0eXBlXG5cbmZ1bmN0aW9uIGluY29ycmVjdEFyZ3VtZW50VHlwZShleHBlY3RlZFR5cGUsIGV4cHIpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKCdJbmNvcnJlY3QgYXJndW1lbnQgdHlwZTogZXhwZWN0ZWQgJyArIGV4cGVjdGVkVHlwZSwgZXhwci5zb3VyY2UpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBLbGVlbmUgb3BlcmF0b3JzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGtsZWVuZUV4cHJIYXNOdWxsYWJsZU9wZXJhbmQoa2xlZW5lRXhwciwgYXBwbGljYXRpb25TdGFjaykge1xuICB2YXIgYWN0dWFscyA9IGFwcGxpY2F0aW9uU3RhY2subGVuZ3RoID4gMCA/XG4gICAgYXBwbGljYXRpb25TdGFja1thcHBsaWNhdGlvblN0YWNrLmxlbmd0aCAtIDFdLmFyZ3MgOlxuICAgIFtdO1xuICB2YXIgZXhwciA9IGtsZWVuZUV4cHIuZXhwci5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpO1xuICB2YXIgbWVzc2FnZSA9XG4gICAgJ051bGxhYmxlIGV4cHJlc3Npb24gJyArIGV4cHIgKyBcIiBpcyBub3QgYWxsb3dlZCBpbnNpZGUgJ1wiICtcbiAgICBrbGVlbmVFeHByLm9wZXJhdG9yICsgXCInIChwb3NzaWJsZSBpbmZpbml0ZSBsb29wKVwiO1xuICBpZiAoYXBwbGljYXRpb25TdGFjay5sZW5ndGggPiAwKSB7XG4gICAgdmFyIHN0YWNrVHJhY2UgPSBhcHBsaWNhdGlvblN0YWNrXG4gICAgICAubWFwKGZ1bmN0aW9uKGFwcCkgeyByZXR1cm4gbmV3IHBleHBycy5BcHBseShhcHAucnVsZU5hbWUsIGFwcC5hcmdzKTsgfSlcbiAgICAgIC5qb2luKCdcXG4nKTtcbiAgICBtZXNzYWdlICs9ICdcXG5BcHBsaWNhdGlvbiBzdGFjayAobW9zdCByZWNlbnQgYXBwbGljYXRpb24gbGFzdCk6XFxuJyArIHN0YWNrVHJhY2U7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGtsZWVuZUV4cHIuZXhwci5zb3VyY2UpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBhcml0eSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBpbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgZXhwcikge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnUnVsZSAnICsgcnVsZU5hbWUgKyAnIGludm9sdmVzIGFuIGFsdGVybmF0aW9uIHdoaWNoIGhhcyBpbmNvbnNpc3RlbnQgYXJpdHkgJyArXG4gICAgICAgICAgJyhleHBlY3RlZCAnICsgZXhwZWN0ZWQgKyAnLCBnb3QgJyArIGFjdHVhbCArICcpJyxcbiAgICAgIGV4cHIuc291cmNlKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gcHJvcGVydGllcyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBkdXBsaWNhdGVQcm9wZXJ0eU5hbWVzKGR1cGxpY2F0ZXMpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKCdPYmplY3QgcGF0dGVybiBoYXMgZHVwbGljYXRlIHByb3BlcnR5IG5hbWVzOiAnICsgZHVwbGljYXRlcy5qb2luKCcsICcpKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gY29uc3RydWN0b3JzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGludmFsaWRDb25zdHJ1Y3RvckNhbGwoZ3JhbW1hciwgY3Rvck5hbWUsIGNoaWxkcmVuKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdBdHRlbXB0IHRvIGludm9rZSBjb25zdHJ1Y3RvciAnICsgY3Rvck5hbWUgKyAnIHdpdGggaW52YWxpZCBvciB1bmV4cGVjdGVkIGFyZ3VtZW50cycpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBjb252ZW5pZW5jZSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBtdWx0aXBsZUVycm9ycyhlcnJvcnMpIHtcbiAgdmFyIG1lc3NhZ2VzID0gZXJyb3JzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLm1lc3NhZ2U7IH0pO1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICBbJ0Vycm9yczonXS5jb25jYXQobWVzc2FnZXMpLmpvaW4oJ1xcbi0gJyksXG4gICAgICBlcnJvcnNbMF0uaW50ZXJ2YWwpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBzZW1hbnRpYyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBtaXNzaW5nU2VtYW50aWNBY3Rpb24oY3Rvck5hbWUsIG5hbWUsIHR5cGUsIHN0YWNrKSB7XG4gIHZhciBzdGFja1RyYWNlID0gc3RhY2suc2xpY2UoMCwgLTEpLm1hcChmdW5jdGlvbihpbmZvKSB7XG4gICAgdmFyIGFucyA9ICcgICcgKyBpbmZvWzBdLm5hbWUgKyAnID4gJyArIGluZm9bMV07XG4gICAgcmV0dXJuIGluZm8ubGVuZ3RoID09PSAzXG4gICAgICAgID8gYW5zICsgXCIgZm9yICdcIiArIGluZm9bMl0gKyBcIidcIlxuICAgICAgICA6IGFucztcbiAgfSkuam9pbignXFxuJyk7XG4gIHN0YWNrVHJhY2UgKz0gJ1xcbiAgJyArIG5hbWUgKyAnID4gJyArIGN0b3JOYW1lO1xuXG4gIHZhciB3aGVyZSA9IHR5cGUgKyBcIiAnXCIgKyBuYW1lICsgXCInXCI7XG4gIHZhciBtZXNzYWdlID0gXCJNaXNzaW5nIHNlbWFudGljIGFjdGlvbiBmb3IgJ1wiICsgY3Rvck5hbWUgKyBcIicgaW4gXCIgKyB3aGVyZSArICdcXG4nICtcbiAgICAgICAgICAgICAgICAnQWN0aW9uIHN0YWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxcbicgKyBzdGFja1RyYWNlO1xuXG4gIHZhciBlID0gY3JlYXRlRXJyb3IobWVzc2FnZSk7XG4gIGUubmFtZSA9ICdtaXNzaW5nU2VtYW50aWNBY3Rpb24nO1xuICByZXR1cm4gZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhcHBsaWNhdGlvbk9mU3ludGFjdGljUnVsZUZyb21MZXhpY2FsQ29udGV4dDogYXBwbGljYXRpb25PZlN5bnRhY3RpY1J1bGVGcm9tTGV4aWNhbENvbnRleHQsXG4gIGNhbm5vdEV4dGVuZFVuZGVjbGFyZWRSdWxlOiBjYW5ub3RFeHRlbmRVbmRlY2xhcmVkUnVsZSxcbiAgY2Fubm90T3ZlcnJpZGVVbmRlY2xhcmVkUnVsZTogY2Fubm90T3ZlcnJpZGVVbmRlY2xhcmVkUnVsZSxcbiAgZHVwbGljYXRlR3JhbW1hckRlY2xhcmF0aW9uOiBkdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24sXG4gIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzOiBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcyxcbiAgZHVwbGljYXRlUHJvcGVydHlOYW1lczogZHVwbGljYXRlUHJvcGVydHlOYW1lcyxcbiAgZHVwbGljYXRlUnVsZURlY2xhcmF0aW9uOiBkdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24sXG4gIGluY29uc2lzdGVudEFyaXR5OiBpbmNvbnNpc3RlbnRBcml0eSxcbiAgaW5jb3JyZWN0QXJndW1lbnRUeXBlOiBpbmNvcnJlY3RBcmd1bWVudFR5cGUsXG4gIGludGVydmFsU291cmNlc0RvbnRNYXRjaDogaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoLFxuICBpbnZhbGlkQ29uc3RydWN0b3JDYWxsOiBpbnZhbGlkQ29uc3RydWN0b3JDYWxsLFxuICBpbnZhbGlkUGFyYW1ldGVyOiBpbnZhbGlkUGFyYW1ldGVyLFxuICBncmFtbWFyU3ludGF4RXJyb3I6IGdyYW1tYXJTeW50YXhFcnJvcixcbiAga2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZDoga2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZCxcbiAgbWlzc2luZ1NlbWFudGljQWN0aW9uOiBtaXNzaW5nU2VtYW50aWNBY3Rpb24sXG4gIHVuZGVjbGFyZWRHcmFtbWFyOiB1bmRlY2xhcmVkR3JhbW1hcixcbiAgdW5kZWNsYXJlZFJ1bGU6IHVuZGVjbGFyZWRSdWxlLFxuICB3cm9uZ051bWJlck9mQXJndW1lbnRzOiB3cm9uZ051bWJlck9mQXJndW1lbnRzLFxuICB3cm9uZ051bWJlck9mUGFyYW1ldGVyczogd3JvbmdOdW1iZXJPZlBhcmFtZXRlcnMsXG5cbiAgdGhyb3dFcnJvcnM6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aHJvdyBlcnJvcnNbMF07XG4gICAgfVxuICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbXVsdGlwbGVFcnJvcnMoZXJyb3JzKTtcbiAgICB9XG4gIH1cbn07XG4iLCIvKiBnbG9iYWwgZG9jdW1lbnQsIFhNTEh0dHBSZXF1ZXN0ICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBCdWlsZGVyID0gcmVxdWlyZSgnLi9CdWlsZGVyJyk7XG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4vR3JhbW1hcicpO1xudmFyIE5hbWVzcGFjZSA9IHJlcXVpcmUoJy4vTmFtZXNwYWNlJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIHZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24nKTtcblxudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBUaGUgbWV0YWdyYW1tYXIsIGkuZS4gdGhlIGdyYW1tYXIgZm9yIE9obSBncmFtbWFycy4gSW5pdGlhbGl6ZWQgYXQgdGhlXG4vLyBib3R0b20gb2YgdGhpcyBmaWxlIGJlY2F1c2UgbG9hZGluZyB0aGUgZ3JhbW1hciByZXF1aXJlcyBPaG0gaXRzZWxmLlxudmFyIG9obUdyYW1tYXI7XG5cbi8vIEFuIG9iamVjdCB3aGljaCBtYWtlcyBpdCBwb3NzaWJsZSB0byBzdHViIG91dCB0aGUgZG9jdW1lbnQgQVBJIGZvciB0ZXN0aW5nLlxudmFyIGRvY3VtZW50SW50ZXJmYWNlID0ge1xuICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbihzZWwpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKTsgfSxcbiAgcXVlcnlTZWxlY3RvckFsbDogZnVuY3Rpb24oc2VsKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCk7IH1cbn07XG5cbi8vIENoZWNrIGlmIGBvYmpgIGlzIGEgRE9NIGVsZW1lbnQuXG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqKSB7XG4gIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gIHJldHVybiBvYmogPT09IHZvaWQgMDsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdm9pZFxufVxuXG52YXIgTUFYX0FSUkFZX0lOREVYID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2Uob2JqKSB7XG4gIGlmIChvYmogPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgcmV0dXJuIHR5cGVvZiBsZW5ndGggPT09ICdudW1iZXInICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8PSBNQVhfQVJSQVlfSU5ERVg7XG59XG5cbi8vIFRPRE86IGp1c3QgdXNlIHRoZSBqUXVlcnkgdGhpbmdcbmZ1bmN0aW9uIGxvYWQodXJsKSB7XG4gIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxLm9wZW4oJ0dFVCcsIHVybCwgZmFsc2UpO1xuICB0cnkge1xuICAgIHJlcS5zZW5kKCk7XG4gICAgaWYgKHJlcS5zdGF0dXMgPT09IDAgfHwgcmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVxLnJlc3BvbnNlVGV4dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG4gIHRocm93IG5ldyBFcnJvcigndW5hYmxlIHRvIGxvYWQgdXJsICcgKyB1cmwpO1xufVxuXG4vLyBSZXR1cm5zIGEgR3JhbW1hciBpbnN0YW5jZSAoaS5lLiwgYW4gb2JqZWN0IHdpdGggYSBgbWF0Y2hgIG1ldGhvZCkgZm9yXG4vLyBgdHJlZWAsIHdoaWNoIGlzIHRoZSBjb25jcmV0ZSBzeW50YXggdHJlZSBvZiBhIHVzZXItd3JpdHRlbiBncmFtbWFyLlxuLy8gVGhlIGdyYW1tYXIgd2lsbCBiZSBhc3NpZ25lZCBpbnRvIGBuYW1lc3BhY2VgIHVuZGVyIHRoZSBuYW1lIG9mIHRoZSBncmFtbWFyXG4vLyBhcyBzcGVjaWZpZWQgaW4gdGhlIHNvdXJjZS5cbmZ1bmN0aW9uIGJ1aWxkR3JhbW1hcihtYXRjaCwgbmFtZXNwYWNlLCBvcHRPaG1HcmFtbWFyRm9yVGVzdGluZykge1xuICB2YXIgYnVpbGRlciA9IG5ldyBCdWlsZGVyKCk7XG4gIHZhciBkZWNsO1xuICB2YXIgY3VycmVudFJ1bGVOYW1lO1xuICB2YXIgY3VycmVudFJ1bGVGb3JtYWxzO1xuICB2YXIgb3ZlcnJpZGluZyA9IGZhbHNlO1xuICB2YXIgbWV0YUdyYW1tYXIgPSBvcHRPaG1HcmFtbWFyRm9yVGVzdGluZyB8fCBvaG1HcmFtbWFyO1xuXG4gIC8vIEEgdmlzaXRvciB0aGF0IHByb2R1Y2VzIGEgR3JhbW1hciBpbnN0YW5jZSBmcm9tIHRoZSBDU1QuXG4gIHZhciBoZWxwZXJzID0gbWV0YUdyYW1tYXIuY3JlYXRlU2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCd2aXNpdCcsIHtcbiAgICBHcmFtbWFyOiBmdW5jdGlvbihuLCBzLCBvcGVuLCBycywgY2xvc2UpIHtcbiAgICAgIHZhciBncmFtbWFyTmFtZSA9IG4udmlzaXQoKTtcbiAgICAgIGRlY2wgPSBidWlsZGVyLm5ld0dyYW1tYXIoZ3JhbW1hck5hbWUsIG5hbWVzcGFjZSk7XG4gICAgICBzLnZpc2l0KCk7XG4gICAgICBycy52aXNpdCgpO1xuICAgICAgdmFyIGcgPSBkZWNsLmJ1aWxkKCk7XG4gICAgICBnLnNvdXJjZSA9IHRoaXMuc291cmNlLnRyaW1tZWQoKTtcbiAgICAgIGlmIChncmFtbWFyTmFtZSBpbiBuYW1lc3BhY2UpIHtcbiAgICAgICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbihnLCBuYW1lc3BhY2UpO1xuICAgICAgfVxuICAgICAgbmFtZXNwYWNlW2dyYW1tYXJOYW1lXSA9IGc7XG4gICAgICByZXR1cm4gZztcbiAgICB9LFxuXG4gICAgU3VwZXJHcmFtbWFyOiBmdW5jdGlvbihfLCBuKSB7XG4gICAgICB2YXIgc3VwZXJHcmFtbWFyTmFtZSA9IG4udmlzaXQoKTtcbiAgICAgIGlmIChzdXBlckdyYW1tYXJOYW1lID09PSAnbnVsbCcpIHtcbiAgICAgICAgZGVjbC53aXRoU3VwZXJHcmFtbWFyKG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFuYW1lc3BhY2UgfHwgIShzdXBlckdyYW1tYXJOYW1lIGluIG5hbWVzcGFjZSkpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcnMudW5kZWNsYXJlZEdyYW1tYXIoc3VwZXJHcmFtbWFyTmFtZSwgbmFtZXNwYWNlLCBuLnNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVjbC53aXRoU3VwZXJHcmFtbWFyKG5hbWVzcGFjZVtzdXBlckdyYW1tYXJOYW1lXSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIFJ1bGVfZGVmaW5lOiBmdW5jdGlvbihuLCBmcywgZCwgXywgYikge1xuICAgICAgY3VycmVudFJ1bGVOYW1lID0gbi52aXNpdCgpO1xuICAgICAgY3VycmVudFJ1bGVGb3JtYWxzID0gZnMudmlzaXQoKVswXSB8fCBbXTtcbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGRlZmF1bHQgc3RhcnQgcnVsZSB5ZXQsIHNldCBpdCBub3cuIFRoaXMgbXVzdCBiZSBkb25lIGJlZm9yZSB2aXNpdGluZ1xuICAgICAgLy8gdGhlIGJvZHksIGJlY2F1c2UgaXQgbWlnaHQgY29udGFpbiBhbiBpbmxpbmUgcnVsZSBkZWZpbml0aW9uLlxuICAgICAgaWYgKCFkZWNsLmRlZmF1bHRTdGFydFJ1bGUgJiYgZGVjbC5lbnN1cmVTdXBlckdyYW1tYXIoKSAhPT0gR3JhbW1hci5Qcm90b0J1aWx0SW5SdWxlcykge1xuICAgICAgICBkZWNsLndpdGhEZWZhdWx0U3RhcnRSdWxlKGN1cnJlbnRSdWxlTmFtZSk7XG4gICAgICB9XG4gICAgICB2YXIgYm9keSA9IGIudmlzaXQoKTtcbiAgICAgIHZhciBkZXNjcmlwdGlvbiA9IGQudmlzaXQoKVswXTtcbiAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnNvdXJjZS50cmltbWVkKCk7XG4gICAgICByZXR1cm4gZGVjbC5kZWZpbmUoY3VycmVudFJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHksIGRlc2NyaXB0aW9uLCBzb3VyY2UpO1xuICAgIH0sXG4gICAgUnVsZV9vdmVycmlkZTogZnVuY3Rpb24obiwgZnMsIF8sIGIpIHtcbiAgICAgIGN1cnJlbnRSdWxlTmFtZSA9IG4udmlzaXQoKTtcbiAgICAgIGN1cnJlbnRSdWxlRm9ybWFscyA9IGZzLnZpc2l0KClbMF0gfHwgW107XG4gICAgICBvdmVycmlkaW5nID0gdHJ1ZTtcbiAgICAgIHZhciBib2R5ID0gYi52aXNpdCgpO1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlLnRyaW1tZWQoKTtcbiAgICAgIHZhciBhbnMgPSBkZWNsLm92ZXJyaWRlKGN1cnJlbnRSdWxlTmFtZSwgY3VycmVudFJ1bGVGb3JtYWxzLCBib2R5LCBudWxsLCBzb3VyY2UpO1xuICAgICAgb3ZlcnJpZGluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGFucztcbiAgICB9LFxuICAgIFJ1bGVfZXh0ZW5kOiBmdW5jdGlvbihuLCBmcywgXywgYikge1xuICAgICAgY3VycmVudFJ1bGVOYW1lID0gbi52aXNpdCgpO1xuICAgICAgY3VycmVudFJ1bGVGb3JtYWxzID0gZnMudmlzaXQoKVswXSB8fCBbXTtcbiAgICAgIHZhciBib2R5ID0gYi52aXNpdCgpO1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlLnRyaW1tZWQoKTtcbiAgICAgIHZhciBhbnMgPSBkZWNsLmV4dGVuZChjdXJyZW50UnVsZU5hbWUsIGN1cnJlbnRSdWxlRm9ybWFscywgYm9keSwgbnVsbCwgc291cmNlKTtcbiAgICAgIHJldHVybiBhbnM7XG4gICAgfSxcbiAgICBSdWxlQm9keTogZnVuY3Rpb24oXywgdGVybXMpIHtcbiAgICAgIHZhciBhcmdzID0gdGVybXMudmlzaXQoKTtcbiAgICAgIHJldHVybiBidWlsZGVyLmFsdC5hcHBseShidWlsZGVyLCBhcmdzKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuXG4gICAgRm9ybWFsczogZnVuY3Rpb24ob3BvaW50eSwgZnMsIGNwb2ludHkpIHtcbiAgICAgIHJldHVybiBmcy52aXNpdCgpO1xuICAgIH0sXG5cbiAgICBQYXJhbXM6IGZ1bmN0aW9uKG9wb2ludHksIHBzLCBjcG9pbnR5KSB7XG4gICAgICByZXR1cm4gcHMudmlzaXQoKTtcbiAgICB9LFxuXG4gICAgQWx0OiBmdW5jdGlvbihzZXFzKSB7XG4gICAgICB2YXIgYXJncyA9IHNlcXMudmlzaXQoKTtcbiAgICAgIHJldHVybiBidWlsZGVyLmFsdC5hcHBseShidWlsZGVyLCBhcmdzKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuXG4gICAgVG9wTGV2ZWxUZXJtX2lubGluZTogZnVuY3Rpb24oYiwgbikge1xuICAgICAgdmFyIGlubGluZVJ1bGVOYW1lID0gY3VycmVudFJ1bGVOYW1lICsgJ18nICsgbi52aXNpdCgpO1xuICAgICAgdmFyIGJvZHkgPSBiLnZpc2l0KCk7XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2UudHJpbW1lZCgpO1xuICAgICAgdmFyIGlzTmV3UnVsZURlY2xhcmF0aW9uID1cbiAgICAgICAgICAhKGRlY2wuc3VwZXJHcmFtbWFyICYmIGRlY2wuc3VwZXJHcmFtbWFyLnJ1bGVzW2lubGluZVJ1bGVOYW1lXSk7XG4gICAgICBpZiAob3ZlcnJpZGluZyAmJiAhaXNOZXdSdWxlRGVjbGFyYXRpb24pIHtcbiAgICAgICAgZGVjbC5vdmVycmlkZShpbmxpbmVSdWxlTmFtZSwgY3VycmVudFJ1bGVGb3JtYWxzLCBib2R5LCBudWxsLCBzb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVjbC5kZWZpbmUoaW5saW5lUnVsZU5hbWUsIGN1cnJlbnRSdWxlRm9ybWFscywgYm9keSwgbnVsbCwgc291cmNlKTtcbiAgICAgIH1cbiAgICAgIHZhciBwYXJhbXMgPSBjdXJyZW50UnVsZUZvcm1hbHMubWFwKGZ1bmN0aW9uKGZvcm1hbCkgeyByZXR1cm4gYnVpbGRlci5hcHAoZm9ybWFsKTsgfSk7XG4gICAgICByZXR1cm4gYnVpbGRlci5hcHAoaW5saW5lUnVsZU5hbWUsIHBhcmFtcykud2l0aFNvdXJjZShib2R5LnNvdXJjZSk7XG4gICAgfSxcblxuICAgIFNlcTogZnVuY3Rpb24oZXhwcikge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuc2VxLmFwcGx5KGJ1aWxkZXIsIGV4cHIudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcblxuICAgIEl0ZXJfc3RhcjogZnVuY3Rpb24oeCwgXykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuc3Rhcih4LnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG4gICAgSXRlcl9wbHVzOiBmdW5jdGlvbih4LCBfKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5wbHVzKHgudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcbiAgICBJdGVyX29wdDogZnVuY3Rpb24oeCwgXykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIub3B0KHgudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcblxuICAgIFByZWRfbm90OiBmdW5jdGlvbihfLCB4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5ub3QoeC52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuICAgIFByZWRfbG9va2FoZWFkOiBmdW5jdGlvbihfLCB4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5sb29rYWhlYWQoeC52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuXG4gICAgTGV4X2xleDogZnVuY3Rpb24oXywgeCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubGV4KHgudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcblxuICAgIEJhc2VfYXBwbGljYXRpb246IGZ1bmN0aW9uKHJ1bGUsIHBzKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5hcHAocnVsZS52aXNpdCgpLCBwcy52aXNpdCgpWzBdIHx8IFtdKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuICAgIEJhc2VfcmFuZ2U6IGZ1bmN0aW9uKGZyb20sIF8sIHRvKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5yYW5nZShmcm9tLnZpc2l0KCksIHRvLnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG4gICAgQmFzZV90ZXJtaW5hbDogZnVuY3Rpb24oZXhwcikge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIudGVybWluYWwoZXhwci52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuICAgIEJhc2VfcGFyZW46IGZ1bmN0aW9uKG9wZW4sIHgsIGNsb3NlKSB7XG4gICAgICByZXR1cm4geC52aXNpdCgpO1xuICAgIH0sXG5cbiAgICBydWxlRGVzY3I6IGZ1bmN0aW9uKG9wZW4sIHQsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gdC52aXNpdCgpO1xuICAgIH0sXG4gICAgcnVsZURlc2NyVGV4dDogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nLnRyaW0oKTtcbiAgICB9LFxuXG4gICAgY2FzZU5hbWU6IGZ1bmN0aW9uKF8sIHNwYWNlMSwgbiwgc3BhY2UyLCBlbmQpIHtcbiAgICAgIHJldHVybiBuLnZpc2l0KCk7XG4gICAgfSxcblxuICAgIG5hbWU6IGZ1bmN0aW9uKGZpcnN0LCByZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2VTdHJpbmc7XG4gICAgfSxcbiAgICBuYW1lRmlyc3Q6IGZ1bmN0aW9uKGV4cHIpIHt9LFxuICAgIG5hbWVSZXN0OiBmdW5jdGlvbihleHByKSB7fSxcblxuICAgIHRlcm1pbmFsOiBmdW5jdGlvbihvcGVuLCBjcywgY2xvc2UpIHtcbiAgICAgIHJldHVybiBjcy52aXNpdCgpLmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICBvbmVDaGFyVGVybWluYWw6IGZ1bmN0aW9uKG9wZW4sIGMsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gYy52aXNpdCgpO1xuICAgIH0sXG5cbiAgICB0ZXJtaW5hbENoYXI6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBjb21tb24udW5lc2NhcGVDaGFyKHRoaXMuc291cmNlU3RyaW5nKTtcbiAgICB9LFxuXG4gICAgZXNjYXBlQ2hhcjogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nO1xuICAgIH0sXG5cbiAgICBOb25lbXB0eUxpc3RPZjogZnVuY3Rpb24oeCwgXywgeHMpIHtcbiAgICAgIHJldHVybiBbeC52aXNpdCgpXS5jb25jYXQoeHMudmlzaXQoKSk7XG4gICAgfSxcbiAgICBFbXB0eUxpc3RPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcblxuICAgIF90ZXJtaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmltaXRpdmVWYWx1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaGVscGVycyhtYXRjaCkudmlzaXQoKTtcbn1cblxuZnVuY3Rpb24gY29tcGlsZUFuZExvYWQoc291cmNlLCBuYW1lc3BhY2UpIHtcbiAgdmFyIG0gPSBvaG1HcmFtbWFyLm1hdGNoKHNvdXJjZSwgJ0dyYW1tYXJzJyk7XG4gIGlmIChtLmZhaWxlZCgpKSB7XG4gICAgdGhyb3cgZXJyb3JzLmdyYW1tYXJTeW50YXhFcnJvcihtKTtcbiAgfVxuICByZXR1cm4gYnVpbGRHcmFtbWFyKG0sIG5hbWVzcGFjZSk7XG59XG5cbi8vIFJldHVybiB0aGUgY29udGVudHMgb2YgYSBzY3JpcHQgZWxlbWVudCwgZmV0Y2hpbmcgaXQgdmlhIFhIUiBpZiBuZWNlc3NhcnkuXG5mdW5jdGlvbiBnZXRTY3JpcHRFbGVtZW50Q29udGVudHMoZWwpIHtcbiAgaWYgKCFpc0VsZW1lbnQoZWwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBET00gTm9kZSwgZ290ICcgKyBjb21tb24udW5leHBlY3RlZE9ialRvU3RyaW5nKGVsKSk7XG4gIH1cbiAgaWYgKGVsLnR5cGUgIT09ICd0ZXh0L29obS1qcycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc2NyaXB0IHRhZyB3aXRoIHR5cGU9XCJ0ZXh0L29obS1qc1wiLCBnb3QgJyArIGVsKTtcbiAgfVxuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSA/IGxvYWQoZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSkgOiBlbC5pbm5lckhUTUw7XG59XG5cbmZ1bmN0aW9uIGdyYW1tYXIoc291cmNlLCBvcHROYW1lc3BhY2UpIHtcbiAgdmFyIG5zID0gZ3JhbW1hcnMoc291cmNlLCBvcHROYW1lc3BhY2UpO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHRoZSBzb3VyY2UgY29udGFpbmVkIG5vIG1vcmUgdGhhbiBvbmUgZ3JhbW1hciBkZWZpbml0aW9uLlxuICB2YXIgZ3JhbW1hck5hbWVzID0gT2JqZWN0LmtleXMobnMpO1xuICBpZiAoZ3JhbW1hck5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBncmFtbWFyIGRlZmluaXRpb24nKTtcbiAgfSBlbHNlIGlmIChncmFtbWFyTmFtZXMubGVuZ3RoID4gMSkge1xuICAgIHZhciBzZWNvbmRHcmFtbWFyID0gbnNbZ3JhbW1hck5hbWVzWzFdXTtcbiAgICB2YXIgaW50ZXJ2YWwgPSBzZWNvbmRHcmFtbWFyLnNvdXJjZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIHV0aWwuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2UoaW50ZXJ2YWwuc291cmNlU3RyaW5nLCBpbnRlcnZhbC5zdGFydElkeCkgK1xuICAgICAgICAnRm91bmQgbW9yZSB0aGFuIG9uZSBncmFtbWFyIGRlZmluaXRpb24gLS0gdXNlIG9obS5ncmFtbWFycygpIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIG5zW2dyYW1tYXJOYW1lc1swXV07ICAvLyBSZXR1cm4gdGhlIG9uZSBhbmQgb25seSBncmFtbWFyLlxufVxuXG5mdW5jdGlvbiBncmFtbWFycyhzb3VyY2UsIG9wdE5hbWVzcGFjZSkge1xuICB2YXIgbnMgPSBOYW1lc3BhY2UuZXh0ZW5kKE5hbWVzcGFjZS5hc05hbWVzcGFjZShvcHROYW1lc3BhY2UpKTtcbiAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gRm9yIGNvbnZlbmllbmNlLCBkZXRlY3QgTm9kZS5qcyBCdWZmZXIgb2JqZWN0cyBhbmQgYXV0b21hdGljYWxseSBjYWxsIHRvU3RyaW5nKCkuXG4gICAgaWYgKGlzQnVmZmVyKHNvdXJjZSkpIHtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdFeHBlY3RlZCBzdHJpbmcgYXMgZmlyc3QgYXJndW1lbnQsIGdvdCAnICsgY29tbW9uLnVuZXhwZWN0ZWRPYmpUb1N0cmluZyhzb3VyY2UpKTtcbiAgICB9XG4gIH1cbiAgY29tcGlsZUFuZExvYWQoc291cmNlLCBucyk7XG4gIHJldHVybiBucztcbn1cblxuZnVuY3Rpb24gZ3JhbW1hckZyb21TY3JpcHRFbGVtZW50KG9wdE5vZGUpIHtcbiAgdmFyIG5vZGUgPSBvcHROb2RlO1xuICBpZiAoaXNVbmRlZmluZWQobm9kZSkpIHtcbiAgICB2YXIgbm9kZUxpc3QgPSBkb2N1bWVudEludGVyZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb2htLWpzXCJdJyk7XG4gICAgaWYgKG5vZGVMaXN0Lmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdFeHBlY3RlZCBleGFjdGx5IG9uZSBzY3JpcHQgdGFnIHdpdGggdHlwZT1cInRleHQvb2htLWpzXCIsIGZvdW5kICcgKyBub2RlTGlzdC5sZW5ndGgpO1xuICAgIH1cbiAgICBub2RlID0gbm9kZUxpc3RbMF07XG4gIH1cbiAgcmV0dXJuIGdyYW1tYXIoZ2V0U2NyaXB0RWxlbWVudENvbnRlbnRzKG5vZGUpKTtcbn1cblxuZnVuY3Rpb24gZ3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudHMob3B0Tm9kZU9yTm9kZUxpc3QpIHtcbiAgLy8gU2ltcGxlIGNhc2U6IHRoZSBhcmd1bWVudCBpcyBhIERPTSBub2RlLlxuICBpZiAoaXNFbGVtZW50KG9wdE5vZGVPck5vZGVMaXN0KSkge1xuICAgIHJldHVybiBncmFtbWFycyhvcHROb2RlT3JOb2RlTGlzdCk7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCBpdCBtdXN0IGJlIGVpdGhlciB1bmRlZmluZWQgb3IgYSBOb2RlTGlzdC5cbiAgdmFyIG5vZGVMaXN0ID0gb3B0Tm9kZU9yTm9kZUxpc3Q7XG4gIGlmIChpc1VuZGVmaW5lZChub2RlTGlzdCkpIHtcbiAgICAvLyBGaW5kIGFsbCBzY3JpcHQgZWxlbWVudHMgd2l0aCB0eXBlPVwidGV4dC9vaG0tanNcIi5cbiAgICBub2RlTGlzdCA9IGRvY3VtZW50SW50ZXJmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vaG0tanNcIl0nKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZUxpc3QgPT09ICdzdHJpbmcnIHx8ICghaXNFbGVtZW50KG5vZGVMaXN0KSAmJiAhaXNBcnJheUxpa2Uobm9kZUxpc3QpKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgTm9kZSwgTm9kZUxpc3QsIG9yIEFycmF5LCBidXQgZ290ICcgKyBub2RlTGlzdCk7XG4gIH1cbiAgdmFyIG5zID0gTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgLy8gQ29weSB0aGUgbmV3IGdyYW1tYXJzIGludG8gYG5zYCB0byBrZWVwIHRoZSBuYW1lc3BhY2UgZmxhdC5cbiAgICBjb21tb24uZXh0ZW5kKG5zLCBncmFtbWFycyhnZXRTY3JpcHRFbGVtZW50Q29udGVudHMobm9kZUxpc3RbaV0pLCBucykpO1xuICB9XG4gIHJldHVybiBucztcbn1cblxuZnVuY3Rpb24gbWFrZVJlY2lwZShyZWNpcGUpIHtcbiAgaWYgKHR5cGVvZiByZWNpcGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gcmVjaXBlLmNhbGwobmV3IEJ1aWxkZXIoKSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZWNpcGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBzdHJpbmdpZmllZCBKU09OIHJlY2lwZVxuICAgICAgcmVjaXBlID0gSlNPTi5wYXJzZShyZWNpcGUpO1xuICAgIH1cbiAgICByZXR1cm4gKG5ldyBCdWlsZGVyKCkpLmZyb21SZWNpcGUocmVjaXBlKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gU3R1ZmYgdGhhdCB1c2VycyBzaG91bGQga25vdyBhYm91dFxuLy8gbW9kdWxlLmV4cG9ydHMgPSB7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZU5hbWVzcGFjZTogTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSxcbiAgZ3JhbW1hcjogZ3JhbW1hcixcbiAgZ3JhbW1hcnM6IGdyYW1tYXJzLFxuICBncmFtbWFyRnJvbVNjcmlwdEVsZW1lbnQ6IGdyYW1tYXJGcm9tU2NyaXB0RWxlbWVudCxcbiAgZ3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudHM6IGdyYW1tYXJzRnJvbVNjcmlwdEVsZW1lbnRzLFxuICBtYWtlUmVjaXBlOiBtYWtlUmVjaXBlLFxuICBvaG1HcmFtbWFyOiBudWxsLCAgLy8gSW5pdGlhbGl6ZWQgYmVsb3csIGFmdGVyIEdyYW1tYXIuQnVpbHRJblJ1bGVzLlxuICBwZXhwcnM6IHBleHBycyxcbiAgdXRpbDogdXRpbCxcbiAgZXh0cmFzOiByZXF1aXJlKCcuLi9leHRyYXMnKSxcbiAgdmVyc2lvbjogdmVyc2lvblxufTtcblxuLy8gU3R1ZmYgZm9yIHRlc3RpbmcsIGV0Yy5cbm1vZHVsZS5leHBvcnRzLl9idWlsZEdyYW1tYXIgPSBidWlsZEdyYW1tYXI7XG5tb2R1bGUuZXhwb3J0cy5fc2V0RG9jdW1lbnRJbnRlcmZhY2VGb3JUZXN0aW5nID0gZnVuY3Rpb24oZG9jKSB7IGRvY3VtZW50SW50ZXJmYWNlID0gZG9jOyB9O1xuXG4vLyBMYXRlIGluaXRpYWxpemF0aW9uIGZvciBzdHVmZiB0aGF0IGlzIGJvb3RzdHJhcHBlZC5cblxuR3JhbW1hci5CdWlsdEluUnVsZXMgPSByZXF1aXJlKCcuLi9kaXN0L2J1aWx0LWluLXJ1bGVzJyk7XG51dGlsLmFubm91bmNlQnVpbHRJblJ1bGVzKEdyYW1tYXIuQnVpbHRJblJ1bGVzKTtcblxubW9kdWxlLmV4cG9ydHMub2htR3JhbW1hciA9IG9obUdyYW1tYXIgPSByZXF1aXJlKCcuLi9kaXN0L29obS1ncmFtbWFyJyk7XG5HcmFtbWFyLmluaXRBcHBsaWNhdGlvblBhcnNlcihvaG1HcmFtbWFyLCBidWlsZEdyYW1tYXIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIE5vZGUoZ3JhbW1hciwgY3Rvck5hbWUsIG1hdGNoTGVuZ3RoKSB7XG4gIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gIHRoaXMuY3Rvck5hbWUgPSBjdG9yTmFtZTtcbiAgdGhpcy5tYXRjaExlbmd0aCA9IG1hdGNoTGVuZ3RoO1xufVxuXG5Ob2RlLnByb3RvdHlwZS5udW1DaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jaGlsZHJlbiA/IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIDogMDtcbn07XG5cbk5vZGUucHJvdG90eXBlLmNoaWxkQXQgPSBmdW5jdGlvbihpZHgpIHtcbiAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltpZHhdO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pbmRleE9mQ2hpbGQgPSBmdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihhcmcpO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaGFzQ2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubnVtQ2hpbGRyZW4oKSA+IDE7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5oYXNOb0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5oYXNDaGlsZHJlbigpO1xufTtcblxuTm9kZS5wcm90b3R5cGUub25seUNoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLm51bUNoaWxkcmVuKCkgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdjYW5ub3QgZ2V0IG9ubHkgY2hpbGQgb2YgYSBub2RlIG9mIHR5cGUgJyArIHRoaXMuY3Rvck5hbWUgK1xuICAgICAgICAnIChpdCBoYXMgJyArIHRoaXMubnVtQ2hpbGRyZW4oKSArICcgY2hpbGRyZW4pJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyc3RDaGlsZCgpO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5maXJzdENoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmhhc05vQ2hpbGRyZW4oKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2Nhbm5vdCBnZXQgZmlyc3QgY2hpbGQgb2YgYSAnICsgdGhpcy5jdG9yTmFtZSArICcgbm9kZSwgd2hpY2ggaGFzIG5vIGNoaWxkcmVuJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRBdCgwKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUubGFzdENoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmhhc05vQ2hpbGRyZW4oKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2Nhbm5vdCBnZXQgbGFzdCBjaGlsZCBvZiBhICcgKyB0aGlzLmN0b3JOYW1lICsgJyBub2RlLCB3aGljaCBoYXMgbm8gY2hpbGRyZW4nKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KHRoaXMubnVtQ2hpbGRyZW4oKSAtIDEpO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5jaGlsZEJlZm9yZSA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gIHZhciBjaGlsZElkeCA9IHRoaXMuaW5kZXhPZkNoaWxkKGNoaWxkKTtcbiAgaWYgKGNoaWxkSWR4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm9kZS5jaGlsZEJlZm9yZSgpIGNhbGxlZCB3LyBhbiBhcmd1bWVudCB0aGF0IGlzIG5vdCBhIGNoaWxkJyk7XG4gIH0gZWxzZSBpZiAoY2hpbGRJZHggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBnZXQgY2hpbGQgYmVmb3JlIGZpcnN0IGNoaWxkJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRBdChjaGlsZElkeCAtIDEpO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5jaGlsZEFmdGVyID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgdmFyIGNoaWxkSWR4ID0gdGhpcy5pbmRleE9mQ2hpbGQoY2hpbGQpO1xuICBpZiAoY2hpbGRJZHggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlLmNoaWxkQWZ0ZXIoKSBjYWxsZWQgdy8gYW4gYXJndW1lbnQgdGhhdCBpcyBub3QgYSBjaGlsZCcpO1xuICB9IGVsc2UgaWYgKGNoaWxkSWR4ID09PSB0aGlzLm51bUNoaWxkcmVuKCkgLSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZ2V0IGNoaWxkIGFmdGVyIGxhc3QgY2hpbGQnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KGNoaWxkSWR4ICsgMSk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmlzVGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaXNOb250ZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pc0l0ZXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pc09wdGlvbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbk5vZGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgciA9IHt9O1xuICByW3RoaXMuY3Rvck5hbWVdID0gdGhpcy5jaGlsZHJlbjtcbiAgcmV0dXJuIHI7XG59O1xuXG4vLyBUZXJtaW5hbHNcblxuZnVuY3Rpb24gVGVybWluYWxOb2RlKGdyYW1tYXIsIHZhbHVlKSB7XG4gIHZhciBtYXRjaExlbmd0aCA9IHZhbHVlID8gdmFsdWUubGVuZ3RoIDogMDtcbiAgTm9kZS5jYWxsKHRoaXMsIGdyYW1tYXIsICdfdGVybWluYWwnLCBtYXRjaExlbmd0aCk7XG4gIHRoaXMucHJpbWl0aXZlVmFsdWUgPSB2YWx1ZTtcbn1cbmluaGVyaXRzKFRlcm1pbmFsTm9kZSwgTm9kZSk7XG5cblRlcm1pbmFsTm9kZS5wcm90b3R5cGUuaXNUZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblRlcm1pbmFsTm9kZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHZhciByID0ge307XG4gIHJbdGhpcy5jdG9yTmFtZV0gPSB0aGlzLnByaW1pdGl2ZVZhbHVlO1xuICByZXR1cm4gcjtcbn07XG5cbi8vIE5vbnRlcm1pbmFsc1xuXG5mdW5jdGlvbiBOb250ZXJtaW5hbE5vZGUoZ3JhbW1hciwgcnVsZU5hbWUsIGNoaWxkcmVuLCBjaGlsZE9mZnNldHMsIG1hdGNoTGVuZ3RoKSB7XG4gIE5vZGUuY2FsbCh0aGlzLCBncmFtbWFyLCBydWxlTmFtZSwgbWF0Y2hMZW5ndGgpO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIHRoaXMuY2hpbGRPZmZzZXRzID0gY2hpbGRPZmZzZXRzO1xufVxuaW5oZXJpdHMoTm9udGVybWluYWxOb2RlLCBOb2RlKTtcblxuTm9udGVybWluYWxOb2RlLnByb3RvdHlwZS5pc05vbnRlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuTm9udGVybWluYWxOb2RlLnByb3RvdHlwZS5pc0xleGljYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGNvbW1vbi5pc0xleGljYWwodGhpcy5jdG9yTmFtZSk7XG59O1xuXG5Ob250ZXJtaW5hbE5vZGUucHJvdG90eXBlLmlzU3ludGFjdGljID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjb21tb24uaXNTeW50YWN0aWModGhpcy5jdG9yTmFtZSk7XG59O1xuXG4vLyBJdGVyYXRpb25zXG5cbmZ1bmN0aW9uIEl0ZXJhdGlvbk5vZGUoZ3JhbW1hciwgY2hpbGRyZW4sIGNoaWxkT2Zmc2V0cywgbWF0Y2hMZW5ndGgsIGlzT3B0aW9uYWwpIHtcbiAgTm9kZS5jYWxsKHRoaXMsIGdyYW1tYXIsICdfaXRlcicsIG1hdGNoTGVuZ3RoKTtcbiAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB0aGlzLmNoaWxkT2Zmc2V0cyA9IGNoaWxkT2Zmc2V0cztcbiAgdGhpcy5vcHRpb25hbCA9IGlzT3B0aW9uYWw7XG59XG5pbmhlcml0cyhJdGVyYXRpb25Ob2RlLCBOb2RlKTtcblxuSXRlcmF0aW9uTm9kZS5wcm90b3R5cGUuaXNJdGVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5JdGVyYXRpb25Ob2RlLnByb3RvdHlwZS5pc09wdGlvbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbmFsO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBOb2RlOiBOb2RlLFxuICBUZXJtaW5hbE5vZGU6IFRlcm1pbmFsTm9kZSxcbiAgTm9udGVybWluYWxOb2RlOiBOb250ZXJtaW5hbE5vZGUsXG4gIEl0ZXJhdGlvbk5vZGU6IEl0ZXJhdGlvbk5vZGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgUmV0dXJuIHRydWUgaWYgd2Ugc2hvdWxkIHNraXAgc3BhY2VzIHByZWNlZGluZyB0aGlzIGV4cHJlc3Npb24gaW4gYSBzeW50YWN0aWMgY29udGV4dC5cbiovXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPSBjb21tb24uYWJzdHJhY3QoXG4gICdhbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlJ1xuKTtcblxuLypcbiAgR2VuZXJhbGx5LCB0aGVzZSBhcmUgYWxsIGZpcnN0LW9yZGVyIGV4cHJlc3Npb25zIGFuZCAod2l0aCB0aGUgZXhjZXB0aW9uIG9mIEFwcGx5KVxuICBkaXJlY3RseSByZWFkIGZyb20gdGhlIGlucHV0IHN0cmVhbS5cbiovXG5wZXhwcnMuYW55LmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLmVuZC5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qXG4gIEhpZ2hlci1vcmRlciBleHByZXNzaW9ucyB0aGF0IGRvbid0IGRpcmVjdGx5IGNvbnN1bWUgaW5wdXQuXG4qL1xucGV4cHJzLkFsdC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuSXRlci5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLlNlcS5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxudmFyIEJ1aWx0SW5SdWxlcztcblxudXRpbC5hd2FpdEJ1aWx0SW5SdWxlcyhmdW5jdGlvbihnKSB7IEJ1aWx0SW5SdWxlcyA9IGc7IH0pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGxleGlmeUNvdW50O1xuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgbGV4aWZ5Q291bnQgPSAwO1xuICB0aGlzLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGNvbW1vbi5hYnN0cmFjdChcbiAgJ19hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCdcbik7XG5cbnBleHBycy5hbnkuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5lbmQuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5MZXgucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIGxleGlmeUNvdW50Kys7XG4gIHRoaXMuZXhwci5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xuICBsZXhpZnlDb3VudC0tO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy50ZXJtc1tpZHhdLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG4gIH1cbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbiAgfVxufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgdGhpcy5leHByLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIHZhciBydWxlSW5mbyA9IGdyYW1tYXIucnVsZXNbdGhpcy5ydWxlTmFtZV07XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHJ1bGUgZXhpc3RzLi4uXG4gIGlmICghcnVsZUluZm8pIHtcbiAgICB0aHJvdyBlcnJvcnMudW5kZWNsYXJlZFJ1bGUodGhpcy5ydWxlTmFtZSwgZ3JhbW1hci5uYW1lLCB0aGlzLnNvdXJjZSk7XG4gIH1cblxuICAvLyAuLi5hbmQgdGhhdCB0aGlzIGFwcGxpY2F0aW9uIGlzIGFsbG93ZWRcbiAgaWYgKGNvbW1vbi5pc1N5bnRhY3RpYyh0aGlzLnJ1bGVOYW1lKSAmJiAoIWNvbW1vbi5pc1N5bnRhY3RpYyhydWxlTmFtZSkgfHwgbGV4aWZ5Q291bnQgPiAwKSkge1xuICAgIHRocm93IGVycm9ycy5hcHBsaWNhdGlvbk9mU3ludGFjdGljUnVsZUZyb21MZXhpY2FsQ29udGV4dCh0aGlzLnJ1bGVOYW1lLCB0aGlzKTtcbiAgfVxuXG4gIC8vIC4uLmFuZCB0aGF0IHRoaXMgYXBwbGljYXRpb24gaGFzIHRoZSBjb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHNcbiAgdmFyIGFjdHVhbCA9IHRoaXMuYXJncy5sZW5ndGg7XG4gIHZhciBleHBlY3RlZCA9IHJ1bGVJbmZvLmZvcm1hbHMubGVuZ3RoO1xuICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgIHRocm93IGVycm9ycy53cm9uZ051bWJlck9mQXJndW1lbnRzKHRoaXMucnVsZU5hbWUsIGV4cGVjdGVkLCBhY3R1YWwsIHRoaXMuc291cmNlKTtcbiAgfVxuXG4gIC8vIC4uLmFuZCB0aGF0IGFsbCBvZiB0aGUgYXJndW1lbnQgZXhwcmVzc2lvbnMgb25seSBoYXZlIHZhbGlkIGFwcGxpY2F0aW9ucyBhbmQgaGF2ZSBhcml0eSAxLlxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZykge1xuICAgIGFyZy5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xuICAgIGlmIChhcmcuZ2V0QXJpdHkoKSAhPT0gMSkge1xuICAgICAgdGhyb3cgZXJyb3JzLmludmFsaWRQYXJhbWV0ZXIoc2VsZi5ydWxlTmFtZSwgYXJnKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEV4dHJhIGNoZWNrcyBmb3IgXCJzcGVjaWFsXCIgYXBwbGljYXRpb25zXG5cbiAgLy8gSWYgaXQncyBhbiBhcHBsaWNhdGlvbiBvZiAnY2FzZUluc2Vuc2l0aXZlJywgZW5zdXJlIHRoYXQgdGhlIGFyZ3VtZW50IGlzIGEgVGVybWluYWwuXG4gIGlmIChCdWlsdEluUnVsZXMgJiYgcnVsZUluZm8gPT09IEJ1aWx0SW5SdWxlcy5ydWxlcy5jYXNlSW5zZW5zaXRpdmUpIHtcbiAgICBpZiAoISh0aGlzLmFyZ3NbMF0gaW5zdGFuY2VvZiBwZXhwcnMuVGVybWluYWwpKSB7XG4gICAgICB0aHJvdyBlcnJvcnMuaW5jb3JyZWN0QXJndW1lbnRUeXBlKCdhIFRlcm1pbmFsIChlLmcuIFxcXCJhYmNcXFwiKScsIHRoaXMuYXJnc1swXSk7XG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGNvbW1vbi5hYnN0cmFjdChcbiAgJ2Fzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5J1xuKTtcblxucGV4cHJzLmFueS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9XG5wZXhwcnMuZW5kLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5MZXgucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBpZiAodGhpcy50ZXJtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGFyaXR5ID0gdGhpcy50ZXJtc1swXS5nZXRBcml0eSgpO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgdGVybSA9IHRoaXMudGVybXNbaWR4XTtcbiAgICB0ZXJtLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5KCk7XG4gICAgdmFyIG90aGVyQXJpdHkgPSB0ZXJtLmdldEFyaXR5KCk7XG4gICAgaWYgKGFyaXR5ICE9PSBvdGhlckFyaXR5KSB7XG4gICAgICB0aHJvdyBlcnJvcnMuaW5jb25zaXN0ZW50QXJpdHkocnVsZU5hbWUsIGFyaXR5LCBvdGhlckFyaXR5LCB0ZXJtKTtcbiAgICB9XG4gIH1cbn07XG5cbnBleHBycy5FeHRlbmQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gRXh0ZW5kIGlzIGEgc3BlY2lhbCBjYXNlIG9mIEFsdCB0aGF0J3MgZ3VhcmFudGVlZCB0byBoYXZlIGV4YWN0bHkgdHdvXG4gIC8vIGNhc2VzOiBbZXh0ZW5zaW9ucywgb3JpZ0JvZHldLlxuICB2YXIgYWN0dWFsQXJpdHkgPSB0aGlzLnRlcm1zWzBdLmdldEFyaXR5KCk7XG4gIHZhciBleHBlY3RlZEFyaXR5ID0gdGhpcy50ZXJtc1sxXS5nZXRBcml0eSgpO1xuICBpZiAoYWN0dWFsQXJpdHkgIT09IGV4cGVjdGVkQXJpdHkpIHtcbiAgICB0aHJvdyBlcnJvcnMuaW5jb25zaXN0ZW50QXJpdHkocnVsZU5hbWUsIGV4cGVjdGVkQXJpdHksIGFjdHVhbEFyaXR5LCB0aGlzLnRlcm1zWzBdKTtcbiAgfVxufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5KHJ1bGVOYW1lKTtcbiAgfVxufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5KHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3AgKG5vdCByZXF1aXJlZCBiL2MgdGhlIG5lc3RlZCBleHByIGRvZXNuJ3Qgc2hvdyB1cCBpbiB0aGUgQ1NUKVxufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIFRoZSBhcml0aWVzIG9mIHRoZSBwYXJhbWV0ZXIgZXhwcmVzc2lvbnMgaXMgcmVxdWlyZWQgdG8gYmUgMSBieVxuICAvLyBgYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQoKWAuXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBjb21tb24uYWJzdHJhY3QoXG4gICdhc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUnXG4pO1xuXG5wZXhwcnMuYW55LmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuZW5kLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy50ZXJtc1tpZHhdLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyKTtcbiAgfVxufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyKTtcbiAgfVxufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgLy8gTm90ZTogdGhpcyBpcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBtZXRob2QgZm9yIGBTdGFyYCBhbmQgYFBsdXNgIGV4cHJlc3Npb25zLlxuICAvLyBJdCBpcyBvdmVycmlkZGVuIGZvciBgT3B0YCBiZWxvdy5cbiAgdGhpcy5leHByLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyKTtcbiAgaWYgKHRoaXMuZXhwci5pc051bGxhYmxlKGdyYW1tYXIpKSB7XG4gICAgdGhyb3cgZXJyb3JzLmtsZWVuZUV4cHJIYXNOdWxsYWJsZU9wZXJhbmQodGhpcywgW10pO1xuICB9XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUoZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdGhpcy5hcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnKSB7XG4gICAgYXJnLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgbm9kZXMgPSByZXF1aXJlKCcuL25vZGVzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuY2hlY2sgPSBjb21tb24uYWJzdHJhY3QoJ2NoZWNrJyk7XG5cbnBleHBycy5hbnkuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzLmxlbmd0aCA+PSAxO1xufTtcblxucGV4cHJzLmVuZC5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdmFsc1swXS5wcmltaXRpdmVWYWx1ZSA9PT0gdW5kZWZpbmVkO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdmFsc1swXS5wcmltaXRpdmVWYWx1ZSA9PT0gdGhpcy5vYmo7XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdmFsc1swXSBpbnN0YW5jZW9mIG5vZGVzLk5vZGUgJiZcbiAgICAgICAgIHZhbHNbMF0uaXNUZXJtaW5hbCgpICYmXG4gICAgICAgICB0eXBlb2YgdmFsc1swXS5wcmltaXRpdmVWYWx1ZSA9PT0gdHlwZW9mIHRoaXMuZnJvbTtcbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzLmxlbmd0aCA+PSAxO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZXJtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0ZXJtID0gdGhpcy50ZXJtc1tpXTtcbiAgICBpZiAodGVybS5jaGVjayhncmFtbWFyLCB2YWxzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICB2YXIgcG9zID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmFjdG9yID0gdGhpcy5mYWN0b3JzW2ldO1xuICAgIGlmIChmYWN0b3IuY2hlY2soZ3JhbW1hciwgdmFscy5zbGljZShwb3MpKSkge1xuICAgICAgcG9zICs9IGZhY3Rvci5nZXRBcml0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICB2YXIgYXJpdHkgPSB0aGlzLmdldEFyaXR5KCk7XG4gIHZhciBjb2x1bW5zID0gdmFscy5zbGljZSgwLCBhcml0eSk7XG4gIGlmIChjb2x1bW5zLmxlbmd0aCAhPT0gYXJpdHkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHJvd0NvdW50ID0gY29sdW1uc1swXS5sZW5ndGg7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAxOyBpIDwgYXJpdHk7IGkrKykge1xuICAgIGlmIChjb2x1bW5zW2ldLmxlbmd0aCAhPT0gcm93Q291bnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgcm93Q291bnQ7IGkrKykge1xuICAgIHZhciByb3cgPSBbXTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyaXR5OyBqKyspIHtcbiAgICAgIHJvdy5wdXNoKGNvbHVtbnNbal1baV0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZXhwci5jaGVjayhncmFtbWFyLCByb3cpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5jaGVjayA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5jaGVjayhncmFtbWFyLCB2YWxzKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIGlmICghKHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgIHZhbHNbMF0uZ3JhbW1hciA9PT0gZ3JhbW1hciAmJlxuICAgICAgICB2YWxzWzBdLmN0b3JOYW1lID09PSB0aGlzLnJ1bGVOYW1lKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRPRE86IHRoaW5rIGFib3V0ICpub3QqIGRvaW5nIHRoZSBmb2xsb3dpbmcgY2hlY2tzLCBpLmUuLCB0cnVzdGluZyB0aGF0IHRoZSBydWxlXG4gIC8vIHdhcyBjb3JyZWN0bHkgY29uc3RydWN0ZWQuXG4gIHZhciBydWxlTm9kZSA9IHZhbHNbMF07XG4gIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlc1t0aGlzLnJ1bGVOYW1lXS5ib2R5O1xuICByZXR1cm4gYm9keS5jaGVjayhncmFtbWFyLCBydWxlTm9kZS5jaGlsZHJlbikgJiYgcnVsZU5vZGUubnVtQ2hpbGRyZW4oKSA9PT0gYm9keS5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdHlwZW9mIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09ICdzdHJpbmcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBUcmFjZSA9IHJlcXVpcmUoJy4vVHJhY2UnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgbm9kZXMgPSByZXF1aXJlKCcuL25vZGVzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxudmFyIFRlcm1pbmFsTm9kZSA9IG5vZGVzLlRlcm1pbmFsTm9kZTtcbnZhciBOb250ZXJtaW5hbE5vZGUgPSBub2Rlcy5Ob250ZXJtaW5hbE5vZGU7XG52YXIgSXRlcmF0aW9uTm9kZSA9IG5vZGVzLkl0ZXJhdGlvbk5vZGU7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKlxuICBFdmFsdWF0ZSB0aGUgZXhwcmVzc2lvbiBhbmQgcmV0dXJuIGB0cnVlYCBpZiBpdCBzdWNjZWVkcywgYGZhbHNlYCBvdGhlcndpc2UuIFRoaXMgbWV0aG9kIHNob3VsZFxuICBvbmx5IGJlIGNhbGxlZCBkaXJlY3RseSBieSBgU3RhdGUucHJvdG90eXBlLmV2YWwoZXhwcilgLCB3aGljaCBhbHNvIHVwZGF0ZXMgdGhlIGRhdGEgc3RydWN0dXJlc1xuICB0aGF0IGFyZSB1c2VkIGZvciB0cmFjaW5nLiAoTWFraW5nIHRob3NlIHVwZGF0ZXMgaW4gYSBtZXRob2Qgb2YgYFN0YXRlYCBlbmFibGVzIHRoZSB0cmFjZS1zcGVjaWZpY1xuICBkYXRhIHN0cnVjdHVyZXMgdG8gYmUgXCJzZWNyZXRzXCIgb2YgdGhhdCBjbGFzcywgd2hpY2ggaXMgZ29vZCBmb3IgbW9kdWxhcml0eS4pXG5cbiAgVGhlIGNvbnRyYWN0IG9mIHRoaXMgbWV0aG9kIGlzIGFzIGZvbGxvd3M6XG4gICogV2hlbiB0aGUgcmV0dXJuIHZhbHVlIGlzIGB0cnVlYCxcbiAgICAtIHRoZSBzdGF0ZSBvYmplY3Qgd2lsbCBoYXZlIGBleHByLmdldEFyaXR5KClgIG1vcmUgYmluZGluZ3MgdGhhbiBpdCBkaWQgYmVmb3JlIHRoZSBjYWxsLlxuICAqIFdoZW4gdGhlIHJldHVybiB2YWx1ZSBpcyBgZmFsc2VgLFxuICAgIC0gdGhlIHN0YXRlIG9iamVjdCBtYXkgaGF2ZSBtb3JlIGJpbmRpbmdzIHRoYW4gaXQgZGlkIGJlZm9yZSB0aGUgY2FsbCwgYW5kXG4gICAgLSBpdHMgaW5wdXQgc3RyZWFtJ3MgcG9zaXRpb24gbWF5IGJlIGFueXdoZXJlLlxuXG4gIE5vdGUgdGhhdCBgU3RhdGUucHJvdG90eXBlLmV2YWwoZXhwcilgLCB1bmxpa2UgdGhpcyBtZXRob2QsIGd1YXJhbnRlZXMgdGhhdCBuZWl0aGVyIHRoZSBzdGF0ZVxuICBvYmplY3QncyBiaW5kaW5ncyBub3IgaXRzIGlucHV0IHN0cmVhbSdzIHBvc2l0aW9uIHdpbGwgY2hhbmdlIGlmIHRoZSBleHByZXNzaW9uIGZhaWxzIHRvIG1hdGNoLlxuKi9cbnBleHBycy5QRXhwci5wcm90b3R5cGUuZXZhbCA9IGNvbW1vbi5hYnN0cmFjdCgnZXZhbCcpOyAgLy8gZnVuY3Rpb24oc3RhdGUpIHsgLi4uIH1cblxucGV4cHJzLmFueS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgY2ggPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gIGlmIChjaCkge1xuICAgIHN0YXRlLnB1c2hCaW5kaW5nKG5ldyBUZXJtaW5hbE5vZGUoc3RhdGUuZ3JhbW1hciwgY2gpLCBvcmlnUG9zKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5lbmQuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgaWYgKGlucHV0U3RyZWFtLmF0RW5kKCkpIHtcbiAgICBzdGF0ZS5wdXNoQmluZGluZyhuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIHVuZGVmaW5lZCksIG9yaWdQb3MpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICBpZiAoIWlucHV0U3RyZWFtLm1hdGNoU3RyaW5nKHRoaXMub2JqKSkge1xuICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wdXNoQmluZGluZyhuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIHRoaXMub2JqKSwgb3JpZ1Bvcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGNoID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAoY2ggJiYgdGhpcy5mcm9tIDw9IGNoICYmIGNoIDw9IHRoaXMudG8pIHtcbiAgICBzdGF0ZS5wdXNoQmluZGluZyhuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIGNoKSwgb3JpZ1Bvcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICByZXR1cm4gc3RhdGUuZXZhbChzdGF0ZS5jdXJyZW50QXBwbGljYXRpb24oKS5hcmdzW3RoaXMuaW5kZXhdKTtcbn07XG5cbnBleHBycy5MZXgucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICBzdGF0ZS5lbnRlckxleGlmaWVkQ29udGV4dCgpO1xuICB2YXIgYW5zID0gc3RhdGUuZXZhbCh0aGlzLmV4cHIpO1xuICBzdGF0ZS5leGl0TGV4aWZpZWRDb250ZXh0KCk7XG4gIHJldHVybiBhbnM7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKHN0YXRlLmV2YWwodGhpcy50ZXJtc1tpZHhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciBmYWN0b3IgPSB0aGlzLmZhY3RvcnNbaWR4XTtcbiAgICBpZiAoIXN0YXRlLmV2YWwoZmFjdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgYXJpdHkgPSB0aGlzLmdldEFyaXR5KCk7XG4gIHZhciBjb2xzID0gW107XG4gIHZhciBjb2xPZmZzZXRzID0gW107XG4gIHdoaWxlIChjb2xzLmxlbmd0aCA8IGFyaXR5KSB7XG4gICAgY29scy5wdXNoKFtdKTtcbiAgICBjb2xPZmZzZXRzLnB1c2goW10pO1xuICB9XG5cbiAgdmFyIG51bU1hdGNoZXMgPSAwO1xuICB2YXIgcHJldlBvcyA9IG9yaWdQb3M7XG4gIHZhciBpZHg7XG4gIHdoaWxlIChudW1NYXRjaGVzIDwgdGhpcy5tYXhOdW1NYXRjaGVzICYmIHN0YXRlLmV2YWwodGhpcy5leHByKSkge1xuICAgIGlmIChpbnB1dFN0cmVhbS5wb3MgPT09IHByZXZQb3MpIHtcbiAgICAgIHRocm93IGVycm9ycy5rbGVlbmVFeHBySGFzTnVsbGFibGVPcGVyYW5kKHRoaXMsIHN0YXRlLl9hcHBsaWNhdGlvblN0YWNrKTtcbiAgICB9XG4gICAgcHJldlBvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgICBudW1NYXRjaGVzKys7XG4gICAgdmFyIHJvdyA9IHN0YXRlLl9iaW5kaW5ncy5zcGxpY2Uoc3RhdGUuX2JpbmRpbmdzLmxlbmd0aCAtIGFyaXR5LCBhcml0eSk7XG4gICAgdmFyIHJvd09mZnNldHMgPSBzdGF0ZS5fYmluZGluZ09mZnNldHMuc3BsaWNlKHN0YXRlLl9iaW5kaW5nT2Zmc2V0cy5sZW5ndGggLSBhcml0eSwgYXJpdHkpO1xuICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgcm93Lmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIGNvbHNbaWR4XS5wdXNoKHJvd1tpZHhdKTtcbiAgICAgIGNvbE9mZnNldHNbaWR4XS5wdXNoKHJvd09mZnNldHNbaWR4XSk7XG4gICAgfVxuICB9XG4gIGlmIChudW1NYXRjaGVzIDwgdGhpcy5taW5OdW1NYXRjaGVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBvZmZzZXQgPSBzdGF0ZS5wb3NUb09mZnNldChvcmlnUG9zKTtcbiAgdmFyIG1hdGNoTGVuZ3RoID0gMDtcbiAgaWYgKG51bU1hdGNoZXMgPiAwKSB7XG4gICAgdmFyIGxhc3RDb2wgPSBjb2xzW2FyaXR5IC0gMV07XG4gICAgdmFyIGxhc3RDb2xPZmZzZXRzID0gY29sT2Zmc2V0c1thcml0eSAtIDFdO1xuXG4gICAgdmFyIGVuZE9mZnNldCA9XG4gICAgICAgIGxhc3RDb2xPZmZzZXRzW2xhc3RDb2xPZmZzZXRzLmxlbmd0aCAtIDFdICsgbGFzdENvbFtsYXN0Q29sLmxlbmd0aCAtIDFdLm1hdGNoTGVuZ3RoO1xuICAgIG9mZnNldCA9IGNvbE9mZnNldHNbMF1bMF07XG4gICAgbWF0Y2hMZW5ndGggPSBlbmRPZmZzZXQgLSBvZmZzZXQ7XG4gIH1cbiAgdmFyIGlzT3B0aW9uYWwgPSB0aGlzIGluc3RhbmNlb2YgcGV4cHJzLk9wdDtcbiAgZm9yIChpZHggPSAwOyBpZHggPCBjb2xzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBzdGF0ZS5fYmluZGluZ3MucHVzaChcbiAgICAgICAgbmV3IEl0ZXJhdGlvbk5vZGUoc3RhdGUuZ3JhbW1hciwgY29sc1tpZHhdLCBjb2xPZmZzZXRzW2lkeF0sIG1hdGNoTGVuZ3RoLCBpc09wdGlvbmFsKSk7XG4gICAgc3RhdGUuX2JpbmRpbmdPZmZzZXRzLnB1c2gob2Zmc2V0KTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAvKlxuICAgIFRPRE86XG4gICAgLSBSaWdodCBub3cgd2UncmUganVzdCB0aHJvd2luZyBhd2F5IGFsbCBvZiB0aGUgZmFpbHVyZXMgdGhhdCBoYXBwZW4gaW5zaWRlIGEgYG5vdGAsIGFuZFxuICAgICAgcmVjb3JkaW5nIGB0aGlzYCBhcyBhIGZhaWxlZCBleHByZXNzaW9uLlxuICAgIC0gRG91YmxlIG5lZ2F0aW9uIHNob3VsZCBiZSBlcXVpdmFsZW50IHRvIGxvb2thaGVhZCwgYnV0IHRoYXQncyBub3QgdGhlIGNhc2UgcmlnaHQgbm93IHdydFxuICAgICAgZmFpbHVyZXMuIEUuZy4sIH5+J2ZvbycgcHJvZHVjZXMgYSBmYWlsdXJlIGZvciB+fidmb28nLCBidXQgbWF5YmUgaXQgc2hvdWxkIHByb2R1Y2VcbiAgICAgIGEgZmFpbHVyZSBmb3IgJ2ZvbycgaW5zdGVhZC5cbiAgKi9cblxuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHN0YXRlLnB1c2hGYWlsdXJlc0luZm8oKTtcblxuICB2YXIgYW5zID0gc3RhdGUuZXZhbCh0aGlzLmV4cHIpO1xuXG4gIHN0YXRlLnBvcEZhaWx1cmVzSW5mbygpO1xuICBpZiAoYW5zKSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICBpZiAoc3RhdGUuZXZhbCh0aGlzLmV4cHIpKSB7XG4gICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBjYWxsZXIgPSBzdGF0ZS5jdXJyZW50QXBwbGljYXRpb24oKTtcbiAgdmFyIGFjdHVhbHMgPSBjYWxsZXIgPyBjYWxsZXIuYXJncyA6IFtdO1xuICB2YXIgYXBwID0gdGhpcy5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpO1xuXG4gIHZhciBwb3NJbmZvID0gc3RhdGUuZ2V0Q3VycmVudFBvc0luZm8oKTtcbiAgaWYgKHBvc0luZm8uaXNBY3RpdmUoYXBwKSkge1xuICAgIC8vIFRoaXMgcnVsZSBpcyBhbHJlYWR5IGFjdGl2ZSBhdCB0aGlzIHBvc2l0aW9uLCBpLmUuLCBpdCBpcyBsZWZ0LXJlY3Vyc2l2ZS5cbiAgICByZXR1cm4gYXBwLmhhbmRsZUN5Y2xlKHN0YXRlKTtcbiAgfVxuXG4gIHZhciBtZW1vS2V5ID0gYXBwLnRvTWVtb0tleSgpO1xuICB2YXIgbWVtb1JlYyA9IHBvc0luZm8ubWVtb1ttZW1vS2V5XTtcblxuICBpZiAobWVtb1JlYyAmJiBwb3NJbmZvLnNob3VsZFVzZU1lbW9pemVkUmVzdWx0KG1lbW9SZWMpKSB7XG4gICAgaWYgKHN0YXRlLmhhc05lY2Vzc2FyeUluZm8obWVtb1JlYykpIHtcbiAgICAgIHJldHVybiBzdGF0ZS51c2VNZW1vaXplZFJlc3VsdChzdGF0ZS5pbnB1dFN0cmVhbS5wb3MsIG1lbW9SZWMpO1xuICAgIH1cbiAgICBkZWxldGUgcG9zSW5mby5tZW1vW21lbW9LZXldO1xuICB9XG4gIHJldHVybiBhcHAucmVhbGx5RXZhbChzdGF0ZSk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmhhbmRsZUN5Y2xlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIHBvc0luZm8gPSBzdGF0ZS5nZXRDdXJyZW50UG9zSW5mbygpO1xuICB2YXIgY3VycmVudExlZnRSZWN1cnNpb24gPSBwb3NJbmZvLmN1cnJlbnRMZWZ0UmVjdXJzaW9uO1xuICB2YXIgbWVtb0tleSA9IHRoaXMudG9NZW1vS2V5KCk7XG4gIHZhciBtZW1vUmVjID0gcG9zSW5mby5tZW1vW21lbW9LZXldO1xuXG4gIGlmIChjdXJyZW50TGVmdFJlY3Vyc2lvbiAmJiBjdXJyZW50TGVmdFJlY3Vyc2lvbi5oZWFkQXBwbGljYXRpb24udG9NZW1vS2V5KCkgPT09IG1lbW9LZXkpIHtcbiAgICAvLyBXZSBhbHJlYWR5IGtub3cgYWJvdXQgdGhpcyBsZWZ0IHJlY3Vyc2lvbiwgYnV0IGl0J3MgcG9zc2libGUgdGhlcmUgYXJlIFwiaW52b2x2ZWRcbiAgICAvLyBhcHBsaWNhdGlvbnNcIiB0aGF0IHdlIGRvbid0IGFscmVhZHkga25vdyBhYm91dCwgc28uLi5cbiAgICBtZW1vUmVjLnVwZGF0ZUludm9sdmVkQXBwbGljYXRpb25NZW1vS2V5cygpO1xuICB9IGVsc2UgaWYgKCFtZW1vUmVjKSB7XG4gICAgLy8gTmV3IGxlZnQgcmVjdXJzaW9uIGRldGVjdGVkISBNZW1vaXplIGEgZmFpbHVyZSB0byB0cnkgdG8gZ2V0IGEgc2VlZCBwYXJzZS5cbiAgICBtZW1vUmVjID0gcG9zSW5mby5tZW1vaXplKFxuICAgICAgICBtZW1vS2V5LFxuICAgICAgICB7bWF0Y2hMZW5ndGg6IDAsIGV4YW1pbmVkTGVuZ3RoOiAwLCB2YWx1ZTogZmFsc2UsIHJpZ2h0bW9zdEZhaWx1cmVPZmZzZXQ6IC0xfSk7XG4gICAgcG9zSW5mby5zdGFydExlZnRSZWN1cnNpb24odGhpcywgbWVtb1JlYyk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlLnVzZU1lbW9pemVkUmVzdWx0KHN0YXRlLmlucHV0U3RyZWFtLnBvcywgbWVtb1JlYyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnJlYWxseUV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBvcmlnUG9zSW5mbyA9IHN0YXRlLmdldEN1cnJlbnRQb3NJbmZvKCk7XG4gIHZhciBydWxlSW5mbyA9IHN0YXRlLmdyYW1tYXIucnVsZXNbdGhpcy5ydWxlTmFtZV07XG4gIHZhciBib2R5ID0gcnVsZUluZm8uYm9keTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gcnVsZUluZm8uZGVzY3JpcHRpb247XG5cbiAgc3RhdGUuZW50ZXJBcHBsaWNhdGlvbihvcmlnUG9zSW5mbywgdGhpcyk7XG5cbiAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgc3RhdGUucHVzaEZhaWx1cmVzSW5mbygpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIGlucHV0IHN0cmVhbSdzIGV4YW1pbmVkTGVuZ3RoIHByb3BlcnR5IHNvIHRoYXQgd2UgY2FuIHRyYWNrXG4gIC8vIHRoZSBleGFtaW5lZCBsZW5ndGggb2YgdGhpcyBwYXJ0aWN1bGFyIGFwcGxpY2F0aW9uLlxuICB2YXIgb3JpZ0lucHV0U3RyZWFtRXhhbWluZWRMZW5ndGggPSBpbnB1dFN0cmVhbS5leGFtaW5lZExlbmd0aDtcbiAgaW5wdXRTdHJlYW0uZXhhbWluZWRMZW5ndGggPSAwO1xuXG4gIHZhciB2YWx1ZSA9IHRoaXMuZXZhbE9uY2UoYm9keSwgc3RhdGUpO1xuICB2YXIgY3VycmVudExSID0gb3JpZ1Bvc0luZm8uY3VycmVudExlZnRSZWN1cnNpb247XG4gIHZhciBtZW1vS2V5ID0gdGhpcy50b01lbW9LZXkoKTtcbiAgdmFyIGlzSGVhZE9mTGVmdFJlY3Vyc2lvbiA9IGN1cnJlbnRMUiAmJiBjdXJyZW50TFIuaGVhZEFwcGxpY2F0aW9uLnRvTWVtb0tleSgpID09PSBtZW1vS2V5O1xuICB2YXIgbWVtb1JlYztcblxuICBpZiAoaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uKSB7XG4gICAgdmFsdWUgPSB0aGlzLmdyb3dTZWVkUmVzdWx0KGJvZHksIHN0YXRlLCBvcmlnUG9zLCBjdXJyZW50TFIsIHZhbHVlKTtcbiAgICBvcmlnUG9zSW5mby5lbmRMZWZ0UmVjdXJzaW9uKCk7XG4gICAgbWVtb1JlYyA9IGN1cnJlbnRMUjtcbiAgICBtZW1vUmVjLmV4YW1pbmVkTGVuZ3RoID0gaW5wdXRTdHJlYW0uZXhhbWluZWRMZW5ndGggLSBvcmlnUG9zO1xuICAgIG1lbW9SZWMucmlnaHRtb3N0RmFpbHVyZU9mZnNldCA9IHN0YXRlLl9nZXRSaWdodG1vc3RGYWlsdXJlT2Zmc2V0KCk7XG4gICAgb3JpZ1Bvc0luZm8ubWVtb2l6ZShtZW1vS2V5LCBtZW1vUmVjKTsgIC8vIHVwZGF0ZXMgb3JpZ1Bvc0luZm8ncyBtYXhFeGFtaW5lZExlbmd0aFxuICB9IGVsc2UgaWYgKCFjdXJyZW50TFIgfHwgIWN1cnJlbnRMUi5pc0ludm9sdmVkKG1lbW9LZXkpKSB7XG4gICAgLy8gVGhpcyBhcHBsaWNhdGlvbiBpcyBub3QgaW52b2x2ZWQgaW4gbGVmdCByZWN1cnNpb24sIHNvIGl0J3Mgb2sgdG8gbWVtb2l6ZSBpdC5cbiAgICBtZW1vUmVjID0gb3JpZ1Bvc0luZm8ubWVtb2l6ZShtZW1vS2V5LCB7XG4gICAgICBtYXRjaExlbmd0aDogaW5wdXRTdHJlYW0ucG9zIC0gb3JpZ1BvcyxcbiAgICAgIGV4YW1pbmVkTGVuZ3RoOiBpbnB1dFN0cmVhbS5leGFtaW5lZExlbmd0aCAtIG9yaWdQb3MsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBmYWlsdXJlc0F0UmlnaHRtb3N0UG9zaXRpb246IHN0YXRlLmNsb25lUmVjb3JkZWRGYWlsdXJlcygpLFxuICAgICAgcmlnaHRtb3N0RmFpbHVyZU9mZnNldDogc3RhdGUuX2dldFJpZ2h0bW9zdEZhaWx1cmVPZmZzZXQoKVxuICAgIH0pO1xuICB9XG4gIHZhciBzdWNjZWVkZWQgPSAhIXZhbHVlO1xuXG4gIGlmIChkZXNjcmlwdGlvbikge1xuICAgIHN0YXRlLnBvcEZhaWx1cmVzSW5mbygpO1xuICAgIGlmICghc3VjY2VlZGVkKSB7XG4gICAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICB9XG4gICAgaWYgKG1lbW9SZWMpIHtcbiAgICAgIG1lbW9SZWMuZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uID0gc3RhdGUuY2xvbmVSZWNvcmRlZEZhaWx1cmVzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVjb3JkIHRyYWNlIGluZm9ybWF0aW9uIGluIHRoZSBtZW1vIHRhYmxlLCBzbyB0aGF0IGl0IGlzIGF2YWlsYWJsZSBpZiB0aGUgbWVtb2l6ZWQgcmVzdWx0XG4gIC8vIGlzIHVzZWQgbGF0ZXIuXG4gIGlmIChzdGF0ZS5pc1RyYWNpbmcoKSAmJiBtZW1vUmVjKSB7XG4gICAgdmFyIGVudHJ5ID0gc3RhdGUuZ2V0VHJhY2VFbnRyeShvcmlnUG9zLCB0aGlzLCBzdWNjZWVkZWQsIHN1Y2NlZWRlZCA/IFt2YWx1ZV0gOiBbXSk7XG4gICAgaWYgKGlzSGVhZE9mTGVmdFJlY3Vyc2lvbikge1xuICAgICAgY29tbW9uLmFzc2VydChlbnRyeS50ZXJtaW5hdGluZ0xSRW50cnkgIT0gbnVsbCB8fCAhc3VjY2VlZGVkKTtcbiAgICAgIGVudHJ5LmlzSGVhZE9mTGVmdFJlY3Vyc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIG1lbW9SZWMudHJhY2VFbnRyeSA9IGVudHJ5O1xuICB9XG5cbiAgLy8gRml4IHRoZSBpbnB1dCBzdHJlYW0ncyBleGFtaW5lZExlbmd0aCAtLSBpdCBzaG91bGQgYmUgdGhlIG1heGltdW0gZXhhbWluZWQgbGVuZ3RoXG4gIC8vIGFjcm9zcyBhbGwgYXBwbGljYXRpb25zLCBub3QganVzdCB0aGlzIG9uZS5cbiAgaW5wdXRTdHJlYW0uZXhhbWluZWRMZW5ndGggPSBNYXRoLm1heChpbnB1dFN0cmVhbS5leGFtaW5lZExlbmd0aCwgb3JpZ0lucHV0U3RyZWFtRXhhbWluZWRMZW5ndGgpO1xuXG4gIHN0YXRlLmV4aXRBcHBsaWNhdGlvbihvcmlnUG9zSW5mbywgdmFsdWUpO1xuXG4gIHJldHVybiBzdWNjZWVkZWQ7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmV2YWxPbmNlID0gZnVuY3Rpb24oZXhwciwgc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuXG4gIGlmIChzdGF0ZS5ldmFsKGV4cHIpKSB7XG4gICAgdmFyIGFyaXR5ID0gZXhwci5nZXRBcml0eSgpO1xuICAgIHZhciBiaW5kaW5ncyA9IHN0YXRlLl9iaW5kaW5ncy5zcGxpY2Uoc3RhdGUuX2JpbmRpbmdzLmxlbmd0aCAtIGFyaXR5LCBhcml0eSk7XG4gICAgdmFyIG9mZnNldHMgPSBzdGF0ZS5fYmluZGluZ09mZnNldHMuc3BsaWNlKHN0YXRlLl9iaW5kaW5nT2Zmc2V0cy5sZW5ndGggLSBhcml0eSwgYXJpdHkpO1xuICAgIHJldHVybiBuZXcgTm9udGVybWluYWxOb2RlKFxuICAgICAgICBzdGF0ZS5ncmFtbWFyLCB0aGlzLnJ1bGVOYW1lLCBiaW5kaW5ncywgb2Zmc2V0cywgaW5wdXRTdHJlYW0ucG9zIC0gb3JpZ1Bvcyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmdyb3dTZWVkUmVzdWx0ID0gZnVuY3Rpb24oYm9keSwgc3RhdGUsIG9yaWdQb3MsIGxyTWVtb1JlYywgbmV3VmFsdWUpIHtcbiAgaWYgKCFuZXdWYWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgbHJNZW1vUmVjLm1hdGNoTGVuZ3RoID0gaW5wdXRTdHJlYW0ucG9zIC0gb3JpZ1BvcztcbiAgICBsck1lbW9SZWMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBsck1lbW9SZWMuZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uID0gc3RhdGUuY2xvbmVSZWNvcmRlZEZhaWx1cmVzKCk7XG5cbiAgICBpZiAoc3RhdGUuaXNUcmFjaW5nKCkpIHtcbiAgICAgIC8vIEJlZm9yZSBldmFsdWF0aW5nIHRoZSBib2R5IGFnYWluLCBhZGQgYSB0cmFjZSBub2RlIGZvciB0aGlzIGFwcGxpY2F0aW9uIHRvIHRoZSBtZW1vIGVudHJ5LlxuICAgICAgLy8gSXRzIG9ubHkgY2hpbGQgaXMgYSBjb3B5IG9mIHRoZSB0cmFjZSBub2RlIGZyb20gYG5ld1ZhbHVlYCwgd2hpY2ggd2lsbCBhbHdheXMgYmUgdGhlIGxhc3RcbiAgICAgIC8vIGVsZW1lbnQgaW4gYHN0YXRlLnRyYWNlYC5cbiAgICAgIHZhciBzZWVkVHJhY2UgPSBzdGF0ZS50cmFjZVtzdGF0ZS50cmFjZS5sZW5ndGggLSAxXTtcbiAgICAgIGxyTWVtb1JlYy50cmFjZUVudHJ5ID0gbmV3IFRyYWNlKFxuICAgICAgICAgIHN0YXRlLmlucHV0LCBvcmlnUG9zLCBpbnB1dFN0cmVhbS5wb3MsIHRoaXMsIHRydWUsIFtuZXdWYWx1ZV0sIFtzZWVkVHJhY2UuY2xvbmUoKV0pO1xuICAgIH1cbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgIG5ld1ZhbHVlID0gdGhpcy5ldmFsT25jZShib2R5LCBzdGF0ZSk7XG4gICAgaWYgKGlucHV0U3RyZWFtLnBvcyAtIG9yaWdQb3MgPD0gbHJNZW1vUmVjLm1hdGNoTGVuZ3RoKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHN0YXRlLmlzVHJhY2luZygpKSB7XG4gICAgICBzdGF0ZS50cmFjZS5zcGxpY2UoLTIsIDEpOyAgLy8gRHJvcCB0aGUgdHJhY2UgZm9yIHRoZSBvbGQgc2VlZC5cbiAgICB9XG4gIH1cbiAgaWYgKHN0YXRlLmlzVHJhY2luZygpKSB7XG4gICAgLy8gVGhlIGxhc3QgZW50cnkgaXMgZm9yIGFuIHVudXNlZCByZXN1bHQgLS0gcG9wIGl0IGFuZCBzYXZlIGl0IGluIHRoZSBcInJlYWxcIiBlbnRyeS5cbiAgICBsck1lbW9SZWMudHJhY2VFbnRyeS5yZWNvcmRMUlRlcm1pbmF0aW9uKHN0YXRlLnRyYWNlLnBvcCgpLCBuZXdWYWx1ZSk7XG4gIH1cbiAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcyArIGxyTWVtb1JlYy5tYXRjaExlbmd0aDtcbiAgcmV0dXJuIGxyTWVtb1JlYy52YWx1ZTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGNoID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAoY2ggJiYgdGhpcy5wYXR0ZXJuLnRlc3QoY2gpKSB7XG4gICAgc3RhdGUucHVzaEJpbmRpbmcobmV3IFRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCBjaCksIG9yaWdQb3MpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBIZWxwZXJzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBmbGF0dGVuKGxpc3RPZkxpc3RzKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBsaXN0T2ZMaXN0cyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGNvbW1vbi5hYnN0cmFjdCgnZ2VuZXJhdGVFeGFtcGxlJyk7XG5cbmZ1bmN0aW9uIGNhdGVnb3JpemVFeGFtcGxlcyhleGFtcGxlcykge1xuICAvLyBBIGxpc3Qgb2YgcnVsZXMgdGhhdCB0aGUgc3lzdGVtIG5lZWRzIGV4YW1wbGVzIG9mLCBpbiBvcmRlciB0byBnZW5lcmF0ZSBhbiBleGFtcGxlXG4gIC8vICAgZm9yIHRoZSBjdXJyZW50IHJ1bGVcbiAgdmFyIGV4YW1wbGVzTmVlZGVkID0gZXhhbXBsZXMuZmlsdGVyKGZ1bmN0aW9uKGV4YW1wbGUpIHtcbiAgICByZXR1cm4gZXhhbXBsZS5oYXNPd25Qcm9wZXJ0eSgnZXhhbXBsZXNOZWVkZWQnKTtcbiAgfSlcbiAgLm1hcChmdW5jdGlvbihleGFtcGxlKSB7IHJldHVybiBleGFtcGxlLmV4YW1wbGVzTmVlZGVkOyB9KTtcblxuICBleGFtcGxlc05lZWRlZCA9IGZsYXR0ZW4oZXhhbXBsZXNOZWVkZWQpO1xuXG4gIHZhciB1bmlxdWVFeGFtcGxlc05lZWRlZCA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGV4YW1wbGVzTmVlZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnRFeGFtcGxlTmVlZGVkID0gZXhhbXBsZXNOZWVkZWRbaV07XG4gICAgdW5pcXVlRXhhbXBsZXNOZWVkZWRbY3VycmVudEV4YW1wbGVOZWVkZWRdID0gdHJ1ZTtcbiAgfVxuICBleGFtcGxlc05lZWRlZCA9IE9iamVjdC5rZXlzKHVuaXF1ZUV4YW1wbGVzTmVlZGVkKTtcblxuICAvLyBBIGxpc3Qgb2Ygc3VjY2Vzc2Z1bGx5IGdlbmVyYXRlZCBleGFtcGxlc1xuICB2YXIgc3VjY2Vzc2Z1bEV4YW1wbGVzID0gZXhhbXBsZXMuZmlsdGVyKGZ1bmN0aW9uKGV4YW1wbGUpIHtcbiAgICByZXR1cm4gZXhhbXBsZS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKTtcbiAgfSlcbiAgLm1hcChmdW5jdGlvbihpdGVtKSB7IHJldHVybiBpdGVtLnZhbHVlOyB9KTtcblxuICAvLyBUaGlzIGZsYWcgcmV0dXJucyB0cnVlIGlmIHRoZSBzeXN0ZW0gY2Fubm90IGdlbmVyYXRlIHRoZSBydWxlIGl0IGlzIGN1cnJlbnRseVxuICAvLyAgIGF0dGVtcHRpbmcgdG8gZ2VuZXJhdGUsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBvciBub3QgaXQgaGFzIHRoZSBleGFtcGxlcyBpdCBuZWVkcy5cbiAgLy8gICBDdXJyZW50bHksIHRoaXMgaXMgb25seSB1c2VkIGluIG92ZXJyaWRpbmcgZ2VuZXJhdG9ycyB0byBwcmV2ZW50IHRoZSBzeXN0ZW0gZnJvbVxuICAvLyAgIGdlbmVyYXRpbmcgZXhhbXBsZXMgZm9yIGNlcnRhaW4gcnVsZXMgKGUuZy4gJ2lkZW50JykuXG4gIHZhciBuZWVkSGVscCA9IGV4YW1wbGVzLnNvbWUoZnVuY3Rpb24oaXRlbSkgeyByZXR1cm4gaXRlbS5uZWVkSGVscDsgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBleGFtcGxlc05lZWRlZDogZXhhbXBsZXNOZWVkZWQsXG4gICAgc3VjY2Vzc2Z1bEV4YW1wbGVzOiBzdWNjZXNzZnVsRXhhbXBsZXMsXG4gICAgbmVlZEhlbHA6IG5lZWRIZWxwXG4gIH07XG59XG5cbnBleHBycy5hbnkuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICByZXR1cm4ge3ZhbHVlOiBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSkpfTtcbn07XG5cbi8vIEFzc3VtZXMgdGhhdCB0ZXJtaW5hbCdzIG9iamVjdCBpcyBhbHdheXMgYSBzdHJpbmdcbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCkge1xuICByZXR1cm4ge3ZhbHVlOiB0aGlzLm9ian07XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQpIHtcbiAgdmFyIHJhbmdlU2l6ZSA9IHRoaXMudG8uY2hhckNvZGVBdCgwKSAtIHRoaXMuZnJvbS5jaGFyQ29kZUF0KDApO1xuICByZXR1cm4ge3ZhbHVlOiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgIHRoaXMuZnJvbS5jaGFyQ29kZUF0KDApICsgTWF0aC5mbG9vcihyYW5nZVNpemUgKiBNYXRoLnJhbmRvbSgpKVxuICApfTtcbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICByZXR1cm4gYWN0dWFsc1t0aGlzLmluZGV4XS5nZW5lcmF0ZUV4YW1wbGUoZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscyk7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIC8vIGl0ZW1zIC0+IHRlcm1FeGFtcGxlc1xuICB2YXIgdGVybUV4YW1wbGVzID0gdGhpcy50ZXJtcy5tYXAoZnVuY3Rpb24odGVybSkge1xuICAgIHJldHVybiB0ZXJtLmdlbmVyYXRlRXhhbXBsZShncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKTtcbiAgfSk7XG5cbiAgdmFyIGNhdGVnb3JpemVkRXhhbXBsZXMgPSBjYXRlZ29yaXplRXhhbXBsZXModGVybUV4YW1wbGVzKTtcblxuICB2YXIgZXhhbXBsZXNOZWVkZWQgPSBjYXRlZ29yaXplZEV4YW1wbGVzLmV4YW1wbGVzTmVlZGVkO1xuICB2YXIgc3VjY2Vzc2Z1bEV4YW1wbGVzID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5zdWNjZXNzZnVsRXhhbXBsZXM7XG4gIHZhciBuZWVkSGVscCA9IGNhdGVnb3JpemVkRXhhbXBsZXMubmVlZEhlbHA7XG5cbiAgdmFyIGFucyA9IHt9O1xuXG4gIC8vIEFsdCBjYW4gY29udGFpbiBib3RoIGFuIGV4YW1wbGUgYW5kIGEgcmVxdWVzdCBmb3IgZXhhbXBsZXNcbiAgaWYgKHN1Y2Nlc3NmdWxFeGFtcGxlcy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdWNjZXNzZnVsRXhhbXBsZXMubGVuZ3RoKTtcbiAgICBhbnMudmFsdWUgPSBzdWNjZXNzZnVsRXhhbXBsZXNbaV07XG4gIH1cbiAgaWYgKGV4YW1wbGVzTmVlZGVkLmxlbmd0aCA+IDApIHtcbiAgICBhbnMuZXhhbXBsZXNOZWVkZWQgPSBleGFtcGxlc05lZWRlZDtcbiAgfVxuICBhbnMubmVlZEhlbHAgPSBuZWVkSGVscDtcblxuICByZXR1cm4gYW5zO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICB2YXIgZmFjdG9yRXhhbXBsZXMgPSB0aGlzLmZhY3RvcnMubWFwKGZ1bmN0aW9uKGZhY3Rvcikge1xuICAgIHJldHVybiBmYWN0b3IuZ2VuZXJhdGVFeGFtcGxlKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpO1xuICB9KTtcbiAgdmFyIGNhdGVnb3JpemVkRXhhbXBsZXMgPSBjYXRlZ29yaXplRXhhbXBsZXMoZmFjdG9yRXhhbXBsZXMpO1xuXG4gIHZhciBleGFtcGxlc05lZWRlZCA9IGNhdGVnb3JpemVkRXhhbXBsZXMuZXhhbXBsZXNOZWVkZWQ7XG4gIHZhciBzdWNjZXNzZnVsRXhhbXBsZXMgPSBjYXRlZ29yaXplZEV4YW1wbGVzLnN1Y2Nlc3NmdWxFeGFtcGxlcztcbiAgdmFyIG5lZWRIZWxwID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5uZWVkSGVscDtcblxuICB2YXIgYW5zID0ge307XG5cbiAgLy8gSW4gYSBTZXEsIGFsbCBwaWVjZXMgbXVzdCBzdWNjZWVkIGluIG9yZGVyIHRvIGhhdmUgYSBzdWNjZXNzZnVsIGV4YW1wbGUuXG4gIGlmIChleGFtcGxlc05lZWRlZC5sZW5ndGggPiAwIHx8IG5lZWRIZWxwKSB7XG4gICAgYW5zLmV4YW1wbGVzTmVlZGVkID0gZXhhbXBsZXNOZWVkZWQ7XG4gICAgYW5zLm5lZWRIZWxwID0gbmVlZEhlbHA7XG4gIH0gZWxzZSB7XG4gICAgYW5zLnZhbHVlID0gc3VjY2Vzc2Z1bEV4YW1wbGVzLmpvaW4oaW5TeW50YWN0aWNDb250ZXh0ID8gJyAnIDogJycpO1xuICB9XG5cbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIHZhciByYW5nZVRpbWVzID0gTWF0aC5taW4odGhpcy5tYXhOdW1NYXRjaGVzIC0gdGhpcy5taW5OdW1NYXRjaGVzLCAzKTtcbiAgdmFyIG51bVRpbWVzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHJhbmdlVGltZXMgKyAxKSArIHRoaXMubWluTnVtTWF0Y2hlcyk7XG4gIHZhciBpdGVtcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVGltZXM7IGkrKykge1xuICAgIGl0ZW1zLnB1c2godGhpcy5leHByLmdlbmVyYXRlRXhhbXBsZShncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSk7XG4gIH1cblxuICB2YXIgY2F0ZWdvcml6ZWRFeGFtcGxlcyA9IGNhdGVnb3JpemVFeGFtcGxlcyhpdGVtcyk7XG5cbiAgdmFyIGV4YW1wbGVzTmVlZGVkID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5leGFtcGxlc05lZWRlZDtcbiAgdmFyIHN1Y2Nlc3NmdWxFeGFtcGxlcyA9IGNhdGVnb3JpemVkRXhhbXBsZXMuc3VjY2Vzc2Z1bEV4YW1wbGVzO1xuXG4gIHZhciBhbnMgPSB7fTtcblxuICAvLyBJdCdzIGFsd2F5cyBlaXRoZXIgb25lIG9yIHRoZSBvdGhlci5cbiAgLy8gVE9ETzogaW5zdGVhZCBvZiAnICcsIGNhbGwgJ3NwYWNlcy5nZW5lcmF0ZUV4YW1wbGUoKSdcbiAgYW5zLnZhbHVlID0gc3VjY2Vzc2Z1bEV4YW1wbGVzLmpvaW4oaW5TeW50YWN0aWNDb250ZXh0ID8gJyAnIDogJycpO1xuICBpZiAoZXhhbXBsZXNOZWVkZWQubGVuZ3RoID4gMCkge1xuICAgIGFucy5leGFtcGxlc05lZWRlZCA9IGV4YW1wbGVzTmVlZGVkO1xuICB9XG5cbiAgcmV0dXJuIGFucztcbn07XG5cbi8vIFJpZ2h0IG5vdywgJ05vdCcgYW5kICdMb29rYWhlYWQnIGdlbmVyYXRlIG5vdGhpbmcgYW5kIGFzc3VtZSB0aGF0IHdoYXRldmVyIGZvbGxvd3Mgd2lsbFxuLy8gICB3b3JrIGFjY29yZGluZyB0byB0aGUgZW5jb2RlZCBjb25zdHJhaW50cy5cbnBleHBycy5Ob3QucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQpIHtcbiAgcmV0dXJuIHt2YWx1ZTogJyd9O1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCkge1xuICByZXR1cm4ge3ZhbHVlOiAnJ307XG59O1xuXG5wZXhwcnMuTGV4LnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2VuZXJhdGVFeGFtcGxlKGdyYW1tYXIsIGV4YW1wbGVzLCBmYWxzZSwgYWN0dWFscyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgdmFyIGFucyA9IHt9O1xuXG4gIHZhciBydWxlTmFtZSA9IHRoaXMuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKS50b1N0cmluZygpO1xuXG4gIGlmICghZXhhbXBsZXMuaGFzT3duUHJvcGVydHkocnVsZU5hbWUpKSB7XG4gICAgYW5zLmV4YW1wbGVzTmVlZGVkID0gW3J1bGVOYW1lXTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcmVsZXZhbnRFeGFtcGxlcyA9IGV4YW1wbGVzW3J1bGVOYW1lXTtcbiAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJlbGV2YW50RXhhbXBsZXMubGVuZ3RoKTtcbiAgICBhbnMudmFsdWUgPSByZWxldmFudEV4YW1wbGVzW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oXG4gICAgZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICB2YXIgY2hhcjtcbiAgc3dpdGNoICh0aGlzLmNhdGVnb3J5KSB7XG4gICAgY2FzZSAnTHUnOiBjaGFyID0gJ8OBJzsgYnJlYWs7XG4gICAgY2FzZSAnTGwnOiBjaGFyID0gJ8WPJzsgYnJlYWs7XG4gICAgY2FzZSAnTHQnOiBjaGFyID0gJ8eFJzsgYnJlYWs7XG4gICAgY2FzZSAnTG0nOiBjaGFyID0gJ8uuJzsgYnJlYWs7XG4gICAgY2FzZSAnTG8nOiBjaGFyID0gJ8a7JzsgYnJlYWs7XG5cbiAgICBjYXNlICdObCc6IGNoYXIgPSAn4oaCJzsgYnJlYWs7XG4gICAgY2FzZSAnTmQnOiBjaGFyID0gJ8K9JzsgYnJlYWs7XG5cbiAgICBjYXNlICdNbic6IGNoYXIgPSAnXFx1MDQ4Nyc7IGJyZWFrO1xuICAgIGNhc2UgJ01jJzogY2hhciA9ICfgpL8nOyBicmVhaztcblxuICAgIGNhc2UgJ1BjJzogY2hhciA9ICfigYAnOyBicmVhaztcblxuICAgIGNhc2UgJ1pzJzogY2hhciA9ICdcXHUyMDAxJzsgYnJlYWs7XG5cbiAgICBjYXNlICdMJzogY2hhciA9ICfDgSc7IGJyZWFrO1xuICAgIGNhc2UgJ0x0bW8nOiBjaGFyID0gJ8eFJzsgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHt2YWx1ZTogY2hhcn07IC8vIPCfkqlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5nZXRBcml0eSA9IGNvbW1vbi5hYnN0cmFjdCgnZ2V0QXJpdHknKTtcblxucGV4cHJzLmFueS5nZXRBcml0eSA9XG5wZXhwcnMuZW5kLmdldEFyaXR5ID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuZ2V0QXJpdHkgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5nZXRBcml0eSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmdldEFyaXR5ID1cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZ2V0QXJpdHkgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRoaXMgaXMgb2sgYi9jIGFsbCB0ZXJtcyBtdXN0IGhhdmUgdGhlIHNhbWUgYXJpdHkgLS0gdGhpcyBwcm9wZXJ0eSBpc1xuICAvLyBjaGVja2VkIGJ5IHRoZSBHcmFtbWFyIGNvbnN0cnVjdG9yLlxuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDAgPyAwIDogdGhpcy50ZXJtc1swXS5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFyaXR5ID0gMDtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBhcml0eSArPSB0aGlzLmZhY3RvcnNbaWR4XS5nZXRBcml0eSgpO1xuICB9XG4gIHJldHVybiBhcml0eTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5leHByLmdldEFyaXR5KCk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMDtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmdldEFyaXR5ID1cbnBleHBycy5MZXgucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QXJpdHkoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgQ2FsbGVkIGF0IGdyYW1tYXIgY3JlYXRpb24gdGltZSB0byByZXdyaXRlIGEgcnVsZSBib2R5LCByZXBsYWNpbmcgZWFjaCByZWZlcmVuY2UgdG8gYSBmb3JtYWxcbiAgcGFyYW1ldGVyIHdpdGggYSBgUGFyYW1gIG5vZGUuIFJldHVybnMgYSBQRXhwciAtLSBlaXRoZXIgYSBuZXcgb25lLCBvciB0aGUgb3JpZ2luYWwgb25lIGlmXG4gIGl0IHdhcyBtb2RpZmllZCBpbiBwbGFjZS5cbiovXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGNvbW1vbi5hYnN0cmFjdCgnaW50cm9kdWNlUGFyYW1zJyk7XG5cbnBleHBycy5hbnkuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5lbmQuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdGhpcy50ZXJtcy5mb3JFYWNoKGZ1bmN0aW9uKHRlcm0sIGlkeCwgdGVybXMpIHtcbiAgICB0ZXJtc1tpZHhdID0gdGVybS5pbnRyb2R1Y2VQYXJhbXMoZm9ybWFscyk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdGhpcy5mYWN0b3JzLmZvckVhY2goZnVuY3Rpb24oZmFjdG9yLCBpZHgsIGZhY3RvcnMpIHtcbiAgICBmYWN0b3JzW2lkeF0gPSBmYWN0b3IuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5Ob3QucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5pbnRyb2R1Y2VQYXJhbXMgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICB0aGlzLmV4cHIgPSB0aGlzLmV4cHIuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICB2YXIgaW5kZXggPSBmb3JtYWxzLmluZGV4T2YodGhpcy5ydWxlTmFtZSk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgaWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBUT0RPOiBTaG91bGQgdGhpcyBiZSBzdXBwb3J0ZWQ/IFNlZSBpc3N1ZSAjNjQuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlcml6ZWQgcnVsZXMgY2Fubm90IGJlIHBhc3NlZCBhcyBhcmd1bWVudHMgdG8gYW5vdGhlciBydWxlLicpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5QYXJhbShpbmRleCkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnLCBpZHgsIGFyZ3MpIHtcbiAgICAgIGFyZ3NbaWR4XSA9IGFyZy5pbnRyb2R1Y2VQYXJhbXMoZm9ybWFscyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhpcyBwYXJzaW5nIGV4cHJlc3Npb24gbWF5IGFjY2VwdCB3aXRob3V0IGNvbnN1bWluZyBhbnkgaW5wdXQuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmlzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiB0aGlzLl9pc051bGxhYmxlKGdyYW1tYXIsIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufTtcblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGNvbW1vbi5hYnN0cmFjdCgnX2lzTnVsbGFibGUnKTtcblxucGV4cHJzLmFueS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLl9pc051bGxhYmxlID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuX2lzTnVsbGFibGUgPVxucGV4cHJzLlBsdXMucHJvdG90eXBlLl9pc051bGxhYmxlID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5lbmQuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBUaGlzIGlzIGFuIG92ZXItc2ltcGxpZmljYXRpb246IGl0J3Mgb25seSBjb3JyZWN0IGlmIHRoZSBpbnB1dCBpcyBhIHN0cmluZy4gSWYgaXQncyBhbiBhcnJheVxuICAgIC8vIG9yIGFuIG9iamVjdCwgdGhlbiB0aGUgZW1wdHkgc3RyaW5nIHBhcnNpbmcgZXhwcmVzc2lvbiBpcyBub3QgbnVsbGFibGUuXG4gICAgcmV0dXJuIHRoaXMub2JqID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDAgfHxcbiAgICAgIHRoaXMudGVybXMuc29tZShmdW5jdGlvbih0ZXJtKSB7IHJldHVybiB0ZXJtLl9pc051bGxhYmxlKGdyYW1tYXIsIG1lbW8pOyB9KTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gdGhpcy5mYWN0b3JzLmV2ZXJ5KGZ1bmN0aW9uKGZhY3RvcikgeyByZXR1cm4gZmFjdG9yLl9pc051bGxhYmxlKGdyYW1tYXIsIG1lbW8pOyB9KTtcbn07XG5cbnBleHBycy5TdGFyLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuT3B0LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTGV4LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHZhciBrZXkgPSB0aGlzLnRvTWVtb0tleSgpO1xuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtZW1vLCBrZXkpKSB7XG4gICAgdmFyIGJvZHkgPSBncmFtbWFyLnJ1bGVzW3RoaXMucnVsZU5hbWVdLmJvZHk7XG4gICAgdmFyIGlubGluZWQgPSBib2R5LnN1YnN0aXR1dGVQYXJhbXModGhpcy5hcmdzKTtcbiAgICBtZW1vW2tleV0gPSBmYWxzZTsgIC8vIFByZXZlbnQgaW5maW5pdGUgcmVjdXJzaW9uIGZvciByZWN1cnNpdmUgcnVsZXMuXG4gICAgbWVtb1trZXldID0gaW5saW5lZC5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTtcbiAgfVxuICByZXR1cm4gbWVtb1trZXldO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBnZXRNZXRhSW5mbyhleHByLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgdmFyIG1ldGFJbmZvID0ge307XG4gIGlmIChleHByLnNvdXJjZSAmJiBncmFtbWFySW50ZXJ2YWwpIHtcbiAgICB2YXIgYWRqdXN0ZWQgPSBleHByLnNvdXJjZS5yZWxhdGl2ZVRvKGdyYW1tYXJJbnRlcnZhbCk7XG4gICAgbWV0YUluZm8uc291cmNlSW50ZXJ2YWwgPSBbYWRqdXN0ZWQuc3RhcnRJZHgsIGFkanVzdGVkLmVuZElkeF07XG4gIH1cbiAgcmV0dXJuIG1ldGFJbmZvO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBjb21tb24uYWJzdHJhY3QoJ291dHB1dFJlY2lwZScpO1xuXG5wZXhwcnMuYW55Lm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gWydhbnknLCBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpXTtcbn07XG5cbnBleHBycy5lbmQub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbJ2VuZCcsIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbCldO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAndGVybWluYWwnLFxuICAgIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbCksXG4gICAgdGhpcy5vYmpcbiAgXTtcbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3JhbmdlJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMuZnJvbSxcbiAgICB0aGlzLnRvXG4gIF07XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICdwYXJhbScsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmluZGV4XG4gIF07XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAnYWx0JyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpXG4gIF0uY29uY2F0KHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHtcbiAgICByZXR1cm4gdGVybS5vdXRwdXRSZWNpcGUoZm9ybWFscywgZ3JhbW1hckludGVydmFsKTtcbiAgfSkpO1xufTtcblxucGV4cHJzLkV4dGVuZC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHZhciBleHRlbnNpb24gPSB0aGlzLnRlcm1zWzBdOyAvLyBbZXh0ZW5zaW9uLCBvcmdpbmFsXVxuICByZXR1cm4gZXh0ZW5zaW9uLm91dHB1dFJlY2lwZShmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3NlcScsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKVxuICBdLmNvbmNhdCh0aGlzLmZhY3RvcnMubWFwKGZ1bmN0aW9uKGZhY3Rvcikge1xuICAgIHJldHVybiBmYWN0b3Iub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCk7XG4gIH0pKTtcbn07XG5cbnBleHBycy5TdGFyLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLlBsdXMucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9XG5wZXhwcnMuT3B0LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUudG9Mb3dlckNhc2UoKSxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUoZm9ybWFscywgZ3JhbW1hckludGVydmFsKVxuICBdO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAnYXBwJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMucnVsZU5hbWUsXG4gICAgdGhpcy5hcmdzLm1hcChmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBhcmcub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCk7XG4gICAgfSlcbiAgXTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3VuaWNvZGVDaGFyJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMuY2F0ZWdvcnlcbiAgXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgUmV0dXJucyBhIFBFeHByIHRoYXQgcmVzdWx0cyBmcm9tIHJlY3Vyc2l2ZWx5IHJlcGxhY2luZyBldmVyeSBmb3JtYWwgcGFyYW1ldGVyIChpLmUuLCBpbnN0YW5jZVxuICBvZiBgUGFyYW1gKSBpbnNpZGUgdGhpcyBQRXhwciB3aXRoIGl0cyBhY3R1YWwgdmFsdWUgZnJvbSBgYWN0dWFsc2AgKGFuIEFycmF5KS5cblxuICBUaGUgcmVjZWl2ZXIgbXVzdCBub3QgYmUgbW9kaWZpZWQ7IGEgbmV3IFBFeHByIG11c3QgYmUgcmV0dXJuZWQgaWYgYW55IHJlcGxhY2VtZW50IGlzIG5lY2Vzc2FyeS5cbiovXG4vLyBmdW5jdGlvbihhY3R1YWxzKSB7IC4uLiB9XG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBjb21tb24uYWJzdHJhY3QoJ3N1YnN0aXR1dGVQYXJhbXMnKTtcblxucGV4cHJzLmFueS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5lbmQuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIHJldHVybiBhY3R1YWxzW3RoaXMuaW5kZXhdO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgcmV0dXJuIG5ldyBwZXhwcnMuQWx0KFxuICAgICAgdGhpcy50ZXJtcy5tYXAoZnVuY3Rpb24odGVybSkgeyByZXR1cm4gdGVybS5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpOyB9KSk7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICByZXR1cm4gbmV3IHBleHBycy5TZXEoXG4gICAgICB0aGlzLmZhY3RvcnMubWFwKGZ1bmN0aW9uKGZhY3RvcikgeyByZXR1cm4gZmFjdG9yLnN1YnN0aXR1dGVQYXJhbXMoYWN0dWFscyk7IH0pKTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5Ob3QucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5leHByLnN1YnN0aXR1dGVQYXJhbXMoYWN0dWFscykpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICBpZiAodGhpcy5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIEF2b2lkIG1ha2luZyBhIGNvcHkgb2YgdGhpcyBhcHBsaWNhdGlvbiwgYXMgYW4gb3B0aW1pemF0aW9uXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGFyZ3MgPSB0aGlzLmFyZ3MubWFwKGZ1bmN0aW9uKGFyZykgeyByZXR1cm4gYXJnLnN1YnN0aXR1dGVQYXJhbXMoYWN0dWFscyk7IH0pO1xuICAgIHJldHVybiBuZXcgcGV4cHJzLkFwcGx5KHRoaXMucnVsZU5hbWUsIGFyZ3MpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxudmFyIGNvcHlXaXRob3V0RHVwbGljYXRlcyA9IGNvbW1vbi5jb3B5V2l0aG91dER1cGxpY2F0ZXM7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBpc1Jlc3RyaWN0ZWRKU0lkZW50aWZpZXIoc3RyKSB7XG4gIHJldHVybiAvXlthLXpBLVpfJF1bMC05YS16QS1aXyRdKiQvLnRlc3Qoc3RyKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUR1cGxpY2F0ZWROYW1lcyhhcmd1bWVudE5hbWVMaXN0KSB7XG4gIC8vIGBjb3VudGAgaXMgdXNlZCB0byByZWNvcmQgdGhlIG51bWJlciBvZiB0aW1lcyBlYWNoIGFyZ3VtZW50IG5hbWUgb2NjdXJzIGluIHRoZSBsaXN0LFxuICAvLyB0aGlzIGlzIHVzZWZ1bCBmb3IgY2hlY2tpbmcgZHVwbGljYXRlZCBhcmd1bWVudCBuYW1lLiBJdCBtYXBzIGFyZ3VtZW50IG5hbWVzIHRvIGludHMuXG4gIHZhciBjb3VudCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGFyZ3VtZW50TmFtZUxpc3QuZm9yRWFjaChmdW5jdGlvbihhcmdOYW1lKSB7XG4gICAgY291bnRbYXJnTmFtZV0gPSAoY291bnRbYXJnTmFtZV0gfHwgMCkgKyAxO1xuICB9KTtcblxuICAvLyBBcHBlbmQgc3Vic2NyaXB0cyAoJ18xJywgJ18yJywgLi4uKSB0byBkdXBsaWNhdGUgYXJndW1lbnQgbmFtZXMuXG4gIE9iamVjdC5rZXlzKGNvdW50KS5mb3JFYWNoKGZ1bmN0aW9uKGR1cEFyZ05hbWUpIHtcbiAgICBpZiAoY291bnRbZHVwQXJnTmFtZV0gPD0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbmFtZSBzaG93cyB1cCBtb3JlIHRoYW4gb25jZSwgc28gYWRkIHN1YnNjcmlwdHMuXG4gICAgdmFyIHN1YnNjcmlwdCA9IDE7XG4gICAgYXJndW1lbnROYW1lTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGFyZ05hbWUsIGlkeCkge1xuICAgICAgaWYgKGFyZ05hbWUgPT09IGR1cEFyZ05hbWUpIHtcbiAgICAgICAgYXJndW1lbnROYW1lTGlzdFtpZHhdID0gYXJnTmFtZSArICdfJyArIHN1YnNjcmlwdCsrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIFJldHVybnMgYSBsaXN0IG9mIHN0cmluZ3MgdGhhdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGRlZmF1bHQgYXJndW1lbnQgbmFtZXMgZm9yIGl0cyByZWNlaXZlclxuICAoYSBwZXhwcikgaW4gYSBzZW1hbnRpYyBhY3Rpb24uIFRoaXMgaXMgdXNlZCBleGNsdXNpdmVseSBieSB0aGUgU2VtYW50aWNzIEVkaXRvci5cblxuICBgZmlyc3RBcmdJbmRleGAgaXMgdGhlIDEtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGFyZ3VtZW50IG5hbWUgdGhhdCB3aWxsIGJlIGdlbmVyYXRlZCBmb3IgdGhpc1xuICBwZXhwci4gSXQgZW5hYmxlcyB1cyB0byBuYW1lIGFyZ3VtZW50cyBwb3NpdGlvbmFsbHksIGUuZy4sIGlmIHRoZSBzZWNvbmQgYXJndW1lbnQgaXMgYVxuICBub24tYWxwaGFudW1lcmljIHRlcm1pbmFsIGxpa2UgXCIrXCIsIGl0IHdpbGwgYmUgbmFtZWQgJyQyJy5cblxuICBgbm9EdXBDaGVja2AgaXMgdHJ1ZSBpZiB0aGUgY2FsbGVyIG9mIGB0b0FyZ3VtZW50TmFtZUxpc3RgIGlzIG5vdCBhIHRvcCBsZXZlbCBjYWxsZXIuIEl0IGVuYWJsZXNcbiAgdXMgdG8gYXZvaWQgbmVzdGVkIGR1cGxpY2F0aW9uIHN1YnNjcmlwdHMgYXBwZW5kaW5nLCBlLmcuLCAnXzFfMScsICdfMV8yJywgYnkgb25seSBjaGVja2luZ1xuICBkdXBsaWNhdGVzIGF0IHRoZSB0b3AgbGV2ZWwuXG5cbiAgSGVyZSBpcyBhIG1vcmUgZWxhYm9yYXRlIGV4YW1wbGUgdGhhdCBpbGx1c3RyYXRlcyBob3cgdGhpcyBtZXRob2Qgd29ya3M6XG4gIGAoYSBcIitcIiBiKS50b0FyZ3VtZW50TmFtZUxpc3QoMSlgIGV2YWx1YXRlcyB0byBgWydhJywgJyQyJywgJ2InXWAgd2l0aCB0aGUgZm9sbG93aW5nIHJlY3Vyc2l2ZVxuICBjYWxsczpcblxuICAgIChhKS50b0FyZ3VtZW50TmFtZUxpc3QoMSkgLT4gWydhJ10sXG4gICAgKFwiK1wiKS50b0FyZ3VtZW50TmFtZUxpc3QoMikgLT4gWyckMiddLFxuICAgIChiKS50b0FyZ3VtZW50TmFtZUxpc3QoMykgLT4gWydiJ11cblxuICBOb3RlczpcbiAgKiBUaGlzIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIG9uIHdlbGwtZm9ybWVkIGV4cHJlc3Npb25zLCBlLmcuLCB0aGUgcmVjZWl2ZXIgbXVzdFxuICAgIG5vdCBoYXZlIGFueSBBbHQgc3ViLWV4cHJlc3Npb25zIHdpdGggaW5jb25zaXN0ZW50IGFyaXRpZXMuXG4gICogZS5nZXRBcml0eSgpID09PSBlLnRvQXJndW1lbnROYW1lTGlzdCgxKS5sZW5ndGhcbiovXG4vLyBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7IC4uLiB9XG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGNvbW1vbi5hYnN0cmFjdCgndG9Bcmd1bWVudE5hbWVMaXN0Jyk7XG5cbnBleHBycy5hbnkudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gWydhbnknXTtcbn07XG5cbnBleHBycy5lbmQudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gWydlbmQnXTtcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICBpZiAodHlwZW9mIHRoaXMub2JqID09PSAnc3RyaW5nJyAmJiAvXltfYS16QS1aMC05XSskLy50ZXN0KHRoaXMub2JqKSkge1xuICAgIC8vIElmIHRoaXMgdGVybWluYWwgaXMgYSB2YWxpZCBzdWZmaXggZm9yIGEgSlMgaWRlbnRpZmllciwganVzdCBwcmVwZW5kIGl0IHdpdGggJ18nXG4gICAgcmV0dXJuIFsnXycgKyB0aGlzLm9ial07XG4gIH0gZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlLCBuYW1lIGl0IHBvc2l0aW9uYWxseS5cbiAgICByZXR1cm4gWyckJyArIGZpcnN0QXJnSW5kZXhdO1xuICB9XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgdmFyIGFyZ05hbWUgPSB0aGlzLmZyb20gKyAnX3RvXycgKyB0aGlzLnRvO1xuICAvLyBJZiB0aGUgYGFyZ05hbWVgIGlzIG5vdCB2YWxpZCB0aGVuIHRyeSB0byBwcmVwZW5kIGEgYF9gLlxuICBpZiAoIWlzUmVzdHJpY3RlZEpTSWRlbnRpZmllcihhcmdOYW1lKSkge1xuICAgIGFyZ05hbWUgPSAnXycgKyBhcmdOYW1lO1xuICB9XG4gIC8vIElmIHRoZSBgYXJnTmFtZWAgc3RpbGwgbm90IHZhbGlkIGFmdGVyIHByZXBlbmRpbmcgYSBgX2AsIHRoZW4gbmFtZSBpdCBwb3NpdGlvbmFsbHkuXG4gIGlmICghaXNSZXN0cmljdGVkSlNJZGVudGlmaWVyKGFyZ05hbWUpKSB7XG4gICAgYXJnTmFtZSA9ICckJyArIGZpcnN0QXJnSW5kZXg7XG4gIH1cbiAgcmV0dXJuIFthcmdOYW1lXTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgLy8gYHRlcm1BcmdOYW1lTGlzdHNgIGlzIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoIHJvdyBpcyB0aGVcbiAgLy8gYXJndW1lbnQgbmFtZSBsaXN0IHRoYXQgY29ycmVzcG9uZHMgdG8gYSB0ZXJtIGluIHRoaXMgYWx0ZXJuYXRpb24uXG4gIHZhciB0ZXJtQXJnTmFtZUxpc3RzID0gdGhpcy50ZXJtcy5tYXAoZnVuY3Rpb24odGVybSkge1xuICAgIHJldHVybiB0ZXJtLnRvQXJndW1lbnROYW1lTGlzdChmaXJzdEFyZ0luZGV4LCB0cnVlKTtcbiAgfSk7XG5cbiAgdmFyIGFyZ3VtZW50TmFtZUxpc3QgPSBbXTtcbiAgdmFyIG51bUFyZ3MgPSB0ZXJtQXJnTmFtZUxpc3RzWzBdLmxlbmd0aDtcbiAgZm9yICh2YXIgY29sSWR4ID0gMDsgY29sSWR4IDwgbnVtQXJnczsgY29sSWR4KyspIHtcbiAgICB2YXIgY29sID0gW107XG4gICAgZm9yICh2YXIgcm93SWR4ID0gMDsgcm93SWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IHJvd0lkeCsrKSB7XG4gICAgICBjb2wucHVzaCh0ZXJtQXJnTmFtZUxpc3RzW3Jvd0lkeF1bY29sSWR4XSk7XG4gICAgfVxuICAgIHZhciB1bmlxdWVOYW1lcyA9IGNvcHlXaXRob3V0RHVwbGljYXRlcyhjb2wpO1xuICAgIGFyZ3VtZW50TmFtZUxpc3QucHVzaCh1bmlxdWVOYW1lcy5qb2luKCdfb3JfJykpO1xuICB9XG5cbiAgaWYgKCFub0R1cENoZWNrKSB7XG4gICAgcmVzb2x2ZUR1cGxpY2F0ZWROYW1lcyhhcmd1bWVudE5hbWVMaXN0KTtcbiAgfVxuICByZXR1cm4gYXJndW1lbnROYW1lTGlzdDtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgLy8gR2VuZXJhdGUgdGhlIGFyZ3VtZW50IG5hbWUgbGlzdCwgd2l0aG91dCB3b3JyeWluZyBhYm91dCBkdXBsaWNhdGVzLlxuICB2YXIgYXJndW1lbnROYW1lTGlzdCA9IFtdO1xuICB0aGlzLmZhY3RvcnMuZm9yRWFjaChmdW5jdGlvbihmYWN0b3IpIHtcbiAgICB2YXIgZmFjdG9yQXJndW1lbnROYW1lTGlzdCA9IGZhY3Rvci50b0FyZ3VtZW50TmFtZUxpc3QoZmlyc3RBcmdJbmRleCwgdHJ1ZSk7XG4gICAgYXJndW1lbnROYW1lTGlzdCA9IGFyZ3VtZW50TmFtZUxpc3QuY29uY2F0KGZhY3RvckFyZ3VtZW50TmFtZUxpc3QpO1xuXG4gICAgLy8gU2hpZnQgdGhlIGZpcnN0QXJnSW5kZXggdG8gdGFrZSB0aGlzIGZhY3RvcidzIGFyZ3VtZW50IG5hbWVzIGludG8gYWNjb3VudC5cbiAgICBmaXJzdEFyZ0luZGV4ICs9IGZhY3RvckFyZ3VtZW50TmFtZUxpc3QubGVuZ3RoO1xuICB9KTtcbiAgaWYgKCFub0R1cENoZWNrKSB7XG4gICAgcmVzb2x2ZUR1cGxpY2F0ZWROYW1lcyhhcmd1bWVudE5hbWVMaXN0KTtcbiAgfVxuICByZXR1cm4gYXJndW1lbnROYW1lTGlzdDtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHZhciBhcmd1bWVudE5hbWVMaXN0ID0gdGhpcy5leHByLnRvQXJndW1lbnROYW1lTGlzdChmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKVxuICAgIC5tYXAoZnVuY3Rpb24oZXhwckFyZ3VtZW50U3RyaW5nKSB7XG4gICAgICByZXR1cm4gZXhwckFyZ3VtZW50U3RyaW5nW2V4cHJBcmd1bWVudFN0cmluZy5sZW5ndGggLSAxXSA9PT0gJ3MnID9cbiAgICAgICAgICBleHByQXJndW1lbnRTdHJpbmcgKyAnZXMnIDpcbiAgICAgICAgICBleHByQXJndW1lbnRTdHJpbmcgKyAncyc7XG4gICAgfSk7XG4gIGlmICghbm9EdXBDaGVjaykge1xuICAgIHJlc29sdmVEdXBsaWNhdGVkTmFtZXMoYXJndW1lbnROYW1lTGlzdCk7XG4gIH1cbiAgcmV0dXJuIGFyZ3VtZW50TmFtZUxpc3Q7XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiB0aGlzLmV4cHIudG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spLm1hcChmdW5jdGlvbihhcmdOYW1lKSB7XG4gICAgcmV0dXJuICdvcHQnICsgYXJnTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgYXJnTmFtZS5zbGljZSgxKTtcbiAgfSk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiBbXTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiB0aGlzLmV4cHIudG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiBbdGhpcy5ydWxlTmFtZV07XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIFsnJCcgKyBmaXJzdEFyZ0luZGV4XTtcbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gWydwYXJhbScgKyB0aGlzLmluZGV4XTtcbn07XG5cbi8vIFwiVmFsdWUgcGV4cHJzXCIgKFZhbHVlLCBTdHIsIEFyciwgT2JqKSBhcmUgZ29pbmcgYXdheSBzb29uLCBzbyB3ZSBkb24ndCB3b3JyeSBhYm91dCB0aGVtIGhlcmUuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIFBFeHByLCBmb3IgdXNlIGFzIGEgVUkgbGFiZWwsIGV0Yy5cbnBleHBycy5QRXhwci5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gY29tbW9uLmFic3RyYWN0KCd0b0Rpc3BsYXlTdHJpbmcnKTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5TZXEucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UudHJpbW1lZCgpLmNvbnRlbnRzO1xuICB9XG4gIHJldHVybiAnWycgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnXSc7XG59O1xuXG5wZXhwcnMuYW55LnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuZW5kLnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuSXRlci5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5Ob3QucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPVxucGV4cHJzLkxleC5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgcHMgPSB0aGlzLmFyZ3MubWFwKGZ1bmN0aW9uKGFyZykgeyByZXR1cm4gYXJnLnRvRGlzcGxheVN0cmluZygpOyB9KTtcbiAgICByZXR1cm4gdGhpcy5ydWxlTmFtZSArICc8JyArIHBzLmpvaW4oJywnKSArICc+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlTmFtZTtcbiAgfVxufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdVbmljb2RlIFsnICsgdGhpcy5jYXRlZ29yeSArICddIGNoYXJhY3Rlcic7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEZhaWx1cmUgPSByZXF1aXJlKCcuL0ZhaWx1cmUnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvRmFpbHVyZSA9IGNvbW1vbi5hYnN0cmFjdCgndG9GYWlsdXJlJyk7XG5cbnBleHBycy5hbnkudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgJ2FueSBvYmplY3QnLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5lbmQudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgJ2VuZCBvZiBpbnB1dCcsICdkZXNjcmlwdGlvbicpO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCB0aGlzLm9iaiwgJ3N0cmluZycpO1xufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIC8vIFRPRE86IGNvbWUgdXAgd2l0aCBzb21ldGhpbmcgYmV0dGVyXG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZyb20pICsgJy4uJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG8pLCAnY29kZScpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICB2YXIgZGVzY3JpcHRpb24gPSB0aGlzLmV4cHIgPT09IHBleHBycy5hbnkgP1xuICAgICAgJ25vdGhpbmcnIDpcbiAgICAgICdub3QgJyArIHRoaXMuZXhwci50b0ZhaWx1cmUoZ3JhbW1hcik7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBkZXNjcmlwdGlvbiwgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiB0aGlzLmV4cHIudG9GYWlsdXJlKGdyYW1tYXIpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IGdyYW1tYXIucnVsZXNbdGhpcy5ydWxlTmFtZV0uZGVzY3JpcHRpb247XG4gIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgYXJ0aWNsZSA9ICgvXlthZWlvdUFFSU9VXS8udGVzdCh0aGlzLnJ1bGVOYW1lKSA/ICdhbicgOiAnYScpO1xuICAgIGRlc2NyaXB0aW9uID0gYXJ0aWNsZSArICcgJyArIHRoaXMucnVsZU5hbWU7XG4gIH1cbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgJ2EgVW5pY29kZSBbJyArIHRoaXMuY2F0ZWdvcnkgKyAnXSBjaGFyYWN0ZXInLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGZzID0gdGhpcy50ZXJtcy5tYXAoZnVuY3Rpb24odCkgeyByZXR1cm4gdC50b0ZhaWx1cmUoKTsgfSk7XG4gIHZhciBkZXNjcmlwdGlvbiA9ICcoJyArIGZzLmpvaW4oJyBvciAnKSArICcpJztcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGZzID0gdGhpcy5mYWN0b3JzLm1hcChmdW5jdGlvbihmKSB7IHJldHVybiBmLnRvRmFpbHVyZSgpOyB9KTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gJygnICsgZnMuam9pbignICcpICsgJyknO1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgZGVzY3JpcHRpb24sICdkZXNjcmlwdGlvbicpO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGRlc2NyaXB0aW9uID0gJygnICsgdGhpcy5leHByLnRvRmFpbHVyZSgpICsgdGhpcy5vcGVyYXRvciArICcpJztcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgZTEudG9TdHJpbmcoKSA9PT0gZTIudG9TdHJpbmcoKSA9PT4gZTEgYW5kIGUyIGFyZSBzZW1hbnRpY2FsbHkgZXF1aXZhbGVudC5cbiAgTm90ZSB0aGF0IHRoaXMgaXMgbm90IGFuIGlmZiAoPD09Pik6IGUuZy4sXG4gICh+XCJiXCIgXCJhXCIpLnRvU3RyaW5nKCkgIT09IChcImFcIikudG9TdHJpbmcoKSwgZXZlbiB0aG91Z2hcbiAgflwiYlwiIFwiYVwiIGFuZCBcImFcIiBhcmUgaW50ZXJjaGFuZ2VhYmxlIGluIGFueSBncmFtbWFyLFxuICBib3RoIGluIHRlcm1zIG9mIHRoZSBsYW5ndWFnZXMgdGhleSBhY2NlcHQgYW5kIHRoZWlyIGFyaXRpZXMuXG4qL1xucGV4cHJzLlBFeHByLnByb3RvdHlwZS50b1N0cmluZyA9IGNvbW1vbi5hYnN0cmFjdCgndG9TdHJpbmcnKTtcblxucGV4cHJzLmFueS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ2FueSc7XG59O1xuXG5wZXhwcnMuZW5kLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnZW5kJztcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZnJvbSkgKyAnLi4nICsgSlNPTi5zdHJpbmdpZnkodGhpcy50byk7XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJCcgKyB0aGlzLmluZGV4O1xufTtcblxucGV4cHJzLkxleC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcjKCcgKyB0aGlzLmV4cHIudG9TdHJpbmcoKSArICcpJztcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRlcm1zLmxlbmd0aCA9PT0gMSA/XG4gICAgdGhpcy50ZXJtc1swXS50b1N0cmluZygpIDpcbiAgICAnKCcgKyB0aGlzLnRlcm1zLm1hcChmdW5jdGlvbih0ZXJtKSB7IHJldHVybiB0ZXJtLnRvU3RyaW5nKCk7IH0pLmpvaW4oJyB8ICcpICsgJyknO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmFjdG9ycy5sZW5ndGggPT09IDEgP1xuICAgIHRoaXMuZmFjdG9yc1swXS50b1N0cmluZygpIDpcbiAgICAnKCcgKyB0aGlzLmZhY3RvcnMubWFwKGZ1bmN0aW9uKGZhY3RvcikgeyByZXR1cm4gZmFjdG9yLnRvU3RyaW5nKCk7IH0pLmpvaW4oJyAnKSArICcpJztcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5leHByICsgdGhpcy5vcGVyYXRvcjtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnficgKyB0aGlzLmV4cHI7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJyYnICsgdGhpcy5leHByO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgcHMgPSB0aGlzLmFyZ3MubWFwKGZ1bmN0aW9uKGFyZykgeyByZXR1cm4gYXJnLnRvU3RyaW5nKCk7IH0pO1xuICAgIHJldHVybiB0aGlzLnJ1bGVOYW1lICsgJzwnICsgcHMuam9pbignLCcpICsgJz4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLnJ1bGVOYW1lO1xuICB9XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnXFxcXHB7JyArIHRoaXMuY2F0ZWdvcnkgKyAnfSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIFVuaWNvZGVDYXRlZ29yaWVzID0gcmVxdWlyZSgnLi4vdGhpcmRfcGFydHkvVW5pY29kZUNhdGVnb3JpZXMnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEdlbmVyYWwgc3R1ZmZcblxuZnVuY3Rpb24gUEV4cHIoKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIlBFeHByIGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgLS0gaXQncyBhYnN0cmFjdFwiKTtcbn1cblxuLy8gU2V0IHRoZSBgc291cmNlYCBwcm9wZXJ0eSB0byB0aGUgaW50ZXJ2YWwgY29udGFpbmluZyB0aGUgc291cmNlIGZvciB0aGlzIGV4cHJlc3Npb24uXG5QRXhwci5wcm90b3R5cGUud2l0aFNvdXJjZSA9IGZ1bmN0aW9uKGludGVydmFsKSB7XG4gIGlmIChpbnRlcnZhbCkge1xuICAgIHRoaXMuc291cmNlID0gaW50ZXJ2YWwudHJpbW1lZCgpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gQW55XG5cbnZhciBhbnkgPSBPYmplY3QuY3JlYXRlKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIEVuZFxuXG52YXIgZW5kID0gT2JqZWN0LmNyZWF0ZShQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBUZXJtaW5hbHNcblxuZnVuY3Rpb24gVGVybWluYWwob2JqKSB7XG4gIHRoaXMub2JqID0gb2JqO1xufVxuaW5oZXJpdHMoVGVybWluYWwsIFBFeHByKTtcblxuLy8gUmFuZ2VzXG5cbmZ1bmN0aW9uIFJhbmdlKGZyb20sIHRvKSB7XG4gIHRoaXMuZnJvbSA9IGZyb207XG4gIHRoaXMudG8gPSB0bztcbn1cbmluaGVyaXRzKFJhbmdlLCBQRXhwcik7XG5cbi8vIFBhcmFtZXRlcnNcblxuZnVuY3Rpb24gUGFyYW0oaW5kZXgpIHtcbiAgdGhpcy5pbmRleCA9IGluZGV4O1xufVxuaW5oZXJpdHMoUGFyYW0sIFBFeHByKTtcblxuLy8gQWx0ZXJuYXRpb25cblxuZnVuY3Rpb24gQWx0KHRlcm1zKSB7XG4gIHRoaXMudGVybXMgPSB0ZXJtcztcbn1cbmluaGVyaXRzKEFsdCwgUEV4cHIpO1xuXG4vLyBFeHRlbmQgaXMgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsIG9mIHJ1bGUgZXh0ZW5zaW9uXG5cbmZ1bmN0aW9uIEV4dGVuZChzdXBlckdyYW1tYXIsIG5hbWUsIGJvZHkpIHtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYm9keSA9IGJvZHk7XG4gIHZhciBvcmlnQm9keSA9IHN1cGVyR3JhbW1hci5ydWxlc1tuYW1lXS5ib2R5O1xuICB0aGlzLnRlcm1zID0gW2JvZHksIG9yaWdCb2R5XTtcbn1cbmluaGVyaXRzKEV4dGVuZCwgQWx0KTtcblxuLy8gU2VxdWVuY2VzXG5cbmZ1bmN0aW9uIFNlcShmYWN0b3JzKSB7XG4gIHRoaXMuZmFjdG9ycyA9IGZhY3RvcnM7XG59XG5pbmhlcml0cyhTZXEsIFBFeHByKTtcblxuLy8gSXRlcmF0b3JzIGFuZCBvcHRpb25hbHNcblxuZnVuY3Rpb24gSXRlcihleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhJdGVyLCBQRXhwcik7XG5cbmZ1bmN0aW9uIFN0YXIoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoU3RhciwgSXRlcik7XG5cbmZ1bmN0aW9uIFBsdXMoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoUGx1cywgSXRlcik7XG5cbmZ1bmN0aW9uIE9wdChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhPcHQsIEl0ZXIpO1xuXG5TdGFyLnByb3RvdHlwZS5vcGVyYXRvciA9ICcqJztcblBsdXMucHJvdG90eXBlLm9wZXJhdG9yID0gJysnO1xuT3B0LnByb3RvdHlwZS5vcGVyYXRvciA9ICc/JztcblxuU3Rhci5wcm90b3R5cGUubWluTnVtTWF0Y2hlcyA9IDA7XG5QbHVzLnByb3RvdHlwZS5taW5OdW1NYXRjaGVzID0gMTtcbk9wdC5wcm90b3R5cGUubWluTnVtTWF0Y2hlcyA9IDA7XG5cblN0YXIucHJvdG90eXBlLm1heE51bU1hdGNoZXMgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5QbHVzLnByb3RvdHlwZS5tYXhOdW1NYXRjaGVzID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuT3B0LnByb3RvdHlwZS5tYXhOdW1NYXRjaGVzID0gMTtcblxuLy8gUHJlZGljYXRlc1xuXG5mdW5jdGlvbiBOb3QoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoTm90LCBQRXhwcik7XG5cbmZ1bmN0aW9uIExvb2thaGVhZChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhMb29rYWhlYWQsIFBFeHByKTtcblxuLy8gXCJMZXhpZmljYXRpb25cIlxuXG5mdW5jdGlvbiBMZXgoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoTGV4LCBQRXhwcik7XG5cbi8vIFJ1bGUgYXBwbGljYXRpb25cblxuZnVuY3Rpb24gQXBwbHkocnVsZU5hbWUsIG9wdEFyZ3MpIHtcbiAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICB0aGlzLmFyZ3MgPSBvcHRBcmdzIHx8IFtdO1xufVxuaW5oZXJpdHMoQXBwbHksIFBFeHByKTtcblxuQXBwbHkucHJvdG90eXBlLmlzU3ludGFjdGljID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjb21tb24uaXNTeW50YWN0aWModGhpcy5ydWxlTmFtZSk7XG59O1xuXG4vLyBUaGlzIG1ldGhvZCBqdXN0IGNhY2hlcyB0aGUgcmVzdWx0IG9mIGB0aGlzLnRvU3RyaW5nKClgIGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkuXG5BcHBseS5wcm90b3R5cGUudG9NZW1vS2V5ID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fbWVtb0tleSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX21lbW9LZXknLCB7dmFsdWU6IHRoaXMudG9TdHJpbmcoKX0pO1xuICB9XG4gIHJldHVybiB0aGlzLl9tZW1vS2V5O1xufTtcblxuLy8gVW5pY29kZSBjaGFyYWN0ZXJcblxuZnVuY3Rpb24gVW5pY29kZUNoYXIoY2F0ZWdvcnkpIHtcbiAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICB0aGlzLnBhdHRlcm4gPSBVbmljb2RlQ2F0ZWdvcmllc1tjYXRlZ29yeV07XG59XG5pbmhlcml0cyhVbmljb2RlQ2hhciwgUEV4cHIpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5QRXhwciA9IFBFeHByO1xuZXhwb3J0cy5hbnkgPSBhbnk7XG5leHBvcnRzLmVuZCA9IGVuZDtcbmV4cG9ydHMuVGVybWluYWwgPSBUZXJtaW5hbDtcbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZTtcbmV4cG9ydHMuUGFyYW0gPSBQYXJhbTtcbmV4cG9ydHMuQWx0ID0gQWx0O1xuZXhwb3J0cy5FeHRlbmQgPSBFeHRlbmQ7XG5leHBvcnRzLlNlcSA9IFNlcTtcbmV4cG9ydHMuSXRlciA9IEl0ZXI7XG5leHBvcnRzLlN0YXIgPSBTdGFyO1xuZXhwb3J0cy5QbHVzID0gUGx1cztcbmV4cG9ydHMuT3B0ID0gT3B0O1xuZXhwb3J0cy5Ob3QgPSBOb3Q7XG5leHBvcnRzLkxvb2thaGVhZCA9IExvb2thaGVhZDtcbmV4cG9ydHMuTGV4ID0gTGV4O1xuZXhwb3J0cy5BcHBseSA9IEFwcGx5O1xuZXhwb3J0cy5Vbmljb2RlQ2hhciA9IFVuaWNvZGVDaGFyO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXh0ZW5zaW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucmVxdWlyZSgnLi9wZXhwcnMtYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5Jyk7XG5yZXF1aXJlKCcuL3BleHBycy1hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWNoZWNrJyk7XG5yZXF1aXJlKCcuL3BleHBycy1ldmFsJyk7XG5yZXF1aXJlKCcuL3BleHBycy1nZXRBcml0eScpO1xucmVxdWlyZSgnLi9wZXhwcnMtZ2VuZXJhdGVFeGFtcGxlJyk7XG5yZXF1aXJlKCcuL3BleHBycy1vdXRwdXRSZWNpcGUnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWludHJvZHVjZVBhcmFtcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtaXNOdWxsYWJsZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtc3Vic3RpdHV0ZVBhcmFtcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9EaXNwbGF5U3RyaW5nJyk7XG5yZXF1aXJlKCcuL3BleHBycy10b0FyZ3VtZW50TmFtZUxpc3QnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLXRvRmFpbHVyZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9TdHJpbmcnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR2l2ZW4gYW4gYXJyYXkgb2YgbnVtYmVycyBgYXJyYCwgcmV0dXJuIGFuIGFycmF5IG9mIHRoZSBudW1iZXJzIGFzIHN0cmluZ3MsXG4vLyByaWdodC1qdXN0aWZpZWQgYW5kIHBhZGRlZCB0byB0aGUgc2FtZSBsZW5ndGguXG5mdW5jdGlvbiBwYWROdW1iZXJzVG9FcXVhbExlbmd0aChhcnIpIHtcbiAgdmFyIG1heExlbiA9IDA7XG4gIHZhciBzdHJpbmdzID0gYXJyLm1hcChmdW5jdGlvbihuKSB7XG4gICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKTtcbiAgICBtYXhMZW4gPSBNYXRoLm1heChtYXhMZW4sIHN0ci5sZW5ndGgpO1xuICAgIHJldHVybiBzdHI7XG4gIH0pO1xuICByZXR1cm4gc3RyaW5ncy5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gY29tbW9uLnBhZExlZnQocywgbWF4TGVuKTsgfSk7XG59XG5cbi8vIFByb2R1Y2UgYSBuZXcgc3RyaW5nIHRoYXQgd291bGQgYmUgdGhlIHJlc3VsdCBvZiBjb3B5aW5nIHRoZSBjb250ZW50c1xuLy8gb2YgdGhlIHN0cmluZyBgc3JjYCBvbnRvIGBkZXN0YCBhdCBvZmZzZXQgYG9mZmVzdGAuXG5mdW5jdGlvbiBzdHJjcHkoZGVzdCwgc3JjLCBvZmZzZXQpIHtcbiAgdmFyIG9yaWdEZXN0TGVuID0gZGVzdC5sZW5ndGg7XG4gIHZhciBzdGFydCA9IGRlc3Quc2xpY2UoMCwgb2Zmc2V0KTtcbiAgdmFyIGVuZCA9IGRlc3Quc2xpY2Uob2Zmc2V0ICsgc3JjLmxlbmd0aCk7XG4gIHJldHVybiAoc3RhcnQgKyBzcmMgKyBlbmQpLnN1YnN0cigwLCBvcmlnRGVzdExlbik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgYnVpbHRJblJ1bGVzQ2FsbGJhY2tzID0gW107XG5cbi8vIFNpbmNlIEdyYW1tYXIuQnVpbHRJblJ1bGVzIGlzIGJvb3RzdHJhcHBlZCwgbW9zdCBvZiBPaG0gY2FuJ3QgZGlyZWN0bHkgZGVwZW5kIGl0LlxuLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgbW9kdWxlcyB0aGF0IGRvIGRlcGVuZCBvbiB0aGUgYnVpbHQtaW4gcnVsZXMgdG8gcmVnaXN0ZXIgYSBjYWxsYmFja1xuLy8gdGhhdCB3aWxsIGJlIGNhbGxlZCBsYXRlciBpbiB0aGUgaW5pdGlhbGl6YXRpb24gcHJvY2Vzcy5cbmV4cG9ydHMuYXdhaXRCdWlsdEluUnVsZXMgPSBmdW5jdGlvbihjYikge1xuICBidWlsdEluUnVsZXNDYWxsYmFja3MucHVzaChjYik7XG59O1xuXG5leHBvcnRzLmFubm91bmNlQnVpbHRJblJ1bGVzID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICBidWlsdEluUnVsZXNDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihjYikge1xuICAgIGNiKGdyYW1tYXIpO1xuICB9KTtcbiAgYnVpbHRJblJ1bGVzQ2FsbGJhY2tzID0gbnVsbDtcbn07XG5cbi8vIFJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGUgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW5cbi8vIG9mZnNldCBpbiBgc3RyYC5cbmV4cG9ydHMuZ2V0TGluZUFuZENvbHVtbiA9IGZ1bmN0aW9uKHN0ciwgb2Zmc2V0KSB7XG4gIHZhciBsaW5lTnVtID0gMTtcbiAgdmFyIGNvbE51bSA9IDE7XG5cbiAgdmFyIGN1cnJPZmZzZXQgPSAwO1xuICB2YXIgbGluZVN0YXJ0T2Zmc2V0ID0gMDtcblxuICB2YXIgbmV4dExpbmUgPSBudWxsO1xuICB2YXIgcHJldkxpbmUgPSBudWxsO1xuICB2YXIgcHJldkxpbmVTdGFydE9mZnNldCA9IC0xO1xuXG4gIHdoaWxlIChjdXJyT2Zmc2V0IDwgb2Zmc2V0KSB7XG4gICAgdmFyIGMgPSBzdHIuY2hhckF0KGN1cnJPZmZzZXQrKyk7XG4gICAgaWYgKGMgPT09ICdcXG4nKSB7XG4gICAgICBsaW5lTnVtKys7XG4gICAgICBjb2xOdW0gPSAxO1xuICAgICAgcHJldkxpbmVTdGFydE9mZnNldCA9IGxpbmVTdGFydE9mZnNldDtcbiAgICAgIGxpbmVTdGFydE9mZnNldCA9IGN1cnJPZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChjICE9PSAnXFxyJykge1xuICAgICAgY29sTnVtKys7XG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgZW5kIG9mIHRoZSB0YXJnZXQgbGluZS5cbiAgdmFyIGxpbmVFbmRPZmZzZXQgPSBzdHIuaW5kZXhPZignXFxuJywgbGluZVN0YXJ0T2Zmc2V0KTtcbiAgaWYgKGxpbmVFbmRPZmZzZXQgPT09IC0xKSB7XG4gICAgbGluZUVuZE9mZnNldCA9IHN0ci5sZW5ndGg7XG4gIH0gZWxzZSB7XG4gICAgLy8gR2V0IHRoZSBuZXh0IGxpbmUuXG4gICAgdmFyIG5leHRMaW5lRW5kT2Zmc2V0ID0gc3RyLmluZGV4T2YoJ1xcbicsIGxpbmVFbmRPZmZzZXQgKyAxKTtcbiAgICBuZXh0TGluZSA9IG5leHRMaW5lRW5kT2Zmc2V0ID09PSAtMSA/IHN0ci5zbGljZShsaW5lRW5kT2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RyLnNsaWNlKGxpbmVFbmRPZmZzZXQsIG5leHRMaW5lRW5kT2Zmc2V0KTtcbiAgICAvLyBTdHJpcCBsZWFkaW5nIGFuZCB0cmFpbGluZyBFT0wgY2hhcihzKS5cbiAgICBuZXh0TGluZSA9IG5leHRMaW5lLnJlcGxhY2UoL15cXHI/XFxuLywgJycpLnJlcGxhY2UoL1xcciQvLCAnJyk7XG4gIH1cblxuICAvLyBHZXQgdGhlIHByZXZpb3VzIGxpbmUuXG4gIGlmIChwcmV2TGluZVN0YXJ0T2Zmc2V0ID49IDApIHtcbiAgICBwcmV2TGluZSA9IHN0ci5zbGljZShwcmV2TGluZVN0YXJ0T2Zmc2V0LCBsaW5lU3RhcnRPZmZzZXQpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxyP1xcbiQvLCAnJyk7ICAvLyBTdHJpcCB0cmFpbGluZyBFT0wgY2hhcihzKS5cbiAgfVxuXG4gIC8vIEdldCB0aGUgdGFyZ2V0IGxpbmUsIHN0cmlwcGluZyBhIHRyYWlsaW5nIGNhcnJpYWdlIHJldHVybiBpZiBuZWNlc3NhcnkuXG4gIHZhciBsaW5lID0gc3RyLnNsaWNlKGxpbmVTdGFydE9mZnNldCwgbGluZUVuZE9mZnNldCkucmVwbGFjZSgvXFxyJC8sICcnKTtcblxuICByZXR1cm4ge1xuICAgIGxpbmVOdW06IGxpbmVOdW0sXG4gICAgY29sTnVtOiBjb2xOdW0sXG4gICAgbGluZTogbGluZSxcbiAgICBwcmV2TGluZTogcHJldkxpbmUsXG4gICAgbmV4dExpbmU6IG5leHRMaW5lXG4gIH07XG59O1xuXG4vLyBSZXR1cm4gYSBuaWNlbHktZm9ybWF0dGVkIHN0cmluZyBkZXNjcmliaW5nIHRoZSBsaW5lIGFuZCBjb2x1bW4gZm9yIHRoZVxuLy8gZ2l2ZW4gb2Zmc2V0IGluIGBzdHJgLlxuZXhwb3J0cy5nZXRMaW5lQW5kQ29sdW1uTWVzc2FnZSA9IGZ1bmN0aW9uKHN0ciwgb2Zmc2V0IC8qIC4uLnJhbmdlcyAqLykge1xuICB2YXIgcmVwZWF0U3RyID0gY29tbW9uLnJlcGVhdFN0cjtcblxuICB2YXIgbGluZUFuZENvbCA9IGV4cG9ydHMuZ2V0TGluZUFuZENvbHVtbihzdHIsIG9mZnNldCk7XG4gIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gIHNiLmFwcGVuZCgnTGluZSAnICsgbGluZUFuZENvbC5saW5lTnVtICsgJywgY29sICcgKyBsaW5lQW5kQ29sLmNvbE51bSArICc6XFxuJyk7XG5cbiAgLy8gQW4gYXJyYXkgb2YgdGhlIHByZXZpb3VzLCBjdXJyZW50LCBhbmQgbmV4dCBsaW5lIG51bWJlcnMgYXMgc3RyaW5ncyBvZiBlcXVhbCBsZW5ndGguXG4gIHZhciBsaW5lTnVtYmVycyA9IHBhZE51bWJlcnNUb0VxdWFsTGVuZ3RoKFtcbiAgICBsaW5lQW5kQ29sLnByZXZMaW5lID09IG51bGwgPyAwIDogbGluZUFuZENvbC5saW5lTnVtIC0gMSxcbiAgICBsaW5lQW5kQ29sLmxpbmVOdW0sXG4gICAgbGluZUFuZENvbC5uZXh0TGluZSA9PSBudWxsID8gMCA6IGxpbmVBbmRDb2wubGluZU51bSArIDFcbiAgXSk7XG5cbiAgLy8gSGVscGVyIGZvciBhcHBlbmRpbmcgZm9ybWF0dGluZyBpbnB1dCBsaW5lcyB0byB0aGUgYnVmZmVyLlxuICBmdW5jdGlvbiBhcHBlbmRMaW5lKG51bSwgY29udGVudCwgcHJlZml4KSB7XG4gICAgc2IuYXBwZW5kKHByZWZpeCArIGxpbmVOdW1iZXJzW251bV0gKyAnIHwgJyArIGNvbnRlbnQgKyAnXFxuJyk7XG4gIH1cblxuICAvLyBJbmNsdWRlIHRoZSBwcmV2aW91cyBsaW5lIGZvciBjb250ZXh0IGlmIHBvc3NpYmxlLlxuICBpZiAobGluZUFuZENvbC5wcmV2TGluZSAhPSBudWxsKSB7XG4gICAgYXBwZW5kTGluZSgwLCBsaW5lQW5kQ29sLnByZXZMaW5lLCAnICAnKTtcbiAgfVxuICAvLyBMaW5lIHRoYXQgdGhlIGVycm9yIG9jY3VycmVkIG9uLlxuICBhcHBlbmRMaW5lKDEsIGxpbmVBbmRDb2wubGluZSwgJz4gJyk7XG5cbiAgLy8gQnVpbGQgdXAgdGhlIGxpbmUgdGhhdCBwb2ludHMgdG8gdGhlIG9mZnNldCBhbmQgcG9zc2libGUgaW5kaWNhdGVzIG9uZSBvciBtb3JlIHJhbmdlcy5cbiAgLy8gU3RhcnQgd2l0aCBhIGJsYW5rIGxpbmUsIGFuZCBpbmRpY2F0ZSBlYWNoIHJhbmdlIGJ5IG92ZXJsYXlpbmcgYSBzdHJpbmcgb2YgYH5gIGNoYXJzLlxuICB2YXIgbGluZUxlbiA9IGxpbmVBbmRDb2wubGluZS5sZW5ndGg7XG4gIHZhciBpbmRpY2F0aW9uTGluZSA9IHJlcGVhdFN0cignICcsIGxpbmVMZW4gKyAxKTtcbiAgdmFyIHJhbmdlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHN0YXJ0SWR4ID0gcmFuZ2VzW2ldWzBdO1xuICAgIHZhciBlbmRJZHggPSByYW5nZXNbaV1bMV07XG4gICAgY29tbW9uLmFzc2VydChzdGFydElkeCA+PSAwICYmIHN0YXJ0SWR4IDw9IGVuZElkeCwgJ3JhbmdlIHN0YXJ0IG11c3QgYmUgPj0gMCBhbmQgPD0gZW5kJyk7XG5cbiAgICB2YXIgbGluZVN0YXJ0T2Zmc2V0ID0gb2Zmc2V0IC0gbGluZUFuZENvbC5jb2xOdW0gKyAxO1xuICAgIHN0YXJ0SWR4ID0gTWF0aC5tYXgoMCwgc3RhcnRJZHggLSBsaW5lU3RhcnRPZmZzZXQpO1xuICAgIGVuZElkeCA9IE1hdGgubWluKGVuZElkeCAtIGxpbmVTdGFydE9mZnNldCwgbGluZUxlbik7XG5cbiAgICBpbmRpY2F0aW9uTGluZSA9IHN0cmNweShpbmRpY2F0aW9uTGluZSwgcmVwZWF0U3RyKCd+JywgZW5kSWR4IC0gc3RhcnRJZHgpLCBzdGFydElkeCk7XG4gIH1cbiAgdmFyIGd1dHRlcldpZHRoID0gMiArIGxpbmVOdW1iZXJzWzFdLmxlbmd0aCArIDM7XG4gIHNiLmFwcGVuZChyZXBlYXRTdHIoJyAnLCBndXR0ZXJXaWR0aCkpO1xuICBpbmRpY2F0aW9uTGluZSA9IHN0cmNweShpbmRpY2F0aW9uTGluZSwgJ14nLCBsaW5lQW5kQ29sLmNvbE51bSAtIDEpO1xuICBzYi5hcHBlbmQoaW5kaWNhdGlvbkxpbmUucmVwbGFjZSgvICskLywgJycpICsgJ1xcbicpO1xuXG4gIC8vIEluY2x1ZGUgdGhlIG5leHQgbGluZSBmb3IgY29udGV4dCBpZiBwb3NzaWJsZS5cbiAgaWYgKGxpbmVBbmRDb2wubmV4dExpbmUgIT0gbnVsbCkge1xuICAgIGFwcGVuZExpbmUoMiwgbGluZUFuZENvbC5uZXh0TGluZSwgJyAgJyk7XG4gIH1cbiAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG59O1xuIiwiLyogZ2xvYmFsIGJyb3dzZXJpZnlHbG9iYWxPaG1WZXJzaW9uICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gV2hlbiBydW5uaW5nIHVuZGVyIE5vZGUsIHJlYWQgdGhlIHZlcnNpb24gZnJvbSBwYWNrYWdlLmpzb24uIEZvciB0aGUgYnJvd3Nlcixcbi8vIHVzZSBhIHNwZWNpYWwgZ2xvYmFsIHZhcmlhYmxlIGRlZmluZWQgaW4gdGhlIGJ1aWxkIHByb2Nlc3MgKHNlZSBiaW4vYnVpbGQtZGVidWcuanMpLlxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgYnJvd3NlcmlmeUdsb2JhbE9obVZlcnNpb24gPT09ICdzdHJpbmcnXG4gICAgPyBicm93c2VyaWZ5R2xvYmFsT2htVmVyc2lvblxuICAgIDogcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbjtcbiIsIi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL3VuaWNvZGUtOS4wLjAuXG4vLyBUaGVzZSBhcmUganVzdCBjYXRlZ29yaWVzIHRoYXQgYXJlIHVzZWQgaW4gRVM1L0VTMjAxNS5cbi8vIFRoZSBmdWxsIGxpc3Qgb2YgVW5pY29kZSBjYXRlZ29yaWVzIGlzIGhlcmU6IGh0dHA6Ly93d3cuZmlsZWZvcm1hdC5pbmZvL2luZm8vdW5pY29kZS9jYXRlZ29yeS9pbmRleC5odG0uXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gTGV0dGVyc1xuICBMdTogL1tBLVpcXHhDMC1cXHhENlxceEQ4LVxceERFXFx1MDEwMFxcdTAxMDJcXHUwMTA0XFx1MDEwNlxcdTAxMDhcXHUwMTBBXFx1MDEwQ1xcdTAxMEVcXHUwMTEwXFx1MDExMlxcdTAxMTRcXHUwMTE2XFx1MDExOFxcdTAxMUFcXHUwMTFDXFx1MDExRVxcdTAxMjBcXHUwMTIyXFx1MDEyNFxcdTAxMjZcXHUwMTI4XFx1MDEyQVxcdTAxMkNcXHUwMTJFXFx1MDEzMFxcdTAxMzJcXHUwMTM0XFx1MDEzNlxcdTAxMzlcXHUwMTNCXFx1MDEzRFxcdTAxM0ZcXHUwMTQxXFx1MDE0M1xcdTAxNDVcXHUwMTQ3XFx1MDE0QVxcdTAxNENcXHUwMTRFXFx1MDE1MFxcdTAxNTJcXHUwMTU0XFx1MDE1NlxcdTAxNThcXHUwMTVBXFx1MDE1Q1xcdTAxNUVcXHUwMTYwXFx1MDE2MlxcdTAxNjRcXHUwMTY2XFx1MDE2OFxcdTAxNkFcXHUwMTZDXFx1MDE2RVxcdTAxNzBcXHUwMTcyXFx1MDE3NFxcdTAxNzZcXHUwMTc4XFx1MDE3OVxcdTAxN0JcXHUwMTdEXFx1MDE4MVxcdTAxODJcXHUwMTg0XFx1MDE4NlxcdTAxODdcXHUwMTg5LVxcdTAxOEJcXHUwMThFLVxcdTAxOTFcXHUwMTkzXFx1MDE5NFxcdTAxOTYtXFx1MDE5OFxcdTAxOUNcXHUwMTlEXFx1MDE5RlxcdTAxQTBcXHUwMUEyXFx1MDFBNFxcdTAxQTZcXHUwMUE3XFx1MDFBOVxcdTAxQUNcXHUwMUFFXFx1MDFBRlxcdTAxQjEtXFx1MDFCM1xcdTAxQjVcXHUwMUI3XFx1MDFCOFxcdTAxQkNcXHUwMUM0XFx1MDFDN1xcdTAxQ0FcXHUwMUNEXFx1MDFDRlxcdTAxRDFcXHUwMUQzXFx1MDFENVxcdTAxRDdcXHUwMUQ5XFx1MDFEQlxcdTAxREVcXHUwMUUwXFx1MDFFMlxcdTAxRTRcXHUwMUU2XFx1MDFFOFxcdTAxRUFcXHUwMUVDXFx1MDFFRVxcdTAxRjFcXHUwMUY0XFx1MDFGNi1cXHUwMUY4XFx1MDFGQVxcdTAxRkNcXHUwMUZFXFx1MDIwMFxcdTAyMDJcXHUwMjA0XFx1MDIwNlxcdTAyMDhcXHUwMjBBXFx1MDIwQ1xcdTAyMEVcXHUwMjEwXFx1MDIxMlxcdTAyMTRcXHUwMjE2XFx1MDIxOFxcdTAyMUFcXHUwMjFDXFx1MDIxRVxcdTAyMjBcXHUwMjIyXFx1MDIyNFxcdTAyMjZcXHUwMjI4XFx1MDIyQVxcdTAyMkNcXHUwMjJFXFx1MDIzMFxcdTAyMzJcXHUwMjNBXFx1MDIzQlxcdTAyM0RcXHUwMjNFXFx1MDI0MVxcdTAyNDMtXFx1MDI0NlxcdTAyNDhcXHUwMjRBXFx1MDI0Q1xcdTAyNEVcXHUwMzcwXFx1MDM3MlxcdTAzNzZcXHUwMzdGXFx1MDM4NlxcdTAzODgtXFx1MDM4QVxcdTAzOENcXHUwMzhFXFx1MDM4RlxcdTAzOTEtXFx1MDNBMVxcdTAzQTMtXFx1MDNBQlxcdTAzQ0ZcXHUwM0QyLVxcdTAzRDRcXHUwM0Q4XFx1MDNEQVxcdTAzRENcXHUwM0RFXFx1MDNFMFxcdTAzRTJcXHUwM0U0XFx1MDNFNlxcdTAzRThcXHUwM0VBXFx1MDNFQ1xcdTAzRUVcXHUwM0Y0XFx1MDNGN1xcdTAzRjlcXHUwM0ZBXFx1MDNGRC1cXHUwNDJGXFx1MDQ2MFxcdTA0NjJcXHUwNDY0XFx1MDQ2NlxcdTA0NjhcXHUwNDZBXFx1MDQ2Q1xcdTA0NkVcXHUwNDcwXFx1MDQ3MlxcdTA0NzRcXHUwNDc2XFx1MDQ3OFxcdTA0N0FcXHUwNDdDXFx1MDQ3RVxcdTA0ODBcXHUwNDhBXFx1MDQ4Q1xcdTA0OEVcXHUwNDkwXFx1MDQ5MlxcdTA0OTRcXHUwNDk2XFx1MDQ5OFxcdTA0OUFcXHUwNDlDXFx1MDQ5RVxcdTA0QTBcXHUwNEEyXFx1MDRBNFxcdTA0QTZcXHUwNEE4XFx1MDRBQVxcdTA0QUNcXHUwNEFFXFx1MDRCMFxcdTA0QjJcXHUwNEI0XFx1MDRCNlxcdTA0QjhcXHUwNEJBXFx1MDRCQ1xcdTA0QkVcXHUwNEMwXFx1MDRDMVxcdTA0QzNcXHUwNEM1XFx1MDRDN1xcdTA0QzlcXHUwNENCXFx1MDRDRFxcdTA0RDBcXHUwNEQyXFx1MDRENFxcdTA0RDZcXHUwNEQ4XFx1MDREQVxcdTA0RENcXHUwNERFXFx1MDRFMFxcdTA0RTJcXHUwNEU0XFx1MDRFNlxcdTA0RThcXHUwNEVBXFx1MDRFQ1xcdTA0RUVcXHUwNEYwXFx1MDRGMlxcdTA0RjRcXHUwNEY2XFx1MDRGOFxcdTA0RkFcXHUwNEZDXFx1MDRGRVxcdTA1MDBcXHUwNTAyXFx1MDUwNFxcdTA1MDZcXHUwNTA4XFx1MDUwQVxcdTA1MENcXHUwNTBFXFx1MDUxMFxcdTA1MTJcXHUwNTE0XFx1MDUxNlxcdTA1MThcXHUwNTFBXFx1MDUxQ1xcdTA1MUVcXHUwNTIwXFx1MDUyMlxcdTA1MjRcXHUwNTI2XFx1MDUyOFxcdTA1MkFcXHUwNTJDXFx1MDUyRVxcdTA1MzEtXFx1MDU1NlxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTNBMC1cXHUxM0Y1XFx1MUUwMFxcdTFFMDJcXHUxRTA0XFx1MUUwNlxcdTFFMDhcXHUxRTBBXFx1MUUwQ1xcdTFFMEVcXHUxRTEwXFx1MUUxMlxcdTFFMTRcXHUxRTE2XFx1MUUxOFxcdTFFMUFcXHUxRTFDXFx1MUUxRVxcdTFFMjBcXHUxRTIyXFx1MUUyNFxcdTFFMjZcXHUxRTI4XFx1MUUyQVxcdTFFMkNcXHUxRTJFXFx1MUUzMFxcdTFFMzJcXHUxRTM0XFx1MUUzNlxcdTFFMzhcXHUxRTNBXFx1MUUzQ1xcdTFFM0VcXHUxRTQwXFx1MUU0MlxcdTFFNDRcXHUxRTQ2XFx1MUU0OFxcdTFFNEFcXHUxRTRDXFx1MUU0RVxcdTFFNTBcXHUxRTUyXFx1MUU1NFxcdTFFNTZcXHUxRTU4XFx1MUU1QVxcdTFFNUNcXHUxRTVFXFx1MUU2MFxcdTFFNjJcXHUxRTY0XFx1MUU2NlxcdTFFNjhcXHUxRTZBXFx1MUU2Q1xcdTFFNkVcXHUxRTcwXFx1MUU3MlxcdTFFNzRcXHUxRTc2XFx1MUU3OFxcdTFFN0FcXHUxRTdDXFx1MUU3RVxcdTFFODBcXHUxRTgyXFx1MUU4NFxcdTFFODZcXHUxRTg4XFx1MUU4QVxcdTFFOENcXHUxRThFXFx1MUU5MFxcdTFFOTJcXHUxRTk0XFx1MUU5RVxcdTFFQTBcXHUxRUEyXFx1MUVBNFxcdTFFQTZcXHUxRUE4XFx1MUVBQVxcdTFFQUNcXHUxRUFFXFx1MUVCMFxcdTFFQjJcXHUxRUI0XFx1MUVCNlxcdTFFQjhcXHUxRUJBXFx1MUVCQ1xcdTFFQkVcXHUxRUMwXFx1MUVDMlxcdTFFQzRcXHUxRUM2XFx1MUVDOFxcdTFFQ0FcXHUxRUNDXFx1MUVDRVxcdTFFRDBcXHUxRUQyXFx1MUVENFxcdTFFRDZcXHUxRUQ4XFx1MUVEQVxcdTFFRENcXHUxRURFXFx1MUVFMFxcdTFFRTJcXHUxRUU0XFx1MUVFNlxcdTFFRThcXHUxRUVBXFx1MUVFQ1xcdTFFRUVcXHUxRUYwXFx1MUVGMlxcdTFFRjRcXHUxRUY2XFx1MUVGOFxcdTFFRkFcXHUxRUZDXFx1MUVGRVxcdTFGMDgtXFx1MUYwRlxcdTFGMTgtXFx1MUYxRFxcdTFGMjgtXFx1MUYyRlxcdTFGMzgtXFx1MUYzRlxcdTFGNDgtXFx1MUY0RFxcdTFGNTlcXHUxRjVCXFx1MUY1RFxcdTFGNUZcXHUxRjY4LVxcdTFGNkZcXHUxRkI4LVxcdTFGQkJcXHUxRkM4LVxcdTFGQ0JcXHUxRkQ4LVxcdTFGREJcXHUxRkU4LVxcdTFGRUNcXHUxRkY4LVxcdTFGRkJcXHUyMTAyXFx1MjEwN1xcdTIxMEItXFx1MjEwRFxcdTIxMTAtXFx1MjExMlxcdTIxMTVcXHUyMTE5LVxcdTIxMURcXHUyMTI0XFx1MjEyNlxcdTIxMjhcXHUyMTJBLVxcdTIxMkRcXHUyMTMwLVxcdTIxMzNcXHUyMTNFXFx1MjEzRlxcdTIxNDVcXHUyMTgzXFx1MkMwMC1cXHUyQzJFXFx1MkM2MFxcdTJDNjItXFx1MkM2NFxcdTJDNjdcXHUyQzY5XFx1MkM2QlxcdTJDNkQtXFx1MkM3MFxcdTJDNzJcXHUyQzc1XFx1MkM3RS1cXHUyQzgwXFx1MkM4MlxcdTJDODRcXHUyQzg2XFx1MkM4OFxcdTJDOEFcXHUyQzhDXFx1MkM4RVxcdTJDOTBcXHUyQzkyXFx1MkM5NFxcdTJDOTZcXHUyQzk4XFx1MkM5QVxcdTJDOUNcXHUyQzlFXFx1MkNBMFxcdTJDQTJcXHUyQ0E0XFx1MkNBNlxcdTJDQThcXHUyQ0FBXFx1MkNBQ1xcdTJDQUVcXHUyQ0IwXFx1MkNCMlxcdTJDQjRcXHUyQ0I2XFx1MkNCOFxcdTJDQkFcXHUyQ0JDXFx1MkNCRVxcdTJDQzBcXHUyQ0MyXFx1MkNDNFxcdTJDQzZcXHUyQ0M4XFx1MkNDQVxcdTJDQ0NcXHUyQ0NFXFx1MkNEMFxcdTJDRDJcXHUyQ0Q0XFx1MkNENlxcdTJDRDhcXHUyQ0RBXFx1MkNEQ1xcdTJDREVcXHUyQ0UwXFx1MkNFMlxcdTJDRUJcXHUyQ0VEXFx1MkNGMlxcdUE2NDBcXHVBNjQyXFx1QTY0NFxcdUE2NDZcXHVBNjQ4XFx1QTY0QVxcdUE2NENcXHVBNjRFXFx1QTY1MFxcdUE2NTJcXHVBNjU0XFx1QTY1NlxcdUE2NThcXHVBNjVBXFx1QTY1Q1xcdUE2NUVcXHVBNjYwXFx1QTY2MlxcdUE2NjRcXHVBNjY2XFx1QTY2OFxcdUE2NkFcXHVBNjZDXFx1QTY4MFxcdUE2ODJcXHVBNjg0XFx1QTY4NlxcdUE2ODhcXHVBNjhBXFx1QTY4Q1xcdUE2OEVcXHVBNjkwXFx1QTY5MlxcdUE2OTRcXHVBNjk2XFx1QTY5OFxcdUE2OUFcXHVBNzIyXFx1QTcyNFxcdUE3MjZcXHVBNzI4XFx1QTcyQVxcdUE3MkNcXHVBNzJFXFx1QTczMlxcdUE3MzRcXHVBNzM2XFx1QTczOFxcdUE3M0FcXHVBNzNDXFx1QTczRVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3NDZcXHVBNzQ4XFx1QTc0QVxcdUE3NENcXHVBNzRFXFx1QTc1MFxcdUE3NTJcXHVBNzU0XFx1QTc1NlxcdUE3NThcXHVBNzVBXFx1QTc1Q1xcdUE3NUVcXHVBNzYwXFx1QTc2MlxcdUE3NjRcXHVBNzY2XFx1QTc2OFxcdUE3NkFcXHVBNzZDXFx1QTc2RVxcdUE3NzlcXHVBNzdCXFx1QTc3RFxcdUE3N0VcXHVBNzgwXFx1QTc4MlxcdUE3ODRcXHVBNzg2XFx1QTc4QlxcdUE3OERcXHVBNzkwXFx1QTc5MlxcdUE3OTZcXHVBNzk4XFx1QTc5QVxcdUE3OUNcXHVBNzlFXFx1QTdBMFxcdUE3QTJcXHVBN0E0XFx1QTdBNlxcdUE3QThcXHVBN0FBLVxcdUE3QUVcXHVBN0IwLVxcdUE3QjRcXHVBN0I2XFx1RkYyMS1cXHVGRjNBXXxcXHVEODAxW1xcdURDMDAtXFx1REMyN1xcdURDQjAtXFx1RENEM118XFx1RDgwM1tcXHVEQzgwLVxcdURDQjJdfFxcdUQ4MDZbXFx1RENBMC1cXHVEQ0JGXXxcXHVEODM1W1xcdURDMDAtXFx1REMxOVxcdURDMzQtXFx1REM0RFxcdURDNjgtXFx1REM4MVxcdURDOUNcXHVEQzlFXFx1REM5RlxcdURDQTJcXHVEQ0E1XFx1RENBNlxcdURDQTktXFx1RENBQ1xcdURDQUUtXFx1RENCNVxcdURDRDAtXFx1RENFOVxcdUREMDRcXHVERDA1XFx1REQwNy1cXHVERDBBXFx1REQwRC1cXHVERDE0XFx1REQxNi1cXHVERDFDXFx1REQzOFxcdUREMzlcXHVERDNCLVxcdUREM0VcXHVERDQwLVxcdURENDRcXHVERDQ2XFx1REQ0QS1cXHVERDUwXFx1REQ2Qy1cXHVERDg1XFx1RERBMC1cXHVEREI5XFx1RERENC1cXHVEREVEXFx1REUwOC1cXHVERTIxXFx1REUzQy1cXHVERTU1XFx1REU3MC1cXHVERTg5XFx1REVBOC1cXHVERUMwXFx1REVFMi1cXHVERUZBXFx1REYxQy1cXHVERjM0XFx1REY1Ni1cXHVERjZFXFx1REY5MC1cXHVERkE4XFx1REZDQV18XFx1RDgzQVtcXHVERDAwLVxcdUREMjFdLyxcbiAgTGw6IC9bYS16XFx4QjVcXHhERi1cXHhGNlxceEY4LVxceEZGXFx1MDEwMVxcdTAxMDNcXHUwMTA1XFx1MDEwN1xcdTAxMDlcXHUwMTBCXFx1MDEwRFxcdTAxMEZcXHUwMTExXFx1MDExM1xcdTAxMTVcXHUwMTE3XFx1MDExOVxcdTAxMUJcXHUwMTFEXFx1MDExRlxcdTAxMjFcXHUwMTIzXFx1MDEyNVxcdTAxMjdcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMTJGXFx1MDEzMVxcdTAxMzNcXHUwMTM1XFx1MDEzN1xcdTAxMzhcXHUwMTNBXFx1MDEzQ1xcdTAxM0VcXHUwMTQwXFx1MDE0MlxcdTAxNDRcXHUwMTQ2XFx1MDE0OFxcdTAxNDlcXHUwMTRCXFx1MDE0RFxcdTAxNEZcXHUwMTUxXFx1MDE1M1xcdTAxNTVcXHUwMTU3XFx1MDE1OVxcdTAxNUJcXHUwMTVEXFx1MDE1RlxcdTAxNjFcXHUwMTYzXFx1MDE2NVxcdTAxNjdcXHUwMTY5XFx1MDE2QlxcdTAxNkRcXHUwMTZGXFx1MDE3MVxcdTAxNzNcXHUwMTc1XFx1MDE3N1xcdTAxN0FcXHUwMTdDXFx1MDE3RS1cXHUwMTgwXFx1MDE4M1xcdTAxODVcXHUwMTg4XFx1MDE4Q1xcdTAxOERcXHUwMTkyXFx1MDE5NVxcdTAxOTktXFx1MDE5QlxcdTAxOUVcXHUwMUExXFx1MDFBM1xcdTAxQTVcXHUwMUE4XFx1MDFBQVxcdTAxQUJcXHUwMUFEXFx1MDFCMFxcdTAxQjRcXHUwMUI2XFx1MDFCOVxcdTAxQkFcXHUwMUJELVxcdTAxQkZcXHUwMUM2XFx1MDFDOVxcdTAxQ0NcXHUwMUNFXFx1MDFEMFxcdTAxRDJcXHUwMUQ0XFx1MDFENlxcdTAxRDhcXHUwMURBXFx1MDFEQ1xcdTAxRERcXHUwMURGXFx1MDFFMVxcdTAxRTNcXHUwMUU1XFx1MDFFN1xcdTAxRTlcXHUwMUVCXFx1MDFFRFxcdTAxRUZcXHUwMUYwXFx1MDFGM1xcdTAxRjVcXHUwMUY5XFx1MDFGQlxcdTAxRkRcXHUwMUZGXFx1MDIwMVxcdTAyMDNcXHUwMjA1XFx1MDIwN1xcdTAyMDlcXHUwMjBCXFx1MDIwRFxcdTAyMEZcXHUwMjExXFx1MDIxM1xcdTAyMTVcXHUwMjE3XFx1MDIxOVxcdTAyMUJcXHUwMjFEXFx1MDIxRlxcdTAyMjFcXHUwMjIzXFx1MDIyNVxcdTAyMjdcXHUwMjI5XFx1MDIyQlxcdTAyMkRcXHUwMjJGXFx1MDIzMVxcdTAyMzMtXFx1MDIzOVxcdTAyM0NcXHUwMjNGXFx1MDI0MFxcdTAyNDJcXHUwMjQ3XFx1MDI0OVxcdTAyNEJcXHUwMjREXFx1MDI0Ri1cXHUwMjkzXFx1MDI5NS1cXHUwMkFGXFx1MDM3MVxcdTAzNzNcXHUwMzc3XFx1MDM3Qi1cXHUwMzdEXFx1MDM5MFxcdTAzQUMtXFx1MDNDRVxcdTAzRDBcXHUwM0QxXFx1MDNENS1cXHUwM0Q3XFx1MDNEOVxcdTAzREJcXHUwM0REXFx1MDNERlxcdTAzRTFcXHUwM0UzXFx1MDNFNVxcdTAzRTdcXHUwM0U5XFx1MDNFQlxcdTAzRURcXHUwM0VGLVxcdTAzRjNcXHUwM0Y1XFx1MDNGOFxcdTAzRkJcXHUwM0ZDXFx1MDQzMC1cXHUwNDVGXFx1MDQ2MVxcdTA0NjNcXHUwNDY1XFx1MDQ2N1xcdTA0NjlcXHUwNDZCXFx1MDQ2RFxcdTA0NkZcXHUwNDcxXFx1MDQ3M1xcdTA0NzVcXHUwNDc3XFx1MDQ3OVxcdTA0N0JcXHUwNDdEXFx1MDQ3RlxcdTA0ODFcXHUwNDhCXFx1MDQ4RFxcdTA0OEZcXHUwNDkxXFx1MDQ5M1xcdTA0OTVcXHUwNDk3XFx1MDQ5OVxcdTA0OUJcXHUwNDlEXFx1MDQ5RlxcdTA0QTFcXHUwNEEzXFx1MDRBNVxcdTA0QTdcXHUwNEE5XFx1MDRBQlxcdTA0QURcXHUwNEFGXFx1MDRCMVxcdTA0QjNcXHUwNEI1XFx1MDRCN1xcdTA0QjlcXHUwNEJCXFx1MDRCRFxcdTA0QkZcXHUwNEMyXFx1MDRDNFxcdTA0QzZcXHUwNEM4XFx1MDRDQVxcdTA0Q0NcXHUwNENFXFx1MDRDRlxcdTA0RDFcXHUwNEQzXFx1MDRENVxcdTA0RDdcXHUwNEQ5XFx1MDREQlxcdTA0RERcXHUwNERGXFx1MDRFMVxcdTA0RTNcXHUwNEU1XFx1MDRFN1xcdTA0RTlcXHUwNEVCXFx1MDRFRFxcdTA0RUZcXHUwNEYxXFx1MDRGM1xcdTA0RjVcXHUwNEY3XFx1MDRGOVxcdTA0RkJcXHUwNEZEXFx1MDRGRlxcdTA1MDFcXHUwNTAzXFx1MDUwNVxcdTA1MDdcXHUwNTA5XFx1MDUwQlxcdTA1MERcXHUwNTBGXFx1MDUxMVxcdTA1MTNcXHUwNTE1XFx1MDUxN1xcdTA1MTlcXHUwNTFCXFx1MDUxRFxcdTA1MUZcXHUwNTIxXFx1MDUyM1xcdTA1MjVcXHUwNTI3XFx1MDUyOVxcdTA1MkJcXHUwNTJEXFx1MDUyRlxcdTA1NjEtXFx1MDU4N1xcdTEzRjgtXFx1MTNGRFxcdTFDODAtXFx1MUM4OFxcdTFEMDAtXFx1MUQyQlxcdTFENkItXFx1MUQ3N1xcdTFENzktXFx1MUQ5QVxcdTFFMDFcXHUxRTAzXFx1MUUwNVxcdTFFMDdcXHUxRTA5XFx1MUUwQlxcdTFFMERcXHUxRTBGXFx1MUUxMVxcdTFFMTNcXHUxRTE1XFx1MUUxN1xcdTFFMTlcXHUxRTFCXFx1MUUxRFxcdTFFMUZcXHUxRTIxXFx1MUUyM1xcdTFFMjVcXHUxRTI3XFx1MUUyOVxcdTFFMkJcXHUxRTJEXFx1MUUyRlxcdTFFMzFcXHUxRTMzXFx1MUUzNVxcdTFFMzdcXHUxRTM5XFx1MUUzQlxcdTFFM0RcXHUxRTNGXFx1MUU0MVxcdTFFNDNcXHUxRTQ1XFx1MUU0N1xcdTFFNDlcXHUxRTRCXFx1MUU0RFxcdTFFNEZcXHUxRTUxXFx1MUU1M1xcdTFFNTVcXHUxRTU3XFx1MUU1OVxcdTFFNUJcXHUxRTVEXFx1MUU1RlxcdTFFNjFcXHUxRTYzXFx1MUU2NVxcdTFFNjdcXHUxRTY5XFx1MUU2QlxcdTFFNkRcXHUxRTZGXFx1MUU3MVxcdTFFNzNcXHUxRTc1XFx1MUU3N1xcdTFFNzlcXHUxRTdCXFx1MUU3RFxcdTFFN0ZcXHUxRTgxXFx1MUU4M1xcdTFFODVcXHUxRTg3XFx1MUU4OVxcdTFFOEJcXHUxRThEXFx1MUU4RlxcdTFFOTFcXHUxRTkzXFx1MUU5NS1cXHUxRTlEXFx1MUU5RlxcdTFFQTFcXHUxRUEzXFx1MUVBNVxcdTFFQTdcXHUxRUE5XFx1MUVBQlxcdTFFQURcXHUxRUFGXFx1MUVCMVxcdTFFQjNcXHUxRUI1XFx1MUVCN1xcdTFFQjlcXHUxRUJCXFx1MUVCRFxcdTFFQkZcXHUxRUMxXFx1MUVDM1xcdTFFQzVcXHUxRUM3XFx1MUVDOVxcdTFFQ0JcXHUxRUNEXFx1MUVDRlxcdTFFRDFcXHUxRUQzXFx1MUVENVxcdTFFRDdcXHUxRUQ5XFx1MUVEQlxcdTFFRERcXHUxRURGXFx1MUVFMVxcdTFFRTNcXHUxRUU1XFx1MUVFN1xcdTFFRTlcXHUxRUVCXFx1MUVFRFxcdTFFRUZcXHUxRUYxXFx1MUVGM1xcdTFFRjVcXHUxRUY3XFx1MUVGOVxcdTFFRkJcXHUxRUZEXFx1MUVGRi1cXHUxRjA3XFx1MUYxMC1cXHUxRjE1XFx1MUYyMC1cXHUxRjI3XFx1MUYzMC1cXHUxRjM3XFx1MUY0MC1cXHUxRjQ1XFx1MUY1MC1cXHUxRjU3XFx1MUY2MC1cXHUxRjY3XFx1MUY3MC1cXHUxRjdEXFx1MUY4MC1cXHUxRjg3XFx1MUY5MC1cXHUxRjk3XFx1MUZBMC1cXHUxRkE3XFx1MUZCMC1cXHUxRkI0XFx1MUZCNlxcdTFGQjdcXHUxRkJFXFx1MUZDMi1cXHUxRkM0XFx1MUZDNlxcdTFGQzdcXHUxRkQwLVxcdTFGRDNcXHUxRkQ2XFx1MUZEN1xcdTFGRTAtXFx1MUZFN1xcdTFGRjItXFx1MUZGNFxcdTFGRjZcXHUxRkY3XFx1MjEwQVxcdTIxMEVcXHUyMTBGXFx1MjExM1xcdTIxMkZcXHUyMTM0XFx1MjEzOVxcdTIxM0NcXHUyMTNEXFx1MjE0Ni1cXHUyMTQ5XFx1MjE0RVxcdTIxODRcXHUyQzMwLVxcdTJDNUVcXHUyQzYxXFx1MkM2NVxcdTJDNjZcXHUyQzY4XFx1MkM2QVxcdTJDNkNcXHUyQzcxXFx1MkM3M1xcdTJDNzRcXHUyQzc2LVxcdTJDN0JcXHUyQzgxXFx1MkM4M1xcdTJDODVcXHUyQzg3XFx1MkM4OVxcdTJDOEJcXHUyQzhEXFx1MkM4RlxcdTJDOTFcXHUyQzkzXFx1MkM5NVxcdTJDOTdcXHUyQzk5XFx1MkM5QlxcdTJDOURcXHUyQzlGXFx1MkNBMVxcdTJDQTNcXHUyQ0E1XFx1MkNBN1xcdTJDQTlcXHUyQ0FCXFx1MkNBRFxcdTJDQUZcXHUyQ0IxXFx1MkNCM1xcdTJDQjVcXHUyQ0I3XFx1MkNCOVxcdTJDQkJcXHUyQ0JEXFx1MkNCRlxcdTJDQzFcXHUyQ0MzXFx1MkNDNVxcdTJDQzdcXHUyQ0M5XFx1MkNDQlxcdTJDQ0RcXHUyQ0NGXFx1MkNEMVxcdTJDRDNcXHUyQ0Q1XFx1MkNEN1xcdTJDRDlcXHUyQ0RCXFx1MkNERFxcdTJDREZcXHUyQ0UxXFx1MkNFM1xcdTJDRTRcXHUyQ0VDXFx1MkNFRVxcdTJDRjNcXHUyRDAwLVxcdTJEMjVcXHUyRDI3XFx1MkQyRFxcdUE2NDFcXHVBNjQzXFx1QTY0NVxcdUE2NDdcXHVBNjQ5XFx1QTY0QlxcdUE2NERcXHVBNjRGXFx1QTY1MVxcdUE2NTNcXHVBNjU1XFx1QTY1N1xcdUE2NTlcXHVBNjVCXFx1QTY1RFxcdUE2NUZcXHVBNjYxXFx1QTY2M1xcdUE2NjVcXHVBNjY3XFx1QTY2OVxcdUE2NkJcXHVBNjZEXFx1QTY4MVxcdUE2ODNcXHVBNjg1XFx1QTY4N1xcdUE2ODlcXHVBNjhCXFx1QTY4RFxcdUE2OEZcXHVBNjkxXFx1QTY5M1xcdUE2OTVcXHVBNjk3XFx1QTY5OVxcdUE2OUJcXHVBNzIzXFx1QTcyNVxcdUE3MjdcXHVBNzI5XFx1QTcyQlxcdUE3MkRcXHVBNzJGLVxcdUE3MzFcXHVBNzMzXFx1QTczNVxcdUE3MzdcXHVBNzM5XFx1QTczQlxcdUE3M0RcXHVBNzNGXFx1QTc0MVxcdUE3NDNcXHVBNzQ1XFx1QTc0N1xcdUE3NDlcXHVBNzRCXFx1QTc0RFxcdUE3NEZcXHVBNzUxXFx1QTc1M1xcdUE3NTVcXHVBNzU3XFx1QTc1OVxcdUE3NUJcXHVBNzVEXFx1QTc1RlxcdUE3NjFcXHVBNzYzXFx1QTc2NVxcdUE3NjdcXHVBNzY5XFx1QTc2QlxcdUE3NkRcXHVBNzZGXFx1QTc3MS1cXHVBNzc4XFx1QTc3QVxcdUE3N0NcXHVBNzdGXFx1QTc4MVxcdUE3ODNcXHVBNzg1XFx1QTc4N1xcdUE3OENcXHVBNzhFXFx1QTc5MVxcdUE3OTMtXFx1QTc5NVxcdUE3OTdcXHVBNzk5XFx1QTc5QlxcdUE3OURcXHVBNzlGXFx1QTdBMVxcdUE3QTNcXHVBN0E1XFx1QTdBN1xcdUE3QTlcXHVBN0I1XFx1QTdCN1xcdUE3RkFcXHVBQjMwLVxcdUFCNUFcXHVBQjYwLVxcdUFCNjVcXHVBQjcwLVxcdUFCQkZcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGRjQxLVxcdUZGNUFdfFxcdUQ4MDFbXFx1REMyOC1cXHVEQzRGXFx1RENEOC1cXHVEQ0ZCXXxcXHVEODAzW1xcdURDQzAtXFx1RENGMl18XFx1RDgwNltcXHVEQ0MwLVxcdURDREZdfFxcdUQ4MzVbXFx1REMxQS1cXHVEQzMzXFx1REM0RS1cXHVEQzU0XFx1REM1Ni1cXHVEQzY3XFx1REM4Mi1cXHVEQzlCXFx1RENCNi1cXHVEQ0I5XFx1RENCQlxcdURDQkQtXFx1RENDM1xcdURDQzUtXFx1RENDRlxcdURDRUEtXFx1REQwM1xcdUREMUUtXFx1REQzN1xcdURENTItXFx1REQ2QlxcdUREODYtXFx1REQ5RlxcdUREQkEtXFx1REREM1xcdURERUUtXFx1REUwN1xcdURFMjItXFx1REUzQlxcdURFNTYtXFx1REU2RlxcdURFOEEtXFx1REVBNVxcdURFQzItXFx1REVEQVxcdURFREMtXFx1REVFMVxcdURFRkMtXFx1REYxNFxcdURGMTYtXFx1REYxQlxcdURGMzYtXFx1REY0RVxcdURGNTAtXFx1REY1NVxcdURGNzAtXFx1REY4OFxcdURGOEEtXFx1REY4RlxcdURGQUEtXFx1REZDMlxcdURGQzQtXFx1REZDOVxcdURGQ0JdfFxcdUQ4M0FbXFx1REQyMi1cXHVERDQzXS8sXG4gIEx0OiAvW1xcdTAxQzVcXHUwMUM4XFx1MDFDQlxcdTAxRjJcXHUxRjg4LVxcdTFGOEZcXHUxRjk4LVxcdTFGOUZcXHUxRkE4LVxcdTFGQUZcXHUxRkJDXFx1MUZDQ1xcdTFGRkNdLyxcbiAgTG06IC9bXFx1MDJCMC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzc0XFx1MDM3QVxcdTA1NTlcXHUwNjQwXFx1MDZFNVxcdTA2RTZcXHUwN0Y0XFx1MDdGNVxcdTA3RkFcXHUwODFBXFx1MDgyNFxcdTA4MjhcXHUwOTcxXFx1MEU0NlxcdTBFQzZcXHUxMEZDXFx1MTdEN1xcdTE4NDNcXHUxQUE3XFx1MUM3OC1cXHUxQzdEXFx1MUQyQy1cXHUxRDZBXFx1MUQ3OFxcdTFEOUItXFx1MURCRlxcdTIwNzFcXHUyMDdGXFx1MjA5MC1cXHUyMDlDXFx1MkM3Q1xcdTJDN0RcXHUyRDZGXFx1MkUyRlxcdTMwMDVcXHUzMDMxLVxcdTMwMzVcXHUzMDNCXFx1MzA5RFxcdTMwOUVcXHUzMEZDLVxcdTMwRkVcXHVBMDE1XFx1QTRGOC1cXHVBNEZEXFx1QTYwQ1xcdUE2N0ZcXHVBNjlDXFx1QTY5RFxcdUE3MTctXFx1QTcxRlxcdUE3NzBcXHVBNzg4XFx1QTdGOFxcdUE3RjlcXHVBOUNGXFx1QTlFNlxcdUFBNzBcXHVBQUREXFx1QUFGM1xcdUFBRjRcXHVBQjVDLVxcdUFCNUZcXHVGRjcwXFx1RkY5RVxcdUZGOUZdfFxcdUQ4MUFbXFx1REY0MC1cXHVERjQzXXxcXHVEODFCW1xcdURGOTMtXFx1REY5RlxcdURGRTBdLyxcbiAgTG86IC9bXFx4QUFcXHhCQVxcdTAxQkJcXHUwMUMwLVxcdTAxQzNcXHUwMjk0XFx1MDVEMC1cXHUwNUVBXFx1MDVGMC1cXHUwNUYyXFx1MDYyMC1cXHUwNjNGXFx1MDY0MS1cXHUwNjRBXFx1MDY2RVxcdTA2NkZcXHUwNjcxLVxcdTA2RDNcXHUwNkQ1XFx1MDZFRVxcdTA2RUZcXHUwNkZBLVxcdTA2RkNcXHUwNkZGXFx1MDcxMFxcdTA3MTItXFx1MDcyRlxcdTA3NEQtXFx1MDdBNVxcdTA3QjFcXHUwN0NBLVxcdTA3RUFcXHUwODAwLVxcdTA4MTVcXHUwODQwLVxcdTA4NThcXHUwOEEwLVxcdTA4QjRcXHUwOEI2LVxcdTA4QkRcXHUwOTA0LVxcdTA5MzlcXHUwOTNEXFx1MDk1MFxcdTA5NTgtXFx1MDk2MVxcdTA5NzItXFx1MDk4MFxcdTA5ODUtXFx1MDk4Q1xcdTA5OEZcXHUwOTkwXFx1MDk5My1cXHUwOUE4XFx1MDlBQS1cXHUwOUIwXFx1MDlCMlxcdTA5QjYtXFx1MDlCOVxcdTA5QkRcXHUwOUNFXFx1MDlEQ1xcdTA5RERcXHUwOURGLVxcdTA5RTFcXHUwOUYwXFx1MDlGMVxcdTBBMDUtXFx1MEEwQVxcdTBBMEZcXHUwQTEwXFx1MEExMy1cXHUwQTI4XFx1MEEyQS1cXHUwQTMwXFx1MEEzMlxcdTBBMzNcXHUwQTM1XFx1MEEzNlxcdTBBMzhcXHUwQTM5XFx1MEE1OS1cXHUwQTVDXFx1MEE1RVxcdTBBNzItXFx1MEE3NFxcdTBBODUtXFx1MEE4RFxcdTBBOEYtXFx1MEE5MVxcdTBBOTMtXFx1MEFBOFxcdTBBQUEtXFx1MEFCMFxcdTBBQjJcXHUwQUIzXFx1MEFCNS1cXHUwQUI5XFx1MEFCRFxcdTBBRDBcXHUwQUUwXFx1MEFFMVxcdTBBRjlcXHUwQjA1LVxcdTBCMENcXHUwQjBGXFx1MEIxMFxcdTBCMTMtXFx1MEIyOFxcdTBCMkEtXFx1MEIzMFxcdTBCMzJcXHUwQjMzXFx1MEIzNS1cXHUwQjM5XFx1MEIzRFxcdTBCNUNcXHUwQjVEXFx1MEI1Ri1cXHUwQjYxXFx1MEI3MVxcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJEMFxcdTBDMDUtXFx1MEMwQ1xcdTBDMEUtXFx1MEMxMFxcdTBDMTItXFx1MEMyOFxcdTBDMkEtXFx1MEMzOVxcdTBDM0RcXHUwQzU4LVxcdTBDNUFcXHUwQzYwXFx1MEM2MVxcdTBDODBcXHUwQzg1LVxcdTBDOENcXHUwQzhFLVxcdTBDOTBcXHUwQzkyLVxcdTBDQThcXHUwQ0FBLVxcdTBDQjNcXHUwQ0I1LVxcdTBDQjlcXHUwQ0JEXFx1MENERVxcdTBDRTBcXHUwQ0UxXFx1MENGMVxcdTBDRjJcXHUwRDA1LVxcdTBEMENcXHUwRDBFLVxcdTBEMTBcXHUwRDEyLVxcdTBEM0FcXHUwRDNEXFx1MEQ0RVxcdTBENTQtXFx1MEQ1NlxcdTBENUYtXFx1MEQ2MVxcdTBEN0EtXFx1MEQ3RlxcdTBEODUtXFx1MEQ5NlxcdTBEOUEtXFx1MERCMVxcdTBEQjMtXFx1MERCQlxcdTBEQkRcXHUwREMwLVxcdTBEQzZcXHUwRTAxLVxcdTBFMzBcXHUwRTMyXFx1MEUzM1xcdTBFNDAtXFx1MEU0NVxcdTBFODFcXHUwRTgyXFx1MEU4NFxcdTBFODdcXHUwRTg4XFx1MEU4QVxcdTBFOERcXHUwRTk0LVxcdTBFOTdcXHUwRTk5LVxcdTBFOUZcXHUwRUExLVxcdTBFQTNcXHUwRUE1XFx1MEVBN1xcdTBFQUFcXHUwRUFCXFx1MEVBRC1cXHUwRUIwXFx1MEVCMlxcdTBFQjNcXHUwRUJEXFx1MEVDMC1cXHUwRUM0XFx1MEVEQy1cXHUwRURGXFx1MEYwMFxcdTBGNDAtXFx1MEY0N1xcdTBGNDktXFx1MEY2Q1xcdTBGODgtXFx1MEY4Q1xcdTEwMDAtXFx1MTAyQVxcdTEwM0ZcXHUxMDUwLVxcdTEwNTVcXHUxMDVBLVxcdTEwNURcXHUxMDYxXFx1MTA2NVxcdTEwNjZcXHUxMDZFLVxcdTEwNzBcXHUxMDc1LVxcdTEwODFcXHUxMDhFXFx1MTBEMC1cXHUxMEZBXFx1MTBGRC1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzgwLVxcdTEzOEZcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkYxLVxcdTE2RjhcXHUxNzAwLVxcdTE3MENcXHUxNzBFLVxcdTE3MTFcXHUxNzIwLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0RDXFx1MTgyMC1cXHUxODQyXFx1MTg0NC1cXHUxODc3XFx1MTg4MC1cXHUxODg0XFx1MTg4Ny1cXHUxOEE4XFx1MThBQVxcdTE4QjAtXFx1MThGNVxcdTE5MDAtXFx1MTkxRVxcdTE5NTAtXFx1MTk2RFxcdTE5NzAtXFx1MTk3NFxcdTE5ODAtXFx1MTlBQlxcdTE5QjAtXFx1MTlDOVxcdTFBMDAtXFx1MUExNlxcdTFBMjAtXFx1MUE1NFxcdTFCMDUtXFx1MUIzM1xcdTFCNDUtXFx1MUI0QlxcdTFCODMtXFx1MUJBMFxcdTFCQUVcXHUxQkFGXFx1MUJCQS1cXHUxQkU1XFx1MUMwMC1cXHUxQzIzXFx1MUM0RC1cXHUxQzRGXFx1MUM1QS1cXHUxQzc3XFx1MUNFOS1cXHUxQ0VDXFx1MUNFRS1cXHUxQ0YxXFx1MUNGNVxcdTFDRjZcXHUyMTM1LVxcdTIxMzhcXHUyRDMwLVxcdTJENjdcXHUyRDgwLVxcdTJEOTZcXHUyREEwLVxcdTJEQTZcXHUyREE4LVxcdTJEQUVcXHUyREIwLVxcdTJEQjZcXHUyREI4LVxcdTJEQkVcXHUyREMwLVxcdTJEQzZcXHUyREM4LVxcdTJEQ0VcXHUyREQwLVxcdTJERDZcXHUyREQ4LVxcdTJEREVcXHUzMDA2XFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOUZcXHUzMEExLVxcdTMwRkFcXHUzMEZGXFx1MzEwNS1cXHUzMTJEXFx1MzEzMS1cXHUzMThFXFx1MzFBMC1cXHUzMUJBXFx1MzFGMC1cXHUzMUZGXFx1MzQwMC1cXHU0REI1XFx1NEUwMC1cXHU5RkQ1XFx1QTAwMC1cXHVBMDE0XFx1QTAxNi1cXHVBNDhDXFx1QTREMC1cXHVBNEY3XFx1QTUwMC1cXHVBNjBCXFx1QTYxMC1cXHVBNjFGXFx1QTYyQVxcdUE2MkJcXHVBNjZFXFx1QTZBMC1cXHVBNkU1XFx1QTc4RlxcdUE3RjdcXHVBN0ZCLVxcdUE4MDFcXHVBODAzLVxcdUE4MDVcXHVBODA3LVxcdUE4MEFcXHVBODBDLVxcdUE4MjJcXHVBODQwLVxcdUE4NzNcXHVBODgyLVxcdUE4QjNcXHVBOEYyLVxcdUE4RjdcXHVBOEZCXFx1QThGRFxcdUE5MEEtXFx1QTkyNVxcdUE5MzAtXFx1QTk0NlxcdUE5NjAtXFx1QTk3Q1xcdUE5ODQtXFx1QTlCMlxcdUE5RTAtXFx1QTlFNFxcdUE5RTctXFx1QTlFRlxcdUE5RkEtXFx1QTlGRVxcdUFBMDAtXFx1QUEyOFxcdUFBNDAtXFx1QUE0MlxcdUFBNDQtXFx1QUE0QlxcdUFBNjAtXFx1QUE2RlxcdUFBNzEtXFx1QUE3NlxcdUFBN0FcXHVBQTdFLVxcdUFBQUZcXHVBQUIxXFx1QUFCNVxcdUFBQjZcXHVBQUI5LVxcdUFBQkRcXHVBQUMwXFx1QUFDMlxcdUFBREJcXHVBQURDXFx1QUFFMC1cXHVBQUVBXFx1QUFGMlxcdUFCMDEtXFx1QUIwNlxcdUFCMDktXFx1QUIwRVxcdUFCMTEtXFx1QUIxNlxcdUFCMjAtXFx1QUIyNlxcdUFCMjgtXFx1QUIyRVxcdUFCQzAtXFx1QUJFMlxcdUFDMDAtXFx1RDdBM1xcdUQ3QjAtXFx1RDdDNlxcdUQ3Q0ItXFx1RDdGQlxcdUY5MDAtXFx1RkE2RFxcdUZBNzAtXFx1RkFEOVxcdUZCMURcXHVGQjFGLVxcdUZCMjhcXHVGQjJBLVxcdUZCMzZcXHVGQjM4LVxcdUZCM0NcXHVGQjNFXFx1RkI0MFxcdUZCNDFcXHVGQjQzXFx1RkI0NFxcdUZCNDYtXFx1RkJCMVxcdUZCRDMtXFx1RkQzRFxcdUZENTAtXFx1RkQ4RlxcdUZEOTItXFx1RkRDN1xcdUZERjAtXFx1RkRGQlxcdUZFNzAtXFx1RkU3NFxcdUZFNzYtXFx1RkVGQ1xcdUZGNjYtXFx1RkY2RlxcdUZGNzEtXFx1RkY5RFxcdUZGQTAtXFx1RkZCRVxcdUZGQzItXFx1RkZDN1xcdUZGQ0EtXFx1RkZDRlxcdUZGRDItXFx1RkZEN1xcdUZGREEtXFx1RkZEQ118XFx1RDgwMFtcXHVEQzAwLVxcdURDMEJcXHVEQzBELVxcdURDMjZcXHVEQzI4LVxcdURDM0FcXHVEQzNDXFx1REMzRFxcdURDM0YtXFx1REM0RFxcdURDNTAtXFx1REM1RFxcdURDODAtXFx1RENGQVxcdURFODAtXFx1REU5Q1xcdURFQTAtXFx1REVEMFxcdURGMDAtXFx1REYxRlxcdURGMzAtXFx1REY0MFxcdURGNDItXFx1REY0OVxcdURGNTAtXFx1REY3NVxcdURGODAtXFx1REY5RFxcdURGQTAtXFx1REZDM1xcdURGQzgtXFx1REZDRl18XFx1RDgwMVtcXHVEQzUwLVxcdURDOURcXHVERDAwLVxcdUREMjdcXHVERDMwLVxcdURENjNcXHVERTAwLVxcdURGMzZcXHVERjQwLVxcdURGNTVcXHVERjYwLVxcdURGNjddfFxcdUQ4MDJbXFx1REMwMC1cXHVEQzA1XFx1REMwOFxcdURDMEEtXFx1REMzNVxcdURDMzdcXHVEQzM4XFx1REMzQ1xcdURDM0YtXFx1REM1NVxcdURDNjAtXFx1REM3NlxcdURDODAtXFx1REM5RVxcdURDRTAtXFx1RENGMlxcdURDRjRcXHVEQ0Y1XFx1REQwMC1cXHVERDE1XFx1REQyMC1cXHVERDM5XFx1REQ4MC1cXHVEREI3XFx1RERCRVxcdUREQkZcXHVERTAwXFx1REUxMC1cXHVERTEzXFx1REUxNS1cXHVERTE3XFx1REUxOS1cXHVERTMzXFx1REU2MC1cXHVERTdDXFx1REU4MC1cXHVERTlDXFx1REVDMC1cXHVERUM3XFx1REVDOS1cXHVERUU0XFx1REYwMC1cXHVERjM1XFx1REY0MC1cXHVERjU1XFx1REY2MC1cXHVERjcyXFx1REY4MC1cXHVERjkxXXxcXHVEODAzW1xcdURDMDAtXFx1REM0OF18XFx1RDgwNFtcXHVEQzAzLVxcdURDMzdcXHVEQzgzLVxcdURDQUZcXHVEQ0QwLVxcdURDRThcXHVERDAzLVxcdUREMjZcXHVERDUwLVxcdURENzJcXHVERDc2XFx1REQ4My1cXHVEREIyXFx1RERDMS1cXHVEREM0XFx1REREQVxcdURERENcXHVERTAwLVxcdURFMTFcXHVERTEzLVxcdURFMkJcXHVERTgwLVxcdURFODZcXHVERTg4XFx1REU4QS1cXHVERThEXFx1REU4Ri1cXHVERTlEXFx1REU5Ri1cXHVERUE4XFx1REVCMC1cXHVERURFXFx1REYwNS1cXHVERjBDXFx1REYwRlxcdURGMTBcXHVERjEzLVxcdURGMjhcXHVERjJBLVxcdURGMzBcXHVERjMyXFx1REYzM1xcdURGMzUtXFx1REYzOVxcdURGM0RcXHVERjUwXFx1REY1RC1cXHVERjYxXXxcXHVEODA1W1xcdURDMDAtXFx1REMzNFxcdURDNDctXFx1REM0QVxcdURDODAtXFx1RENBRlxcdURDQzRcXHVEQ0M1XFx1RENDN1xcdUREODAtXFx1RERBRVxcdURERDgtXFx1REREQlxcdURFMDAtXFx1REUyRlxcdURFNDRcXHVERTgwLVxcdURFQUFcXHVERjAwLVxcdURGMTldfFxcdUQ4MDZbXFx1RENGRlxcdURFQzAtXFx1REVGOF18XFx1RDgwN1tcXHVEQzAwLVxcdURDMDhcXHVEQzBBLVxcdURDMkVcXHVEQzQwXFx1REM3Mi1cXHVEQzhGXXxcXHVEODA4W1xcdURDMDAtXFx1REY5OV18XFx1RDgwOVtcXHVEQzgwLVxcdURENDNdfFtcXHVEODBDXFx1RDgxQy1cXHVEODIwXFx1RDg0MC1cXHVEODY4XFx1RDg2QS1cXHVEODZDXFx1RDg2Ri1cXHVEODcyXVtcXHVEQzAwLVxcdURGRkZdfFxcdUQ4MERbXFx1REMwMC1cXHVEQzJFXXxcXHVEODExW1xcdURDMDAtXFx1REU0Nl18XFx1RDgxQVtcXHVEQzAwLVxcdURFMzhcXHVERTQwLVxcdURFNUVcXHVERUQwLVxcdURFRURcXHVERjAwLVxcdURGMkZcXHVERjYzLVxcdURGNzdcXHVERjdELVxcdURGOEZdfFxcdUQ4MUJbXFx1REYwMC1cXHVERjQ0XFx1REY1MF18XFx1RDgyMVtcXHVEQzAwLVxcdURGRUNdfFxcdUQ4MjJbXFx1REMwMC1cXHVERUYyXXxcXHVEODJDW1xcdURDMDBcXHVEQzAxXXxcXHVEODJGW1xcdURDMDAtXFx1REM2QVxcdURDNzAtXFx1REM3Q1xcdURDODAtXFx1REM4OFxcdURDOTAtXFx1REM5OV18XFx1RDgzQVtcXHVEQzAwLVxcdURDQzRdfFxcdUQ4M0JbXFx1REUwMC1cXHVERTAzXFx1REUwNS1cXHVERTFGXFx1REUyMVxcdURFMjJcXHVERTI0XFx1REUyN1xcdURFMjktXFx1REUzMlxcdURFMzQtXFx1REUzN1xcdURFMzlcXHVERTNCXFx1REU0MlxcdURFNDdcXHVERTQ5XFx1REU0QlxcdURFNEQtXFx1REU0RlxcdURFNTFcXHVERTUyXFx1REU1NFxcdURFNTdcXHVERTU5XFx1REU1QlxcdURFNURcXHVERTVGXFx1REU2MVxcdURFNjJcXHVERTY0XFx1REU2Ny1cXHVERTZBXFx1REU2Qy1cXHVERTcyXFx1REU3NC1cXHVERTc3XFx1REU3OS1cXHVERTdDXFx1REU3RVxcdURFODAtXFx1REU4OVxcdURFOEItXFx1REU5QlxcdURFQTEtXFx1REVBM1xcdURFQTUtXFx1REVBOVxcdURFQUItXFx1REVCQl18XFx1RDg2OVtcXHVEQzAwLVxcdURFRDZcXHVERjAwLVxcdURGRkZdfFxcdUQ4NkRbXFx1REMwMC1cXHVERjM0XFx1REY0MC1cXHVERkZGXXxcXHVEODZFW1xcdURDMDAtXFx1REMxRFxcdURDMjAtXFx1REZGRl18XFx1RDg3M1tcXHVEQzAwLVxcdURFQTFdfFxcdUQ4N0VbXFx1REMwMC1cXHVERTFEXS8sXG5cbiAgLy8gTnVtYmVyc1xuICBObDogL1tcXHUxNkVFLVxcdTE2RjBcXHUyMTYwLVxcdTIxODJcXHUyMTg1LVxcdTIxODhcXHUzMDA3XFx1MzAyMS1cXHUzMDI5XFx1MzAzOC1cXHUzMDNBXFx1QTZFNi1cXHVBNkVGXXxcXHVEODAwW1xcdURENDAtXFx1REQ3NFxcdURGNDFcXHVERjRBXFx1REZEMS1cXHVERkQ1XXxcXHVEODA5W1xcdURDMDAtXFx1REM2RV0vLFxuICBOZDogL1swLTlcXHUwNjYwLVxcdTA2NjlcXHUwNkYwLVxcdTA2RjlcXHUwN0MwLVxcdTA3QzlcXHUwOTY2LVxcdTA5NkZcXHUwOUU2LVxcdTA5RUZcXHUwQTY2LVxcdTBBNkZcXHUwQUU2LVxcdTBBRUZcXHUwQjY2LVxcdTBCNkZcXHUwQkU2LVxcdTBCRUZcXHUwQzY2LVxcdTBDNkZcXHUwQ0U2LVxcdTBDRUZcXHUwRDY2LVxcdTBENkZcXHUwREU2LVxcdTBERUZcXHUwRTUwLVxcdTBFNTlcXHUwRUQwLVxcdTBFRDlcXHUwRjIwLVxcdTBGMjlcXHUxMDQwLVxcdTEwNDlcXHUxMDkwLVxcdTEwOTlcXHUxN0UwLVxcdTE3RTlcXHUxODEwLVxcdTE4MTlcXHUxOTQ2LVxcdTE5NEZcXHUxOUQwLVxcdTE5RDlcXHUxQTgwLVxcdTFBODlcXHUxQTkwLVxcdTFBOTlcXHUxQjUwLVxcdTFCNTlcXHUxQkIwLVxcdTFCQjlcXHUxQzQwLVxcdTFDNDlcXHUxQzUwLVxcdTFDNTlcXHVBNjIwLVxcdUE2MjlcXHVBOEQwLVxcdUE4RDlcXHVBOTAwLVxcdUE5MDlcXHVBOUQwLVxcdUE5RDlcXHVBOUYwLVxcdUE5RjlcXHVBQTUwLVxcdUFBNTlcXHVBQkYwLVxcdUFCRjlcXHVGRjEwLVxcdUZGMTldfFxcdUQ4MDFbXFx1RENBMC1cXHVEQ0E5XXxcXHVEODA0W1xcdURDNjYtXFx1REM2RlxcdURDRjAtXFx1RENGOVxcdUREMzYtXFx1REQzRlxcdURERDAtXFx1REREOVxcdURFRjAtXFx1REVGOV18W1xcdUQ4MDVcXHVEODA3XVtcXHVEQzUwLVxcdURDNTlcXHVEQ0QwLVxcdURDRDlcXHVERTUwLVxcdURFNTlcXHVERUMwLVxcdURFQzlcXHVERjMwLVxcdURGMzldfFxcdUQ4MDZbXFx1RENFMC1cXHVEQ0U5XXxcXHVEODFBW1xcdURFNjAtXFx1REU2OVxcdURGNTAtXFx1REY1OV18XFx1RDgzNVtcXHVERkNFLVxcdURGRkZdfFxcdUQ4M0FbXFx1REQ1MC1cXHVERDU5XS8sXG5cbiAgLy8gTWFya3NcbiAgTW46IC9bXFx1MDMwMC1cXHUwMzZGXFx1MDQ4My1cXHUwNDg3XFx1MDU5MS1cXHUwNUJEXFx1MDVCRlxcdTA1QzFcXHUwNUMyXFx1MDVDNFxcdTA1QzVcXHUwNUM3XFx1MDYxMC1cXHUwNjFBXFx1MDY0Qi1cXHUwNjVGXFx1MDY3MFxcdTA2RDYtXFx1MDZEQ1xcdTA2REYtXFx1MDZFNFxcdTA2RTdcXHUwNkU4XFx1MDZFQS1cXHUwNkVEXFx1MDcxMVxcdTA3MzAtXFx1MDc0QVxcdTA3QTYtXFx1MDdCMFxcdTA3RUItXFx1MDdGM1xcdTA4MTYtXFx1MDgxOVxcdTA4MUItXFx1MDgyM1xcdTA4MjUtXFx1MDgyN1xcdTA4MjktXFx1MDgyRFxcdTA4NTktXFx1MDg1QlxcdTA4RDQtXFx1MDhFMVxcdTA4RTMtXFx1MDkwMlxcdTA5M0FcXHUwOTNDXFx1MDk0MS1cXHUwOTQ4XFx1MDk0RFxcdTA5NTEtXFx1MDk1N1xcdTA5NjJcXHUwOTYzXFx1MDk4MVxcdTA5QkNcXHUwOUMxLVxcdTA5QzRcXHUwOUNEXFx1MDlFMlxcdTA5RTNcXHUwQTAxXFx1MEEwMlxcdTBBM0NcXHUwQTQxXFx1MEE0MlxcdTBBNDdcXHUwQTQ4XFx1MEE0Qi1cXHUwQTREXFx1MEE1MVxcdTBBNzBcXHUwQTcxXFx1MEE3NVxcdTBBODFcXHUwQTgyXFx1MEFCQ1xcdTBBQzEtXFx1MEFDNVxcdTBBQzdcXHUwQUM4XFx1MEFDRFxcdTBBRTJcXHUwQUUzXFx1MEIwMVxcdTBCM0NcXHUwQjNGXFx1MEI0MS1cXHUwQjQ0XFx1MEI0RFxcdTBCNTZcXHUwQjYyXFx1MEI2M1xcdTBCODJcXHUwQkMwXFx1MEJDRFxcdTBDMDBcXHUwQzNFLVxcdTBDNDBcXHUwQzQ2LVxcdTBDNDhcXHUwQzRBLVxcdTBDNERcXHUwQzU1XFx1MEM1NlxcdTBDNjJcXHUwQzYzXFx1MEM4MVxcdTBDQkNcXHUwQ0JGXFx1MENDNlxcdTBDQ0NcXHUwQ0NEXFx1MENFMlxcdTBDRTNcXHUwRDAxXFx1MEQ0MS1cXHUwRDQ0XFx1MEQ0RFxcdTBENjJcXHUwRDYzXFx1MERDQVxcdTBERDItXFx1MERENFxcdTBERDZcXHUwRTMxXFx1MEUzNC1cXHUwRTNBXFx1MEU0Ny1cXHUwRTRFXFx1MEVCMVxcdTBFQjQtXFx1MEVCOVxcdTBFQkJcXHUwRUJDXFx1MEVDOC1cXHUwRUNEXFx1MEYxOFxcdTBGMTlcXHUwRjM1XFx1MEYzN1xcdTBGMzlcXHUwRjcxLVxcdTBGN0VcXHUwRjgwLVxcdTBGODRcXHUwRjg2XFx1MEY4N1xcdTBGOEQtXFx1MEY5N1xcdTBGOTktXFx1MEZCQ1xcdTBGQzZcXHUxMDJELVxcdTEwMzBcXHUxMDMyLVxcdTEwMzdcXHUxMDM5XFx1MTAzQVxcdTEwM0RcXHUxMDNFXFx1MTA1OFxcdTEwNTlcXHUxMDVFLVxcdTEwNjBcXHUxMDcxLVxcdTEwNzRcXHUxMDgyXFx1MTA4NVxcdTEwODZcXHUxMDhEXFx1MTA5RFxcdTEzNUQtXFx1MTM1RlxcdTE3MTItXFx1MTcxNFxcdTE3MzItXFx1MTczNFxcdTE3NTJcXHUxNzUzXFx1MTc3MlxcdTE3NzNcXHUxN0I0XFx1MTdCNVxcdTE3QjctXFx1MTdCRFxcdTE3QzZcXHUxN0M5LVxcdTE3RDNcXHUxN0REXFx1MTgwQi1cXHUxODBEXFx1MTg4NVxcdTE4ODZcXHUxOEE5XFx1MTkyMC1cXHUxOTIyXFx1MTkyN1xcdTE5MjhcXHUxOTMyXFx1MTkzOS1cXHUxOTNCXFx1MUExN1xcdTFBMThcXHUxQTFCXFx1MUE1NlxcdTFBNTgtXFx1MUE1RVxcdTFBNjBcXHUxQTYyXFx1MUE2NS1cXHUxQTZDXFx1MUE3My1cXHUxQTdDXFx1MUE3RlxcdTFBQjAtXFx1MUFCRFxcdTFCMDAtXFx1MUIwM1xcdTFCMzRcXHUxQjM2LVxcdTFCM0FcXHUxQjNDXFx1MUI0MlxcdTFCNkItXFx1MUI3M1xcdTFCODBcXHUxQjgxXFx1MUJBMi1cXHUxQkE1XFx1MUJBOFxcdTFCQTlcXHUxQkFCLVxcdTFCQURcXHUxQkU2XFx1MUJFOFxcdTFCRTlcXHUxQkVEXFx1MUJFRi1cXHUxQkYxXFx1MUMyQy1cXHUxQzMzXFx1MUMzNlxcdTFDMzdcXHUxQ0QwLVxcdTFDRDJcXHUxQ0Q0LVxcdTFDRTBcXHUxQ0UyLVxcdTFDRThcXHUxQ0VEXFx1MUNGNFxcdTFDRjhcXHUxQ0Y5XFx1MURDMC1cXHUxREY1XFx1MURGQi1cXHUxREZGXFx1MjBEMC1cXHUyMERDXFx1MjBFMVxcdTIwRTUtXFx1MjBGMFxcdTJDRUYtXFx1MkNGMVxcdTJEN0ZcXHUyREUwLVxcdTJERkZcXHUzMDJBLVxcdTMwMkRcXHUzMDk5XFx1MzA5QVxcdUE2NkZcXHVBNjc0LVxcdUE2N0RcXHVBNjlFXFx1QTY5RlxcdUE2RjBcXHVBNkYxXFx1QTgwMlxcdUE4MDZcXHVBODBCXFx1QTgyNVxcdUE4MjZcXHVBOEM0XFx1QThDNVxcdUE4RTAtXFx1QThGMVxcdUE5MjYtXFx1QTkyRFxcdUE5NDctXFx1QTk1MVxcdUE5ODAtXFx1QTk4MlxcdUE5QjNcXHVBOUI2LVxcdUE5QjlcXHVBOUJDXFx1QTlFNVxcdUFBMjktXFx1QUEyRVxcdUFBMzFcXHVBQTMyXFx1QUEzNVxcdUFBMzZcXHVBQTQzXFx1QUE0Q1xcdUFBN0NcXHVBQUIwXFx1QUFCMi1cXHVBQUI0XFx1QUFCN1xcdUFBQjhcXHVBQUJFXFx1QUFCRlxcdUFBQzFcXHVBQUVDXFx1QUFFRFxcdUFBRjZcXHVBQkU1XFx1QUJFOFxcdUFCRURcXHVGQjFFXFx1RkUwMC1cXHVGRTBGXFx1RkUyMC1cXHVGRTJGXXxcXHVEODAwW1xcdURERkRcXHVERUUwXFx1REY3Ni1cXHVERjdBXXxcXHVEODAyW1xcdURFMDEtXFx1REUwM1xcdURFMDVcXHVERTA2XFx1REUwQy1cXHVERTBGXFx1REUzOC1cXHVERTNBXFx1REUzRlxcdURFRTVcXHVERUU2XXxcXHVEODA0W1xcdURDMDFcXHVEQzM4LVxcdURDNDZcXHVEQzdGLVxcdURDODFcXHVEQ0IzLVxcdURDQjZcXHVEQ0I5XFx1RENCQVxcdUREMDAtXFx1REQwMlxcdUREMjctXFx1REQyQlxcdUREMkQtXFx1REQzNFxcdURENzNcXHVERDgwXFx1REQ4MVxcdUREQjYtXFx1RERCRVxcdUREQ0EtXFx1RERDQ1xcdURFMkYtXFx1REUzMVxcdURFMzRcXHVERTM2XFx1REUzN1xcdURFM0VcXHVERURGXFx1REVFMy1cXHVERUVBXFx1REYwMFxcdURGMDFcXHVERjNDXFx1REY0MFxcdURGNjYtXFx1REY2Q1xcdURGNzAtXFx1REY3NF18XFx1RDgwNVtcXHVEQzM4LVxcdURDM0ZcXHVEQzQyLVxcdURDNDRcXHVEQzQ2XFx1RENCMy1cXHVEQ0I4XFx1RENCQVxcdURDQkZcXHVEQ0MwXFx1RENDMlxcdURDQzNcXHVEREIyLVxcdUREQjVcXHVEREJDXFx1RERCRFxcdUREQkZcXHVEREMwXFx1REREQ1xcdURERERcXHVERTMzLVxcdURFM0FcXHVERTNEXFx1REUzRlxcdURFNDBcXHVERUFCXFx1REVBRFxcdURFQjAtXFx1REVCNVxcdURFQjdcXHVERjFELVxcdURGMUZcXHVERjIyLVxcdURGMjVcXHVERjI3LVxcdURGMkJdfFxcdUQ4MDdbXFx1REMzMC1cXHVEQzM2XFx1REMzOC1cXHVEQzNEXFx1REMzRlxcdURDOTItXFx1RENBN1xcdURDQUEtXFx1RENCMFxcdURDQjJcXHVEQ0IzXFx1RENCNVxcdURDQjZdfFxcdUQ4MUFbXFx1REVGMC1cXHVERUY0XFx1REYzMC1cXHVERjM2XXxcXHVEODFCW1xcdURGOEYtXFx1REY5Ml18XFx1RDgyRltcXHVEQzlEXFx1REM5RV18XFx1RDgzNFtcXHVERDY3LVxcdURENjlcXHVERDdCLVxcdUREODJcXHVERDg1LVxcdUREOEJcXHVEREFBLVxcdUREQURcXHVERTQyLVxcdURFNDRdfFxcdUQ4MzZbXFx1REUwMC1cXHVERTM2XFx1REUzQi1cXHVERTZDXFx1REU3NVxcdURFODRcXHVERTlCLVxcdURFOUZcXHVERUExLVxcdURFQUZdfFxcdUQ4MzhbXFx1REMwMC1cXHVEQzA2XFx1REMwOC1cXHVEQzE4XFx1REMxQi1cXHVEQzIxXFx1REMyM1xcdURDMjRcXHVEQzI2LVxcdURDMkFdfFxcdUQ4M0FbXFx1RENEMC1cXHVEQ0Q2XFx1REQ0NC1cXHVERDRBXXxcXHVEQjQwW1xcdUREMDAtXFx1RERFRl0vLFxuICBNYzogL1tcXHUwOTAzLVxcdTA5MDNdfFtcXHUwOTNFLVxcdTA5NDBdfFtcXHUwOTQ5LVxcdTA5NENdfFtcXHUwOTgyLVxcdTA5ODNdfFtcXHUwOUJFLVxcdTA5QzBdfFtcXHUwOUM3LVxcdTA5QzhdfFtcXHUwOUNCLVxcdTA5Q0NdfFtcXHUwOUQ3LVxcdTA5RDddfFtcXHUwQTNFLVxcdTBBNDBdfFtcXHUwQTgzLVxcdTBBODNdfFtcXHUwQUJFLVxcdTBBQzBdfFtcXHUwQUM5LVxcdTBBQzldfFtcXHUwQUNCLVxcdTBBQ0NdfFtcXHUwQjAyLVxcdTBCMDNdfFtcXHUwQjNFLVxcdTBCM0VdfFtcXHUwQjQwLVxcdTBCNDBdfFtcXHUwQjQ3LVxcdTBCNDhdfFtcXHUwQjRCLVxcdTBCNENdfFtcXHUwQjU3LVxcdTBCNTddfFtcXHUwQjgzLVxcdTBCODNdfFtcXHUwQkJFLVxcdTBCQkZdfFtcXHUwQkMxLVxcdTBCQzJdfFtcXHUwQkM2LVxcdTBCQzhdfFtcXHUwQkNBLVxcdTBCQ0NdfFtcXHUwQkQ3LVxcdTBCRDddfFtcXHUwQzAxLVxcdTBDMDNdfFtcXHUwQzQxLVxcdTBDNDRdfFtcXHUwQzgyLVxcdTBDODNdfFtcXHUwQ0JFLVxcdTBDQkVdfFtcXHUwQ0MwLVxcdTBDQzRdfFtcXHUwQ0M3LVxcdTBDQzhdfFtcXHUwQ0NBLVxcdTBDQ0JdfFtcXHUwQ0Q1LVxcdTBDRDZdfFtcXHUwRDAyLVxcdTBEMDNdfFtcXHUwRDNFLVxcdTBENDBdfFtcXHUwRDQ2LVxcdTBENDhdfFtcXHUwRDRBLVxcdTBENENdfFtcXHUwRDU3LVxcdTBENTddfFtcXHUwRjNFLVxcdTBGM0ZdfFtcXHUwRjdGLVxcdTBGN0ZdLyxcblxuICAvLyBQdW5jdHVhdGlvbiwgQ29ubmVjdG9yXG4gIFBjOiAvW19cXHUyMDNGXFx1MjA0MFxcdTIwNTRcXHVGRTMzXFx1RkUzNFxcdUZFNEQtXFx1RkU0RlxcdUZGM0ZdLyxcblxuICAvLyBTZXBhcmF0b3IsIFNwYWNlXG4gIFpzOiAvWyBcXHhBMFxcdTE2ODBcXHUyMDAwLVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBdLyxcblxuICAvLyBUaGVzZSB0d28gYXJlIG5vdCByZWFsIFVuaWNvZGUgY2F0ZWdvcmllcywgYnV0IG91ciB1c2VmdWwgZm9yIE9obS5cbiAgLy8gTCBpcyBhIGNvbWJpbmF0aW9uIG9mIGFsbCB0aGUgbGV0dGVyIGNhdGVnb3JpZXMuXG4gIC8vIEx0bW8gaXMgYSBjb21iaW5hdGlvbiBvZiBMdCwgTG0sIGFuZCBMby5cbiAgTDogL1tBLVphLXpcXHhBQVxceEI1XFx4QkFcXHhDMC1cXHhENlxceEQ4LVxceEY2XFx4RjgtXFx1MDJDMVxcdTAyQzYtXFx1MDJEMVxcdTAyRTAtXFx1MDJFNFxcdTAyRUNcXHUwMkVFXFx1MDM3MC1cXHUwMzc0XFx1MDM3NlxcdTAzNzdcXHUwMzdBLVxcdTAzN0RcXHUwMzdGXFx1MDM4NlxcdTAzODgtXFx1MDM4QVxcdTAzOENcXHUwMzhFLVxcdTAzQTFcXHUwM0EzLVxcdTAzRjVcXHUwM0Y3LVxcdTA0ODFcXHUwNDhBLVxcdTA1MkZcXHUwNTMxLVxcdTA1NTZcXHUwNTU5XFx1MDU2MS1cXHUwNTg3XFx1MDVEMC1cXHUwNUVBXFx1MDVGMC1cXHUwNUYyXFx1MDYyMC1cXHUwNjRBXFx1MDY2RVxcdTA2NkZcXHUwNjcxLVxcdTA2RDNcXHUwNkQ1XFx1MDZFNVxcdTA2RTZcXHUwNkVFXFx1MDZFRlxcdTA2RkEtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwXFx1MDcxMi1cXHUwNzJGXFx1MDc0RC1cXHUwN0E1XFx1MDdCMVxcdTA3Q0EtXFx1MDdFQVxcdTA3RjRcXHUwN0Y1XFx1MDdGQVxcdTA4MDAtXFx1MDgxNVxcdTA4MUFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA4QTAtXFx1MDhCNFxcdTA4QjYtXFx1MDhCRFxcdTA5MDQtXFx1MDkzOVxcdTA5M0RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk3MS1cXHUwOTgwXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCRFxcdTA5Q0VcXHUwOURDXFx1MDlERFxcdTA5REYtXFx1MDlFMVxcdTA5RjBcXHUwOUYxXFx1MEEwNS1cXHUwQTBBXFx1MEEwRlxcdTBBMTBcXHUwQTEzLVxcdTBBMjhcXHUwQTJBLVxcdTBBMzBcXHUwQTMyXFx1MEEzM1xcdTBBMzVcXHUwQTM2XFx1MEEzOFxcdTBBMzlcXHUwQTU5LVxcdTBBNUNcXHUwQTVFXFx1MEE3Mi1cXHUwQTc0XFx1MEE4NS1cXHUwQThEXFx1MEE4Ri1cXHUwQTkxXFx1MEE5My1cXHUwQUE4XFx1MEFBQS1cXHUwQUIwXFx1MEFCMlxcdTBBQjNcXHUwQUI1LVxcdTBBQjlcXHUwQUJEXFx1MEFEMFxcdTBBRTBcXHUwQUUxXFx1MEFGOVxcdTBCMDUtXFx1MEIwQ1xcdTBCMEZcXHUwQjEwXFx1MEIxMy1cXHUwQjI4XFx1MEIyQS1cXHUwQjMwXFx1MEIzMlxcdTBCMzNcXHUwQjM1LVxcdTBCMzlcXHUwQjNEXFx1MEI1Q1xcdTBCNURcXHUwQjVGLVxcdTBCNjFcXHUwQjcxXFx1MEI4M1xcdTBCODUtXFx1MEI4QVxcdTBCOEUtXFx1MEI5MFxcdTBCOTItXFx1MEI5NVxcdTBCOTlcXHUwQjlBXFx1MEI5Q1xcdTBCOUVcXHUwQjlGXFx1MEJBM1xcdTBCQTRcXHUwQkE4LVxcdTBCQUFcXHUwQkFFLVxcdTBCQjlcXHUwQkQwXFx1MEMwNS1cXHUwQzBDXFx1MEMwRS1cXHUwQzEwXFx1MEMxMi1cXHUwQzI4XFx1MEMyQS1cXHUwQzM5XFx1MEMzRFxcdTBDNTgtXFx1MEM1QVxcdTBDNjBcXHUwQzYxXFx1MEM4MFxcdTBDODUtXFx1MEM4Q1xcdTBDOEUtXFx1MEM5MFxcdTBDOTItXFx1MENBOFxcdTBDQUEtXFx1MENCM1xcdTBDQjUtXFx1MENCOVxcdTBDQkRcXHUwQ0RFXFx1MENFMFxcdTBDRTFcXHUwQ0YxXFx1MENGMlxcdTBEMDUtXFx1MEQwQ1xcdTBEMEUtXFx1MEQxMFxcdTBEMTItXFx1MEQzQVxcdTBEM0RcXHUwRDRFXFx1MEQ1NC1cXHUwRDU2XFx1MEQ1Ri1cXHUwRDYxXFx1MEQ3QS1cXHUwRDdGXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBFMDEtXFx1MEUzMFxcdTBFMzJcXHUwRTMzXFx1MEU0MC1cXHUwRTQ2XFx1MEU4MVxcdTBFODJcXHUwRTg0XFx1MEU4N1xcdTBFODhcXHUwRThBXFx1MEU4RFxcdTBFOTQtXFx1MEU5N1xcdTBFOTktXFx1MEU5RlxcdTBFQTEtXFx1MEVBM1xcdTBFQTVcXHUwRUE3XFx1MEVBQVxcdTBFQUJcXHUwRUFELVxcdTBFQjBcXHUwRUIyXFx1MEVCM1xcdTBFQkRcXHUwRUMwLVxcdTBFQzRcXHUwRUM2XFx1MEVEQy1cXHUwRURGXFx1MEYwMFxcdTBGNDAtXFx1MEY0N1xcdTBGNDktXFx1MEY2Q1xcdTBGODgtXFx1MEY4Q1xcdTEwMDAtXFx1MTAyQVxcdTEwM0ZcXHUxMDUwLVxcdTEwNTVcXHUxMDVBLVxcdTEwNURcXHUxMDYxXFx1MTA2NVxcdTEwNjZcXHUxMDZFLVxcdTEwNzBcXHUxMDc1LVxcdTEwODFcXHUxMDhFXFx1MTBBMC1cXHUxMEM1XFx1MTBDN1xcdTEwQ0RcXHUxMEQwLVxcdTEwRkFcXHUxMEZDLVxcdTEyNDhcXHUxMjRBLVxcdTEyNERcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1QS1cXHUxMjVEXFx1MTI2MC1cXHUxMjg4XFx1MTI4QS1cXHUxMjhEXFx1MTI5MC1cXHUxMkIwXFx1MTJCMi1cXHUxMkI1XFx1MTJCOC1cXHUxMkJFXFx1MTJDMFxcdTEyQzItXFx1MTJDNVxcdTEyQzgtXFx1MTJENlxcdTEyRDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1QVxcdTEzODAtXFx1MTM4RlxcdTEzQTAtXFx1MTNGNVxcdTEzRjgtXFx1MTNGRFxcdTE0MDEtXFx1MTY2Q1xcdTE2NkYtXFx1MTY3RlxcdTE2ODEtXFx1MTY5QVxcdTE2QTAtXFx1MTZFQVxcdTE2RjEtXFx1MTZGOFxcdTE3MDAtXFx1MTcwQ1xcdTE3MEUtXFx1MTcxMVxcdTE3MjAtXFx1MTczMVxcdTE3NDAtXFx1MTc1MVxcdTE3NjAtXFx1MTc2Q1xcdTE3NkUtXFx1MTc3MFxcdTE3ODAtXFx1MTdCM1xcdTE3RDdcXHUxN0RDXFx1MTgyMC1cXHUxODc3XFx1MTg4MC1cXHUxODg0XFx1MTg4Ny1cXHUxOEE4XFx1MThBQVxcdTE4QjAtXFx1MThGNVxcdTE5MDAtXFx1MTkxRVxcdTE5NTAtXFx1MTk2RFxcdTE5NzAtXFx1MTk3NFxcdTE5ODAtXFx1MTlBQlxcdTE5QjAtXFx1MTlDOVxcdTFBMDAtXFx1MUExNlxcdTFBMjAtXFx1MUE1NFxcdTFBQTdcXHUxQjA1LVxcdTFCMzNcXHUxQjQ1LVxcdTFCNEJcXHUxQjgzLVxcdTFCQTBcXHUxQkFFXFx1MUJBRlxcdTFCQkEtXFx1MUJFNVxcdTFDMDAtXFx1MUMyM1xcdTFDNEQtXFx1MUM0RlxcdTFDNUEtXFx1MUM3RFxcdTFDODAtXFx1MUM4OFxcdTFDRTktXFx1MUNFQ1xcdTFDRUUtXFx1MUNGMVxcdTFDRjVcXHUxQ0Y2XFx1MUQwMC1cXHUxREJGXFx1MUUwMC1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwNzFcXHUyMDdGXFx1MjA5MC1cXHUyMDlDXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOS1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTJEXFx1MjEyRi1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxODNcXHUyMTg0XFx1MkMwMC1cXHUyQzJFXFx1MkMzMC1cXHUyQzVFXFx1MkM2MC1cXHUyQ0U0XFx1MkNFQi1cXHUyQ0VFXFx1MkNGMlxcdTJDRjNcXHUyRDAwLVxcdTJEMjVcXHUyRDI3XFx1MkQyRFxcdTJEMzAtXFx1MkQ2N1xcdTJENkZcXHUyRDgwLVxcdTJEOTZcXHUyREEwLVxcdTJEQTZcXHUyREE4LVxcdTJEQUVcXHUyREIwLVxcdTJEQjZcXHUyREI4LVxcdTJEQkVcXHUyREMwLVxcdTJEQzZcXHUyREM4LVxcdTJEQ0VcXHUyREQwLVxcdTJERDZcXHUyREQ4LVxcdTJEREVcXHUyRTJGXFx1MzAwNVxcdTMwMDZcXHUzMDMxLVxcdTMwMzVcXHUzMDNCXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOUQtXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZENVxcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYxRlxcdUE2MkFcXHVBNjJCXFx1QTY0MC1cXHVBNjZFXFx1QTY3Ri1cXHVBNjlEXFx1QTZBMC1cXHVBNkU1XFx1QTcxNy1cXHVBNzFGXFx1QTcyMi1cXHVBNzg4XFx1QTc4Qi1cXHVBN0FFXFx1QTdCMC1cXHVBN0I3XFx1QTdGNy1cXHVBODAxXFx1QTgwMy1cXHVBODA1XFx1QTgwNy1cXHVBODBBXFx1QTgwQy1cXHVBODIyXFx1QTg0MC1cXHVBODczXFx1QTg4Mi1cXHVBOEIzXFx1QThGMi1cXHVBOEY3XFx1QThGQlxcdUE4RkRcXHVBOTBBLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGXFx1QTlFMC1cXHVBOUU0XFx1QTlFNi1cXHVBOUVGXFx1QTlGQS1cXHVBOUZFXFx1QUEwMC1cXHVBQTI4XFx1QUE0MC1cXHVBQTQyXFx1QUE0NC1cXHVBQTRCXFx1QUE2MC1cXHVBQTc2XFx1QUE3QVxcdUFBN0UtXFx1QUFBRlxcdUFBQjFcXHVBQUI1XFx1QUFCNlxcdUFBQjktXFx1QUFCRFxcdUFBQzBcXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVBXFx1QUFGMi1cXHVBQUY0XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUIzMC1cXHVBQjVBXFx1QUI1Qy1cXHVBQjY1XFx1QUI3MC1cXHVBQkUyXFx1QUMwMC1cXHVEN0EzXFx1RDdCMC1cXHVEN0M2XFx1RDdDQi1cXHVEN0ZCXFx1RjkwMC1cXHVGQTZEXFx1RkE3MC1cXHVGQUQ5XFx1RkIwMC1cXHVGQjA2XFx1RkIxMy1cXHVGQjE3XFx1RkIxRFxcdUZCMUYtXFx1RkIyOFxcdUZCMkEtXFx1RkIzNlxcdUZCMzgtXFx1RkIzQ1xcdUZCM0VcXHVGQjQwXFx1RkI0MVxcdUZCNDNcXHVGQjQ0XFx1RkI0Ni1cXHVGQkIxXFx1RkJEMy1cXHVGRDNEXFx1RkQ1MC1cXHVGRDhGXFx1RkQ5Mi1cXHVGREM3XFx1RkRGMC1cXHVGREZCXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYyMS1cXHVGRjNBXFx1RkY0MS1cXHVGRjVBXFx1RkY2Ni1cXHVGRkJFXFx1RkZDMi1cXHVGRkM3XFx1RkZDQS1cXHVGRkNGXFx1RkZEMi1cXHVGRkQ3XFx1RkZEQS1cXHVGRkRDXXxcXHVEODAwW1xcdURDMDAtXFx1REMwQlxcdURDMEQtXFx1REMyNlxcdURDMjgtXFx1REMzQVxcdURDM0NcXHVEQzNEXFx1REMzRi1cXHVEQzREXFx1REM1MC1cXHVEQzVEXFx1REM4MC1cXHVEQ0ZBXFx1REU4MC1cXHVERTlDXFx1REVBMC1cXHVERUQwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjQwXFx1REY0Mi1cXHVERjQ5XFx1REY1MC1cXHVERjc1XFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXXxcXHVEODAxW1xcdURDMDAtXFx1REM5RFxcdURDQjAtXFx1RENEM1xcdURDRDgtXFx1RENGQlxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDBcXHVERTEwLVxcdURFMTNcXHVERTE1LVxcdURFMTdcXHVERTE5LVxcdURFMzNcXHVERTYwLVxcdURFN0NcXHVERTgwLVxcdURFOUNcXHVERUMwLVxcdURFQzdcXHVERUM5LVxcdURFRTRcXHVERjAwLVxcdURGMzVcXHVERjQwLVxcdURGNTVcXHVERjYwLVxcdURGNzJcXHVERjgwLVxcdURGOTFdfFxcdUQ4MDNbXFx1REMwMC1cXHVEQzQ4XFx1REM4MC1cXHVEQ0IyXFx1RENDMC1cXHVEQ0YyXXxcXHVEODA0W1xcdURDMDMtXFx1REMzN1xcdURDODMtXFx1RENBRlxcdURDRDAtXFx1RENFOFxcdUREMDMtXFx1REQyNlxcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVERERBXFx1REREQ1xcdURFMDAtXFx1REUxMVxcdURFMTMtXFx1REUyQlxcdURFODAtXFx1REU4NlxcdURFODhcXHVERThBLVxcdURFOERcXHVERThGLVxcdURFOURcXHVERTlGLVxcdURFQThcXHVERUIwLVxcdURFREVcXHVERjA1LVxcdURGMENcXHVERjBGXFx1REYxMFxcdURGMTMtXFx1REYyOFxcdURGMkEtXFx1REYzMFxcdURGMzJcXHVERjMzXFx1REYzNS1cXHVERjM5XFx1REYzRFxcdURGNTBcXHVERjVELVxcdURGNjFdfFxcdUQ4MDVbXFx1REMwMC1cXHVEQzM0XFx1REM0Ny1cXHVEQzRBXFx1REM4MC1cXHVEQ0FGXFx1RENDNFxcdURDQzVcXHVEQ0M3XFx1REQ4MC1cXHVEREFFXFx1REREOC1cXHVERERCXFx1REUwMC1cXHVERTJGXFx1REU0NFxcdURFODAtXFx1REVBQVxcdURGMDAtXFx1REYxOV18XFx1RDgwNltcXHVEQ0EwLVxcdURDREZcXHVEQ0ZGXFx1REVDMC1cXHVERUY4XXxcXHVEODA3W1xcdURDMDAtXFx1REMwOFxcdURDMEEtXFx1REMyRVxcdURDNDBcXHVEQzcyLVxcdURDOEZdfFxcdUQ4MDhbXFx1REMwMC1cXHVERjk5XXxcXHVEODA5W1xcdURDODAtXFx1REQ0M118W1xcdUQ4MENcXHVEODFDLVxcdUQ4MjBcXHVEODQwLVxcdUQ4NjhcXHVEODZBLVxcdUQ4NkNcXHVEODZGLVxcdUQ4NzJdW1xcdURDMDAtXFx1REZGRl18XFx1RDgwRFtcXHVEQzAwLVxcdURDMkVdfFxcdUQ4MTFbXFx1REMwMC1cXHVERTQ2XXxcXHVEODFBW1xcdURDMDAtXFx1REUzOFxcdURFNDAtXFx1REU1RVxcdURFRDAtXFx1REVFRFxcdURGMDAtXFx1REYyRlxcdURGNDAtXFx1REY0M1xcdURGNjMtXFx1REY3N1xcdURGN0QtXFx1REY4Rl18XFx1RDgxQltcXHVERjAwLVxcdURGNDRcXHVERjUwXFx1REY5My1cXHVERjlGXFx1REZFMF18XFx1RDgyMVtcXHVEQzAwLVxcdURGRUNdfFxcdUQ4MjJbXFx1REMwMC1cXHVERUYyXXxcXHVEODJDW1xcdURDMDBcXHVEQzAxXXxcXHVEODJGW1xcdURDMDAtXFx1REM2QVxcdURDNzAtXFx1REM3Q1xcdURDODAtXFx1REM4OFxcdURDOTAtXFx1REM5OV18XFx1RDgzNVtcXHVEQzAwLVxcdURDNTRcXHVEQzU2LVxcdURDOUNcXHVEQzlFXFx1REM5RlxcdURDQTJcXHVEQ0E1XFx1RENBNlxcdURDQTktXFx1RENBQ1xcdURDQUUtXFx1RENCOVxcdURDQkJcXHVEQ0JELVxcdURDQzNcXHVEQ0M1LVxcdUREMDVcXHVERDA3LVxcdUREMEFcXHVERDBELVxcdUREMTRcXHVERDE2LVxcdUREMUNcXHVERDFFLVxcdUREMzlcXHVERDNCLVxcdUREM0VcXHVERDQwLVxcdURENDRcXHVERDQ2XFx1REQ0QS1cXHVERDUwXFx1REQ1Mi1cXHVERUE1XFx1REVBOC1cXHVERUMwXFx1REVDMi1cXHVERURBXFx1REVEQy1cXHVERUZBXFx1REVGQy1cXHVERjE0XFx1REYxNi1cXHVERjM0XFx1REYzNi1cXHVERjRFXFx1REY1MC1cXHVERjZFXFx1REY3MC1cXHVERjg4XFx1REY4QS1cXHVERkE4XFx1REZBQS1cXHVERkMyXFx1REZDNC1cXHVERkNCXXxcXHVEODNBW1xcdURDMDAtXFx1RENDNFxcdUREMDAtXFx1REQ0M118XFx1RDgzQltcXHVERTAwLVxcdURFMDNcXHVERTA1LVxcdURFMUZcXHVERTIxXFx1REUyMlxcdURFMjRcXHVERTI3XFx1REUyOS1cXHVERTMyXFx1REUzNC1cXHVERTM3XFx1REUzOVxcdURFM0JcXHVERTQyXFx1REU0N1xcdURFNDlcXHVERTRCXFx1REU0RC1cXHVERTRGXFx1REU1MVxcdURFNTJcXHVERTU0XFx1REU1N1xcdURFNTlcXHVERTVCXFx1REU1RFxcdURFNUZcXHVERTYxXFx1REU2MlxcdURFNjRcXHVERTY3LVxcdURFNkFcXHVERTZDLVxcdURFNzJcXHVERTc0LVxcdURFNzdcXHVERTc5LVxcdURFN0NcXHVERTdFXFx1REU4MC1cXHVERTg5XFx1REU4Qi1cXHVERTlCXFx1REVBMS1cXHVERUEzXFx1REVBNS1cXHVERUE5XFx1REVBQi1cXHVERUJCXXxcXHVEODY5W1xcdURDMDAtXFx1REVENlxcdURGMDAtXFx1REZGRl18XFx1RDg2RFtcXHVEQzAwLVxcdURGMzRcXHVERjQwLVxcdURGRkZdfFxcdUQ4NkVbXFx1REMwMC1cXHVEQzFEXFx1REMyMC1cXHVERkZGXXxcXHVEODczW1xcdURDMDAtXFx1REVBMV18XFx1RDg3RVtcXHVEQzAwLVxcdURFMURdLyxcbiAgTHRtbzogL1tcXHUwMUM1XFx1MDFDOFxcdTAxQ0JcXHUwMUYyXFx1MUY4OC1cXHUxRjhGXFx1MUY5OC1cXHUxRjlGXFx1MUZBOC1cXHUxRkFGXFx1MUZCQ1xcdTFGQ0NcXHUxRkZDXXxbXFx1MDJCMC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzc0XFx1MDM3QVxcdTA1NTlcXHUwNjQwXFx1MDZFNVxcdTA2RTZcXHUwN0Y0XFx1MDdGNVxcdTA3RkFcXHUwODFBXFx1MDgyNFxcdTA4MjhcXHUwOTcxXFx1MEU0NlxcdTBFQzZcXHUxMEZDXFx1MTdEN1xcdTE4NDNcXHUxQUE3XFx1MUM3OC1cXHUxQzdEXFx1MUQyQy1cXHUxRDZBXFx1MUQ3OFxcdTFEOUItXFx1MURCRlxcdTIwNzFcXHUyMDdGXFx1MjA5MC1cXHUyMDlDXFx1MkM3Q1xcdTJDN0RcXHUyRDZGXFx1MkUyRlxcdTMwMDVcXHUzMDMxLVxcdTMwMzVcXHUzMDNCXFx1MzA5RFxcdTMwOUVcXHUzMEZDLVxcdTMwRkVcXHVBMDE1XFx1QTRGOC1cXHVBNEZEXFx1QTYwQ1xcdUE2N0ZcXHVBNjlDXFx1QTY5RFxcdUE3MTctXFx1QTcxRlxcdUE3NzBcXHVBNzg4XFx1QTdGOFxcdUE3RjlcXHVBOUNGXFx1QTlFNlxcdUFBNzBcXHVBQUREXFx1QUFGM1xcdUFBRjRcXHVBQjVDLVxcdUFCNUZcXHVGRjcwXFx1RkY5RVxcdUZGOUZdfFxcdUQ4MUFbXFx1REY0MC1cXHVERjQzXXxcXHVEODFCW1xcdURGOTMtXFx1REY5RlxcdURGRTBdfFtcXHhBQVxceEJBXFx1MDFCQlxcdTAxQzAtXFx1MDFDM1xcdTAyOTRcXHUwNUQwLVxcdTA1RUFcXHUwNUYwLVxcdTA1RjJcXHUwNjIwLVxcdTA2M0ZcXHUwNjQxLVxcdTA2NEFcXHUwNjZFXFx1MDY2RlxcdTA2NzEtXFx1MDZEM1xcdTA2RDVcXHUwNkVFXFx1MDZFRlxcdTA2RkEtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwXFx1MDcxMi1cXHUwNzJGXFx1MDc0RC1cXHUwN0E1XFx1MDdCMVxcdTA3Q0EtXFx1MDdFQVxcdTA4MDAtXFx1MDgxNVxcdTA4NDAtXFx1MDg1OFxcdTA4QTAtXFx1MDhCNFxcdTA4QjYtXFx1MDhCRFxcdTA5MDQtXFx1MDkzOVxcdTA5M0RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk3Mi1cXHUwOTgwXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCRFxcdTA5Q0VcXHUwOURDXFx1MDlERFxcdTA5REYtXFx1MDlFMVxcdTA5RjBcXHUwOUYxXFx1MEEwNS1cXHUwQTBBXFx1MEEwRlxcdTBBMTBcXHUwQTEzLVxcdTBBMjhcXHUwQTJBLVxcdTBBMzBcXHUwQTMyXFx1MEEzM1xcdTBBMzVcXHUwQTM2XFx1MEEzOFxcdTBBMzlcXHUwQTU5LVxcdTBBNUNcXHUwQTVFXFx1MEE3Mi1cXHUwQTc0XFx1MEE4NS1cXHUwQThEXFx1MEE4Ri1cXHUwQTkxXFx1MEE5My1cXHUwQUE4XFx1MEFBQS1cXHUwQUIwXFx1MEFCMlxcdTBBQjNcXHUwQUI1LVxcdTBBQjlcXHUwQUJEXFx1MEFEMFxcdTBBRTBcXHUwQUUxXFx1MEFGOVxcdTBCMDUtXFx1MEIwQ1xcdTBCMEZcXHUwQjEwXFx1MEIxMy1cXHUwQjI4XFx1MEIyQS1cXHUwQjMwXFx1MEIzMlxcdTBCMzNcXHUwQjM1LVxcdTBCMzlcXHUwQjNEXFx1MEI1Q1xcdTBCNURcXHUwQjVGLVxcdTBCNjFcXHUwQjcxXFx1MEI4M1xcdTBCODUtXFx1MEI4QVxcdTBCOEUtXFx1MEI5MFxcdTBCOTItXFx1MEI5NVxcdTBCOTlcXHUwQjlBXFx1MEI5Q1xcdTBCOUVcXHUwQjlGXFx1MEJBM1xcdTBCQTRcXHUwQkE4LVxcdTBCQUFcXHUwQkFFLVxcdTBCQjlcXHUwQkQwXFx1MEMwNS1cXHUwQzBDXFx1MEMwRS1cXHUwQzEwXFx1MEMxMi1cXHUwQzI4XFx1MEMyQS1cXHUwQzM5XFx1MEMzRFxcdTBDNTgtXFx1MEM1QVxcdTBDNjBcXHUwQzYxXFx1MEM4MFxcdTBDODUtXFx1MEM4Q1xcdTBDOEUtXFx1MEM5MFxcdTBDOTItXFx1MENBOFxcdTBDQUEtXFx1MENCM1xcdTBDQjUtXFx1MENCOVxcdTBDQkRcXHUwQ0RFXFx1MENFMFxcdTBDRTFcXHUwQ0YxXFx1MENGMlxcdTBEMDUtXFx1MEQwQ1xcdTBEMEUtXFx1MEQxMFxcdTBEMTItXFx1MEQzQVxcdTBEM0RcXHUwRDRFXFx1MEQ1NC1cXHUwRDU2XFx1MEQ1Ri1cXHUwRDYxXFx1MEQ3QS1cXHUwRDdGXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBFMDEtXFx1MEUzMFxcdTBFMzJcXHUwRTMzXFx1MEU0MC1cXHUwRTQ1XFx1MEU4MVxcdTBFODJcXHUwRTg0XFx1MEU4N1xcdTBFODhcXHUwRThBXFx1MEU4RFxcdTBFOTQtXFx1MEU5N1xcdTBFOTktXFx1MEU5RlxcdTBFQTEtXFx1MEVBM1xcdTBFQTVcXHUwRUE3XFx1MEVBQVxcdTBFQUJcXHUwRUFELVxcdTBFQjBcXHUwRUIyXFx1MEVCM1xcdTBFQkRcXHUwRUMwLVxcdTBFQzRcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEY0MC1cXHUwRjQ3XFx1MEY0OS1cXHUwRjZDXFx1MEY4OC1cXHUwRjhDXFx1MTAwMC1cXHUxMDJBXFx1MTAzRlxcdTEwNTAtXFx1MTA1NVxcdTEwNUEtXFx1MTA1RFxcdTEwNjFcXHUxMDY1XFx1MTA2NlxcdTEwNkUtXFx1MTA3MFxcdTEwNzUtXFx1MTA4MVxcdTEwOEVcXHUxMEQwLVxcdTEwRkFcXHUxMEZELVxcdTEyNDhcXHUxMjRBLVxcdTEyNERcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1QS1cXHUxMjVEXFx1MTI2MC1cXHUxMjg4XFx1MTI4QS1cXHUxMjhEXFx1MTI5MC1cXHUxMkIwXFx1MTJCMi1cXHUxMkI1XFx1MTJCOC1cXHUxMkJFXFx1MTJDMFxcdTEyQzItXFx1MTJDNVxcdTEyQzgtXFx1MTJENlxcdTEyRDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1QVxcdTEzODAtXFx1MTM4RlxcdTE0MDEtXFx1MTY2Q1xcdTE2NkYtXFx1MTY3RlxcdTE2ODEtXFx1MTY5QVxcdTE2QTAtXFx1MTZFQVxcdTE2RjEtXFx1MTZGOFxcdTE3MDAtXFx1MTcwQ1xcdTE3MEUtXFx1MTcxMVxcdTE3MjAtXFx1MTczMVxcdTE3NDAtXFx1MTc1MVxcdTE3NjAtXFx1MTc2Q1xcdTE3NkUtXFx1MTc3MFxcdTE3ODAtXFx1MTdCM1xcdTE3RENcXHUxODIwLVxcdTE4NDJcXHUxODQ0LVxcdTE4NzdcXHUxODgwLVxcdTE4ODRcXHUxODg3LVxcdTE4QThcXHUxOEFBXFx1MThCMC1cXHUxOEY1XFx1MTkwMC1cXHUxOTFFXFx1MTk1MC1cXHUxOTZEXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOUFCXFx1MTlCMC1cXHUxOUM5XFx1MUEwMC1cXHUxQTE2XFx1MUEyMC1cXHUxQTU0XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRCXFx1MUI4My1cXHUxQkEwXFx1MUJBRVxcdTFCQUZcXHUxQkJBLVxcdTFCRTVcXHUxQzAwLVxcdTFDMjNcXHUxQzRELVxcdTFDNEZcXHUxQzVBLVxcdTFDNzdcXHUxQ0U5LVxcdTFDRUNcXHUxQ0VFLVxcdTFDRjFcXHUxQ0Y1XFx1MUNGNlxcdTIxMzUtXFx1MjEzOFxcdTJEMzAtXFx1MkQ2N1xcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTMwMDZcXHUzMDNDXFx1MzA0MS1cXHUzMDk2XFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkZcXHUzMTA1LVxcdTMxMkRcXHUzMTMxLVxcdTMxOEVcXHUzMUEwLVxcdTMxQkFcXHUzMUYwLVxcdTMxRkZcXHUzNDAwLVxcdTREQjVcXHU0RTAwLVxcdTlGRDVcXHVBMDAwLVxcdUEwMTRcXHVBMDE2LVxcdUE0OENcXHVBNEQwLVxcdUE0RjdcXHVBNTAwLVxcdUE2MEJcXHVBNjEwLVxcdUE2MUZcXHVBNjJBXFx1QTYyQlxcdUE2NkVcXHVBNkEwLVxcdUE2RTVcXHVBNzhGXFx1QTdGN1xcdUE3RkItXFx1QTgwMVxcdUE4MDMtXFx1QTgwNVxcdUE4MDctXFx1QTgwQVxcdUE4MEMtXFx1QTgyMlxcdUE4NDAtXFx1QTg3M1xcdUE4ODItXFx1QThCM1xcdUE4RjItXFx1QThGN1xcdUE4RkJcXHVBOEZEXFx1QTkwQS1cXHVBOTI1XFx1QTkzMC1cXHVBOTQ2XFx1QTk2MC1cXHVBOTdDXFx1QTk4NC1cXHVBOUIyXFx1QTlFMC1cXHVBOUU0XFx1QTlFNy1cXHVBOUVGXFx1QTlGQS1cXHVBOUZFXFx1QUEwMC1cXHVBQTI4XFx1QUE0MC1cXHVBQTQyXFx1QUE0NC1cXHVBQTRCXFx1QUE2MC1cXHVBQTZGXFx1QUE3MS1cXHVBQTc2XFx1QUE3QVxcdUFBN0UtXFx1QUFBRlxcdUFBQjFcXHVBQUI1XFx1QUFCNlxcdUFBQjktXFx1QUFCRFxcdUFBQzBcXHVBQUMyXFx1QUFEQlxcdUFBRENcXHVBQUUwLVxcdUFBRUFcXHVBQUYyXFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUJDMC1cXHVBQkUyXFx1QUMwMC1cXHVEN0EzXFx1RDdCMC1cXHVEN0M2XFx1RDdDQi1cXHVEN0ZCXFx1RjkwMC1cXHVGQTZEXFx1RkE3MC1cXHVGQUQ5XFx1RkIxRFxcdUZCMUYtXFx1RkIyOFxcdUZCMkEtXFx1RkIzNlxcdUZCMzgtXFx1RkIzQ1xcdUZCM0VcXHVGQjQwXFx1RkI0MVxcdUZCNDNcXHVGQjQ0XFx1RkI0Ni1cXHVGQkIxXFx1RkJEMy1cXHVGRDNEXFx1RkQ1MC1cXHVGRDhGXFx1RkQ5Mi1cXHVGREM3XFx1RkRGMC1cXHVGREZCXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkY2Ni1cXHVGRjZGXFx1RkY3MS1cXHVGRjlEXFx1RkZBMC1cXHVGRkJFXFx1RkZDMi1cXHVGRkM3XFx1RkZDQS1cXHVGRkNGXFx1RkZEMi1cXHVGRkQ3XFx1RkZEQS1cXHVGRkRDXXxcXHVEODAwW1xcdURDMDAtXFx1REMwQlxcdURDMEQtXFx1REMyNlxcdURDMjgtXFx1REMzQVxcdURDM0NcXHVEQzNEXFx1REMzRi1cXHVEQzREXFx1REM1MC1cXHVEQzVEXFx1REM4MC1cXHVEQ0ZBXFx1REU4MC1cXHVERTlDXFx1REVBMC1cXHVERUQwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjQwXFx1REY0Mi1cXHVERjQ5XFx1REY1MC1cXHVERjc1XFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXXxcXHVEODAxW1xcdURDNTAtXFx1REM5RFxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDBcXHVERTEwLVxcdURFMTNcXHVERTE1LVxcdURFMTdcXHVERTE5LVxcdURFMzNcXHVERTYwLVxcdURFN0NcXHVERTgwLVxcdURFOUNcXHVERUMwLVxcdURFQzdcXHVERUM5LVxcdURFRTRcXHVERjAwLVxcdURGMzVcXHVERjQwLVxcdURGNTVcXHVERjYwLVxcdURGNzJcXHVERjgwLVxcdURGOTFdfFxcdUQ4MDNbXFx1REMwMC1cXHVEQzQ4XXxcXHVEODA0W1xcdURDMDMtXFx1REMzN1xcdURDODMtXFx1RENBRlxcdURDRDAtXFx1RENFOFxcdUREMDMtXFx1REQyNlxcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVERERBXFx1REREQ1xcdURFMDAtXFx1REUxMVxcdURFMTMtXFx1REUyQlxcdURFODAtXFx1REU4NlxcdURFODhcXHVERThBLVxcdURFOERcXHVERThGLVxcdURFOURcXHVERTlGLVxcdURFQThcXHVERUIwLVxcdURFREVcXHVERjA1LVxcdURGMENcXHVERjBGXFx1REYxMFxcdURGMTMtXFx1REYyOFxcdURGMkEtXFx1REYzMFxcdURGMzJcXHVERjMzXFx1REYzNS1cXHVERjM5XFx1REYzRFxcdURGNTBcXHVERjVELVxcdURGNjFdfFxcdUQ4MDVbXFx1REMwMC1cXHVEQzM0XFx1REM0Ny1cXHVEQzRBXFx1REM4MC1cXHVEQ0FGXFx1RENDNFxcdURDQzVcXHVEQ0M3XFx1REQ4MC1cXHVEREFFXFx1REREOC1cXHVERERCXFx1REUwMC1cXHVERTJGXFx1REU0NFxcdURFODAtXFx1REVBQVxcdURGMDAtXFx1REYxOV18XFx1RDgwNltcXHVEQ0ZGXFx1REVDMC1cXHVERUY4XXxcXHVEODA3W1xcdURDMDAtXFx1REMwOFxcdURDMEEtXFx1REMyRVxcdURDNDBcXHVEQzcyLVxcdURDOEZdfFxcdUQ4MDhbXFx1REMwMC1cXHVERjk5XXxcXHVEODA5W1xcdURDODAtXFx1REQ0M118W1xcdUQ4MENcXHVEODFDLVxcdUQ4MjBcXHVEODQwLVxcdUQ4NjhcXHVEODZBLVxcdUQ4NkNcXHVEODZGLVxcdUQ4NzJdW1xcdURDMDAtXFx1REZGRl18XFx1RDgwRFtcXHVEQzAwLVxcdURDMkVdfFxcdUQ4MTFbXFx1REMwMC1cXHVERTQ2XXxcXHVEODFBW1xcdURDMDAtXFx1REUzOFxcdURFNDAtXFx1REU1RVxcdURFRDAtXFx1REVFRFxcdURGMDAtXFx1REYyRlxcdURGNjMtXFx1REY3N1xcdURGN0QtXFx1REY4Rl18XFx1RDgxQltcXHVERjAwLVxcdURGNDRcXHVERjUwXXxcXHVEODIxW1xcdURDMDAtXFx1REZFQ118XFx1RDgyMltcXHVEQzAwLVxcdURFRjJdfFxcdUQ4MkNbXFx1REMwMFxcdURDMDFdfFxcdUQ4MkZbXFx1REMwMC1cXHVEQzZBXFx1REM3MC1cXHVEQzdDXFx1REM4MC1cXHVEQzg4XFx1REM5MC1cXHVEQzk5XXxcXHVEODNBW1xcdURDMDAtXFx1RENDNF18XFx1RDgzQltcXHVERTAwLVxcdURFMDNcXHVERTA1LVxcdURFMUZcXHVERTIxXFx1REUyMlxcdURFMjRcXHVERTI3XFx1REUyOS1cXHVERTMyXFx1REUzNC1cXHVERTM3XFx1REUzOVxcdURFM0JcXHVERTQyXFx1REU0N1xcdURFNDlcXHVERTRCXFx1REU0RC1cXHVERTRGXFx1REU1MVxcdURFNTJcXHVERTU0XFx1REU1N1xcdURFNTlcXHVERTVCXFx1REU1RFxcdURFNUZcXHVERTYxXFx1REU2MlxcdURFNjRcXHVERTY3LVxcdURFNkFcXHVERTZDLVxcdURFNzJcXHVERTc0LVxcdURFNzdcXHVERTc5LVxcdURFN0NcXHVERTdFXFx1REU4MC1cXHVERTg5XFx1REU4Qi1cXHVERTlCXFx1REVBMS1cXHVERUEzXFx1REVBNS1cXHVERUE5XFx1REVBQi1cXHVERUJCXXxcXHVEODY5W1xcdURDMDAtXFx1REVENlxcdURGMDAtXFx1REZGRl18XFx1RDg2RFtcXHVEQzAwLVxcdURGMzRcXHVERjQwLVxcdURGRkZdfFxcdUQ4NkVbXFx1REMwMC1cXHVEQzFEXFx1REMyMC1cXHVERkZGXXxcXHVEODczW1xcdURDMDAtXFx1REVBMV18XFx1RDg3RVtcXHVEQzAwLVxcdURFMURdL1xufTtcbiJdfQ==
