import { useServerWakeup } from './hooks/useServerWakeup'
import AppRoutes from './routes/AppRoutes'

function App() {
    // Wake up the Render free-tier backend the moment a user opens the app.
    // This runs once on mount and silently ignores errors (expected during cold start).
    useServerWakeup()

    return <AppRoutes />
}

export default App;