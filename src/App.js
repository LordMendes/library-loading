import "./App.css";
import { library } from "./data";
import { VirtualList } from "./components/VirtualList";
import { ComponentItem } from "./components/ComponentItem";
import { useState, useMemo } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const libraryMap = useMemo(() => {
    const map = {};
    library.Components.forEach((component) => {
      component.Categories.forEach((category) => {
        if (map[category]) {
          map[category].push(component.Name);
        } else {
          map[category] = [component.Name];
        }
      });
    });
    return map;
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredComponents = useMemo(() => {
    if (!searchInput) {
      return libraryMap;
    }

    const filtered = {};
    for (const category in libraryMap) {
      const components = libraryMap[category].filter((component) =>
        component.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (components.length) {
        filtered[category] = components;
      }
    }
    return filtered;
  }, [searchInput, libraryMap]);

  return (
    <div className="App">
      <h1>Library</h1>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <div className="table">
        <div className="row header">
          <h2 className="header-cell">Categories</h2>
          <h2 className="header-cell">Components</h2>
        </div>
        {Object.keys(filteredComponents).map((category) => (
          <div className="row" key={category}>
            <button
              className={`cell ${
                selectedCategory === category ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({filteredComponents[category]?.length || 0})
            </button>
            <div className="list">
              {selectedCategory === category ? (
                <VirtualList
                  items={filteredComponents[category]}
                  itemWidth={150}
                  containerWidth={window.innerWidth - 250}
                  overflow="x"
                  renderItem={(item, index) => (
                    <ComponentItem>{item}</ComponentItem>
                  )}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
