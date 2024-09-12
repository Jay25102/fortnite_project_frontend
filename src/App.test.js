import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", function() {
    test("it renders without crashing", function() {
        render(<App/>);
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(<App/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
