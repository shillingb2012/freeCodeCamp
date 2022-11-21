import './App.css';
import {useState} from 'react';
import {marked} from 'marked';

// To pass test, default editor needs H1, H2, a link, inline code, code block, list item, blockquote, an image, and bolded text
const initialContentInEditor = "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\n> This is my blockquote\n\nSome inline code like `<div></div>`\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nRefer to this **[cheatsheet](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)** for a gihub markdown reference\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n\n*[b.shilling](https://github.com/shillingb2012/freeCodeCamp/tree/main/Frontend)*";

function App() {
  const [content, setContent] = useState(initialContentInEditor);
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const markUpContent = () => {
    marked.setOptions({breaks: true})
    return {__html: marked(content)}
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Markdown application</h1>
        <p id="howTo">
          <u>How to use</u><br/>Enter Github-flavored markdown in the <em><a class="white-link" href="#editor">Editor</a></em> section below, 
          then enoy your newly formatted markdown in the <em><a class="white-link" href="#preview">Preview</a></em> section.
        </p>
        <p id="builtBy">
          Built by <a class="white-link" id="author" rel="noreferrer" href="https://github.com/shillingb2012/freeCodeCamp/tree/main/Frontend" target="_blank">b. shilling</a> (Nov 2022)
        </p>
      </header>

      {/* Editor section */}
      <div className="editorSection">
        <h2>Editor</h2>
        <textarea 
          id="editor"
          value={content}
          onChange={handleChange}
        >
        </textarea>
      </div>

      {/* Preview section */}
      <div className="previewSection">
        <h2>Preview</h2>
        <div id="preview" dangerouslySetInnerHTML={markUpContent()}>
        </div>
      </div>
    </div>
  );
}

export default App;
