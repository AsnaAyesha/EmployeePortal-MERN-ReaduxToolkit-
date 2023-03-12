import { Container } from "react-bootstrap";
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@mui/icons-material";

import './footer.css'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="FooterSection">
            
            <Container className="Left">
                <Container>Logo</Container>
                <Container className="Desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum voluptatem vel ipsam incidunt voluptates
                    inventore in odio delectus? Nulla omnis id at culpa sit fugit quis facilis sequi eius suscipit?
                </Container>
                <Container className="SocialContainer" >
                    <Container className="SocialIcon Facebook" >
                        <Facebook />
                    </Container>
                    <Container className="SocialIcon Instagram" >
                        <Instagram />
                    </Container>
                    <Container className="SocialIcon Twitter" >
                        <Twitter />
                    </Container>
                    <Container className="SocialIcon Pinterest" >
                        <Pinterest />
                    </Container>
                </Container >
            </Container>
            <Container className="Center">
                <h5 className="LinkTitle">Useful Link</h5>

                <ul className="List">
                    <li className="ListItem"> Home </li>
                    
                        <li className="ListItem">Add Employee</li>
                       
                </ul>
            </Container>
            <Container className="Right">
                <h5 className="ContactTitle">Contact</h5>
                <Container className="ContactItem" >
                    <Room style={{ marginRight: "10px" }} />
                    ABC Street, New York 987098
                </Container>
                <Container className="ContactItem">
                    <Phone style={{ marginRight: "10px" }} />
                    +971541111111
                </Container>
                <Container className="ContactItem">
                    <MailOutline style={{ marginRight: "10px" }} />
                    contact@asna.com
                </Container>
                <img className="Payment" src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Container>
        </div>
    )
}

export default Footer
