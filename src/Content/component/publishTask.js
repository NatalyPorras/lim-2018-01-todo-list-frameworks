import React, {Component} from 'react';
import './publishTask.css';

class PublishTask extends Component{
    constructor(props) {
        super(props);
        this.id = props.id;
        this.myRef=React.createRef();

        this.state={
          textInput:props.content,
          checkBox:props.checkBox,
          aux:0
        }
      }
   
      handleInput(e){
        this.setState({
          textInput:e.target.value
        })
      }
      handleChange(){
        const task = {
          body: this.state.textInput,
        };
        const updatesTask = {};
    
        updatesTask["/tarea/" + this.id] = task;
    
        return window.firebase
          .database()
          .ref()
          .update(updatesTask);
      }
      handleRemove(id) {
        this.props.removeTask(id);
      }

    handleCheck(e){
        
        const node=this.myRef.current;
        if(this.state.aux === 0){
            node.disabled=true;
            this.setState({
                checkBox:e.target.checked
            })
            const task = {
                body: this.state.textInput,
                checkBox: this.state.checkBox,
              };
              const updatesTask = {};
          
              updatesTask["/tarea/" + this.id] = task;
          
              return window.firebase
                .database()
                .database()
                .ref()
                .update(updatesTask);
        }else{
            node.disabled=false;
            this.setState({
                checkBox:e.target.checked
            })
            const task = {
                body: this.state.textInput,
                checkBox: this.state.checkBox,
              };
              const updatesTask = {};
          
              updatesTask["/tarea/" + this.id] = task;
          
              return window.firebase
                .database()
                .ref()
                .update(updatesTask);
        }
        
    }
      handleUpdate(e) {
        const task = {
          body: this.state.textInput,
          checkBox: this.state.checkBox
        };
        const updatesTask = {};
    
        updatesTask["/tarea/" + this.id] = task;
    
        return window.firebase
          .database()
          .ref()
          .update(updatesTask);
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
                    ><i className="far fa-trash-alt"></i>
                    </a>
                    <a
                      href=""
                      onClick={() => this.handleChange()}
                      className="btn btn-primary"
                    ><i className="far fa-edit"></i>
                    </a>
                    <input type="checkbox" checked={this.state.checkBox} onChange={this.handleCheck.bind(this)}></input><span>Terminado</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default PublishTask;