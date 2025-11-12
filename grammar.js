module.exports = grammar({
  name: "yar",

  extras: ($) => [/\s/, $.comment],

  conflicts: ($) => [
    [$.return_statement],
    [$.expression_statement, $.call_expression],
    [$.expression_list, $.call_expression],
  ],

  rules: {
    source_file: ($) => repeat($._statement),

    _statement: ($) =>
      choice(
        $.function_declaration,
        $.assignment_statement,
        $.if_statement,
        $.for_statement,
        $.return_statement,
        $.break_statement,
        $.continue_statement,
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
        "func",
        field("name", $.identifier),
        field("parameters", $.parameter_list),
        field("body", $.block),
      ),

    parameter_list: ($) =>
      seq(
        "(",
        optional(
          seq($.identifier, repeat(seq(",", $.identifier)), optional(",")),
        ),
        ")",
      ),

    block: ($) => seq("{", repeat($._statement), "}"),

    // Assignment
    assignment_statement: ($) =>
      seq(
        field("targets", $.identifier_list),
        "=",
        field("values", $.expression_list),
      ),

    identifier_list: ($) => seq($.identifier, repeat(seq(",", $.identifier))),

    expression_list: ($) => seq($._expression, repeat(seq(",", $._expression))),

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
        optional(field("init", $.assignment_statement)),
        ";",
        optional(field("condition", $._expression)),
        ";",
        optional(field("update", $.assignment_statement)),
        field("body", $.block),
      ),

    return_statement: ($) => seq("return", optional($.expression_list)),

    break_statement: ($) => "break",
    continue_statement: ($) => "continue",

    expression_statement: ($) => $._expression,

    // Expressions
    _expression: ($) =>
      choice(
        $.binary_expression,
        $.unary_expression,
        $.call_expression,
        $.identifier,
        $.number,
        $.string,
        $.boolean,
        $.nil,
        $.parenthesized_expression,
      ),

    binary_expression: ($) =>
      choice(
        // Logical
        prec.left(1, seq($._expression, "||", $._expression)),
        prec.left(2, seq($._expression, "&&", $._expression)),
        // Comparison
        prec.left(3, seq($._expression, "==", $._expression)),
        prec.left(3, seq($._expression, "!=", $._expression)),
        prec.left(3, seq($._expression, "<", $._expression)),
        prec.left(3, seq($._expression, "<=", $._expression)),
        prec.left(3, seq($._expression, ">", $._expression)),
        prec.left(3, seq($._expression, ">=", $._expression)),
        // Arithmetic
        prec.left(4, seq($._expression, "+", $._expression)),
        prec.left(4, seq($._expression, "-", $._expression)),
        prec.left(5, seq($._expression, "*", $._expression)),
        prec.left(5, seq($._expression, "/", $._expression)),
        prec.left(5, seq($._expression, "%", $._expression)),
      ),

    unary_expression: ($) =>
      choice(
        prec(6, seq("-", $._expression)),
        prec(6, seq("!", $._expression)),
      ),

    call_expression: ($) =>
      prec(
        7,
        seq(
          field("function", $._expression),
          field("arguments", $.argument_list),
        ),
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

    number: ($) => {
      const decimal_digits = /\d+/;
      const decimal = seq(decimal_digits, optional(seq(".", decimal_digits)));
      return token(decimal);
    },

    string: ($) =>
      token(seq('"', repeat(choice(/[^"\\]/, seq("\\", /./))), '"')),

    boolean: ($) => choice("true", "false"),
    nil: ($) => "nil",
  },
});
