"""Simple command-line calculator.

Supports addition, subtraction, multiplication, and division.
Prompts the user for two numbers and an operator, validates input,
and prints the result.
"""

from typing import Callable


def add(lhs: float, rhs: float) -> float:
    """Return the sum of two numbers."""
    return lhs + rhs


def subtract(lhs: float, rhs: float) -> float:
    """Return the difference of two numbers (lhs - rhs)."""
    return lhs - rhs


def multiply(lhs: float, rhs: float) -> float:
    """Return the product of two numbers."""
    return lhs * rhs


def divide(lhs: float, rhs: float) -> float:
    """Return the quotient of two numbers (lhs / rhs).

    Raises:
        ValueError: If attempting to divide by zero.
    """
    if rhs == 0:
        raise ValueError("Division by zero is not allowed.")
    return lhs / rhs


def read_float(prompt: str) -> float:
    """Prompt for a floating-point number and validate the input."""
    while True:
        raw = input(prompt).strip()
        try:
            return float(raw)
        except ValueError:
            print(f"Invalid number: '{raw}'. Please enter a valid number.")


def read_operator(prompt: str) -> str:
    """Prompt for an operator and validate that it is one of +, -, *, /."""
    valid_ops = {"+", "-", "*", "/"}
    while True:
        op = input(prompt).strip()
        if op in valid_ops:
            return op
        print("Invalid operator. Choose one of: +, -, *, /")


def main() -> None:
    """Run the interactive calculator flow."""
    print("Simple Calculator")
    left = read_float("Enter the first number: ")
    right = read_float("Enter the second number: ")
    operator = read_operator("Enter operation (+, -, *, /): ")

    # Map operator symbol to the corresponding function
    operation_map: dict[str, Callable[[float, float], float]] = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide,
    }

    operation = operation_map[operator]

    try:
        result = operation(left, right)
    except ValueError as exc:
        print(f"Error: {exc}")
        return

    print(f"Result: {left} {operator} {right} = {result}")


if __name__ == "__main__":
    main()


