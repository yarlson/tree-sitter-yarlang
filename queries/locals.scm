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
  targets: (identifier_list
    (identifier) @local.definition))

(function_declaration
  name: (identifier) @local.definition)

(parameter_list
  (identifier) @local.definition)

(for_statement
  init: (assignment_statement
    targets: (identifier_list
      (identifier) @local.definition)))

; References

(identifier) @local.reference
