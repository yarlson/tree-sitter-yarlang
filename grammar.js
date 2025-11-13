module.exports = grammar({
  name: "yarlang",

  extras: ($) => [/\s/, $.comment],

  conflicts: ($) => [
    [$.return_statement],
    [$.expression_statement, $.call_expression],
    [$.const_declaration, $.const_statement],
    [$.path, $._expression],
    [$.unary_expression, $.index_expression],
    [$.unary_expression, $.field_expression],
    [$.unary_expression, $.call_expression],
    [$.binary_expression, $.unary_expression],
  ],

  rules: {
    source_file: ($) =>
      seq(
        optional($.module_declaration),
        repeat($._item)
      ),

    _item: ($) =>
      choice(
        $.use_declaration,
        $.const_declaration,
        $.type_alias,
        $.struct_declaration,
        $.enum_declaration,
        $.trait_declaration,
        $.impl_block,
        $.function_declaration,
        $._statement,
      ),

    module_declaration: ($) =>
      seq("module", field("path", $.path)),

    use_declaration: ($) =>
      seq(
        "use",
        field("path", $.path),
        optional(seq("as", field("alias", $.identifier)))
      ),

    path: ($) =>
      seq(
        $.identifier,
        repeat(seq("::", $.identifier))
      ),

    // Type alias and const declarations
    const_declaration: ($) =>
      seq(
        "const",
        field("name", $.identifier),
        ":",
        field("type", $._type),
        "=",
        field("value", $._expression)
      ),

    type_alias: ($) =>
      seq(
        "type",
        field("name", $.identifier),
        "=",
        field("type", $._type)
      ),
    struct_declaration: ($) =>
      seq(
        optional("pub"),
        "struct",
        field("name", $.identifier),
        optional(field("type_parameters", $.type_parameter_list)),
        field("fields", $.field_declaration_list)
      ),
    enum_declaration: ($) =>
      seq(
        optional("pub"),
        "enum",
        field("name", $.identifier),
        optional(field("type_parameters", $.type_parameter_list)),
        field("variants", $.enum_variant_list)
      ),

    enum_variant_list: ($) =>
      seq(
        "{",
        optional(
          seq(
            $.enum_variant,
            repeat(seq(",", $.enum_variant)),
            optional(",")
          )
        ),
        "}"
      ),

    enum_variant: ($) =>
      seq(
        field("name", $.identifier),
        optional(field("types", seq(
          "(",
          $._type,
          repeat(seq(",", $._type)),
          optional(","),
          ")"
        )))
      ),
    trait_declaration: ($) =>
      seq(
        optional("pub"),
        "trait",
        field("name", $.identifier),
        optional(field("type_parameters", $.type_parameter_list)),
        field("body", $.trait_item_list)
      ),

    trait_item_list: ($) =>
      seq(
        "{",
        repeat(seq($.trait_function_declaration, ";")),
        "}"
      ),

    trait_function_declaration: ($) =>
      seq(
        "fn",
        field("name", $.identifier),
        field("parameters", $.parameter_list),
        optional(seq(optional("->"), field("return_type", $._type)))
      ),

    impl_block: ($) =>
      seq(
        "impl",
        optional(seq(
          field("trait", $._type),
          "for"
        )),
        field("type", $._type),
        field("body", $.impl_item_list)
      ),

    impl_item_list: ($) =>
      seq(
        "{",
        repeat($.function_declaration),
        "}"
      ),

    field_declaration_list: ($) =>
      seq(
        "{",
        optional(
          seq(
            $.field_declaration,
            repeat(seq(",", $.field_declaration)),
            optional(",")
          )
        ),
        "}"
      ),

    field_declaration: ($) =>
      seq(
        field("name", $.identifier),
        ":",
        field("type", $._type)
      ),

    _statement: ($) =>
      choice(
        $.let_statement,
        $.const_statement,
        $.short_declaration,
        $.assignment_statement,
        $.compound_assignment_statement,
        $.if_statement,
        $.for_statement,
        $.while_statement,
        $.return_statement,
        $.break_statement,
        $.continue_statement,
        $.defer_statement,
        $.unsafe_block,
        $.expression_statement,
      ),
    // Comments
    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),

    // Function declaration
    function_declaration: ($) =>
      seq(
        optional("pub"),
        "fn",
        field("name", $.identifier),
        optional(field("type_parameters", $.type_parameter_list)),
        field("parameters", $.parameter_list),
        optional(seq(optional("->"), field("return_type", $._type))),
        field("body", $.block),
      ),

    parameter_list: ($) =>
      seq(
        "(",
        optional(
          seq(
            $.parameter,
            repeat(seq(",", $.parameter)),
            optional(",")
          ),
        ),
        ")",
      ),

    parameter: ($) =>
      choice(
        $.self_parameter,
        seq(
          optional("mut"),
          field("name", $.identifier),
          field("type", $._type)
        )
      ),

    self_parameter: ($) =>
      choice(
        "self",
        seq("&", optional("mut"), "self")
      ),

    let_statement: ($) =>
      seq(
        "let",
        optional("mut"),
        field("name", $.identifier),
        optional(seq(":", field("type", $._type))),
        "=",
        field("value", $._expression)
      ),

    const_statement: ($) =>
      seq(
        "const",
        field("name", $.identifier),
        ":",
        field("type", $._type),
        "=",
        field("value", $._expression)
      ),

    short_declaration: ($) =>
      seq(
        field("name", $.identifier),
        ":=",
        field("value", $._expression)
      ),

    type_annotation: ($) => $._type,

    _type: ($) => choice(
      $.type_identifier,
      $.reference_type,
      $.pointer_type,
      $.array_type,
      $.slice_type,
      $.tuple_type,
      $.generic_type,
    ),

    type_identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    type_parameter_list: ($) =>
      seq(
        "<",
        $.identifier,
        repeat(seq(",", $.identifier)),
        optional(","),
        ">"
      ),

    reference_type: ($) =>
      seq(
        "&",
        optional(field("mutable", "mut")),
        field("element", $._type)
      ),

    pointer_type: ($) =>
      seq("*", field("element", $._type)),

    array_type: ($) =>
      seq(
        "[",
        field("element", $._type),
        ";",
        field("size", $._expression),
        "]"
      ),

    slice_type: ($) =>
      seq("[", "]", field("element", $._type)),

    tuple_type: ($) =>
      seq(
        "(",
        $._type,
        ",",
        repeat(seq($._type, optional(","))),
        ")"
      ),

    generic_type: ($) =>
      seq(
        field("name", $.type_path),
        "<",
        field("type_arguments", $.type_argument_list),
        ">"
      ),

    type_path: ($) =>
      seq(
        $.identifier,
        repeat(seq("::", $.identifier))
      ),

    type_argument_list: ($) =>
      seq(
        $._type,
        repeat(seq(",", $._type)),
        optional(",")
      ),

    block: ($) => seq("{", repeat($._statement), "}"),

    // Assignment
    assignment_statement: ($) =>
      seq(
        field("target", $.identifier),
        "=",
        field("value", $._expression)
      ),

    compound_assignment_statement: ($) =>
      seq(
        field("target", $.identifier),
        field("operator", choice(
          "+=", "-=", "*=", "/=", "%=",
          "&=", "|=", "^=", "<<=", ">>="
        )),
        field("value", $._expression)
      ),

    // Control flow
    if_statement: ($) =>
      seq(
        "if",
        field("condition", $._expression),
        field("consequence", $.block),
        optional(
          seq("else", field("alternative", choice($.block, $.if_statement))),
        ),
      ),

    for_statement: ($) =>
      seq(
        "for",
        field("variable", $.identifier),
        optional(seq(",", field("value", $.identifier))),
        "in",
        field("iterator", $._expression),
        field("body", $.block)
      ),

    while_statement: ($) =>
      seq(
        "while",
        field("condition", $._expression),
        field("body", $.block)
      ),

    return_statement: ($) => seq("return", optional($._expression)),

    break_statement: ($) => "break",
    continue_statement: ($) => "continue",

    defer_statement: ($) =>
      seq("defer", field("expression", $._expression)),

    unsafe_block: ($) =>
      seq("unsafe", field("body", $.block)),

    expression_statement: ($) => $._expression,

    // Expressions
    _expression: ($) =>
      choice(
        $.binary_expression,
        $.unary_expression,
        $.call_expression,
        $.field_expression,
        $.index_expression,
        $.range_expression,
        $.tuple_expression,
        $.array_expression,
        $.struct_expression,
        $.identifier,
        $.number,
        $.string,
        $.char_literal,
        $.boolean,
        $.nil,
        $.parenthesized_expression,
        $.propagate_expression,
      ),

    binary_expression: ($) =>
      choice(
        // Logical
        prec.left(1, seq(field("left", $._expression), field("operator", "||"), field("right", $._expression))),
        prec.left(2, seq(field("left", $._expression), field("operator", "&&"), field("right", $._expression))),
        // Comparison
        prec.left(3, seq(field("left", $._expression), field("operator", "=="), field("right", $._expression))),
        prec.left(3, seq(field("left", $._expression), field("operator", "!="), field("right", $._expression))),
        prec.left(3, seq(field("left", $._expression), field("operator", "<"), field("right", $._expression))),
        prec.left(3, seq(field("left", $._expression), field("operator", "<="), field("right", $._expression))),
        prec.left(3, seq(field("left", $._expression), field("operator", ">"), field("right", $._expression))),
        prec.left(3, seq(field("left", $._expression), field("operator", ">="), field("right", $._expression))),
        // Bitwise OR
        prec.left(4, seq(field("left", $._expression), field("operator", "|"), field("right", $._expression))),
        // Bitwise XOR
        prec.left(5, seq(field("left", $._expression), field("operator", "^"), field("right", $._expression))),
        // Bitwise AND
        prec.left(6, seq(field("left", $._expression), field("operator", "&"), field("right", $._expression))),
        // Shift
        prec.left(7, seq(field("left", $._expression), field("operator", "<<"), field("right", $._expression))),
        prec.left(7, seq(field("left", $._expression), field("operator", ">>"), field("right", $._expression))),
        // Arithmetic
        prec.left(8, seq(field("left", $._expression), field("operator", "+"), field("right", $._expression))),
        prec.left(8, seq(field("left", $._expression), field("operator", "-"), field("right", $._expression))),
        prec.left(9, seq(field("left", $._expression), field("operator", "*"), field("right", $._expression))),
        prec.left(9, seq(field("left", $._expression), field("operator", "/"), field("right", $._expression))),
        prec.left(9, seq(field("left", $._expression), field("operator", "%"), field("right", $._expression))),
      ),

    unary_expression: ($) =>
      choice(
        prec(6, seq(field("operator", "-"), field("operand", $._expression))),
        prec(6, seq(field("operator", "!"), field("operand", $._expression))),
        prec.right(8, seq(field("operator", "&"), "mut", field("operand", $._expression))),
        prec.right(8, seq(field("operator", "&"), field("operand", $._expression))),
        prec.right(8, seq(field("operator", "*"), field("operand", $._expression))),
      ),

    call_expression: ($) =>
      prec(
        15,
        seq(
          field("function", $._expression),
          field("arguments", $.argument_list),
        ),
      ),

    field_expression: ($) =>
      prec.left(
        15,
        seq(
          field("object", $._expression),
          ".",
          field("field", $.identifier)
        )
      ),

    index_expression: ($) =>
      prec.left(
        15,
        seq(
          field("object", $._expression),
          "[",
          field("index", $._expression),
          "]"
        )
      ),

    range_expression: ($) =>
      prec.left(
        3,
        seq(
          field("start", $._expression),
          "..",
          field("end", $._expression)
        )
      ),

    propagate_expression: ($) =>
      prec.left(
        10,
        seq(field("expression", $._expression), "?")
      ),

    argument_list: ($) =>
      seq(
        "(",
        optional(
          seq($._expression, repeat(seq(",", $._expression)), optional(",")),
        ),
        ")",
      ),

    parenthesized_expression: ($) => seq("(", $._expression, ")"),

    // Literals
    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: ($) =>
      token(
        choice(
          // Hex
          seq("0x", /[0-9a-fA-F][0-9a-fA-F_]*/),
          // Binary
          seq("0b", /[01][01_]*/),
          // Octal
          seq("0o", /[0-7][0-7_]*/),
          // Float with exponent
          seq(
            /\d[\d_]*/,
            optional(seq(".", /\d[\d_]*/)),
            /[eE][+-]?\d[\d_]*/
          ),
          // Float
          seq(/\d[\d_]*/, ".", /\d[\d_]*/),
          seq(".", /\d[\d_]*/),
          // Decimal
          /\d[\d_]*/
        )
      ),
    string: ($) =>
      token(seq('"', repeat(choice(/[^"\\]/, seq("\\", /./))), '"')),

    char_literal: ($) =>
      token(
        seq(
          "'",
          choice(
            /[^'\\]/,
            seq("\\", choice("\\", "'", "n", "r", "t", "0")),
            seq("\\x", /[0-9a-fA-F]{2}/),
            seq("\\u", /[0-9a-fA-F]{4}/)
          ),
          "'"
        )
      ),

    boolean: ($) => choice("true", "false"),
    nil: ($) => "nil",

    tuple_expression: ($) =>
      seq(
        "(",
        $._expression,
        ",",
        optional(seq(repeat(seq($._expression, ",")), optional($._expression))),
        ")"
      ),

    array_expression: ($) =>
      seq(
        "[",
        optional(
          seq(
            $._expression,
            repeat(seq(",", $._expression)),
            optional(",")
          )
        ),
        "]"
      ),

    struct_expression: ($) =>
      seq(
        field("name", $.path),
        "{",
        optional(
          seq(
            $.field_initializer,
            repeat(seq(",", $.field_initializer)),
            optional(",")
          )
        ),
        "}"
      ),

    field_initializer: ($) =>
      seq(
        field("field", $.identifier),
        ":",
        field("value", $._expression)
      ),
  },
});
