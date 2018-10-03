import React, {Component} from 'react';
import './publishTask.css';

class PublishTask extends Component{
    constructor(props) {
        super(props);
        this.id = props.id;
        this.myRef=React.createRef();
        this.myCheck=React.createRef();

        this.state={
          textInput:props.content,
          checkBox:props.checkBox,
          aux:0
        }
      }
      componentDidMount(){
        this.myRef.current.disabled=this.state.checkBox;
        // console.log(this.myCheck.current.checked)
        // this.setState({checkBox: this.myCheck.current.checked})
        const node=this.myRef.current;

        if (this.state.checkBox) {
        node.disabled=true;
        this.setState({aux:1});
      }else{
        node.disabled=false;
        this.setState({aux:0});
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
            const task = {
                body: this.state.textInput,
                checkBox: e.target.checked,
              };
              const updatesTask = {};
          
              updatesTask["/tarea/" + this.id] = task;
          this.setState({checkBox: e.target.checked, aux: 1})
              return window.firebase
                .database()
                .ref()
                .update(updatesTask);
        }else{
            node.disabled=false;
            const task = {
                body: this.state.textInput,
                checkBox: e.target.checked,
              };
              const updatesTask = {};
          
              updatesTask["/tarea/" + this.id] = task;
          this.setState({checkBox: e.target.checked, aux: 0})          
              return window.firebase
                .database()
                .ref()
                .update(updatesTask);
        } 
      //   this.setState({
      //     checkBox:e.target.checked
      // })
        
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
                    <input type="checkbox" ref={this.myCheck} checked={this.state.checkBox} onChange={this.handleCheck.bind(this)}></input><span>Terminado</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default PublishTask;