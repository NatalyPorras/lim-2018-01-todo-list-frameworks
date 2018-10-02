import React, {Component} from 'react';
import './publishTask.css';

class PublishTask extends Component{
    constructor(props) {
        super(props);
        this.id = props.id;
        this.myRef=React.createRef();

        this.state={
          textInput:props.content,
          checkBox:false,
        }
      }
   
      handleInput(e){
        this.setState({
          textInput:e.target.value
        })
      }
      handleChange(){
        const postData = {
          body: this.state.textInput,
        };
        const updatesPost = {};
    
        updatesPost["/task/" + this.id] = postData;
    
        return window.firebase
          .database()
          .ref()
          .update(updatesPost);
      }
      handleRemove(id) {
        this.props.removePost(id);
      }
    handleCheck(){
        const node=this.myRef.current;
        if(!this.state.checkBox){
            node.disabled=true;
        }
  
    }
      handleUpdate(e) {
        const postData = {
          body: this.state.textInput,
        };
        const updatesPost = {};
    
        updatesPost["/task/" + this.id] = postData;
    
        return window.firebase
          .database()
          .ref()
          .update(updatesPost);
      }
    render() {
        return (
          <div id="posts">
            <div id="loadedPost">
              <div className="card mt-3 mb-3">
                <div className="card-body">
                    <input
                      name="texts"
                      ref={this.myRef}
                      className="form-control cajaTexto"
                      value={this.state.textInput}
                      onChange={this.handleInput.bind(this)}
                    />
                  <div>
                    <a
                      onClick={() => this.handleRemove(this.id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </a>
                    <a
                      href=""
                      onClick={() => this.handleChange()}
                      className="btn btn-primary"
                    >
                      Edit
                    </a>
                    <input type="checkbox"  onChange={this.handleCheck.bind(this)}></input>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default PublishTask;