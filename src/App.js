import "./styles.css";
import CallApi from "./CallApi";

export default function App() {
  return (
    <div className="App">
      <h1>Countries</h1>
      <h2>a simple app to quickly call an api and render a response</h2>
      <CallApi />
    </div>
  );
}
