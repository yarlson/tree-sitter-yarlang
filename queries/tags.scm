; Functions
(function_declaration
  name: (identifier) @name) @definition.function

; Types
(struct_declaration
  name: (identifier) @name) @definition.type

(enum_declaration
  name: (identifier) @name) @definition.type

(trait_declaration
  name: (identifier) @name) @definition.interface

(type_alias
  name: (identifier) @name) @definition.type

; Implementations
(impl_block
  type: (type_identifier) @name) @definition.implementation

; Modules
(module_declaration
  path: (path) @name) @definition.module

; Constants
(const_declaration
  name: (identifier) @name) @definition.constant
