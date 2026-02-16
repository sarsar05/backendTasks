import { test, expect } from '@playwright/test';



test.describe('JSONPlaceholder API todos', ()=>{

const userID = 5;

    test('GET request for all todos', async({request})=>{
        
      const response = await request.get('https://jsonplaceholder.typicode.com/todos');
      
      expect(response.status()).toBe(200);

      const toDos = await response.json();

      expect(toDos.length).toBeGreaterThan(0);
      expect(toDos.length).toBe(200);

      for(let toDo of toDos){
          expect(toDo).toHaveProperty('userId');
          expect(toDo).toHaveProperty('id');
          expect(toDo).toHaveProperty('title');
          expect(toDo).toHaveProperty('completed');
      }

    });

    // here I will test the filtering of todos based on a single user, in this case with userID = 5.

    test('GET request for todos by userId', async({request})=>{

      const response = await request.get(`https://jsonplaceholder.typicode.com/todos?userId=${userID}`);

      expect(response.status()).toBe(200);

      const toDos = await response.json();

      expect(toDos.length).toBeGreaterThan(0);
      expect(toDos.length).toBe(20);

      for(let toDo of toDos){
          expect(toDo.userId).toBe(userID);
          expect(toDo).toHaveProperty('id');
          expect(toDo).toHaveProperty('title');
          expect(toDo).toHaveProperty('completed');
      }

    
    });


});

// here I will test the filtering of todos based on a single user, in this case with userID = 3.

test.describe ('JSONPlaceholder API todos - single user with userID = 3', ()=>{

  test('GET request for todos by userId', async({request})=>{
    const response = await request.get(`https://jsonplaceholder.typicode.com/todos?userId=3`);

    expect(response.status()).toBe(200);
    
    const toDos = await response.json();
    expect(toDos.length).toBeGreaterThan(0);
    expect(toDos.length).toBe(20);
    
    for(let toDo of toDos){
        expect(toDo.userId).toBe(3);
        expect(toDo).toHaveProperty('id');
        expect(toDo).toHaveProperty('title');
        expect(toDo).toHaveProperty('completed');
    }

 });

});

// Here I will test the filtering of todos based on their completed status, both for completed and incomplete todos. 

test.describe('JSONPlaceholder API todos - filtering by completed status ', ()=>{

  test('GET request for completed todos', async({request})=>{
    const response = await request.get(`https://jsonplaceholder.typicode.com/todos?completed=true`);

    expect(response.status()).toBe(200);
    
    const toDos = await response.json();
    expect(toDos.length).toBeGreaterThan(0);
   
    
    for(let toDo of toDos){
        expect(toDo.completed).toBe(true);
        expect(toDo).toHaveProperty('userId');
        expect(toDo).toHaveProperty('id');
        expect(toDo).toHaveProperty('title');
    }



  });

  test('GET request for incomplete todos', async({request})=>{
    const response = await request.get(`https://jsonplaceholder.typicode.com/todos?completed=false`);
    
    expect(response.status()).toBe(200);

    const toDos = await response.json();
    expect(toDos.length).toBeGreaterThan(0);
    
  

});

// Here I will test the filtering of todos based on their title, searching for a specific title.

test.describe('JSONPlaceholder API todos - filtering by title', ()=>{

  test('GET request for todos with specific title', async({request})=>{
    const response = await request.get(`https://jsonplaceholder.typicode.com/todos#:~:text=%22title%22%3A%20%22cupiditate%20necessitatibus%20ullam%20aut%20quis%20dolor%20voluptate%22%2C`);

    expect(response.status()).toBe(200);
    
    const toDos = await response.json();
    expect(toDos.length).toBeGreaterThan(0);
   
  });
    
});
});


