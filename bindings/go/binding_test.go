package tree_sitter_yarlang_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_yarlang "github.com/yarlson/tree-sitter-yarlang/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_yarlang.Language())
	if language == nil {
		t.Errorf("Error loading YarLang grammar")
	}
}
