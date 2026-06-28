import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import "../styles/globals.css"

export function App() {
  return (
    <div className="container h-screen w-screen flex justify-center items-center">
      <div>
        
        <div className="p-4">
          <Input placeholder="Enter Github URL" />
        </div>
        <div className="p-4">
          <Input placeholder="Enter LinkedIn URL" />
        </div>
        <div className="flex justify-center p-4">
          <Button>Start interview</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
