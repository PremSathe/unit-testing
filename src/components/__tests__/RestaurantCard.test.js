import { render, screen, prettyDOM } from "@testing-library/react";
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

// Wrapped component with promoted label
const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

it("should render RestaurantCard component with props Data", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByText("McDonald's");
  expect(name).toBeInTheDocument();
});

it("should render RestaurantCard component with Promoted Label", () => {
  render(<PromotedRestaurantCard resData={MOCK_DATA} />);

  // Log the HTML output for debugging
  console.log(prettyDOM());

  // Check if the Promoted label is in the document using a more flexible matcher
  const promotedLabel = screen.queryByText((content, element) => {
    return (
      element.tagName.toLowerCase() === "label" && content.trim() === "Promoted"
    );
  });

  expect(promotedLabel).toBeInTheDocument();
});
