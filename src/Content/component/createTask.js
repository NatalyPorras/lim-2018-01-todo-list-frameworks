import React, {Component} from 'react';

class CrearTask extends Component{
    constructor(props){
        super(props);
        this.addTask = this.addTask.bind(this);
    }

    addTask(){
        if(!!this.textInput.value){
            this.props.addTask(this.textInput.value);
            this.textInput.value = '';
            this.textInput.focus();
        }else{
            alert("Ingresa un texto")
        }
    }
    render(){
        return(
            <div className="mainCreate">
                <div className="container">
                    <textarea 
                    ref={input=>this.textInput=input}
                    name="texts" cols="30" rows="5" className="form-control" placeholder="Escribe una tarea"></textarea>
                </div>
                <div>
                    <div className="tools">
                        <button onClick={this.addTask} className="btn pull-right">Publish</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CrearTask;