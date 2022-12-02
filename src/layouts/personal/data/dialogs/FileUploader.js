import React from "react";
import axios from "axios";

/* eslint-disable */


class FileUploader extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      files: [],
    };
  }

  onChange(e) {
    const { files } = e.target;
    console.log(files);
    const filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    this.setState({ files: [...this.state.files, ...filesArr] });
  }

  removeFile(f) {
    this.setState({ files: this.state.files.filter((x) => x !== f) });
  }

  onSubmit() {
    if (!this.state.files) {
      alert("Please select a file!");
      return false;
    }
    const data = new FormData();

    for (let i = 0; i < this.state.files.length; i++) {
      data.append("file[]", this.state.files[i]);
    }

    const url = "http://localhost/imageUpload/upload.php";

    axios
      .post(url, data, {
        // receive two parameter endpoint url ,form data
      })
      .then(
        (res) => {
          // then print response status
          this.setState({ responseArray: res.data });
          this.resetFile();
        },
        (error) => {
          alert(error);
        }
      );
    setOpenConfigurator;
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <label
              style={{ borderStyle: "dotted", fontSize: 23, display: "block", textAlign: "center", borderRadius: 5}}
              name="filelabel"
            >
              <input
                type="file"
                multiple
                onChange={this.onChange}
                style={{ display: "none" }}
                name="file"
              />
              Attach file
            </label>
            <div />
            <br />
            {this.state.files.map((x) => (
              <div onClick={this.removeFile.bind(this, x)}>{x.name}</div>
            ))}
          </div>
          <button type="submit" onClick={() => this.onSubmit()} style={{ marginTop: 10 }}>
            Upload File
          </button>
        </div>
      </div>
    );
  }
}

export default FileUploader;
