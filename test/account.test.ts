import * as chai from "chai";
import * as request from "supertest";

import app from "../src/App";

const expect = chai.expect;

describe("/accounts", () => {
    context("GET /accounts", () => {
        it('Should return a JSON of users', (done) => {
            request(app).get("/accounts")
                .end((err, response) => {
                    if(err) throw err;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body).to.be.a("object");
                    done();
                });
        });
    });

    context("POST /accounts", () => {
        it('Should add a new user', (done) => {
            let user = { email: "correo4@prueba.com", name: "Axel Rodriguez" };
            request(app).post("/accounts")
                .send(user)
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.message).eql("User Added");
                    done();
                });
        });

        it('Should return an error for an invalid user', (done) => {
            let user = { email: "megacorreo", name: "Francisco Rodriguez" };

            request(app).post("/accounts")
                .send(user)
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.statusCode).to.equal(400);
                    expect(response.body.message).eql("Invalid User");
                    done();
                });
        });
    });
});

describe("/login", () => {
    context("POST /login", () => {
        it("Should return a valid login code and message", (done) => {
            let credentials = { email: "correo2@prueba.com" };
            request(app).post("/login")
                .send(credentials)
                .end((err, response) => {
                    if(err) throw err;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.message).eql("Success Login!");
                    done();
                });
        });

        it("Should return an invalid login code and message", (done) => {
            let credentials = { "email": "bademail" };
            request(app).post("/login")
                .send(credentials)
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.statusCode).to.equal(401);
                    expect(response.body.message).eql("Bad Credentials");
                    done();
                });
        });
    });
})
