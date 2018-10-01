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
        this.db = this.post.database().ref().child('posts')
        this.addPost = this.addPost.bind(this);

    }

    componentDidMount() {
        const { messages } = this.state;
        this.db.on('child_added', snap => {
            messages.push({
                id: snap.key,
                body: snap.val().body
            })
            this.setState({ messages })
        })
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
                        <div className="col-lg-6 publishTask">
                            <PublishTask item={this.state.messages} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;