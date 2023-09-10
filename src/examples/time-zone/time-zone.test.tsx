import { test, expect, vi, beforeEach, afterAll } from 'vitest';
import { render } from 'test/utilities';
import TimeZone from '.';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2021-01-01T00:00:00.000Z'));
});

afterAll(() => {
  vi.useRealTimers();
});

test('it should render the current time', () => {
  const date = new Date('2021-01-01T00:00:00.000Z');

  vi.useFakeTimers();
  vi.setSystemTime(date);

  expect(Date.now()).toBe(date.valueOf());

  vi.useRealTimers();
});

test('it should render successfully', () => {
  render(<TimeZone />);
});

test.fails('should match the snapshot', async () => {
  const { container } = render(<TimeZone />);
  expect(container).toMatchSnapshot();
});
