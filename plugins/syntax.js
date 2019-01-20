const map = require("unist-util-map");

function valueOf(node) {
  return (
    (node && node.value ? node.value : node.alt ? node.alt : node.title) || ""
  );
}

function toString(node) {
  return [
    valueOf(node),
    ...(node.children ? node.children.map(toString).join("") : []),
    ""
  ].join("");
}

module.exports = () => tree => {
  return map(tree, _node => {
    const node = { ..._node };

    if (node.type === "html" && !node.value.includes("Page")) {
      const code = toString(node);
      // https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags
      const isSelfClosingNode = node.value.match(/<([^\/>]+)\/>/);
      const isOpeningNode = node.value.match(/\<[^/]/);
      const isClosingNode = node.value.match(/\<\/.*\>$/);
      const openingWrapper = `<CodeContainer code={${JSON.stringify(code)}}>`;

      if (isSelfClosingNode || (isOpeningNode && isClosingNode)) {
        node.value = `${openingWrapper}${node.value}</CodeContainer>`;
      } else if (isClosingNode) {
        node.value = `${node.value}</CodeContainer>`;
      } else if (isOpeningNode) {
        node.value = `${openingWrapper}${node.value}`;
      }
    }

    return node;
  });
};
