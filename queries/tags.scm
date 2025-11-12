; Function definitions
(function_declaration
  name: (identifier) @name) @definition.function

; Function calls
(call_expression
  function: (identifier) @name) @reference.call

; Variable assignments
(assignment_statement
  targets: (identifier_list
    (identifier) @name)) @definition.variable
