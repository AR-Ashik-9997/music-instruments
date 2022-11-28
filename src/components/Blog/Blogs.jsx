import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import useTitle from "../../utility/TitleHooks";

const Blogs = () => {
  useTitle("Blog");
  return (
    <div className="home-container top-margin">
      <Container>
        <Row>
          <h1 className="text-center mt-5 mb-5">My Blog Page</h1>
          <Col lg={12} md={12} sm={12}>
            <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <h3 className="text-black">
                    What are the different ways to manage a state in a React
                    application?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="text-justify fs-5">
                    React state management is a process for managing the data
                    that React components need in order to render themselves.
                    This data is typically stored in the component's state
                    object. When the state object changes, the component will
                    re-render itself. React state management is basically half
                    of a React app.
                  </p>
                  <p className="text-justify fs-5">
                    There are four main types of state you need to properly
                    manage in your React apps:
                  </p>
                  <ul>
                    <li className="fs-5">Local State</li>
                    <li className="fs-5">Global State</li>
                    <li className="fs-5">Server State</li>
                    <li className="fs-5">URL State</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="text-black">
                    How does prototypical inheritance work?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="text-justify fs-5">
                    The Prototypal Inheritance is a feature in javascript used
                    to add methods and properties in objects. It is a method by
                    which an object can inherit the properties and methods of
                    another object. Traditionally, in order to get and set the
                    [[Prototype]] of an object, we use Object. getPrototypeOf
                    and Object.
                  </p>
                  <img
                    src="https://www.codeproject.com/KB/scripting/887551/PrototypalInheritance__1_.jpg"
                    className="img-fluid d-block mx-auto mb-3"
                    alt=""
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <h3 className="text-black">
                    What is a unit test? Why should we write unit tests?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="text-justify fs-5">
                    A unit test is a way of testing a unit - the smallest piece
                    of code that can be logically isolated in a system. In most
                    programming languages, that is a function, a subroutine, a
                    method or property. The isolated part of the definition is
                    important.
                  </p>
                  <p className="text-justify fs-5">
                    <strong>Emaple: </strong>
                    The above unit test “asserts” that 5 + 10 is equal to 15. If
                    the Add function returns anything else Assert. IsEqual
                    result in error and the test case will fail. After you write
                    your test cases, you will run them to verify that everything
                    is working correctly.
                  </p>
                  <p className="text-justify fs-5">
                    <strong>we should write unit tests is </strong>
                    They enable you to catch bugs early in the development
                    process. Automated unit tests help a great deal with
                    regression testing. They detect code smells in your
                    codebase. For example, if you're having a hard time writing
                    unit tests for a piece of code, it might be a sign that your
                    function is too complex.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <h3 className="text-black">React vs. Angular vs. Vue?</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="text-justify fs-5">
                    Vue provides higher customizability and hence is easier to
                    learn than Angular or React. Further, Vue has an overlap
                    with Angular and React with respect to their functionality
                    like the use of components. Hence, the transition to Vue
                    from either of the two is an easy option
                  </p>
                  <img src="https://stateofx-images.netlify.app/captures/js2021/en-US/front_end_frameworks_experience_ranking.png" className="img-fluid d-block mx-auto mb-3" alt="" />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
