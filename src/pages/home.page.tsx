import Flow from '@/components/tree/flow.component';
import { CommandMenu } from '@/components/command/command-menu.component';
import { UserSheet } from '@/components/sheet/user-sheet.component';

import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export const HomePage = () => {
  return (
    <ReactFlowProvider>
      <Flow />
      <CommandMenu />
      <UserSheet />
    </ReactFlowProvider>
  );
};
