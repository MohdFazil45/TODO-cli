import chalk from "chalk";
import { Command} from "commander";
import fs from 'fs'
const program = new Command()

const todoFile = 'todos.json'

const readTodo= () => {
    try {
        const data = fs.readFileSync(todoFile, 'utf-8')
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading todos:", error.message);
        return [];
    }
}

const writeTodo = (todo) => {
    const jsonData = JSON.stringify(todo, null, 2)
    fs.writeFileSync(todoFile,jsonData,'utf-8')
}

program
    .name("todo")
    .description("Todo app CLI ")
    .version("0.1.0")

program.command('add')
    .description("Add todo in cli app")
    .argument('<string>','write todo')
    .action((todo)=> {
        let todos = readTodo()
        todos.push({todo})
        writeTodo(todos)
        console.log(chalk.cyan(`Todo added :- ${todo}`))
    })

program.command('show')
    .description('It shows todo')
    .action(() => {
        let todo = readTodo()
        if (todo.length === 0) {
            console.log(chalk.red('Todo not available'))
        } else {
            todo.forEach((todos,index) => {
                console.log(chalk.greenBright(`${index + 1} :- ${todos}`))
            })
        }
    })

program.command('delete')
    .description('Delete todo')
    .argument('<string>','todo which you want to delete')
    .action((todo) => {
        let todos = readTodo()
        
        const deletedTodos = todos.filter(line => line.trim() !== todo.trim())
        if (deletedTodos.length === todos.length) {
            console.log(chalk.yellow(`Todo not found: ${todo}`));
        } else {
            writeTodo(deletedTodos);
            console.log(chalk.red.bold(`Todo deleted :- ${todo}`));
        }
    })
program.parse()