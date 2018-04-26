import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "../src/App";

chai.use(chaiHttp);

const expect = chai.expect;

describe("baseRoute", () => {
    it('Should return a JSON of users', () => {
        return chai.request(app)
                .get("/users")
                .then(res => {
                    expect(res.type).to.eql("application/json");
                });
    });

    it('Should add a new user', () => {
        return chai.request(app)
                .post('/users')
                .send({"email":"correo2@prueba.com", "name":"Axel Rodriguez"})
                .then(res => {
                    console.log(res);
                    expect(res.body.message).to.eql('User Added');
                });
      });
});