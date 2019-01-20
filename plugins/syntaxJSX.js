var visit = require("unist-util-visit");
var visitChildren = require("unist-util-visit-children");
var toString = require("hast-util-to-mdast");
var unified = require("unified");
const remark = require("remark-parse");
var stringify = require("remark-stringify");
var stringifyHTML = require("rehype-stringify");
var toMdast = require("hast-util-to-mdast");

module.exports = () => transformer;

function transformer(tree) {
  visit(tree, "element", visitMarkdown);
}

var makeMarkdown = unified().use(stringify);
var makeHTML = unified().use(remark);

function visitMarkdown(node, index, parent) {
  var props = node.properties || {};

  props.code = makeMarkdown.stringify(toString(node));
  return node;
}
