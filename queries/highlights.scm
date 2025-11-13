; Keywords
"fn" @keyword.function

"return" @keyword.return

"for" @keyword.repeat

[
  "if"
  "else"
] @keyword.conditional

; Break and continue statements
(break_statement) @keyword
(continue_statement) @keyword

; Literals
(number) @number
(string) @string
(boolean) @boolean
(nil) @constant.builtin

; Identifiers - catch-all like Go does
(identifier) @variable

; Parameters
(parameter name: (identifier) @variable.parameter)

; Type annotations
(type_identifier) @type

; Function declarations
(function_declaration
  name: (identifier) @function)

; Built-in function calls (more specific, so it overrides @variable)
((identifier) @function.builtin
  (#any-of? @function.builtin "println" "print" "len" "panic"))

; Function calls (more specific, so it overrides @variable)
(call_expression
  function: (identifier) @function.call)

; Operators
[
  "="
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
] @operator

; Punctuation
"," @punctuation.delimiter
";" @punctuation.delimiter

"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket

; Comments
(comment) @comment
