import React, {Component} from 'react';

class PublishTask extends Component{
    render(){
        return(
            <div className="mainPublicar">
                <div className="container">
                   <div id="posts">
                        <h3>Tareas</h3>
                        <div id="loadedPost">
                            <ul>
                                {
                                    this.props.item.map(message => {
                                        return (
                                            <li key={message.id}>{message.body}</li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                    </div> 
                </div>
            </div>
          
        )
    }
}

export default PublishTask;