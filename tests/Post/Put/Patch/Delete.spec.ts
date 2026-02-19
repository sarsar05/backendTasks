import {test, expect} from '@playwright/test';

test.describe('JSONPlaceholder API posts', ()=>{

    test.describe('JSONPlaceholder API todos - filtering by title', ()=>{



  test('post request for todos with specific title', async({request})=>{
    const response = await request.post(`https://jsonplaceholder.typicode.com/todos`, {
      data: {
        userId: 65,
        title: "iNCHVOR HETAQRQIR BAN",
        completed: false
      }
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty('userId', 65);
    expect(data).toHaveProperty('title', "iNCHVOR HETAQRQIR BAN");
    expect(data).toHaveProperty('completed', false);
  });

  });
    

});

test.describe('JSONPlaceholder API posts - updating a post', ()=>{

    test('put request to update a post', async({request})=>{
        const response = await request.put(`https://jsonplaceholder.typicode.com/posts/1`, {
            data: {
                id: 1,
                title: "Updated Title",
                body: "Updated body content.",
                userId: 1
            }
        });

        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('id', 1);
        expect(data).toHaveProperty('title', "Updated Title");
        expect(data).toHaveProperty('body', "Updated body content.");
        expect(data).toHaveProperty('userId', 1);
    });

    test('patch request to update a post', async({request})=>{ 
        const response = await request.patch(`https://jsonplaceholder.typicode.com/posts/1`, {
            data: {
                title: "Partially Updated Title"
            }
        });

        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('id', 1);
        expect(data).toHaveProperty('title', "Partially Updated Title");
    });

    test('delete request to delete a post', async({request})=>{
        const response = await request.delete(`https://jsonplaceholder.typicode.com/posts/1`);

        expect(response.status()).toBe(200);
    });

});