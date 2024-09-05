export const library = {
  Components: [
    {
      Name: "Free Form Container",
      Categories: ["Layout"],
    },
    {
      Name: "Flex Container",
      Categories: ["Layout"],
    },
    {
      Name: "Bar Chart",
      Categories: ["Charts"],
    },
    {
      Name: "Line Chart",
      Categories: ["Charts"],
    },
    {
      Name: "Button",
      Categories: ["Controls"],
    },
    {
      Name: "Input Field",
      Categories: ["Controls", "Inputs"],
    },
    {
      Name: "Checkbox",
      Categories: ["Controls", "Inputs"],
    },
    {
      Name: "Radio Button",
      Categories: ["Controls", "Inputs"],
    },
  ],
  Categories: ["Controls", "Inputs", "Layout", "Custom", "Charts"],
};

export function addBigData(categories, components) {
  for (let i = 0; i < categories; i++) {
    library.Categories.push("Category" + i);
  }
  for (let i = 0; i < components; i++) {
    library.Components.push({
      Name: "Comp" + i,
      Categories: [
        "Category" + (i % categories),
        "Category" + ((i + 1) % categories),
      ],
    });
  }
}

addBigData(30, 10000000);
