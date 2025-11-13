# tree-sitter-yarlang

YarLang grammar for tree-sitter.

## Features

- Full YarLang syntax support
- Syntax highlighting via tree-sitter queries
- Language injection support
- Local variable resolution
- Symbol tagging for navigation

## References

- [YarLang Language Repository](https://github.com/yarlson/yarlang)

## Installation

### Neovim (nvim-treesitter)

**1. Add the parser configuration:**

```lua
require('nvim-treesitter.parsers').get_parser_configs().yarlang = {
  install_info = {
    url = 'https://github.com/yarlson/tree-sitter-yarlang',
    files = { 'src/parser.c' },
    branch = 'main',
  },
  filetype = 'yar',
}
```

**2. Copy queries to your Neovim config:**

```bash
mkdir -p ~/.config/nvim/after/queries/yarlang
curl -o ~/.config/nvim/after/queries/yarlang/highlights.scm https://raw.githubusercontent.com/yarlson/tree-sitter-yarlang/main/queries/highlights.scm
curl -o ~/.config/nvim/after/queries/yarlang/locals.scm https://raw.githubusercontent.com/yarlson/tree-sitter-yarlang/main/queries/locals.scm
curl -o ~/.config/nvim/after/queries/yarlang/tags.scm https://raw.githubusercontent.com/yarlson/tree-sitter-yarlang/main/queries/tags.scm
curl -o ~/.config/nvim/after/queries/yarlang/injections.scm https://raw.githubusercontent.com/yarlson/tree-sitter-yarlang/main/queries/injections.scm
```

**3. Install the parser:**

```vim
:TSInstall yarlang
```

> **Note:** This manual query setup is required because yarlang is not yet in nvim-treesitter's official parser list. Once added officially, this will be automatic.

### npm

```bash
npm install tree-sitter-yarlang
```

### Cargo

```bash
cargo add tree-sitter-yarlang
```

### Python

```bash
pip install tree-sitter-yarlang
```

## Usage

### Node.js

```javascript
const Parser = require("tree-sitter");
const YarLang = require("tree-sitter-yarlang");

const parser = new Parser();
parser.setLanguage(YarLang);

const sourceCode = `
fn main() {
  print("Hello, world!");
}
`;

const tree = parser.parse(sourceCode);
console.log(tree.rootNode.toString());
```

### Rust

```rust
use tree_sitter::{Parser, Language};

fn main() {
    let mut parser = Parser::new();
    parser.set_language(&tree_sitter_yarlang::LANGUAGE.into()).unwrap();

    let source_code = r#"
        fn main() {
          print("Hello, world!");
        }
    "#;

    let tree = parser.parse(source_code, None).unwrap();
    println!("{}", tree.root_node().to_sexp());
}
```

### Python

```python
import tree_sitter_yarlang as tsyarlang
from tree_sitter import Language, Parser

YARLANG_LANGUAGE = Language(tsyarlang.language())
parser = Parser(YARLANG_LANGUAGE)

source_code = b"""
fn main() {
  print("Hello, world!");
}
"""

tree = parser.parse(source_code)
print(tree.root_node.sexp())
```

## Development

### Building from source

```bash
# Generate the parser
tree-sitter generate

# Build the native module
npm install

# Run tests
tree-sitter test

# Test in the playground
tree-sitter build --wasm
tree-sitter playground
```

### Testing

The grammar includes comprehensive corpus tests in the `test/corpus/` directory:

```bash
tree-sitter test
```

## License

[MIT](LICENSE.md)
