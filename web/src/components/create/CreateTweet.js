import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './styles.css';

class CreateTweet extends Component {

    state = {tweet: ""};

    handleChange = event => this.setState({tweet: event.target.value});

    handleSubmit = e => {
        e.preventDefault();
        const { tweet } = this.state;

        if(tweet === "") 
            alert("Your tweet is empty.")
        else if(tweet.length > 200) {
            alert("Max length for a tweet is 200 characters.");
            return;
        }
        else 
            this.props.createTweet({body: tweet});
        
        this.setState({tweet: ""})
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit} className="create-tweet">
                <Form.Group style={{marginTop: '15px'}}>
                    <Form.Control 
                        name="tweet"
                        value={this.state.tweet}
                        onChange={this.handleChange}
                        placeholder='Post your tweet...' 
                        as='textarea' 
                        rows={4} 
                    />

                    <Button variant='primary' type='submit' style={{marginTop: '10px', backgroundColor: '#00acee'}}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        )
    }
}

export default CreateTweet;