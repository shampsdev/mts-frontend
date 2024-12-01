import '@xyflow/react/dist/style.css';
import Flow from './components/tree/flow.component';
import { CommandMenu } from './components/command/command-menu.component';
import { ReactFlowProvider } from '@xyflow/react';
import { UserSheet } from './components/sheet/user-sheet.component';
import { Header } from './components/header/header.component';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Header />
      <ReactFlowProvider>
        <Flow />
        <CommandMenu />
        <UserSheet />
      </ReactFlowProvider>
    </div>
  );
}
