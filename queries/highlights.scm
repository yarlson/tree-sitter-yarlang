; Keywords
[
  "fn"
  "let"
  "mut"
  "const"
  "type"
  "struct"
  "enum"
  "trait"
  "impl"
  "for"
  "in"
  "while"
  "if"
  "else"
  "return"
  "defer"
  "unsafe"
  "module"
  "use"
  "as"
  "pub"
] @keyword

; Control flow
[
  "if"
  "else"
  "while"
  "for"
  "return"
] @keyword.control

; Break and continue statements
(break_statement) @keyword.control
(continue_statement) @keyword.control

; Types
(type_identifier) @type

; Built-in types
((type_identifier) @type.builtin
  (#any-of? @type.builtin
    "i8" "i16" "i32" "i64" "isize"
    "u8" "u16" "u32" "u64" "usize"
    "f32" "f64"
    "bool" "char" "void"))

(type_path) @type

; Functions
(function_declaration
  name: (identifier) @function)

(call_expression
  function: (identifier) @function.call)

(trait_function_declaration
  name: (identifier) @function.method)

; Parameters
(parameter name: (identifier) @variable.parameter)

; Fields
(field_declaration name: (identifier) @property)
(field_expression field: (identifier) @property)
(field_initializer field: (identifier) @property)

; Variables
(let_statement name: (identifier) @variable)
(short_declaration name: (identifier) @variable)

; Constants
(const_declaration name: (identifier) @constant)
(const_statement name: (identifier) @constant)

; Literals
(number) @number
(string) @string
(char_literal) @character
(boolean) @boolean
(nil) @constant.builtin

; Operators
[
  "="
  ":="
  "+"
  "-"
  "*"
  "/"
  "%"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
  "!"
  "&"
  "|"
  "^"
  "<<"
  ">>"
  "+="
  "-="
  "*="
  "/="
  "%="
  "&="
  "|="
  "^="
  "<<="
  ">>="
  "?"
  ".."
] @operator

; Punctuation
[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  ","
  "."
  ":"
  "::"
  ";"
  "->"
] @punctuation.delimiter

; Comments
(comment) @comment
