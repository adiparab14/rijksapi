const { collections, objects } = require('../utils/apiRequests');
const data = require('../data/data');


describe("GET api/nl/collection", () => {

    it("should retrieve details without any filter", async () => { 
        const response =  await collections('',true);
        expect(response.status).toBe(200);
        expect(response.body.artObjects.length).toBeGreaterThan(0);
    });

    it("should retrieve details with involved maker filter", async () => { 
        const response =  await collections(`involvedMaker=${data.involvedMaker}`,true)
        expect(response.status).toBe(200);
        expect(response.body.artObjects.length).toBeGreaterThan(0);
    });

    it("should retrieve details with search term in object filter", async () => { 
        const response =  await collections(`q=${data.search}`,true)
        expect(response.status).toBe(200);
        expect(response.body.artObjects.length).toBe(10);
    });

    it("should not retrieve details with invalid search term in object filter", async () => { 
        const response =  await collections(`q=${data.invalidSearch}`,true)
        expect(response.status).toBe(200);
        expect(response.body.artObjects.length).toBe(0);
    });

    it("should retrieve less results per page based on ps(<10)", async () => { 
        const ps = 5;
        const response =  await collections(`ps=${ps}`,true)
        expect(response.status).toBe(200);
        expect(response.body.artObjects.length).toBe(ps);
    });

    it("should retrieve more results per page based on ps(>10)", async () => { 
        const ps = 14;
        const response =  await collections(`ps=${ps}`,true)
        expect(response.status).toBe(200);
        expect(response.body.artObjects.length).toBe(ps);
    });

    it("should return 401 error when the request is unauthorised", async () => { 
        const response =  await collections('',false)
        expect(response.status).toBe(401);
    });
});

describe("GET api/nl/collection/{objects}", () => {
    
    let artObjects = '';
    beforeEach(async () => {
        artObjects =  (await collections('',true)).body.artObjects
    });
   
    it("should retrieve details of an object", async () => { 
        const randomIndex = Math.floor(Math.random() * artObjects.length);
        const objectNumber = artObjects[randomIndex].objectNumber;
        const response =  await objects(`${objectNumber}`,true);
        expect(response.status).toBe(200);
        expect(response.body.artObject.title).toBeDefined();
        expect(response.body.artObject.objectNumber).toBe(objectNumber);
    });

    it("should return null for incorrect object number", async () => { 
        const response =  await objects(`whatever`,true);
        expect(response.status).toBe(200);
        expect(response.body.artObject).toBeNull();
    });

    it("should return 401 error when the request is unauthorised", async () => { 
        const response =  await objects('',false)
        expect(response.status).toBe(401);
    });


});
