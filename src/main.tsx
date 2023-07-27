import ReactDOM from "react-dom/client"
import Provider from "./Provider"
import Router from "./Router"
import Container from "./Container"
import "./styles/styles.css"
import DesignEditor from "./views/DesignEditor"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <Container>
      {/* <Router /> */}
      <DesignEditor />
    </Container>
  </Provider>
)
