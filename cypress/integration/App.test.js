describe('<App />', () => {
  before(() => {
    cy.visit('localhost:3000');
  });

  it('Renders without crashing', () => {
    cy.get('h1').contains('Todos');
  });

  it('Focuses the input on load', () => {
    cy.get('[data-cy=new-todo-input]').should('have.focus');
  })

  describe('Default UI', () => {
    it('Renders two default TodoItems', () => {
      cy.get('li').should('have.length', 2);
    });

    it('Renders an input field for typing new TodoItem', () => {
      cy.get('[data-cy=new-todo-input]').should('have.length', 1);
    });

    it('Renders an add button for adding new TodoItem', () => {
      cy.get('[data-cy=addTodo]').should('have.length', 1);
    });
  });

  describe('Adding new TodoItem', () => {
    it('If the Add button is pressed, but the input field is empty, prevent a new TodoItem from being added', () => {
      cy.get('[data-cy=addTodo]').click();
    });
    it('If the Add button is pressed and the input field has content, add a new TodoItem', () => {
      cy.get('[data-cy=new-todo-input]')
        .type('Walk dog')
        .should('have.value', "Walk dog");
      cy.get('[data-cy=addTodo]').click();
      cy.get('li').should('have.length', 3);
    });
  });

  describe('Deleting TodoItems', () => {
    it('When Delete button is pressed for a single TodoItem, remove that TodoItem from the App', () => {
      cy.get(':nth-child(1) > [data-cy=deleteTodo]').click();
    });
    it('Because the first todoItem was deleted, the first TodoItem should now be buy flowers', () => {
      cy.get(':nth-child(1) > .todo-item').contains('Buy flowers');
    });
  });
});