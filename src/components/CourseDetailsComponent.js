import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CourseDetails = ({courses}) => {
    console.log(courses)
    return courses.map(({id, level, organization, rating, students_enrolled, title, total_reviews, type, url}) => {
        var title = <a href={url}> {title} </a>
        // if (!url) {
        //     return <div></div>
        // }
        return <div key ={id}>
            <Row>
                <Col>{title}</Col>
                <Col>{level}</Col>
                <Col>{organization}</Col>
                <Col>{rating} <div></div> </Col>
                {/* <Col>{students_enrolled}</Col> */}
                {/* <Col>{total_reviews}</Col> */}
                {/* <Col>{type}</Col> */}
            </Row>
            <br></br>
        </div>
    })
}

export default CourseDetails;
