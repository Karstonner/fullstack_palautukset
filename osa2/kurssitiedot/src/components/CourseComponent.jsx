const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => (
        <li key={part.id}>
          {part.name} {part.exercises}
        </li>
      ))}
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Courses = ({ courses }) => (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )

export default Courses
