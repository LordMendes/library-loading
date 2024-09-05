import "./App.css";
import { library } from "./data";
import { VirtualList } from "./components/VirtualList";
import { ComponentItem } from "./components/ComponentItem";
import { useState, useMemo, useCallback } from "react";

const createLibraryMap = (categories, components) => {
  const libraryMap = {};
  categories.forEach((category) => {
    libraryMap[category] = [];
  });
  components.forEach((component) => {
    component.Categories.forEach((category) => {
      libraryMap[category].push(component.Name);
    });
  });
  return libraryMap;
};

const filterComponents = (libraryMap, searchInput) => {
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
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const libraryMap = useMemo(
    () => createLibraryMap(library.Categories, library.Components),
    []
  );

  const filteredComponents = useMemo(
    () => filterComponents(libraryMap, searchInput),
    [searchInput, libraryMap]
  );

  const handleSearch = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const containerHeight = window.innerHeight - 250;
  const containerWidth = window.innerWidth - 250;

  return (
    <div className="App">
      <h1>Library</h1>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <div className="table">
        <div className="row header">
          <h2 className="header-cell">Categories</h2>
          <h2 className="header-cell">Components</h2>
        </div>
        <VirtualList
          items={Object.keys(filteredComponents)}
          itemHeight={39}
          containerHeight={containerHeight}
          overflow="y"
          renderItem={(category) => (
            <div className="row" key={category}>
              <button
                className={`cell ${
                  selectedCategory === category ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({filteredComponents[category]?.length || 0})
              </button>
              <div>
                {selectedCategory === category && (
                  <VirtualList
                    items={filteredComponents[category]}
                    itemWidth={150}
                    containerWidth={containerWidth}
                    overflow="x"
                    renderItem={(item) => <ComponentItem key={item}>{item}</ComponentItem>}
                  />
                )}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default App;
