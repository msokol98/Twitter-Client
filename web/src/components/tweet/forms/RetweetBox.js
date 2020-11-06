import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class RetweetBox extends Component {

    state = {retweet: ""};

    handleChange = event => this.setState({retweet: event.target.value});

    handleSubmit = e => {
        e.preventDefault();
        const { retweet } = this.state;
        this.props.submitRetweet(this.props.id, retweet);
    }

    render() {
        return(
            <Form style={{maxWidth: "70%"}} onSubmit={this.handleSubmit}>
                <Form.Group style={{marginTop: '15px'}}>
                    <Form.Control 
                        name="retweet"
                        value={this.state.retweet}
                        onChange={this.handleChange}
                        placeholder='Your comment goes here...' 
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
 
export default RetweetBox;