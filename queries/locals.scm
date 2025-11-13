; Scopes

[
  (source_file)
  (block)
  (function_declaration)
  (if_statement)
  (for_statement)
] @local.scope

; Definitions

(assignment_statement
  target: (identifier) @local.definition)

(function_declaration
  name: (identifier) @local.definition)

(parameter
  name: (identifier) @local.definition)

(let_statement
  name: (identifier) @local.definition)

(short_declaration
  name: (identifier) @local.definition)

(for_statement
  variable: (identifier) @local.definition)

; References

(identifier) @local.reference
