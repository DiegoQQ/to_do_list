class ListaTareas{
    constructor(){
        this._lista_tareas = []
        this.idGenerador = 0;
        /* 
        // el 
        let lista = [
            {'id': 1,
            'tarea': 'Buscar empleo'
            'checkbox': false},
            {'id': 2,
            'tarea': 'Hacer las compras'
            'checkbox': true},
        ]
        */
        if (localStorage.getItem('lista_tareas')) {
            this._lista_tareas = JSON.parse(localStorage.getItem('lista_tareas'));
        }else{
            localStorage.setItem('lista_tareas', '')
        }

        this.crearEventos();

        this.Imprimirhtml();
    }
    Imprimirhtml(){
        let tareas = document.getElementById("tareas");
        let html = ""
        tareas.innerHTML = "";
        this._lista_tareas.forEach((valor, clave) => {
            let checkbox = valor[1] ? "checked" : "";

            // Crear el elemento <li>
            const li = document.createElement("li");
            li.className = "tarea";
            li.id = `tarea_${clave}`;

            // Crear el primer <div>
            const div1 = document.createElement("div");

            // Crear el checkbox y establecer su estado
            const checkboxInput = document.createElement("input");
            checkboxInput.type = "checkbox";
            checkboxInput.checked = checkbox === "checked"; // Suponiendo que 'checkbox' es una cadena que indica si el checkbox debe estar marcado o no
            div1.appendChild(checkboxInput);

            // Agregar el primer <div> al <li>
            li.appendChild(div1);

            // Crear el segundo <div> con la clase "texto"
            const div2 = document.createElement("div");
            div2.className = "texto";

            // Crear el párrafo y establecer su contenido
            const parrafo = document.createElement("p");
            parrafo.textContent = valor[0];
            parrafo.className = checkbox === "checked" ? checkbox : ""; // Añadir la clase solo si el checkbox está marcado
            div2.appendChild(parrafo);

            // Agregar el segundo <div> al <li>
            li.appendChild(div2);

            // Crear el tercer <div>
            const div3 = document.createElement("div");

            // Crear el input hidden
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.value = `tarea_${clave}`;
            div3.appendChild(hiddenInput);

            // Crear el botón de eliminar
            const eliminarButton = document.createElement("button");
            eliminarButton.className = "eliminar";
            eliminarButton.textContent = "X";
            div3.appendChild(eliminarButton);

            // Agregar el tercer <div> al <li>
            li.appendChild(div3);


            //Evento al boton eliminar
            eliminarButton.addEventListener('click', () => {
                this.eliminartarea(clave, `tarea_${clave}`);
            });

            // html += `
            // <li class="tarea" id="tarea_${clave}">
            //     <div>
            //         <input type="checkbox" ${checkbox}>
            //     </div>
            //     <div class="texto">
            //         <p class="${checkbox}">${valor[0]}</p>
            //     </div>
            //     <div>
            //         <input type="hidden" value="tarea_${clave}">
            //         <button class="eliminar"> X </button>
            //     </div>
            // </li>
            // `
        tareas.appendChild(li);
        });
    }
    eliminartarea(id, elemento){
        this._lista_tareas.splice(id, 1);

        this.ActualizarLocalStorage();

        let eliminar = document.getElementById(elemento);
        eliminar.remove();
    }
    crearEventos(){
        let btnAgregar = document.getElementById("agrega");
        
        btnAgregar.addEventListener("click", a => {
            let elementoAgregar = document.getElementById("textoAgregar");
            let obligatorio = document.querySelector("#agregar > p");
            // si no se digito el elemento muestra el mensaje de error
            if (elementoAgregar == "") {
                obligatorio.removeAttribute("hidden");
            }else{
                obligatorio.setAttribute("hidden", true);
                this.agregarArray(elementoAgregar.value, false);
                this.Imprimirhtml();
                elementoAgregar.value = "";
            }
        });
    }
    agregarArray(texto, checkbox){
        this._lista_tareas.push([texto, checkbox])

        this.ActualizarLocalStorage();

    }
    ActualizarLocalStorage(){
        localStorage.setItem('lista_tareas', JSON.stringify(this._lista_tareas));
    }
}

let lista = new ListaTareas();