import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";

describe("Simple Test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });

  it("should render a simple div", () => {
    render(<div>Hello World</div>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
