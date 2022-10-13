import TreeG from "./G6/TreeG";
import Base from "./G6/Base";
import UsePlugin from "./G6/UsePlugin";
import UseTool from "./G6/UseTool";
import "./index.css";

const App = () => {
  return (
    <div>
      <div className="mar">
        <Base />
      </div>
      <div className="mar">
        <UsePlugin />
      </div>
      <div className="mar">
        <UseTool />
      </div>
    </div>
  );
};

export default App;
