// @ts-check
/**
 * Heavily inspired by @hapi/eslint-plugin https://github.com/hapijs/eslint-plugin/blob/d8af8ff3450809873814b60be9a03558abd02cbe/lib/rules/capitalize-modules.js
 * Copyright (c) 2019-2020, Sideway Inc, and project contributors
 * Copyright (c) 2015-2019 Continuation Labs and Colin J. Ihrig All rights reserved.
 * Copyright (c) 2021 Type of Web - Michał Miszczyszyn
 */

/**
 * @typedef {import('estree').AssignmentExpression | import('estree').VariableDeclarator | import('estree').ImportDeclaration} CheckNodeArgument
 */

/**
 * @param {string} name
 */
const isCapitalized = (name) => {
  const firstChar = name.charAt(0);
  return firstChar === firstChar.toUpperCase();
};

/**
 * @param {import('estree').Expression} node
 */
const isRequire = (node) => {
  return (
    node !== null &&
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require'
  );
};

/**
 * @param {import('estree').ImportDeclaration} node
 */
const getNotCapitalizedImports = (node) => {
  return (
    node !== null &&
    node.specifiers
      .filter(
        (specifier) =>
          (specifier.type === 'ImportDefaultSpecifier' || specifier.type === 'ImportNamespaceSpecifier') &&
          !isCapitalized(specifier.local.name),
      )
      .map((s) => s.local)
  );
};

/**
 * @param {import('eslint').Rule.RuleContext} context
 */
const check =
  (context) =>
  /**
   * @param {CheckNodeArgument} node
   */
  (node) => {
    if (
      node.type === 'VariableDeclarator' &&
      node.id.type === 'Identifier' &&
      isRequire(node.init) &&
      !isCapitalized(node.id.name)
    ) {
      context.report({ node, messageId: 'notCapitalized' });
    } else if (
      node.type === 'AssignmentExpression' &&
      isRequire(node.right) &&
      node.left.type === 'Identifier' &&
      !isCapitalized(node.left.name)
    ) {
      context.report({ node, messageId: 'notCapitalized' });
    } else if (node.type === 'ImportDeclaration') {
      const notCapitalized = getNotCapitalizedImports(node);
      notCapitalized.forEach((node) =>
        context.report({
          node,
          messageId: 'notCapitalized',
          fix: (fixer) => fixer.replaceTextRange([node.range[0], node.range[0] + 1], node.name.charAt(0).toUpperCase()),
        }),
      );
    }
  };

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce the capitalization of imported module variables',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      notCapitalized: 'Imported module name is not capitalized.',
    },
  },
  create(context) {
    const fn = check(context);
    return {
      AssignmentExpression: fn,
      VariableDeclarator: fn,
      ImportDeclaration: fn,
    };
  },
};

module.exports = rule;
