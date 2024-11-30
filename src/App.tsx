import '@xyflow/react/dist/style.css';
import Flow from './components/tree/flow.component';
import { CommandMenu } from './components/command/command-menu.component';

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Flow />
            <CommandMenu />
        </div>
    );
}
