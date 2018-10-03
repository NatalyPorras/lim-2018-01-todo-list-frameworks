import React, {Component} from 'react';
import CreateTask from './component/createTask';
import PublishTask from './component/publishTask';
import { config } from '../Config/config';

import './content.css'

class Content extends Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.post = window.firebase.initializeApp(config);
        this.db = this.post.database().ref().child('tarea')
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);


    }

    componentDidMount() {
        let { messages } = this.state;
    
        this.db.orderByChild('body').on('child_added', snap => {

            messages.push({
              id: snap.key,
              body: snap.val().body,
              checkBox:snap.val().checkBox,
            });
          this.setState({ messages });
        })
    
        this.db.on("child_removed", snap => {
          for (let index = 0; index < messages.length; index++) {
            if (messages[index].id === snap.key) {
              messages.splice(index, 1);
            }
          }
          this.setState({ messages });
        });
    }
    
  removeTask(id) {
    this.db.child(id).remove();
  }
    addTask(message) {
        this.db.push().set({ 
            body: message,
            checkBox:false
        })
    }
    render(){
        return(
            <div className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 createTask">
                            <CreateTask addTask={this.addTask} />
                        </div>
                        <div className="col-lg-6 publishTask">
                            <h3 className="mt-4">Lista de Tareas</h3>
                            <div>
                                {this.state.messages.map(message => {
                                return (
                                    <PublishTask
                                    content={message.body}
                                    id={message.id}
                                    key={message.id}
                                    checkBox={message.checkBox}
                                    removeTask={this.removeTask}
                                    />
                                );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;



