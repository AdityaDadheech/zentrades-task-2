import React from "react";
import {useState} from "react";
import fixedData from "../Data.js";
import './FileDisplay.css';
import './DisplayHandlingTable.css'; 


export const FileDisplay = ()=>{
    const [file, setFile] = useState(null);
  // const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        // const content = reader.result;
        // setData(content);
      };
      reader.readAsText(uploadedFile);
    }
  };
  // const parseFile = (content) => {
  //   Papa.parse(content, {
  //     header: true,
  //     complete: (result) => {
  //       // setData(result.data);
  //       setColumns(result.meta.fields || []);
  //     },
  //   });
  // };
  const data = fixedData;
  const [availableFields, setAvailableFields] = useState(Object.keys(data.products[Object.keys(data.products)[0]]));
  const [displayedFields, setDisplayedFields] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleAddField = () => {
    setDisplayedFields([...displayedFields, ...availableFields]);
    setAvailableFields([]);
  };

  const handleRemoveField = () => {
    setAvailableFields([...availableFields, ...displayedFields]);
    setDisplayedFields([]);
  };

  const handleDisplayTable = () => {
    if(file){
      setShowTable(true);
    }
  };

  return (
    <>
    <h5>Import Products</h5>
    <div className="firstStep">
      <div className="labelStep"><strong>Step 1:</strong></div>
      <div className="uploadOption">
        <div>Select File</div>
      <input type="file" onChange={handleFileUpload} accept=".json, .csv" />
      <br />
      <br />
      <div>Supported File Type(s): .JSON ,.CSV</div>
      </div>
    </div>

    <div className="secondStep">
      <div className="labelStep"><strong>Step 2:</strong></div>
      <div className="uploadOption">
        <div>Specify Format
        </div>
        <div className="lablePlusInput">
            <div className="inputsName">File Type</div>
            <div className="inputs">
                <select className="form-select " aria-label="Default select example">
                    <option defaultValue>Select from menu</option>
                    <option value="json" >JSON</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
        </div>
        <div className="lablePlusInput">
            <div className="inputsName">Character Encoding</div>
            <div className="inputs">
                <select className="form-select " aria-label="Default select example">
                    <option defaultValue>Select from menu</option>
                    <option value="1">UTF-8</option>
                    <option value="2">UTF-16BE</option>
                    <option value="3">UTF-32BE</option>
                </select>
            </div>
        </div>
        <div className="lablePlusInput">
            <div className="inputsName">Delimeter</div>
            <div className="inputs">
                <select className="form-select " aria-label="Default select example">
                    <option defaultValue>Select from menu</option>
                    <option value="1">comma</option>
                    <option value="2">full stop</option>
                    <option value="3">space</option>
                </select>
            </div>
        </div>
        <div>
            <div className="inputsName">Has Header</div>
            <div className="inputs">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label class="form-check-label" htmlFor="flexCheckChecked">
                           
                        </label>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div className="thirdStep">
        <div className="check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
        </div>
        <div className="labelStep"><strong>Step 3:</strong></div>
        <div className="displayCheck">
        
        <div className="display-table-container">
        <div className="select-fields">
          <div>Available Fields:</div>
          <select multiple size="5" value={availableFields} onChange={(e) => setAvailableFields(Array.from(e.target.selectedOptions, (option) => option.value))}>
            {availableFields.map((field) => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="action-buttons">
            <div>
              <button onClick={handleAddField}>&gt;&gt;</button>
            </div>
            <div>
               <button onClick={handleRemoveField}>&lt;&lt;</button>
            </div>
          </div>
          <div className="select-fields-display">
            <div>Fields to be Displayed:</div>
            <select multiple size="5" value={displayedFields} onChange={(e) => setDisplayedFields(Array.from(e.target.selectedOptions, (option) => option.value))}>
              {displayedFields.map((field) => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="DisplayButton">
          <button className="display-button" onClick={handleDisplayTable}>Display Table</button>
        </div>
        {showTable && (
          <table className="data-table">
            <thead>
              <tr>
                {displayedFields.map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(data.products).map((product, index) => (
                <tr key={index}>
                  {displayedFields.map((field) => (
                    <td key={field}>{product[field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </div> 
    </div>

    </>
  );
} 