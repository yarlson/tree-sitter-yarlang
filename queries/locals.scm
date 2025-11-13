; Scopes
[
  (source_file)
  (block)
  (function_declaration)
  (impl_block)
  (for_statement)
] @local.scope

; Definitions
(function_declaration
  name: (identifier) @local.definition.function)

(parameter
  name: (identifier) @local.definition.parameter)

(let_statement
  name: (identifier) @local.definition.variable)

(short_declaration
  name: (identifier) @local.definition.variable)

(const_declaration
  name: (identifier) @local.definition.constant)

(struct_declaration
  name: (identifier) @local.definition.type)

(enum_declaration
  name: (identifier) @local.definition.type)

(trait_declaration
  name: (identifier) @local.definition.type)

(type_alias
  name: (identifier) @local.definition.type)

(for_statement
  variable: (identifier) @local.definition.variable)

(for_statement
  value: (identifier) @local.definition.variable)

; References
(identifier) @local.reference
