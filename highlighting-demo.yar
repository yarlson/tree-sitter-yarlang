// Highlighting Demo for YarLang
// This file demonstrates syntax highlighting for all language features

// === BUILT-IN FUNCTIONS ===
// These should be highlighted as @function.builtin
println("Testing built-in functions")
print("Hello, ")
len("test")
panic("Error!")

// === VARIABLES ===
// Variable declarations and assignments
x = 10
name = "YarLang"
counter = 0
isReady = true
nothing = nil

// === CUSTOM FUNCTIONS ===
// Function declaration - name should be @function
func greet(name) {
    println("Hello, " + name)
    return name
}

func add(a, b) {
    return a + b
}

func fibonacci(n) {
    if n <= 1 {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// Function calls - should be @function.call
result = add(5, 3)
greet("World")
fib = fibonacci(10)

// === OPERATORS ===
// Arithmetic
sum = 10 + 20
diff = 50 - 25
product = 4 * 5
quotient = 100 / 10
remainder = 17 % 5

// Comparison
isEqual = x == 10
notEqual = x != 20
greater = x > 5
less = x < 100
greaterOrEqual = x >= 10
lessOrEqual = x <= 10

// Logical
andResult = true && false
orResult = true || false
notResult = !false

// === CONTROL FLOW ===
if x > 5 {
    println("x is large")
} else {
    println("x is small")
}

for i = 0; i < 10; i = i + 1 {
    println(i)
    if i == 5 {
        break
    }
}

// === NESTED STRUCTURES ===
func processData(items, threshold) {
    count = 0
    for i = 0; i < len(items); i = i + 1 {
        if items > threshold {
            count = count + 1
            println("Found item above threshold")
        } else {
            continue
        }
    }
    return count
}

// Call with built-in and custom functions mixed
result = processData([1, 2, 3, 4, 5], 3)
println(result)
