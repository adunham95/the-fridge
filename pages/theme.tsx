// @flow
import * as React from 'react';
import { EIcons } from '../components/Icons';
import { PageBanner } from '../components/Page/PageBanner';
import { Button } from '../components/StatelessInput/Button';
import { useToast } from '../components/Toast/ToastContext';
import theme from '../theme/theme.json';
export function ThemePage() {
  const { addToast } = useToast();
  return (
    <div>
      <PageBanner title="Theme" />
      <Button onClick={() => addToast('Test Toast', theme.BASE_COLOR.success)}>
        Open Toast
      </Button>
    </div>
  );
}

export default ThemePage;
