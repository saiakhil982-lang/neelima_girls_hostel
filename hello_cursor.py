def greet(name: str) -> str:
    """Return a polite greeting for the provided name.

    Args:
        name: The name to greet.

    Returns:
        A greeting message including the given name.
    """
    return f"Hello, {name}!"


if __name__ == "__main__":
    print(greet("World"))