// import React from 'react'
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import {Link} from "react-router-dom";
// import "./Signup.css";
// import bot from "../assets/default-bot.png";

// function validateImg(e) {
//   const file = e.target.files[0];
//   if (file.size >= 1048576) {
//       return alert("Max file size is 1mb");
//   } else {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//   }
// }

// function Signup() {
//   return (
//     <Container>
//       <Row>
//         <Col
//           md={7}
//           className="d-flex flex-direction-column align-items-center justify-content-center"
//         >
//           <Form style={{ width: "80%", maxWidth: 500 }}>
//             <h1 className='text-center'>Create Account</h1>
//             <div className='signup-profile-pic_container'>
//               <img src={bot} className='signup-profile-pic'/>
//               <label htmlFor='image-upload' className='image-upload-lable'>
//                 <i className='fas fa-plus-circle add-picture-icon'></i>
//                 <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
//               </label>

//             </div>
//           <Form.Group className="mb-3" controlId="formBasicName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" placeholder="Your Full Name" />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Login
//             </Button>
//             <div className="py-4">
//               <p className="text-center"> Don't have an account? <Link to="/signup">Sign-Up</Link></p>
//             </div>
//           </Form>
//         </Col>
//         <Col md={5} className="signup__bg"></Col>
//       </Row>
//     </Container>
//   )
// }

// export default Signup

import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import botImg from "../assets/default-bot.png";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() { 
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "yk2htuni");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/ddt6d4zu2/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture");
        const url = await uploadImage(image);
        console.log(url);
        // signup the user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        });
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                        <h1 className="text-center">Create account</h1>
                        <div className="signup-profile-pic__container">
                            <img src={imagePreview || botImg} className="signup-profile-pic" />
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </div>
                        {error && <p className="alert alert-danger">{error.data}</p>}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your Full Name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {upladingImg || isLoading ? "Signing you up..." : "Signup"}
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Already have an account ? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row>
        </Container>
    );
}

export default Signup;
