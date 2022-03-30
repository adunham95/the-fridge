import { render } from '@testing-library/react';
import { expect, it, test } from 'vitest';
import { Avatar } from './Avatar';

const setup = (props?: any) => {
  const avatar = render(<Avatar {...props} />);

  return { avatar };
};

test('Avatar', () => {
  it('Renders without crashing', async () => {
    const { avatar } = setup();
    expect(avatar).toBe(true);
  });
  it('Renders First Letter of name', async () => {
    const { avatar } = setup({ name: 'Adrian' });
    expect(avatar).toBe(true);
  });
});
