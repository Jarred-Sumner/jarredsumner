const visit = require("unist-util-visit");
const toString = require("hast-util-to-mdast");
const unified = require("unified");
const stringify = require("remark-stringify");

module.exports = () => transformer;

function transformer(tree) {
  visit(tree, "element", visitMarkdown);
}

const makeMarkdown = unified().use(stringify);

function visitMarkdown(node) {
  const props = node.properties || {};

  props.code = makeMarkdown.stringify(toString(node));
  return node;
}
