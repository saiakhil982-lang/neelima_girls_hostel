"""Desktop GUI for the simple calculator using Tkinter.

This interface supports entering two numbers and an operator (+, -, *, /),
handles invalid inputs (including division by zero), and displays results.
"""

from __future__ import annotations

import tkinter as tk
from tkinter import messagebox

from typing import Optional

# Reuse the arithmetic functions from the CLI calculator
from calculator import add, subtract, multiply, divide


class CalculatorGUI:
    """A minimal two-operand calculator UI.

    Flow:
    1) Enter first number
    2) Select operator
    3) Enter second number
    4) Press equals (=) to compute
    """

    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Simple Calculator")

        # Internal state
        self.left_text: str = ""
        self.right_text: str = ""
        self.operator: Optional[str] = None

        # Display
        self.display_var = tk.StringVar(value="0")
        self.display = tk.Entry(
            root,
            textvariable=self.display_var,
            justify="right",
            font=("Segoe UI", 16),
            state="readonly",
            readonlybackground="white",
        )
        self.display.grid(row=0, column=0, columnspan=4, sticky="nsew", padx=8, pady=8)

        # Build buttons
        buttons = [
            ("7", self.on_digit), ("8", self.on_digit), ("9", self.on_digit), ("/", self.on_operator),
            ("4", self.on_digit), ("5", self.on_digit), ("6", self.on_digit), ("*", self.on_operator),
            ("1", self.on_digit), ("2", self.on_digit), ("3", self.on_digit), ("-", self.on_operator),
            ("C", self.on_clear), ("0", self.on_digit), (".", self.on_decimal), ("+", self.on_operator),
        ]

        row = 1
        col = 0
        for text, handler in buttons:
            btn = tk.Button(self.root, text=text, command=lambda t=text, h=handler: h(t), font=("Segoe UI", 12))
            btn.grid(row=row, column=col, sticky="nsew", padx=4, pady=4)
            col += 1
            if col > 3:
                col = 0
                row += 1

        equals_btn = tk.Button(self.root, text="=", command=self.on_equals, font=("Segoe UI", 12))
        equals_btn.grid(row=row, column=0, columnspan=4, sticky="nsew", padx=4, pady=6)

        # Configure grid weights
        for r in range(0, row + 1):
            self.root.grid_rowconfigure(r, weight=1)
        for c in range(4):
            self.root.grid_columnconfigure(c, weight=1)

    def on_digit(self, digit: str) -> None:
        if self.operator is None:
            self.left_text = self._append_char(self.left_text, digit)
            self._update_display(self.left_text)
        else:
            self.right_text = self._append_char(self.right_text, digit)
            self._update_display(self.right_text)

    def on_decimal(self, _: str) -> None:
        if self.operator is None:
            if "." not in self.left_text:
                self.left_text = self._append_char(self.left_text or "0", ".")
                self._update_display(self.left_text)
        else:
            if "." not in self.right_text:
                self.right_text = self._append_char(self.right_text or "0", ".")
                self._update_display(self.right_text)

    def on_operator(self, op: str) -> None:
        if not self.left_text:
            # If no left operand yet, treat current display as left
            self.left_text = self.display_var.get() if self.display_var.get() != "0" else ""
        if not self.left_text:
            return  # still nothing to operate on
        self.operator = op
        self._update_display(op)

    def on_clear(self, _: str | None = None) -> None:
        self.left_text = ""
        self.right_text = ""
        self.operator = None
        self._update_display("0")

    def on_equals(self) -> None:
        if not self.left_text or not self.operator or not self.right_text:
            return
        try:
            left = float(self.left_text)
            right = float(self.right_text)
        except ValueError:
            self._show_error("Please enter valid numbers.")
            return

        try:
            result = self._apply_operation(left, right, self.operator)
        except ValueError as exc:
            self._show_error(str(exc))
            return

        # Show result and prepare for potential next operation
        self.left_text = str(result)
        self.right_text = ""
        self.operator = None
        self._update_display(self.left_text)

    def _apply_operation(self, left: float, right: float, operator: str) -> float:
        if operator == "+":
            return add(left, right)
        if operator == "-":
            return subtract(left, right)
        if operator == "*":
            return multiply(left, right)
        if operator == "/":
            return divide(left, right)
        raise ValueError("Unsupported operator.")

    def _append_char(self, text: str, ch: str) -> str:
        # Leading zero handling: avoid numbers like 00, but allow 0.xxx
        if text == "0" and ch.isdigit():
            return ch
        return f"{text}{ch}"

    def _update_display(self, text: str) -> None:
        self.display_var.set(text)

    def _show_error(self, message: str) -> None:
        messagebox.showerror("Error", message)


def main() -> None:
    root = tk.Tk()
    CalculatorGUI(root)
    root.minsize(280, 320)
    root.mainloop()


if __name__ == "__main__":
    main()


