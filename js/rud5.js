 const BASE_URL = "http://localhost:8000/api/todos";
        const tableBody = document.querySelector("#todo-table tbody");
        let selectedRow = null;
        let selectedId = null;


        window.onload = function () {
            onceLoaded();
        };
        function onceLoaded() {
            loadTodos();
        }


        function loadTodos() {
             fetch(BASE_URL)
                .then(response => response.json())
                .then(todos => {
                    tableBody.innerHTML = "";

                    todos.data.forEach(todo => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
          <td>${todo.id}</td>
          <td>${todo.title}</td>
          <td>${todo.completed ? "Si" : "Non"}</td>
          <td>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${todo.id}">Eliminar</button>
          </td>
        `;
                        tableBody.appendChild(row);
        });


                        // Escóitaa dos botóns de eliminar
                        tableBody.addEventListener("click", (e) => {
                            if (e.target.classList.contains("delete-btn")) {
                                selectedId = e.target.dataset.id;
                                selectedRow = e.target.closest("tr");
                                showModal("modal", "Confirmación de eliminación", "Está seguro de que quere eliminar este elemento?", null, null, eliminar, null);
                            }
                        });
                    
                }).catch(error => {
                    alert('Ocurriu un erro obtendo os elementos');
                    console.log('Ocurriu un erro obtendo os elementos' + error)
                });
            }









            function eliminar() {
                if (selectedId) {
                    const res = fetch(`${BASE_URL}/${selectedId}`, { method: "DELETE" })
                        .then(res => {

                            if (res.status === 204) {
                                selectedRow.remove();
                            } else {
                                alert("Erro ao eliminar.");
                            }

                            selectedId = null;
                            selectedRow = null;
                        }).catch(error => {
                            alert('Ocurriu un erro na eliminación: ' + error);
                        })

                }
            }