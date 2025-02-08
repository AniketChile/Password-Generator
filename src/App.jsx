import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)
  
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";

    if (charAllow) str += "!@#$%^&*()_+-=[]{}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  const copyPasswordToClickBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current.setSelectionRange(0,10);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    PasswordGenerator();
  }, [length, numAllow, charAllow, PasswordGenerator]);

  return (
    <>
      
      <div className="bg-black h-screen overflow-hidden">
      <h1 className="text-white text-center font-bold text-4xl">Password Generator</h1>
        <div className="w-full max-w-md mx-auto h-35 shadow-md rounded-lg px-4 my-8 bg-gray-50">
          <div className="shadow rounded-lg overflow-hidden mb-4 flex p-3">
            <input
              type="text"
              value={password}
              className="w-full p-3 bg-white outline youtline-black rounded-lg m-2"
              placeholder="Passoword"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClickBoard}
              className="bg-blue-300 rounded p-2 outline outline-black h-10 mt-3">
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2 bg-white">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                id="nmInput"
                min={6}
                max={100}
                value={length}
                className="cursor pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="nmInput"> length : {length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="numberInput"
                defaultChecked={numAllow}
                onChange={() => setNumAllow((prev) => !prev)}
              />
              <label htmlFor="numberInput">Number</label>
            </div>

            <div>
              <input
                type="checkbox"
                name=""
                id="charInput"
                defaultChecked={charAllow}
                onChange={() => setCharAllow((prev) => !prev)}
              />
              <label htmlFor="charInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
