import { BrowserRouter, Routes, Route,HashRouter } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
