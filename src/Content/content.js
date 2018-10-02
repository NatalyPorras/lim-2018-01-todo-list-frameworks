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
        this.db = this.post.database().ref().child('task')
        this.addPost = this.addPost.bind(this);
        this.removePost = this.removePost.bind(this);


    }

    componentDidMount() {
        let { messages } = this.state;

        console.log(this.db)
    
        this.db.orderByChild('body').on('child_added', snap => {

            messages.push({
              id: snap.key,
              body: snap.val().body,
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
    
  removePost(id) {
    this.db.child(id).remove();
  }
    addPost(message) {
        // let {messages} = this.state;
        // messages.push({
        //     id:messages.length +1,
        //     body:message
        // })
        // this.setState({ messages })

        this.db.push().set({ body: message })
    }
    render(){
        return(
            <div className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 createTask">
                            <CreateTask addPost={this.addPost} />
                        </div>
                        <div>
                            <h3 className="mt-4">Post</h3>
                            <div className="col-lg-6 publishTask">
                                {this.state.messages.map(message => {

                                return (
                                    <PublishTask
                                    content={message.body}
                                    id={message.id}
                                    key={message.id}
                                    removePost={this.removePost}
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



