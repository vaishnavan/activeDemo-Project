import React, { Component } from 'react';
import Axios from 'axios';
import HTMLparser from 'react-html-parser';
import { Icon } from 'semantic-ui-react';
import './activePost.css';

class ActiveBlogPost extends Component {
    constructor(props) {
        super(props)
        //decalring a state variable to store api data
        this.state = {
            finishermagStore: [],
            postShow: [],
            show: false,
            showflag: false
        };
    }
    handleShow = (id) => {
        // console.log(i);
        const { finishermagStore } = this.state;
        const data = finishermagStore.find((item) => item.id === id);
        this.setState({
            postShow: data,
            show: true,
            showflag: true
        });

    }

    //featch finishermag api data
    componentDidMount() {
        Axios.get('https://finishermag.com/wp-json/wp/v2/posts')
            .then((res) => {
                this.setState({
                    finishermagStore: res.data,
                });
            });
    }

    handleBack = () =>{
        this.setState({
            show:false,
        });
    }



    render() {
        const { finishermagStore, postShow, showflag, show } = this.state;
        console.log(postShow.content);

        return (
            <div>
                {show ?
                    <>
                        <div className="container show_data">
                            <button onClick={()=>this.handleBack()}>back</button>
                            {showflag ? <div className="main_data">{HTMLparser(postShow.content.rendered)}</div> : ""}
                        </div>
                    </>
                    :
                    <div className="container blog_card">

                        {finishermagStore.map((item) => {
                            return (
                                <div onClick={() => this.handleShow(item.id)} key={item.id}>
                                    <div className="topic_card">
                                        <div className="blog_topic">
                                            <h3>{item.title.rendered}</h3>
                                            <p>{HTMLparser(item.excerpt.rendered)}</p>
                                            {/* <p>{HTMLparser(item.content.rendered)}</p> */}
                                        </div>
                                        <div className="blog_angleArrow">
                                            <span><Icon size="large" color="blue" name='angle right' /></span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}



                    </div>

                }

            </div>
        );
    }
}

export default ActiveBlogPost;
