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

Add to your nvim-treesitter configuration:

```lua
-- Register the parser
local parser_config = require('nvim-treesitter.parsers').get_parser_configs()
parser_config.yarlang = {
  install_info = {
    url = 'https://github.com/yarlson/tree-sitter-yarlang',
    files = { 'src/parser.c' },
    branch = 'main',
  },
  filetype = 'yar',
}

-- Auto-setup queries on first .yar file open
vim.api.nvim_create_autocmd('FileType', {
  pattern = 'yar',
  once = true,
  callback = function()
    local queries_src = vim.fn.stdpath('data') .. '/lazy/nvim-treesitter/queries/yarlang'
    local queries_dst = vim.fn.stdpath('config') .. '/after/queries/yarlang'

    if vim.fn.isdirectory(queries_src) == 1 and vim.fn.isdirectory(queries_dst) == 0 then
      vim.fn.mkdir(queries_dst, 'p')
      for _, file in ipairs(vim.fn.glob(queries_src .. '/*.scm', false, true)) do
        local basename = vim.fn.fnamemodify(file, ':t')
        vim.fn.writefile(vim.fn.readfile(file), queries_dst .. '/' .. basename)
      end
    end
  end,
})
```

Then install:

```vim
:TSInstall yarlang
```

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
