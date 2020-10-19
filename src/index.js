import MultiSelectComponent from "./components/custom/main-form";

const mainForm = new MultiSelectComponent({
  options: [
    { id: "1", value: "test 1" },
    { id: "2", value: "test 2" },
    { id: "3", value: "test 3" },
    { id: "4", value: "test 4" },
    { id: "5", value: "test 5" },
    { id: "6", value: "test 6" },
  ],
});

const parentNode = document.getElementById("multiselect:parent:node");
if (parentNode) {
  const secondMainForm = new MultiSelectComponent({
    parentNode,
    options: [
      { id: "1", value: "from parent node 1" },
      { id: "2", value: "test 2" },
      { id: "3", value: "test 3" },
      { id: "4", value: "test 4" },
      { id: "5", value: "test 5" },
      { id: "6", value: "test 6" },
    ],
  });
}
