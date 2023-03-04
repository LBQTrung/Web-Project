import html from '../core.js'
import TodoItem from './TodoItem.js'
import { connect } from '../store.js'

function TodoList({ todos }) {
    return html`
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.map(todo => TodoItem({ todo }))}
            </ul>
        </section>
    `
}

export default connect()(TodoList)