import React from "react";
import {Row, Col,Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
function Home (){
    return(
        <Row>
            <Col md={6} className="d-flex flex-direction-cloumn allign-items-center justify-content-center">
                <div>
                    <h1>Share your thoughts with the WORLD</h1>
                    <p>Chit-Chat-Hub let you connect with the world!</p>
                    <LinkContainer to="/chat">
                        <Button variant="success">
                            Get Started <i className="fas fa-comments home-message-icon"></i>
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
        </Row>
    )
}

export default Home