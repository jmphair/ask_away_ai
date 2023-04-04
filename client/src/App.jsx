import { useState, useEffect } from 'react'
import loadingGif from "./assets/loading.gif";
import lens from "./assets/lens.png";
import LightSwitchButton from './components/LightSwitchButton';


import "./App.css";

function App() {
  const [prompt, updatePrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);

  const [light, setLight] = useState("off");
  const dark = (light === 'off') ? 'dark' : '';
  const switchLight = () => setLight((light === "on") ? "off" : "on");

  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      setAnswer(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
  
    try {
      setLoading(true);
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      };
  
      const res = await fetch("/api/ask", requestOptions);
  
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
  
      const { message } = await res.json();
      setAnswer(message);
    } catch (err) {
      console.error(err, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className={`app ${dark}`}>
        <div className="app-container">
          <div className="spotlight_wrapper">
            <section>
              <LightSwitchButton light={light} switchLight={switchLight}/>
            </section>
          </div>
          <div className="spotlight__wrapper">
            <input
              type="text"
              className="spotlight__input"
              disabled={loading}
              style={{
                backgroundImage: loading ? `url(${loadingGif})` : `url(${lens})`,
              }}
              onChange={(e) => updatePrompt(e.target.value)}
              onKeyDown={(e) => sendPrompt(e)}
            />
            <div className="spotlight__answer">{answer && <p>{answer}</p>}</div>          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;