import React, {Component} from 'react';
import './header.css';

class Header extends Component{
    render(){
        return(
            <div className='header'>
                <div className='container'>
                    <div className='row text-center'>
                        <div className='col-lg-12 titulo1'>
                        <h2>To-Do List</h2>
                        </div>
                        <div className='col-lg-12 titulo2'>
                            <p>Organiza tus tareas</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header