import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchItems();
      setItems(data);
    };
    getTasks();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:3001/items");
    const data = await res.json();
    return data;
  };

  const addItem = async () => {
    const res = await fetch("http://localhost:3001/item", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: text }),
    });
    const data = await res.json();
    setItems([...items, { name: data.name }]);
    setText("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      setText(e.target.value);
      addItem();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Node App</h1>
      <div method="post">
        <label>Name</label>
        <input
          value={text}
          type="text"
          name="name"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <h4>Items:</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
