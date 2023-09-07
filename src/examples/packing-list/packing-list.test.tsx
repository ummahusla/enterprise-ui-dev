import { fireEvent, render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('Add New Item');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const input = screen.getByLabelText('Add New Item');
  const button = screen.getByRole('button', { name: 'Add New Item' });
  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  render(<PackingList />);
  const button = screen.getByRole('button', { name: 'Add New Item' });
  expect(button).toBeDisabled();
  const input = screen.getByLabelText('New Item Name');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input).toHaveValue('test');
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  render(<PackingList />);
  const button = screen.getByRole('button', { name: 'Add New Item' });
  expect(button).toBeDisabled();
  const input = screen.getByLabelText('New Item Name');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input).toHaveValue('test');
  fireEvent.click(button);
  const list = await screen.findByTestId('unpacked-items-list');
  expect(list).toHaveTextContent('test');
});
