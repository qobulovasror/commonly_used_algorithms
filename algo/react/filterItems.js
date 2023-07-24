const Todos = (props) => {
  const { todo, active, filter } = props;
  const deleteTodo = (id) => {
    console.log("delete", id);
  };

  const todos = [];
  todo.forEach((element) => {
    if (active && element._id !== active) return;
    element.document.forEach((item) => {
      if (item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) == -1)
        return;
      todos.push(item);
    });
  });
  return (
    <>
      {todo &&
        todos.map((item, index) => (
          <tr
            key={item._id}
            className="table-item"
            style={{ cursor: "pointer" }}
          >
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
          </tr>
        ))}
    </>
  );
};

export default Todos;
