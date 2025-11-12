from unittest import TestCase

import tree_sitter
import tree_sitter_yarlang


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_yarlang.language())
        except Exception:
            self.fail("Error loading YarLang grammar")
