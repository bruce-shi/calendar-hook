import { renderHook, act } from "@testing-library/react";
import { useCalendar } from "./use-calendar";
import { expect, test } from "vitest";

test("should return 7 weekdays", () => {
  const { result } = renderHook(() => useCalendar());
  expect(result.current.weekdays).toHaveLength(7);
});


test("should return 42 days when month view", () => {
  const { result } = renderHook(() => useCalendar());
  expect(result.current.days).toHaveLength(42);
})


test("should return 7 days when week view", () => {
  const { result } = renderHook(() => useCalendar());
  act(() => {
    result.current.setView("week");
  })
  expect(result.current.days).toHaveLength(7);
})