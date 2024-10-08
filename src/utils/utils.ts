import { TSESTree } from "@typescript-eslint/utils/dist/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/utils/dist";

export function isIfStatement(
    node: TSESTree.Node
): node is TSESTree.IfStatement {
    return node.type === AST_NODE_TYPES.IfStatement;
}

export function isBlockStatement(
    node: TSESTree.Node
): node is TSESTree.BlockStatement {
    return node.type === AST_NODE_TYPES.BlockStatement;
}

export function isExpressionStatement(
    node: TSESTree.Node
): node is TSESTree.ExpressionStatement {
    return node.type === AST_NODE_TYPES.ExpressionStatement;
}

export function isReturnStatement(
    node: TSESTree.Node
): node is TSESTree.ReturnStatement {
    return node.type === AST_NODE_TYPES.ReturnStatement;
}

export function isBinaryExpression(
    node: TSESTree.Node
): node is TSESTree.BinaryExpression {
    return node.type === AST_NODE_TYPES.BinaryExpression;
}
