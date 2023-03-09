import { useState } from 'react'
import React from 'react'

interface taskI {
  name: string
  estado: boolean
}

const Task = (): JSX.Element => {
  const [task, setTask] = useState<string>('')
  const [taskAll, setTaskAll] = useState<taskI[]>([])

  const handleSubmit = (submit: React.FormEvent<HTMLFormElement>) => {
    submit.preventDefault()
    addTaskItem(task)
    setTask('')
  }

  const addTaskItem = (name: string) => {
    const taskCheck: taskI[] = [{ name, estado: true }, ...taskAll]
    setTaskAll(taskCheck)
  }

  const toggleHandle = (e: taskI, i: number) => {
    changeEstado(e, i)
  }

  const changeEstado = (estado: taskI, i: number): void => {
    const nuevaTarea: taskI[] = [...taskAll]
    nuevaTarea[i].estado = !nuevaTarea[i].estado
    setTaskAll(nuevaTarea)
  }

  const toggleHandleRemove = (i: number) => {
    console.log('hola')
    removeTask(i)
  }

  const removeTask = (i: number) => {
    const nuevaTarea: taskI[] = [...taskAll]
    nuevaTarea.splice(i, 1)
    setTaskAll(nuevaTarea)
  }

  return (
    <>
      <h1>Este es un {task}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(ev) => setTask(ev.target.value)}
          value={task}
        />
        <button>Submit</button>
      </form>
      {taskAll.map((e: taskI, i: number) => {
        return (
          <div key={i}>
            <h1 className={e.estado ? '' : 'line-through'}>{e.name}</h1>
            <button onClick={() => toggleHandle(e, i)}>
              {e.estado ? '✔️' : '✖️'}
            </button>
            <button onClick={() => toggleHandleRemove(i)}>❌ </button>
          </div>
        )
      })}
    </>
  )
}

export default Task
