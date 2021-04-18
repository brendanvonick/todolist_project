const Todo = require('./lib/todo');
const TodoList = require('./lib/todolist');


describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('todolist toArray returns the list as an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo in the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo in the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first todo item from the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes as returns the last todo item from the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns true when all items in the list are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('calling itemAt returns the item at a specified index and a ' +
       'ReferenceError if we specify an index with no element', () => {
    expect(list.itemAt(1)).toEqual(todo2);
    expect(list.itemAt(2)).toEqual(todo3);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('calling markDoneAt on an index marks a todo item at the specificied' +
       ' index as done. If no item exists at that index it throws an error', () => {
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
    list.markDoneAt(2);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('markUndoneAt marks todo at given index undone', () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('markAllDone marks all todo items as done', () => {
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);

    list.markAllDone();

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes a todo item at the specified index. if no item ' +
       'exists at that index, it throws a ReferenceError', () => {
    expect(() => list.removeAt(5)).toThrow(ReferenceError);

    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `--- Today's Todos ---\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString returns string representation of the list successfully after ' +
       'one of the todo items has been marked done', () => {
    let string = `--- Today's Todos ---\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym`;

    todo2.markDone();

    expect(list.toString()).toBe(string);
  });

  test('toString returns string representation of the list successfully after ' +
       'one of the todo items has been marked done', () => {
    let string = `--- Today's Todos ---\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;

    list.markAllDone();

    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over all todos', () => {
    let result = [];
    list.forEach(todo => result.push(todo));

    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

});
