import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class ReplyBox extends Component {

    state = {reply: ""};

    handleChange = event => this.setState({reply: event.target.value});

    handleSubmit = e => {
        e.preventDefault();
        const { reply } = this.state;

        if(reply === "") {
            alert("Your reply is empty.")
        } else {
            this.props.submitReply(reply);
            alert("Reply posted!")
        }

    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group style={{marginTop: '15px'}}>
                    <Form.Control 
                        name="reply"
                        value={this.state.reply}
                        onChange={this.handleChange}
                        placeholder='Leave a reply...' 
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
 
export default ReplyBox;