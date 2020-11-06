import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class EditBox extends Component {

    state = {tweet: this.props.tweet, oriTweet: this.props.tweet};

    handleChange = event => this.setState({tweet: event.target.value});

    handleSubmit = e => {
        e.preventDefault();
        const { tweet, oriTweet } = this.state;

        if(tweet === "") 
            alert("Your tweet is empty.");
        else if(tweet === oriTweet)
            alert("You didn't make any changes.");
        else 
            this.props.submitEditedTweet(this.props.id, tweet);
        
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group style={{marginTop: '15px'}}>
                    <Form.Control 
                        name="tweet"
                        value={this.state.tweet}
                        onChange={this.handleChange}
                        placeholder='Edit your tweet...' 
                        as='textarea' 
                        rows={3} 
                    />

                    <Button variant='primary' type='submit' style={{marginTop: '10px', backgroundColor: '#00acee'}}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        )
    }
}
 
export default EditBox;