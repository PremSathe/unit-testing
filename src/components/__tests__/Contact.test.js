// import { render, screen } from "@testing-library/react";
// import Contact from "../Contact";
// import "@testing-library/jest-dom";

// describe("Contact Us Page Test Case", () => {
//   test("Should load Contact component", () => {
//     render(<Contact />);

//     const heading = screen.getByRole("heading");

//     // * Assertion
//     expect(heading).toBeInTheDocument();
//   });

//   test("Should load button inside Contact component", () => {
//     render(<Contact />);

//     const button = screen.getByRole("button");

//     expect(button).toBeInTheDocument();
//   });

//   it("Should input name inside Contact component", () => {
//     render(<Contact />);

//     const inputName = screen.getByPlaceholderText("name");

//     expect(inputName).toBeInTheDocument();
//   });

//   it("Should load 2 input boxes on the Contact component", () => {
//     render(<Contact />);

//     const inputBoxes = screen.getAllByRole("textbox"); // getAllByRole - returns multiple elements

//     expect(inputBoxes.length).not.toBe(3); // not here means inverse
//   });
// });

import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us page Test Case", () => {
  test("Should load contact us component", () => {
    render(<Contact />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("Should load button inside contact  component", () => {
    render(<Contact />);
    const button = screen.getByText("Submit");
    expect(button).toBeInTheDocument();
  });

  test("Should load input inside contact  component", () => {
    render(<Contact />);
    const form = screen.getByPlaceholderText("message");
    expect(form).toBeInTheDocument();
  });

  test("Should load 2 input boxes on the contact  component", () => {
    // * render
    render(<Contact />);

    // * Querying
    const inputBoxes = screen.getAllByRole("textbox");
    console.log(inputBoxes.length);

    //* Assertion
    expect(inputBoxes.length).toBe(2);
  });
});
