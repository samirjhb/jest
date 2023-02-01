import app from "../src/app";
import request from "supertest";

describe('GET /tasks', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.statusCode).toBe(200);
    })

    test('should respond with an array', async () => {
        const response = await request(app).get("/tasks").send();
        expect(response.body).toBeInstanceOf(Array);
    })
})

describe('POST /tasks', () => {

    describe('given a title and description', () => {

        const newTask = {
            title: "test task",
            description: "test description",
        }

        //should respond with a 200 status code 
        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.statusCode).toBe(200);
        })

        //should respond with a content-type of application/json
        test("should have a content-type: application/json in header", async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining("json")
            )
        })

        //should respond with a json object containig the new task with an id 
        test("should respond with an task ID", async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        })

    })

    describe('when titile and descrption is missing', () => {
        //should respond with a 400 status code 
        test('should respond with a 400 status code', async () => {
            const fields = [
                {},
                { title: "test Task" },
                { description: "Test Description" }
            ]
            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    })
})