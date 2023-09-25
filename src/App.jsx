import { useEffect, useState } from "react";
import "./App.css";
import { FaRegCopy } from "react-icons/fa";

const App = () => {
  const [count, setCount] = useState("");
  const [res, setRes] = useState("");
  const [lastDigit, setLastDigit] = useState("");

  const [resFont, setResFont] = useState(64);

  const insertInCount = (digit) => {
    switch (digit) {
      case "C":
        setCount("");
        setRes("");
        break;

      case "CE":
        if (lastDigit === "=") {
          setCount("");
          setRes("");
        } else {
          setRes("");
        }
        break;

      case "=":
        setCount(`${count}  ${res}  ${digit}`);
        setRes(eval(count + res));
        break;

      case "%":
        setRes(res / 100);
        break;

      case "+":
      case "-":
      case "/":
      case "*":
        setCount(`${parseFloat(res)} ${digit}`);
        break;

      default:
        if (!isNaN(lastDigit) || lastDigit === ".") {
          setRes(res.toString() + digit.toString());
        } else if (lastDigit === "=") {
          setCount("");
          setRes(digit);
        } else {
          setRes(digit);
        }
        break;
    }
    setLastDigit(digit);
  };

  useEffect(() => {
    if (res.toString().length >= 9) {
      setResFont(32);
    } else if (res.toString().length >= 6) {
      setResFont(48);
    } else {
      setResFont(64);
    }
    if (res.toString().length >= 12) {
      setRes(res.toString().slice(0, 12));
    }
  }, [res]);

  const copyText = () => {
    navigator.clipboard.writeText(res);
    alert("texto copiado: " + res)
  };

  return (
    <>
      <div className="calc-container">
        <div className="display">
          <div className="copy-btn" onClick={copyText}>
            <FaRegCopy />
          </div>
          <span className="count">{count}</span>
          <span style={{ fontSize: resFont }} className="res">
            {res}
          </span>
        </div>
        <div className="buttons-container">
          <div className="button-line">
            <button onClick={() => insertInCount("C")}>C</button>
            <button onClick={() => insertInCount("CE")}>CE</button>
            <button className="orange" onClick={() => insertInCount("%")}>
              %
            </button>
            <button className="orange" onClick={() => insertInCount("/")}>
              /
            </button>
          </div>
          <div className="button-line">
            <button onClick={() => insertInCount(7)}>7</button>
            <button onClick={() => insertInCount(8)}>8</button>
            <button onClick={() => insertInCount(9)}>9</button>
            <button className="orange" onClick={() => insertInCount("*")}>
              *
            </button>
          </div>
          <div className="button-line">
            <button onClick={() => insertInCount(4)}>4</button>
            <button onClick={() => insertInCount(5)}>5</button>
            <button onClick={() => insertInCount(6)}>6</button>
            <button className="orange" onClick={() => insertInCount("-")}>
              -
            </button>
          </div>
          <div className="button-line">
            <button onClick={() => insertInCount(1)}>1</button>
            <button onClick={() => insertInCount(2)}>2</button>
            <button onClick={() => insertInCount(3)}>3</button>
            <button className="orange" onClick={() => insertInCount("+")}>
              +
            </button>
          </div>
          <div className="button-line">
            <button onClick={() => insertInCount(".")}>.</button>
            <button onClick={() => insertInCount(0)}>0</button>
            <button onClick={() => insertInCount("00")}>00</button>
            <button className="orange" onClick={() => insertInCount("=")}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
