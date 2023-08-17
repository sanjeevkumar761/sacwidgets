(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        <style>
          :host {}
    
    /* Style for the container */
    div {
      margin: 50px auto;
      max-width: 600px;
    }
    
    /* Style for the input container */
    .input-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    /* Style for the input field */
    #prompt-input {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 70%;
    }
    
    /* Style for the button */
    #generate-button {
      padding: 10px;
      font-size: 16px;
      background-color: #3cb6a9;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 25%;
    }
    
    /* Style for the generated text area */
    #generated-text {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
    width:96%;
    }
        </style>
       <div>
    <center>
    <img src="https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Emblem.png" width="200"/>
    <h1>ChatGPT</h1></center>
      <div class="input-container">
        <input type="text" id="prompt-input" placeholder="Ask anything">
        <button id="generate-button">Submit</button>
      </div>
      <textarea id="generated-text" rows="10" cols="50" readonly></ textarea>
    </div>
      `;
    class Widget extends HTMLElement {
      constructor() {
        super();
        let shadowRoot = this.attachShadow({
          mode: "open"
        });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this._props = {};
      }
      async connectedCallback() {
        this.initMain();
      }
      async initMain() {
        const generatedText = this.shadowRoot.getElementById("generated-text");
        generatedText.value = "";
        const {
          apiKey
        } = this._props || "";
        const {
          max_tokens
        } = this._props || 1024;
        const generateButton = this.shadowRoot.getElementById("generate-button");
        var count = 0;
        generateButton.addEventListener("click", async () => {
          count++;
          if(count > 1){
            console.log("more than 1 click"); 
          }
          console.log(count);
          console.log("clicked");
          console.log(this._props);
          console.log(apiKey);
          const promptInput = this.shadowRoot.getElementById("prompt-input");
          const generatedText = this.shadowRoot.getElementById("generated-text");
          generatedText.value = "Getting results...";
          const prompt = promptInput.value;
          const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify({
              "model": "text-davinci-002",
              "prompt": prompt,
              "max_tokens": parseInt(max_tokens),
              "n": 1,
              "temperature": 0.5
            })
          });
  
          if (response.status === 200) {
            const {
              choices
            } = await response.json();
            const generatedTextValue = choices[0].text;
            generatedText.value = generatedTextValue.replace(/^\n+/, '');
          } else {
            const error = await response.json();
            alert("OpenAI Response: " + error.error.message);
            generatedText.value = "";
          }
        });
      }
      onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = {
          ...this._props,
          ...changedProperties
        };
      }
      onCustomWidgetAfterUpdate(changedProperties) {
        this.initMain();
      }
    }
    customElements.define("com-sanjeevkumar-sap-copilot", Widget);
  })();