import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieDetail from "./index";

const queryClient = new QueryClient();

describe("MovieDetail", () => {
  test("renders loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MovieDetail />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
