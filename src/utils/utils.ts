import {
    AST_NODE_TYPES,
    TSESTree,
} from "@typescript-eslint/experimental-utils";

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
